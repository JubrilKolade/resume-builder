'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import ResumeForm from '@/components/ResumeForm';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useResume } from '@/contexts/ResumeContext';
import { ResumeData, AppState } from '@/types/resume';

const getTemplateImage = (template: string): string => {
  const imageMap: Record<string, string> = {
    classic: '/classic-template.png',
    modern: '/modern-template.png',
    sidebar: '/sidebar-template.png',
    creative: '/creative-template.png',
  };
  return imageMap[template] || '/classic-template.png';
};

export default function EditPage() {
  const router = useRouter();
  const {
    resumeData,
    setResumeData,
    selectedTemplate,
    resumeStyle,
    setCurrentStep
  } = useResume();

  // Update current step on mount
  useEffect(() => {
    setCurrentStep(1); // 0: templates, 1: edit, 2: preview, 3: download
  }, [setCurrentStep]);

  const handleResumeDataChange = (data: Partial<ResumeData>) => {
    setResumeData({
      ...resumeData,
      resumeData: {
        ...resumeData.resumeData,
        ...data
      }
    });
  };

  // Ensure we have the required resume data structure
  useEffect(() => {
    if (!resumeData.resumeData) {
      setResumeData({
        ...resumeData,
        resumeData: {
          personalInfo: {
            fullName: '',
            email: '',
            phone: '',
            location: '',
            linkedin: '',
            website: '',
            summary: ''
          },
          workExperience: [],
          education: [],
          skills: []
        }
      });
    }
  }, [resumeData, setResumeData]);

  const handleBack = () => {
    router.push('/');
  };

  const handleContinue = () => {
    router.push('/preview');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Your Resume</h1>
          <p className="text-lg text-gray-600">Fill in your information below</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Form */}
          <div className="lg:col-span-2">
            <Card className="mb-8 border-0 shadow-2xl">
              <CardHeader>
                <CardTitle>Resume Content</CardTitle>
                <CardDescription>Fill in your personal and professional information</CardDescription>
              </CardHeader>
              <CardContent>
                <ResumeForm
                  data={resumeData.resumeData}
                  onChange={handleResumeDataChange}
                />
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className='border-0 shadow-2xl'>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Template Preview</span>
                  <span className="text-lg font-bold text-blue-600 capitalize">
                    {selectedTemplate}
                  </span>
                </CardTitle>
                <CardDescription>Your selected template</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative w-full h-120 bg-gray-100 rounded-lg border border-gray-200 overflow-hidden">
                  <Image
                    src={getTemplateImage(selectedTemplate)}
                    alt={`${selectedTemplate} template preview`}
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="text-xs text-gray-500 text-center">
                  Switch templates from the previous page or preview your resume below
                </p>
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

                  <div className="ml-5 pl-4 border-l-2 border-gray-200">
                    <div className="flex items-center py-2 opacity-50">
                      <div className="shrink-0 w-6 h-6 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center text-sm font-medium">
                        3
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-500">Preview</div>
                        <div className="text-xs text-gray-400">Review your resume</div>
                      </div>
                    </div>
                  </div>

                  <div className="ml-5 pl-4 border-l-2 border-gray-200">
                    <div className="flex items-center py-2 opacity-50">
                      <div className="shrink-0 w-6 h-6 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center text-sm font-medium">
                        4
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-500">Download</div>
                        <div className="text-xs text-gray-400">Get your resume</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={handleBack}
                >
                  Back
                </Button>
                <Button
                  onClick={handleContinue}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Preview Resume
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
