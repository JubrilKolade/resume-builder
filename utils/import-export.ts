import { ResumeData, PersonalInfo, WorkExperience, Education, Skill } from '@/types/resume';
import { CoverLetterData } from '@/types/coverLetter';
import { generateId } from '@/utils/helpers';

export interface ImportResult {
  success: boolean;
  data?: Partial<ResumeData>;
  error?: string;
  warnings?: string[];
}

export interface ExportOptions {
  format?: 'json' | 'csv' | 'xml';
  includeMetadata?: boolean;
  prettyPrint?: boolean;
}

// Resume Import Functions
export const importFromJSON = (file: File): Promise<ImportResult> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const data = JSON.parse(content);
        
        // Validate the imported data structure
        const validation = validateResumeData(data);
        
        if (validation.isValid) {
          resolve({
            success: true,
            data: validation.data,
            warnings: validation.warnings,
          });
        } else {
          resolve({
            success: false,
            error: validation.error,
          });
        }
      } catch (error) {
        resolve({
          success: false,
          error: 'Invalid JSON file format',
        });
      }
    };
    
    reader.onerror = () => {
      resolve({
        success: false,
        error: 'Failed to read file',
      });
    };
    
    reader.readAsText(file);
  });
};

export const importFromCSV = (file: File): Promise<ImportResult> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const lines = content.split('\n');
        const headers = lines[0].split(',').map(h => h.trim());
        
        const data: Partial<ResumeData> = {
          personalInfo: {
            fullName: '',
            email: '',
            phone: '',
            location: '',
          },
          workExperience: [],
          education: [],
          skills: [],
        };
        
        // Simple CSV parsing - in production, you'd want a more robust parser
        for (let i = 1; i < lines.length; i++) {
          const values = lines[i].split(',').map(v => v.trim());
          const row: any = {};
          
          headers.forEach((header, index) => {
            row[header] = values[index] || '';
          });
          
          // Map CSV rows to resume data based on headers
          if (row.type === 'personal') {
            data.personalInfo = {
              fullName: row.fullName || '',
              email: row.email || '',
              phone: row.phone || '',
              location: row.location || '',
              linkedin: row.linkedin,
              website: row.website,
              summary: row.summary,
              title: row.title,
            };
          } else if (row.type === 'work') {
            data.workExperience?.push({
              id: generateId(),
              company: row.company || '',
              position: row.position || '',
              location: row.location || '',
              startDate: row.startDate || '',
              endDate: row.endDate || '',
              current: row.current === 'true',
              description: row.description ? row.description.split(';') : [],
            });
          } else if (row.type === 'education') {
            data.education?.push({
              id: generateId(),
              institution: row.institution || '',
              degree: row.degree || '',
              field: row.field || '',
              location: row.location || '',
              startDate: row.startDate || '',
              endDate: row.endDate || '',
              current: row.current === 'true',
              gpa: row.gpa,
            });
          } else if (row.type === 'skill') {
            const levelNum = row.level ? parseInt(row.level, 10) : NaN;
            data.skills?.push({
              id: generateId(),
              name: row.name || '',
              category: row.category,
              level: Number.isInteger(levelNum) ? levelNum : undefined,
            });
          }
        }
        
        resolve({
          success: true,
          data,
          warnings: ['CSV import may require manual review of data formatting'],
        });
      } catch (error) {
        resolve({
          success: false,
          error: 'Failed to parse CSV file',
        });
      }
    };
    
    reader.readAsText(file);
  });
};

export const importLinkedInProfile = (profileData: any): ImportResult => {
  try {
    const data: Partial<ResumeData> = {
      personalInfo: {
        fullName: `${profileData.firstName || ''} ${profileData.lastName || ''}`.trim(),
        email: profileData.email || '',
        phone: profileData.phone || '',
        location: profileData.location || '',
        linkedin: profileData.linkedinUrl || '',
        summary: profileData.summary || '',
        title: profileData.headline || '',
      },
      workExperience: profileData.experience?.map((exp: any, index: number) => ({
        id: (Date.now() + index).toString(),
        company: exp.company || '',
        position: exp.title || '',
        location: exp.location || '',
        startDate: exp.startDate || '',
        endDate: exp.endDate || '',
        current: exp.current || false,
        description: exp.description ? [exp.description] : [],
      })) || [],
      education: profileData.education?.map((edu: any, index: number) => ({
        id: (Date.now() + index).toString(),
        institution: edu.school || '',
        degree: edu.degree || '',
        field: edu.fieldOfStudy || '',
        location: edu.location || '',
        startDate: edu.startDate || '',
        endDate: edu.endDate || '',
        current: edu.current || false,
        gpa: edu.gpa,
      })) || [],
      skills: profileData.skills?.map((skill: any, index: number) => ({
        id: (Date.now() + index).toString(),
        name: skill.name || '',
        category: skill.category,
        level: skill.level,
      })) || [],
    };
    
    return {
      success: true,
      data,
      warnings: ['Please review imported data for accuracy and completeness'],
    };
  } catch (error) {
    return {
      success: false,
      error: 'Failed to import LinkedIn profile',
    };
  }
};

