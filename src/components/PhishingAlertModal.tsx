import React from 'react';
import { X, ShieldAlert, CheckCircle2, AlertTriangle, Lock, ExternalLink } from 'lucide-react';

interface PhishingAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PhishingAlertModal: React.FC<PhishingAlertModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-stone-200 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 p-2 rounded-full hover:bg-stone-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700">Security Advisory</span>
              <h3 className="text-2xl font-serif font-bold text-[#1C1917]">
                How to Protect Yourself from Recruitment Scams
              </h3>
            </div>
          </div>

          <p className="text-sm text-stone-600 leading-relaxed">
            Dakarlaton is aware of ongoing global phishing scams where bad actors impersonate recruitment agencies via WhatsApp, Telegram, and unsolicited emails offering fake part-time, rating, or crypto tasks. <strong>No Dakarlaton systems have been compromised.</strong>
          </p>

          <div className="space-y-3 bg-stone-50 p-5 rounded-2xl border border-stone-200">
            <h4 className="font-bold text-stone-900 text-sm flex items-center gap-2">
              <Lock className="w-4 h-4 text-[#5925DC]" /> Dakarlaton Official Communication Standards:
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-stone-700">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Dakarlaton will <strong>never ask candidates for payments</strong>, processing fees, or crypto transfers for job placement.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Official emails are only sent from verified <code className="bg-stone-200 px-1.5 py-0.5 rounded text-stone-800 font-mono text-xs">@dakarlaton.com</code> domains.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>We never conduct job interviews or send formal contracts over unofficial Telegram groups.</span>
              </li>
            </ul>
          </div>

          <div className="border-t border-stone-100 pt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-xs text-stone-500">
              Suspect a fraudulent message? Report it to <strong className="text-stone-800">security@dakarlaton.com</strong>
            </span>
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-6 py-2.5 bg-[#1F104F] hover:bg-[#160838] text-white rounded-full text-xs font-semibold transition-colors cursor-pointer"
            >
              I Understand
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
