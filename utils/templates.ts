
import { TemplateType } from '@/types/resume';

export const templates = [
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
