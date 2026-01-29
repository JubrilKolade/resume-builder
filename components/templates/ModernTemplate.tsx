import { ResumeData, ResumeStyle } from '@/types/resume';
import { formatDate } from '@/utils/helpers';
import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';

interface ModernTemplateProps {
  data: ResumeData;
  style: ResumeStyle;
}

export default function ModernTemplate({ data, style }: ModernTemplateProps) {
  const { personalInfo, workExperience, education, skills } = data;
  
  const spacingClass =
    style.spacing === 'compact'
      ? 'space-y-3'
      : style.spacing === 'relaxed'
      ? 'space-y-6'
      : 'space-y-4';

  const sectionSpacing =
    style.spacing === 'compact' ? 'mb-4' : style.spacing === 'relaxed' ? 'mb-8' : 'mb-6';

  return (
    <div className="max-w-[850px] mx-auto p-8 md:p-12 bg-white">
      {/* Header */}
      <header className={`${sectionSpacing} text-center`}>
        <h1
          className="text-4xl font-bold mb-2"
          style={{ color: style.accentColor }}
        >
          {personalInfo.fullName || 'Your Name'}
        </h1>
        
        {personalInfo.title && (
          <p className="text-lg text-gray-600 mb-4">{personalInfo.title}</p>
        )}

        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm text-gray-600">
          {personalInfo.email && (
            <div className="flex items-center space-x-1">
              <Mail className="w-4 h-4" style={{ color: style.accentColor }} />
              <span>{personalInfo.email}</span>
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center space-x-1">
              <Phone className="w-4 h-4" style={{ color: style.accentColor }} />
              <span>{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo.location && (
            <div className="flex items-center space-x-1">
              <MapPin className="w-4 h-4" style={{ color: style.accentColor }} />
              <span>{personalInfo.location}</span>
            </div>
          )}
          {personalInfo.linkedin && (
            <a
              href={personalInfo.linkedin.startsWith('http') ? personalInfo.linkedin : `https://${personalInfo.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 text-blue-600 hover:underline"
            >
              <Linkedin className="w-4 h-4" style={{ color: style.accentColor }} />
              <span>LinkedIn</span>
            </a>
          )}
          {personalInfo.website && (
            <a
              href={personalInfo.website.startsWith('http') ? personalInfo.website : `https://${personalInfo.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 text-blue-600 hover:underline"
            >
              <Globe className="w-4 h-4" style={{ color: style.accentColor }} />
              <span>Website</span>
            </a>
          )}
        </div>
      </header>

      {/* Work Experience */}
      {workExperience.length > 0 && (
        <section className={sectionSpacing}>
          <h2
            className="text-xl font-bold mb-3 pb-2 border-b-2"
            style={{ borderColor: style.accentColor, color: style.accentColor }}
          >
            WORK EXPERIENCE
          </h2>
          <div className={spacingClass}>
            {workExperience.map((exp) => (
              <div key={exp.id} className="mb-4">
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {exp.position || 'Position'}
                    </h3>
                    <p className="text-gray-700 font-medium">
                      {exp.company || 'Company'} {exp.location && `• ${exp.location}`}
                    </p>
                  </div>
                  <div className="text-sm text-gray-600 text-right whitespace-nowrap ml-4">
                    {exp.startDate && formatDate(exp.startDate)}
                    {' - '}
                    {exp.current ? 'Present' : exp.endDate ? formatDate(exp.endDate) : ''}
                  </div>
                </div>
                {exp.description.length > 0 && exp.description[0] && (
                  <ul className="list-disc list-outside ml-5 mt-2 space-y-1">
                    {exp.description.map(
                      (desc, idx) =>
                        desc && (
                          <li key={idx} className="text-gray-700">
                            {desc}
                          </li>
                        )
                    )}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className={sectionSpacing}>
          <h2
            className="text-xl font-bold mb-3 pb-2 border-b-2"
            style={{ borderColor: style.accentColor, color: style.accentColor }}
          >
            EDUCATION
          </h2>
          <div className={spacingClass}>
            {education.map((edu) => (
              <div key={edu.id} className="mb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {edu.degree || 'Degree'} {edu.field && `in ${edu.field}`}
                    </h3>
                    <p className="text-gray-700 font-medium">
                      {edu.institution || 'Institution'} {edu.location && `• ${edu.location}`}
                    </p>
                    {edu.gpa && (
                      <p className="text-gray-600 text-sm">GPA: {edu.gpa}</p>
                    )}
                  </div>
                  <div className="text-sm text-gray-600 text-right whitespace-nowrap ml-4">
                    {edu.startDate && formatDate(edu.startDate)}
                    {' - '}
                    {edu.current ? 'Present' : edu.endDate ? formatDate(edu.endDate) : ''}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section className={sectionSpacing}>
          <h2
            className="text-xl font-bold mb-3 pb-2 border-b-2"
            style={{ borderColor: style.accentColor, color: style.accentColor }}
          >
            SKILLS
          </h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill.id}
                className="px-3 py-1 rounded-full text-sm font-medium"
                style={{
                  backgroundColor: `${style.accentColor}20`,
                  color: style.accentColor,
                }}
              >
                {skill.name}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
