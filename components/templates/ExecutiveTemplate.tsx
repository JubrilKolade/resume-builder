import React from 'react';
import { ResumeData, ResumeStyle } from '@/types/resume';
import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';

interface ExecutiveTemplateProps {
  data: ResumeData;
  style: ResumeStyle;
  onDownload?: () => void;
}

const ExecutiveTemplate: React.FC<ExecutiveTemplateProps> = ({ data, style, onDownload }) => {
  const { personalInfo, workExperience, education, skills } = data;
  const accentColor = style.accentColor || '#1e40af';
  const textColor = style.textColor || '#1f2937';
  const bgColor = style.backgroundColor || '#ffffff';

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg overflow-hidden">
      {/* Header */}
      <div className="text-white p-6" style={{ backgroundColor: accentColor }}>
        <div className="flex flex-col items-center text-center">
          <h1 className="text-3xl font-bold uppercase tracking-wide">
            {personalInfo.fullName || 'YOUR NAME'}
          </h1>
          <p className="text-gray-100 mt-1">
            {personalInfo.title || 'YOUR PROFESSIONAL TITLE'}
          </p>
        </div>
      </div>

      <div className="p-6">
        {/* Contact Info */}
        <div className="flex flex-wrap justify-center gap-4 text-sm mb-6" style={{ color: textColor }}>
          {personalInfo.email && (
            <div className="flex items-center">
              <Mail className="w-4 h-4 mr-1" style={{ color: accentColor }} />
              <span>{personalInfo.email}</span>
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center">
              <Phone className="w-4 h-4 mr-1" style={{ color: accentColor }} />
              <span>{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo.location && (
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-1" style={{ color: accentColor }} />
              <span>{personalInfo.location}</span>
            </div>
          )}
          {personalInfo.linkedin && (
            <div className="flex items-center">
              <Linkedin className="w-4 h-4 mr-1" style={{ color: accentColor }} />
              <span>{personalInfo.linkedin}</span>
            </div>
          )}
          {personalInfo.website && (
            <div className="flex items-center">
              <Globe className="w-4 h-4 mr-1" style={{ color: accentColor }} />
              <span>{personalInfo.website}</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="md:col-span-2">
            {/* Summary */}
            {personalInfo.summary && (
              <div className="mb-6">
                <h2 className="text-lg font-bold text-blue-700 border-b border-blue-200 pb-1 mb-2">
                  PROFILE
                </h2>
                <p className="text-sm text-gray-700">
                  {personalInfo.summary}
                </p>
              </div>
            )}

            {/* Work Experience */}
            <div className="mb-6">
              <h2 className="text-lg font-bold text-blue-700 border-b border-blue-200 pb-1 mb-3">
                PROFESSIONAL EXPERIENCE
              </h2>
              <div className="space-y-6">
                {workExperience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between">
                      <h3 className="font-bold text-gray-900">{exp.position}</h3>
                      <div className="text-sm text-gray-600">
                        {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                      </div>
                    </div>
                    <div className="text-sm font-medium text-blue-700 mb-2">
                      {exp.company} | {exp.location}
                    </div>
                    <ul className="text-sm text-gray-700 space-y-1 pl-4">
                      {exp.description.map((item, idx) => (
                        <li key={idx} className="relative">
                          <span className="absolute left-0">•</span>
                          <span className="ml-2">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div>
              <h2 className="text-lg font-bold text-blue-700 border-b border-blue-200 pb-1 mb-3">
                EDUCATION
              </h2>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <div className="flex justify-between">
                      <h3 className="font-bold text-gray-900">{edu.degree} in {edu.field}</h3>
                      <div className="text-sm text-gray-600">
                        {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                      </div>
                    </div>
                    <div className="text-sm text-blue-700 font-medium">
                      {edu.institution}, {edu.location}
                    </div>
                    {edu.gpa && (
                      <div className="text-sm text-gray-600">
                        GPA: {edu.gpa}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="md:border-l md:pl-6">
            {/* Skills */}
            <div className="mb-6">
              <h2 className="text-lg font-bold text-blue-700 border-b border-blue-200 pb-1 mb-3">
                KEY SKILLS
              </h2>
              <div className="space-y-3">
                {skills.map((skill) => (
                  <div key={skill.id}>
                    <div className="text-sm font-medium text-gray-900">{skill.name}</div>
                    {skill.level !== undefined && (
                      <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                        <div 
                          className="bg-blue-700 h-1.5 rounded-full" 
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            {data.certifications && data.certifications.length > 0 && (
              <div className="mb-6">
                <h2 className="text-lg font-bold text-blue-700 border-b border-blue-200 pb-1 mb-3">
                  CERTIFICATIONS
                </h2>
                <div className="space-y-2">
                  {data.certifications.map((cert) => (
                    <div key={cert.id} className="text-sm">
                      <div className="font-medium">{cert.name}</div>
                      <div className="text-gray-600">{cert.issuer}</div>
                      <div className="text-xs text-gray-500">{cert.date}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Languages */}
            {data.languages && data.languages.length > 0 && (
              <div>
                <h2 className="text-lg font-bold text-blue-700 border-b border-blue-200 pb-1 mb-3">
                  LANGUAGES
                </h2>
                <div className="space-y-2">
                  {data.languages.map((lang) => (
                    <div key={lang.id} className="text-sm">
                      <div className="flex justify-between">
                        <span className="font-medium">{lang.name}</span>
                        <span className="text-gray-600">{lang.level}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExecutiveTemplate;
