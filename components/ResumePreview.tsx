// components/ResumePreview.tsx
'use client';

import { useRef, useState, Suspense, lazy, useMemo } from 'react';
import { ResumeData, TemplateType, ResumeStyle, AppState } from '@/types/resume';
import { Download, Printer, Loader2 } from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

// Define base template props interface
interface TemplateProps {
  data: ResumeData;
  style?: ResumeStyle;
  onDownload?: () => void;
}

// Lazy load templates for better performance
const ModernTemplate = lazy(() => import('./templates/ModernTemplate'));
const ClassicTemplate = lazy(() => import('./templates/ClassicTemplate'));
const ProfessionalTemplate = lazy(() => import('./templates/ProfessionalTemplate'));
const CreativeTemplate = lazy(() => import('./templates/CreativeTemplate'));
const MinimalistTemplate = lazy(() => import('./templates/MinimalistTemplate'));
const ExecutiveTemplate = lazy(() => import('./templates/ExecutiveTemplate'));

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

// Helper function to extract ResumeData from either ResumeData or AppState
const extractResumeData = (data: ResumeData | AppState): ResumeData => {
  if ('resumeData' in data && 'selectedTemplate' in data && 'style' in data) {
    return data.resumeData;
  }
  return data as ResumeData;
};

// Update the component to use the new TemplateProps
const ResumePreviewComponent: React.FC<ResumePreviewProps> = ({ data: inputData, template, style = {} }) => {
  const data = extractResumeData(inputData);
  const resumeRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);

  // Get the appropriate template component based on the selected template
  const TemplateComponent = useMemo(() => {
    switch (template) {
      case 'modern':
        return ModernTemplate;
      case 'professional':
        return ProfessionalTemplate;
      case 'creative':
        return CreativeTemplate;
      case 'minimalist':
        return MinimalistTemplate;
      case 'executive':
        return ExecutiveTemplate;
      case 'classic':
      default:
        return ClassicTemplate;
    }
  }, [template]);

  const handlePrint = () => {
    if (typeof window === 'undefined') return;

    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const printContent = resumeRef.current?.innerHTML || '';
    const printDocument = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Print Resume</title>
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
          <style>
            @media print {
              @page { 
                margin: 0; 
                size: A4;
              }
              body { 
                margin: 1.6cm;
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
              }
              .no-print {
                display: none !important;
              }
            }
          </style>
        </head>
        <body>
          ${printContent}
          <script>
            window.onload = function() {
              setTimeout(function() {
                window.print();
                window.onafterprint = function() {
                  window.close();
                };
              }, 1000);
            };
          </script>
        </body>
      </html>
    `;

    printWindow.document.open();
    printWindow.document.write(printDocument);
    printWindow.document.close();
  };

  const handleDownloadPDF = async () => {
    if (!resumeRef.current || typeof window === 'undefined') {
      console.error('Resume ref not found or window is not defined');
      return;
    }

    setIsExporting(true);

    try {
      const element = resumeRef.current;
      if (!element) {
        throw new Error('Resume element not found');
      }

      const canvas = await html2canvas(element, {
        useCORS: true,
        logging: false,
        background: '#ffffff',
        allowTaint: true,
        letterRendering: true,
      } as any);

      // Convert canvas to image data URL
      const imgData = canvas.toDataURL('image/png', 1.0);

      // Create PDF with proper dimensions
      const pdf = new jsPDF({
        orientation: canvas.width > canvas.height ? 'landscape' : 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      // Get PDF page dimensions
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      // Calculate dimensions to fit the content
      const scale = Math.min(
        (pageWidth - 20) / canvas.width,
        (pageHeight - 20) / canvas.height
      );

      const scaledWidth = canvas.width * scale;
      const scaledHeight = canvas.height * scale;

      // Center the content
      const x = (pageWidth - scaledWidth) / 2;
      const y = 10; // 10mm top margin

      // Add the image to the PDF with proper type handling
      (pdf as any).addImage({
        imageData: imgData,
        x: Math.max(0, x),
        y,
        width: scaledWidth,
        height: scaledHeight,
        compression: 'FAST',
        format: 'PNG',
      });

      // Generate a safe filename
      const safeName = data.personalInfo?.fullName
        ? data.personalInfo.fullName.replace(/[^\w\s-]/g, '').replace(/\s+/g, '_')
        : 'Resume';

      const fileName = `${safeName}_${new Date().toISOString().split('T')[0]}.pdf`;

      // Save the PDF
      pdf.save(fileName);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="relative">
      <div className="absolute top-4 right-4 flex gap-2 z-10">
        <button
          onClick={handlePrint}
          disabled={isExporting || isPrinting}
          className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPrinting ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Printer className="w-4 h-4 mr-2" />
          )}
          {isPrinting ? 'Preparing...' : 'Print'}
        </button>
        <button
          onClick={handleDownloadPDF}
          disabled={isExporting || isPrinting}
          className="flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isExporting ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Download className="w-4 h-4 mr-2" />
          )}
          {isExporting ? 'Generating...' : 'Download PDF'}
        </button>
      </div>

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
            onDownload={handleDownloadPDF}
          />
        </Suspense>
      </div>
    </div>
  );
}

export default ResumePreviewComponent;