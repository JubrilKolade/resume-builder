import { ResumeData, ResumeStyle, TemplateType } from '@/types/resume';
import ClassicTemplate from '@/components/templates/ClassicTemplate';
import ModernTemplate from '@/components/templates/ModernTemplate';
import SidebarTemplate from '@/components/templates/SidebarTemplate';
import CreativeTemplate from '@/components/templates/CreativeTemplate';

interface TemplatePreviewProps {
  templateId: TemplateType;
  style: ResumeStyle;
  size?: 'small' | 'medium' | 'large';
}

const getSampleData = (): ResumeData => ({
  personalInfo: {
    fullName: 'Alex Johnson',
    email: 'alex@email.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    linkedin: 'linkedin.com/in/alex',
    website: 'alexjohnson.dev',
    summary: 'Creative professional with 5+ years of experience building amazing digital products and leading high-performing teams.',
    title: 'Senior Product Designer',
    image: '',
  },
  workExperience: [
    {
      id: '1',
      company: 'TechFlow Inc.',
      position: 'Senior Product Designer',
      location: 'San Francisco, CA',
      startDate: '2021-03',
      endDate: '',
      current: true,
      description: [
        'Led design of 3 major product launches impacting 100K+ users',
        'Mentored team of 4 junior designers and conducted weekly design reviews',
        'Reduced design-to-dev handoff time by 40% through new workflow',
      ],
    },
    {
      id: '2',
      company: 'Creative Studios',
      position: 'Product Designer',
      location: 'Remote',
      startDate: '2019-06',
      endDate: '2021-02',
      current: false,
      description: [
        'Designed user interfaces for SaaS products serving 50K+ users',
        'Collaborated with cross-functional teams to improve user experience',
      ],
    },
  ],
  education: [
    {
      id: '1',
      institution: 'University of California',
      degree: 'Bachelor of Arts',
      field: 'Design & Technology',
      location: 'Berkeley, CA',
      startDate: '2015-09',
      endDate: '2019-05',
      current: false,
      gpa: '3.7',
    },
  ],
  skills: [
    { id: '1', name: 'UI Design', category: 'Design' },
    { id: '2', name: 'Figma', category: 'Tools' },
    { id: '3', name: 'User Research', category: 'Design' },
    { id: '4', name: 'Leadership', category: 'Soft Skills' },
    { id: '5', name: 'Prototyping', category: 'Design' },
  ],
  certifications: [
    {
      id: '1',
      name: 'Google UX Design Certificate',
      issuer: 'Google',
      date: '2020-06',
    },
  ],
  community: [],
  leadership: [],
  projects: [],
});

export default function TemplatePreview({ templateId, style, size = 'medium' }: TemplatePreviewProps) {
  const sampleData = getSampleData();
  
  const containerClasses = {
    small: 'scale-[0.25] origin-top-left',
    medium: 'scale-[0.4] origin-top-left',
    large: 'scale-50 origin-top-left',
  };

  const containerHeight = {
    small: 'h-[220px]',
    medium: 'h-[350px]',
    large: 'h-[525px]',
  };

  const renderTemplate = () => {
    const props = { data: sampleData, style };
    
    switch (templateId) {
      case 'classic':
        return <ClassicTemplate {...props} />;
      case 'modern':
        return <ModernTemplate {...props} />;
      case 'sidebar':
        return <SidebarTemplate {...props} />;
      case 'creative':
        return <CreativeTemplate {...props} />;
      default:
        return <ClassicTemplate {...props} />;
    }
  };

  return (
    <div className={`${containerHeight[size]} bg-white border border-gray-300 rounded-lg overflow-hidden shadow-md relative`}>
      <div className={`${containerClasses[size]}`}>
        <div className="w-[850px]">
          {renderTemplate()}
        </div>
      </div>
    </div>
  );
}
