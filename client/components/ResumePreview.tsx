'use client';

import { useRef, useState, Suspense, lazy, useMemo, forwardRef, useImperativeHandle } from 'react';
import { ResumeData, TemplateType, ResumeStyle, AppState } from '@/types/resume';
import { Loader2 } from 'lucide-react';

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

interface ResumePreviewProps {
  data: ResumeData | AppState;
  template: TemplateType;
  style: ResumeStyle;
}

export interface ResumePreviewHandle {
  getElement: () => HTMLElement | null;
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
    getElement: () => resumeRef.current
  }));

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