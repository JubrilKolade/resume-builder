'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import TemplateSelector from '@/components/TemplateSelector';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useResume } from '@/contexts/ResumeContext';
import { ChevronDown } from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const { selectedTemplate, setSelectedTemplate, resumeStyle, setResumeStyle } = useResume();
  const [selectedFont, setSelectedFont] = useState(resumeStyle.fontFamily);
  const [selectedTheme, setSelectedTheme] = useState('default');
  const [fontOpen, setFontOpen] = useState(false);

  const fonts = [
    { id: 'inter', name: 'Inter', value: 'Inter' },
    { id: 'roboto', name: 'Roboto', value: 'Roboto' },
    { id: 'open-sans', name: 'Open Sans', value: 'Open Sans' },
    { id: 'lato', name: 'Lato', value: 'Lato' },
    { id: 'montserrat', name: 'Montserrat', value: 'Montserrat' },
  ];

  const themes = [
    { id: 'default', name: 'Default', colors: { primary: '#2563eb' } },
    { id: 'modern', name: 'Modern', colors: { primary: '#7c3aed' } },
    { id: 'professional', name: 'Professional', colors: { primary: '#059669' } },
    { id: 'minimal', name: 'Minimal', colors: { primary: '#1e40af' } },
    { id: 'bold', name: 'Bold', colors: { primary: '#9d174d' } },
  ];

  const handleContinue = () => {
    // Update the resume style with selected font and theme
    setResumeStyle({
      ...resumeStyle,
      fontFamily: selectedFont,
      accentColor: themes.find(t => t.id === selectedTheme)?.colors.primary || '#2563eb',
    });
    
    // Navigate to the edit page
    router.push('/edit');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Choose Your Resume Template</h1>
          <p className="text-lg text-gray-600">Select a template to get started, then customize it to make it your own.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="border-0 shadow-lg">
              <CardHeader className="">
                <CardTitle className="text-2xl">Select Your Resume Template</CardTitle>
                <CardDescription className="text-base mt-2">
                  Choose from professionally designed templates. You can change this anytime.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-8">
                <TemplateSelector 
                  selectedTemplate={selectedTemplate}
                  onTemplateChange={setSelectedTemplate}
                  style={resumeStyle}
                />
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader className="">
                <CardTitle>Quick Customization</CardTitle>
                <CardDescription>Personalize your resume's appearance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Font Family
                  </label>
                  <DropdownMenu open={fontOpen} onOpenChange={setFontOpen}>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant="outline" 
                        className="w-full justify-between"
                        style={{ fontFamily: selectedFont }}
                      >
                        {fonts.find(f => f.value === selectedFont)?.name || 'Select Font'}
                        <ChevronDown className="w-4 h-4 opacity-50" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-full">
                      {fonts.map((font) => (
                        <DropdownMenuItem
                          key={font.id}
                          onClick={() => {
                            setSelectedFont(font.value);
                            setFontOpen(false);
                          }}
                          style={{ fontFamily: font.value }}
                          className={selectedFont === font.value ? 'bg-blue-50' : ''}
                        >
                          {font.name}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Accent Color
                  </label>
                  <div className="grid grid-cols-5 gap-2">
                    {themes.map((theme) => (
                      <button
                        key={theme.id}
                        type="button"
                        onClick={() => setSelectedTheme(theme.id)}
                        className={`h-10 rounded-lg border-2 transition-all ${selectedTheme === theme.id ? 'ring-2 ring-offset-2 ring-blue-500 border-blue-400' : 'border-gray-200 hover:border-gray-300'}`}
                        style={{ backgroundColor: theme.colors.primary }}
                        title={theme.name}
                        aria-label={theme.name}
                      >
                        <span className="sr-only">{theme.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={handleContinue}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all"
                >
                  Continue to Edit
                </Button>
              </CardFooter>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50">
              <CardHeader>
                <CardTitle className="text-lg">💡 Pro Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-gray-700">
                  ✓ All templates are fully customizable
                </p>
                <p className="text-sm text-gray-700">
                  ✓ Change fonts and colors anytime
                </p>
                <p className="text-sm text-gray-700">
                  ✓ Switch templates during editing
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
