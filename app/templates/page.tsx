'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useResume } from '@/contexts/ResumeContext';
import { TemplateType } from '@/types/resume';
import { 
  Star, 
  Download, 
  Eye, 
  Filter, 
  Search, 
  Grid, 
  List,
  Heart,
  TrendingUp,
  Clock,
  Award
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TemplateData {
  id: TemplateType;
  name: string;
  description: string;
  category: 'professional' | 'creative' | 'modern' | 'academic';
  preview: string;
  features: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  popularity: number;
  rating: number;
  downloads: number;
  lastUpdated: string;
  tags: string[];
  isPremium?: boolean;
  isNew?: boolean;
}

const templates: TemplateData[] = [
  {
    id: 'classic',
    name: 'Classic Professional',
    description: 'Timeless design perfect for traditional industries and corporate positions',
    category: 'professional',
    preview: '/classic-template.png',
    features: [
      'Clean, professional layout',
      'Traditional formatting',
      'ATS-friendly',
      'Conservative styling'
    ],
    difficulty: 'beginner',
    popularity: 95,
    rating: 4.8,
    downloads: 15423,
    lastUpdated: '2024-03-15',
    tags: ['professional', 'corporate', 'ats-friendly', 'traditional'],
  },
  {
    id: 'modern',
    name: 'Modern Minimalist',
    description: 'Clean and contemporary design with a focus on typography and whitespace',
    category: 'modern',
    preview: '/modern-template.png',
    features: [
      'Minimalist design',
      'Modern typography',
      'Color customization',
      'Mobile responsive'
    ],
    difficulty: 'beginner',
    popularity: 88,
    rating: 4.7,
    downloads: 12356,
    lastUpdated: '2024-03-20',
    tags: ['modern', 'minimalist', 'clean', 'responsive'],
    isNew: true,
  },
  {
    id: 'sidebar',
    name: 'Sidebar Layout',
    description: 'Two-column design with sidebar for skills and contact information',
    category: 'modern',
    preview: '/sidebar-template.png',
    features: [
      'Two-column layout',
      'Skills sidebar',
      'Contact highlights',
      'Space efficient'
    ],
    difficulty: 'intermediate',
    popularity: 76,
    rating: 4.6,
    downloads: 8934,
    lastUpdated: '2024-03-10',
    tags: ['sidebar', 'two-column', 'skills-focused', 'efficient'],
  },
  {
    id: 'creative',
    name: 'Creative Designer',
    description: 'Bold and artistic design perfect for creative professionals',
    category: 'creative',
    preview: '/creative-template.png',
    features: [
      'Creative layout',
      'Visual elements',
      'Colorful design',
      'Portfolio style'
    ],
    difficulty: 'advanced',
    popularity: 62,
    rating: 4.5,
    downloads: 5678,
    lastUpdated: '2024-03-08',
    tags: ['creative', 'designer', 'portfolio', 'colorful'],
  },
];

export default function TemplatesPage() {
  const router = useRouter();
  const { selectedTemplate, setSelectedTemplate, setResumeStyle } = useResume();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'popularity' | 'rating' | 'downloads' | 'newest'>('popularity');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  // Filter templates
  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'all' || template.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  // Sort templates
  const sortedTemplates = [...filteredTemplates].sort((a, b) => {
    switch (sortBy) {
      case 'popularity':
        return b.popularity - a.popularity;
      case 'rating':
        return b.rating - a.rating;
      case 'downloads':
        return b.downloads - a.downloads;
      case 'newest':
        return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
      default:
        return 0;
    }
  });

  const handleSelectTemplate = (templateId: TemplateType) => {
    setSelectedTemplate(templateId);
    // Navigate to edit page with selected template
    router.push('/edit');
  };

  const handlePreviewTemplate = (templateId: TemplateType) => {
    // Open preview modal or navigate to preview page
    router.push(`/templates/preview/${templateId}`);
  };

  const handleUseTemplate = (templateId: TemplateType) => {
    setSelectedTemplate(templateId);
    router.push('/edit');
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'professional':
        return '💼';
      case 'creative':
        return '🎨';
      case 'modern':
        return '✨';
      case 'academic':
        return '🎓';
      default:
        return '📄';
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'fill-current text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Resume Templates</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Choose from our collection of professionally designed templates. Each template is ATS-friendly 
            and can be customized to match your personal brand.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Grid className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Templates</p>
                  <p className="text-2xl font-bold text-gray-900">{templates.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Most Popular</p>
                  <p className="text-lg font-bold text-gray-900">Classic</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Download className="w-6 h-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Downloads</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {templates.reduce((sum, t) => sum + t.downloads, 0).toLocaleString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Award className="w-6 h-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Avg Rating</p>
                  <p className="text-2xl font-bold text-gray-900">4.6</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search templates..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                <option value="professional">Professional</option>
                <option value="modern">Modern</option>
                <option value="creative">Creative</option>
                <option value="academic">Academic</option>
              </select>

              {/* Difficulty Filter */}
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Levels</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="popularity">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="downloads">Most Downloaded</option>
                <option value="newest">Newest</option>
              </select>

              {/* View Mode */}
              <div className="flex gap-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Templates Grid/List */}
        {sortedTemplates.length === 0 ? (
          <Card>
            <CardContent className="pt-12 pb-12 text-center">
              <div className="text-gray-400 mb-4">
                <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
                  <Search className="w-8 h-8" />
                </div>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No templates found</h3>
              <p className="text-gray-600">
                Try adjusting your filters or search terms
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className={viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8' 
            : 'space-y-6'
          }>
            {sortedTemplates.map((template) => (
              <Card key={template.id} className="hover:shadow-lg transition-shadow cursor-pointer shadow-lg">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl">{getCategoryIcon(template.category)}</span>
                        <CardTitle className="text-lg">{template.name}</CardTitle>
                        {template.isNew && (
                          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                            New
                          </span>
                        )}
                      </div>
                      <CardDescription>{template.description}</CardDescription>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                    >
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                
                <CardContent>
                  {/* Preview Image */}
                  <div className="relative w-full h-48 bg-gray-100 rounded-lg mb-4 overflow-hidden">
                    <Image
                      src={template.preview}
                      alt={template.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-all flex items-center justify-center">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => handlePreviewTemplate(template.id)}
                        className="opacity-0 hover:opacity-100 transition-opacity"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Preview
                      </Button>
                    </div>
                  </div>

                  {/* Template Info */}
                  <div className="space-y-3">
                    {/* Rating and Downloads */}
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1">
                        {renderStars(template.rating)}
                        <span className="ml-1 text-gray-600">({template.rating})</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-600">
                        <Download className="w-4 h-4" />
                        <span>{template.downloads.toLocaleString()}</span>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1">
                      {template.tags.slice(0, 3).map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                      {template.tags.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                          +{template.tags.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Difficulty and Category */}
                    <div className="flex items-center justify-between">
                      <span className={`px-2 py-1 text-xs rounded-full ${getDifficultyColor(template.difficulty)}`}>
                        {template.difficulty}
                      </span>
                      <span className="text-sm text-gray-600 capitalize">
                        {template.category}
                      </span>
                    </div>

                    {/* Features */}
                    <div className="space-y-1">
                      {template.features.slice(0, 2).map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                          {feature}
                        </div>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 pt-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handlePreviewTemplate(template.id)}
                        className="flex-1"
                      >
                        <Eye className="w-3 h-3 mr-1" />
                        Preview
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleUseTemplate(template.id)}
                        className="flex-1 bg-blue-600 hover:bg-blue-700"
                      >
                        Use Template
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
