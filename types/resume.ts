export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
  website?: string;
  summary?: string;
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
}

export type TemplateType = 'modern' | 'classic';

export interface ResumeStyle {
  accentColor: string;
  fontFamily: string;
  fontSize: 'small' | 'medium' | 'large';
  spacing: 'compact' | 'normal' | 'relaxed';
}

export interface AppState {
  resumeData: ResumeData;
  selectedTemplate: TemplateType;
  style: ResumeStyle;
}
