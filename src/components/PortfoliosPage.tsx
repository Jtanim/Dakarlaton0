import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { UserProfile, PortfolioProject } from '../types';
import {
  Palette,
  CheckCircle2,
  MapPin,
  ExternalLink,
  DollarSign,
  Plus,
  Sparkles,
  Link2,
  Mail,
  X,
  Search,
  FolderOpen
} from 'lucide-react';

interface PortfoliosPageProps {
  onOpenAuth: () => void;
  onOpenProfile: () => void;
}

export const PortfoliosPage: React.FC<PortfoliosPageProps> = ({ onOpenAuth, onOpenProfile }) => {
  const { designers, user, isAuthenticated } = useAuth();
  const [selectedSkill, setSelectedSkill] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeDesignerModal, setActiveDesignerModal] = useState<UserProfile | null>(null);
  const [activeProjectPreview, setActiveProjectPreview] = useState<PortfolioProject | null>(null);

  const skillsList = ['All', 'UI/UX', 'Design Systems', 'Brand Identity', '3D Design', 'Mobile UI', 'Figma', 'Packaging'];

  const filteredDesigners = designers.filter((des) => {
    const matchesSkill =
      selectedSkill === 'All' ||
      des.skills.some((s) => s.toLowerCase().includes(selectedSkill.toLowerCase()));

    const matchesQuery =
      !searchQuery ||
      des.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      des.headline?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      des.bio?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      des.location?.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesSkill && matchesQuery;
  });

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Header */}
      <section className="pt-10 sm:pt-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#E25B38]/10 text-[#E25B38] text-xs font-semibold uppercase tracking-wider mb-6">
          <Palette className="w-3.5 h-3.5" /> Freelance Designer Showcase
        </div>

        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#1C1917] tracking-tight leading-tight mb-4">
          Discover World-Class <br className="hidden sm:inline" />
          <span className="text-[#1C1917]">Freelance Designers</span>
        </h1>

        <p className="text-base sm:text-lg text-[#57534E] max-w-2xl mx-auto leading-relaxed mb-8">
          Explore curated portfolios, case studies, and UI/UX craftsmanship. Hire top verified freelance talent directly with zero platform fees.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          {isAuthenticated && user?.role === 'designer' ? (
            <button
              onClick={onOpenProfile}
              className="bg-[#E25B38] hover:bg-[#c94929] text-white px-7 py-3 rounded-full font-medium text-sm transition-all shadow-sm flex items-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Manage My Portfolio
            </button>
          ) : (
            <button
              onClick={onOpenAuth}
              className="bg-[#E25B38] hover:bg-[#c94929] text-white px-7 py-3 rounded-full font-medium text-sm transition-all shadow-sm flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" /> Showcase Your Portfolio
            </button>
          )}
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          {/* Search */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search designers or skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-full border border-stone-300 text-xs sm:text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#E25B38]"
            />
          </div>

          {/* Skill chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
            {skillsList.map((skill) => (
              <button
                key={skill}
                onClick={() => setSelectedSkill(skill)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                  selectedSkill === skill
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'bg-white text-stone-600 border border-stone-200 hover:border-stone-400'
                }`}
              >
                {skill}
              </button>
            ))}
          </div>
        </div>

        {/* Designers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDesigners.map((designer) => (
            <div
              key={designer.id}
              className="bg-white rounded-3xl p-6 border border-[#EBE7DF] shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                {/* Designer Profile Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    {designer.avatar ? (
                      <img
                        src={designer.avatar}
                        alt={designer.fullName}
                        referrerPolicy="no-referrer"
                        className="w-14 h-14 rounded-2xl object-cover border border-stone-200 shrink-0"
                      />
                    ) : (
                      <div className="w-14 h-14 rounded-2xl bg-[#E25B38]/15 text-[#E25B38] font-bold text-xl flex items-center justify-center shrink-0">
                        {designer.fullName.charAt(0)}
                      </div>
                    )}
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="text-base font-bold text-[#1C1917]">
                          {designer.fullName}
                        </h3>
                        {designer.emailVerified && (
                          <span title="Verified Designer">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-stone-500 font-medium line-clamp-1">
                        {designer.headline || 'Freelance Designer'}
                      </p>
                      {designer.location && (
                        <p className="text-[11px] text-stone-400 flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3" /> {designer.location}
                        </p>
                      )}
                    </div>
                  </div>

                  {designer.hourlyRate && (
                    <span className="text-xs font-semibold text-[#E25B38] bg-orange-50 px-2.5 py-1 rounded-full whitespace-nowrap">
                      {designer.hourlyRate}
                    </span>
                  )}
                </div>

                <p className="text-xs text-stone-600 leading-relaxed line-clamp-2">
                  {designer.bio || 'Creating thoughtful visual designs and interfaces for forward-thinking brands.'}
                </p>

                {/* Skills Chips */}
                <div className="flex flex-wrap gap-1.5">
                  {designer.skills.slice(0, 4).map((s, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-stone-100 text-stone-700"
                    >
                      {s}
                    </span>
                  ))}
                  {designer.skills.length > 4 && (
                    <span className="text-[11px] font-medium px-1.5 py-0.5 text-stone-400">
                      +{designer.skills.length - 4}
                    </span>
                  )}
                </div>

                {/* Portfolio Project Preview Thumbnails */}
                {designer.portfolioProjects && designer.portfolioProjects.length > 0 && (
                  <div className="space-y-2 pt-2 border-t border-stone-100">
                    <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider block">
                      Featured Case Studies ({designer.portfolioProjects.length})
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      {designer.portfolioProjects.slice(0, 2).map((proj) => (
                        <div
                          key={proj.id}
                          onClick={() => setActiveProjectPreview(proj)}
                          className="group relative rounded-xl overflow-hidden h-24 border border-stone-200 cursor-pointer"
                        >
                          <img
                            src={proj.coverImage}
                            alt={proj.title}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-2">
                            <span className="text-[10px] font-medium text-white line-clamp-1">
                              {proj.title}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => setActiveDesignerModal(designer)}
                  className="w-full bg-[#FAF8F5] hover:bg-[#E25B38] text-stone-800 hover:text-white font-medium py-2 rounded-xl text-xs transition-colors text-center border border-stone-200 hover:border-transparent cursor-pointer"
                >
                  View Full Portfolio
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Full Designer Profile & Portfolio Modal */}
      {activeDesignerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-stone-200 relative max-h-[92vh] overflow-y-auto space-y-6">
            <button
              onClick={() => setActiveDesignerModal(null)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 p-2 rounded-full hover:bg-stone-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header info */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-stone-100 pb-6">
              <div className="flex items-center gap-4">
                {activeDesignerModal.avatar ? (
                  <img
                    src={activeDesignerModal.avatar}
                    alt={activeDesignerModal.fullName}
                    referrerPolicy="no-referrer"
                    className="w-16 h-16 rounded-2xl object-cover border border-stone-200"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-2xl bg-[#E25B38]/15 text-[#E25B38] font-bold text-2xl flex items-center justify-center">
                    {activeDesignerModal.fullName.charAt(0)}
                  </div>
                )}
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold text-[#1C1917]">
                      {activeDesignerModal.fullName}
                    </h3>
                    {activeDesignerModal.emailVerified && (
                      <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full flex items-center gap-1 font-semibold">
                        <CheckCircle2 className="w-3 h-3" /> Verified Designer
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-stone-600 font-medium">
                    {activeDesignerModal.headline}
                  </p>
                  <p className="text-xs text-stone-400 flex items-center gap-1 mt-1">
                    <MapPin className="w-3.5 h-3.5" /> {activeDesignerModal.location}
                  </p>
                </div>
              </div>

              {activeDesignerModal.hourlyRate && (
                <div className="text-right">
                  <span className="text-xs text-stone-400 font-medium block">Rate</span>
                  <span className="text-lg font-bold text-[#E25B38]">
                    {activeDesignerModal.hourlyRate}
                  </span>
                </div>
              )}
            </div>

            {/* Bio */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-2">About</h4>
              <p className="text-sm text-stone-700 leading-relaxed">
                {activeDesignerModal.bio}
              </p>
            </div>

            {/* Social & Portfolio Links */}
            <div className="flex flex-wrap gap-3">
              {activeDesignerModal.website && (
                <a
                  href={activeDesignerModal.website}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs bg-stone-100 hover:bg-stone-200 text-stone-800 px-3 py-1.5 rounded-full flex items-center gap-1.5 font-medium transition-colors"
                >
                  <Link2 className="w-3.5 h-3.5" /> Website <ExternalLink className="w-3 h-3" />
                </a>
              )}
              {activeDesignerModal.dribbble && (
                <a
                  href={activeDesignerModal.dribbble}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs bg-pink-50 hover:bg-pink-100 text-pink-700 px-3 py-1.5 rounded-full flex items-center gap-1.5 font-medium transition-colors"
                >
                  Dribbble <ExternalLink className="w-3 h-3" />
                </a>
              )}
              {activeDesignerModal.behance && (
                <a
                  href={activeDesignerModal.behance}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-1.5 rounded-full flex items-center gap-1.5 font-medium transition-colors"
                >
                  Behance <ExternalLink className="w-3 h-3" />
                </a>
              )}
              {activeDesignerModal.figma && (
                <a
                  href={activeDesignerModal.figma}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs bg-purple-50 hover:bg-purple-100 text-purple-700 px-3 py-1.5 rounded-full flex items-center gap-1.5 font-medium transition-colors"
                >
                  Figma Community <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>

            {/* Portfolio Case Studies */}
            <div className="space-y-4 pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400">
                Portfolio Projects & Case Studies ({activeDesignerModal.portfolioProjects?.length || 0})
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {activeDesignerModal.portfolioProjects && activeDesignerModal.portfolioProjects.length > 0 ? (
                  activeDesignerModal.portfolioProjects.map((p) => (
                    <div
                      key={p.id}
                      className="bg-stone-50 rounded-2xl overflow-hidden border border-stone-200 flex flex-col"
                    >
                      <div className="h-44 overflow-hidden relative">
                        <img
                          src={p.coverImage}
                          alt={p.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover hover:scale-105 transition-transform"
                        />
                        <span className="absolute top-2 left-2 text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-black/60 text-white backdrop-blur-xs">
                          {p.category}
                        </span>
                      </div>
                      <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                        <div>
                          <h5 className="text-sm font-bold text-[#1C1917]">{p.title}</h5>
                          <p className="text-xs text-stone-600 line-clamp-2 mt-1">{p.description}</p>
                        </div>
                        {p.projectUrl && (
                          <div className="pt-2">
                            <a
                              href={p.projectUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-xs font-semibold text-[#E25B38] hover:underline inline-flex items-center gap-1"
                            >
                              View Live Project <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-2 text-center py-6 bg-stone-50 rounded-2xl">
                    <p className="text-xs text-stone-500">No public case studies uploaded yet.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Contact Action */}
            <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
              <span className="text-xs text-stone-500">Direct Inquiries</span>
              <a
                href={`mailto:${activeDesignerModal.email}?subject=Collaboration Inquiry via Dakarlaton`}
                className="bg-[#E25B38] hover:bg-[#c94929] text-white px-6 py-2.5 rounded-full text-xs font-semibold shadow-xs flex items-center gap-2"
              >
                <Mail className="w-3.5 h-3.5" /> Send Project Inquiry
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Single Project Preview Modal */}
      {activeProjectPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border border-stone-200 relative">
            <button
              onClick={() => setActiveProjectPreview(null)}
              className="absolute top-4 right-4 z-10 bg-black/40 text-white hover:bg-black/60 p-2 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <img
              src={activeProjectPreview.coverImage}
              alt={activeProjectPreview.title}
              referrerPolicy="no-referrer"
              className="w-full h-64 object-cover"
            />

            <div className="p-6 space-y-3">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-orange-50 text-[#E25B38] uppercase">
                {activeProjectPreview.category}
              </span>
              <h3 className="text-xl font-bold text-[#1C1917]">{activeProjectPreview.title}</h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {activeProjectPreview.description}
              </p>

              {activeProjectPreview.tags && (
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {activeProjectPreview.tags.map((t, i) => (
                    <span key={i} className="text-[11px] bg-stone-100 text-stone-700 px-2 py-0.5 rounded-md font-medium">
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
