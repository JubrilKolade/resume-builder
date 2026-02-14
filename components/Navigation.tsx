'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { 
  Menu, 
  X, 
  Home, 
  FileText, 
  Layout, 
  Settings, 
  PenTool, 
  Upload, 
  Share2, 
  HelpCircle, 
  Shield,
  ChevronDown,
  Sun,
  Moon,
  Monitor
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from '@/contexts/ThemeContext';

interface NavItem {
  title: string;
  path: string;
  icon: React.ElementType;
  badge?: string;
}

const navigationItems: NavItem[] = [
  { title: 'Home', path: '/home', icon: Home },
  { title: 'Resume Builder', path: '/resume-builder', icon: FileText },
  { title: 'Dashboard', path: '/dashboard', icon: Layout },
  { title: 'Templates', path: '/templates', icon: Layout },
  { title: 'Cover Letters', path: '/cover-letters', icon: PenTool, badge: 'AI' },
  { title: 'Import/Export', path: '/import-export', icon: Upload },
  { title: 'Share', path: '/share', icon: Share2 },
  { title: 'Settings', path: '/settings', icon: Settings },
  { title: 'Help', path: '/help', icon: HelpCircle },
  { title: 'Admin', path: '/admin', icon: Shield },
];

export default function Navigation() {
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const handleNavigate = (path: string) => {
    router.push(path);
    setIsMobileMenuOpen(false);
  };

  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(path);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:block bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center gap-8">
              {/* Logo */}
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-gray-900 dark:text-gray-100">RapidApply</span>
              </div>

              {/* Navigation Links */}
              <div className="hidden lg:flex items-center gap-6">
                {navigationItems.slice(0, 6).map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.path}
                      onClick={() => handleNavigate(item.path)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        isActive(item.path)
                          ? 'bg-blue-50 text-blue-600 dark:bg-blue-900 dark:text-blue-200'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-gray-100 dark:hover:bg-gray-800'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.title}</span>
                      {item.badge && (
                        <span className="ml-1 px-1.5 py-0.5 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-xs rounded-full font-medium">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* More Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
                  >
                    More
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  {navigationItems.slice(6).map((item) => {
                    const Icon = item.icon;
                    return (
                      <DropdownMenuItem
                        key={item.path}
                        onClick={() => handleNavigate(item.path)}
                        className={`flex items-center gap-2 ${
                          isActive(item.path) 
                            ? 'bg-blue-50 text-blue-600 dark:bg-blue-900 dark:text-blue-200' 
                            : 'text-gray-700 dark:text-gray-200'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{item.title}</span>
                        {item.badge && (
                          <span className="ml-auto px-1.5 py-0.5 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-xs rounded-full font-medium">
                            {item.badge}
                          </span>
                        )}
                      </DropdownMenuItem>
                    );
                  })}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Theme Toggle */}
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleTheme}
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 p-2"
                  title="Toggle theme"
                >
                  {theme === 'dark' ? (
                    <Sun className="w-4 h-4" />
                  ) : theme === 'light' ? (
                    <Moon className="w-4 h-4" />
                  ) : (
                    <Monitor className="w-4 h-4" />
                  )}
                </Button>
              </div>

              {/* Quick Actions */}
              <div className="flex items-center gap-3">
                <Button
                  onClick={() => handleNavigate('/resume-builder')}
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Create Resume
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="md:hidden bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
        <div className="px-4 sm:px-6">
          <div className="flex justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-gray-900 dark:text-gray-100">RapidApply</span>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 p-2"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
            <div className="px-4 py-2 space-y-1">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.path}
                    onClick={() => handleNavigate(item.path)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left text-sm font-medium transition-all duration-200 ${
                      isActive(item.path)
                        ? 'bg-blue-50 text-blue-600 dark:bg-blue-900 dark:text-blue-200'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.title}</span>
                    {item.badge && (
                      <span className="ml-auto px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-xs rounded-full font-medium">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
              
              <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
                <Button
                  onClick={() => handleNavigate('/resume-builder')}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Create Resume
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