// Resume Export Functions
export const exportToJSON = (data: ResumeData, options: ExportOptions = {}): string => {
  const exportData = options.includeMetadata ? {
    data,
    metadata: {
      exportedAt: new Date().toISOString(),
      version: '1.0',
      format: 'rapidapply-resume',
    },
  } : data;
  
  return JSON.stringify(exportData, null, options.prettyPrint ? 2 : 0);
};

export const exportToCSV = (data: ResumeData): string => {
  const rows: string[] = [];
  
  // Headers
  rows.push('type,fullName,email,phone,location,linkedin,website,summary,title,company,position,startDate,endDate,current,description,institution,degree,field,gpa,skillName,category,level');
  
  // Personal info
  rows.push([
    'personal',
    data.personalInfo.fullName || '',
    data.personalInfo.email || '',
    data.personalInfo.phone || '',
    data.personalInfo.location || '',
    data.personalInfo.linkedin || '',
    data.personalInfo.website || '',
    data.personalInfo.summary || '',
    data.personalInfo.title || '',
    '', '', '', '', '', '', '', '', '', '', '', '', ''
  ].join(','));
  
  // Work experience
  data.workExperience?.forEach(work => {
    rows.push([
      'work',
      '', '', '', '', '', '', '', '',
      work.company,
      work.position,
      work.startDate,
      work.endDate,
      work.current.toString(),
      work.description?.join(';') || '',
      '', '', '', '', '', '', ''
    ].join(','));
  });
  
  // Education
  data.education?.forEach(edu => {
    rows.push([
      'education',
      '', '', '', '', '', '', '', '',
      '', '', '', '', '', '',
      edu.institution,
      edu.degree,
      edu.field,
      edu.gpa || '',
      '', '', ''
    ].join(','));
  });
  
  // Skills
  data.skills?.forEach(skill => {
    rows.push([
      'skill',
      '', '', '', '', '', '', '', '',
      '', '', '', '', '', '', '', '', '', '',
      skill.name,
      skill.category || '',
      skill.level?.toString() || ''
    ].join(','));
  });
  
  return rows.join('\n');
};

export const exportToXML = (data: ResumeData): string => {
  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<resume>',
    '  <personalInfo>',
    `    <fullName>${escapeXml(data.personalInfo.fullName || '')}</fullName>`,
    `    <email>${escapeXml(data.personalInfo.email || '')}</email>`,
    `    <phone>${escapeXml(data.personalInfo.phone || '')}</phone>`,
    `    <location>${escapeXml(data.personalInfo.location || '')}</location>`,
    `    <linkedin>${escapeXml(data.personalInfo.linkedin || '')}</linkedin>`,
    `    <website>${escapeXml(data.personalInfo.website || '')}</website>`,
    `    <summary>${escapeXml(data.personalInfo.summary || '')}</summary>`,
    `    <title>${escapeXml(data.personalInfo.title || '')}</title>`,
    '  </personalInfo>',
    '  <workExperience>',
  ];
  
  data.workExperience?.forEach(work => {
    xml.push('    <experience>');
    xml.push(`      <company>${escapeXml(work.company)}</company>`);
    xml.push(`      <position>${escapeXml(work.position)}</position>`);
    xml.push(`      <location>${escapeXml(work.location)}</location>`);
    xml.push(`      <startDate>${escapeXml(work.startDate)}</startDate>`);
    xml.push(`      <endDate>${escapeXml(work.endDate)}</endDate>`);
    xml.push(`      <current>${work.current}</current>`);
    xml.push(`      <description>${escapeXml(work.description?.join(';') || '')}</description>`);
    xml.push('    </experience>');
  });
  
  xml.push('  </workExperience>');
  xml.push('  <education>');
  
  data.education?.forEach(edu => {
    xml.push('    <education>');
    xml.push(`      <institution>${escapeXml(edu.institution)}</institution>`);
    xml.push(`      <degree>${escapeXml(edu.degree)}</degree>`);
    xml.push(`      <field>${escapeXml(edu.field)}</field>`);
    xml.push(`      <location>${escapeXml(edu.location)}</location>`);
    xml.push(`      <startDate>${escapeXml(edu.startDate)}</startDate>`);
    xml.push(`      <endDate>${escapeXml(edu.endDate)}</endDate>`);
    xml.push(`      <current>${edu.current}</current>`);
    xml.push(`      <gpa>${escapeXml(edu.gpa || '')}</gpa>`);
    xml.push('    </education>');
  });
  
  xml.push('  </education>');
  xml.push('  <skills>');
  
  data.skills?.forEach(skill => {
    xml.push('    <skill>');
    xml.push(`      <name>${escapeXml(skill.name)}</name>`);
    xml.push(`      <category>${escapeXml(skill.category || '')}</category>`);
    xml.push(`      <level>${skill.level || ''}</level>`);
    xml.push('    </skill>');
  });
  
  xml.push('  </skills>');
  xml.push('</resume>');
  
  return xml.join('\n');
};

