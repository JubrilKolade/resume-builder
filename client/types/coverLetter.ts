import { PersonalInfo } from './resume';

export interface CoverLetterData {
  id: string;
  personalInfo: PersonalInfo;
  recipientInfo: RecipientInfo;
  letterContent: LetterContent;
  template: CoverLetterTemplate;
  style: CoverLetterStyle;
  createdAt: Date;
  updatedAt: Date;
}

export interface RecipientInfo {
  name: string;
  title: string;
  company: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  email?: string;
  phone?: string;
}

export interface LetterContent {
  greeting: string;
  introduction: string;
  bodyParagraphs: string[];
  closing: string;
  signature: string;
}

export type CoverLetterTemplate = 'classic' | 'modern' | 'creative' | 'professional';

export interface CoverLetterStyle {
  fontFamily: string;
  fontSize: 'small' | 'medium' | 'large';
  accentColor: string;
  spacing: 'compact' | 'normal' | 'relaxed';
  headerStyle: 'centered' | 'left-aligned' | 'right-aligned';
}

export interface CoverLetterPreviewProps {
  data: CoverLetterData;
  onEdit?: () => void;
  onDownload?: () => void;
}

export interface CoverLetterFormProps {
  data: CoverLetterData;
  onChange: (data: Partial<CoverLetterData>) => void;
  onTemplateChange: (template: CoverLetterTemplate) => void;
}
