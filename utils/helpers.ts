import { AppState, ResumeData } from '@/types/resume';

const STORAGE_KEY = 'resume-builder-data';

export const saveToLocalStorage = (data: AppState): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

export const loadFromLocalStorage = (): AppState | null => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return null;
  }
};

export const clearLocalStorage = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing localStorage:', error);
  }
};

export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
};

export const formatDate = (date: string): string => {
  if (!date) return '';
  const [year, month] = date.split('-');
  const monthNum = month != null ? parseInt(month, 10) : NaN;
  if (!year || isNaN(monthNum) || monthNum < 1 || monthNum > 12) return date;
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${monthNames[monthNum - 1]} ${year}`;
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^[\d\s\-\+\(\)]+$/;
  return phone.length >= 10 && phoneRegex.test(phone);
};

export const isResumeDataComplete = (data: ResumeData): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];
  const personalInfo = data?.personalInfo;

  if (!personalInfo?.fullName?.trim()) {
    errors.push('Full name is required');
  }

  if (!personalInfo?.email?.trim()) {
    errors.push('Email is required');
  } else if (!validateEmail(personalInfo.email)) {
    errors.push('Valid email is required');
  }

  if (!personalInfo?.phone?.trim()) {
    errors.push('Phone number is required');
  }

  if (!data.workExperience?.length) {
    errors.push('At least one work experience is required');
  }

  if (!data.education?.length) {
    errors.push('At least one education entry is required');
  }

  if (!data.skills?.length) {
    errors.push('At least one skill is required');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};
