import { FileText } from 'lucide-react';

export default function FooterSection() {
  return (
    <footer className="bg-slate-50 dark:bg-slate-900/50 pt-20 pb-10 border-t border-slate-200 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-12 mb-16">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
                <FileText className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tighter">Rapid<span className="text-blue-500">Apply</span></span>
            </div>
            <p className="text-slate-500 text-sm mb-6 max-w-xs">Helping job seekers worldwide land their dream roles with intelligence and style since 2024.</p>
            <div className="flex gap-4">
              <a className="text-slate-400 hover:text-blue-500 transition-colors" href="#">Facebook</a>
              <a className="text-slate-400 hover:text-blue-500 transition-colors" href="#">Twitter</a>
              <a className="text-slate-400 hover:text-blue-500 transition-colors" href="#">LinkedIn</a>
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-6">Product</h4>
            <ul className="space-y-4 text-sm text-slate-500">
              <li><a className="hover:text-blue-500 transition-colors" href="/resume-builder">Resume Builder</a></li>
              <li><a className="hover:text-blue-500 transition-colors" href="/cover-letters">Cover Letters</a></li>
              <li><a className="hover:text-blue-500 transition-colors" href="/templates">Templates</a></li>
              <li><a className="hover:text-blue-500 transition-colors" href="/import-export">Import/Export</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6">Resources</h4>
            <ul className="space-y-4 text-sm text-slate-500">
              <li><a className="hover:text-blue-500 transition-colors" href="/help">Resume Tips</a></li>
              <li><a className="hover:text-blue-500 transition-colors" href="/help">Interview Prep</a></li>
              <li><a className="hover:text-blue-500 transition-colors" href="/help">Career Blog</a></li>
              <li><a className="hover:text-blue-500 transition-colors" href="/help">Help Center</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-slate-500">
              <li><a className="hover:text-blue-500 transition-colors" href="#">About Us</a></li>
              <li><a className="hover:text-blue-500 transition-colors" href="#">Contact</a></li>
              <li><a className="hover:text-blue-500 transition-colors" href="#">Pricing</a></li>
              <li><a className="hover:text-blue-500 transition-colors" href="#">Privacy</a></li>
            </ul>
          </div>
          <div className="col-span-2 md:col-span-1">
            <h4 className="font-bold mb-6">Status</h4>
            <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                <span className="text-xs font-bold text-blue-500">ALL SYSTEMS GO</span>
              </div>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest">Build v2.4.1</p>
            </div>
          </div>
        </div>
        <div className="pt-8 border-t border-slate-200 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© 2024 ApplyOS Resume Systems Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <a className="hover:text-blue-500 transition-colors" href="#">Terms of Service</a>
            <a className="hover:text-blue-500 transition-colors" href="#">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
