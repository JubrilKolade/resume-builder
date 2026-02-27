'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { AdminAnalytics, AdminSettings, AdminUser } from '@/types/admin';

interface AdminContextType {
  // Authentication
  isAuthenticated: boolean;
  setIsAuthenticated: (authenticated: boolean) => void;
  currentUser: AdminUser | null;
  setCurrentUser: (user: AdminUser | null) => void;

  // Analytics
  analytics: AdminAnalytics | null;
  setAnalytics: (analytics: AdminAnalytics) => void;
  isLoadingAnalytics: boolean;
  setIsLoadingAnalytics: (loading: boolean) => void;

  // Settings
  adminSettings: AdminSettings;
  setAdminSettings: (settings: AdminSettings) => void;

  // Admin users
  adminUsers: AdminUser[];
  setAdminUsers: (users: AdminUser[]) => void;

  // Actions
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  refreshAnalytics: () => Promise<void>;
  updateAdminSettings: (settings: Partial<AdminSettings>) => void;
  addAdminUser: (user: Omit<AdminUser, 'id' | 'lastLogin'>) => void;
  removeAdminUser: (id: string) => void;
  toggleUserStatus: (id: string) => void;
}

const defaultAdminSettings: AdminSettings = {
  siteMaintenance: false,
  featureFlags: {
    enableCoverLetters: true,
    enableSharing: true,
    enableImportExport: true,
    enableAnalytics: true,
  },
  rateLimits: {
    exports: 10,
    shares: 5,
    apiCalls: 100,
  },
  securitySettings: {
    maxLoginAttempts: 5,
    sessionTimeout: 24,
    requireTwoFactor: false,
  },
};

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(null);
  const [analytics, setAnalytics] = useState<AdminAnalytics | null>(null);
  const [isLoadingAnalytics, setIsLoadingAnalytics] = useState(false);
  const [adminSettings, setAdminSettings] = useState<AdminSettings>(defaultAdminSettings);
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);

  // Check authentication on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedAuth = localStorage.getItem('adminAuth');
        if (savedAuth) {
          const auth = JSON.parse(savedAuth);
          setIsAuthenticated(auth.isAuthenticated);
          setCurrentUser(auth.currentUser);
        }

        const savedSettings = localStorage.getItem('adminSettings');
        if (savedSettings) {
          setAdminSettings(JSON.parse(savedSettings));
        }
      } catch (error) {
        console.error('Error loading admin data:', error);
      }
    }
  }, []);

  // Save authentication state to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('adminAuth', JSON.stringify({
        isAuthenticated,
        currentUser,
      }));
    }
  }, [isAuthenticated, currentUser]);

  // Save admin settings to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('adminSettings', JSON.stringify(adminSettings));
    }
  }, [adminSettings]);

  const login = async (email: string, password: string): Promise<boolean> => {
    // In a real app, this would make an API call
    // For demo purposes, we'll use hardcoded credentials
    if (email === 'admin@applyos.com' && password === 'admin123') {
      const user: AdminUser = {
        id: '1',
        email: 'admin@applyos.com',
        role: 'admin',
        permissions: ['read', 'write', 'delete', 'admin'],
        lastLogin: new Date(),
        isActive: true,
      };

      setIsAuthenticated(true);
      setCurrentUser(user);

      // Load mock analytics
      await refreshAnalytics();

      return true;
    }

    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    setAnalytics(null);

    if (typeof window !== 'undefined') {
      localStorage.removeItem('adminAuth');
    }
  };

  const refreshAnalytics = async (): Promise<void> => {
    setIsLoadingAnalytics(true);

    try {
      // In a real app, this would fetch from an API
      // For demo purposes, we'll generate mock data
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call

      const mockAnalytics: AdminAnalytics = {
        overview: {
          totalUsers: 1247,
          activeUsers: 892,
          totalResumes: 3847,
          resumesCreatedToday: 47,
          resumesCreatedThisWeek: 234,
          resumesCreatedThisMonth: 892,
          totalExports: 1256,
          totalShares: 567,
          averageSessionDuration: 8.5,
          bounceRate: 23.4,
        },
        templates: {
          templateUsage: {
            classic: {
              totalUses: 1523,
              percentage: 39.6,
              trend: 'up',
              monthlyUsage: [
                { month: '2024-01', count: 120 },
                { month: '2024-02', count: 135 },
                { month: '2024-03', count: 142 },
              ],
            },
            modern: {
              totalUses: 987,
              percentage: 25.7,
              trend: 'stable',
              monthlyUsage: [
                { month: '2024-01', count: 85 },
                { month: '2024-02', count: 92 },
                { month: '2024-03', count: 88 },
              ],
            },
            sidebar: {
              totalUses: 876,
              percentage: 22.8,
              trend: 'up',
              monthlyUsage: [
                { month: '2024-01', count: 70 },
                { month: '2024-02', count: 78 },
                { month: '2024-03', count: 85 },
              ],
            },
            creative: {
              totalUses: 461,
              percentage: 11.9,
              trend: 'down',
              monthlyUsage: [
                { month: '2024-01', count: 55 },
                { month: '2024-02', count: 48 },
                { month: '2024-03', count: 42 },
              ],
            },
          },
          mostPopularTemplate: 'classic',
          leastPopularTemplate: 'creative',
          templateConversionRates: {
            classic: 0.67,
            modern: 0.72,
            sidebar: 0.64,
            creative: 0.58,
          },
        },
        users: {
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
        },
        exports: {
          exportByFormat: {
            pdf: 987,
            docx: 234,
            txt: 35,
          },
          exportTrends: [
            { date: '2024-04-01', pdf: 45, docx: 12, txt: 2 },
            { date: '2024-04-02', pdf: 52, docx: 8, txt: 1 },
            { date: '2024-04-03', pdf: 38, docx: 15, txt: 3 },
          ],
          averageExportsPerUser: 1.4,
          exportSuccessRate: 0.97,
        },
        sharing: {
          totalShares: 567,
          publicShares: 234,
          privateShares: 333,
          shareViews: 2340,
          shareDownloads: 456,
          viralCoefficient: 0.12,
          mostSharedResumes: [
            {
              resumeId: '1',
              title: 'Software Engineer Resume',
              shares: 23,
              views: 234,
            },
            {
              resumeId: '2',
              title: 'Marketing Manager Resume',
              shares: 18,
              views: 189,
            },
          ],
        },
        performance: {
          pageLoadTimes: [
            { page: '/dashboard', avgLoadTime: 1.2, p95LoadTime: 2.8 },
            { page: '/edit', avgLoadTime: 1.5, p95LoadTime: 3.2 },
            { page: '/preview', avgLoadTime: 1.1, p95LoadTime: 2.5 },
          ],
          errorRates: [
            { error: 'PDF generation failed', count: 12, percentage: 0.3 },
            { error: 'Export timeout', count: 8, percentage: 0.2 },
          ],
          uptime: 99.8,
          serverResponseTime: 0.8,
        },
      };

      setAnalytics(mockAnalytics);
    } catch (error) {
      console.error('Error refreshing analytics:', error);
    } finally {
      setIsLoadingAnalytics(false);
    }
  };

  const updateAdminSettings = (settings: Partial<AdminSettings>) => {
    setAdminSettings(prev => ({ ...prev, ...settings }));
  };

  const addAdminUser = (user: Omit<AdminUser, 'id' | 'lastLogin'>) => {
    const newUser: AdminUser = {
      ...user,
      id: Date.now().toString(),
      lastLogin: new Date(),
    };
    setAdminUsers(prev => [...prev, newUser]);
  };

  const removeAdminUser = (id: string) => {
    setAdminUsers(prev => prev.filter(user => user.id !== id));
  };

  const toggleUserStatus = (id: string) => {
    setAdminUsers(prev =>
      prev.map(user =>
        user.id === id ? { ...user, isActive: !user.isActive } : user
      )
    );
  };

  return (
    <AdminContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        currentUser,
        setCurrentUser,
        analytics,
        setAnalytics,
        isLoadingAnalytics,
        setIsLoadingAnalytics,
        adminSettings,
        setAdminSettings,
        adminUsers,
        setAdminUsers,
        login,
        logout,
        refreshAnalytics,
        updateAdminSettings,
        addAdminUser,
        removeAdminUser,
        toggleUserStatus,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
