'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { SavedResume, FilterOptions, DashboardView, DashboardStats } from '@/types/dashboard';
import { UserSettings } from '@/types/settings';

interface AppContextType {
  // Dashboard state
  savedResumes: SavedResume[];
  setSavedResumes: (resumes: SavedResume[]) => void;
  currentResume: SavedResume | null;
  setCurrentResume: (resume: SavedResume | null) => void;
  dashboardStats: DashboardStats;
  setDashboardStats: (stats: DashboardStats) => void;
  filterOptions: FilterOptions;
  setFilterOptions: (options: Partial<FilterOptions>) => void;
  dashboardView: DashboardView;
  setDashboardView: (view: Partial<DashboardView>) => void;
  
  // User settings
  userSettings: UserSettings;
  setUserSettings: (settings: UserSettings) => void;
  
  // App state
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) => void;
  removeNotification: (id: string) => void;
  
  // Actions
  saveResume: (resume: SavedResume) => void;
  deleteResume: (id: string) => void;
  duplicateResume: (id: string) => void;
  toggleFavorite: (id: string) => void;
}

interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  timestamp: Date;
  autoClose?: boolean;
}

const defaultFilterOptions: FilterOptions = {
  searchTerm: '',
  template: 'all',
  tags: [],
  dateRange: { start: null, end: null },
  sortBy: 'updated',
  sortOrder: 'desc',
};

const defaultDashboardView: DashboardView = {
  layout: 'grid',
  itemsPerPage: 12,
  showThumbnails: true,
};

