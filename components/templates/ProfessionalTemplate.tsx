import React from 'react';
import { ResumeData, ResumeStyle } from '@/types/resume';
import { Mail, Phone, MapPin, Linkedin } from 'lucide-react';

interface ProfessionalTemplateProps {
  data: ResumeData;
  style: ResumeStyle;
  onDownload?: () => void;
}

const ProfessionalTemplate: React.FC<ProfessionalTemplateProps> = ({ data, style, onDownload }) => {
  const { personalInfo, workExperience, education, skills } = data;
  const accentColor = style.accentColor || '#f97316';
  const textColor = style.textColor || '#1f2937';
  const bgColor = style.backgroundColor || '#ffffff';

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg overflow-hidden">
      {/* Header */}
      <div className="text-white p-6" style={{ backgroundColor: accentColor }}>
        <div className="flex flex-col items-center text-center">
          <h1 className="text-3xl font-bold uppercase tracking-wider">
            {personalInfo.fullName || 'YOUR NAME'}
          </h1>
          <p className="text-lg font-medium mt-1">
            {personalInfo.title || 'YOUR TITLE'}
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row">
        {/* Left Column */}
        <div className="w-full md:w-1/3 p-6" style={{ backgroundColor: '#f9fafb' }}>
           {personalInfo.image ? (
                <div className="mb-6 flex justify-center">
                <img
                    src={personalInfo.image}
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"
                    style={{ borderColor: accentColor }}
                />
                </div>
            ) : (
                <div className="mb-6 flex justify-center">
                <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center text-gray-400">
                    <span className="text-sm">Add Photo</span>
                </div>
                </div>
            )}

          {/* Contact */}
          <div className="mb-6">
            <h2 className="text-lg font-bold border-b-2 pb-1 mb-3" style={{ color: accentColor, borderColor: accentColor }}>
              CONTACT DETAILS
            </h2>
            <div className="space-y-2">
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2" style={{ color: accentColor }} />
                <span style={{ color: textColor }}>{personalInfo.email || 'your.email@example.com'}</span>
              </div>
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2" style={{ color: accentColor }} />
                <span style={{ color: textColor }}>{personalInfo.phone || '(123) 456-7890'}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2" style={{ color: accentColor }} />
                <span style={{ color: textColor }}>{personalInfo.location || 'Your Location'}</span>
              </div>
              {personalInfo.linkedin && (
                <div className="flex items-center">
                  <Linkedin className="w-4 h-4 mr-2" style={{ color: accentColor }} />
                  <span style={{ color: textColor }}>{personalInfo.linkedin}</span>
                </div>
              )}
            </div>
          </div>

          {/* Skills */}
          <div className="mb-6">
            <h2 className="text-lg font-bold border-b-2 pb-1 mb-3" style={{ color: accentColor, borderColor: accentColor }}>
              RELEVANT SKILLS
            </h2>
            <ul className="space-y-1">
              {skills.map((skill) => (
                <li key={skill.id} className="flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full mr-2" style={{ backgroundColor: accentColor }}></span>
                  <span style={{ color: textColor }}>{skill.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column */}
        <div className="w-full md:w-2/3 p-6">
          {/* Summary */}
          <div className="mb-6">
            <h2 className="text-lg font-bold border-b-2 pb-1 mb-3" style={{ color: accentColor, borderColor: accentColor }}>
              SUMMARY
            </h2>
            <p className="text-sm" style={{ color: textColor }}>
              {personalInfo.summary || 'A brief summary about yourself and your professional background.'}
            </p>
          </div>

          {/* Work Experience */}
          <div className="mb-6">
            <h2 className="text-lg font-bold border-b-2 pb-1 mb-3" style={{ color: accentColor, borderColor: accentColor }}>
              PROFESSIONAL EXPERIENCE
            </h2>
            <div className="space-y-4">
              {workExperience.map((exp) => (
                <div key={exp.id} className="mb-4">
                  <div className="flex justify-between">
                    <h3 className="font-bold" style={{ color: textColor }}>{exp.position}</h3>
                    <div className="text-sm" style={{ color: textColor }}>
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </div>
                  </div>
                  <div className="text-sm font-medium" style={{ color: textColor }}>
                    {exp.company} - {exp.location}
                  </div>
                  <ul className="mt-2 text-sm space-y-1" style={{ color: textColor }}>
                    {exp.description.map((item, idx) => (
                      <li key={idx} className="flex">
                        <span className="mr-2" style={{ color: accentColor }}>•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <h2 className="text-lg font-bold border-b-2 pb-1 mb-3" style={{ color: accentColor, borderColor: accentColor }}>
              EDUCATION
            </h2>
            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id} className="mb-2">
                  <div className="flex justify-between">
                    <h3 className="font-bold" style={{ color: textColor }}>{edu.degree} in {edu.field}</h3>
                    <div className="text-sm" style={{ color: textColor }}>
                      {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                    </div>
                  </div>
                  <div className="text-sm font-medium" style={{ color: textColor }}>
                    {edu.institution}, {edu.location}
                  </div>
                  {edu.gpa && (
                    <div className="text-sm" style={{ color: textColor }}>
                      GPA: {edu.gpa}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalTemplate;
