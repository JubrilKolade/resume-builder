import { Sparkles, Eye, Download, CheckCircle, Shield } from 'lucide-react';

interface Feature {
  icon: React.ElementType;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: Sparkles,
    title: 'AI-Powered Writing Assistant',
    description: 'Our AI analyzes job descriptions and suggests powerful bullet points that highlight your unique impact and skills.',
  },
  {
    icon: Eye,
    title: 'Real-time Preview',
    description: 'Edit your details and watch your resume update instantly. No more tedious formatting or page layout struggles.',
  },
  {
    icon: Download,
    title: 'Multi-Format Export',
    description: 'Download in PDF, DOCX, or share a live link to your digital resume.',
  },
  {
    icon: CheckCircle,
    title: 'ATS Score Checker',
    description: 'Instantly scan your resume against 100+ recruitment software systems.',
  },
  {
    icon: Shield,
    title: 'Data Privacy',
    description: 'Your data is encrypted and secure. We never sell your personal information.',
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-32 bg-gradient-to-b from-transparent to-slate-50/50 dark:to-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white mb-6 bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
            Smart Tools for Modern Careers
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Everything you need to build, optimize, and share your professional resume with cutting-edge AI technology.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="group relative bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 p-10 rounded-3xl border border-slate-200/50 dark:border-white/5 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mb-8 shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-110">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
                    {feature.description}
                  </p>
                </div>
                <div className="absolute -right-8 -bottom-8 opacity-0 group-hover:opacity-20 transition-opacity duration-500">
                  <Sparkles className="w-[200px] h-[200px] text-blue-500" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
