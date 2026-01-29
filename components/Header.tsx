import { FileText, RotateCcw, Sparkles, Palette } from 'lucide-react';

interface HeaderProps {
  onLoadSample: () => void;
  onReset: () => void;
  onToggleCustomizer: () => void;
}

export default function Header({ onLoadSample, onReset, onToggleCustomizer }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 no-print">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-primary-600 p-2 rounded-lg">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Resume Builder</h1>
              <p className="text-sm text-gray-500">Professional resumes made simple</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={onToggleCustomizer}
              className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              aria-label="Customize style"
            >
              <Palette className="w-4 h-4" />
              <span className="hidden sm:inline">Customize</span>
            </button>
            
            <button
              onClick={onLoadSample}
              className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors"
              aria-label="Load sample data"
            >
              <Sparkles className="w-4 h-4" />
              <span className="hidden sm:inline">Load Sample</span>
            </button>

            <button
              onClick={onReset}
              className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              aria-label="Reset all data"
            >
              <RotateCcw className="w-4 h-4" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
