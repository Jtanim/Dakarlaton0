import React from 'react';
import { X, Heart, MapPin, DollarSign, Calendar, Clock, ArrowRight, Trash2 } from 'lucide-react';
import { JobListing } from '../types';
import { formatJobDateTime } from '../utils/dateUtils';

interface SavedJobsModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedJobs: JobListing[];
  onSelectJob: (job: JobListing) => void;
  onRemoveSaved: (jobId: string) => void;
  onOpenApply: (job: JobListing) => void;
}

export const SavedJobsModal: React.FC<SavedJobsModalProps> = ({
  isOpen,
  onClose,
  savedJobs,
  onSelectJob,
  onRemoveSaved,
  onOpenApply
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-stone-200 relative max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between border-b border-stone-100 pb-4 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center">
              <Heart className="w-5 h-5 fill-current" />
            </div>
            <div>
              <h3 className="text-xl font-bold font-serif text-[#1C1917]">
                Saved Jobs ({savedJobs.length})
              </h3>
              <p className="text-xs text-stone-500">
                Jobs you have shortlisted on Dakarlaton
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-stone-400 hover:text-stone-700 p-2 rounded-full hover:bg-stone-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-3 pr-1">
          {savedJobs.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <div className="w-12 h-12 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center mx-auto">
                <Heart className="w-6 h-6" />
              </div>
              <p className="text-stone-700 font-semibold text-sm">No saved jobs yet</p>
              <p className="text-xs text-stone-500 max-w-xs mx-auto">
                Click the heart icon on any job card to bookmark roles you wish to apply for later.
              </p>
            </div>
          ) : (
            savedJobs.map((job) => {
              const jobDt = formatJobDateTime(job);
              return (
                <div
                  key={job.id}
                  className="bg-[#FAF8F5] border border-stone-200 rounded-2xl p-4 sm:p-5 hover:border-[#5925DC] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-purple-50 text-[#5925DC]">
                        {job.category}
                      </span>
                      <span className="text-[11px] text-stone-500 font-medium">
                        {job.type}
                      </span>
                    </div>

                    <h4
                      onClick={() => {
                        onSelectJob(job);
                        onClose();
                      }}
                      className="text-base font-bold text-stone-900 hover:text-[#5925DC] transition-colors cursor-pointer"
                    >
                      {job.title}
                    </h4>

                    <div className="text-xs text-stone-600 font-medium">
                      {job.company}
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-[11px] text-stone-500 pt-1">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-stone-400" />
                        {job.location}
                      </span>
                      <span className="font-semibold text-stone-800">
                        {job.salary}
                      </span>
                      <span className="flex items-center gap-1 text-stone-600 bg-stone-100 px-1.5 py-0.5 rounded">
                        <Calendar className="w-3 h-3 text-[#5925DC]" />
                        {jobDt.date}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                    <button
                      onClick={() => onRemoveSaved(job.id)}
                      className="p-2 rounded-xl text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                      title="Remove from saved"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        onOpenApply(job);
                        onClose();
                      }}
                      className="px-4 py-2 rounded-xl bg-[#5925DC] hover:bg-[#471cb3] text-white text-xs font-semibold transition-all shadow-xs flex items-center gap-1 cursor-pointer"
                    >
                      Apply Now <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
