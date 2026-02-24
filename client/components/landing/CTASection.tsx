interface CTASectionProps {
  onNavigate: (path: string) => void;
}

export default function CTASection({ onNavigate }: CTASectionProps) {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="relative bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 rounded-4xl p-16 overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-indigo-600/20"></div>
          <div className="relative z-10 flex flex-col items-center text-center">
            <h2 className="text-white text-5xl md:text-6xl font-extrabold mb-8">
              Ready to get your dream job?
            </h2>
            <p className="text-white/90 text-xl mb-12 max-w-3xl font-medium leading-relaxed">
              Join thousands of successful job seekers who used RapidApply to level up their careers. 
              Start building your professional resume for free today.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <button 
                onClick={() => onNavigate('/resume-builder')}
                className="bg-white text-slate-900 font-bold py-6 px-12 rounded-2xl text-xl shadow-2xl hover:bg-slate-100 transition-all duration-300 transform hover:scale-105"
              >
                Create Resume Now
              </button>
              <button className="bg-white/20 backdrop-blur-sm text-white font-bold py-6 px-12 rounded-2xl text-xl border-2 border-white/30 hover:bg-white/30 transition-all duration-300">
                Talk to an Expert
              </button>
            </div>
          </div>
          {/* Background pattern */}
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[300px] h-[300px] border-[60px] border-white/10 rounded-full"></div>
          <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[400px] h-[400px] border-[80px] border-white/5 rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] border-[40px] border-white/5 rounded-full"></div>
        </div>
      </div>
    </section>
  );
}
