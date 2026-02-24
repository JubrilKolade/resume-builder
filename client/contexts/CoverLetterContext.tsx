'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { CoverLetterData, CoverLetterTemplate, CoverLetterStyle } from '@/types/coverLetter';
import { PersonalInfo } from '@/types/resume';

interface CoverLetterContextType {
  coverLetters: CoverLetterData[];
  setCoverLetters: (letters: CoverLetterData[]) => void;
  currentCoverLetter: CoverLetterData | null;
  setCurrentCoverLetter: (letter: CoverLetterData | null) => void;
  selectedTemplate: CoverLetterTemplate;
  setSelectedTemplate: (template: CoverLetterTemplate) => void;
  coverLetterStyle: CoverLetterStyle;
  setCoverLetterStyle: (style: CoverLetterStyle) => void;
  
  // Actions
  createCoverLetter: (personalInfo: PersonalInfo) => CoverLetterData;
  updateCoverLetter: (id: string, updates: Partial<CoverLetterData>) => void;
  deleteCoverLetter: (id: string) => void;
  duplicateCoverLetter: (id: string) => void;
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
  const [coverLetters, setCoverLetters] = useState<CoverLetterData[]>([]);
  const [currentCoverLetter, setCurrentCoverLetter] = useState<CoverLetterData | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<CoverLetterTemplate>('classic');
  const [coverLetterStyle, setCoverLetterStyle] = useState<CoverLetterStyle>(defaultCoverLetterStyle);

  // Load data from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedCoverLetters = localStorage.getItem('coverLetters');
        if (savedCoverLetters) {
          const letters = JSON.parse(savedCoverLetters);
          setCoverLetters(letters.map((l: any) => ({
            ...l,
            createdAt: new Date(l.createdAt),
            updatedAt: new Date(l.updatedAt),
          })));
        }

        const savedStyle = localStorage.getItem('coverLetterStyle');
        if (savedStyle) {
          setCoverLetterStyle(JSON.parse(savedStyle));
        }
      } catch (error) {
        console.error('Error loading cover letter data from localStorage:', error);
      }
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('coverLetters', JSON.stringify(coverLetters));
    }
  }, [coverLetters]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('coverLetterStyle', JSON.stringify(coverLetterStyle));
    }
  }, [coverLetterStyle]);

  const createCoverLetter = (personalInfo: PersonalInfo): CoverLetterData => {
    const newCoverLetter: CoverLetterData = {
      id: Date.now().toString(),
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
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setCoverLetters(prev => [...prev, newCoverLetter]);
    setCurrentCoverLetter(newCoverLetter);
    return newCoverLetter;
  };

  const updateCoverLetter = (id: string, updates: Partial<CoverLetterData>) => {
    setCoverLetters(prev => 
      prev.map(letter => 
        letter.id === id 
          ? { ...letter, ...updates, updatedAt: new Date() }
          : letter
      )
    );

    if (currentCoverLetter && currentCoverLetter.id === id) {
      setCurrentCoverLetter(prev => 
        prev ? { ...prev, ...updates, updatedAt: new Date() } : null
      );
    }
  };

  const deleteCoverLetter = (id: string) => {
    setCoverLetters(prev => prev.filter(letter => letter.id !== id));
    if (currentCoverLetter && currentCoverLetter.id === id) {
      setCurrentCoverLetter(null);
    }
  };

  const duplicateCoverLetter = (id: string) => {
    const letter = coverLetters.find(l => l.id === id);
    if (letter) {
      const duplicated: CoverLetterData = {
        ...letter,
        id: Date.now().toString(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setCoverLetters(prev => [...prev, duplicated]);
      return duplicated;
    }
    return null;
  };

  return (
    <CoverLetterContext.Provider
      value={{
        coverLetters,
        setCoverLetters,
        currentCoverLetter,
        setCurrentCoverLetter,
        selectedTemplate,
        setSelectedTemplate,
        coverLetterStyle,
        setCoverLetterStyle,
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
