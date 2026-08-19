import React, { useState } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  LineChart,
  Line,
  Area,
  AreaChart
} from 'recharts';
import {
  TrendingUp,
  DollarSign,
  Briefcase,
  MapPin,
  Calculator,
  Info,
  Sparkles,
  ChevronRight,
  ArrowUpRight
} from 'lucide-react';

interface RoleBenchmark {
  role: string;
  category: string;
  juniorSAR: number;
  midSAR: number;
  seniorSAR: number;
  hourlyUSD: string;
  demandGrowth: string;
  keySkills: string[];
}

const BENCHMARK_DATA: RoleBenchmark[] = [
  {
    role: 'AutoCAD Draftsman / 2D/3D',
    category: 'Engineering & CAD',
    juniorSAR: 5500,
    midSAR: 9500,
    seniorSAR: 15500,
    hourlyUSD: '$35 - $60 / hr',
    demandGrowth: '+28%',
    keySkills: ['AutoCAD', 'Shop Drawings', 'As-Built Drawings', 'Codes']
  },
  {
    role: 'BIM / Revit Modeler',
    category: 'Engineering & CAD',
    juniorSAR: 7000,
    midSAR: 12500,
    seniorSAR: 19500,
    hourlyUSD: '$45 - $80 / hr',
    demandGrowth: '+35%',
    keySkills: ['Revit', 'Navisworks', 'BIM LOD 300-500', 'Clash Detection']
  },
  {
    role: 'Architectural 3D Visualizer',
    category: 'Architecture & 3D',
    juniorSAR: 6000,
    midSAR: 11000,
    seniorSAR: 18000,
    hourlyUSD: '$40 - $75 / hr',
    demandGrowth: '+22%',
    keySkills: ['3ds Max', 'V-Ray', 'Lumion', 'Corona', 'SketchUp']
  },
  {
    role: 'Senior UI/UX Product Designer',
    category: 'Digital & UI/UX',
    juniorSAR: 8000,
    midSAR: 14500,
    seniorSAR: 24000,
    hourlyUSD: '$55 - $95 / hr',
    demandGrowth: '+30%',
    keySkills: ['Figma', 'Design Systems', 'User Research', 'Prototyping']
  },
  {
    role: 'Brand & Visual Identity Designer',
    category: 'Brand & Creative',
    juniorSAR: 5000,
    midSAR: 9500,
    seniorSAR: 16000,
    hourlyUSD: '$35 - $65 / hr',
    demandGrowth: '+18%',
    keySkills: ['Illustrator', 'Photoshop', 'Brand Strategy', 'Guidelines']
  },
  {
    role: 'Frontend / Web Developer',
    category: 'Tech & Development',
    juniorSAR: 7500,
    midSAR: 13500,
    seniorSAR: 22000,
    hourlyUSD: '$50 - $90 / hr',
    demandGrowth: '+26%',
    keySkills: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js']
  }
];

const HISTORICAL_TRENDS = [
  { year: '2023 Q1', CAD: 7800, BIM: 9200, UIUX: 11500, Arch3D: 8500 },
  { year: '2023 Q3', CAD: 8200, BIM: 10100, UIUX: 12200, Arch3D: 9000 },
  { year: '2024 Q1', CAD: 8700, BIM: 11000, UIUX: 13100, Arch3D: 9600 },
  { year: '2024 Q3', CAD: 9100, BIM: 11800, UIUX: 13900, Arch3D: 10300 },
  { year: '2025 Q1', CAD: 9500, BIM: 12500, UIUX: 14800, Arch3D: 11000 },
  { year: '2026 Est', CAD: 10200, BIM: 13600, UIUX: 15900, Arch3D: 11800 }
];

const CURRENCY_MULTIPLIERS: Record<string, { label: string; rate: number; symbol: string }> = {
  SAR: { label: 'Saudi Riyal (SAR)', rate: 1, symbol: 'SAR' },
  AED: { label: 'UAE Dirham (AED)', rate: 0.98, symbol: 'AED' },
  QAR: { label: 'Qatari Riyal (QAR)', rate: 0.97, symbol: 'QAR' },
  KWD: { label: 'Kuwaiti Dinar (KWD)', rate: 0.082, symbol: 'KWD' },
  BHD: { label: 'Bahraini Dinar (BHD)', rate: 0.1, symbol: 'BHD' },
  OMR: { label: 'Omani Rial (OMR)', rate: 0.103, symbol: 'OMR' },
  USD: { label: 'US Dollar (USD)', rate: 0.27, symbol: '$' }
};

