'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback, useRef } from 'react';
import { ResumeData, TemplateType, ResumeStyle, AppState } from '@/types/resume';
import { defaultResumeData } from '@/utils/defaultData';
import { useResumes } from '@/hooks/useResumes';
import { useAuth } from '@/contexts/AuthContext';

interface ResumeContextType {
  resumeData: AppState;
  setResumeData: (data: AppState) => void;
  selectedTemplate: TemplateType;
  setSelectedTemplate: (template: TemplateType) => void;
  resumeStyle: ResumeStyle;
  setResumeStyle: (style: ResumeStyle) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  resumeId: string | null;
  setResumeId: (id: string | null) => void;
  isSaving: boolean;
  saveResume: () => Promise<string | null>;
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
  const { isAuthenticated } = useAuth();
  const { createResume, updateResume } = useResumes();

  const [resumeId, setResumeId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const [resumeData, setResumeData] = useState<AppState>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('resumeData');
        return saved ? JSON.parse(saved) : defaultResumeData;
      } catch {
        return defaultResumeData;
      }
    }
    return defaultResumeData;
  });

  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType>('classic');

  const [resumeStyle, setResumeStyle] = useState<ResumeStyle>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('resumeStyle');
        return saved ? JSON.parse(saved) : defaultResumeStyle;
      } catch {
        return defaultResumeStyle;
      }
    }
    return defaultResumeStyle;
  });

  const [currentStep, setCurrentStep] = useState(0);

  // Save to localStorage whenever resumeData or resumeStyle changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('resumeData', JSON.stringify(resumeData));
    }
  }, [resumeData]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('resumeStyle', JSON.stringify(resumeStyle));
    }
  }, [resumeStyle]);

  const saveResume = useCallback(async () => {
    if (!isAuthenticated) return null;

    setIsSaving(true);
    try {
      const payload = {
        data: resumeData.resumeData,
        template: selectedTemplate,
        style: resumeStyle,
      };

      if (resumeId) {
        await updateResume({ id: resumeId, data: payload });
        return resumeId;
      } else {
        const result = await createResume(payload);
        const newId = result.id;
        setResumeId(newId);
        return newId;
      }
    } catch (error) {
      console.error('Error saving resume:', error);
      return null;
    } finally {
      setIsSaving(false);
    }
  }, [isAuthenticated, resumeId, resumeData, selectedTemplate, resumeStyle, createResume, updateResume]);

  // Auto-save logic
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isAuthenticated) return;

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      saveResume();
    }, 3000); // Auto-save after 3 seconds of inactivity

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [resumeData, selectedTemplate, resumeStyle, isAuthenticated, saveResume]);

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
        resumeId,
        setResumeId,
        isSaving,
        saveResume,
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
