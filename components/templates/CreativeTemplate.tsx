import React from 'react';
import { ResumeData, ResumeStyle } from '@/types/resume';
import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';

interface CreativeTemplateProps {
  data: ResumeData;
  style: ResumeStyle;
  onDownload?: () => void;
}

const CreativeTemplate: React.FC<CreativeTemplateProps> = ({ data, style, onDownload }) => {
  const { personalInfo, workExperience, education, skills, projects } = data;
  const accentColor = style.accentColor || '#7c3aed';
  const textColor = style.textColor || '#1f2937';
  const bgColor = style.backgroundColor || '#ffffff';

  return (
    <div className="max-w-5xl mx-auto bg-white shadow-lg overflow-hidden">
      {/* Header with Profile Section */}
      <div className="text-white p-8 relative" style={{ backgroundColor: accentColor }}>
        <div className="flex flex-col md:flex-row items-center">
          {/* Profile Picture */}
          <div className="w-32 h-32 rounded-full border-4 border-white bg-gray-200 flex items-center justify-center text-gray-500 mb-6 md:mb-0 md:mr-8">
            <span className="text-sm text-center">Profile Photo</span>
          </div>
          
          {/* Name and Title */}
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold">
              {personalInfo.fullName || 'YOUR NAME'}
            </h1>
            <p className="text-xl text-gray-100 mt-1">
              {personalInfo.title || 'YOUR PROFESSION'}
            </p>
            
            {/* Contact Info */}
            <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4 text-sm">
              {personalInfo.email && (
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-1" />
                  <span>{personalInfo.email}</span>
                </div>
              )}
              {personalInfo.phone && (
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-1" />
                  <span>{personalInfo.phone}</span>
                </div>
              )}
              {personalInfo.location && (
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{personalInfo.location}</span>
                </div>
              )}
              {personalInfo.linkedin && (
                <div className="flex items-center">
                  <Linkedin className="w-4 h-4 mr-1" />
                  <span>{personalInfo.linkedin}</span>
                </div>
              )}
              {personalInfo.website && (
                <div className="flex items-center">
                  <Globe className="w-4 h-4 mr-1" />
                  <span>{personalInfo.website}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row">
        {/* Left Column */}
        <div className="w-full md:w-1/3 bg-gray-50 p-6">
          {/* About Me */}
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 border-b-2 border-gray-300 pb-1 mb-3">
              ABOUT ME
            </h2>
            <p className="text-sm text-gray-700">
              {personalInfo.summary || 'A passionate professional with a creative mindset and a drive for innovation.'}
            </p>
          </div>

          {/* Skills */}
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 border-b-2 border-gray-300 pb-1 mb-3">
              SKILLS
            </h2>
            <div className="space-y-3">
              {skills.map((skill) => (
                <div key={skill.id}>
                  <div className="flex justify-between text-sm font-medium mb-1">
                    <span>{skill.name}</span>
                    <span className="text-gray-500">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gray-800 h-2 rounded-full" 
                      style={{ width: `${skill.level || 0}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Languages */}
          {data.languages && data.languages.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-bold text-gray-900 border-b-2 border-gray-300 pb-1 mb-3">
                LANGUAGES
              </h2>
              <div className="space-y-2">
                {data.languages.map((lang) => (
                  <div key={lang.id}>
                    <div className="flex justify-between text-sm">
                      <span>{lang.name}</span>
                      <span className="text-gray-500">{lang.level}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="w-full md:w-2/3 p-6">
          {/* Work Experience */}
          <div className="mb-8">
            <h2 className="text-lg font-bold text-gray-900 border-b-2 border-gray-300 pb-1 mb-4">
              WORK EXPERIENCE
            </h2>
            <div className="space-y-6">
              {workExperience.map((exp) => (
                <div key={exp.id} className="relative pl-6 border-l-2 border-gray-200">
                  <div className="absolute w-3 h-3 bg-gray-800 rounded-full -left-1.5 mt-1"></div>
                  <div className="flex justify-between">
                    <h3 className="font-bold">{exp.position}</h3>
                    <div className="text-sm text-gray-600">
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </div>
                  </div>
                  <div className="text-sm text-gray-700 font-medium mb-2">
                    {exp.company} | {exp.location}
                  </div>
                  <ul className="text-sm text-gray-700 space-y-1">
                    {exp.description.map((item, idx) => (
                      <li key={idx} className="flex">
                        <span className="mr-2">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 border-b-2 border-gray-300 pb-1 mb-4">
              EDUCATION
            </h2>
            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id} className="relative pl-6 border-l-2 border-gray-200">
                  <div className="absolute w-3 h-3 bg-gray-800 rounded-full -left-1.5 mt-1"></div>
                  <div className="flex justify-between">
                    <h3 className="font-bold">{edu.degree} in {edu.field}</h3>
                    <div className="text-sm text-gray-600">
                      {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                    </div>
                  </div>
                  <div className="text-sm text-gray-700 font-medium">
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

          {/* Projects */}
          {projects && projects.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-bold text-gray-900 border-b-2 border-gray-300 pb-1 mb-4">
                PROJECTS
              </h2>
              <div className="space-y-4">
                {projects.map((project) => (
                  <div key={project.id}>
                    <h3 className="font-bold">{project.name}</h3>
                    <p className="text-sm text-gray-700 mb-2">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, idx) => (
                        <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
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

export default CreativeTemplate;
