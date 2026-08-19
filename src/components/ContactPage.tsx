import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { FAQS } from '../data/mockData';
import {
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Heart
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { submitContact } = useAuth();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-1');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !message) return;

    setIsSubmitting(true);
    await submitContact({ fullName, email, topic, message });
    setIsSubmitting(false);
    setSuccess(true);
    setFullName('');
    setEmail('');
    setTopic('');
    setMessage('');
    setTimeout(() => setSuccess(false), 5000);
  };

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  return (
    <div className="space-y-20 pb-16">
      {/* Header Section (Matching Video 00:35) */}
      <section className="pt-10 sm:pt-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#E25B38]/10 text-[#E25B38] text-xs font-semibold uppercase tracking-wider mb-6">
          <Sparkles className="w-3.5 h-3.5" /> Get in touch
        </div>

        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#1C1917] tracking-tight leading-tight mb-4">
          We'd love to hear from you
        </h1>

        <p className="text-base sm:text-lg text-[#57534E] max-w-2xl mx-auto leading-relaxed">
          Whether you're a job seeker with a question or an employer ready to post your first role, our team is here to help.
        </p>
      </section>

      {/* Main Contact Grid (Matching Video 00:30 & 00:34) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Info Cards */}
          <div className="lg:col-span-5 space-y-4">
            {/* Email card */}
            <div className="bg-white p-6 rounded-3xl border border-[#EBE7DF] shadow-xs flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-orange-50 text-[#E25B38] flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-400">
                  Email us
                </span>
                <h4 className="text-sm font-bold text-[#1C1917]">
                  l_tanim@hotmail.com
                </h4>
                <p className="text-xs text-stone-500">
                  We reply within one business day
                </p>
              </div>
            </div>

            {/* Based in card */}
            <div className="bg-white p-6 rounded-3xl border border-[#EBE7DF] shadow-xs flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-orange-50 text-[#E25B38] flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-400">
                  Based in
                </span>
                <h4 className="text-sm font-bold text-[#1C1917]">
                  Riyadh KSA
                </h4>
                <p className="text-xs text-stone-500">
                  Serving talent across Africa and beyond
                </p>
              </div>
            </div>

            {/* Hours card */}
            <div className="bg-white p-6 rounded-3xl border border-[#EBE7DF] shadow-xs flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-orange-50 text-[#E25B38] flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-400">
                  Hours
                </span>
                <h4 className="text-sm font-bold text-[#1C1917]">
                  Mon – Fri, 9am – 6pm WAT
                </h4>
                <p className="text-xs text-stone-500">
                  We're here when you need us
                </p>
              </div>
            </div>

            {/* Built for people card (Video 00:30) */}
            <div className="bg-[#FAF8F5] p-6 rounded-3xl border border-[#EBE7DF] space-y-2">
              <h4 className="text-sm font-bold text-[#1C1917] flex items-center gap-2">
                <Heart className="w-4 h-4 text-[#E25B38]" /> Built for people.
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Every message we receive is read by a real person. We care about every job seeker and every employer on our platform.
              </p>
            </div>
          </div>

          {/* Right Message Form (Matching Video 00:30 & 00:34) */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-[#EBE7DF] shadow-sm space-y-6">
            <div>
              <h3 className="text-2xl font-serif font-bold text-[#1C1917]">
                Send us a message
              </h3>
              <p className="text-sm text-stone-500 mt-1">
                Fill in the form and we'll get back to you as soon as possible.
              </p>
            </div>

            {success ? (
              <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-2 animate-in fade-in">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="text-base font-bold text-emerald-900">Message sent successfully!</h4>
                <p className="text-xs text-emerald-700">
                  Thank you for reaching out. A member of our team will reply to you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                      Full name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Amara Diallo"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#E25B38] focus:border-[#E25B38]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                      Email address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#E25B38] focus:border-[#E25B38]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    What can we help with? *
                  </label>
                  <select
                    required
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#E25B38] focus:border-[#E25B38] bg-white"
                  >
                    <option value="">Select a topic...</option>
                    <option value="Job Seeker Support">Job Seeker Support</option>
                    <option value="Employer / Posting a Job">Employer / Posting a Job</option>
                    <option value="Designer Portfolio Verification">Designer Portfolio Verification</option>
                    <option value="Partnership & Press">Partnership & Press</option>
                    <option value="General Question">General Question</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us how we can help..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#E25B38] focus:border-[#E25B38]"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto bg-[#E25B38] hover:bg-[#c94929] text-white px-8 py-3 rounded-full font-medium text-sm transition-all shadow-sm hover:shadow cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? 'Sending...' : 'Send message'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FAQ Section (Matching Video 00:31 - 00:33) */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-xs font-semibold text-[#E25B38] uppercase tracking-wider block mb-1">
            Common questions
          </span>
          <h2 className="text-3xl font-serif font-bold text-[#1C1917]">
            Quick answers
          </h2>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white rounded-2xl border border-[#EBE7DF] overflow-hidden transition-all shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-[#1C1917] hover:text-[#E25B38] transition-colors cursor-pointer"
                >
                  <span>{faq.question}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-[#E25B38] shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-stone-400 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-100 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
