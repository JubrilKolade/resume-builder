import { ResumeData, ResumeStyle } from '@/types/resume';
import { formatDate } from '@/utils/helpers';

interface SidebarTemplateProps {
  data: ResumeData;
  style: ResumeStyle;
}

export default function SidebarTemplate({ data, style }: SidebarTemplateProps) {
  const { personalInfo, workExperience, education, skills, certifications, community, leadership } = data;

  return (
    <div className="max-w-[850px] mx-auto bg-white flex" style={{ minHeight: '1100px' }}>
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-8 flex flex-col">
        {/* Profile Image */}
        {personalInfo.image && (
          <div className="mb-8 flex justify-center">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-600 bg-gray-700 flex items-center justify-center">
              <img
                src={personalInfo.image}
                alt={personalInfo.fullName}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}

        {/* Contact */}
        <div className="mb-8">
          <div className="bg-white text-gray-800 font-bold py-2 px-4 rounded-full text-center mb-4 text-sm">
            CONTACT ME
          </div>
          <div className="space-y-3 text-sm">
            {personalInfo.phone && (
              <div className="flex items-start gap-2">
                <span>📞</span>
                <span>{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.email && (
              <div className="flex items-start gap-2 break-words">
                <span>✉️</span>
                <span className="text-xs">{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.website && (
              <div className="flex items-start gap-2 break-words">
                <span>🌐</span>
                <span className="text-xs">{personalInfo.website}</span>
              </div>
            )}
            {personalInfo.location && (
              <div className="flex items-start gap-2">
                <span>📍</span>
                <span>{personalInfo.location}</span>
              </div>
            )}
          </div>
        </div>

        {/* Education */}
        {education.length > 0 && (
          <div className="mb-8">
            <div className="bg-white text-gray-800 font-bold py-2 px-4 rounded-full text-center mb-4 text-sm">
              EDUCATION
            </div>
            <div className="space-y-3 text-sm">
              {education.map((edu) => (
                <div key={edu.id}>
                  <p className="font-bold">{edu.institution}</p>
                  <p className="text-xs text-gray-300">{edu.degree}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {edu.startDate && formatDate(edu.startDate)}
                    {' - '}
                    {edu.current ? 'Present' : edu.endDate ? formatDate(edu.endDate) : ''}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <div>
            <div className="bg-white text-gray-800 font-bold py-2 px-4 rounded-full text-center mb-4 text-sm">
              SKILLS
            </div>
            <ul className="space-y-2 text-sm">
              {skills.map((skill) => (
                <li key={skill.id} className="flex items-start gap-2">
                  <span>•</span>
                  <span>{skill.name}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">
            {personalInfo.fullName || 'Your Name'}
          </h1>
          {personalInfo.title && (
            <p className="text-lg text-gray-700 mt-1">
              {personalInfo.title}
            </p>
          )}
        </header>

        {/* About Me / Summary */}
        {personalInfo.summary && (
          <section className="mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-3">ABOUT ME</h2>
            <p className="text-gray-700 leading-relaxed">
              {personalInfo.summary}
            </p>
          </section>
        )}

        {/* Work Experience */}
        {workExperience.length > 0 && (
          <section className="mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-4">WORK EXPERIENCE</h2>
            <div className="space-y-5">
              {workExperience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="font-bold text-gray-900">{exp.company || 'Company'}</h3>
                      <p className="text-gray-700">{exp.position || 'Position'}</p>
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

        {/* Certifications */}
        {certifications && certifications.length > 0 && (
          <section className="mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-3">CERTIFICATIONS</h2>
            <ul className="space-y-2">
              {certifications.map((cert) => (
                <li key={cert.id} className="text-gray-700 text-sm">
                  • {cert.name}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Community */}
        {community && community.length > 0 && (
          <section className="mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-3">COMMUNITY</h2>
            <div className="space-y-2">
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
          <section className="mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-3">LEADERSHIP</h2>
            <div className="space-y-2">
              {leadership.map((item) => (
                <div key={item.id} className="text-sm">
                  <p className="font-semibold text-gray-900">{item.title}</p>
                  <p className="text-gray-700">{item.organization}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* References */}
        {/* You can add references here if needed */}
      </div>
    </div>
  );
}
