import { ResumeData, TemplateType, ResumeStyle } from './resume';

export interface SavedResume {
  id: string;
  title: string;
  description?: string;
  resumeData: ResumeData;
  template: TemplateType;
  style: ResumeStyle;
  createdAt: Date;
  updatedAt: Date;
  lastAccessed: Date;
  isFavorite: boolean;
  tags: string[];
  thumbnail?: string;
}

export interface DashboardStats {
  totalResumes: number;
  recentResumes: number;
  favoriteResumes: number;
  templatesUsed: Record<TemplateType, number>;
}

export interface ResumeAction {
  type: 'edit' | 'duplicate' | 'delete' | 'download' | 'share' | 'favorite';
  resumeId: string;
}

export interface FilterOptions {
  searchTerm: string;
  template: TemplateType | 'all';
  tags: string[];
  dateRange: {
    start: Date | null;
    end: Date | null;
  };
  sortBy: 'name' | 'created' | 'updated' | 'accessed';
  sortOrder: 'asc' | 'desc';
}

export interface DashboardView {
  layout: 'grid' | 'list';
  itemsPerPage: number;
  showThumbnails: boolean;
}
