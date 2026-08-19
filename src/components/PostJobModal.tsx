import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { X, Briefcase, DollarSign, MapPin, Building, FileText, CheckCircle2, ShieldAlert } from 'lucide-react';

interface PostJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenVerify: () => void;
  onOpenAuth: () => void;
}

export const PostJobModal: React.FC<PostJobModalProps> = ({
  isOpen,
  onClose,
  onOpenVerify,
  onOpenAuth
}) => {
  const { user, isAuthenticated, postJob } = useAuth();

  const [title, setTitle] = useState('');
  const [company, setCompany] = useState(user?.companyName || '');
  const [category, setCategory] = useState('Design');
  const [type, setType] = useState<'Full-time' | 'Part-time' | 'Contract' | 'Freelance'>('Freelance');
  const [workplaceType, setWorkplaceType] = useState<'Remote' | 'Hybrid' | 'On-site'>('Remote');
  const [location, setLocation] = useState('Remote');
  const [salary, setSalary] = useState('$60 - $85 / hr');
  const [description, setDescription] = useState('');
  const [responsibilitiesText, setResponsibilitiesText] = useState(
    'Deliver interactive Figma prototypes\nCollaborate with product and engineering teams\nMaintain design system components'
  );
  const [requirementsText, setRequirementsText] = useState(
    'Strong portfolio showcasing relevant case studies\n3+ years experience in design or related craft\nProficiency in Figma and modern tooling'
  );
  const [tagsInput, setTagsInput] = useState('Figma, UI/UX, Design System');
  const [contactEmail, setContactEmail] = useState(user?.email || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated || !user) {
      onOpenAuth();
      return;
    }

    if (!user.emailVerified) {
      onOpenVerify();
      return;
    }

    setError('');
    setIsSubmitting(true);

    const responsibilities = responsibilitiesText
      .split('\n')
      .map((r) => r.trim())
      .filter(Boolean);

    const requirements = requirementsText
      .split('\n')
      .map((r) => r.trim())
      .filter(Boolean);

    const tags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const res = await postJob({
      title,
      company: company.trim() || 'Creative Studio',
      category,
      type,
      location,
      workplaceType,
      salary,
      description,
      aboutRole: description,
      responsibilities: responsibilities.length > 0 ? responsibilities : ['Collaborate on design and deliverables'],
      requirements: requirements.length > 0 ? requirements : ['Strong portfolio and communication'],
      benefits: ['Flexible schedule', 'Direct client collaboration'],
      tags: tags.length > 0 ? tags : ['Design', 'Remote'],
      employerId: user.id,
      contactEmail: contactEmail || user.email
    });

    setIsSubmitting(false);

    if (res.success) {
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 1600);
    } else {
      setError(res.error || 'Failed to post job');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-stone-200 relative max-h-[92vh] overflow-y-auto">
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
            <h3 className="text-2xl font-bold text-stone-900">Job Posted Successfully!</h3>
            <p className="text-stone-600 text-sm max-w-md mx-auto">
              Your role <span className="font-semibold text-stone-900">{title}</span> is now live for freelance designers and job seekers across Dakarlaton.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#E25B38] uppercase tracking-wider mb-1">
                <Briefcase className="w-3.5 h-3.5" /> For Employers & Studios
              </div>
              <h3 className="text-2xl font-bold text-[#1C1917]">Post a New Role</h3>
              <p className="text-sm text-stone-600">
                Reach thousands of verified freelance designers, creatives, and tech professionals.
              </p>
            </div>

            {/* Auth check banner */}
            {!isAuthenticated ? (
              <div className="bg-orange-50 border border-orange-200 p-4 rounded-2xl flex items-center justify-between">
                <div className="text-xs text-orange-900">
                  <span className="font-semibold block">You are not signed in</span>
                  Please sign in or create an employer account before posting.
                </div>
                <button
                  type="button"
                  onClick={onOpenAuth}
                  className="bg-[#E25B38] text-white text-xs px-3.5 py-1.5 rounded-full font-medium shadow-xs"
                >
                  Sign In
                </button>
              </div>
            ) : !user?.emailVerified ? (
              <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl flex items-center justify-between">
                <div className="text-xs text-amber-900 flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0" />
                  <div>
                    <span className="font-semibold block">Email Verification Required</span>
                    Verify your email address ({user.email}) to publish jobs.
                  </div>
                </div>
                <button
                  type="button"
                  onClick={onOpenVerify}
                  className="bg-amber-600 text-white text-xs px-3.5 py-1.5 rounded-full font-medium shadow-xs"
                >
                  Verify Now
                </button>
              </div>
            ) : null}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                    Job Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Freelance Brand & UI Designer"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#E25B38] focus:border-[#E25B38]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                    Company / Studio Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Brightwave Studio"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#E25B38] focus:border-[#E25B38]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#E25B38] focus:border-[#E25B38] bg-white"
                  >
                    <option value="Design">Design</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Operations">Operations</option>
                    <option value="Content">Content</option>
                    <option value="Data">Data</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                    Job Type
                  </label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as any)}
                    className="w-full px-3 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#E25B38] focus:border-[#E25B38] bg-white"
                  >
                    <option value="Freelance">Freelance</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Part-time">Part-time</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                    Workplace
                  </label>
                  <select
                    value={workplaceType}
                    onChange={(e) => {
                      const val = e.target.value as any;
                      setWorkplaceType(val);
                      if (val === 'Remote') setLocation('Remote');
                    }}
                    className="w-full px-3 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#E25B38] focus:border-[#E25B38] bg-white"
                  >
                    <option value="Remote">Remote</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="On-site">On-site</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                    Location / Region
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Remote (Worldwide) or Dakar, SN"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#E25B38] focus:border-[#E25B38]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                    Compensation / Budget *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. $70 - $95 / hr or $90k - $120k"
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#E25B38] focus:border-[#E25B38]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                  About the Role & Overview *
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe the opportunity, project scope, team background, and key objectives..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#E25B38] focus:border-[#E25B38]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                    Key Responsibilities (One per line)
                  </label>
                  <textarea
                    rows={3}
                    value={responsibilitiesText}
                    onChange={(e) => setResponsibilitiesText(e.target.value)}
                    className="w-full px-4 py-2 rounded-xl border border-stone-300 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-[#E25B38] focus:border-[#E25B38]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                    Requirements & Skills (One per line)
                  </label>
                  <textarea
                    rows={3}
                    value={requirementsText}
                    onChange={(e) => setRequirementsText(e.target.value)}
                    className="w-full px-4 py-2 rounded-xl border border-stone-300 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-[#E25B38] focus:border-[#E25B38]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                    Skills / Tags (Comma separated)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Figma, UI Design, Mobile"
                    value={tagsInput}
                    onChange={(e) => setTagsInput(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#E25B38] focus:border-[#E25B38]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                    Contact / Applications Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="careers@yourcompany.com"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#E25B38] focus:border-[#E25B38]"
                  />
                </div>
              </div>

              {error && (
                <div className="text-xs text-red-600 bg-red-50 p-3 rounded-xl border border-red-200">
                  {error}
                </div>
              )}

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
                  {isSubmitting ? 'Publishing...' : 'Publish Job Listing'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
