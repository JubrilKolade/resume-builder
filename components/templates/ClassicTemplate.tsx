import { ResumeData, ResumeStyle } from '@/types/resume';
import { formatDate } from '@/utils/helpers';

interface ClassicTemplateProps {
  data: ResumeData;
  style: ResumeStyle;
}

export default function ClassicTemplate({ data, style }: ClassicTemplateProps) {
  const { personalInfo, workExperience, education, skills } = data;
  
  const spacingClass =
    style.spacing === 'compact'
      ? 'space-y-2'
      : style.spacing === 'relaxed'
      ? 'space-y-5'
      : 'space-y-3';

  const sectionSpacing =
    style.spacing === 'compact' ? 'mb-5' : style.spacing === 'relaxed' ? 'mb-8' : 'mb-6';

  return (
    <div className="max-w-[850px] mx-auto p-8 md:p-12 bg-white">
      {/* Header */}
      <header className={`${sectionSpacing} text-center border-b-2 border-gray-800 pb-4`}>
        <h1 className="text-3xl font-bold mb-2 text-gray-900">
          {personalInfo.fullName || 'YOUR NAME'}
        </h1>
        
        <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-sm text-gray-700">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.email && personalInfo.phone && <span>•</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.phone && personalInfo.location && <span>•</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
        </div>

        {(personalInfo.linkedin || personalInfo.website) && (
          <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-sm text-gray-700 mt-1">
            {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
            {personalInfo.linkedin && personalInfo.website && <span>•</span>}
            {personalInfo.website && <span>{personalInfo.website}</span>}
          </div>
        )}
      </header>

      {/* Professional Summary */}
      {personalInfo.summary && (
        <section className={sectionSpacing}>
          <h2 className="text-lg font-bold mb-2 text-gray-900 uppercase tracking-wide">
            Professional Summary
          </h2>
          <p className="text-gray-700 leading-relaxed text-justify">
            {personalInfo.summary}
          </p>
        </section>
      )}

      {/* Work Experience */}
      {workExperience.length > 0 && (
        <section className={sectionSpacing}>
          <h2 className="text-lg font-bold mb-3 text-gray-900 uppercase tracking-wide">
            Professional Experience
          </h2>
          <div className={spacingClass}>
            {workExperience.map((exp) => (
              <div key={exp.id} className="mb-4">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-base font-bold text-gray-900">
                    {exp.position || 'Position'}
                  </h3>
                  <div className="text-sm text-gray-600 whitespace-nowrap ml-4">
                    {exp.startDate && formatDate(exp.startDate)}
                    {' - '}
                    {exp.current ? 'Present' : exp.endDate ? formatDate(exp.endDate) : ''}
                  </div>
                </div>
                <p className="text-gray-800 italic mb-2">
                  {exp.company || 'Company'}
                  {exp.location && ` | ${exp.location}`}
                </p>
                {exp.description.length > 0 && exp.description[0] && (
                  <ul className="list-disc list-outside ml-5 space-y-1">
                    {exp.description.map(
                      (desc, idx) =>
                        desc && (
                          <li key={idx} className="text-gray-700 text-sm">
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
          <h2 className="text-lg font-bold mb-3 text-gray-900 uppercase tracking-wide">
            Education
          </h2>
          <div className={spacingClass}>
            {education.map((edu) => (
              <div key={edu.id} className="mb-3">
                <div className="flex justify-between items-baseline">
                  <div>
                    <h3 className="text-base font-bold text-gray-900">
                      {edu.degree || 'Degree'} {edu.field && `in ${edu.field}`}
                    </h3>
                    <p className="text-gray-800 italic">
                      {edu.institution || 'Institution'}
                      {edu.location && ` | ${edu.location}`}
                    </p>
                    {edu.gpa && (
                      <p className="text-gray-700 text-sm mt-1">GPA: {edu.gpa}</p>
                    )}
                  </div>
                  <div className="text-sm text-gray-600 whitespace-nowrap ml-4">
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
          <h2 className="text-lg font-bold mb-3 text-gray-900 uppercase tracking-wide">
            Skills
          </h2>
          <div className="text-gray-700">
            {skills.map((skill, index) => (
              <span key={skill.id}>
                {skill.name}
                {index < skills.length - 1 && ' • '}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
