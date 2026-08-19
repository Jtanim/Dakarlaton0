import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { JobListing } from '../types';
import { X, Briefcase, CheckCircle2, ArrowRight, Sparkles, Building2, MapPin, DollarSign } from 'lucide-react';

interface PostJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenVerify: () => void;
  onOpenAuth: () => void;
  onViewCreatedJob?: (job: JobListing) => void;
}

export const PostJobModal: React.FC<PostJobModalProps> = ({
  isOpen,
  onClose,
  onOpenVerify,
  onOpenAuth,
  onViewCreatedJob
}) => {
  const { user, isAuthenticated, postJob } = useAuth();

  const [title, setTitle] = useState('');
  const [company, setCompany] = useState(user?.companyName || '');
  const [category, setCategory] = useState('Design');
  const [type, setType] = useState<'Full-time' | 'Part-time' | 'Contract' | 'Freelance'>('Full-time');
  const [workplaceType, setWorkplaceType] = useState<'Remote' | 'Hybrid' | 'On-site'>('On-site');
  const [location, setLocation] = useState('Riyadh, Saudi Arabia');
  const [salary, setSalary] = useState('$60 - $85 / hr');
  const [description, setDescription] = useState('');
  const [responsibilitiesText, setResponsibilitiesText] = useState(
    'Strong proficiency in AutoCAD / design software\nExperience in drafting and construction drawings\nAbility to read and understand architectural drawings\nCollaborate with engineering and project teams'
  );
  const [requirementsText, setRequirementsText] = useState(
    'Relevant experience in design, engineering, or drafting\nStrong portfolio showcasing relevant technical drawings or case studies\nEffective communication and delivery'
  );
  const [tagsInput, setTagsInput] = useState('AutoCAD, Revit, Drafting, Design');
  const [contactEmail, setContactEmail] = useState(user?.email || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdJob, setCreatedJob] = useState<JobListing | null>(null);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !company.trim()) {
      setError('Please provide both a Job Title and Company / Studio Name');
      return;
    }

    if (!contactEmail.trim()) {
      setError('Please provide a contact email for candidate applications');
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
      title: title.trim(),
      company: company.trim(),
      category,
      type,
      location: location.trim() || (workplaceType === 'Remote' ? 'Remote' : 'Global'),
      workplaceType,
      salary: salary.trim() || 'Competitive',
      description: description.trim() || `Exciting opportunity at ${company} for a skilled ${title}.`,
      aboutRole: description.trim() || `We are looking for a dedicated ${title} to join our team at ${company}.`,
      responsibilities: responsibilities.length > 0 ? responsibilities : ['Execute deliverables with precision and collaborate across teams.'],
      requirements: requirements.length > 0 ? requirements : ['Proven track record and portfolio of relevant work.'],
      benefits: ['Competitive compensation', 'Flexible work environment', 'Collaborative team'],
      tags: tags.length > 0 ? tags : [category, type, workplaceType],
      employerId: user?.id || 'emp-direct',
      contactEmail: contactEmail.trim()
    });

    setIsSubmitting(false);

    if (res.success && res.job) {
      setCreatedJob(res.job);
    } else if (res.success) {
      // Fallback created job
      setCreatedJob({
        id: `job-${Date.now()}`,
        title,
        company,
        category,
        type,
        workplaceType,
        location,
        salary,
        description,
        aboutRole: description,
        responsibilities,
        requirements,
        tags,
        postedAt: 'Just now',
        postedDate: new Date().toISOString().split('T')[0],
        employerId: user?.id || 'emp-direct',
        applicantCount: 0
      });
    } else {
      setError(res.error || 'Failed to post job. Please try again.');
    }
  };

  const handleReset = () => {
    setTitle('');
    setDescription('');
    setCreatedJob(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-stone-200 relative max-h-[92vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 p-2 rounded-full hover:bg-stone-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {createdJob ? (
          <div className="text-center py-6 sm:py-8 space-y-6 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-xs">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2 max-w-lg mx-auto">
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full inline-block">
                Live on Dakarlaton
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#1C1917]">
                Job Posted Successfully!
              </h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                Your role <span className="font-bold text-[#1C1917]">"{createdJob.title}"</span> at <span className="font-bold text-[#1C1917]">{createdJob.company}</span> is now published and open for applications.
              </p>
            </div>

            {/* Quick summary preview card */}
            <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 text-left max-w-md mx-auto space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#E25B38] bg-orange-50 px-2.5 py-0.5 rounded-full">
                  {createdJob.category}
                </span>
                <span className="text-xs text-stone-500 font-medium">{createdJob.type}</span>
              </div>
              <h4 className="text-base font-bold text-stone-900">{createdJob.title}</h4>
              <p className="text-xs text-stone-600 flex items-center justify-between pt-1 border-t border-stone-200">
                <span>{createdJob.company} • {createdJob.location}</span>
                <span className="font-semibold text-stone-900">{createdJob.salary}</span>
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              {onViewCreatedJob && (
                <button
                  type="button"
                  onClick={() => onViewCreatedJob(createdJob)}
                  className="bg-[#E25B38] hover:bg-[#c94929] text-white px-6 py-2.5 rounded-full text-sm font-medium shadow-sm transition-all flex items-center gap-2 cursor-pointer"
                >
                  View in Job Feed <ArrowRight className="w-4 h-4" />
                </button>
              )}
              <button
                type="button"
                onClick={handleReset}
                className="bg-white hover:bg-stone-100 text-stone-800 border border-stone-300 px-5 py-2.5 rounded-full text-sm font-medium transition-colors cursor-pointer"
              >
                Post Another Role
              </button>
              <button
                type="button"
                onClick={onClose}
                className="text-stone-500 hover:text-stone-800 text-xs px-3 py-2"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-[#E25B38] uppercase tracking-wider mb-1">
                <Briefcase className="w-3.5 h-3.5" /> For Employers & Studios
              </div>
              <h3 className="text-2xl font-serif font-bold text-[#1C1917]">Post a New Role</h3>
              <p className="text-xs sm:text-sm text-stone-600">
                Reach thousands of verified freelance designers, creatives, and technical talent.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                    Job Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. AutoCAD Draftsman | Riyadh"
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
                    placeholder="e.g. MAS Future Group"
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
                    <option value="Engineering">Engineering</option>
                    <option value="Architecture & 3D">Architecture & 3D</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Operations">Operations</option>
                    <option value="Content">Content</option>
                    <option value="Data">Data</option>
                    <option value="Finance">Finance</option>
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
                    <option value="Full-time">Full-time</option>
                    <option value="Freelance">Freelance</option>
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
                      if (val === 'Remote' && location === 'Riyadh, Saudi Arabia') {
                        setLocation('Remote');
                      }
                    }}
                    className="w-full px-3 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#E25B38] focus:border-[#E25B38] bg-white"
                  >
                    <option value="On-site">On-site</option>
                    <option value="Remote">Remote</option>
                    <option value="Hybrid">Hybrid</option>
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
                    placeholder="e.g. Riyadh, Saudi Arabia"
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
                    placeholder="e.g. $60 - $85 / hr or SAR 10,000 / mo"
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
                  placeholder="Describe the opportunity, key scope, team background, and goals..."
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
                    placeholder="e.g. AutoCAD, Revit, Drafting, Design"
                    value={tagsInput}
                    onChange={(e) => setTagsInput(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#E25B38] focus:border-[#E25B38]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                    Contact / Applications Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="careers@mascofuture.com"
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

              <div className="pt-2 flex items-center justify-end gap-3 border-t border-stone-100">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-full text-stone-600 hover:text-stone-900 text-sm font-medium transition-colors cursor-pointer"
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
