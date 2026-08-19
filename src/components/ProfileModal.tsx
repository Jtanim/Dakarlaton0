import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { PortfolioProject } from '../types';
import { X, Plus, Trash2, ShieldCheck, CheckCircle2, AlertCircle, Palette, Link2, ExternalLink, Image as ImageIcon } from 'lucide-react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenVerify: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose, onOpenVerify }) => {
  const { user, updateProfile, addPortfolioProject, deletePortfolioProject } = useAuth();

  const [activeTab, setActiveTab] = useState<'profile' | 'portfolio' | 'security'>('profile');
  const [fullName, setFullName] = useState(user?.fullName || '');
  const [headline, setHeadline] = useState(user?.headline || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [location, setLocation] = useState(user?.location || '');
  const [hourlyRate, setHourlyRate] = useState(user?.hourlyRate || '$75 / hr');
  const [website, setWebsite] = useState(user?.website || '');
  const [dribbble, setDribbble] = useState(user?.dribbble || '');
  const [behance, setBehance] = useState(user?.behance || '');
  const [figma, setFigma] = useState(user?.figma || '');
  const [skillsInput, setSkillsInput] = useState(user?.skills?.join(', ') || 'UI/UX, Figma, Brand Identity');

  // New Project State
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [newProjTitle, setNewProjTitle] = useState('');
  const [newProjCategory, setNewProjCategory] = useState('Product Design');
  const [newProjDesc, setNewProjDesc] = useState('');
  const [newProjCover, setNewProjCover] = useState('https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80');
  const [newProjTags, setNewProjTags] = useState('Figma, SaaS, UI');
  const [newProjUrl, setNewProjUrl] = useState('');

  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen || !user) return null;

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const skills = skillsInput
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    updateProfile({
      fullName,
      headline,
      bio,
      location,
      hourlyRate,
      website,
      dribbble,
      behance,
      figma,
      skills
    });

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjTitle.trim()) return;

    const tags = newProjTags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    addPortfolioProject({
      title: newProjTitle,
      category: newProjCategory,
      description: newProjDesc,
      coverImage: newProjCover,
      tags,
      projectUrl: newProjUrl || undefined,
      year: new Date().getFullYear().toString()
    });

    setNewProjTitle('');
    setNewProjDesc('');
    setNewProjUrl('');
    setIsAddingProject(false);
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

        <div className="flex items-center gap-3 mb-6">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.fullName}
              referrerPolicy="no-referrer"
              className="w-12 h-12 rounded-full object-cover border border-stone-200"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-[#E25B38]/15 text-[#E25B38] font-bold flex items-center justify-center text-lg">
              {user.fullName.charAt(0)}
            </div>
          )}
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold text-[#1C1917]">{user.fullName}</h3>
              {user.emailVerified ? (
                <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full flex items-center gap-1 font-medium">
                  <CheckCircle2 className="w-3 h-3" /> Verified
                </span>
              ) : (
                <button
                  onClick={onOpenVerify}
                  className="text-xs bg-amber-100 text-amber-800 hover:bg-amber-200 px-2 py-0.5 rounded-full flex items-center gap-1 font-medium cursor-pointer"
                >
                  <AlertCircle className="w-3 h-3" /> Verify Email
                </button>
              )}
            </div>
            <p className="text-xs text-stone-500">{user.email} • {user.role === 'designer' ? 'Freelance Designer' : 'Employer'}</p>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="flex bg-stone-100 p-1 rounded-2xl mb-6 text-xs sm:text-sm font-medium">
          <button
            type="button"
            onClick={() => setActiveTab('profile')}
            className={`flex-1 py-2 rounded-xl transition-all ${
              activeTab === 'profile' ? 'bg-white text-[#1C1917] shadow-xs font-semibold' : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            Profile Info
          </button>
          {user.role === 'designer' && (
            <button
              type="button"
              onClick={() => setActiveTab('portfolio')}
              className={`flex-1 py-2 rounded-xl transition-all ${
                activeTab === 'portfolio' ? 'bg-white text-[#1C1917] shadow-xs font-semibold' : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              Portfolio Showcase ({user.portfolioProjects?.length || 0})
            </button>
          )}
          <button
            type="button"
            onClick={() => setActiveTab('security')}
            className={`flex-1 py-2 rounded-xl transition-all ${
              activeTab === 'security' ? 'bg-white text-[#1C1917] shadow-xs font-semibold' : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            Security & Verification
          </button>
        </div>

        {activeTab === 'profile' && (
          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#E25B38]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                  Headline
                </label>
                <input
                  type="text"
                  placeholder="e.g. Senior Brand & Product Designer"
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#E25B38]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                Bio & Introduction
              </label>
              <textarea
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#E25B38]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                  Location
                </label>
                <input
                  type="text"
                  placeholder="e.g. Dakar, Senegal or Remote"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#E25B38]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                  Hourly Rate / Pricing
                </label>
                <input
                  type="text"
                  placeholder="e.g. $75 / hr"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#E25B38]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                  Website URL
                </label>
                <input
                  type="url"
                  placeholder="https://mysite.com"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#E25B38]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                  Dribbble
                </label>
                <input
                  type="url"
                  placeholder="https://dribbble.com/..."
                  value={dribbble}
                  onChange={(e) => setDribbble(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#E25B38]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                  Behance / Figma
                </label>
                <input
                  type="url"
                  placeholder="https://behance.net/..."
                  value={behance}
                  onChange={(e) => setBehance(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#E25B38]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                Skills & Specialties (Comma separated)
              </label>
              <input
                type="text"
                value={skillsInput}
                onChange={(e) => setSkillsInput(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#E25B38]"
              />
            </div>

            {savedSuccess && (
              <div className="text-xs text-emerald-700 bg-emerald-50 p-2.5 rounded-xl border border-emerald-200 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Profile updated successfully!
              </div>
            )}

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="bg-[#E25B38] hover:bg-[#c94929] text-white px-6 py-2.5 rounded-full text-sm font-medium transition-colors shadow-xs"
              >
                Save Changes
              </button>
            </div>
          </form>
        )}

        {activeTab === 'portfolio' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-base font-bold text-stone-900">Your Case Studies & Showcase</h4>
                <p className="text-xs text-stone-500">Showcase your best projects to employers on Dakarlaton</p>
              </div>
              <button
                onClick={() => setIsAddingProject(!isAddingProject)}
                className="bg-[#E25B38] text-white text-xs px-3.5 py-1.5 rounded-full font-medium flex items-center gap-1 hover:bg-[#c94929] transition-colors"
              >
                <Plus className="w-3.5 h-3.5" /> Add Project
              </button>
            </div>

            {isAddingProject && (
              <form onSubmit={handleAddProject} className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-3">
                <h5 className="text-xs font-bold text-stone-900 uppercase tracking-wider">New Portfolio Project</h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Project Title (e.g. Modern Fintech App)"
                    value={newProjTitle}
                    onChange={(e) => setNewProjTitle(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-[#E25B38]"
                  />
                  <input
                    type="text"
                    placeholder="Category (e.g. UI/UX, Branding)"
                    value={newProjCategory}
                    onChange={(e) => setNewProjCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-[#E25B38]"
                  />
                </div>
                <textarea
                  rows={2}
                  required
                  placeholder="Case study description & impact..."
                  value={newProjDesc}
                  onChange={(e) => setNewProjDesc(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-[#E25B38]"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="url"
                    placeholder="Cover Image URL"
                    value={newProjCover}
                    onChange={(e) => setNewProjCover(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-[#E25B38]"
                  />
                  <input
                    type="url"
                    placeholder="Live Link / Dribbble URL"
                    value={newProjUrl}
                    onChange={(e) => setNewProjUrl(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-[#E25B38]"
                  />
                </div>
                <div className="flex justify-end gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setIsAddingProject(false)}
                    className="text-xs text-stone-500 px-3 py-1.5 hover:text-stone-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-[#E25B38] text-white text-xs px-4 py-1.5 rounded-full font-medium"
                  >
                    Save Project
                  </button>
                </div>
              </form>
            )}

            {/* List of existing projects */}
            <div className="space-y-3">
              {user.portfolioProjects && user.portfolioProjects.length > 0 ? (
                user.portfolioProjects.map((p) => (
                  <div
                    key={p.id}
                    className="p-4 rounded-2xl border border-stone-200 bg-white flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={p.coverImage}
                        alt={p.title}
                        referrerPolicy="no-referrer"
                        className="w-16 h-16 rounded-xl object-cover border border-stone-100 shrink-0"
                      />
                      <div>
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-[#E25B38]">
                          {p.category}
                        </span>
                        <h5 className="text-sm font-bold text-stone-900">{p.title}</h5>
                        <p className="text-xs text-stone-500 line-clamp-1 max-w-sm">{p.description}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center">
                      {p.projectUrl && (
                        <a
                          href={p.projectUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                      <button
                        type="button"
                        onClick={() => deletePortfolioProject(p.id)}
                        className="p-2 text-red-400 hover:text-red-600 rounded-lg hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 bg-stone-50 rounded-2xl border border-dashed border-stone-300">
                  <Palette className="w-8 h-8 text-stone-400 mx-auto mb-2" />
                  <p className="text-xs font-semibold text-stone-700">No projects added yet</p>
                  <p className="text-xs text-stone-500 mt-1">Add your best Figma or client case studies to impress hiring teams.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="space-y-6">
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex items-start justify-between gap-4">
              <div>
                <h4 className="text-sm font-bold text-stone-900 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#E25B38]" /> Email Verification Status
                </h4>
                <p className="text-xs text-stone-600 mt-1">
                  {user.emailVerified
                    ? 'Your email address is verified. Your account holds full verified status on Dakarlaton.'
                    : 'Your email address is unverified. Verify now to unlock uninhibited job posting and applications.'}
                </p>
              </div>
              {user.emailVerified ? (
                <span className="text-xs bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full font-semibold shrink-0 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                </span>
              ) : (
                <button
                  onClick={onOpenVerify}
                  className="text-xs bg-amber-600 hover:bg-amber-700 text-white px-3.5 py-1.5 rounded-full font-semibold shrink-0 cursor-pointer shadow-xs"
                >
                  Verify Now
                </button>
              )}
            </div>

            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
              <h4 className="text-sm font-bold text-stone-900">Account Safety & Protection</h4>
              <ul className="text-xs text-stone-600 space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Session Encryption & Client Storage Sandboxing active</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Spam and bot protection enabled on all portfolio contact forms</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Zero commission guarantee for freelance designers</span>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
