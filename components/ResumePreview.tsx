'use client';

import { useRef, useState } from 'react';
import { ResumeData, TemplateType, ResumeStyle } from '@/types/resume';
import { Download, Printer, FileText } from 'lucide-react';
import ModernTemplate from './templates/ModernTemplate';
import ClassicTemplate from './templates/ClassicTemplate';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface ResumePreviewProps {
  data: ResumeData;
  template: TemplateType;
  style: ResumeStyle;
}

export default function ResumePreview({ data, template, style }: ResumePreviewProps) {
  const resumeRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = async () => {
    if (!resumeRef.current) return;

    setIsExporting(true);
    try {
      const canvas = await html2canvas(resumeRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 0;

      pdf.addImage(
        imgData,
        'PNG',
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );

      const fileName = data.personalInfo.fullName
        ? `${data.personalInfo.fullName.replace(/\s+/g, '_')}_Resume.pdf`
        : 'Resume.pdf';

      pdf.save(fileName);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const isEmpty = !data.personalInfo.fullName && data.workExperience.length === 0;

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 no-print">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-primary-600" />
            <h3 className="font-semibold text-gray-900">Preview</h3>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              aria-label="Print resume"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Print</span>
            </button>
            <button
              onClick={handleDownloadPDF}
              disabled={isExporting}
              className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Download as PDF"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">
                {isExporting ? 'Generating...' : 'Download PDF'}
              </span>
            </button>
          </div>
        </div>

        {isEmpty && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              ℹ️ Fill in your information on the left to see your resume preview here. You can
              also click "Load Sample" to see an example.
            </p>
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden print-page">
        <div
          ref={resumeRef}
          className="bg-white"
          style={{
            fontFamily: style.fontFamily,
            fontSize:
              style.fontSize === 'small'
                ? '13px'
                : style.fontSize === 'large'
                ? '15px'
                : '14px',
          }}
        >
          {template === 'modern' ? (
            <ModernTemplate data={data} style={style} />
          ) : (
            <ClassicTemplate data={data} style={style} />
          )}
        </div>
      </div>
    </div>
  );
}
