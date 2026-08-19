import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { JobListing, PortfolioProject } from '../types';
import { X, Send, CheckCircle2, Link2, Palette, ShieldCheck, FileText, Mail, Copy, Check } from 'lucide-react';

interface ApplyModalProps {
  job: JobListing | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenAuth: () => void;
}

export const ApplyModal: React.FC<ApplyModalProps> = ({ job, isOpen, onClose, onOpenAuth }) => {
  const { user, isAuthenticated, applyToJob } = useAuth();

  const [coverLetter, setCoverLetter] = useState(
    "Hi there! I came across this role on Dakarlaton and would love to contribute. I have extensive experience in product & visual design, and my attached portfolio demonstrates my recent end-to-end work."
  );
  const [portfolioUrl, setPortfolioUrl] = useState(user?.website || user?.dribbble || 'https://dribbble.com/designer');
  const [rate, setRate] = useState(user?.hourlyRate || '$75 / hr');
  const [selectedProjectIds, setSelectedProjectIds] = useState<string[]>(
    user?.portfolioProjects?.map((p) => p.id) || []
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);

  if (!isOpen || !job) return null;

  const copyEmail = (emailText: string) => {
    navigator.clipboard?.writeText(emailText);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated || !user) {
      onOpenAuth();
      return;
    }

    setError('');
    setIsSubmitting(true);

    const selectedProjects = (user.portfolioProjects || []).filter((p) =>
      selectedProjectIds.includes(p.id)
    );

    const res = await applyToJob({
      jobId: job.id,
      jobTitle: job.title,
      company: job.company,
      applicantId: user.id,
      applicantName: user.fullName,
      applicantEmail: user.email,
      applicantAvatar: user.avatar,
      applicantHeadline: user.headline,
      portfolioUrl,
      selectedProjects,
      coverLetter,
      proposedRate: rate
    });

    setIsSubmitting(false);

    if (res.success) {
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 1800);
    } else {
      setError(res.error || 'Failed to submit application');
    }
  };

  const toggleProject = (id: string) => {
    if (selectedProjectIds.includes(id)) {
      setSelectedProjectIds(selectedProjectIds.filter((p) => p !== id));
    } else {
      setSelectedProjectIds([...selectedProjectIds, id]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-stone-200 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 p-2 rounded-full hover:bg-stone-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {success ? (
          <div className="text-center py-10 space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-stone-900">Application Submitted!</h3>
            <p className="text-stone-600 text-sm max-w-md mx-auto">
              Your portfolio and proposal for <span className="font-semibold text-stone-900">{job.title}</span> have been sent to <span className="font-semibold text-stone-900">{job.company}</span>.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="border-b border-stone-100 pb-4">
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-orange-50 text-[#E25B38] uppercase tracking-wider inline-block mb-2">
                {job.category} • {job.type}
              </span>
              <h3 className="text-2xl font-bold text-[#1C1917]">{job.title}</h3>
              <p className="text-sm text-stone-600 font-medium">{job.company} • {job.location} ({job.salary})</p>
            </div>

            {!isAuthenticated ? (
              <div className="bg-orange-50 border border-orange-200 p-4 rounded-2xl flex items-center justify-between">
                <div className="text-xs text-orange-900">
                  <span className="font-semibold block">Sign in required</span>
                  Please sign in or create your designer account to submit your portfolio.
                </div>
                <button
                  type="button"
                  onClick={onOpenAuth}
                  className="bg-[#E25B38] text-white text-xs px-3.5 py-1.5 rounded-full font-medium shadow-xs"
                >
                  Sign In
                </button>
              </div>
            ) : null}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                  Portfolio / Website URL *
                </label>
                <div className="relative">
                  <Link2 className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
                  <input
                    type="url"
                    required
                    placeholder="https://dribbble.com/yourhandle or personal website"
                    value={portfolioUrl}
                    onChange={(e) => setPortfolioUrl(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#E25B38] focus:border-[#E25B38]"
                  />
                </div>
              </div>

              {/* Show attached projects if user has any */}
              {user && user.portfolioProjects && user.portfolioProjects.length > 0 && (
                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2">
                    Attach Showcase Case Studies ({selectedProjectIds.length} selected)
                  </label>
                  <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                    {user.portfolioProjects.map((p) => (
                      <div
                        key={p.id}
                        onClick={() => toggleProject(p.id)}
                        className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                          selectedProjectIds.includes(p.id)
                            ? 'border-[#E25B38] bg-orange-50/50'
                            : 'border-stone-200 hover:border-stone-300'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={p.coverImage}
                            alt={p.title}
                            referrerPolicy="no-referrer"
                            className="w-10 h-10 rounded-lg object-cover"
                          />
                          <div>
                            <div className="text-xs font-semibold text-stone-900">{p.title}</div>
                            <div className="text-[11px] text-stone-500">{p.category}</div>
                          </div>
                        </div>
                        <input
                          type="checkbox"
                          checked={selectedProjectIds.includes(p.id)}
                          onChange={() => {}}
                          className="accent-[#E25B38] w-4 h-4 rounded"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                  Proposed Rate / Expectation
                </label>
                <input
                  type="text"
                  placeholder="e.g. $75 / hr or $5,000 / milestone"
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#E25B38] focus:border-[#E25B38]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                  Cover Note / Pitch *
                </label>
                <textarea
                  rows={4}
                  required
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#E25B38] focus:border-[#E25B38]"
                />
              </div>

              {error && (
                <div className="text-xs text-red-600 bg-red-50 p-3 rounded-xl border border-red-200">
                  {error}
                </div>
              )}

              {/* Direct email option banner */}
              <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-[11px] font-bold text-stone-700 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-[#E25B38]" />
                    Direct Company Contact
                  </div>
                  <span className="text-xs text-stone-600 truncate block">
                    {job.contactEmail || 'career@mascofuture.com'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => copyEmail(job.contactEmail || 'career@mascofuture.com')}
                    className="px-3 py-1.5 rounded-lg border border-stone-300 text-xs font-medium text-stone-700 hover:bg-white transition-colors flex items-center gap-1"
                  >
                    {copiedEmail ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-600 font-medium">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-stone-400" />
                        <span>Copy Email</span>
                      </>
                    )}
                  </button>
                  <a
                    href={`mailto:${job.contactEmail || 'career@mascofuture.com'}?subject=${encodeURIComponent(`Application for ${job.title} - Dakarlaton`)}`}
                    className="px-3 py-1.5 rounded-lg bg-stone-900 text-white text-xs font-medium hover:bg-stone-800 transition-colors flex items-center gap-1"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Email Direct</span>
                  </a>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-full text-stone-600 hover:text-stone-900 text-sm font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#E25B38] hover:bg-[#c94929] text-white px-7 py-2.5 rounded-full font-medium text-sm shadow-sm hover:shadow transition-all disabled:opacity-50 flex items-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? 'Sending...' : 'Submit Application & Portfolio'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
