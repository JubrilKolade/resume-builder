import { AdminAnalytics, OverviewMetrics, TemplateAnalytics, UserAnalytics } from '@/types/admin';
import { SavedResume } from '@/types/dashboard';
import { TemplateType } from '@/types/resume';

export const calculateOverviewMetrics = (resumes: SavedResume[]): OverviewMetrics => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
  const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

  return {
    totalUsers: 1247, // Mock data - in real app, this would come from user database
    activeUsers: 892, // Mock data
    totalResumes: resumes.length,
    resumesCreatedToday: resumes.filter(r => new Date(r.createdAt) >= today).length,
    resumesCreatedThisWeek: resumes.filter(r => new Date(r.createdAt) >= weekAgo).length,
    resumesCreatedThisMonth: resumes.filter(r => new Date(r.createdAt) >= monthAgo).length,
    totalExports: Math.floor(resumes.length * 1.4), // Mock calculation
    totalShares: Math.floor(resumes.length * 0.3), // Mock calculation
    averageSessionDuration: 8.5, // Mock data
    bounceRate: 23.4, // Mock data
  };
};

export const calculateTemplateAnalytics = (resumes: SavedResume[]): TemplateAnalytics => {
  const templateCounts = resumes.reduce((acc, resume) => {
    acc[resume.template] = (acc[resume.template] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const total = resumes.length;
  const templateUsage = {
    classic: {
      totalUses: templateCounts.classic || 0,
      percentage: ((templateCounts.classic || 0) / total) * 100,
      trend: 'stable' as const,
      monthlyUsage: generateMonthlyUsage(templateCounts.classic || 0),
    },
    modern: {
      totalUses: templateCounts.modern || 0,
      percentage: ((templateCounts.modern || 0) / total) * 100,
      trend: 'up' as const,
      monthlyUsage: generateMonthlyUsage(templateCounts.modern || 0),
    },
    sidebar: {
      totalUses: templateCounts.sidebar || 0,
      percentage: ((templateCounts.sidebar || 0) / total) * 100,
      trend: 'up' as const,
      monthlyUsage: generateMonthlyUsage(templateCounts.sidebar || 0),
    },
    creative: {
      totalUses: templateCounts.creative || 0,
      percentage: ((templateCounts.creative || 0) / total) * 100,
      trend: 'down' as const,
      monthlyUsage: generateMonthlyUsage(templateCounts.creative || 0),
    },
  };

  const mostPopularTemplate = (Object.entries(templateUsage).reduce((a, b) =>
    a[1].totalUses > b[1].totalUses ? a : b
  )[0] as TemplateType);

  const leastPopularTemplate = (Object.entries(templateUsage).reduce((a, b) =>
    a[1].totalUses < b[1].totalUses ? a : b
  )[0] as TemplateType);

  return {
    templateUsage,
    mostPopularTemplate,
    leastPopularTemplate,
    templateConversionRates: {
      classic: 0.67,
      modern: 0.72,
      sidebar: 0.64,
      creative: 0.58,
    },
  };
};

export const calculateUserAnalytics = (): UserAnalytics => {
  // Mock data - in real app, this would come from user database
  return {
    userGrowth: [
      { date: '2024-01-01', newUsers: 45, totalUsers: 980 },
      { date: '2024-02-01', newUsers: 67, totalUsers: 1047 },
      { date: '2024-03-01', newUsers: 89, totalUsers: 1136 },
      { date: '2024-04-01', newUsers: 111, totalUsers: 1247 },
    ],
    userRetention: {
      day1: 0.85,
      day7: 0.67,
      day30: 0.43,
    },
    userDemographics: {
      byCountry: [
        { country: 'United States', count: 678, percentage: 54.4 },
        { country: 'United Kingdom', count: 234, percentage: 18.8 },
        { country: 'Canada', count: 156, percentage: 12.5 },
        { country: 'Australia', count: 89, percentage: 7.1 },
        { country: 'Other', count: 90, percentage: 7.2 },
      ],
      byDevice: [
        { device: 'Desktop', count: 876, percentage: 70.2 },
        { device: 'Mobile', count: 289, percentage: 23.2 },
        { device: 'Tablet', count: 82, percentage: 6.6 },
      ],
    },
    powerUsers: [
      {
        userId: '1',
        email: 'user1@example.com',
        resumesCreated: 12,
        lastActive: new Date(),
      },
      {
        userId: '2',
        email: 'user2@example.com',
        resumesCreated: 8,
        lastActive: new Date(),
      },
    ],
  };
};

const generateMonthlyUsage = (totalUses: number) => {
  const monthlyAverage = Math.floor(totalUses / 3);
  return [
    { month: '2024-01', count: Math.max(0, monthlyAverage - 10) },
    { month: '2024-02', count: monthlyAverage },
    { month: '2024-03', count: monthlyAverage + 10 },
  ];
};

export const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};

export const formatPercentage = (num: number): string => {
  return (num * 100).toFixed(1) + '%';
};

export const formatDuration = (minutes: number): string => {
  if (minutes < 60) {
    return `${Math.round(minutes)}m`;
  } else {
    const hours = Math.floor(minutes / 60);
    const mins = Math.round(minutes % 60);
    return `${hours}h ${mins}m`;
  }
};

export const getTrendIcon = (trend: 'up' | 'down' | 'stable'): string => {
  switch (trend) {
    case 'up':
      return '↗️';
    case 'down':
      return '↘️';
    case 'stable':
      return '→';
  }
};

export const getTrendColor = (trend: 'up' | 'down' | 'stable'): string => {
  switch (trend) {
    case 'up':
      return 'text-green-600';
    case 'down':
      return 'text-red-600';
    case 'stable':
      return 'text-gray-600';
  }
};
