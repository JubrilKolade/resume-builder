// app/preview/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useResume } from '@/contexts/ResumeContext';
import { ResumeStyle } from '@/types/resume';
import ResumePreview from '@/components/ResumePreview';
import StyleCustomizer from '@/components/StyleCustomizer';

export default function PreviewPage() {
  const router = useRouter();
  const { 
    resumeData, 
    selectedTemplate, 
    resumeStyle, 
    setResumeStyle,
    setCurrentStep 
  } = useResume();
  const [isCustomizing, setIsCustomizing] = useState(false);
  const resumeRef = useRef<HTMLDivElement>(null);

  // Update current step on mount
  useEffect(() => {
    setCurrentStep(2); // 0: templates, 1: edit, 2: preview, 3: download
  }, [setCurrentStep]);

  const handleBack = () => {
    router.push('/edit');
  };

  const handleContinue = () => {
    router.push('/download');
  };

  const handleStyleChange = (updates: Partial<ResumeStyle>) => {
    setResumeStyle({
      ...resumeStyle,
      ...updates
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Preview Your Resume</h1>
          <p className="text-lg text-gray-600">Review your resume before downloading</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Preview */}
          <div className="lg:col-span-2">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Resume Preview</CardTitle>
                <CardDescription>Template: {selectedTemplate}</CardDescription>
              </CardHeader>
              <CardContent>
                <div ref={resumeRef} className="print-page">
                  <ResumePreview 
                    data={resumeData} 
                    template={selectedTemplate}
                    style={resumeStyle}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Navigation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="ml-5 pl-4 border-l-2 border-blue-200">
                    <div className="flex items-center py-2">
                      <div className="shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-medium">
                        1
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-blue-600">Template</div>
                        <div className="text-xs text-blue-500">Select desired template</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="ml-5 pl-4 border-l-2 border-blue-200">
                    <div className="flex items-center py-2">
                      <div className="shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-medium">
                        2
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-500">Edit</div>
                        <div className="text-xs text-gray-400">Fill in your details</div>
                      </div>
                    </div>
                  </div>

                  <div className="ml-5 pl-4 border-l-2 border-blue-200">
                    <div className="flex items-center py-2">
                      <div className="shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-medium">
                        3
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-blue-600">Preview</div>
                        <div className="text-xs text-blue-500">Review your resume</div>
                      </div>
                    </div>
                  </div>

                  <div className="ml-5 pl-4 border-l-2 border-gray-200">
                    <div className="flex items-center py-2">
                      <div className="shrink-0 w-6 h-6 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center text-sm font-medium">
                        4
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-400">Download</div>
                        <div className="text-xs text-gray-400">Get your resume</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Customize Style</CardTitle>
              </CardHeader>
              <CardContent>
                <StyleCustomizer 
                  style={resumeStyle}
                  onStyleChange={handleStyleChange}
                  onClose={() => {}}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  onClick={handleBack}
                  variant="outline"
                  className="w-full"
                >
                  Back to Edit
                </Button>
                <Button
                  onClick={handleContinue}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  Continue to Download
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}