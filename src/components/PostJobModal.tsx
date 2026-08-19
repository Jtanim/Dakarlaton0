import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { JobListing } from '../types';
import {
  X,
  Briefcase,
  CheckCircle2,
  ArrowRight,
  MapPin,
  DollarSign,
  Plus,
  Tag,
  Search,
  ChevronDown
} from 'lucide-react';

interface PostJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenVerify: () => void;
  onOpenAuth: () => void;
  onViewCreatedJob?: (job: JobListing) => void;
}

// GCC Locations List
const GCC_LOCATIONS = [
  {
    group: 'Saudi Arabia (KSA)',
    cities: [
      'Riyadh, Saudi Arabia',
      'Jeddah, Saudi Arabia',
      'Dammam / Khobar, Saudi Arabia',
      'Mecca, Saudi Arabia',
      'Medina, Saudi Arabia',
      'Neom, Saudi Arabia',
      'Tabuk, Saudi Arabia',
      'Jubail, Saudi Arabia',
      'Abha / Asir, Saudi Arabia',
      'Yanbu, Saudi Arabia',
    ],
  },
  {
    group: 'United Arab Emirates (UAE)',
    cities: [
      'Dubai, UAE',
      'Abu Dhabi, UAE',
      'Sharjah, UAE',
      'Ajman, UAE',
      'Ras Al Khaimah, UAE',
    ],
  },
  {
    group: 'Qatar',
    cities: ['Doha, Qatar', 'Lusail, Qatar', 'Al Wakrah, Qatar'],
  },
  {
    group: 'Kuwait',
    cities: [
      'Kuwait City, Kuwait',
      'Hawalli, Kuwait',
      'Salmiya, Kuwait',
      'Al Ahmadi, Kuwait',
    ],
  },
  {
    group: 'Bahrain',
    cities: ['Manama, Bahrain', 'Riffa, Bahrain', 'Muharraq, Bahrain'],
  },
  {
    group: 'Oman',
    cities: ['Muscat, Oman', 'Salalah, Oman', 'Sohar, Oman'],
  },
  {
    group: 'Remote & GCC-wide',
    cities: [
      'Remote (GCC / Middle East)',
      'Remote (Worldwide)',
      'Remote (Saudi Arabia)',
      'Remote (UAE)',
    ],
  },
];

// Predefined Monthly Salaries
const MONTHLY_SALARY_PRESETS = [
  'SAR 4,000 - SAR 6,000 / month',
  'SAR 6,000 - SAR 9,000 / month',
  'SAR 9,000 - SAR 14,000 / month',
  'SAR 14,000 - SAR 20,000 / month',
  'SAR 20,000 - SAR 30,000+ / month',
  'AED 6,000 - AED 10,000 / month',
  'AED 10,000 - AED 16,000 / month',
  'AED 16,000 - AED 25,000 / month',
  'QAR 7,000 - QAR 12,000 / month',
  'QAR 12,000 - QAR 20,000 / month',
  'KWD 600 - KWD 1,200 / month',
  'KWD 1,200 - KWD 2,000 / month',
  'BHD 700 - BHD 1,500 / month',
  'OMR 700 - OMR 1,500 / month',
  '$2,500 - $4,500 / month',
  '$4,500 - $7,500 / month',
  '$7,500 - $12,000+ / month',
  'Custom Monthly Salary',
];

// Curated Skills List for CAD, Engineering, Design & Tech
const AVAILABLE_SKILLS = [
  'AutoCAD',
  'Revit',
  'Navisworks',
  'Civil 3D',
  '3ds Max',
  'SolidWorks',
  'BIM Modeling',
  'Shop Drawings',
  'Architectural Drafting',
  'Structural Drafting',
  'SketchUp',
  'Rhino 3D',
  'Lumion',
  'V-Ray',
  'Figma',
  'UI/UX Design',
  'Design Systems',
  'Product Design',
  'Brand Identity',
  'Adobe Photoshop',
  'Adobe Illustrator',
  'Adobe InDesign',
  'Packaging Design',
  '3D Visualization',
  'Interior Design',
  'Quantity Surveying',
  'Site Supervision',
  'React',
  'TypeScript',
  'Tailwind CSS',
];

