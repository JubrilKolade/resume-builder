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
  MoreHorizontal,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTheme } from '@/contexts/ThemeContext';

interface NavItem {
  title: string;
  path: string;
  icon: React.ElementType;
}

const mainNav: NavItem[] = [
  { title: 'Home', path: '/', icon: Home },
  { title: 'Resume', path: '/resume-builder', icon: FileText },
  { title: 'Dashboard', path: '/dashboard', icon: Layout },
];

const moreNav: NavItem[] = [
  { title: 'Templates', path: '/templates', icon: Layout },
  { title: 'Cover Letters', path: '/cover-letters', icon: PenTool },
  { title: 'Import/Export', path: '/import-export', icon: Upload },
  { title: 'Share', path: '/share', icon: Share2 },
  { title: 'Settings', path: '/settings', icon: Settings },
  { title: 'Help', path: '/help', icon: HelpCircle },
  { title: 'Admin', path: '/admin', icon: Shield },
];

export default function Navigation() {
  const router = useRouter();
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavigate = (path: string) => {
    router.push(path);
    setIsMobileMenuOpen(false);
  };

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  const navLinkClass = (active: boolean) =>
    `flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      active
        ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 dark:bg-blue-500/20'
        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-800'
    }`;

  return (
    <>
      {/* Desktop */}
      <nav className="hidden md:block border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-14">
            <div className="flex items-center gap-1">
              <button
                onClick={() => handleNavigate('/')}
                className="flex items-center gap-2 rounded-md p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Home"
              >
                <div className="w-8 h-8 bg-blue-600 dark:bg-blue-500 rounded-lg flex items-center justify-center shrink-0">
                  <FileText className="w-4 h-4 text-white" />
                </div>
                <span className="font-semibold text-gray-900 dark:text-white hidden sm:inline">
                  RapidApply
                </span>
              </button>

              <div className="hidden lg:flex items-center gap-0.5 ml-4">
                {mainNav.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.path}
                      onClick={() => handleNavigate(item.path)}
                      className={navLinkClass(isActive(item.path))}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      {item.title}
                    </button>
                  );
                })}
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`ml-1 gap-1.5 ${navLinkClass(moreNav.some((i) => isActive(i.path)))}`}
                  >
                    <MoreHorizontal className="w-4 h-4" />
                    <span className="hidden lg:inline">More</span>
                    <ChevronDown className="w-3.5 h-3.5 opacity-70" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="min-w-[180px] dark:border-gray-800 dark:bg-gray-900">
                  {moreNav.map((item) => {
                    const Icon = item.icon;
                    return (
                      <DropdownMenuItem
                        key={item.path}
                        onClick={() => handleNavigate(item.path)}
                        className={`flex items-center gap-2 cursor-pointer dark:focus:bg-gray-800 ${
                          isActive(item.path) ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400' : ''
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        {item.title}
                      </DropdownMenuItem>
                    );
                  })}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="rounded-full text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800"
                aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {theme === 'dark' ? (
                  <Sun className="w-4 h-4" />
                ) : (
                  <Moon className="w-4 h-4" />
                )}
              </Button>
              <Button
                onClick={() => handleNavigate('/resume-builder')}
                size="sm"
                className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white shrink-0"
              >
                Create Resume
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile */}
      <nav className="md:hidden border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
        <div className="flex justify-between items-center h-14 px-4">
          <button
            onClick={() => handleNavigate('/')}
            className="flex items-center gap-2 rounded-md p-1.5"
            aria-label="Home"
          >
            <div className="w-8 h-8 bg-blue-600 dark:bg-blue-500 rounded-lg flex items-center justify-center">
              <FileText className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-gray-900 dark:text-white">RapidApply</span>
          </button>

          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full text-gray-600 dark:text-gray-400"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 px-4 py-3 space-y-0.5">
            {mainNav.concat(moreNav).map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.path}
                  onClick={() => handleNavigate(item.path)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium ${navLinkClass(
                    isActive(item.path)
                  )}`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  {item.title}
                </button>
              );
            })}
            <div className="pt-3 mt-2 border-t border-gray-200 dark:border-gray-800">
              <Button
                onClick={() => handleNavigate('/resume-builder')}
                className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white"
              >
                Create Resume
              </Button>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
