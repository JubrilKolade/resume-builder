import { SharedResume, ShareSettings, ShareAnalytics, QRCodeOptions } from '@/types/sharing';
import { ResumeData, TemplateType } from '@/types/resume';

export interface ShareResult {
  success: boolean;
  shareUrl?: string;
  qrCode?: string;
  error?: string;
}

export class ShareManager {
  private static instance: ShareManager;
  private shares: Map<string, SharedResume> = new Map();

  static getInstance(): ShareManager {
    if (!ShareManager.instance) {
      ShareManager.instance = new ShareManager();
    }
    return ShareManager.instance;
  }

  // Create a new share
  async createShare(
    resumeId: string,
    resumeData: ResumeData,
    template: TemplateType,
    style: any,
    settings: ShareSettings
  ): Promise<ShareResult> {
    try {
      const shareId = this.generateShareId();
      const shareUrl = this.generateShareUrl(shareId);
      
      const sharedResume: SharedResume = {
        id: shareId,
        resumeId,
        shareUrl,
        isPublic: settings.isPublic,
        password: settings.password,
        expiresAt: settings.expiresAt,
        allowDownload: settings.allowDownload,
        allowComments: settings.allowComments,
        viewCount: 0,
        downloadCount: 0,
        createdAt: new Date(),
        lastViewed: new Date(),
      };

      // Store the share data (in real app, this would be in a database)
      this.shares.set(shareId, sharedResume);
      
      // Store the resume data for the share
      localStorage.setItem(`share_${shareId}`, JSON.stringify({
        resumeData,
        template,
        style,
        settings,
      }));

      // Generate QR code
      const qrCode = await this.generateQRCode(shareUrl, {
        size: 200,
        bgColor: '#ffffff',
        fgColor: '#000000',
        includeLogo: true,
        errorCorrectionLevel: 'M',
      });

      // Save to localStorage for persistence
      this.saveSharesToStorage();

      return {
        success: true,
        shareUrl,
        qrCode,
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to create share',
      };
    }
  }

  // Get share by ID
  getShare(shareId: string): SharedResume | null {
    const share = this.shares.get(shareId);
    if (share) {
      // Check if share has expired
      if (share.expiresAt && new Date() > share.expiresAt) {
        this.shares.delete(shareId);
        this.saveSharesToStorage();
        return null;
      }
      return share;
    }
    return null;
  }

  // Get resume data for a share
  getSharedResumeData(shareId: string): { resumeData: ResumeData; template: TemplateType; style: any; settings: ShareSettings } | null {
    try {
      const data = localStorage.getItem(`share_${shareId}`);
      if (data) {
        return JSON.parse(data);
      }
    } catch (error) {
      console.error('Error loading shared resume data:', error);
    }
    return null;
  }

  // Update share settings
  updateShare(shareId: string, updates: Partial<ShareSettings>): boolean {
    const share = this.shares.get(shareId);
    if (share) {
      const updatedShare = { ...share, ...updates };
      this.shares.set(shareId, updatedShare);
      this.saveSharesToStorage();
      
      // Update stored resume data settings
      const storedData = this.getSharedResumeData(shareId);
      if (storedData) {
        localStorage.setItem(`share_${shareId}`, JSON.stringify({
          ...storedData,
          settings: { ...storedData.settings, ...updates },
        }));
      }
      
      return true;
    }
    return false;
  }

  // Delete a share
  deleteShare(shareId: string): boolean {
    const deleted = this.shares.delete(shareId);
    if (deleted) {
      localStorage.removeItem(`share_${shareId}`);
      this.saveSharesToStorage();
    }
    return deleted;
  }

  // Record a view
  recordView(shareId: string): boolean {
    const share = this.shares.get(shareId);
    if (share) {
      share.viewCount++;
      share.lastViewed = new Date();
      this.saveSharesToStorage();
      return true;
    }
    return false;
  }

  // Record a download
  recordDownload(shareId: string): boolean {
    const share = this.shares.get(shareId);
    if (share && share.allowDownload) {
      share.downloadCount++;
      this.saveSharesToStorage();
      return true;
    }
    return false;
  }

  // Get all shares for a resume
  getSharesForResume(resumeId: string): SharedResume[] {
    return Array.from(this.shares.values()).filter(share => share.resumeId === resumeId);
  }

  // Get analytics for a share
  getShareAnalytics(shareId: string): ShareAnalytics | null {
    const share = this.shares.get(shareId);
    if (!share) return null;

    // In a real app, this would come from a database
    // For now, we'll generate mock analytics
    return {
      totalViews: share.viewCount,
      uniqueViews: Math.floor(share.viewCount * 0.7), // Estimate unique views
      downloadCount: share.downloadCount,
      averageViewDuration: 2.5, // Mock data
      viewsByDate: this.generateMockViewsData(share.viewCount),
      referrers: [
        { source: 'Direct', count: Math.floor(share.viewCount * 0.4) },
        { source: 'LinkedIn', count: Math.floor(share.viewCount * 0.3) },
        { source: 'Twitter', count: Math.floor(share.viewCount * 0.2) },
        { source: 'Email', count: Math.floor(share.viewCount * 0.1) },
      ],
      locations: [
        { country: 'United States', count: Math.floor(share.viewCount * 0.5) },
        { country: 'United Kingdom', count: Math.floor(share.viewCount * 0.2) },
        { country: 'Canada', count: Math.floor(share.viewCount * 0.15) },
        { country: 'Other', count: Math.floor(share.viewCount * 0.15) },
      ],
    };
  }

