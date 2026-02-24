import { TemplateType } from './resume';

export interface AdminAnalytics {
  overview: OverviewMetrics;
  templates: TemplateAnalytics;
  users: UserAnalytics;
  exports: ExportAnalytics;
  sharing: SharingAnalytics;
  performance: PerformanceMetrics;
}

export interface OverviewMetrics {
  totalUsers: number;
  activeUsers: number;
  totalResumes: number;
  resumesCreatedToday: number;
  resumesCreatedThisWeek: number;
  resumesCreatedThisMonth: number;
  totalExports: number;
  totalShares: number;
  averageSessionDuration: number;
  bounceRate: number;
}

export interface TemplateAnalytics {
  templateUsage: Record<TemplateType, {
    totalUses: number;
    percentage: number;
    trend: 'up' | 'down' | 'stable';
    monthlyUsage: Array<{
      month: string;
      count: number;
    }>;
  }>;
  mostPopularTemplate: TemplateType;
  leastPopularTemplate: TemplateType;
  templateConversionRates: Record<TemplateType, number>;
}

export interface UserAnalytics {
  userGrowth: Array<{
    date: string;
    newUsers: number;
    totalUsers: number;
  }>;
  userRetention: {
    day1: number;
    day7: number;
    day30: number;
  };
  userDemographics: {
    byCountry: Array<{
      country: string;
      count: number;
      percentage: number;
    }>;
    byDevice: Array<{
      device: string;
      count: number;
      percentage: number;
    }>;
  };
  powerUsers: Array<{
    userId: string;
    email: string;
    resumesCreated: number;
    lastActive: Date;
  }>;
}

export interface ExportAnalytics {
  exportByFormat: {
    pdf: number;
    docx: number;
    txt: number;
  };
  exportTrends: Array<{
    date: string;
    pdf: number;
    docx: number;
    txt: number;
  }>;
  averageExportsPerUser: number;
  exportSuccessRate: number;
}

export interface SharingAnalytics {
  totalShares: number;
  publicShares: number;
  privateShares: number;
  shareViews: number;
  shareDownloads: number;
  viralCoefficient: number;
  mostSharedResumes: Array<{
    resumeId: string;
    title: string;
    shares: number;
    views: number;
  }>;
}

export interface PerformanceMetrics {
  pageLoadTimes: Array<{
    page: string;
    avgLoadTime: number;
    p95LoadTime: number;
  }>;
  errorRates: Array<{
    error: string;
    count: number;
    percentage: number;
  }>;
  uptime: number;
  serverResponseTime: number;
}

export interface AdminUser {
  id: string;
  email: string;
  role: 'admin' | 'moderator' | 'viewer';
  permissions: string[];
  lastLogin: Date;
  isActive: boolean;
}

export interface AdminSettings {
  siteMaintenance: boolean;
  maintenanceMessage?: string;
  featureFlags: Record<string, boolean>;
  rateLimits: {
    exports: number;
    shares: number;
    apiCalls: number;
  };
  securitySettings: {
    maxLoginAttempts: number;
    sessionTimeout: number;
    requireTwoFactor: boolean;
  };
}
