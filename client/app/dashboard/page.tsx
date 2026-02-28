'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useApp } from '@/contexts/AppContext';
import { useResume } from '@/contexts/ResumeContext';
import { SavedResume, FilterOptions } from '@/types/dashboard';
import { TemplateType } from '@/types/resume';
import {
  Search,
  Filter,
  Grid,
  List,
  Plus,
  Edit,
  Copy,
  Trash2,
  Download,
  Share,
  Heart,
  MoreHorizontal,
  Calendar,
  Eye
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function DashboardPage() {
  const router = useRouter();
  const {
    savedResumes,
    setSavedResumes,
    currentResume,
    setCurrentResume,
    dashboardStats,
    filterOptions,
    setFilterOptions,
    dashboardView,
    setDashboardView,
    deleteResume,
    duplicateResume,
    toggleFavorite,
    addNotification
  } = useApp();

  const { setResumeData, setSelectedTemplate, setResumeStyle } = useResume();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTemplate, setSelectedTemplateFilter] = useState<TemplateType | 'all'>('all');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [sortBy, setSortBy] = useState<FilterOptions['sortBy']>('updated');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Update filter options when local state changes
  useEffect(() => {
    setFilterOptions({
      searchTerm,
      template: selectedTemplate,
      tags: [],
      dateRange: { start: null, end: null },
      sortBy,
      sortOrder,
    });
  }, [searchTerm, selectedTemplate, sortBy, sortOrder, setFilterOptions]);

  // Filter and sort resumes
  const filteredResumes = savedResumes
    .filter((resume: SavedResume) => {
      const matchesSearch = resume.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resume.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resume.resumeData.personalInfo.fullName.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesTemplate = selectedTemplate === 'all' || resume.template === selectedTemplate;
      const matchesFavorites = !showFavoritesOnly || resume.isFavorite;

      return matchesSearch && matchesTemplate && matchesFavorites;
    })
    .sort((a: SavedResume, b: SavedResume) => {
      let comparison = 0;

      switch (sortBy) {
        case 'name':
          comparison = a.title.localeCompare(b.title);
          break;
        case 'created':
          comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          break;
        case 'updated':
          comparison = new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
          break;
        case 'accessed':
          comparison = new Date(a.lastAccessed).getTime() - new Date(b.lastAccessed).getTime();
          break;
      }

      return sortOrder === 'asc' ? comparison : -comparison;
    });

  const handleCreateNew = () => {
    router.push('/');
  };

  const handleEdit = (resume: SavedResume) => {
    setCurrentResume(resume);
    setResumeData({
      resumeData: resume.resumeData,
      selectedTemplate: resume.template,
      style: resume.style,
    });
    router.push('/edit');
  };

  const handleDuplicate = async (resume: SavedResume) => {
    await duplicateResume(resume.id);
  };

  const handleDelete = async (resume: SavedResume) => {
    if (confirm(`Are you sure you want to delete "${resume.title}"?`)) {
      await deleteResume(resume.id);
    }
  };

  const handleToggleFavorite = async (resume: SavedResume) => {
    await toggleFavorite(resume.id);
  };

  const handleShare = (resume: SavedResume) => {
    // Navigate to share page with resume ID
    router.push(`/share/${resume.id}`);
  };

  const handleDownload = (resume: SavedResume) => {
    setCurrentResume(resume);
    setResumeData({
      resumeData: resume.resumeData,
      selectedTemplate: resume.template,
      style: resume.style,
    });
    router.push('/download');
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(new Date(date));
  };

  const getTemplateIcon = (template: TemplateType) => {
    switch (template) {
      case 'classic':
        return '📄';
      case 'modern':
        return '🎨';
      case 'sidebar':
        return '📋';
      case 'creative':
        return '✨';
      default:
        return '📄';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Resumes</h1>
              <p className="text-gray-600 mt-2">Manage and organize your resumes</p>
            </div>
            <Button onClick={handleCreateNew} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Create New Resume
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Resumes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardStats.totalResumes}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Recent</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardStats.recentResumes}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Favorites</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardStats.favoriteResumes}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Most Used Template</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold capitalize">
                {Object.entries(dashboardStats.templatesUsed).reduce((a: [string, number], b: [string, number]) =>
                  a[1] > b[1] ? a : b
                )[0] || 'None'}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Controls */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search resumes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Template Filter */}
              <select
                value={selectedTemplate}
                onChange={(e) => setSelectedTemplateFilter(e.target.value as TemplateType | 'all')}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Templates</option>
                <option value="classic">Classic</option>
                <option value="modern">Modern</option>
                <option value="sidebar">Sidebar</option>
                <option value="creative">Creative</option>
              </select>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as FilterOptions['sortBy'])}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="updated">Last Modified</option>
                <option value="created">Date Created</option>
                <option value="name">Name</option>
                <option value="accessed">Last Accessed</option>
              </select>

              {/* View Toggle */}
              <div className="flex gap-2">
                <Button
                  variant={dashboardView.layout === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setDashboardView({ layout: 'grid' })}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={dashboardView.layout === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setDashboardView({ layout: 'list' })}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>

              {/* Favorites Filter */}
              <Button
                variant={showFavoritesOnly ? 'default' : 'outline'}
                size="sm"
                onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
              >
                <Heart className={`w-4 h-4 ${showFavoritesOnly ? 'fill-current' : ''}`} />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Resumes Grid/List */}
        {filteredResumes.length === 0 ? (
          <Card>
            <CardContent className="pt-12 pb-12 text-center">
              <div className="text-gray-400 mb-4">
                <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
                  <Search className="w-8 h-8" />
                </div>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No resumes found</h3>
              <p className="text-gray-600 mb-6">
                {savedResumes.length === 0
                  ? 'Create your first resume to get started'
                  : 'Try adjusting your filters or search terms'
                }
              </p>
              {savedResumes.length === 0 && (
                <Button onClick={handleCreateNew} className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Your First Resume
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className={dashboardView.layout === 'grid'
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
            : 'space-y-4'
          }>
            {filteredResumes.map((resume: SavedResume) => (
              <Card key={resume.id} className="hover:shadow-lg transition-shadow cursor-pointer shadow-lg">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <span>{getTemplateIcon(resume.template)}</span>
                        {resume.title}
                        {resume.isFavorite && (
                          <Heart className="w-4 h-4 fill-current text-red-500" />
                        )}
                      </CardTitle>
                      <CardDescription className="text-sm mt-1">
                        {resume.description || 'No description'}
                      </CardDescription>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEdit(resume)}>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDuplicate(resume)}>
                          <Copy className="w-4 h-4 mr-2" />
                          Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleShare(resume)}>
                          <Share className="w-4 h-4 mr-2" />
                          Share
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDownload(resume)}>
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleToggleFavorite(resume)}>
                          <Heart className="w-4 h-4 mr-2" />
                          {resume.isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDelete(resume)}
                          className="text-red-600"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {/* Resume Info */}
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span className="capitalize">{resume.template} Template</span>
                      <span>{resume.resumeData.personalInfo.fullName}</span>
                    </div>

                    {/* Dates */}
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        Updated {formatDate(resume.updatedAt)}
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {formatDate(resume.lastAccessed)}
                      </div>
                    </div>

                    {/* Tags */}
                    {resume.tags && resume.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {resume.tags.map((tag: string, index: number) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-linear-to-br from-blue-50 to-indigo-50 text-blue-800 text-xs rounded-full shadow-lg"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Quick Actions */}
                    <div className="flex gap-2 pt-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(resume)}
                        className="flex-1"
                      >
                        <Edit className="w-3 h-3 mr-1" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleShare(resume)}
                      >
                        <Share className="w-3 h-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDownload(resume)}
                      >
                        <Download className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