export const PostJobModal: React.FC<PostJobModalProps> = ({
  isOpen,
  onClose,
  onOpenVerify,
  onOpenAuth,
  onViewCreatedJob,
}) => {
  const { user, postJob } = useAuth();

  const [title, setTitle] = useState('');
  const [company, setCompany] = useState(user?.companyName || '');
  const [category, setCategory] = useState('Engineering');
  const [type, setType] = useState<
    'Full-time' | 'Part-time' | 'Contract' | 'Freelance'
  >('Full-time');
  const [workplaceType, setWorkplaceType] = useState<
    'Remote' | 'Hybrid' | 'On-site'
  >('On-site');

  // Location State
  const [location, setLocation] = useState('Riyadh, Saudi Arabia');
  const [isCustomLocation, setIsCustomLocation] = useState(false);
  const [customLocationText, setCustomLocationText] = useState('');

  // Salary State
  const [salaryPreset, setSalaryPreset] = useState(
    'SAR 6,000 - SAR 9,000 / month'
  );
  const [customSalaryText, setCustomSalaryText] = useState('');

  // Skills / Tags State
  const [selectedTags, setSelectedTags] = useState<string[]>([
    'AutoCAD',
    'Revit',
    'Drafting',
  ]);
  const [skillSearchQuery, setSkillSearchQuery] = useState('');
  const [isSkillDropdownOpen, setIsSkillDropdownOpen] = useState(false);

  const [description, setDescription] = useState('');
  const [responsibilitiesText, setResponsibilitiesText] = useState(
    'Strong proficiency in AutoCAD / BIM drafting software\nExperience in preparing technical and shop drawings\nAbility to coordinate architectural and structural plans\nCollaborate closely with project and site engineers'
  );
  const [requirementsText, setRequirementsText] = useState(
    'Proven experience as a draftsman/draftswoman or engineer in GCC\nStrong portfolio showcasing relevant drawings and projects\nExcellent attention to detail and construction codes'
  );

  const [contactEmail, setContactEmail] = useState(user?.email || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdJob, setCreatedJob] = useState<JobListing | null>(null);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  // Handle Tag Selection / Removal
  const addTag = (tag: string) => {
    const trimmed = tag.trim();
    if (trimmed && !selectedTags.includes(trimmed)) {
      setSelectedTags([...selectedTags, trimmed]);
    }
    setSkillSearchQuery('');
    setIsSkillDropdownOpen(false);
  };

  const removeTag = (tagToRemove: string) => {
    setSelectedTags(selectedTags.filter((t) => t !== tagToRemove));
  };

  const handleCustomSkillKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (skillSearchQuery.trim()) {
        addTag(skillSearchQuery);
      }
    }
  };

  // Filter skills based on user search
  const filteredSkills = AVAILABLE_SKILLS.filter(
    (s) =>
      s.toLowerCase().includes(skillSearchQuery.toLowerCase()) &&
      !selectedTags.includes(s)
  );

  const finalSalary =
    salaryPreset === 'Custom Monthly Salary'
      ? customSalaryText.trim() || 'SAR 8,000 / month'
      : salaryPreset;

  const finalLocation = isCustomLocation
    ? customLocationText.trim() || 'Riyadh, Saudi Arabia'
    : location;

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

    const res = await postJob({
      title: title.trim(),
      company: company.trim(),
      category,
      type,
      location: finalLocation,
      workplaceType,
      salary: finalSalary,
      description:
        description.trim() ||
        `Exciting opportunity at ${company} for a skilled ${title}.`,
      aboutRole:
        description.trim() ||
        `We are looking for a dedicated ${title} to join our team at ${company}.`,
      responsibilities:
        responsibilities.length > 0
          ? responsibilities
          : ['Execute project deliverables with accuracy and high standards.'],
      requirements:
        requirements.length > 0
          ? requirements
          : ['Proven technical drafting/design experience and strong portfolio.'],
      benefits: [
        'Competitive monthly compensation',
        'Direct project ownership',
        'Collaborative team environment',
      ],
      tags:
        selectedTags.length > 0
          ? selectedTags
          : [category, type, workplaceType],
      employerId: user?.id || 'emp-direct',
      contactEmail: contactEmail.trim(),
    });

    setIsSubmitting(false);

    if (res.success && res.job) {
      setCreatedJob(res.job);
    } else if (res.success) {
      setCreatedJob({
        id: `job-${Date.now()}`,
        title,
        company,
        category,
        type,
        workplaceType,
        location: finalLocation,
        salary: finalSalary,
        description,
        aboutRole: description,
        responsibilities,
        requirements,
        tags: selectedTags,
        postedAt: 'Just now',
        postedDate: new Date().toISOString().split('T')[0],
        employerId: user?.id || 'emp-direct',
        applicantCount: 0,
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
                Your role{' '}
                <span className="font-bold text-[#1C1917]">
                  "{createdJob.title}"
                </span>{' '}
                at{' '}
                <span className="font-bold text-[#1C1917]">
                  {createdJob.company}
                </span>{' '}
                is now live and accepting applications.
              </p>
            </div>

            {/* Quick summary preview card */}
            <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 text-left max-w-md mx-auto space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#E25B38] bg-orange-50 px-2.5 py-0.5 rounded-full">
                  {createdJob.category}
                </span>
                <span className="text-xs text-stone-500 font-medium">
                  {createdJob.type}
                </span>
              </div>
              <h4 className="text-base font-bold text-stone-900">
                {createdJob.title}
              </h4>
              <p className="text-xs text-stone-600 flex items-center justify-between pt-1 border-t border-stone-200">
                <span>
                  {createdJob.company} • {createdJob.location}
                </span>
                <span className="font-bold text-emerald-700">
                  {createdJob.salary}
                </span>
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
                className="text-stone-500 hover:text-stone-800 text-xs px-3 py-2 cursor-pointer"
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
              <h3 className="text-2xl font-serif font-bold text-[#1C1917]">
                Post a New Role
              </h3>
              <p className="text-xs sm:text-sm text-stone-600">
                Reach thousands of verified candidates, engineers, architects,
                and freelance designers across the GCC.
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
                    <option value="Engineering">Engineering</option>
                    <option value="Architecture & 3D">Architecture & 3D</option>
                    <option value="Design">Design</option>
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
                    }}
                    className="w-full px-3 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#E25B38] focus:border-[#E25B38] bg-white"
                  >
                    <option value="On-site">On-site</option>
                    <option value="Remote">Remote</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>
              </div>

              {/* Location Dropdown for GCC Countries & Cities */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                    Location / GCC Region *
                  </label>
                  {!isCustomLocation ? (
                    <div className="space-y-1.5">
                      <select
                        value={location}
                        onChange={(e) => {
                          if (e.target.value === 'CUSTOM_LOCATION') {
                            setIsCustomLocation(true);
                          } else {
                            setLocation(e.target.value);
                          }
                        }}
                        className="w-full px-3 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#E25B38] focus:border-[#E25B38] bg-white"
                      >
                        {GCC_LOCATIONS.map((group) => (
                          <optgroup key={group.group} label={group.group}>
                            {group.cities.map((city) => (
                              <option key={city} value={city}>
                                {city}
                              </option>
                            ))}
                          </optgroup>
                        ))}
                        <option value="CUSTOM_LOCATION">
                          + Enter Custom City / Region...
                        </option>
                      </select>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="e.g. Al Khobar, Saudi Arabia"
                        value={customLocationText}
                        onChange={(e) => setCustomLocationText(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#E25B38] focus:border-[#E25B38]"
                      />
                      <button
                        type="button"
                        onClick={() => setIsCustomLocation(false)}
                        className="text-xs text-stone-500 hover:text-stone-800 underline whitespace-nowrap"
                      >
                        Choose from list
                      </button>
                    </div>
                  )}
                </div>

                {/* Monthly Salary Dropdown & Custom Field */}
                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                    Monthly Salary / Compensation *
                  </label>
                  <select
                    value={salaryPreset}
                    onChange={(e) => setSalaryPreset(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#E25B38] focus:border-[#E25B38] bg-white"
                  >
                    {MONTHLY_SALARY_PRESETS.map((preset) => (
                      <option key={preset} value={preset}>
                        {preset}
                      </option>
                    ))}
                  </select>

                  {salaryPreset === 'Custom Monthly Salary' && (
                    <div className="mt-2">
                      <input
                        type="text"
                        required
                        placeholder="e.g. SAR 8,500 - SAR 12,000 / month"
                        value={customSalaryText}
                        onChange={(e) => setCustomSalaryText(e.target.value)}
                        className="w-full px-4 py-2 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#E25B38] focus:border-[#E25B38]"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                  About the Role & Overview *
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe the opportunity, key scope, project background, and objectives..."
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

              {/* Skills / Tags Dropdown & Multi-Select */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider">
                  Skills & Technical Tags (Select from dropdown or add custom)
                </label>

                {/* Selected Tags Chips */}
                <div className="flex flex-wrap gap-1.5 min-h-[32px] p-2 bg-stone-50 border border-stone-200 rounded-xl">
                  {selectedTags.length > 0 ? (
                    selectedTags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 bg-white border border-stone-300 text-stone-800 text-xs px-2.5 py-1 rounded-lg font-medium shadow-2xs"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="text-stone-400 hover:text-red-500 rounded-full cursor-pointer ml-0.5"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-stone-400 py-1 px-1">
                      No tags selected. Choose from dropdown below.
                    </span>
                  )}
                </div>

                {/* Dropdown search & popular skills selector */}
                <div className="relative">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                      <input
                        type="text"
                        placeholder="Search skill (e.g. AutoCAD, Revit, Figma) or type custom tag..."
                        value={skillSearchQuery}
                        onChange={(e) => {
                          setSkillSearchQuery(e.target.value);
                          setIsSkillDropdownOpen(true);
                        }}
                        onFocus={() => setIsSkillDropdownOpen(true)}
                        onKeyDown={handleCustomSkillKeyDown}
                        className="w-full pl-9 pr-8 py-2.5 rounded-xl border border-stone-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#E25B38]"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setIsSkillDropdownOpen(!isSkillDropdownOpen)
                        }
                        className="absolute right-2.5 top-2.5 text-stone-400 hover:text-stone-700"
                      >
                        <ChevronDown className="w-4 h-4" />
                      </button>
                    </div>

                    {skillSearchQuery.trim() && (
                      <button
                        type="button"
                        onClick={() => addTag(skillSearchQuery)}
                        className="bg-stone-900 text-white text-xs px-3.5 py-2.5 rounded-xl font-medium flex items-center gap-1 hover:bg-stone-800 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add
                      </button>
                    )}
                  </div>

                  {/* Dropdown options list */}
                  {isSkillDropdownOpen && (
                    <div className="absolute z-20 top-full left-0 right-0 mt-1 bg-white border border-stone-200 rounded-2xl shadow-xl max-h-48 overflow-y-auto p-2 space-y-1 animate-in fade-in duration-150">
                      <div className="text-[10px] uppercase font-bold text-stone-400 px-2 py-1">
                        Select a skill to add:
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-1">
                        {filteredSkills.slice(0, 15).map((skill) => (
                          <button
                            key={skill}
                            type="button"
                            onClick={() => addTag(skill)}
                            className="text-left text-xs text-stone-700 hover:bg-orange-50 hover:text-[#E25B38] px-2.5 py-1.5 rounded-lg font-medium transition-colors cursor-pointer flex items-center justify-between"
                          >
                            <span>{skill}</span>
                            <Plus className="w-3 h-3 opacity-50" />
                          </button>
                        ))}
                      </div>
                      {filteredSkills.length === 0 && (
                        <div className="text-xs text-stone-500 p-2 text-center">
                          No matching skills. Press Enter to add "{skillSearchQuery}".
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                  Contact / Applications Email *
                </label>
                <input
                  type="email"
                  required
                  placeholder="career@mascofuture.com"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#E25B38] focus:border-[#E25B38]"
                />
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
