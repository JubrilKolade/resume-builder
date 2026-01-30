import { ResumeData, ResumeStyle } from '@/types/resume';
import { formatDate } from '@/utils/helpers';

interface CreativeTemplateProps {
  data: ResumeData;
  style: ResumeStyle;
}

export default function CreativeTemplate({ data, style }: CreativeTemplateProps) {
  const { personalInfo, workExperience, education, skills, certifications, community, leadership } = data;
  const accentColor = style.accentColor || '#d97706';

  return (
    <div className="max-w-[850px] mx-auto bg-white" style={{ minHeight: '1100px' }}>
      {/* Gold Header */}
      <div className="p-8 text-center text-white" style={{ backgroundColor: accentColor }}>
        <h1 className="text-4xl font-bold mb-2">{personalInfo.fullName || 'Your Name'}</h1>
        {personalInfo.career && (
          <p className="text-xs font-semibold tracking-widest uppercase mb-2">{personalInfo.career}</p>
        )}
        {personalInfo.title && (
          <p className="text-lg tracking-widest">{personalInfo.title}</p>
        )}
      </div>

      {/* Two Column Layout */}
      <div className="flex">
        {/* Left Sidebar */}
        <div className="w-72 p-8 bg-gray-50 border-r border-gray-200">
          {/* Profile Image */}
          {personalInfo.image && (
            <div className="mb-8 flex justify-center">
              <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-gray-300 bg-gray-200 flex items-center justify-center">
                <img
                  src={personalInfo.image}
                  alt={personalInfo.fullName}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}

          {/* Summary */}
          {personalInfo.summary && (
            <div className="mb-8">
              <h3 className="text-sm font-bold text-center mb-3" style={{ color: accentColor }}>
                SUMMARY
              </h3>
              <p className="text-xs leading-relaxed text-gray-700">
                {personalInfo.summary}
              </p>
            </div>
          )}

          {/* Contact Details */}
          <div className="mb-8">
            <h3 className="text-sm font-bold mb-4" style={{ color: accentColor }}>
              CONTACT DETAILS
            </h3>
            <div className="space-y-2 text-xs text-gray-700">
              {personalInfo.phone && (
                <div>
                  <span className="font-bold">Cell:</span> {personalInfo.phone}
                </div>
              )}
              {personalInfo.email && (
                <div className="break-words">
                  <span className="font-bold">Email:</span> {personalInfo.email}
                </div>
              )}
              {personalInfo.website && (
                <div className="break-words">
                  <span className="font-bold">Website:</span> {personalInfo.website}
                </div>
              )}
              {personalInfo.location && (
                <div>
                  <span className="font-bold">Address:</span> {personalInfo.location}
                </div>
              )}
            </div>
          </div>

          {/* Skills */}
          {skills.length > 0 && (
            <div className="mb-8">
              <h3 className="text-sm font-bold mb-3" style={{ color: accentColor }}>
                RELEVANT SKILLS
              </h3>
              <div className="space-y-2 text-xs">
                {skills.map((skill) => (
                  <div key={skill.id}>• {skill.name}</div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Main Content */}
        <div className="flex-1 p-8">
          {/* Work Experience */}
          {workExperience.length > 0 && (
            <section className="mb-8">
              <h2 className="text-sm font-bold mb-4 pb-2 border-b-2" style={{ color: accentColor, borderColor: accentColor }}>
                PROFESSIONAL EXPERIENCE
              </h2>
              <div className="space-y-5">
                {workExperience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <h3 className="font-bold text-gray-900">{exp.position || 'Position'}</h3>
                        <p className="text-gray-700 text-sm">{exp.company || 'Company'} • {exp.location}</p>
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
            <section className="mb-8">
              <h2 className="text-sm font-bold mb-4 pb-2 border-b-2" style={{ color: accentColor, borderColor: accentColor }}>
                EDUCATION
              </h2>
              <div className="space-y-3">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <p className="font-bold text-gray-900">{edu.degree || 'Degree'} {edu.field && `in ${edu.field}`}</p>
                    <p className="text-gray-700 text-sm">{edu.institution}</p>
                    <p className="text-gray-700 text-sm">{edu.location}</p>
                    <p className="text-sm text-gray-600">
                      {edu.startDate && formatDate(edu.startDate)}
                      {' - '}
                      {edu.current ? 'Present' : edu.endDate ? formatDate(edu.endDate) : ''}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Certifications */}
          {certifications && certifications.length > 0 && (
            <section className="mb-8">
              <h2 className="text-sm font-bold mb-3 pb-2 border-b-2" style={{ color: accentColor, borderColor: accentColor }}>
                CERTIFICATIONS
              </h2>
              <ul className="space-y-1 text-sm">
                {certifications.map((cert) => (
                  <li key={cert.id}>• {cert.name}</li>
                ))}
              </ul>
            </section>
          )}

          {/* Community */}
          {community && community.length > 0 && (
            <section className="mb-8">
              <h2 className="text-sm font-bold mb-3 pb-2 border-b-2" style={{ color: accentColor, borderColor: accentColor }}>
                COMMUNITY
              </h2>
              <div className="space-y-2 text-sm">
                {community.map((item) => (
                  <div key={item.id}>
                    <p className="font-semibold">{item.role}</p>
                    <p className="text-gray-700">{item.organization}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Leadership */}
          {leadership && leadership.length > 0 && (
            <section className="mb-8">
              <h2 className="text-sm font-bold mb-3 pb-2 border-b-2" style={{ color: accentColor, borderColor: accentColor }}>
                LEADERSHIP
              </h2>
              <div className="space-y-2 text-sm">
                {leadership.map((item) => (
                  <div key={item.id}>
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-gray-700">{item.organization}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
