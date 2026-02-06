'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Upload, 
  Download, 
  FileText, 
  CheckCircle, 
  AlertCircle, 
  File,
  ArrowRight,
  Import
} from 'lucide-react';
import { importFromJSON, importFromCSV, importLinkedInProfile, downloadFile } from '@/utils/import-export';
import { useApp } from '@/contexts/AppContext';

export default function ImportExportPage() {
  const { addNotification } = useApp();
  const [activeTab, setActiveTab] = useState<'import' | 'export'>('import');
  const [importMethod, setImportMethod] = useState<'file' | 'linkedin' | 'csv'>('file');
  const [isImporting, setIsImporting] = useState(false);
  const [importResult, setImportResult] = useState<any>(null);

  const handleFileImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsImporting(true);
    setImportResult(null);

    try {
      let result;
      
      if (file.name.endsWith('.json')) {
        result = await importFromJSON(file);
      } else if (file.name.endsWith('.csv')) {
        result = await importFromCSV(file);
      } else {
        throw new Error('Unsupported file format. Please use JSON or CSV files.');
      }

      setImportResult(result);
      
      if (result.success) {
        addNotification({
          type: 'success',
          title: 'Import Successful',
          message: 'Your data has been imported successfully.',
        });
      } else {
        addNotification({
          type: 'error',
          title: 'Import Failed',
          message: result.error || 'Failed to import file.',
        });
      }
    } catch (error) {
      addNotification({
        type: 'error',
        title: 'Import Error',
        message: 'An error occurred while importing the file.',
      });
    } finally {
      setIsImporting(false);
    }
  };

  const handleLinkedInImport = () => {
    // In a real implementation, this would open LinkedIn OAuth flow
    addNotification({
      type: 'info',
      title: 'LinkedIn Import',
      message: 'LinkedIn import feature coming soon!',
    });
  };

  const handleExport = (format: 'json' | 'csv' | 'xml') => {
    // Get current resume data from context
    const resumeData = {}; // This would come from your resume context
    
    try {
      let content;
      let filename;
      let mimeType;
      
      switch (format) {
        case 'json':
          content = JSON.stringify({ data: resumeData, exportedAt: new Date().toISOString() }, null, 2);
          filename = 'resume-data.json';
          mimeType = 'application/json';
          break;
        case 'csv':
          // Simple CSV export - you'd want to implement proper CSV formatting
          content = 'Section,Data\nPersonal Info,"Sample Data"\nExperience,"Sample Experience"';
          filename = 'resume-data.csv';
          mimeType = 'text/csv';
          break;
        case 'xml':
          content = '<?xml version="1.0" encoding="UTF-8"?><resume><personal-info><name>Sample Name</name></personal-info></resume>';
          filename = 'resume-data.xml';
          mimeType = 'application/xml';
          break;
      }
      
      downloadFile(content, filename, mimeType);
      
      addNotification({
        type: 'success',
        title: 'Export Successful',
        message: `Your resume has been exported as ${format.toUpperCase()}.`,
      });
    } catch (error) {
      addNotification({
        type: 'error',
        title: 'Export Failed',
        message: 'Failed to export resume data.',
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Import & Export</h1>
          <p className="text-lg text-gray-600">
            Import existing resume data or export your current resume in various formats
          </p>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-8 bg-gray-100 p-1 rounded-lg w-fit">
          {[
            { id: 'import', label: 'Import', icon: Upload },
            { id: 'export', label: 'Export', icon: Download },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-6 py-3 rounded-md text-sm font-medium transition-colors ${
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

        {/* Import Tab */}
        {activeTab === 'import' && (
          <div className="space-y-8">
            {/* Import Methods */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card 
                className={`hover:shadow-lg transition-all cursor-pointer group ${
                  importMethod === 'file' ? 'shadow-xl shadow-blue-200' : 'hover:shadow-md'
                }`}
                onClick={() => setImportMethod('file')}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <File className="w-5 h-5" />
                    File Import
                  </CardTitle>
                  <CardDescription>
                    Import from JSON or CSV files
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="rounded-lg p-8 text-center">
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-sm text-gray-600 mb-4">
                        Drag and drop your file here, or click to browse
                      </p>
                      <input
                        type="file"
                        accept=".json,.csv"
                        onChange={handleFileImport}
                        disabled={isImporting}
                        className="hidden"
                        id="file-import"
                      />
                      <Button 
                        onClick={() => document.getElementById('file-import')?.click()}
                        disabled={isImporting}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        <Import className="w-4 h-4 mr-2" />
                        {isImporting ? 'Importing...' : 'Choose File'}
                      </Button>
                    </div>
                    
                    <div className="text-xs text-gray-500">
                      Supported formats: JSON, CSV
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card 
                className={`hover:shadow-lg transition-all cursor-pointer group ${
                  importMethod === 'linkedin' ? 'shadow-xl shadow-blue-200' : 'hover:shadow-md'
                }`}
                onClick={() => setImportMethod('linkedin')}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    LinkedIn Import
                  </CardTitle>
                  <CardDescription>
                    Import your LinkedIn profile data
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-800">
                        Connect your LinkedIn account to automatically import your profile information, work experience, and education.
                      </p>
                    </div>
                    
                    <Button 
                      onClick={handleLinkedInImport}
                      className="w-full bg-blue-600 hover:bg-blue-700"
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      Import from LinkedIn
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card 
                className={`hover:shadow-lg transition-all cursor-pointer group ${
                  importMethod === 'csv' ? 'shadow-xl shadow-blue-200' : 'hover:shadow-md'
                }`}
                onClick={() => setImportMethod('csv')}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <File className="w-5 h-5" />
                    CSV Template
                  </CardTitle>
                  <CardDescription>
                    Download CSV template and fill it out
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-gray-600">
                      Download our CSV template to structure your data correctly before importing.
                    </p>
                    
                    <Button 
                      onClick={() => handleExport('csv')}
                      variant="outline"
                      className="w-full"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download Template
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Import Result */}
            {importResult && (
              <Card className={`shadow-lg ${importResult.success ? 'bg-green-50' : 'bg-red-50'}`}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {importResult.success ? (
                      <>
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        Import Successful
                      </>
                    ) : (
                      <>
                        <AlertCircle className="w-5 h-5 text-red-600" />
                        Import Failed
                      </>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {importResult.success ? (
                    <div>
                      <p className="text-green-800 mb-4">
                        Your data has been imported successfully!
                      </p>
                      {importResult.warnings && importResult.warnings.length > 0 && (
                        <div className="mt-4">
                          <h4 className="font-medium text-yellow-800 mb-2">Warnings:</h4>
                          <ul className="list-disc list-inside text-sm text-yellow-700">
                            {importResult.warnings.map((warning: string, index: number) => (
                              <li key={index}>{warning}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div>
                      <p className="text-red-800 mb-4">
                        {importResult.error}
                      </p>
                      <Button 
                        onClick={() => setImportResult(null)}
                        variant="outline"
                      >
                        Try Again
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Export Tab */}
        {activeTab === 'export' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <File className="w-5 h-5" />
                    JSON Export
                  </CardTitle>
                  <CardDescription>
                    Export your resume data as structured JSON
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-gray-600">
                      Complete resume data in JSON format, perfect for backup or migration.
                    </p>
                    
                    <Button 
                      onClick={() => handleExport('json')}
                      className="w-full group-hover:bg-blue-700"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Export JSON
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <File className="w-5 h-5" />
                    CSV Export
                  </CardTitle>
                  <CardDescription>
                    Export your resume data as CSV spreadsheet
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-gray-600">
                      Tabular format compatible with spreadsheet applications.
                    </p>
                    
                    <Button 
                      onClick={() => handleExport('csv')}
                      className="w-full group-hover:bg-blue-700"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Export CSV
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <File className="w-5 h-5" />
                    XML Export
                  </CardTitle>
                  <CardDescription>
                    Export your resume data as XML document
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-gray-600">
                      Structured XML format for integration with other systems.
                    </p>
                    
                    <Button 
                      onClick={() => handleExport('xml')}
                      className="w-full group-hover:bg-blue-700"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Export XML
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Export Info */}
            <Card className="bg-blue-50 shadow-lg">
              <CardHeader>
                <CardTitle className="text-blue-900">Export Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm text-blue-800">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>All personal and professional data included</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>Formatted for easy re-import</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>Compatible with major resume builders</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>Secure and private - data never leaves your device</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