// Cover Letter Export Functions
export const exportCoverLetterToJSON = (data: CoverLetterData): string => {
  return JSON.stringify({
    data,
    metadata: {
      exportedAt: new Date().toISOString(),
      version: '1.0',
      format: 'rapidapply-cover-letter',
    },
  }, null, 2);
};

// Unwrap exported format { data, metadata } if present
function unwrapImported(data: unknown): unknown {
  if (data && typeof data === 'object' && 'data' in data && typeof (data as { data: unknown }).data === 'object') {
    return (data as { data: unknown }).data;
  }
  return data;
}

// Ensure array items have id; normalize shapes for work/education/skills
function ensureId<T extends { id?: string }>(item: T, fallback: () => string): T & { id: string } {
  const id = typeof item.id === 'string' && item.id.length > 0 ? item.id : fallback();
  return { ...item, id };
}

// Utility Functions
const validateResumeData = (raw: unknown): { isValid: boolean; data?: Partial<ResumeData>; error?: string; warnings?: string[] } => {
  const warnings: string[] = [];
  const data = unwrapImported(raw);

  if (!data || typeof data !== 'object') {
    return { isValid: false, error: 'Invalid data format' };
  }

  const obj = data as Record<string, unknown>;
  const resumeData: Partial<ResumeData> = {};

  // Require personal info object (can have empty fields)
  if (obj.personalInfo && typeof obj.personalInfo === 'object') {
    const pi = obj.personalInfo as Record<string, unknown>;
    resumeData.personalInfo = {
      fullName: typeof pi.fullName === 'string' ? pi.fullName : '',
      email: typeof pi.email === 'string' ? pi.email : '',
      phone: typeof pi.phone === 'string' ? pi.phone : '',
      location: typeof pi.location === 'string' ? pi.location : '',
      linkedin: typeof pi.linkedin === 'string' ? pi.linkedin : undefined,
      website: typeof pi.website === 'string' ? pi.website : undefined,
      summary: typeof pi.summary === 'string' ? pi.summary : undefined,
      title: typeof pi.title === 'string' ? pi.title : undefined,
      career: typeof pi.career === 'string' ? pi.career : undefined,
      image: typeof pi.image === 'string' ? pi.image : undefined,
    };
  } else {
    return { isValid: false, error: 'Personal information is required', warnings };
  }

  // Normalize work experience array (ensure each item has id)
  if (Array.isArray(obj.workExperience)) {
    resumeData.workExperience = obj.workExperience.map((w: unknown) => {
      const item = typeof w === 'object' && w !== null ? (w as Record<string, unknown>) : {};
      return ensureId(
        {
          company: typeof item.company === 'string' ? item.company : '',
          position: typeof item.position === 'string' ? item.position : '',
          location: typeof item.location === 'string' ? item.location : '',
          startDate: typeof item.startDate === 'string' ? item.startDate : '',
          endDate: typeof item.endDate === 'string' ? item.endDate : '',
          current: Boolean(item.current),
          description: Array.isArray(item.description) ? item.description.filter((d): d is string => typeof d === 'string') : [],
          ...item,
        } as WorkExperience,
        () => generateId()
      ) as WorkExperience;
    });
  } else {
    resumeData.workExperience = [];
    warnings.push('Work experience is not a valid array');
  }

  // Normalize education array
  if (Array.isArray(obj.education)) {
    resumeData.education = obj.education.map((e: unknown) => {
      const item = typeof e === 'object' && e !== null ? (e as Record<string, unknown>) : {};
      return ensureId(
        {
          institution: typeof item.institution === 'string' ? item.institution : '',
          degree: typeof item.degree === 'string' ? item.degree : '',
          field: typeof item.field === 'string' ? item.field : '',
          location: typeof item.location === 'string' ? item.location : '',
          startDate: typeof item.startDate === 'string' ? item.startDate : '',
          endDate: typeof item.endDate === 'string' ? item.endDate : '',
          current: Boolean(item.current),
          gpa: typeof item.gpa === 'string' ? item.gpa : undefined,
          ...item,
        } as Education,
        () => generateId()
      ) as Education;
    });
  } else {
    resumeData.education = [];
    warnings.push('Education is not a valid array');
  }

  // Normalize skills array
  if (Array.isArray(obj.skills)) {
    resumeData.skills = obj.skills.map((s: unknown) => {
      const item = typeof s === 'object' && s !== null ? (s as Record<string, unknown>) : {};
      return ensureId(
        {
          name: typeof item.name === 'string' ? item.name : '',
          category: typeof item.category === 'string' ? item.category : undefined,
          level: typeof item.level === 'number' && Number.isInteger(item.level) ? item.level : undefined,
          ...item,
        } as Skill,
        () => generateId()
      ) as Skill;
    });
  } else {
    resumeData.skills = [];
    warnings.push('Skills is not a valid array');
  }

  return {
    isValid: true,
    data: resumeData,
    warnings,
  };
};

const escapeXml = (text: string): string => {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
};

// File download utility
export const downloadFile = (content: string, filename: string, mimeType: string): void => {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
