# RapidApply Resume Builder

A modern, fast, and intuitive resume builder built with Next.js 16, React 19, and Tailwind CSS 4. Create professional resumes in minutes with real-time preview and multiple export options.

![Resume Builder Preview](public/modern-template.png)

## 🚀 Features

- **Real-time Preview**: See changes instantly as you type.
- **Multiple Templates**: Choose from professionally designed templates:
  - Classic
  - Modern
  - Sidebar
  - Creative
- **Rich Customization**:
  - Change fonts (Inter, Roboto, Open Sans, Lato, Montserrat)
  - Custom accent colors and predefined themes
  - Adjustable font sizes and spacing
- **Comprehensive Sections**:
  - Personal Information
  - Work Experience
  - Education
  - Skills
  - Certifications
  - Community Service
  - Leadership
  - References
- **Export Options**: Download your resume in multiple formats:
  - PDF (High quality print-ready)
  - DOCX (Editable Word document)
  - TXT (Plain text data)
- **Privacy Focused**: All data is stored locally in your browser/session. No server-side storage of personal data.

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Directory)
- **Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **PDF Generation**: [jsPDF](https://github.com/parallax/jsPDF) & [html2canvas](https://html2canvas.hertzen.com/)
- **DOCX Generation**: [docx](https://docx.js.org/)

## 📦 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn or pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/JubrilKolade/resume-builder.git
   cd resume-builder
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📂 Project Structure

```
├── app/                  # Next.js App Router directory
│   ├── download/         # Download page
│   ├── edit/             # Resume editing page
│   ├── preview/          # Resume preview page
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Landing/Template selection page
├── components/           # React components
│   ├── forms/            # Form components for each resume section
│   ├── templates/        # Resume templates (Classic, Modern, etc.)
│   ├── ui/               # Reusable UI components (Button, Card, etc.)
│   ├── ResumeForm.tsx    # Main form orchestrator
│   └── ResumePreview.tsx # Main preview component
├── contexts/             # React Context for state management
│   └── ResumeContext.tsx # Global resume state
├── types/                # TypeScript type definitions
│   └── resume.ts         # Resume data interfaces
└── utils/                # Utility functions
    ├── docx-generator.ts # Word document generation logic
    └── pdf-generator.ts  # PDF generation logic
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
