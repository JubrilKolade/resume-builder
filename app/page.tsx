'use client';

import { useState, useEffect } from 'react';
import { AppState, TemplateType } from '@/types/resume';
import { defaultResumeData, sampleResumeData } from '@/utils/defaultData';
import { saveToLocalStorage, loadFromLocalStorage } from '@/utils/helpers';
import ResumeForm from '@/components/ResumeForm';
import ResumePreview from '@/components/ResumePreview';
import Header from '@/components/Header';
import TemplateSelector from '@/components/TemplateSelector';
import StyleCustomizer from '@/components/StyleCustomizer';

export default function Home() {
  const [appState, setAppState] = useState<AppState>(defaultResumeData);
  const [showStyleCustomizer, setShowStyleCustomizer] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedData = loadFromLocalStorage();
    if (savedData) {
      setAppState(savedData);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      saveToLocalStorage(appState);
    }
  }, [appState, isLoading]);

  const handleDataChange = (newData: typeof appState.resumeData) => {
    setAppState(prev => ({ ...prev, resumeData: newData }));
  };

  const handleTemplateChange = (template: TemplateType) => {
    setAppState(prev => ({ ...prev, selectedTemplate: template }));
  };

  const handleStyleChange = (newStyle: typeof appState.style) => {
    setAppState(prev => ({ ...prev, style: newStyle }));
  };

  const handleLoadSample = () => {
    setAppState(sampleResumeData);
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all data? This cannot be undone.')) {
      setAppState(defaultResumeData);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Resume Builder...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        onLoadSample={handleLoadSample}
        onReset={handleReset}
        onToggleCustomizer={() => setShowStyleCustomizer(!showStyleCustomizer)}
      />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Build Your Professional Resume
          </h1>
          <p className="text-gray-600">
            Choose a template, fill in your information, and download your resume in seconds.
          </p>
        </div>

        <TemplateSelector
          selectedTemplate={appState.selectedTemplate}
          onTemplateChange={handleTemplateChange}
        />

        {showStyleCustomizer && (
          <StyleCustomizer
            style={appState.style}
            onStyleChange={handleStyleChange}
            onClose={() => setShowStyleCustomizer(false)}
          />
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <div className="lg:col-span-1">
            <ResumeForm
              data={appState.resumeData}
              onChange={handleDataChange}
            />
          </div>

          <div className="lg:col-span-1 lg:sticky lg:top-8 h-fit">
            <ResumePreview
              data={appState.resumeData}
              template={appState.selectedTemplate}
              style={appState.style}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
