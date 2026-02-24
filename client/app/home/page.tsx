'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Navigation from '@/components/Navigation';
import { 
  FileText, 
  Layout, 
  Settings, 
  PenTool, 
  Upload, 
  Share2, 
  HelpCircle, 
  Shield,
  Plus,
  ArrowRight,
  Star,
  Users,
  Download,
  Eye,
  TrendingUp,
  Clock,
  Award,
  Zap,
  Target,
  BarChart3,
  Search
} from 'lucide-react';

interface NavigationItem {
  title: string;
  description: string;
  path: string;
  icon: React.ElementType;
  color: string;
  badge?: string;
  isNew?: boolean;
  features?: string[];
}

const navigationItems: NavigationItem[] = [
  {
    title: 'Resume Builder',
    description: 'Create professional resumes with AI-powered suggestions and multiple templates',
    path: '/resume-builder',
    icon: FileText,
    color: 'bg-gradient-to-br from-blue-500 to-blue-600',
    isNew: true,
    features: ['AI Suggestions', '4+ Templates', 'Real-time Preview', 'ATS-Friendly'],
  },
  {
    title: 'Dashboard',
    description: 'Manage all your resumes with advanced filtering and analytics',
    path: '/dashboard',
    icon: Layout,
    color: 'bg-gradient-to-br from-green-500 to-green-600',
    features: ['Resume Management', 'Quick Actions', 'Statistics', 'Favorites'],
  },
  {
    title: 'Template Gallery',
    description: 'Browse professionally designed templates for every industry',
    path: '/templates',
    icon: Layout,
    color: 'bg-gradient-to-br from-purple-500 to-purple-600',
    features: ['4 Categories', 'Previews', 'Ratings', 'Downloads'],
  },
  {
    title: 'Cover Letters',
    description: 'Generate compelling cover letters with AI assistance',
    path: '/cover-letters',
    icon: PenTool,
    color: 'bg-gradient-to-br from-orange-500 to-orange-600',
    badge: 'AI',
    features: ['AI Generation', 'Templates', 'Customization', 'Export Options'],
  },
  {
    title: 'Import/Export',
    description: 'Seamlessly import existing data or export in multiple formats',
    path: '/import-export',
    icon: Upload,
    color: 'bg-gradient-to-br from-indigo-500 to-indigo-600',
    features: ['JSON/CSV/XML', 'LinkedIn Import', 'Bulk Operations', 'Validation'],
  },
  {
    title: 'Share Resumes',
    description: 'Share your resumes with privacy controls and analytics',
    path: '/share',
    icon: Share2,
    color: 'bg-gradient-to-br from-pink-500 to-pink-600',
    features: ['Public/Private', 'QR Codes', 'Analytics', 'Password Protection'],
  },
  {
    title: 'Settings',
    description: 'Customize your experience and manage preferences',
    path: '/settings',
    icon: Settings,
    color: 'bg-gradient-to-br from-gray-500 to-gray-600',
    features: ['Profile', 'Preferences', 'Privacy', 'Notifications'],
  },
  {
    title: 'Help Center',
    description: 'Get help with tutorials, guides, and support',
    path: '/help',
    icon: HelpCircle,
    color: 'bg-gradient-to-br from-teal-500 to-teal-600',
    features: ['Video Tutorials', 'Documentation', 'FAQ', 'Contact Support'],
  },
  {
    title: 'Admin Dashboard',
    description: 'Analytics and administrative controls for platform management',
    path: '/admin',
    icon: Shield,
    color: 'bg-gradient-to-br from-red-500 to-red-600',
    features: ['Analytics', 'User Management', 'Template Stats', 'Performance'],
  },
];

const quickActions = [
  {
    title: 'Create New Resume',
    description: 'Start building your professional resume in minutes',
    path: '/resume-builder',
    icon: Plus,
    color: 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800',
  },
  {
    title: 'Import Resume',
    description: 'Bring your existing resume data into our platform',
    path: '/import-export',
    icon: Upload,
    color: 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800',
  },
  {
    title: 'View Dashboard',
    description: 'Manage and organize all your resumes',
    path: '/dashboard',
    icon: Layout,
    color: 'bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800',
  },
];

const stats = [
  { label: 'Templates Available', value: '4+', icon: Layout, color: 'text-blue-600' },
  { label: 'Export Formats', value: '3', icon: Download, color: 'text-green-600' },
  { label: 'Active Users', value: '1.2K', icon: Users, color: 'text-purple-600' },
  { label: 'Resumes Created', value: '5.4K', icon: FileText, color: 'text-orange-600' },
];

const features = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Build professional resumes in minutes, not hours',
  },
  {
    icon: Target,
    title: 'ATS Optimized',
    description: 'All templates designed to pass applicant tracking systems',
  },
  {
    icon: BarChart3,
    title: 'Analytics Dashboard',
    description: 'Track views, downloads, and sharing insights',
  },
];

