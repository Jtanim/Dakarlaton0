import React, { useState } from 'react';
import { X, ShieldCheck, FileText, Lock, Globe, Mail, CheckCircle2, ChevronRight, Scale } from 'lucide-react';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'privacy' | 'terms';
}

export const LegalModal: React.FC<LegalModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'privacy',
}) => {
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms'>(initialTab);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-stone-200 relative max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-200 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#FAF8F5] border border-[#EBE7DF] text-[#E25B38] flex items-center justify-center font-bold">
              {activeTab === 'privacy' ? <ShieldCheck className="w-5 h-5" /> : <Scale className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#1C1917]">
                {activeTab === 'privacy' ? 'Privacy Policy' : 'Terms of Service'}
              </h3>
              <p className="text-xs text-stone-500">
                Last updated: August 2026 • Dakarlaton Platform (dakarlaton.com)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-stone-400 hover:text-stone-700 p-2 rounded-full hover:bg-stone-100 transition-colors cursor-pointer"
            aria-label="Close legal modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex bg-[#FAF8F5] p-1 rounded-2xl my-4 border border-[#EBE7DF] shrink-0 text-xs sm:text-sm font-medium">
          <button
            type="button"
            onClick={() => setActiveTab('privacy')}
            className={`flex-1 py-2 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'privacy'
                ? 'bg-white text-[#1C1917] shadow-xs font-bold border border-stone-200'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-[#E25B38]" />
            Privacy Policy
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('terms')}
            className={`flex-1 py-2 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'terms'
                ? 'bg-white text-[#1C1917] shadow-xs font-bold border border-stone-200'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <FileText className="w-4 h-4 text-[#E25B38]" />
            Terms of Service
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto pr-2 space-y-6 text-sm text-[#57534E] leading-relaxed flex-1">
          {activeTab === 'privacy' ? (
            <div className="space-y-6">
              {/* Introduction */}
              <section className="bg-[#FAF8F5] p-4 sm:p-5 rounded-2xl border border-[#EBE7DF]">
                <h4 className="text-base font-bold text-[#1C1917] mb-2 flex items-center gap-2">
                  <Lock className="w-4 h-4 text-[#E25B38]" /> 1. Commitment to Your Privacy
                </h4>
                <p>
                  At <strong>Dakarlaton</strong> (accessible at{' '}
                  <a href="https://dakarlaton.com" className="text-[#E25B38] underline font-medium">
                    https://dakarlaton.com
                  </a>
                  ), we prioritize the confidentiality and protection of personal and professional data for freelance designers, engineers, architects, and hiring employers across Saudi Arabia, UAE, Qatar, Oman, Bahrain, and international locations.
                </p>
              </section>

              {/* Data Collected */}
              <section className="space-y-2">
                <h4 className="text-base font-bold text-[#1C1917]">2. Information We Collect</h4>
                <p>We collect information necessary to operate our talent discovery and job posting marketplace:</p>
                <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm">
                  <li>
                    <strong>Account & Profile Information:</strong> Full name, professional email address, location, design disciplines (UI/UX, AutoCAD, BIM, 3D Rendering, Branding), hourly rates, portfolio links, and social links (Figma, Dribbble, Behance, GitHub).
                  </li>
                  <li>
                    <strong>Job Application Data:</strong> Submitted cover letters, proposed project rates, attached portfolio samples, and contact emails provided when applying.
                  </li>
                  <li>
                    <strong>Employer & Job Listings:</strong> Company name, registered address, job descriptions, compensation ranges, and direct hiring contact emails.
                  </li>
                  <li>
                    <strong>Job Alert Subscriptions:</strong> Email addresses registered to receive curated design and engineering job alerts by region.
                  </li>
                </ul>
              </section>

              {/* How We Use Information */}
              <section className="space-y-2">
                <h4 className="text-base font-bold text-[#1C1917]">3. How We Use and Process Your Information</h4>
                <p>We use the collected information for specific, lawful purposes:</p>
                <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm">
                  <li>Connecting freelance talent directly with verified GCC and international employers.</li>
                  <li>Delivering requested job notifications, salary benchmarks, and platform alerts.</li>
                  <li>Facilitating direct employer applications via verified contact emails.</li>
                  <li>Protecting against fraud, unauthorized access, and malicious job listings.</li>
                  <li>Ensuring compliance with local regulations in the GCC region.</li>
                </ul>
              </section>

              {/* Direct Employer Contact & Transparency */}
              <section className="space-y-2 bg-stone-50 p-4 rounded-2xl border border-stone-200">
                <h4 className="text-base font-bold text-[#1C1917] flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#E25B38]" /> 4. Direct Employer Contact & Email Transparency
                </h4>
                <p>
                  To foster trust and eliminate middlemen fees, Dakarlaton allows employers to publish direct recruitment emails (e.g., <code>careers@company.com</code>). When job seekers utilize the "Direct Email Application" feature, their communication occurs directly with the employer. Dakarlaton never sells, rents, or monetizes candidate email addresses.
                </p>
              </section>

              {/* Data Security & Firebase Cloud Storage */}
              <section className="space-y-2">
                <h4 className="text-base font-bold text-[#1C1917]">5. Cloud Security & Data Storage</h4>
                <p>
                  User data is safeguarded through industry-standard encryption in transit and at rest using enterprise Google Cloud Firestore infrastructure with Zero-Trust Role-Based Access Control (RBAC) rules. Access to sensitive account records is strictly limited to authorized owners.
                </p>
              </section>

              {/* User Rights */}
              <section className="space-y-2">
                <h4 className="text-base font-bold text-[#1C1917]">6. Your Rights & Data Choices</h4>
                <p>You maintain full control over your personal information:</p>
                <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm">
                  <li>You can update, edit, or delete your portfolio projects and profile at any time.</li>
                  <li>You can unsubscribe from email job alerts using the one-click unsubscribe links.</li>
                  <li>You can request complete deletion of your account and related records by emailing our privacy team.</li>
                </ul>
              </section>

              {/* Contact Information */}
              <section className="bg-[#FAF8F5] p-4 sm:p-5 rounded-2xl border border-[#EBE7DF] space-y-2">
                <h4 className="text-base font-bold text-[#1C1917]">7. Privacy Contact</h4>
                <p className="text-xs sm:text-sm">
                  For any questions regarding this Privacy Policy or your personal data rights, contact us at:
                </p>
                <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#1C1917]">
                  <Mail className="w-4 h-4 text-[#E25B38]" />
                  <span>Email: </span>
                  <a href="mailto:j_tanim@hotmail.com" className="text-[#E25B38] underline">
                    j_tanim@hotmail.com
                  </a>
                </div>
              </section>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Introduction */}
              <section className="bg-[#FAF8F5] p-4 sm:p-5 rounded-2xl border border-[#EBE7DF]">
                <h4 className="text-base font-bold text-[#1C1917] mb-2 flex items-center gap-2">
                  <Scale className="w-4 h-4 text-[#E25B38]" /> 1. Agreement to Terms
                </h4>
                <p>
                  By accessing or using <strong>Dakarlaton</strong> (
                  <a href="https://dakarlaton.com" className="text-[#E25B38] underline font-medium">
                    https://dakarlaton.com
                  </a>
                  ), you agree to be bound by these Terms of Service. If you do not agree to these terms, please refrain from using our services.
                </p>
              </section>

              {/* Use of Platform */}
              <section className="space-y-2">
                <h4 className="text-base font-bold text-[#1C1917]">2. Platform Purpose & Scope</h4>
                <p>
                  Dakarlaton is a dedicated job board and portfolio platform tailored for creative, design, architecture, CAD, 3D visualization, and digital technology talent operating in the GCC region (Saudi Arabia, UAE, Qatar, Oman, Bahrain, Kuwait) and globally.
                </p>
              </section>

              {/* Employer Responsibilities */}
              <section className="space-y-2">
                <h4 className="text-base font-bold text-[#1C1917]">3. Employer & Job Posting Guidelines</h4>
                <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm">
                  <li>Employers must provide genuine, verified role requirements, accurate compensation benchmarks, and legitimate corporate or direct contact emails.</li>
                  <li>Postings containing deceptive claims, unsolicited multi-level marketing, fee-to-apply schemes, or discrimination are strictly prohibited and subject to immediate removal.</li>
                  <li>Employers are solely responsible for compliance with regional employment laws, visas, and contractual agreements negotiated with applicants.</li>
                </ul>
              </section>

              {/* Freelancer & Applicant Responsibilities */}
              <section className="space-y-2">
                <h4 className="text-base font-bold text-[#1C1917]">4. Designer & Candidate Obligations</h4>
                <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm">
                  <li>Designers and applicants warrant that all portfolio works, project case studies, and credentials presented are their own original creations or accurately credit collaborators.</li>
                  <li>Applicants agree to communicate respectfully with prospective clients and employers.</li>
                </ul>
              </section>

              {/* Intellectual Property */}
              <section className="space-y-2 bg-stone-50 p-4 rounded-2xl border border-stone-200">
                <h4 className="text-base font-bold text-[#1C1917]">5. Intellectual Property</h4>
                <p>
                  Designers retain 100% ownership of their portfolio artwork, Figma files, CAD drawings, and creative assets showcased on Dakarlaton. By uploading your portfolio, you grant Dakarlaton a non-exclusive license solely to display your public preview thumbnail to employers on the platform.
                </p>
              </section>

              {/* Disclaimer & Limitation of Liability */}
              <section className="space-y-2">
                <h4 className="text-base font-bold text-[#1C1917]">6. Disclaimers & Limitation of Liability</h4>
                <p className="text-xs sm:text-sm">
                  Dakarlaton acts as a venue connecting independent freelancers and hiring organizations. Dakarlaton is not an employment agency or party to contracts executed between users. We are not liable for employment disputes, deliverables, or unpaid invoices between parties.
                </p>
              </section>

              {/* Governing Law & Dispute Resolution */}
              <section className="space-y-2">
                <h4 className="text-base font-bold text-[#1C1917]">7. Governing Law & Modifications</h4>
                <p className="text-xs sm:text-sm">
                  These Terms shall be interpreted in accordance with applicable commercial and digital trade principles. Dakarlaton reserves the right to modify these terms as platform capabilities expand. Continued use after changes indicates acceptance.
                </p>
              </section>

              {/* Contact */}
              <section className="bg-[#FAF8F5] p-4 sm:p-5 rounded-2xl border border-[#EBE7DF] space-y-2">
                <h4 className="text-base font-bold text-[#1C1917]">8. Questions Regarding Terms</h4>
                <p className="text-xs sm:text-sm">
                  Direct inquiries regarding platform rules, copyright notices, or corporate agreements to:
                </p>
                <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#1C1917]">
                  <Mail className="w-4 h-4 text-[#E25B38]" />
                  <span>Contact: </span>
                  <a href="mailto:j_tanim@hotmail.com" className="text-[#E25B38] underline">
                    j_tanim@hotmail.com
                  </a>
                </div>
              </section>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="pt-4 border-t border-stone-200 flex items-center justify-between shrink-0">
          <span className="text-xs text-stone-500 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Compliant with GCC privacy principles
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 bg-[#1C1917] hover:bg-stone-800 text-white font-medium text-xs sm:text-sm rounded-full transition-colors cursor-pointer"
          >
            I Understand & Agree
          </button>
        </div>
      </div>
    </div>
  );
};
