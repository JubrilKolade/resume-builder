import { CoverLetterData, CoverLetterTemplate, CoverLetterStyle } from '@/types/coverLetter';
import { PersonalInfo } from '@/types/resume';

export interface CoverLetterTemplateData {
  id: CoverLetterTemplate;
  name: string;
  description: string;
  preview: string;
  category: 'professional' | 'creative' | 'modern' | 'academic';
}

export const coverLetterTemplates: CoverLetterTemplateData[] = [
  {
    id: 'classic',
    name: 'Classic Professional',
    description: 'Traditional business letter format perfect for corporate positions',
    preview: '/templates/classic-cover-letter.png',
    category: 'professional',
  },
  {
    id: 'modern',
    name: 'Modern Clean',
    description: 'Contemporary design with clean lines and modern typography',
    preview: '/templates/modern-cover-letter.png',
    category: 'modern',
  },
  {
    id: 'creative',
    name: 'Creative Design',
    description: 'Eye-catching design for creative industries and startups',
    preview: '/templates/creative-cover-letter.png',
    category: 'creative',
  },
  {
    id: 'professional',
    name: 'Executive Professional',
    description: 'Sophisticated format for senior-level positions',
    preview: '/templates/professional-cover-letter.png',
    category: 'professional',
  },
];

export const generateCoverLetterContent = (
  personalInfo: PersonalInfo,
  recipientInfo: any,
  jobDescription: string = '',
  companyInfo: any = {}
): Partial<CoverLetterData> => {
  const greeting = generateGreeting(recipientInfo.name);
  const introduction = generateIntroduction(personalInfo, recipientInfo.company, jobDescription);
  const bodyParagraphs = generateBodyParagraphs(personalInfo, jobDescription, companyInfo);
  const closing = generateClosing();
  const signature = `${personalInfo.firstName || ''} ${personalInfo.lastName || ''}`.trim() || 'Your Name';

  return {
    letterContent: {
      greeting,
      introduction,
      bodyParagraphs,
      closing,
      signature,
    },
  };
};

export const generateCoverLetterFromResume = (
  resumeData: any,
  targetJob: string = '',
  targetCompany: string = ''
): Partial<CoverLetterData> => {
  const personalInfo = resumeData.personalInfo || {};
  const workExperience = resumeData.workExperience || [];
  const skills = resumeData.skills || [];
  
  // Extract relevant experience
  const relevantExperience = workExperience.slice(0, 2).map(exp => exp.description || []).flat();
  
  // Extract key skills
  const keySkills = skills.slice(0, 5).map(skill => skill.name).join(', ');
  
  const greeting = 'Dear Hiring Manager,';
  
  const introduction = `I am writing to express my strong interest in the ${targetJob} position at ${targetCompany}. With my background in ${personalInfo.title || 'this field'} and my passion for excellence, I believe I would be a valuable addition to your team.`;
  
  const bodyParagraphs = [
    `Throughout my career, I have developed expertise in ${keySkills}. My experience has prepared me to excel in a role like this one, where I can contribute to ${targetCompany}'s success while continuing to grow professionally.`,
    
    `In my previous roles, I have demonstrated strong ${skills.slice(0, 3).map(s => s.name).join(' and ')} skills. I am particularly drawn to ${targetCompany} because of your reputation for innovation and excellence in the industry.`,
    
    `I would welcome the opportunity to discuss how my background, skills, and enthusiasm would make me a strong candidate for this position. Thank you for considering my application.`,
  ];
  
  const closing = 'Sincerely,';
  const signature = `${personalInfo.firstName || ''} ${personalInfo.lastName || ''}`.trim() || 'Your Name';

  return {
    letterContent: {
      greeting,
      introduction,
      bodyParagraphs,
      closing,
      signature,
    },
  };
};

