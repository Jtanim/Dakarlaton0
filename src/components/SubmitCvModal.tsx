import React, { useState } from 'react';
import { X, Upload, CheckCircle2, FileText, Send, Sparkles, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface SubmitCvModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SubmitCvModal: React.FC<SubmitCvModalProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const [fullName, setFullName] = useState(user?.fullName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('Saudi Arabia (Riyadh)');
  const [jobFunction, setJobFunction] = useState('Engineering & AutoCAD');
  const [experienceLevel, setExperienceLevel] = useState('Mid-Level (3-5 years)');
  const [cvFileName, setCvFileName] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCvFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim()) {
      setError('Please fill in your name and email address.');
      return;
    }
    setLoading(true);
    setError('');

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-stone-200 relative max-h-[92vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 p-2 rounded-full hover:bg-stone-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8 space-y-4 animate-in fade-in duration-200">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-serif font-bold text-[#1C1917]">
              CV Received by Dakarlaton!
            </h3>
            <p className="text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
              Thank you, <span className="font-semibold text-stone-900">{fullName}</span>. Our specialist recruitment consultants in <span className="font-semibold">{location}</span> will review your profile for matching senior, mid-level, and project-based opportunities.
            </p>
            <div className="pt-4">
              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="bg-[#5925DC] hover:bg-[#471cb3] text-white px-8 py-3 rounded-full text-sm font-semibold transition-all shadow-sm cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#5925DC]/10 text-[#5925DC] text-xs font-semibold uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5" /> Candidate Talent Pool
              </span>
              <h3 className="text-2xl font-serif font-bold text-[#1C1917]">
                Send Us Your CV
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 mt-1">
                Let Dakarlaton's expert recruiters match you with unadvertised executive and specialist roles across the GCC.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Sarah Al-Otaibi"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#5925DC]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@domain.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#5925DC]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                    Phone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+966 50 123 4567"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#5925DC]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                    Preferred Location
                  </label>
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#5925DC] bg-white"
                  >
                    <option value="Saudi Arabia (Riyadh)">🇸🇦 Saudi Arabia (Riyadh / Jeddah / Khobar)</option>
                    <option value="United Arab Emirates (Dubai)">🇦🇪 UAE (Dubai / Abu Dhabi)</option>
                    <option value="Qatar (Doha)">🇶🇦 Qatar (Doha)</option>
                    <option value="Oman (Muscat)">🇴🇲 Oman (Muscat)</option>
                    <option value="Bahrain (Manama)">🇧🇭 Bahrain (Manama)</option>
                    <option value="Kuwait (Kuwait City)">🇰🇼 Kuwait (Kuwait City)</option>
                    <option value="Worldwide Remote">🌐 Worldwide Remote</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                    Specialism / Industry
                  </label>
                  <select
                    value={jobFunction}
                    onChange={(e) => setJobFunction(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#5925DC] bg-white"
                  >
                    <option value="Engineering & AutoCAD">Engineering & AutoCAD</option>
                    <option value="BIM & Revit Architecture">BIM & Revit Architecture</option>
                    <option value="Executive & General Management">Executive & General Management</option>
                    <option value="Banking & Financial Services">Banking & Financial Services</option>
                    <option value="Tech, Software & UI/UX">Tech, Software & UI/UX</option>
                    <option value="Procurement & Supply Chain">Procurement & Supply Chain</option>
                    <option value="Marketing & Brand">Marketing & Brand</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                    Experience Level
                  </label>
                  <select
                    value={experienceLevel}
                    onChange={(e) => setExperienceLevel(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#5925DC] bg-white"
                  >
                    <option value="Junior (1-2 years)">Junior (1-2 years)</option>
                    <option value="Mid-Level (3-5 years)">Mid-Level (3-5 years)</option>
                    <option value="Senior (5-8 years)">Senior (5-8 years)</option>
                    <option value="Lead / Director (8+ years)">Lead / Director (8+ years)</option>
                    <option value="Executive / C-Suite">Executive / C-Suite</option>
                  </select>
                </div>
              </div>

              {/* CV File Upload Box */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                  Upload Resume / CV (PDF, DOCX)
                </label>
                <label className="border-2 border-dashed border-stone-300 hover:border-[#5925DC] bg-stone-50 hover:bg-stone-100/60 rounded-2xl p-4 flex flex-col items-center justify-center cursor-pointer transition-colors text-center">
                  <Upload className="w-6 h-6 text-[#5925DC] mb-1.5" />
                  <span className="text-xs font-semibold text-stone-800">
                    {cvFileName ? cvFileName : 'Click to select or drag & drop your CV'}
                  </span>
                  <span className="text-[11px] text-stone-500 mt-0.5">
                    PDF, DOC, DOCX up to 10MB
                  </span>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                  Additional Notes or Target Roles (Optional)
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Tell us about your target salary expectations, notice period, or relocation preferences..."
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#5925DC]"
                />
              </div>

              {error && (
                <div className="text-xs text-red-600 bg-red-50 p-2.5 rounded-xl flex items-center gap-1.5 border border-red-200">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#5925DC] hover:bg-[#471cb3] text-white font-semibold py-3 rounded-full shadow-sm hover:shadow transition-all text-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? 'Submitting CV...' : (
                  <>
                    <Send className="w-4 h-4" /> Send CV to Dakarlaton Recruiters
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
