import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { ResumeData } from '@/types/resume';

/**
 * Generates a PDF from a given HTML element.
 * Uses a "ghost element" strategy to ensure clean A4 sizing and color sanitization.
 */
export const generatePDF = async (originalElement: HTMLElement, data: ResumeData): Promise<void> => {
    if (!originalElement) {
        throw new Error('Element not found');
    }

    let ghostElement: HTMLElement | null = null;
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = 1;
    tempCanvas.height = 1;
    const ctx = tempCanvas.getContext('2d', { willReadFrequently: true });

    try {
        // 1. Clone the element
        ghostElement = originalElement.cloneNode(true) as HTMLElement;

        // 2. Set styles for A4 PDF generation
        // We position it off-screen but largely unmodified to keep layout, 
        // just strictly sized to A4.
        ghostElement.style.position = 'fixed';
        ghostElement.style.left = '-10000px';
        ghostElement.style.top = '0';
        ghostElement.style.zIndex = '-1000';
        ghostElement.style.width = '210mm'; // A4 width
        ghostElement.style.minHeight = '297mm'; // A4 height
        ghostElement.style.height = 'auto'; // Allow growing
        ghostElement.style.transform = 'none'; // No scaling
        ghostElement.style.margin = '0';
        ghostElement.style.overflow = 'visible';

        // 3. Copy crucial computed styles
        const computedStyle = window.getComputedStyle(originalElement);
        ghostElement.style.fontFamily = computedStyle.fontFamily;
        ghostElement.style.color = computedStyle.color;
        ghostElement.style.backgroundColor = computedStyle.backgroundColor;

        // 4. Sanitize Colors (Recursive)
        // Converts lab(), oklch() etc. to rgba() using Canvas API
        const sanitizeColors = (el: HTMLElement) => {
            const style = window.getComputedStyle(el);
            const colorProps = [
                'color', 'backgroundColor', 'borderColor',
                'borderTopColor', 'borderRightColor', 'borderBottomColor', 'borderLeftColor',
                'outlineColor', 'fill', 'stroke', 'textDecorationColor'
            ];

            colorProps.forEach(prop => {
                const value = style.getPropertyValue(prop);
                if (value && (
                    value.includes('lab(') ||
                    value.includes('oklch(') ||
                    value.includes('oklab(') ||
                    value.includes('lch(')
                )) {
                    if (ctx) {
                        ctx.clearRect(0, 0, 1, 1);
                        ctx.fillStyle = value;
                        ctx.fillRect(0, 0, 1, 1);
                        const [r, g, b, a] = ctx.getImageData(0, 0, 1, 1).data;
                        const converted = `rgba(${r}, ${g}, ${b}, ${a / 255})`;
                        (el.style as any)[prop] = converted;
                    }
                }
            });

            Array.from(el.children).forEach(child => sanitizeColors(child as HTMLElement));
        };

        document.body.appendChild(ghostElement);

        // Run sanitization
        try {
            sanitizeColors(ghostElement);
        } catch (e) {
            console.warn('Color sanitization warning:', e);
        }

        // Wait for rendering
        await new Promise(resolve => setTimeout(resolve, 100));

        // 5. Capture with html2canvas
        const canvas = await html2canvas(ghostElement, {
            useCORS: true,
            logging: false,
            background: '#ffffff',
            allowTaint: true,
            scale: 2, // High quality
            windowWidth: 210 * 3.7795275591, // A4 width in px
        } as any);

        const imgData = canvas.toDataURL('image/png', 1.0);

        // 6. Generate PDF
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4',
        });

        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = pageWidth;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft > 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
        }

        // 7. Save
        const safeName = data.personalInfo?.fullName
            ? data.personalInfo.fullName.replace(/[^\w\s-]/g, '').replace(/\s+/g, '_')
            : 'Resume';
        pdf.save(`${safeName}_${new Date().toISOString().split('T')[0]}.pdf`);

    } finally {
        if (ghostElement && document.body.contains(ghostElement)) {
            document.body.removeChild(ghostElement);
        }
    }
};
