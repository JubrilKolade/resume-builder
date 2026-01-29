'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import TemplateSelector from '@/components/TemplateSelector';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useResume } from '@/contexts/ResumeContext';

export default function Home() {
  const router = useRouter();
  const { selectedTemplate, setSelectedTemplate, resumeStyle, setResumeStyle } = useResume();
  const [selectedFont, setSelectedFont] = useState(resumeStyle.fontFamily);
  const [selectedTheme, setSelectedTheme] = useState('default');

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
            <Card>
              <CardHeader>
                <CardTitle>Select a Template</CardTitle>
                <CardDescription>Choose from our professionally designed templates</CardDescription>
              </CardHeader>
              <CardContent>
                <TemplateSelector 
                  selectedTemplate={selectedTemplate}
                  onTemplateChange={setSelectedTemplate}
                />
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Customization</CardTitle>
                <CardDescription>Personalize your resume's appearance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label htmlFor="font-select" className="block text-sm font-medium text-gray-700 mb-2">
                    Font Family
                  </label>
                  <select
                    id="font-select"
                    value={selectedFont}
                    onChange={(e) => setSelectedFont(e.target.value)}
                    className="w-full rounded-md border border-gray-300 py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {fonts.map((font) => (
                      <option key={font.id} value={font.value}>
                        {font.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Color Theme
                  </label>
                  <div className="grid grid-cols-5 gap-2">
                    {themes.map((theme) => (
                      <button
                        key={theme.id}
                        type="button"
                        onClick={() => setSelectedTheme(theme.id)}
                        className={`h-10 rounded-md border-2 ${selectedTheme === theme.id ? 'ring-2 ring-offset-2 ring-blue-500' : 'border-transparent'}`}
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
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  Continue to Edit
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Our templates are designed to help you create a professional resume in minutes.
                </p>
                <p className="text-sm text-gray-600">
                  You can always change your template and style later in the editor.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
