import { TemplateType } from '@/types/resume';
import { Check } from 'lucide-react';

interface TemplateSelectorProps {
  selectedTemplate: TemplateType;
  onTemplateChange: (template: TemplateType) => void;
}

const templates = [
  {
    id: 'executive' as TemplateType,
    name: 'Executive',
    description: 'Professional layout with blue header',
    preview: '/templates/executive-preview.png',
  },
  {
    id: 'minimalist' as TemplateType,
    name: 'Minimalist',
    description: 'Clean and simple two-column layout',
    preview: '/templates/minimalist-preview.png',
  },
  {
    id: 'creative' as TemplateType,
    name: 'Creative',
    description: 'Modern design with profile section and skill bars',
    preview: '/templates/creative-preview.png',
  },
  {
    id: 'professional' as TemplateType,
    name: 'Professional',
    description: 'Two-column layout with profile section',
    preview: '/templates/professional-preview.png',
  },
  {
    id: 'modern' as TemplateType,
    name: 'Modern',
    description: 'Clean and contemporary design with accent colors',
    preview: '/templates/modern-preview.png',
  },
  {
    id: 'classic' as TemplateType,
    name: 'Classic',
    description: 'Traditional professional layout',
    preview: '/templates/classic-preview.png',
  },
];

export default function TemplateSelector({ selectedTemplate, onTemplateChange }: TemplateSelectorProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 no-print">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Choose Your Template</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {templates.map((template) => (
          <button
            key={template.id}
            onClick={() => onTemplateChange(template.id)}
            className={`relative p-4 rounded-lg border-2 transition-all text-left ${
              selectedTemplate === template.id
                ? 'border-primary-600 bg-primary-50'
                : 'border-gray-200 hover:border-gray-300 bg-white'
            }`}
            aria-label={`Select ${template.name} template`}
          >
            {selectedTemplate === template.id && (
              <div className="absolute top-3 right-3 bg-primary-600 text-white rounded-full p-1">
                <Check className="w-4 h-4" />
              </div>
            )}
            
            <div className="flex items-start space-x-3">
              <div className="shrink-0 w-12 h-16 bg-linear-to-br from-gray-100 to-gray-200 rounded border border-gray-300 flex items-center justify-center">
                <span className="text-xs font-medium text-gray-600">
                  {template.id === 'executive' ? 'E' :
                   template.id === 'minimalist' ? 'M' : 
                   template.id === 'creative' ? 'C' : 
                   template.id === 'professional' ? 'P' : 
                   template.id === 'modern' ? 'MD' : 'CL'}
                </span>
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-semibold text-gray-900 mb-1">
                  {template.name}
                </h3>
                <p className="text-sm text-gray-600">
                  {template.description}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
