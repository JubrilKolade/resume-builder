import { ResumeData, ResumeStyle } from '@/types/resume';
import { formatDate } from '@/utils/helpers';

interface ClassicTemplateProps {
  data: ResumeData;
  style: ResumeStyle;
}

export default function ClassicTemplate({ data, style }: ClassicTemplateProps) {
  const { personalInfo, workExperience, education, skills, certifications, community, leadership } = data;
  const accentColor = style.accentColor || '#9d6b2a';

  return (
    <div className="max-w-[850px] mx-auto p-8 md:p-12 bg-white">
      {/* Header */}
      <header className="text-center mb-8 pb-6 border-b-2" style={{ borderColor: accentColor }}>
        <h1 className="text-4xl font-bold mb-2" style={{ color: accentColor }}>
          {personalInfo.fullName || 'Your Name'}
        </h1>
        {personalInfo.title && (
          <p className="text-lg text-gray-700 mb-3">
            {personalInfo.title}
          </p>
        )}
        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
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
          <h2 className="text-sm font-bold mb-3 pb-2 border-b-2" style={{ color: accentColor, borderColor: accentColor }}>
            SUMMARY
          </h2>
          <p className="text-gray-800 leading-relaxed text-sm">
            {personalInfo.summary}
          </p>
        </section>
      )}

      {/* Work Experience */}
      {workExperience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-bold mb-3 pb-2 border-b-2" style={{ color: accentColor, borderColor: accentColor }}>
            WORK EXPERIENCE
          </h2>
          <div className="space-y-4">
            {workExperience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="font-semibold text-gray-900">{exp.position || 'Position'}</h3>
                    <p className="text-gray-700 text-sm">{exp.company || 'Company'} • {exp.location || 'Location'}</p>
                  </div>
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

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-bold mb-3 pb-2 border-b-2" style={{ color: accentColor, borderColor: accentColor }}>
            EDUCATION
          </h2>
          <div className="space-y-3">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-900">{edu.degree || 'Degree'}</h3>
                    <p className="text-gray-700 text-sm">{edu.institution || 'Institution'}</p>
                    {edu.gpa && <p className="text-gray-600 text-sm">GPA: {edu.gpa}</p>}
                  </div>
                  <span className="text-sm text-gray-600 whitespace-nowrap ml-4">
                    {edu.startDate && formatDate(edu.startDate)}
                    {' - '}
                    {edu.current ? 'Present' : edu.endDate ? formatDate(edu.endDate) : ''}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-bold mb-3 pb-2 border-b-2" style={{ color: accentColor, borderColor: accentColor }}>
            ADDITIONAL SKILLS
          </h2>
          <ul className="list-disc list-inside space-y-1">
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
          <h2 className="text-sm font-bold mb-3 pb-2 border-b-2" style={{ color: accentColor, borderColor: accentColor }}>
            CERTIFICATIONS
          </h2>
          <div className="space-y-2">
            {certifications.map((cert) => (
              <div key={cert.id}>
                <p className="font-semibold text-gray-900 text-sm">{cert.name}</p>
                <p className="text-gray-700 text-sm">{cert.issuer}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Community */}
      {community && community.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-bold mb-3 pb-2 border-b-2" style={{ color: accentColor, borderColor: accentColor }}>
            COMMUNITY
          </h2>
          <div className="space-y-3">
            {community.map((item) => (
              <div key={item.id}>
                <p className="font-semibold text-gray-900">{item.role}</p>
                <p className="text-gray-700 text-sm">{item.organization}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Leadership */}
      {leadership && leadership.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-bold mb-3 pb-2 border-b-2" style={{ color: accentColor, borderColor: accentColor }}>
            LEADERSHIP
          </h2>
          <div className="space-y-3">
            {leadership.map((item) => (
              <div key={item.id}>
                <p className="font-semibold text-gray-900">{item.title}</p>
                <p className="text-gray-700 text-sm">{item.organization}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
