import { ResumeStyle } from '@/types/resume';

/**
 * Get font size scale based on the selected size setting
 */
export const getFontSizeScale = (size: 'small' | 'medium' | 'large' = 'medium'): Record<string, number> => {
  switch (size) {
    case 'small':
      return {
        h1: 1.8, // 28.8px
        h2: 1.4, // 22.4px
        h3: 1.2, // 19.2px
        body: 0.85, // 13.6px
        caption: 0.75, // 12px
      };
    case 'large':
      return {
        h1: 2.8, // 44.8px
        h2: 2.0, // 32px
        h3: 1.6, // 25.6px
        body: 1.15, // 18.4px
        caption: 1.0, // 16px
      };
    case 'medium':
    default:
      return {
        h1: 2.25, // 36px
        h2: 1.75, // 28px
        h3: 1.4, // 22.4px
        body: 1.0, // 16px
        caption: 0.875, // 14px
      };
  }
};

/**
 * Get the CSS rem value for a font size scale
 */
export const getScaledFontSize = (scale: number): string => {
  return `${scale}rem`;
};

/**
 * Get spacing scale based on the selected spacing setting
 */
export const getSpacingScale = (spacing: 'compact' | 'normal' | 'relaxed' = 'normal'): Record<string, string> => {
  switch (spacing) {
    case 'compact':
      return {
        xs: '0.25rem',
        sm: '0.5rem',
        md: '0.75rem',
        lg: '1rem',
        xl: '1.25rem',
      };
    case 'relaxed':
      return {
        xs: '0.5rem',
        sm: '1rem',
        md: '1.5rem',
        lg: '2rem',
        xl: '2.5rem',
      };
    case 'normal':
    default:
      return {
        xs: '0.375rem',
        sm: '0.75rem',
        md: '1.125rem',
        lg: '1.5rem',
        xl: '1.875rem',
      };
  }
};

/**
 * Apply theme styles to an element
 */
export const applyThemeStyles = (style: ResumeStyle): React.CSSProperties => {
  const fontSizeScale = getFontSizeScale(style.fontSize);
  
  return {
    fontFamily: style.fontFamily || 'Inter, sans-serif',
    color: style.textColor || '#1f2937',
    backgroundColor: style.backgroundColor || '#ffffff',
    fontSize: getScaledFontSize(fontSizeScale.body),
  };
};

/**
 * Get color with opacity
 */
export const getColorWithOpacity = (color: string, opacity: number): string => {
  if (color.startsWith('#')) {
    const hex = color.slice(1);
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }
  return color;
};