export const GccSalaryTrends: React.FC = () => {
  const [selectedCurrency, setSelectedCurrency] = useState<string>('SAR');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeTab, setActiveTab] = useState<'salary' | 'growth' | 'calculator'>('salary');

  // Interactive rate calculator states
  const [calcRole, setCalcRole] = useState(BENCHMARK_DATA[0].role);
  const [calcExperience, setCalcExperience] = useState<'junior' | 'mid' | 'senior'>('mid');
  const [calcHoursPerWeek, setCalcHoursPerWeek] = useState(30);

  const curr = CURRENCY_MULTIPLIERS[selectedCurrency] || CURRENCY_MULTIPLIERS.SAR;

  const filteredRoles =
    selectedCategory === 'All'
      ? BENCHMARK_DATA
      : BENCHMARK_DATA.filter((r) => r.category === selectedCategory);

  const chartData = filteredRoles.map((r) => ({
    name: r.role.length > 20 ? r.role.slice(0, 18) + '...' : r.role,
    fullName: r.role,
    Junior: Math.round(r.juniorSAR * curr.rate),
    Mid: Math.round(r.midSAR * curr.rate),
    Senior: Math.round(r.seniorSAR * curr.rate),
    hourlyUSD: r.hourlyUSD,
    demand: r.demandGrowth
  }));

  // Calculate estimated freelancer project/monthly rate
  const selectedRoleObj = BENCHMARK_DATA.find((r) => r.role === calcRole) || BENCHMARK_DATA[0];
  const baseMonthlySAR =
    calcExperience === 'junior'
      ? selectedRoleObj.juniorSAR
      : calcExperience === 'mid'
      ? selectedRoleObj.midSAR
      : selectedRoleObj.seniorSAR;

  const convertedMonthly = Math.round(baseMonthlySAR * curr.rate);
  const estimatedHourly = Math.round((baseMonthlySAR / 160) * curr.rate * 1.25); // Freelance multiplier for overhead/taxes

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EBE7DF] shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-100 pb-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E25B38]/10 text-[#E25B38] text-xs font-semibold uppercase tracking-wider">
            <TrendingUp className="w-3.5 h-3.5" /> GCC Market Intelligence
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1C1917]">
            GCC Salary & Freelance Rate Trends
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 max-w-2xl">
            Real-world compensation benchmarks across Saudi Arabia, UAE, Qatar, Kuwait, Bahrain & Oman to help freelancers and employers price projects competitively.
          </p>
        </div>

        {/* Currency Selector */}
        <div className="flex items-center gap-2">
          <label className="text-xs font-semibold text-stone-600 whitespace-nowrap">
            Currency:
          </label>
          <select
            value={selectedCurrency}
            onChange={(e) => setSelectedCurrency(e.target.value)}
            className="px-3 py-2 rounded-xl border border-stone-300 text-xs font-bold text-[#1C1917] bg-stone-50 focus:outline-none focus:ring-2 focus:ring-[#E25B38]"
          >
            {Object.entries(CURRENCY_MULTIPLIERS).map(([code, { label }]) => (
              <option key={code} value={code}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setActiveTab('salary')}
          className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
            activeTab === 'salary'
              ? 'bg-stone-900 text-white shadow-xs'
              : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
          }`}
        >
          Monthly Salary Tiers
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('growth')}
          className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
            activeTab === 'growth'
              ? 'bg-stone-900 text-white shadow-xs'
              : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
          }`}
        >
          YoY Rate Trajectory (2023-2026)
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('calculator')}
          className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'calculator'
              ? 'bg-[#E25B38] text-white shadow-xs'
              : 'bg-orange-50 text-[#E25B38] hover:bg-orange-100'
          }`}
        >
          <Calculator className="w-3.5 h-3.5" /> Rate Estimator Calculator
        </button>
      </div>

      {/* Tab 1: Monthly Salary Tiers Chart */}
      {activeTab === 'salary' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
              Comparing Junior, Mid-Level, and Senior Monthly Rates ({curr.symbol})
            </span>
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-stone-500 font-medium">Filter Domain:</span>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-2.5 py-1 rounded-lg border border-stone-300 text-xs bg-white text-stone-800 focus:outline-none"
              >
                <option value="All">All Disciplines</option>
                <option value="Engineering & CAD">Engineering & CAD</option>
                <option value="Architecture & 3D">Architecture & 3D</option>
                <option value="Digital & UI/UX">Digital & UI/UX</option>
                <option value="Brand & Creative">Brand & Creative</option>
                <option value="Tech & Development">Tech & Development</option>
              </select>
            </div>
          </div>

          {/* Recharts Bar Chart */}
          <div className="w-full h-80 sm:h-96 pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 20, right: 20, left: 10, bottom: 40 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f0ea" />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 11, fill: '#57534e' }}
                  angle={-15}
                  textAnchor="end"
                  interval={0}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: '#57534e' }}
                  tickFormatter={(val) => `${val.toLocaleString()} ${curr.symbol}`}
                />
                <Tooltip
                  formatter={(value: any, name: any) => [
                    `${Number(value).toLocaleString()} ${curr.symbol} / month`,
                    `${name} Level`
                  ]}
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    borderRadius: '16px',
                    borderColor: '#e7e5e4',
                    boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                    fontSize: '12px'
                  }}
                />
                <Legend
                  wrapperStyle={{ paddingTop: '20px', fontSize: '12px' }}
                />
                <Bar
                  dataKey="Junior"
                  name="Junior (1-2 yrs)"
                  fill="#FDBA74"
                  radius={[6, 6, 0, 0]}
                />
                <Bar
                  dataKey="Mid"
                  name="Mid-Level (3-5 yrs)"
                  fill="#FB923C"
                  radius={[6, 6, 0, 0]}
                />
                <Bar
                  dataKey="Senior"
                  name="Senior / Lead (5+ yrs)"
                  fill="#E25B38"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Quick Insights Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-1">
              <span className="text-[11px] font-bold uppercase text-stone-500 tracking-wider">
                Fastest Growing Role
              </span>
              <h4 className="text-base font-bold text-stone-900">BIM / Revit Modeler</h4>
              <p className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                <ArrowUpRight className="w-3.5 h-3.5" /> +35% YoY demand surge (Neom & KSA Giga-projects)
              </p>
            </div>

            <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-1">
              <span className="text-[11px] font-bold uppercase text-stone-500 tracking-wider">
                Highest Senior Ceiling
              </span>
              <h4 className="text-base font-bold text-stone-900">Senior UI/UX Product Lead</h4>
              <p className="text-xs text-stone-600">
                Averages <span className="font-bold text-stone-900">24,000 SAR/mo</span> (AED 23,500/mo) for fintech & platform scale.
              </p>
            </div>

            <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-1">
              <span className="text-[11px] font-bold uppercase text-stone-500 tracking-wider">
                Volume High-Demand
              </span>
              <h4 className="text-base font-bold text-stone-900">AutoCAD Draftsman</h4>
              <p className="text-xs text-stone-600">
                Steady contracts across Riyadh, Dammam, and Dubai construction engineering.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Historical Growth & Demand Trajectory */}
      {activeTab === 'growth' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="space-y-1">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block">
              Average Mid-Level Monthly Compensation Trajectory ({curr.symbol})
            </span>
            <p className="text-xs text-stone-600">
              Tracking average rate expansion driven by construction giga-projects, digital transformation, and regional headquarters programs in Riyadh & Dubai.
            </p>
          </div>

          <div className="w-full h-80 sm:h-96 pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={HISTORICAL_TRENDS.map((h) => ({
                  year: h.year,
                  CAD: Math.round(h.CAD * curr.rate),
                  BIM: Math.round(h.BIM * curr.rate),
                  UIUX: Math.round(h.UIUX * curr.rate),
                  Arch3D: Math.round(h.Arch3D * curr.rate)
                }))}
                margin={{ top: 20, right: 20, left: 10, bottom: 20 }}
              >
                <defs>
                  <linearGradient id="colorUiux" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#E25B38" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#E25B38" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorBim" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0284c7" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#0284c7" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f0ea" />
                <XAxis dataKey="year" tick={{ fontSize: 11, fill: '#57534e' }} />
                <YAxis
                  tick={{ fontSize: 11, fill: '#57534e' }}
                  tickFormatter={(val) => `${val.toLocaleString()} ${curr.symbol}`}
                />
                <Tooltip
                  formatter={(value: any, name: any) => [
                    `${Number(value).toLocaleString()} ${curr.symbol} / mo`,
                    name
                  ]}
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    borderRadius: '16px',
                    borderColor: '#e7e5e4',
                    boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                    fontSize: '12px'
                  }}
                />
                <Legend wrapperStyle={{ paddingTop: '15px', fontSize: '12px' }} />
                <Area
                  type="monotone"
                  dataKey="UIUX"
                  name="UI/UX Product Design"
                  stroke="#E25B38"
                  fillOpacity={1}
                  fill="url(#colorUiux)"
                  strokeWidth={2.5}
                />
                <Area
                  type="monotone"
                  dataKey="BIM"
                  name="BIM & Revit Engineering"
                  stroke="#0284c7"
                  fillOpacity={1}
                  fill="url(#colorBim)"
                  strokeWidth={2.5}
                />
                <Line
                  type="monotone"
                  dataKey="Arch3D"
                  name="Architectural 3D Vis"
                  stroke="#10b981"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="CAD"
                  name="AutoCAD Drafting"
                  stroke="#8b5cf6"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Tab 3: Interactive Freelancer Rate Estimator */}
      {activeTab === 'calculator' && (
        <div className="bg-[#FAF8F5] rounded-2xl p-6 border border-[#EBE7DF] space-y-6 animate-in fade-in duration-200">
          <div className="max-w-xl">
            <h3 className="text-lg font-bold text-stone-900 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-[#E25B38]" /> Smart Rate Estimator
            </h3>
            <p className="text-xs text-stone-600 mt-1">
              Calculate your suggested freelance quote and monthly retainer based on GCC regional averages.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                Your Role
              </label>
              <select
                value={calcRole}
                onChange={(e) => setCalcRole(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-stone-300 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-[#E25B38]"
              >
                {BENCHMARK_DATA.map((r) => (
                  <option key={r.role} value={r.role}>
                    {r.role}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                Experience Level
              </label>
              <select
                value={calcExperience}
                onChange={(e) => setCalcExperience(e.target.value as any)}
                className="w-full px-3 py-2.5 rounded-xl border border-stone-300 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-[#E25B38]"
              >
                <option value="junior">Junior (1 - 2 years)</option>
                <option value="mid">Mid-Level (3 - 5 years)</option>
                <option value="senior">Senior / Lead (5+ years)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                Weekly Engagement: {calcHoursPerWeek} hrs/wk
              </label>
              <input
                type="range"
                min="10"
                max="40"
                step="5"
                value={calcHoursPerWeek}
                onChange={(e) => setCalcHoursPerWeek(Number(e.target.value))}
                className="w-full mt-2 accent-[#E25B38]"
              />
            </div>
          </div>

          {/* Results Display Card */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200 grid grid-cols-1 sm:grid-cols-3 gap-6 shadow-xs">
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">
                Suggested Hourly Rate
              </span>
              <div className="text-2xl sm:text-3xl font-bold font-serif text-[#E25B38]">
                {estimatedHourly.toLocaleString()} {curr.symbol} <span className="text-xs font-sans text-stone-500">/ hr</span>
              </div>
              <p className="text-[11px] text-stone-500">
                Recommended for hourly milestones and sprint contracts.
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">
                Monthly Retainer Benchmark
              </span>
              <div className="text-2xl sm:text-3xl font-bold font-serif text-[#1C1917]">
                {Math.round(estimatedHourly * calcHoursPerWeek * 4.2).toLocaleString()} {curr.symbol}
              </div>
              <p className="text-[11px] text-stone-500">
                Based on {calcHoursPerWeek} hrs/week dedication across 1 month.
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">
                Key Market In-Demand Skills
              </span>
              <div className="flex flex-wrap gap-1 pt-1">
                {selectedRoleObj.keySkills.map((sk) => (
                  <span
                    key={sk}
                    className="text-[11px] px-2 py-0.5 rounded-md bg-stone-100 text-stone-700 font-medium"
                  >
                    {sk}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
