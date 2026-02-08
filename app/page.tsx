'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
  Users,
  Download,
  Eye,
} from 'lucide-react';

interface NavigationItem {
  title: string;
  description: string;
  path: string;
  icon: React.ElementType;
  color: string;
  badge?: string;
  isNew?: boolean;
}

const navigationItems: NavigationItem[] = [
  {
    title: 'Resume Builder',
    description: 'Create and edit professional resumes with multiple templates',
    path: '/resume-builder',
    icon: FileText,
    color: 'bg-blue-500',
    isNew: true,
  },
  {
    title: 'Dashboard',
    description: 'Manage all your resumes in one place',
    path: '/dashboard',
    icon: Layout,
    color: 'bg-green-500',
  },
  {
    title: 'Template Gallery',
    description: 'Browse and preview all available templates',
    path: '/templates',
    icon: Layout,
    color: 'bg-purple-500',
  },
  {
    title: 'Cover Letters',
    description: 'Create professional cover letters with AI assistance',
    path: '/cover-letters',
    icon: PenTool,
    color: 'bg-orange-500',
    badge: 'AI',
  },
  {
    title: 'Import/Export',
    description: 'Import existing resumes or export in multiple formats',
    path: '/import-export',
    icon: Upload,
    color: 'bg-indigo-500',
  },
  {
    title: 'Share Resumes',
    description: 'Share your resumes publicly or privately',
    path: '/share',
    icon: Share2,
    color: 'bg-pink-500',
  },
  {
    title: 'Settings',
    description: 'Manage your preferences and profile',
    path: '/settings',
    icon: Settings,
    color: 'bg-gray-500',
  },
  {
    title: 'Help Center',
    description: 'Get help and learn how to use the platform',
    path: '/help',
    icon: HelpCircle,
    color: 'bg-teal-500',
  },
  {
    title: 'Admin Dashboard',
    description: 'Analytics and admin controls',
    path: '/admin',
    icon: Shield,
    color: 'bg-red-500',
  },
];

const quickActions = [
  {
    title: 'Create New Resume',
    description: 'Start building your resume from scratch',
    path: '/resume-builder',
    icon: Plus,
    color: 'bg-blue-600 hover:bg-blue-700',
  },
  {
    title: 'Import Resume',
    description: 'Import an existing resume file',
    path: '/import-export',
    icon: Upload,
    color: 'bg-green-600 hover:bg-green-700',
  },
  {
    title: 'View Dashboard',
    description: 'Manage your existing resumes',
    path: '/dashboard',
    icon: Layout,
    color: 'bg-purple-600 hover:bg-purple-700',
  },
];

const stats = [
  { label: 'Templates Available', value: '4+', icon: Layout },
  { label: 'Export Formats', value: '3', icon: Download },
  { label: 'Active Users', value: '1.2K', icon: Users },
  { label: 'Resumes Created', value: '5.4K', icon: FileText },
];

export default function HomePage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = navigationItems.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome to Your Resume Hub</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Navigate to any part of the resume builder from this central dashboard. Create, manage,
            and share professional resumes with ease.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">{stat.label}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <div className="p-2 bg-blue-100 rounded-lg mr-3">
                      <Icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Card
                  key={action.title}
                  className="hover:shadow-lg transition-shadow cursor-pointer group"
                  onClick={() => handleNavigate(action.path)}
                >
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-12 h-12 rounded-lg flex items-center justify-center text-white ${action.color}`}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {action.title}
                        </h3>
                        <p className="text-sm text-gray-600">{action.description}</p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Navigation Grid */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">All Pages</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => {
              const Icon = item.icon;
              return (
                <Card
                  key={item.title}
                  className="hover:shadow-lg transition-all cursor-pointer group"
                  onClick={() => handleNavigate(item.path)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div
                        className={`w-12 h-12 ${item.color} rounded-lg flex items-center justify-center text-white`}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex items-center gap-2">
                        {item.badge && (
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium">
                            {item.badge}
                          </span>
                        )}
                        {item.isNew && (
                          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium">
                            New
                          </span>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardTitle className="text-lg mb-2 group-hover:text-blue-600 transition-colors">
                      {item.title}
                    </CardTitle>
                    <CardDescription className="text-sm">{item.description}</CardDescription>
                    <div className="flex items-center mt-4 text-blue-600 group-hover:text-blue-700">
                      <span className="text-sm font-medium">Go to page</span>
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* No Results */}
        {filteredItems.length === 0 && (
          <Card className="mt-8">
            <CardContent className="pt-12 pb-12 text-center">
              <div className="text-gray-400 mb-4">
                <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
                  <HelpCircle className="w-8 h-8" />
                </div>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No pages found</h3>
              <p className="text-gray-600">Try adjusting your search terms</p>
            </CardContent>
          </Card>
        )}

        {/* Footer */}
        <footer className="mt-16 pt-8 box-shadow">
          <div className="text-center text-gray-600">
            <p className="mb-2">RapidApply Resume Builder - Professional Resume Management</p>
            <div className="flex justify-center gap-6 text-sm">
              <span>Version 2.0</span>
              <span>•</span>
              <span>Built with Next.js 16</span>
              <span>•</span>
              <span>© 2024 RapidApply</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