export default function HomePage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const filteredItems = navigationItems.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.features && item.features.some(f => f.toLowerCase().includes(searchTerm.toLowerCase())))
  );

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navigation />
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Welcome to Your Resume Hub
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Navigate to any part of resume builder from this central dashboard. 
              Create, manage, and share professional resumes with AI-powered assistance.
            </p>
            
            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <Card 
                    key={action.title} 
                    className="hover:shadow-xl transition-all duration-300 cursor-pointer group"
                    onClick={() => handleNavigate(action.path)}
                  >
                    <CardContent className="pt-8">
                      <div className="flex items-center gap-4">
                        <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-white ${action.color} shadow-lg`}>
                          <Icon className="w-7 h-7" />
                        </div>
                        <div className="flex-1 text-left">
                          <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors text-lg">
                            {action.title}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">{action.description}</p>
                        </div>
                        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose RapidApply?</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Professional resume building with modern tools and AI assistance
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                    <CardContent className="pt-8">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <Icon className="w-8 h-8 text-blue-600" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Platform Statistics</h2>
              <p className="text-lg text-gray-600">Join thousands of professionals building their careers</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                    <CardContent className="pt-8">
                      <div className={`w-16 h-16 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                        <Icon className={`w-8 h-8 ${stat.color}`} />
                      </div>
                      <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                      <div className="text-sm font-medium text-gray-600">{stat.label}</div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>

        {/* Navigation Grid */}
        <div className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Explore All Features</h2>
              <p className="text-lg text-gray-600 mb-8">Everything you need for professional resume building</p>
              
              {/* Search */}
              <div className="max-w-md mx-auto mb-8">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search features, templates, or tools..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredItems.map((item) => {
                const Icon = item.icon;
                const isHovered = hoveredCard === item.title;
                
                return (
                  <Card 
                    key={item.title} 
                    className={`hover:shadow-2xl transition-all duration-300 cursor-pointer group transform hover:scale-105 ${
                      isHovered ? 'scale-105' : ''
                    }`}
                    onClick={() => handleNavigate(item.path)}
                    onMouseEnter={() => setHoveredCard(item.title)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className={`w-16 h-16 ${item.color} rounded-2xl flex items-center justify-center text-white shadow-lg transform transition-transform group-hover:scale-110`}>
                          <Icon className="w-8 h-8" />
                        </div>
                        <div className="flex items-center gap-2">
                          {item.badge && (
                            <span className="px-3 py-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs rounded-full font-bold shadow-lg">
                              {item.badge}
                            </span>
                          )}
                          {item.isNew && (
                            <span className="px-3 py-1 bg-gradient-to-r from-green-500 to-green-600 text-white text-xs rounded-full font-bold shadow-lg">
                              NEW
                            </span>
                          )}
                        </div>
                      </div>
                      <CardTitle className="text-xl mb-3 group-hover:text-blue-600 transition-colors">
                        {item.title}
                      </CardTitle>
                      <CardDescription className="text-base leading-relaxed mb-4">
                        {item.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      {/* Features List */}
                      {item.features && (
                        <div className="space-y-2 mb-6">
                          {item.features.map((feature, index) => (
                            <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-blue-600 group-hover:text-blue-700 transition-colors">
                          <span className="font-medium">Get Started</span>
                          <ArrowRight className="w-4 h-4 ml-1" />
                        </div>
                        <div className="text-xs text-gray-500">
                          Click to explore →
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* No Results */}
            {filteredItems.length === 0 && (
              <div className="text-center py-16">
                <div className="text-gray-400 mb-6">
                  <div className="w-20 h-20 mx-auto bg-gray-100 rounded-2xl flex items-center justify-center">
                    <Search className="w-10 h-10" />
                  </div>
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-3">No features found</h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your search terms or browse all features above
                </p>
                <Button 
                  onClick={() => setSearchTerm('')}
                  variant="outline"
                  className="bg-white hover:bg-gray-50"
                >
                  Clear Search
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto text-center">
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-4">Ready to Build Your Career?</h3>
              <p className="text-gray-300 mb-6 text-lg">
                Join thousands of professionals who have already created their resumes with RapidApply
              </p>
              <Button
                onClick={() => handleNavigate('/resume-builder')}
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-bold shadow-xl"
              >
                <Plus className="w-5 h-5 mr-2" />
                Start Building Now
              </Button>
            </div>
            
            <div className="border-t border-gray-800 pt-8">
              <div className="flex justify-center gap-8 text-sm text-gray-400 mb-4">
                <span>Version 2.0</span>
                <span>•</span>
                <span>Built with Next.js 16</span>
                <span>•</span>
                <span> 2024 RapidApply</span>
              </div>
              <div className="flex justify-center gap-6">
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  Privacy Policy
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  Terms of Service
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  Contact Support
                </Button>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
