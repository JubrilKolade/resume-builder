import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { CoverLetterData, CoverLetterTemplate, CoverLetterStyle } from '@/types/coverLetter';
import { PersonalInfo } from '@/types/resume';
import { useCoverLetters } from '@/hooks/useCoverLetters';

interface CoverLetterContextType {
  coverLetters: CoverLetterData[];
  setCoverLetters: (letters: CoverLetterData[]) => void;
  currentCoverLetter: CoverLetterData | null;
  setCurrentCoverLetter: (letter: CoverLetterData | null) => void;
  selectedTemplate: CoverLetterTemplate;
  setSelectedTemplate: (template: CoverLetterTemplate) => void;
  coverLetterStyle: CoverLetterStyle;
  setCoverLetterStyle: (style: CoverLetterStyle) => void;
  isLoading: boolean;

  // Actions
  createCoverLetter: (personalInfo: PersonalInfo) => Promise<CoverLetterData>;
  updateCoverLetter: (id: string, updates: Partial<CoverLetterData>) => Promise<void>;
  deleteCoverLetter: (id: string) => Promise<void>;
  duplicateCoverLetter: (id: string) => Promise<void>;
}

const defaultCoverLetterStyle: CoverLetterStyle = {
  fontFamily: 'Inter',
  fontSize: 'medium',
  accentColor: '#2563eb',
  spacing: 'normal',
  headerStyle: 'left-aligned',
};

const CoverLetterContext = createContext<CoverLetterContextType | undefined>(undefined);

export const CoverLetterProvider = ({ children }: { children: ReactNode }) => {
  const {
    coverLetters,
    isLoading,
    createCoverLetter: createCoverLetterApi,
    updateCoverLetter: updateCoverLetterApi,
    deleteCoverLetter: deleteCoverLetterApi
  } = useCoverLetters();

  const [currentCoverLetter, setCurrentCoverLetter] = useState<CoverLetterData | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<CoverLetterTemplate>('classic');
  const [coverLetterStyle, setCoverLetterStyle] = useState<CoverLetterStyle>(defaultCoverLetterStyle);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedStyle = localStorage.getItem('coverLetterStyle');
        if (savedStyle) {
          setCoverLetterStyle(JSON.parse(savedStyle));
        }
      } catch (error) {
        console.error('Error loading cover letter style from localStorage:', error);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('coverLetterStyle', JSON.stringify(coverLetterStyle));
    }
  }, [coverLetterStyle]);

  const createCoverLetter = async (personalInfo: PersonalInfo): Promise<CoverLetterData> => {
    const newCoverLetter: any = {
      personalInfo,
      recipientInfo: {
        name: '',
        title: '',
        company: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
      },
      letterContent: {
        greeting: 'Dear Hiring Manager,',
        introduction: '',
        bodyParagraphs: ['', '', ''],
        closing: 'Sincerely,',
        signature: personalInfo.fullName?.trim() || 'Your Name',
      },
      template: selectedTemplate,
      style: coverLetterStyle,
    };

    const created = await createCoverLetterApi(newCoverLetter);
    setCurrentCoverLetter(created);
    return created;
  };

  const updateCoverLetter = async (id: string, updates: Partial<CoverLetterData>) => {
    await updateCoverLetterApi({ id, data: updates });
    if (currentCoverLetter && currentCoverLetter.id === id) {
      setCurrentCoverLetter(prev => prev ? { ...prev, ...updates } : null);
    }
  };

  const deleteCoverLetter = async (id: string) => {
    await deleteCoverLetterApi(id);
    if (currentCoverLetter && currentCoverLetter.id === id) {
      setCurrentCoverLetter(null);
    }
  };

  const duplicateCoverLetter = async (id: string) => {
    const letter = coverLetters.find(l => l.id === id);
    if (letter) {
      const { id: _, createdAt, updatedAt, ...rest } = letter;
      await createCoverLetterApi(rest);
    }
  };

  return (
    <CoverLetterContext.Provider
      value={{
        coverLetters,
        setCoverLetters: () => { }, // No-op
        currentCoverLetter,
        setCurrentCoverLetter,
        selectedTemplate,
        setSelectedTemplate,
        coverLetterStyle,
        setCoverLetterStyle,
        isLoading,
        createCoverLetter,
        updateCoverLetter,
        deleteCoverLetter,
        duplicateCoverLetter,
      }}
    >
      {children}
    </CoverLetterContext.Provider>
  );
};

export const useCoverLetter = () => {
  const context = useContext(CoverLetterContext);
  if (context === undefined) {
    throw new Error('useCoverLetter must be used within a CoverLetterProvider');
  }
  return context;
};
