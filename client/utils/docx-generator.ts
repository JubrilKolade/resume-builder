import {
    Document,
    Packer,
    Paragraph,
    TextRun,
    HeadingLevel,
    AlignmentType,
    BorderStyle,
    Table,
    TableRow,
    TableCell,
    WidthType
} from 'docx';
import { saveAs } from 'file-saver';
import { ResumeData } from '@/types/resume';

export const generateDocx = async (data: ResumeData): Promise<void> => {
    const { personalInfo, workExperience, education, skills, projects, certifications } = data;

    // Helper to create section headers
    const createSectionHeader = (text: string) => {
        return new Paragraph({
            text: text.toUpperCase(),
            heading: HeadingLevel.HEADING_2,
            border: {
                bottom: {
                    color: "000000",
                    space: 1,
                    style: BorderStyle.SINGLE,
                    size: 6,
                },
            },
            spacing: {
                before: 200,
                after: 100,
            },
        });
    };

    const sections = [];

    // --- Header Section ---
    const headerLines = [
        new Paragraph({
            text: personalInfo.fullName,
            heading: HeadingLevel.HEADING_1,
            alignment: AlignmentType.CENTER,
            spacing: { after: 100 },
        }),
        new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
                new TextRun({ text: personalInfo.email }),
                new TextRun({ text: " | " }),
                new TextRun({ text: personalInfo.phone }),
                ...(personalInfo.website ? [new TextRun({ text: " | " }), new TextRun({ text: personalInfo.website })] : []),
                ...(personalInfo.linkedin ? [new TextRun({ text: " | " }), new TextRun({ text: personalInfo.linkedin })] : []),
                ...(personalInfo.location ? [new TextRun({ text: " | " }), new TextRun({ text: personalInfo.location })] : []),
            ],
            spacing: { after: 200 },
        }),
    ];

    if (personalInfo.title) {
        headerLines.splice(1, 0, new Paragraph({
            text: personalInfo.title,
            alignment: AlignmentType.CENTER, // Keep everything centered
            heading: HeadingLevel.HEADING_3,
            spacing: { after: 50 },
        }));
    }

    sections.push(...headerLines);

    // --- Summary ---
    if (personalInfo.summary) {
        sections.push(createSectionHeader("Professional Summary"));
        sections.push(new Paragraph({
            text: personalInfo.summary,
            spacing: { after: 200 },
        }));
    }

    // --- Experience ---
    if (workExperience && workExperience.length > 0) {
        sections.push(createSectionHeader("Experience"));

        workExperience.forEach(job => {
            // Company & Location line
            sections.push(new Paragraph({
                children: [
                    new TextRun({
                        text: job.company,
                        bold: true,
                        size: 24, // 12pt
                    }),
                    new TextRun({
                        text: `  ${job.location}`,
                        italics: true,
                    }),
                ],
            }));

            // Title & Date line
            sections.push(new Paragraph({
                children: [
                    new TextRun({
                        text: job.position,
                        bold: true,
                        italics: true,
                    }),
                    new TextRun({
                        text: ` \t ${job.startDate} - ${job.current ? 'Present' : job.endDate}`,
                        bold: true,
                    }),
                ],
                tabStops: [
                    {
                        type: "right",
                        position: 9000, // Approximate right alignment
                    }
                ],
                spacing: { after: 50 },
            }));

            // Description bullets
            if (job.description && job.description.length > 0) {
                job.description.forEach(desc => {
                    sections.push(new Paragraph({
                        text: desc,
                        bullet: { level: 0 },
                    }));
                });
            }

            // Spacing between jobs
            sections.push(new Paragraph({ text: "", spacing: { after: 100 } }));
        });
    }

    // --- Education ---
    if (education && education.length > 0) {
        sections.push(createSectionHeader("Education"));

        education.forEach(edu => {
            sections.push(new Paragraph({
                children: [
                    new TextRun({
                        text: edu.institution,
                        bold: true,
                        size: 24,
                    }),
                    new TextRun({
                        text: ` \t ${edu.startDate} - ${edu.current ? 'Present' : edu.endDate}`,
                        bold: true,
                    }),
                ],
                tabStops: [{ type: "right", position: 9000 }],
            }));

            sections.push(new Paragraph({
                children: [
                    new TextRun({
                        text: `${edu.degree} in ${edu.field}`,
                        italics: true,
                    }),
                    ...(edu.gpa ? [new TextRun({ text: `, GPA: ${edu.gpa}` })] : []),
                ],
                spacing: { after: 100 },
            }));
        });
    }

    // --- Skills ---
    if (skills && skills.length > 0) {
        sections.push(createSectionHeader("Skills"));

        // Group by category if possible, currently simple list
        const skillNames = skills.map(s => s.name).join(", ");
        sections.push(new Paragraph({
            text: skillNames,
            spacing: { after: 200 },
        }));
    }

    // --- Projects ---
    if (projects && projects.length > 0) {
        sections.push(createSectionHeader("Projects"));

        projects.forEach(proj => {
            sections.push(new Paragraph({
                children: [
                    new TextRun({
                        text: proj.name,
                        bold: true,
                    }),
                    ...(proj.link ? [new TextRun({ text: ` (${proj.link})` })] : []),
                ],
            }));

            sections.push(new Paragraph({
                text: proj.description,
            }));

            if (proj.technologies && proj.technologies.length > 0) {
                sections.push(new Paragraph({
                    children: [
                        new TextRun({ text: "Technologies: ", bold: true }),
                        new TextRun({ text: proj.technologies.join(", ") }),
                    ],
                    spacing: { after: 100 },
                }));
            }
        });
    }

    // --- Certifications ---
    if (certifications && certifications.length > 0) {
        sections.push(createSectionHeader("Certifications"));
        certifications.forEach(cert => {
            sections.push(new Paragraph({
                children: [
                    new TextRun({ text: cert.name, bold: true }),
                    new TextRun({ text: ` - ${cert.issuer} (${cert.date})` }),
                ],
            }));
        });
    }


    // Build Document
    const doc = new Document({
        sections: [{
            properties: {},
            children: sections,
        }],
    });

    // Export
    const blob = await Packer.toBlob(doc);
    const safeName = personalInfo.fullName
        ? personalInfo.fullName.replace(/[^\w\s-]/g, '').replace(/\s+/g, '_')
        : 'Resume';
    saveAs(blob, `${safeName}_${new Date().toISOString().split('T')[0]}.docx`);
};
