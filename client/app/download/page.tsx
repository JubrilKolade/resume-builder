'use client';

import { useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useResume } from '@/contexts/ResumeContext';
import { useApp } from '@/contexts/AppContext';
import ResumePreview, { ResumePreviewHandle } from '@/components/ResumePreview';
import { generatePDF } from '@/utils/pdf-generator';
import { generateDocx } from '@/utils/docx-generator';

export default function DownloadPage() {
  const router = useRouter();
  const { addNotification } = useApp();
  const {
    resumeData: appState,
    selectedTemplate,
    resumeStyle,
    setCurrentStep,
    getResumeData,
  } = useResume();

  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadFormat, setDownloadFormat] = useState<'pdf' | 'docx' | 'txt'>('pdf');
  const resumeRef = useRef<ResumePreviewHandle>(null);

  // Update current step on mount
  useEffect(() => {
    setCurrentStep(3); // 0: templates, 1: edit, 2: preview, 3: download
  }, [setCurrentStep]);

  const handleBack = () => {
    router.push('/preview');
  };

  const handleDownload = async () => {
    setIsDownloading(true);

    // Get clean ResumeData structure for generators
    const data = getResumeData();

    try {
      if (downloadFormat === 'pdf') {
        const element = resumeRef.current?.getElement();
        if (element) {
          await generatePDF(element, data);
        } else {
          addNotification({
            type: 'error',
            title: 'PDF generation failed',
            message: 'Could not load resume for PDF generation. Please reload and try again.',
          });
        }
      } else if (downloadFormat === 'docx') {
        await generateDocx(data);
      } else if (downloadFormat === 'txt') {
        // Simple text export
        const textContent = JSON.stringify(data, null, 2);
        const blob = new Blob([textContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'resume.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error('Download failed:', error);
      addNotification({
        type: 'error',
        title: 'Download failed',
        message: error instanceof Error ? error.message : 'An unexpected error occurred.',
      });
    } finally {
      setIsDownloading(false);
    }
  };

  const handleStartNewResume = () => {
    if (confirm('This will start a new resume. Your current progress will be saved.')) {
      router.push('/');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
            <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Resume is Ready!</h1>
          <p className="text-lg text-gray-600">Download your resume in the format that works best for you</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card className="mb-8 border-0 shadow-2xl">
              <CardHeader>
                <CardTitle>Download Options</CardTitle>
                <CardDescription>Choose your preferred format</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${downloadFormat === 'pdf' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}
                    onClick={() => setDownloadFormat('pdf')}
                  >
                    <div className="flex items-start">
                      <div className="shrink-0 mt-1">
                        <div className="h-10 w-10 rounded-md bg-red-100 flex items-center justify-center">
                          <span className="text-red-600 font-bold">PDF</span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <h3 className="font-medium text-gray-900">PDF Document</h3>
                        <p className="text-sm text-gray-500">Best for printing and sharing online</p>
                      </div>
                      <div className="ml-auto">
                        <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${downloadFormat === 'pdf' ? 'border-blue-500 bg-blue-500' : 'border-gray-300'}`}>
                          {downloadFormat === 'pdf' && (
                            <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${downloadFormat === 'docx' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}
                    onClick={() => setDownloadFormat('docx')}
                  >
                    <div className="flex items-start">
                      <div className="shrink-0 mt-1">
                        <div className="h-10 w-10 rounded-md bg-blue-100 flex items-center justify-center">
                          <span className="text-blue-600 font-bold">DOCX</span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <h3 className="font-medium text-gray-900">Word Document</h3>
                        <p className="text-sm text-gray-500">Editable in Microsoft Word</p>
                      </div>
                      <div className="ml-auto">
                        <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${downloadFormat === 'docx' ? 'border-blue-500 bg-blue-500' : 'border-gray-300'}`}>
                          {downloadFormat === 'docx' && (
                            <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${downloadFormat === 'txt' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}
                    onClick={() => setDownloadFormat('txt')}
                  >
                    <div className="flex items-start">
                      <div className="shrink-0 mt-1">
                        <div className="h-10 w-10 rounded-md bg-gray-100 flex items-center justify-center">
                          <span className="text-gray-600 font-mono">TXT</span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <h3 className="font-medium text-gray-900">Plain Text</h3>
                        <p className="text-sm text-gray-500">Simple text format</p>
                      </div>
                      <div className="ml-auto">
                        <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${downloadFormat === 'txt' ? 'border-blue-500 bg-blue-500' : 'border-gray-300'}`}>
                          {downloadFormat === 'txt' && (
                            <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 border-t border-gray-200 pt-6">
                  <h3 className="text-sm font-medium text-gray-900 mb-4">Preview</h3>
                  <div className="border border-gray-200 rounded-lg p-4 bg-white max-w-2xl mx-auto">
                    <div className="scale-75 origin-top">
                      <ResumePreview
                        ref={resumeRef}
                        data={appState}
                        template={selectedTemplate}
                        style={resumeStyle}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t border-gray-200 bg-gray-50 px-6 py-4">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  disabled={isDownloading}
                >
                  Back
                </Button>
                <div className="space-x-3">
                  <Button
                    variant="outline"
                    onClick={handleStartNewResume}
                    disabled={isDownloading}
                  >
                    Start New Resume
                  </Button>
                  <Button
                    onClick={handleDownload}
                    disabled={isDownloading}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    {isDownloading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Downloading...
                      </>
                    ) : (
                      `Download as ${downloadFormat.toUpperCase()}`
                    )}
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className='border-0 shadow-2xl'>
              <CardHeader>
                <CardTitle>Next Steps</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start">
                  <div className="shrink-0 mt-1">
                    <svg className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h4 className="text-sm font-medium text-gray-900">Review Your Resume</h4>
                    <p className="text-sm text-gray-500">Check for any typos or formatting issues before sending.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="shrink-0 mt-1">
                    <svg className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h4 className="text-sm font-medium text-gray-900">Save Securely</h4>
                    <p className="text-sm text-gray-500">Keep a copy of your resume in a secure location.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="shrink-0 mt-1">
                    <svg className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h4 className="text-sm font-medium text-gray-900">Update Regularly</h4>
                    <p className="text-sm text-gray-500">Keep your resume current with new skills and experiences.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className='border-0 shadow-2xl'>
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
                        <div className="text-sm font-medium text-blue-600">Edit</div>
                        <div className="text-xs text-blue-500">Fill in your details</div>
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
                      <div className="shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-medium">
                        4
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-blue-600">Download</div>
                        <div className="text-xs text-blue-500">Get your resume</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className='border-0 shadow-2xl'>
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  If you encounter any issues with downloading your resume, please try a different browser or contact support.
                </p>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => alert('Contact support at: support@rapidapply.com')}
                >
                  Contact Support
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