  // Generate QR code for a share URL
  async generateQRCode(url: string, options: QRCodeOptions): Promise<string> {
    // In a real app, you would use a QR code library like qrcode.js
    // For now, we'll return a placeholder
    return `data:image/svg+xml;base64,${btoa(`
      <svg width="${options.size}" height="${options.size}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" fill="${options.bgColor}"/>
        <text x="50" y="50" text-anchor="middle" dy=".3em" font-family="Arial" font-size="10" fill="${options.fgColor}">
          QR Code
        </text>
      </svg>
    `)}`;
  }

  // Private helper methods
  private generateShareId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  private generateShareUrl(shareId: string): string {
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';
    return `${baseUrl}/share/${shareId}`;
  }

  private generateMockViewsData(totalViews: number): Array<{ date: string; views: number }> {
    const data = [];
    const days = 30;
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      // Generate random views for each day
      const views = Math.floor(Math.random() * (totalViews / days) * 2);
      data.push({ date: dateStr, views });
    }
    
    return data;
  }

  private saveSharesToStorage(): void {
    if (typeof window !== 'undefined') {
      const sharesArray = Array.from(this.shares.entries()).map(([id, share]) => ({
        id,
        ...share,
        createdAt: share.createdAt.toISOString(),
        lastViewed: share.lastViewed.toISOString(),
        expiresAt: share.expiresAt ? share.expiresAt.toISOString() : null,
      }));
      localStorage.setItem('sharedResumes', JSON.stringify(sharesArray));
    }
  }

  private loadSharesFromStorage(): void {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('sharedResumes');
        if (stored) {
          const sharesArray = JSON.parse(stored);
          sharesArray.forEach((shareData: any) => {
            const share: SharedResume = {
              ...shareData,
              createdAt: new Date(shareData.createdAt),
              lastViewed: new Date(shareData.lastViewed),
              expiresAt: shareData.expiresAt ? new Date(shareData.expiresAt) : undefined,
            };
            this.shares.set(shareData.id, share);
          });
        }
      } catch (error) {
        console.error('Error loading shares from storage:', error);
      }
    }
  }

  // Initialize on creation
  constructor() {
    this.loadSharesFromStorage();
  }
}

// Export utility functions
export const shareResume = async (
  resumeId: string,
  resumeData: ResumeData,
  template: TemplateType,
  style: any,
  settings: ShareSettings
): Promise<ShareResult> => {
  const shareManager = ShareManager.getInstance();
  return shareManager.createShare(resumeId, resumeData, template, style, settings);
};

export const getSharedResume = (shareId: string): SharedResume | null => {
  const shareManager = ShareManager.getInstance();
  return shareManager.getShare(shareId);
};

export const getSharedResumeData = (shareId: string) => {
  const shareManager = ShareManager.getInstance();
  return shareManager.getSharedResumeData(shareId);
};

export const updateShareSettings = (shareId: string, updates: Partial<ShareSettings>): boolean => {
  const shareManager = ShareManager.getInstance();
  return shareManager.updateShare(shareId, updates);
};

export const deleteShare = (shareId: string): boolean => {
  const shareManager = ShareManager.getInstance();
  return shareManager.deleteShare(shareId);
};

export const recordShareView = (shareId: string): boolean => {
  const shareManager = ShareManager.getInstance();
  return shareManager.recordView(shareId);
};

export const recordShareDownload = (shareId: string): boolean => {
  const shareManager = ShareManager.getInstance();
  return shareManager.recordDownload(shareId);
};

export const getShareAnalytics = (shareId: string): ShareAnalytics | null => {
  const shareManager = ShareManager.getInstance();
  return shareManager.getShareAnalytics(shareId);
};

// Social media sharing utilities
export const shareOnSocialMedia = (
  platform: 'twitter' | 'linkedin' | 'facebook' | 'email',
  shareUrl: string,
  title: string = 'Check out my resume!'
): void => {
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);
  
  let socialUrl = '';
  
  switch (platform) {
    case 'twitter':
      socialUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
      break;
    case 'linkedin':
      socialUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
      break;
    case 'facebook':
      socialUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
      break;
    case 'email':
      socialUrl = `mailto:?subject=${encodedTitle}&body=${encodedUrl}`;
      break;
  }
  
  if (socialUrl) {
    window.open(socialUrl, '_blank', 'width=600,height=400');
  }
};

// Copy to clipboard utility
export const copyShareUrl = async (shareUrl: string): Promise<boolean> => {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(shareUrl);
      return true;
    } else {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = shareUrl;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const result = document.execCommand('copy');
      document.body.removeChild(textArea);
      return result;
    }
  } catch (error) {
    console.error('Failed to copy share URL:', error);
    return false;
  }
};