const defaultUserSettings: UserSettings = {
  profile: {
    firstName: '',
    lastName: '',
    email: '',
  },
  preferences: {
    defaultTemplate: 'classic',
    defaultStyle: {
      accentColor: '#2563eb',
      fontFamily: 'Inter',
      fontSize: 'medium',
      spacing: 'normal',
    },
    language: 'en',
    timezone: 'UTC',
    dateFormat: 'MM/DD/YYYY',
    theme: 'system',
    autoSave: true,
    autoSaveInterval: 5,
    showTips: true,
    dashboardLayout: 'grid',
    itemsPerPage: 12,
  },
  privacy: {
    profileVisibility: 'private',
    allowAnalytics: true,
    allowCookies: true,
    dataRetention: 365,
    shareDataWithThirdParty: false,
    enableTwoFactor: false,
  },
  notifications: {
    emailNotifications: true,
    browserNotifications: false,
    newFeatures: true,
    securityAlerts: true,
    resumeViews: false,
    sharingActivity: false,
    weeklyDigest: false,
  },
  export: {
    defaultFormat: 'pdf',
    includeWatermark: false,
    pdfQuality: 'high',
    docxCompatibility: '2016',
    includeMetadata: true,
  },
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [savedResumes, setSavedResumes] = useState<SavedResume[]>([]);
  const [currentResume, setCurrentResume] = useState<SavedResume | null>(null);
  const [dashboardStats, setDashboardStats] = useState<DashboardStats>({
    totalResumes: 0,
    recentResumes: 0,
    favoriteResumes: 0,
    templatesUsed: {
      classic: 0,
      modern: 0,
      sidebar: 0,
      creative: 0,
    },
  });
  const [filterOptions, setFilterOptions] = useState<FilterOptions>(defaultFilterOptions);
  const [dashboardView, setDashboardView] = useState<DashboardView>(defaultDashboardView);
  const [userSettings, setUserSettings] = useState<UserSettings>(defaultUserSettings);
  const [isLoading, setIsLoading] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Load data from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedResumesData = localStorage.getItem('savedResumes');
        if (savedResumesData) {
          const resumes = JSON.parse(savedResumesData);
          setSavedResumes(resumes.map((r: any) => ({
            ...r,
            createdAt: new Date(r.createdAt),
            updatedAt: new Date(r.updatedAt),
            lastAccessed: new Date(r.lastAccessed),
          })));
        }

        const userSettingsData = localStorage.getItem('userSettings');
        if (userSettingsData) {
          setUserSettings(JSON.parse(userSettingsData));
        }

        const dashboardViewData = localStorage.getItem('dashboardView');
        if (dashboardViewData) {
          setDashboardView(JSON.parse(dashboardViewData));
        }
      } catch (error) {
        console.error('Error loading data from localStorage:', error);
      }
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('savedResumes', JSON.stringify(savedResumes));
    }
  }, [savedResumes]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('userSettings', JSON.stringify(userSettings));
    }
  }, [userSettings]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('dashboardView', JSON.stringify(dashboardView));
    }
  }, [dashboardView]);

  // Update dashboard stats whenever savedResumes changes
  useEffect(() => {
    const stats: DashboardStats = {
      totalResumes: savedResumes.length,
      recentResumes: savedResumes.filter(r => 
        new Date(r.updatedAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      ).length,
      favoriteResumes: savedResumes.filter(r => r.isFavorite).length,
      templatesUsed: {
        classic: savedResumes.filter(r => r.template === 'classic').length,
        modern: savedResumes.filter(r => r.template === 'modern').length,
        sidebar: savedResumes.filter(r => r.template === 'sidebar').length,
        creative: savedResumes.filter(r => r.template === 'creative').length,
      },
    };
    setDashboardStats(stats);
  }, [savedResumes]);

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date(),
    };
    setNotifications(prev => [...prev, newNotification]);
    
    if (notification.autoClose !== false) {
      setTimeout(() => {
        removeNotification(newNotification.id);
      }, 5000);
    }
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const saveResume = (resume: SavedResume) => {
    setSavedResumes(prev => {
      const existingIndex = prev.findIndex(r => r.id === resume.id);
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...resume,
          updatedAt: new Date(),
          lastAccessed: new Date(),
        };
        return updated;
      } else {
        return [...prev, resume];
      }
    });
    addNotification({
      type: 'success',
      title: 'Resume Saved',
      message: `"${resume.title}" has been saved successfully.`,
    });
  };

  const deleteResume = (id: string) => {
    const resume = savedResumes.find(r => r.id === id);
    setSavedResumes(prev => prev.filter(r => r.id !== id));
    if (resume) {
      addNotification({
        type: 'info',
        title: 'Resume Deleted',
        message: `"${resume.title}" has been deleted.`,
      });
    }
  };

  const duplicateResume = (id: string) => {
    const resume = savedResumes.find(r => r.id === id);
    if (resume) {
      const duplicated: SavedResume = {
        ...resume,
        id: Date.now().toString(),
        title: `${resume.title} (Copy)`,
        createdAt: new Date(),
        updatedAt: new Date(),
        lastAccessed: new Date(),
      };
      setSavedResumes(prev => [...prev, duplicated]);
      addNotification({
        type: 'success',
        title: 'Resume Duplicated',
        message: `"${resume.title}" has been duplicated.`,
      });
    }
  };

  const toggleFavorite = (id: string) => {
    setSavedResumes(prev => 
      prev.map(r => 
        r.id === id ? { ...r, isFavorite: !r.isFavorite } : r
      )
    );
  };

  const updateFilterOptions = (options: Partial<FilterOptions>) => {
    setFilterOptions(prev => ({ ...prev, ...options }));
  };

  const updateDashboardView = (view: Partial<DashboardView>) => {
    setDashboardView(prev => ({ ...prev, ...view }));
  };

  return (
    <AppContext.Provider
      value={{
        savedResumes,
        setSavedResumes,
        currentResume,
        setCurrentResume,
        dashboardStats,
        setDashboardStats,
        filterOptions,
        setFilterOptions: updateFilterOptions,
        dashboardView,
        setDashboardView: updateDashboardView,
        userSettings,
        setUserSettings,
        isLoading,
        setIsLoading,
        notifications,
        addNotification,
        removeNotification,
        saveResume,
        deleteResume,
        duplicateResume,
        toggleFavorite,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
