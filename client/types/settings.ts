import { TemplateType, ResumeStyle } from './resume';

export interface UserSettings {
  profile: UserProfile;
  preferences: UserPreferences;
  privacy: PrivacySettings;
  notifications: NotificationSettings;
  export: ExportSettings;
}

export interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string;
  bio?: string;
  location?: string;
  website?: string;
  linkedin?: string;
  github?: string;
}

export interface UserPreferences {
  defaultTemplate: TemplateType;
  defaultStyle: ResumeStyle;
  language: string;
  timezone: string;
  dateFormat: string;
  theme: 'light' | 'dark' | 'system';
  autoSave: boolean;
  autoSaveInterval: number; // in minutes
  showTips: boolean;
  dashboardLayout: 'grid' | 'list';
  itemsPerPage: number;
}

export interface PrivacySettings {
  profileVisibility: 'public' | 'private';
  allowAnalytics: boolean;
  allowCookies: boolean;
  dataRetention: number; // in days
  shareDataWithThirdParty: boolean;
  enableTwoFactor: boolean;
}

export interface NotificationSettings {
  emailNotifications: boolean;
  browserNotifications: boolean;
  newFeatures: boolean;
  securityAlerts: boolean;
  resumeViews: boolean;
  sharingActivity: boolean;
  weeklyDigest: boolean;
}

export interface ExportSettings {
  defaultFormat: 'pdf' | 'docx' | 'txt';
  includeWatermark: boolean;
  watermarkText?: string;
  pdfQuality: 'low' | 'medium' | 'high';
  docxCompatibility: '2007' | '2010' | '2013' | '2016' | '365';
  includeMetadata: boolean;
}

export interface ImportSettings {
  autoDetectSections: boolean;
  preserveFormatting: boolean;
  mergeWithExisting: boolean;
  validateData: boolean;
}

export interface APISettings {
  apiKey?: string;
  webhookUrl?: string;
  integrationEnabled: boolean;
  syncInterval: number; // in hours
}
