'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useCoverLetter } from '@/contexts/CoverLetterContext';
import { useResume } from '@/contexts/ResumeContext';
import { CoverLetterData, CoverLetterTemplate } from '@/types/coverLetter';
import { coverLetterTemplates } from '@/utils/cover-letter';
import { 
  FileText, 
  Download, 
  Eye, 
  Save, 
  Plus, 
  Edit,
  Trash2,
  Copy,
  Settings,
  Wand2
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function CoverLetterPage() {
  const router = useRouter();
  const { 
    coverLetters, 
    currentCoverLetter, 
    setCurrentCoverLetter,
    selectedTemplate,
    setSelectedTemplate,
    coverLetterStyle,
    setCoverLetterStyle,
    createCoverLetter,
    updateCoverLetter,
    deleteCoverLetter,
    duplicateCoverLetter
  } = useCoverLetter();
  
  const { resumeData } = useResume();
  const [activeTab, setActiveTab] = useState<'create' | 'manage' | 'templates'>('create');
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    // If we have resume data but no cover letter, create one
    if (resumeData.resumeData && !currentCoverLetter) {
      const newLetter = createCoverLetter(resumeData.resumeData.personalInfo);
      setCurrentCoverLetter(newLetter);
    }
  }, [resumeData, currentCoverLetter, createCoverLetter, setCurrentCoverLetter]);

  const handleCreateNew = () => {
    if (resumeData.resumeData) {
      const newLetter = createCoverLetter(resumeData.resumeData.personalInfo);
      setCurrentCoverLetter(newLetter);
      setActiveTab('create');
    }
  };

  const handleSave = () => {
    if (currentCoverLetter) {
      updateCoverLetter(currentCoverLetter.id, currentCoverLetter);
    }
  };

  const handleEdit = (letter: CoverLetterData) => {
    setCurrentCoverLetter(letter);
    setSelectedTemplate(letter.template);
    setActiveTab('create');
  };

  const handleDuplicate = (letter: CoverLetterData) => {
    duplicateCoverLetter(letter.id);
  };

  const handleDelete = (letter: CoverLetterData) => {
    if (confirm(`Are you sure you want to delete this cover letter?`)) {
      deleteCoverLetter(letter.id);
      if (currentCoverLetter?.id === letter.id) {
        setCurrentCoverLetter(null);
      }
    }
  };

  const handleGenerateFromResume = async () => {
    if (!resumeData.resumeData) return;
    
    setIsGenerating(true);
    try {
      // Simulate AI generation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const generatedContent = {
        greeting: 'Dear Hiring Manager,',
        introduction: `I am writing to express my strong interest in this position at your company. With my background in ${resumeData.resumeData.personalInfo.title || 'this field'} and my proven track record of success, I believe I would be a valuable addition to your team.`,
        bodyParagraphs: [
          'Throughout my career, I have developed strong skills in communication, problem-solving, and leadership. My experience has prepared me to excel in a role like this one, where I can contribute to your company\'s success while continuing to grow professionally.',
          
          'In my previous roles, I have demonstrated the ability to work effectively in team environments while also taking initiative on individual projects. I am particularly drawn to your organization because of its reputation for excellence and innovation in the industry.',
          
          'I would welcome the opportunity to discuss how my background, skills, and enthusiasm would make me a strong candidate for this position. Thank you for considering my application.',
        ],
        closing: 'Sincerely,',
        signature: `${resumeData.resumeData.personalInfo.firstName || ''} ${resumeData.resumeData.personalInfo.lastName || ''}`.trim() || 'Your Name',
      };

      if (currentCoverLetter) {
        updateCoverLetter(currentCoverLetter.id, {
          letterContent: generatedContent,
        });
      }
    } catch (error) {
      console.error('Error generating cover letter:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePreview = () => {
    if (currentCoverLetter) {
      router.push(`/cover-letter/preview/${currentCoverLetter.id}`);
    }
  };

  const handleDownload = () => {
    if (currentCoverLetter) {
      router.push(`/cover-letter/download/${currentCoverLetter.id}`);
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(new Date(date));
  };

  const getTemplateIcon = (template: CoverLetterTemplate) => {
    switch (template) {
      case 'classic':
        return '📄';
      case 'modern':
        return '🎨';
      case 'creative':
        return '✨';
      case 'professional':
        return '💼';
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
              <h1 className="text-3xl font-bold text-gray-900">Cover Letters</h1>
              <p className="text-gray-600 mt-2">Create professional cover letters to complement your resume</p>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={handleCreateNew}
              >
                <Plus className="w-4 h-4 mr-2" />
                New Cover Letter
              </Button>
              {currentCoverLetter && (
                <Button
                  onClick={handleSave}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-8 bg-gray-100 p-1 rounded-lg w-fit">
          {[
            { id: 'create', label: 'Create', icon: Edit },
            { id: 'manage', label: 'Manage', icon: FileText },
            { id: 'templates', label: 'Templates', icon: Settings },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Create Tab */}
        {activeTab === 'create' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Template Selection */}
              <Card>
                <CardHeader>
                  <CardTitle>Choose Template</CardTitle>
                  <CardDescription>Select a template for your cover letter</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {coverLetterTemplates.map((template) => (
                      <div
                        key={template.id}
                        onClick={() => setSelectedTemplate(template.id)}
                        className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                          selectedTemplate === template.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-2xl">{getTemplateIcon(template.id)}</span>
                          <span className="font-medium">{template.name}</span>
                        </div>
                        <p className="text-sm text-gray-600">{template.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* AI Generation */}
              {resumeData.resumeData && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Wand2 className="w-5 h-5" />
                      AI-Powered Generation
                    </CardTitle>
                    <CardDescription>Generate a cover letter based on your resume</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button
                      onClick={handleGenerateFromResume}
                      disabled={isGenerating}
                      className="w-full"
                      variant="outline"
                    >
                      <Wand2 className={`w-4 h-4 mr-2 ${isGenerating ? 'animate-spin' : ''}`} />
                      {isGenerating ? 'Generating...' : 'Generate from Resume'}
                    </Button>
                  </CardContent>
                </Card>
              )}

              {/* Cover Letter Form */}
              {currentCoverLetter && (
                <Card>
                  <CardHeader>
                    <CardTitle>Cover Letter Content</CardTitle>
                    <CardDescription>Edit your cover letter content below</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Recipient Info */}
                    <div>
                      <h3 className="text-lg font-medium mb-4">Recipient Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Recipient Name
                          </label>
                          <input
                            type="text"
                            value={currentCoverLetter.recipientInfo.name}
                            onChange={(e) => updateCoverLetter(currentCoverLetter.id, {
                              recipientInfo: {
                                ...currentCoverLetter.recipientInfo,
                                name: e.target.value,
                              },
                            })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Title
                          </label>
                          <input
                            type="text"
                            value={currentCoverLetter.recipientInfo.title}
                            onChange={(e) => updateCoverLetter(currentCoverLetter.id, {
                              recipientInfo: {
                                ...currentCoverLetter.recipientInfo,
                                title: e.target.value,
                              },
                            })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Company
                          </label>
                          <input
                            type="text"
                            value={currentCoverLetter.recipientInfo.company}
                            onChange={(e) => updateCoverLetter(currentCoverLetter.id, {
                              recipientInfo: {
                                ...currentCoverLetter.recipientInfo,
                                company: e.target.value,
                              },
                            })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email
                          </label>
                          <input
                            type="email"
                            value={currentCoverLetter.recipientInfo.email || ''}
                            onChange={(e) => updateCoverLetter(currentCoverLetter.id, {
                              recipientInfo: {
                                ...currentCoverLetter.recipientInfo,
                                email: e.target.value,
                              },
                            })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Letter Content */}
                    <div>
                      <h3 className="text-lg font-medium mb-4">Letter Content</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Greeting
                          </label>
                          <input
                            type="text"
                            value={currentCoverLetter.letterContent.greeting}
                            onChange={(e) => updateCoverLetter(currentCoverLetter.id, {
                              letterContent: {
                                ...currentCoverLetter.letterContent,
                                greeting: e.target.value,
                              },
                            })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Introduction
                          </label>
                          <textarea
                            value={currentCoverLetter.letterContent.introduction}
                            onChange={(e) => updateCoverLetter(currentCoverLetter.id, {
                              letterContent: {
                                ...currentCoverLetter.letterContent,
                                introduction: e.target.value,
                              },
                            })}
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Body Paragraphs
                          </label>
                          {currentCoverLetter.letterContent.bodyParagraphs.map((paragraph, index) => (
                            <textarea
                              key={index}
                              value={paragraph}
                              onChange={(e) => {
                                const newParagraphs = [...currentCoverLetter.letterContent.bodyParagraphs];
                                newParagraphs[index] = e.target.value;
                                updateCoverLetter(currentCoverLetter.id, {
                                  letterContent: {
                                    ...currentCoverLetter.letterContent,
                                    bodyParagraphs: newParagraphs,
                                  },
                                });
                              }}
                              rows={3}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-3"
                              placeholder={`Paragraph ${index + 1}`}
                            />
                          ))}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Closing
                          </label>
                          <input
                            type="text"
                            value={currentCoverLetter.letterContent.closing}
                            onChange={(e) => updateCoverLetter(currentCoverLetter.id, {
                              letterContent: {
                                ...currentCoverLetter.letterContent,
                                closing: e.target.value,
                              },
                            })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Signature
                          </label>
                          <input
                            type="text"
                            value={currentCoverLetter.letterContent.signature}
                            onChange={(e) => updateCoverLetter(currentCoverLetter.id, {
                              letterContent: {
                                ...currentCoverLetter.letterContent,
                                signature: e.target.value,
                              },
                            })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              {currentCoverLetter && (
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button
                      onClick={handlePreview}
                      variant="outline"
                      className="w-full"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Preview
                    </Button>
                    <Button
                      onClick={handleDownload}
                      className="w-full bg-blue-600 hover:bg-blue-700"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </CardContent>
                </Card>
              )}

              {/* Template Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Current Template</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{getTemplateIcon(selectedTemplate)}</span>
                    <div>
                      <div className="font-medium capitalize">{selectedTemplate}</div>
                      <div className="text-sm text-gray-600">
                        {coverLetterTemplates.find(t => t.id === selectedTemplate)?.description}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Style Settings */}
              <Card>
                <CardHeader>
                  <CardTitle>Style Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Font Family
                    </label>
                    <select
                      value={coverLetterStyle.fontFamily}
                      onChange={(e) => setCoverLetterStyle({
                        ...coverLetterStyle,
                        fontFamily: e.target.value,
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="Inter">Inter</option>
                      <option value="Roboto">Roboto</option>
                      <option value="Open Sans">Open Sans</option>
                      <option value="Lato">Lato</option>
                      <option value="Montserrat">Montserrat</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Font Size
                    </label>
                    <select
                      value={coverLetterStyle.fontSize}
                      onChange={(e) => setCoverLetterStyle({
                        ...coverLetterStyle,
                        fontSize: e.target.value as any,
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="small">Small</option>
                      <option value="medium">Medium</option>
                      <option value="large">Large</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Header Style
                    </label>
                    <select
                      value={coverLetterStyle.headerStyle}
                      onChange={(e) => setCoverLetterStyle({
                        ...coverLetterStyle,
                        headerStyle: e.target.value as any,
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="left-aligned">Left Aligned</option>
                      <option value="centered">Centered</option>
                      <option value="right-aligned">Right Aligned</option>
                    </select>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Manage Tab */}
        {activeTab === 'manage' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coverLetters.length === 0 ? (
              <Card className="col-span-full">
                <CardContent className="pt-12 pb-12 text-center">
                  <div className="text-gray-400 mb-4">
                    <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
                      <FileText className="w-8 h-8" />
                    </div>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No cover letters yet</h3>
                  <p className="text-gray-600 mb-6">Create your first cover letter to get started</p>
                  <Button onClick={handleCreateNew} className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Cover Letter
                  </Button>
                </CardContent>
              </Card>
            ) : (
              coverLetters.map((letter) => (
                <Card key={letter.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <span>{getTemplateIcon(letter.template)}</span>
                          Cover Letter
                        </CardTitle>
                        <CardDescription className="text-sm mt-1">
                          To: {letter.recipientInfo.name || 'Hiring Manager'}
                        </CardDescription>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <Settings className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEdit(letter)}>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDuplicate(letter)}>
                            <Copy className="w-4 h-4 mr-2" />
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleDelete(letter)}
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
                      <div className="text-sm text-gray-600">
                        <div>Company: {letter.recipientInfo.company}</div>
                        <div>Template: <span className="capitalize">{letter.template}</span></div>
                        <div>Created: {formatDate(letter.createdAt)}</div>
                      </div>
                      
                      <div className="flex gap-2 pt-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(letter)}
                          className="flex-1"
                        >
                          <Edit className="w-3 h-3 mr-1" />
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => router.push(`/cover-letter/preview/${letter.id}`)}
                        >
                          <Eye className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        )}

        {/* Templates Tab */}
        {activeTab === 'templates' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coverLetterTemplates.map((template) => (
              <Card key={template.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{getTemplateIcon(template.id)}</span>
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                  </div>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full w-fit capitalize">
                      {template.category}
                    </div>
                    
                    <Button
                      size="sm"
                      onClick={() => {
                        setSelectedTemplate(template.id);
                        setActiveTab('create');
                      }}
                      className="w-full"
                    >
                      Use Template
                    </Button>
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
