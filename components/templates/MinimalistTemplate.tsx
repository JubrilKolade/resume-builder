import React from 'react';
import { ResumeData, ResumeStyle } from '@/types/resume';
import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';

interface MinimalistTemplateProps {
  data: ResumeData;
  style: ResumeStyle;
  onDownload?: () => void;
}

const MinimalistTemplate: React.FC<MinimalistTemplateProps> = ({ data, style, onDownload }) => {
  const { personalInfo, workExperience, education, skills, projects } = data;
  const accentColor = style.accentColor || '#1e40af';
  const textColor = style.textColor || '#1f2937';
  const bgColor = style.backgroundColor || '#ffffff';

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg overflow-hidden">
      {/* Header */}
      <div className="p-8 border-b" style={{ borderColor: accentColor }}>
        <h1 className="text-3xl font-bold" style={{ color: textColor }}>
          {personalInfo.fullName || 'YOUR NAME'}
        </h1>
        <p style={{ color: textColor }}>
          {personalInfo.title || 'Your Professional Title'}
        </p>
        
        {/* Contact Info */}
        <div className="flex flex-wrap gap-4 mt-4 text-sm" style={{ color: textColor }}>
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
      </div>

      <div className="flex flex-col md:flex-row">
        {/* Left Column */}
        <div className="w-full md:w-1/3 p-6" style={{ backgroundColor: bgColor }}>
          {/* Skills */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold border-b pb-1 mb-3" style={{ color: textColor, borderColor: accentColor }}>
              Skills
            </h2>
            <div className="space-y-3">
              {skills.map((skill) => (
                <div key={skill.id}>
                  <div className="text-sm font-medium" style={{ color: textColor }}>{skill.name}</div>
                  {skill.level !== undefined && (
                    <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                      <div 
                        className="h-1.5 rounded-full" 
                        style={{ width: `${skill.level}%`, backgroundColor: accentColor }}
                      ></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold border-b pb-1 mb-3" style={{ color: textColor, borderColor: accentColor }}>
              Education
            </h2>
            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between">
                    <h3 className="font-medium" style={{ color: textColor }}>{edu.degree}</h3>
                    <div className="text-xs" style={{ color: accentColor }}>
                      {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                    </div>
                  </div>
                  <p className="text-sm" style={{ color: textColor }}>
                    {edu.institution}
                    {edu.location && `, ${edu.location}`}
                  </p>
                  {edu.gpa && (
                    <p className="text-xs" style={{ color: accentColor }}>GPA: {edu.gpa}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Languages */}
          {data.languages && data.languages.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold border-b pb-1 mb-3" style={{ color: textColor, borderColor: accentColor }}>
                Languages
              </h2>
              <div className="space-y-2">
                {data.languages.map((lang) => (
                  <div key={lang.id} className="flex justify-between items-center">
                    <span className="text-sm" style={{ color: textColor }}>{lang.name}</span>
                    <span className="text-xs" style={{ color: accentColor }}>{lang.level}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="w-full md:w-2/3 p-6">
          {/* Summary */}
          {personalInfo.summary && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold border-b pb-1 mb-3" style={{ color: textColor, borderColor: accentColor }}>
                Summary
              </h2>
              <p className="text-sm" style={{ color: textColor }}>
                {personalInfo.summary}
              </p>
            </div>
          )}

          {/* Work Experience */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold border-b pb-1 mb-3" style={{ color: textColor, borderColor: accentColor }}>
              Work Experience
            </h2>
            <div className="space-y-6">
              {workExperience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between">
                    <h3 className="font-medium" style={{ color: textColor }}>{exp.position}</h3>
                    <div className="text-xs" style={{ color: accentColor }}>
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </div>
                  </div>
                  <div className="flex justify-between text-sm mb-2" style={{ color: textColor }}>
                    <span>{exp.company}</span>
                    <span>{exp.location}</span>
                  </div>
                  <ul className="text-sm space-y-1 pl-4" style={{ color: textColor }}>
                    {exp.description.map((item, idx) => (
                      <li key={idx} className="relative pl-2">
                        <span className="absolute left-0" style={{ color: accentColor }}>•</span>
                        <span className="ml-2">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Projects */}
          {projects && projects.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold border-b pb-1 mb-3" style={{ color: textColor, borderColor: accentColor }}>
                Projects
              </h2>
              <div className="space-y-4">
                {projects.map((project) => (
                  <div key={project.id}>
                    <h3 className="font-medium" style={{ color: textColor }}>{project.name}</h3>
                    <p className="text-sm mb-2" style={{ color: textColor }}>{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, idx) => (
                        <span 
                          key={idx} 
                          className="text-xs px-2 py-1 rounded"
                          style={{ backgroundColor: '#e5e7eb', color: textColor }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MinimalistTemplate;
