'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ResumeData, TemplateType, ResumeStyle, AppState } from '@/types/resume';
import { defaultResumeData } from '@/utils/defaultData';

interface ResumeContextType {
  resumeData: AppState;
  setResumeData: (data: AppState) => void;
  selectedTemplate: TemplateType;
  setSelectedTemplate: (template: TemplateType) => void;
  resumeStyle: ResumeStyle;
  setResumeStyle: (style: ResumeStyle) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  // Convenience getters for nested data
  getResumeData: () => ResumeData;
}

const defaultResumeStyle: ResumeStyle = {
  accentColor: '#2563eb', // blue-600
  fontFamily: 'Inter',
  fontSize: 'medium',
  spacing: 'normal',
};

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const ResumeProvider = ({ children }: { children: ReactNode }) => {
  const [resumeData, setResumeData] = useState<AppState>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('resumeData');
      return saved ? JSON.parse(saved) : defaultResumeData;
    }
    return defaultResumeData;
  });

  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType>('professional');
  
  const [resumeStyle, setResumeStyle] = useState<ResumeStyle>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('resumeStyle');
      return saved ? JSON.parse(saved) : defaultResumeStyle;
    }
    return defaultResumeStyle;
  });

  const [currentStep, setCurrentStep] = useState(0);

  // Save to localStorage whenever resumeData or resumeStyle changes
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('resumeData', JSON.stringify(resumeData));
    }
  }, [resumeData]);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('resumeStyle', JSON.stringify(resumeStyle));
    }
  }, [resumeStyle]);

  return (
    <ResumeContext.Provider
      value={{
        resumeData,
        setResumeData,
        selectedTemplate,
        setSelectedTemplate,
        resumeStyle,
        setResumeStyle,
        currentStep,
        setCurrentStep,
        getResumeData: () => resumeData.resumeData,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
};
