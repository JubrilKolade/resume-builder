import { TemplateType, ResumeStyle } from '@/types/resume';
import { Check } from 'lucide-react';
import Image from 'next/image';

interface TemplateSelectorProps {
  selectedTemplate: TemplateType;
  onTemplateChange: (template: TemplateType) => void;
  style?: ResumeStyle;
}

const templates = [
  {
    id: 'classic' as TemplateType,
    name: 'Classic',
    description: 'Traditional professional layout with gold accents',
    image: '/classic-template.png',
  },
  {
    id: 'modern' as TemplateType,
    name: 'Modern',
    description: 'Contemporary design with green highlights and clean sections',
    image: '/modern-template.png',
  },
  {
    id: 'sidebar' as TemplateType,
    name: 'Sidebar',
    description: 'Two-column layout with dark sidebar and profile image',
    image: '/sidebar-template.png',
  },
  {
    id: 'creative' as TemplateType,
    name: 'Creative',
    description: 'Striking colored header with left sidebar and profile photo',
    image: '/creative-template.png',
  },
];

export default function TemplateSelector({ selectedTemplate, onTemplateChange }: TemplateSelectorProps) {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
        {templates.map((template) => (
          <button
            key={template.id}
            onClick={() => onTemplateChange(template.id)}
            className={`group relative flex flex-col rounded-xl border-2 transition-all duration-300 overflow-hidden ${
              selectedTemplate === template.id
                ? 'border-blue-600 ring-2 ring-blue-500 ring-offset-2 shadow-xl'
                : 'border-gray-200 hover:border-blue-400 hover:shadow-lg'
            }`}
            aria-label={`Select ${template.name} template`}
          >
            {/* Template Image Container */}
            <div className="relative w-full h-120 bg-gray-100 overflow-hidden">
              <Image
                src={template.image}
                alt={`${template.name} template preview`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              
              {/* Selection Badge */}
              {selectedTemplate === template.id && (
                <div className="absolute top-4 right-4 bg-linear-to-br from-blue-600 to-blue-700 text-white rounded-full p-2.5 shadow-lg z-20 animate-pulse">
                  <Check className="w-5 h-5" />
                </div>
              )}
            </div>

            {/* Template Info */}
            <div className={`p-4 transition-all duration-300 ${
              selectedTemplate === template.id
                ? 'bg-blue-50 border-t-2 border-blue-100'
                : 'bg-white border-t border-gray-200 group-hover:bg-gray-50'
            }`}>
              <h3 className={`font-bold text-base transition-colors duration-300 ${
                selectedTemplate === template.id
                  ? 'text-blue-900'
                  : 'text-gray-900 group-hover:text-blue-600'
              }`}>
                {template.name}
              </h3>
              <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                {template.description}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
