import { ResumeData, ResumeStyle } from '@/types/resume';
import { formatDate } from '@/utils/helpers';

interface ModernTemplateProps {
  data: ResumeData;
  style: ResumeStyle;
}

export default function ModernTemplate({ data, style }: ModernTemplateProps) {
  const { personalInfo, workExperience, education, skills, certifications, community, leadership } = data;
  const accentColor = style.accentColor || '#22c55e';

  return (
    <div className="max-w-212.5 mx-auto p-8 md:p-12 bg-white">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-2 text-gray-900">
          {personalInfo.fullName || 'Your Name'}
        </h1>
        {personalInfo.career && (
          <p className="text-sm font-semibold text-gray-600 mb-3 tracking-wide uppercase">
            {personalInfo.career}
          </p>
        )}
        {personalInfo.title && (
          <p className="text-lg mb-3" style={{ color: accentColor, letterSpacing: '0.1em' }}>
            {personalInfo.title}
          </p>
        )}
        <div className="h-1 w-16 mb-4" style={{ backgroundColor: accentColor }}></div>
        <div className="flex flex-wrap gap-4 text-sm text-gray-700">
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.email && (
            <span>
              <a href={`mailto:${personalInfo.email}`} className="hover:underline">
                {personalInfo.email}
              </a>
            </span>
          )}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.linkedin && (
            <span>
              <a href={`https://${personalInfo.linkedin}`} target="_blank" rel="noopener noreferrer" className="hover:underline">
                {personalInfo.linkedin}
              </a>
            </span>
          )}
        </div>
      </header>

      {/* Summary */}
      {personalInfo.summary && (
        <section className="mb-6">
          <div className="inline-block px-3 py-1 mb-3 text-white font-bold text-xs" style={{ backgroundColor: accentColor }}>
            SUMMARY
          </div>
          <p className="text-gray-800 leading-relaxed text-sm mt-2">
            {personalInfo.summary}
          </p>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-6">
          <div className="inline-block px-3 py-1 mb-3 text-white font-bold text-xs" style={{ backgroundColor: accentColor }}>
            EDUCATION
          </div>
          <div className="space-y-3 mt-2">
            {education.map((edu) => (
              <div key={edu.id}>
                <p className="font-bold text-gray-900" style={{ color: accentColor }}>
                  {edu.degree || 'Degree'} in {edu.field || 'Field'}
                </p>
                <p className="text-gray-700 text-sm">{edu.institution || 'Institution'}</p>
                <div className="flex justify-between text-sm text-gray-600 mt-1">
                  <span>{edu.location}</span>
                  <span>
                    {edu.startDate && formatDate(edu.startDate)}
                    {' - '}
                    {edu.current ? 'Present' : edu.endDate ? formatDate(edu.endDate) : ''}
                  </span>
                </div>
                {edu.gpa && <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Work Experience */}
      {workExperience.length > 0 && (
        <section className="mb-6">
          <div className="inline-block px-3 py-1 mb-3 text-white font-bold text-xs" style={{ backgroundColor: accentColor }}>
            RELEVANT EXPERIENCE
          </div>
          <div className="space-y-4 mt-2">
            {workExperience.map((exp) => (
              <div key={exp.id}>
                <p className="font-bold" style={{ color: accentColor }}>
                  {exp.company || 'Company'}
                </p>
                <div className="flex justify-between items-start">
                  <p className="font-semibold text-gray-900">{exp.position || 'Position'}</p>
                  <span className="text-sm text-gray-600 whitespace-nowrap ml-4">
                    {exp.startDate && formatDate(exp.startDate)}
                    {' - '}
                    {exp.current ? 'Present' : exp.endDate ? formatDate(exp.endDate) : ''}
                  </span>
                </div>
                {exp.description.length > 0 && (
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    {exp.description.map((desc, idx) => desc && (
                      <li key={idx} className="text-gray-700 text-sm ml-2">
                        {desc}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section className="mb-6">
          <div className="inline-block px-3 py-1 mb-3 text-white font-bold text-xs" style={{ backgroundColor: accentColor }}>
            SKILLS
          </div>
          <ul className="list-disc list-inside space-y-1 mt-2">
            {skills.map((skill) => (
              <li key={skill.id} className="text-gray-700 text-sm ml-2">
                {skill.name}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Certifications */}
      {certifications && certifications.length > 0 && (
        <section className="mb-6">
          <div className="inline-block px-3 py-1 mb-3 text-white font-bold text-xs" style={{ backgroundColor: accentColor }}>
            CERTIFICATIONS
          </div>
          <ul className="list-disc list-inside space-y-1 mt-2">
            {certifications.map((cert) => (
              <li key={cert.id} className="text-gray-700 text-sm ml-2">
                {cert.name}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Community */}
      {community && community.length > 0 && (
        <section className="mb-6">
          <div className="inline-block px-3 py-1 mb-3 text-white font-bold text-xs" style={{ backgroundColor: accentColor }}>
            COMMUNITY
          </div>
          <div className="space-y-2 mt-2">
            {community.map((item) => (
              <div key={item.id} className="text-sm">
                <p className="font-semibold text-gray-900">{item.role}</p>
                <p className="text-gray-700">{item.organization}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Leadership */}
      {leadership && leadership.length > 0 && (
        <section className="mb-6">
          <div className="inline-block px-3 py-1 mb-3 text-white font-bold text-xs" style={{ backgroundColor: accentColor }}>
            LEADERSHIP
          </div>
          <div className="space-y-2 mt-2">
            {leadership.map((item) => (
              <div key={item.id} className="text-sm">
                <p className="font-semibold text-gray-900">{item.title}</p>
                <p className="text-gray-700">{item.organization}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
