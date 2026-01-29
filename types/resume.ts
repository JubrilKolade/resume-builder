export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
  website?: string;
  summary?: string;
  title?: string;
  image?: string;
}

export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  gpa?: string;
}

export interface Skill {
  id: string;
  name: string;
  category?: string;
  level?: number;
}

export type LanguageLevel = 'Basic' | 'Intermediate' | 'Advanced' | 'Fluent' | 'Native';

export interface Language {
  id: string;
  name: string;
  level: LanguageLevel | number; // Support both string and number for backward compatibility
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  link?: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  workExperience: WorkExperience[];
  education: Education[];
  skills: Skill[];
  certifications?: Certification[];
  projects?: Project[];
  languages?: Language[];
}

export type TemplateType = 'modern' | 'classic' | 'professional' | 'creative' | 'minimalist' | 'executive';

export interface ResumeStyle {
  // Color Scheme
  accentColor: string;
  textColor?: string;
  backgroundColor?: string;
  headerColor?: string;
  
  // Typography
  fontFamily: string;
  fontSize: 'small' | 'medium' | 'large';
  headingFont?: string;
  bodyFont?: string;
  
  // Layout
  spacing: 'compact' | 'normal' | 'relaxed';
  sectionSpacing?: number;
  
  // Borders & Dividers
  borderColor?: string;
  borderWidth?: number;
  borderRadius?: number;
  
  // Custom CSS (for advanced users)
  customCSS?: string;
}

export interface AppState {
  resumeData: ResumeData;
  selectedTemplate: TemplateType;
  style: ResumeStyle;
}
