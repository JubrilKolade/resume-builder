// components/ResumePreview.tsx
'use client';

import { useRef, useState, Suspense, lazy, useMemo, forwardRef, useImperativeHandle } from 'react';
import { ResumeData, TemplateType, ResumeStyle, AppState } from '@/types/resume';
import { Download, Loader2 } from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

// Define base template props interface
interface TemplateProps {
  data: ResumeData;
  style?: ResumeStyle;
  onDownload?: () => void;
}

// Lazy load templates for better performance
const ClassicTemplate = lazy(() => import('./templates/ClassicTemplate'));
const ModernTemplate = lazy(() => import('./templates/ModernTemplate'));
const SidebarTemplate = lazy(() => import('./templates/SidebarTemplate'));
const CreativeTemplate = lazy(() => import('./templates/CreativeTemplate'));

declare global {
  interface Window {
    onafterprint: (() => void) | null;
  }
}

interface ResumePreviewProps {
  data: ResumeData | AppState;
  template: TemplateType;
  style: ResumeStyle;
}

export interface ResumePreviewHandle {
  downloadPDF: () => Promise<void>;
}

// Helper function to extract ResumeData from either ResumeData or AppState
const extractResumeData = (data: ResumeData | AppState): ResumeData => {
  if ('resumeData' in data && 'selectedTemplate' in data && 'style' in data) {
    return data.resumeData;
  }
  return data as ResumeData;
};

// Update the component to use the new TemplateProps
const ResumePreviewComponent = forwardRef<ResumePreviewHandle, ResumePreviewProps>(({ data: inputData, template, style }, ref) => {
  const data = extractResumeData(inputData);
  const resumeRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);

  // Get the appropriate template component based on the selected template
  const TemplateComponent = useMemo(() => {
    switch (template) {
      case 'classic':
        return ClassicTemplate;
      case 'modern':
        return ModernTemplate;
      case 'sidebar':
        return SidebarTemplate;
      case 'creative':
        return CreativeTemplate;
      default:
        return ClassicTemplate;
    }
  }, [template]);

  useImperativeHandle(ref, () => ({
    downloadPDF: handleDownloadPDF
  }));

  const handleDownloadPDF = async () => {
    if (!resumeRef.current || typeof window === 'undefined') {
      console.error('Resume ref not found or window is not defined');
      return;
    }

    setIsExporting(true);

    let ghostElement: HTMLElement | null = null;

    try {
      const originalElement = resumeRef.current;

      // Create a clone to render without CSS transforms/scaling affecting the output
      ghostElement = originalElement.cloneNode(true) as HTMLElement;

      // Enforce PDF-friendly styles on the ghost element
      ghostElement.style.position = 'fixed';
      ghostElement.style.left = '-10000px';
      ghostElement.style.top = '0';
      ghostElement.style.zIndex = '-1000';
      ghostElement.style.width = '210mm'; // Standard A4 width
      ghostElement.style.minHeight = '297mm'; // Standard A4 height
      ghostElement.style.height = 'auto';
      ghostElement.style.transform = 'none'; // Reset any scaling
      ghostElement.style.margin = '0';
      ghostElement.style.overflow = 'visible';

      // Copy computed styles that might be lost or rely on parent context
      const computedStyle = window.getComputedStyle(originalElement);
      ghostElement.style.fontFamily = computedStyle.fontFamily;
      ghostElement.style.color = computedStyle.color;
      ghostElement.style.backgroundColor = computedStyle.backgroundColor;

      document.body.appendChild(ghostElement);

      // Brief delay to ensure rendering
      await new Promise(resolve => setTimeout(resolve, 100));

      const canvas = await html2canvas(ghostElement, {
        useCORS: true,
        logging: false,
        background: '#ffffff',
        allowTaint: true,
        letterRendering: true,
        scale: 2, // Higher quality
        windowWidth: 210 * 3.7795275591, // A4 width in px (approx)
      } as any);

      // Convert canvas to image data URL
      const imgData = canvas.toDataURL('image/png', 1.0);

      // Create PDF with proper dimensions
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      // Get PDF page dimensions
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      // Calculate dimensions to fit the content
      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // Add the image to the PDF
      // If content is taller than one page, we might need multi-page logic, 
      // but for single page resume this fits.
      // Ideally we check if imgHeight > pageHeight and handle it, but simple scaling is safest for now.

      let heightLeft = imgHeight;
      let position = 0;

      // First page
      (pdf as any).addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // Add extra pages if needed
      while (heightLeft > 0) {
        position = heightLeft - imgHeight; // Move to next page chunk
        pdf.addPage();
        (pdf as any).addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      // Generate a safe filename
      const safeName = data.personalInfo?.fullName
        ? data.personalInfo.fullName.replace(/[^\w\s-]/g, '').replace(/\s+/g, '_')
        : 'Resume';
      const fileName = `${safeName}_${new Date().toISOString().split('T')[0]}.pdf`;

      // Save the PDF
      pdf.save(fileName);
    } catch (error) {
      console.error('Error generating PDF:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      alert(`Failed to generate PDF: ${errorMessage}`);
    } finally {
      if (ghostElement && document.body.contains(ghostElement)) {
        document.body.removeChild(ghostElement);
      }
      setIsExporting(false);
    }
  };

  return (
    <div className="relative">
      <div
        ref={resumeRef}
        className="bg-white p-8 shadow-lg print:shadow-none print:p-0"
        style={{
          fontFamily: style.fontFamily || 'Inter, sans-serif',
          color: style.textColor || '#1f2937',
          backgroundColor: style.backgroundColor || '#ffffff',
        }}
      >
        <Suspense fallback={
          <div className="flex items-center justify-center p-8">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        }>
          <TemplateComponent
            data={data}
            style={{
              ...style,
              accentColor: style.accentColor || '#2563eb',
              textColor: style.textColor || '#1f2937',
              backgroundColor: style.backgroundColor || '#ffffff',
              fontFamily: style.fontFamily || 'Inter, sans-serif',
              fontSize: style.fontSize || 'medium',
              spacing: style.spacing || 'normal'
            }}
          />
        </Suspense>
      </div>
    </div>
  );
});

ResumePreviewComponent.displayName = 'ResumePreviewComponent';

export default ResumePreviewComponent;