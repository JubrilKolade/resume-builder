import { ResumeData, TemplateType } from './resume';

export interface SharedResume {
  id: string;
  resumeId: string;
  shareUrl: string;
  isPublic: boolean;
  password?: string;
  expiresAt?: Date;
  allowDownload: boolean;
  allowComments: boolean;
  viewCount: number;
  downloadCount: number;
  createdAt: Date;
  lastViewed: Date;
  qrCode?: string;
}

export interface ShareSettings {
  isPublic: boolean;
  password?: string;
  expiresAt?: Date;
  allowDownload: boolean;
  allowComments: boolean;
  customUrl?: string;
  trackViews: boolean;
}

export interface ShareAnalytics {
  totalViews: number;
  uniqueViews: number;
  downloadCount: number;
  averageViewDuration: number;
  viewsByDate: Array<{
    date: string;
    views: number;
  }>;
  referrers: Array<{
    source: string;
    count: number;
  }>;
  locations: Array<{
    country: string;
    count: number;
  }>;
}

export interface PublicResumeView {
  resumeData: ResumeData;
  template: TemplateType;
  style: any;
  shareSettings: ShareSettings;
  viewCount: number;
  isOwner: boolean;
}

export interface QRCodeOptions {
  size: number;
  bgColor: string;
  fgColor: string;
  includeLogo: boolean;
  errorCorrectionLevel: 'L' | 'M' | 'Q' | 'H';
}