export const validateCoverLetterData = (data: CoverLetterData): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  // Validate personal info
  if (!data.personalInfo.fullName || data.personalInfo.fullName.trim() === '') {
    errors.push('Full name is required');
  }
  
  if (!data.personalInfo.email || data.personalInfo.email.trim() === '') {
    errors.push('Email is required');
  } else if (!isValidEmail(data.personalInfo.email)) {
    errors.push('Invalid email format');
  }

  // Validate recipient info
  if (!data.recipientInfo.name || data.recipientInfo.name.trim() === '') {
    errors.push('Recipient name is required');
  }
  
  if (!data.recipientInfo.company || data.recipientInfo.company.trim() === '') {
    errors.push('Company name is required');
  }

  // Validate letter content
  if (!data.letterContent.greeting || data.letterContent.greeting.trim() === '') {
    errors.push('Greeting is required');
  }
  
  if (!data.letterContent.introduction || data.letterContent.introduction.trim() === '') {
    errors.push('Introduction is required');
  }
  
  if (!data.letterContent.bodyParagraphs || data.letterContent.bodyParagraphs.length === 0) {
    errors.push('At least one body paragraph is required');
  } else {
    data.letterContent.bodyParagraphs.forEach((paragraph, index) => {
      if (!paragraph || paragraph.trim() === '') {
        errors.push(`Body paragraph ${index + 1} cannot be empty`);
      }
    });
  }
  
  if (!data.letterContent.closing || data.letterContent.closing.trim() === '') {
    errors.push('Closing is required');
  }
  
  if (!data.letterContent.signature || data.letterContent.signature.trim() === '') {
    errors.push('Signature is required');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const customizeCoverLetterForJob = (
  baseLetter: CoverLetterData,
  jobDescription: string,
  companyInfo: any,
  keywords: string[] = []
): CoverLetterData => {
  // Extract keywords from job description if not provided
  if (keywords.length === 0) {
    keywords = extractKeywords(jobDescription);
  }

  // Customize introduction
  let introduction = baseLetter.letterContent.introduction;
  keywords.forEach(keyword => {
    if (introduction.toLowerCase().includes(keyword.toLowerCase())) {
      introduction = introduction.replace(
        new RegExp(`\\b${keyword}\\b`, 'gi'),
        `<strong>${keyword}</strong>`
      );
    }
  });

  // Customize body paragraphs
  const bodyParagraphs = baseLetter.letterContent.bodyParagraphs.map(paragraph => {
    let customizedParagraph = paragraph;
    keywords.forEach(keyword => {
      if (customizedParagraph.toLowerCase().includes(keyword.toLowerCase())) {
        customizedParagraph = customizedParagraph.replace(
          new RegExp(`\\b${keyword}\\b`, 'gi'),
          `<strong>${keyword}</strong>`
        );
      }
    });
    return customizedParagraph;
  });

  return {
    ...baseLetter,
    letterContent: {
      ...baseLetter.letterContent,
      introduction,
      bodyParagraphs,
    },
  };
};

export const exportCoverLetterAsText = (data: CoverLetterData): string => {
  const { personalInfo, recipientInfo, letterContent } = data;
  
  let text = '';
  
  // Sender info
  text += `${personalInfo.fullName}\n`;
  if (personalInfo.email) text += `${personalInfo.email}\n`;
  if (personalInfo.phone) text += `${personalInfo.phone}\n`;
  if (personalInfo.location) text += `${personalInfo.location}\n`;
  if (personalInfo.linkedin) text += `${personalInfo.linkedin}\n`;
  
  text += '\n';
  
  // Date
  text += new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  
  text += '\n\n';
  
  // Recipient info
  text += `${recipientInfo.name}\n`;
  if (recipientInfo.title) text += `${recipientInfo.title}\n`;
  text += `${recipientInfo.company}\n`;
  if (recipientInfo.address) text += `${recipientInfo.address}\n`;
  if (recipientInfo.city) text += `${recipientInfo.city}, ${recipientInfo.state} ${recipientInfo.zipCode}\n`;
  
  text += '\n';
  
  // Letter content
  text += `${letterContent.greeting}\n\n`;
  text += `${letterContent.introduction}\n\n`;
  
  letterContent.bodyParagraphs.forEach(paragraph => {
    text += `${paragraph}\n\n`;
  });
  
  text += `${letterContent.closing},\n\n`;
  text += `${letterContent.signature}\n`;
  
  return text;
};

export const exportCoverLetterAsHTML = (data: CoverLetterData, style: CoverLetterStyle): string => {
  const { personalInfo, recipientInfo, letterContent } = data;
  
  const css = `
    <style>
      body {
        font-family: ${style.fontFamily};
        font-size: ${style.fontSize === 'small' ? '14px' : style.fontSize === 'large' ? '18px' : '16px'};
        line-height: 1.6;
        color: #333;
        max-width: 800px;
        margin: 0 auto;
        padding: 40px;
        ${style.spacing === 'compact' ? 'line-height: 1.4;' : style.spacing === 'relaxed' ? 'line-height: 1.8;' : ''}
      }
      
      .header {
        text-align: ${style.headerStyle === 'centered' ? 'center' : style.headerStyle === 'right-aligned' ? 'right' : 'left'};
        margin-bottom: 30px;
      }
      
      .sender-info {
        margin-bottom: 20px;
      }
      
      .date {
        margin-bottom: 20px;
        font-style: italic;
      }
      
      .recipient-info {
        margin-bottom: 30px;
      }
      
      .greeting {
        margin-bottom: 20px;
      }
      
      .body-paragraph {
        margin-bottom: 20px;
        text-align: justify;
      }
      
      .closing {
        margin-top: 30px;
      }
      
      .signature {
        margin-top: 20px;
      }
      
      strong {
        color: ${style.accentColor};
      }
    </style>
  `;
  
  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Cover Letter - ${personalInfo.fullName}</title>
      ${css}
    </head>
    <body>
      <div class="header">
        <div class="sender-info">
          <strong>${personalInfo.fullName}</strong><br>
          ${personalInfo.email ? `${personalInfo.email}<br>` : ''}
          ${personalInfo.phone ? `${personalInfo.phone}<br>` : ''}
          ${personalInfo.location ? `${personalInfo.location}<br>` : ''}
          ${personalInfo.linkedin ? `${personalInfo.linkedin}<br>` : ''}
        </div>
        
        <div class="date">
          ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </div>
      
      <div class="recipient-info">
        ${recipientInfo.name}<br>
        ${recipientInfo.title ? `${recipientInfo.title}<br>` : ''}
        ${recipientInfo.company}<br>
        ${recipientInfo.address ? `${recipientInfo.address}<br>` : ''}
        ${recipientInfo.city ? `${recipientInfo.city}, ${recipientInfo.state} ${recipientInfo.zipCode}<br>` : ''}
      </div>
      
      <div class="greeting">
        ${letterContent.greeting}
      </div>
      
      <div class="introduction">
        ${letterContent.introduction}
      </div>
      
      ${letterContent.bodyParagraphs.map((paragraph, index) => `
        <div class="body-paragraph">
          ${paragraph}
        </div>
      `).join('')}
      
      <div class="closing">
        ${letterContent.closing},
      </div>
      
      <div class="signature">
        ${letterContent.signature}
      </div>
    </body>
    </html>
  `;
  
  return html;
};

// Helper functions
const generateGreeting = (recipientName: string): string => {
  if (recipientName && recipientName.trim() !== '') {
    return `Dear ${recipientName},`;
  }
  return 'Dear Hiring Manager,';
};

const generateIntroduction = (personalInfo: PersonalInfo, company: string, jobDescription: string): string => {
  const career = personalInfo.career || personalInfo.title || 'professional';
  return `I am writing to express my strong interest in this opportunity at ${company}. As a ${career} with a proven track record of success, I believe my skills and experience align perfectly with your requirements.`;
};

const generateBodyParagraphs = (personalInfo: PersonalInfo, jobDescription: string, companyInfo: any): string[] => {
  return [
    'Throughout my career, I have developed strong communication, problem-solving, and leadership skills. I am particularly drawn to your organization because of its reputation for excellence and innovation in the industry.',
    
    'My experience has prepared me to contribute immediately to your team while continuing to grow professionally. I am excited about the opportunity to bring my unique perspective and skills to this role.',
    
    'I would welcome the chance to discuss how my background, skills, and enthusiasm would make me a valuable addition to your organization. Thank you for considering my application.',
  ];
};

const generateClosing = (): string => {
  return 'Sincerely';
};

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const extractKeywords = (text: string): string[] => {
  // Simple keyword extraction - in a real app, you might use NLP libraries
  const commonWords = ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'is', 'are', 'was', 'were', 'be', 'been', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might', 'can', 'must'];
  
  const words = text.toLowerCase().match(/\b\w+\b/g) || [];
  const wordFreq: { [key: string]: number } = {};
  
  words.forEach(word => {
    if (!commonWords.includes(word) && word.length > 3) {
      wordFreq[word] = (wordFreq[word] || 0) + 1;
    }
  });
  
  return Object.entries(wordFreq)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([word]) => word);
};
