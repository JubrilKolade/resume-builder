import { ResumeStyle } from '@/types/resume';
import { X } from 'lucide-react';

interface StyleCustomizerProps {
  style: ResumeStyle;
  onStyleChange: (style: ResumeStyle) => void;
  onClose: () => void;
}

const accentColors = [
  { name: 'Blue', value: '#0ea5e9' },
  { name: 'Indigo', value: '#6366f1' },
  { name: 'Purple', value: '#a855f7' },
  { name: 'Pink', value: '#ec4899' },
  { name: 'Red', value: '#ef4444' },
  { name: 'Orange', value: '#f97316' },
  { name: 'Green', value: '#10b981' },
  { name: 'Teal', value: '#14b8a6' },
  { name: 'Gray', value: '#6b7280' },
];

const fontFamilies = [
  { name: 'Inter', value: 'Inter' },
  { name: 'Roboto', value: 'Roboto' },
  { name: 'Open Sans', value: 'Open Sans' },
  { name: 'Lato', value: 'Lato' },
];

export default function StyleCustomizer({ style, onStyleChange, onClose }: StyleCustomizerProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8 no-print">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Customize Style</h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close customizer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Accent Color
          </label>
          <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-3">
            {accentColors.map((color) => (
              <button
                key={color.value}
                onClick={() => onStyleChange({ ...style, accentColor: color.value })}
                className={`relative w-full aspect-square rounded-lg transition-all ${
                  style.accentColor === color.value
                    ? 'ring-2 ring-offset-2 ring-gray-900'
                    : 'hover:scale-110'
                }`}
                style={{ backgroundColor: color.value }}
                aria-label={`Select ${color.name} color`}
                title={color.name}
              >
                {style.accentColor === color.value && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-4 h-4 bg-white rounded-full" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Font Family
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {fontFamilies.map((font) => (
              <button
                key={font.value}
                onClick={() => onStyleChange({ ...style, fontFamily: font.value })}
                className={`px-4 py-3 rounded-lg border-2 transition-all text-sm font-medium ${
                  style.fontFamily === font.value
                    ? 'border-primary-600 bg-primary-50 text-primary-700'
                    : 'border-gray-200 hover:border-gray-300 text-gray-700'
                }`}
                style={{ fontFamily: font.value }}
              >
                {font.name}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Font Size
          </label>
          <div className="grid grid-cols-3 gap-3">
            {(['small', 'medium', 'large'] as const).map((size) => (
              <button
                key={size}
                onClick={() => onStyleChange({ ...style, fontSize: size })}
                className={`px-4 py-3 rounded-lg border-2 transition-all text-sm font-medium capitalize ${
                  style.fontSize === size
                    ? 'border-primary-600 bg-primary-50 text-primary-700'
                    : 'border-gray-200 hover:border-gray-300 text-gray-700'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Spacing
          </label>
          <div className="grid grid-cols-3 gap-3">
            {(['compact', 'normal', 'relaxed'] as const).map((spacing) => (
              <button
                key={spacing}
                onClick={() => onStyleChange({ ...style, spacing })}
                className={`px-4 py-3 rounded-lg border-2 transition-all text-sm font-medium capitalize ${
                  style.spacing === spacing
                    ? 'border-primary-600 bg-primary-50 text-primary-700'
                    : 'border-gray-200 hover:border-gray-300 text-gray-700'
                }`}
              >
                {spacing}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
