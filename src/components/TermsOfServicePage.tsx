import React from 'react';
import { ArrowLeft, FileText, Scale, AlertCircle, CheckCircle2 } from 'lucide-react';

interface TermsOfServicePageProps {
  content: string;
  onBack: () => void;
}

export const TermsOfServicePage: React.FC<TermsOfServicePageProps> = ({ content, onBack }) => {
  return (
    <div className="min-h-screen bg-slate-50 py-12 sm:py-16">
      <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 font-semibold mb-6 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>

          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-[#BBE7F1] text-slate-950 border border-[#9cd5e2] rounded-2xl flex items-center justify-center shadow-sm">
              <Scale className="w-6 h-6 text-slate-950" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-['Archivo']">
                Terms of Service
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                Legal agreement governing your use of our services
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600">
            <span className="inline-flex items-center gap-1.5 bg-[#BBE7F1] text-slate-950 px-3 py-1.5 rounded-full border border-[#9cd5e2] font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Binding Agreement
            </span>
            <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 px-3 py-1.5 rounded-full border border-amber-200 font-semibold">
              <AlertCircle className="w-3.5 h-3.5" />
              Please Read Carefully
            </span>
            <span className="text-slate-500">Last updated: January 2026</span>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white border border-slate-200 rounded-2xl p-8 sm:p-10 shadow-sm">
          <div className="prose prose-slate max-w-none">
            <div className="whitespace-pre-wrap text-sm sm:text-base leading-relaxed text-slate-700">
              {content || (
                <div className="text-center py-12">
                  <FileText className="w-16 h-16 mx-auto mb-4 text-slate-300" />
                  <p className="text-slate-500">Terms of service content not available</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center">
          <p className="text-xs text-slate-500">
            For legal questions or contract inquiries, contact us at{' '}
            <a href="mailto:info@webdevsoftwaresolutions.com" className="text-cyan-800 hover:text-cyan-900 font-semibold">
              info@webdevsoftwaresolutions.com
            </a>
          </p>
        </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfServicePage;
