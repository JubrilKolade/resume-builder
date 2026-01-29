'use client';

import { useState } from 'react';
import { ResumeData } from '@/types/resume';
import PersonalInfoForm from './forms/PersonalInfoForm';
import WorkExperienceForm from './forms/WorkExperienceForm';
import EducationForm from './forms/EducationForm';
import SkillsForm from './forms/SkillsForm';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface ResumeFormProps {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
}

type Section = 'personal' | 'work' | 'education' | 'skills';

export default function ResumeForm({ data, onChange }: ResumeFormProps) {
  const [expandedSections, setExpandedSections] = useState<Section[]>([
    'personal',
    'work',
    'education',
    'skills',
  ]);

  const toggleSection = (section: Section) => {
    setExpandedSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    );
  };

  const sections = [
    {
      id: 'personal' as Section,
      title: 'Personal Information',
      component: (
        <PersonalInfoForm
          data={data.personalInfo}
          onChange={(personalInfo) => onChange({ ...data, personalInfo })}
        />
      ),
    },
    {
      id: 'work' as Section,
      title: 'Work Experience',
      component: (
        <WorkExperienceForm
          data={data.workExperience}
          onChange={(workExperience) => onChange({ ...data, workExperience })}
        />
      ),
    },
    {
      id: 'education' as Section,
      title: 'Education',
      component: (
        <EducationForm
          data={data.education}
          onChange={(education) => onChange({ ...data, education })}
        />
      ),
    },
    {
      id: 'skills' as Section,
      title: 'Skills',
      component: (
        <SkillsForm
          data={data.skills}
          onChange={(skills) => onChange({ ...data, skills })}
        />
      ),
    },
  ];

  return (
    <div className="space-y-4">
      {sections.map((section) => {
        const isExpanded = expandedSections.includes(section.id);
        
        return (
          <div
            key={section.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
          >
            <button
              onClick={() => toggleSection(section.id)}
              className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
              aria-expanded={isExpanded}
            >
              <h2 className="text-lg font-semibold text-gray-900">
                {section.title}
              </h2>
              {isExpanded ? (
                <ChevronUp className="w-5 h-5 text-gray-500" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-500" />
              )}
            </button>

            {isExpanded && (
              <div className="px-6 pb-6 border-t border-gray-100">
                {section.component}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
