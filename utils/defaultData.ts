import { AppState } from '@/types/resume';
import { generateId } from '@/utils/helpers';

export const defaultResumeData: AppState = {
  selectedTemplate: 'classic',
  style: {
    accentColor: '#0ea5e9',
    fontFamily: 'Inter',
    fontSize: 'medium',
    spacing: 'normal',
  },
  resumeData: {
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      website: '',
      summary: '',
      title: '',
      image: '',
    },
    workExperience: [],
    education: [],
    skills: [],
    certifications: [],
    community: [],
    leadership: [],
    projects: [],
  },
};

export const sampleResumeData: AppState = {
  selectedTemplate: 'classic',
  style: {
    accentColor: '#0ea5e9',
    fontFamily: 'Inter',
    fontSize: 'medium',
    spacing: 'normal',
  },
  resumeData: {
    personalInfo: {
      fullName: 'John Doe',
      email: 'john.doe@email.com',
      phone: '+1 (555) 123-4567',
      location: 'San Francisco, CA',
      linkedin: 'linkedin.com/in/johndoe',
      website: 'johndoe.dev',
      summary: 'Experienced full-stack developer with 5+ years of expertise in building scalable web applications. Passionate about creating elegant solutions to complex problems and mentoring junior developers.',
    },
    workExperience: [
      {
        id: generateId(),
        company: 'Tech Innovations Inc.',
        position: 'Senior Full Stack Developer',
        location: 'San Francisco, CA',
        startDate: '2021-03',
        endDate: '',
        current: true,
        description: [
          'Led development of microservices architecture serving 1M+ daily users',
          'Reduced page load time by 40% through optimization techniques',
          'Mentored team of 4 junior developers in React and Node.js best practices',
        ],
      },
      {
        id: generateId(),
        company: 'StartupXYZ',
        position: 'Full Stack Developer',
        location: 'Remote',
        startDate: '2019-06',
        endDate: '2021-02',
        current: false,
        description: [
          'Built and maintained RESTful APIs using Node.js and Express',
          'Implemented responsive UI components with React and TypeScript',
          'Collaborated with design team to improve user experience',
        ],
      },
    ],
    education: [
      {
        id: generateId(),
        institution: 'University of California',
        degree: 'Bachelor of Science',
        field: 'Computer Science',
        location: 'Berkeley, CA',
        startDate: '2015-09',
        endDate: '2019-05',
        current: false,
        gpa: '3.8',
      },
    ],
    skills: [
      { id: generateId(), name: 'JavaScript', category: 'Languages' },
      { id: generateId(), name: 'TypeScript', category: 'Languages' },
      { id: generateId(), name: 'Python', category: 'Languages' },
      { id: generateId(), name: 'React', category: 'Frontend' },
      { id: generateId(), name: 'Next.js', category: 'Frontend' },
      { id: generateId(), name: 'Node.js', category: 'Backend' },
      { id: generateId(), name: 'PostgreSQL', category: 'Database' },
      { id: generateId(), name: 'AWS', category: 'Cloud' },
      { id: generateId(), name: 'Docker', category: 'DevOps' },
      { id: generateId(), name: 'Git', category: 'Tools' },
    ],
    certifications: [
      {
        id: generateId(),
        name: 'AWS Certified Solutions Architect',
        issuer: 'Amazon Web Services',
        date: '2023-06',
      },
    ],
    community: [
      {
        id: generateId(),
        organization: 'Tech Community SF',
        role: 'Event Organizer',
        location: 'San Francisco, CA',
        description: 'Organized monthly meetups bringing together 100+ local developers to share knowledge and network.',
        startDate: '2022-01',
        endDate: '',
        current: true,
      },
    ],
    leadership: [
      {
        id: generateId(),
        title: 'Team Lead',
        organization: 'Tech Innovations Inc.',
        description: 'Led a team of 4 engineers, responsible for project planning, code reviews, and mentoring junior developers.',
        startDate: '2022-06',
        endDate: '',
        current: true,
      },
    ],
    projects: [
      {
        id: generateId(),
        name: 'E-Commerce Platform',
        description: 'Built a full-stack e-commerce platform with payment integration and inventory management',
        technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
        link: 'github.com/johndoe/ecommerce',
      },
    ],
  },
};
