'use client';

import { useState } from 'react';
import { ResumeData } from '@/types/resume';
import PersonalInfoForm from '@/components/forms/PersonalInfoForm';
import WorkExperienceForm from '@/components/forms/WorkExperienceForm';
import EducationForm from '@/components/forms/EducationForm';
import SkillsForm from '@/components/forms/SkillsForm';
import CertificationsForm from '@/components/forms/CertificationsForm';
import CommunityForm from '@/components/forms/CommunityForm';
import LeadershipForm from '@/components/forms/LeadershipForm';

interface ResumeFormProps {
  data: ResumeData;
  onChange: (data: Partial<ResumeData>) => void;
}

const formSections = [
  { id: 'personal', label: 'Personal Info' },
  { id: 'work', label: 'Work Experience' },
  { id: 'education', label: 'Education' },
  { id: 'skills', label: 'Skills' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'community', label: 'Community' },
  { id: 'leadership', label: 'Leadership' },
];

export default function ResumeForm({ data, onChange }: ResumeFormProps) {
  const [activeSection, setActiveSection] = useState('personal');

  const handlePersonalInfoChange = (personalInfo: any) => {
    onChange({ personalInfo });
  };

  const handleWorkExperienceChange = (workExperience: any) => {
    onChange({ workExperience });
  };

  const handleEducationChange = (education: any) => {
    onChange({ education });
  };

  const handleSkillsChange = (skills: any) => {
    onChange({ skills });
  };

  const handleCertificationsChange = (certifications: any) => {
    onChange({ certifications });
  };

  const handleCommunityChange = (community: any) => {
    onChange({ community });
  };

  const handleLeadershipChange = (leadership: any) => {
    onChange({ leadership });
  };

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-gray-200">
        {formSections.map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeSection === section.id
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            {section.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="mt-6">
        {activeSection === 'personal' && (
          <PersonalInfoForm
            data={data.personalInfo}
            onChange={handlePersonalInfoChange}
          />
        )}
        {activeSection === 'work' && (
          <WorkExperienceForm
            data={data.workExperience}
            onChange={handleWorkExperienceChange}
          />
        )}
        {activeSection === 'education' && (
          <EducationForm
            data={data.education}
            onChange={handleEducationChange}
          />
        )}
        {activeSection === 'skills' && (
          <SkillsForm
            data={data.skills}
            onChange={handleSkillsChange}
          />
        )}
        {activeSection === 'certifications' && (
          <CertificationsForm
            data={data.certifications || []}
            onChange={handleCertificationsChange}
          />
        )}
        {activeSection === 'community' && (
          <CommunityForm
            data={data.community || []}
            onChange={handleCommunityChange}
          />
        )}
        {activeSection === 'leadership' && (
          <LeadershipForm
            data={data.leadership || []}
            onChange={handleLeadershipChange}
          />
        )}
      </div>
    </div>
  );
}
