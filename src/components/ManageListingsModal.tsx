import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { JobListing, JobStatus } from '../types';
import { isJobLive, formatTimeRemaining } from '../utils/jobScheduler';
import { formatJobDateTime } from '../utils/dateUtils';
import {
  X,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  Play,
  RotateCcw,
  Trash2,
  ExternalLink,
  Plus,
  RefreshCw,
  Eye,
  History,
  ShieldCheck,
  Building,
  MapPin,
  DollarSign,
  ChevronRight
} from 'lucide-react';

interface ManageListingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenPostJob: () => void;
  onViewJobInFeed?: (job: JobListing) => void;
}

export const ManageListingsModal: React.FC<ManageListingsModalProps> = ({
  isOpen,
  onClose,
  onOpenPostJob,
  onViewJobInFeed,
}) => {
  const {
    jobs,
    user,
    publishJobNow,
    expireJobNow,
    updateJobSchedule,
    deleteJob,
    runSchedulerCheckNow,
    schedulerLogs,
    clearSchedulerLogs,
  } = useAuth();

  const [activeTab, setActiveTab] = useState<'all' | 'live' | 'scheduled' | 'expired' | 'logs'>('all');
  const [editingJobId, setEditingJobId] = useState<string | null>(null);
  const [editScheduledDate, setEditScheduledDate] = useState('');
  const [editExpiresDate, setEditExpiresDate] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isCheckingNow, setIsCheckingNow] = useState(false);
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);

  // Live ticking clock (updates every second)
  useEffect(() => {
    if (!isOpen) return;
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, [isOpen]);

  if (!isOpen) return null;

  // Categorize jobs
  const liveJobs = jobs.filter((j) => isJobLive(j, currentTime));
  const scheduledJobs = jobs.filter((j) => {
    if (j.status === 'scheduled') return true;
    if (j.scheduledAt) {
      const sched = new Date(j.scheduledAt).getTime();
      return !isNaN(sched) && sched > currentTime.getTime();
    }
    return false;
  });
  const expiredJobs = jobs.filter((j) => {
    if (j.status === 'expired') return true;
    if (j.expiresAt) {
      const exp = new Date(j.expiresAt).getTime();
      return !isNaN(exp) && exp <= currentTime.getTime();
    }
    return false;
  });

  const getFilteredJobs = () => {
    switch (activeTab) {
      case 'live':
        return liveJobs;
      case 'scheduled':
        return scheduledJobs;
      case 'expired':
        return expiredJobs;
      case 'all':
      default:
        return jobs;
    }
  };

  const handleManualCheck = async () => {
    setIsCheckingNow(true);
    const res = await runSchedulerCheckNow();
    setIsCheckingNow(false);
    if (res.autoPublishedCount > 0 || res.autoExpiredCount > 0) {
      setActionFeedback(
        `Scheduler check executed: ${res.autoPublishedCount} listing(s) auto-published, ${res.autoExpiredCount} listing(s) auto-expired.`
      );
    } else {
      setActionFeedback('Scheduler check executed: All listings are up to date.');
    }
    setTimeout(() => setActionFeedback(null), 4000);
  };

  const handlePublishNow = async (jobId: string, title: string) => {
    const res = await publishJobNow(jobId);
    if (res.success) {
      setActionFeedback(`"${title}" published live immediately.`);
      setTimeout(() => setActionFeedback(null), 3500);
    }
  };

  const handleExpireNow = async (jobId: string, title: string) => {
    const res = await expireJobNow(jobId);
    if (res.success) {
      setActionFeedback(`"${title}" moved to expired/archived.`);
      setTimeout(() => setActionFeedback(null), 3500);
    }
  };

  const handleReactivateJob = async (job: JobListing) => {
    const now = new Date();
    const res = await publishJobNow(job.id);
    if (res.success) {
      setActionFeedback(`"${job.title}" re-activated and published live!`);
      setTimeout(() => setActionFeedback(null), 3500);
    }
  };

  const handleSaveScheduleEdit = async (jobId: string) => {
    const updates: { scheduledAt?: string; expiresAt?: string; status?: JobStatus } = {};
    if (editScheduledDate) {
      const dt = new Date(editScheduledDate);
      updates.scheduledAt = dt.toISOString();
      if (dt.getTime() > Date.now()) {
        updates.status = 'scheduled';
      } else {
        updates.status = 'published';
      }
    }
    if (editExpiresDate) {
      updates.expiresAt = new Date(editExpiresDate).toISOString();
    }

    await updateJobSchedule(jobId, updates);
    setEditingJobId(null);
    setEditScheduledDate('');
    setEditExpiresDate('');
    setActionFeedback('Listing schedule updated successfully.');
    setTimeout(() => setActionFeedback(null), 3000);
  };

  const startEditSchedule = (job: JobListing) => {
    setEditingJobId(job.id);
    if (job.scheduledAt) {
      const d = new Date(job.scheduledAt);
      // Format as local YYYY-MM-DDTHH:mm for datetime-local input
      const localIso = new Date(d.getTime() - d.getTimezoneOffset() * 60000)
        .toISOString()
        .slice(0, 16);
      setEditScheduledDate(localIso);
    } else {
      const d = new Date(Date.now() + 10 * 60000);
      const localIso = new Date(d.getTime() - d.getTimezoneOffset() * 60000)
        .toISOString()
        .slice(0, 16);
      setEditScheduledDate(localIso);
    }

    if (job.expiresAt) {
      const d = new Date(job.expiresAt);
      const localIso = new Date(d.getTime() - d.getTimezoneOffset() * 60000)
        .toISOString()
        .slice(0, 16);
      setEditExpiresDate(localIso);
    } else {
      setEditExpiresDate('');
    }
  };

  const displayedJobs = getFilteredJobs();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-4xl w-full p-5 sm:p-7 shadow-2xl border border-stone-200 relative max-h-[92vh] flex flex-col overflow-hidden">
        {/* Header Bar */}
        <div className="flex items-start justify-between pb-4 border-b border-stone-200 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-purple-50 border border-purple-200 flex items-center justify-center text-[#5925DC] shrink-0">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#1F104F]">
                  Job Listings & Scheduler
                </h3>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-purple-100 text-[#5925DC] px-2 py-0.5 rounded-full">
                  Automated Engine
                </span>
              </div>
              <p className="text-xs text-stone-500 mt-0.5">
                Manage live roles, configure automated publication schedules, and monitor expiry.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-stone-700 p-2 rounded-full hover:bg-stone-100 transition-colors cursor-pointer shrink-0"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Time Clock & Action Bar */}
        <div className="bg-stone-50 border-b border-stone-200 px-4 py-3 flex flex-wrap items-center justify-between gap-3 text-xs shrink-0">
          <div className="flex items-center gap-2 text-stone-700">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-semibold text-stone-600">App Clock:</span>
            <span className="font-mono bg-white px-2 py-0.5 rounded border border-stone-200 font-bold text-[#1F104F]">
              {currentTime.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}{' '}
              at {currentTime.toLocaleTimeString('en-US')}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleManualCheck}
              disabled={isCheckingNow}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-stone-100 border border-stone-300 text-stone-700 font-semibold cursor-pointer disabled:opacity-50 transition-colors"
              title="Runs evaluation of due scheduled dates and expiry dates immediately"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isCheckingNow ? 'animate-spin text-[#5925DC]' : ''}`} />
              <span>{isCheckingNow ? 'Checking...' : 'Run Check Now'}</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onOpenPostJob();
              }}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#5925DC] hover:bg-[#471cb3] text-white font-semibold cursor-pointer shadow-2xs transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Post New Role</span>
            </button>
          </div>
        </div>

        {/* Action feedback toast */}
        {actionFeedback && (
          <div className="bg-purple-50 text-[#5925DC] border-b border-purple-200 px-4 py-2 text-xs font-semibold flex items-center justify-between animate-in fade-in duration-150">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> {actionFeedback}
            </span>
            <button
              onClick={() => setActionFeedback(null)}
              className="text-purple-400 hover:text-[#5925DC] ml-2"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Tab Selection */}
        <div className="flex items-center gap-1 sm:gap-2 px-4 pt-3 pb-2 border-b border-stone-200 bg-white overflow-x-auto scrollbar-none shrink-0">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'all'
                ? 'bg-[#1F104F] text-white shadow-2xs'
                : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            All Listings ({jobs.length})
          </button>
          <button
            onClick={() => setActiveTab('live')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'live'
                ? 'bg-emerald-600 text-white shadow-2xs'
                : 'text-emerald-700 bg-emerald-50 hover:bg-emerald-100'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            Live ({liveJobs.length})
          </button>
          <button
            onClick={() => setActiveTab('scheduled')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'scheduled'
                ? 'bg-[#5925DC] text-white shadow-2xs'
                : 'text-[#5925DC] bg-purple-50 hover:bg-purple-100'
            }`}
          >
            <Clock className="w-3 h-3" />
            Scheduled ({scheduledJobs.length})
          </button>
          <button
            onClick={() => setActiveTab('expired')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'expired'
                ? 'bg-stone-700 text-white shadow-2xs'
                : 'text-stone-600 bg-stone-100 hover:bg-stone-200'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-stone-400"></span>
            Expired ({expiredJobs.length})
          </button>
          <button
            onClick={() => setActiveTab('logs')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors whitespace-nowrap cursor-pointer ml-auto ${
              activeTab === 'logs'
                ? 'bg-amber-600 text-white shadow-2xs'
                : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            <History className="w-3 h-3" />
            Scheduler Activity Log ({schedulerLogs.length})
          </button>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {activeTab === 'logs' ? (
            /* Scheduler Activity Log View */
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-stone-900 flex items-center gap-1.5">
                    <History className="w-4 h-4 text-[#5925DC]" />
                    Automated Event Log
                  </h4>
                  <p className="text-xs text-stone-500">
                    Real-time audit trail recording when the scheduler runner auto-publishes or auto-expires listings.
                  </p>
                </div>
                {schedulerLogs.length > 0 && (
                  <button
                    onClick={clearSchedulerLogs}
                    className="text-xs text-stone-400 hover:text-red-500 underline cursor-pointer"
                  >
                    Clear History
                  </button>
                )}
              </div>

              {schedulerLogs.length === 0 ? (
                <div className="text-center py-12 bg-stone-50 rounded-2xl border border-stone-200">
                  <Clock className="w-8 h-8 text-stone-300 mx-auto mb-2" />
                  <p className="text-xs text-stone-500 font-medium">
                    No scheduler events recorded yet.
                  </p>
                  <p className="text-[11px] text-stone-400 mt-1">
                    When listings reach their scheduled time or expiry date, automation events will appear here in real time.
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {schedulerLogs.map((log) => {
                    const badgeColor =
                      log.action === 'AUTO_PUBLISHED'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : log.action === 'AUTO_EXPIRED'
                        ? 'bg-amber-50 text-amber-700 border-amber-200'
                        : log.action === 'SCHEDULED'
                        ? 'bg-purple-50 text-[#5925DC] border-purple-200'
                        : 'bg-stone-100 text-stone-700 border-stone-200';

                    return (
                      <div
                        key={log.id}
                        className="bg-white p-3.5 rounded-2xl border border-stone-200 hover:border-stone-300 shadow-2xs space-y-1.5 text-xs transition-colors"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span
                              className={`px-2 py-0.5 rounded-md font-bold text-[10px] uppercase tracking-wider border ${badgeColor}`}
                            >
                              {log.action.replace('_', ' ')}
                            </span>
                            <span className="font-bold text-stone-900">
                              {log.jobTitle}
                            </span>
                            <span className="text-stone-400">•</span>
                            <span className="text-stone-600">{log.company}</span>
                          </div>
                          <span className="text-[11px] font-mono text-stone-400">
                            {new Date(log.timestamp).toLocaleTimeString('en-US', {
                              hour: '2-digit',
                              minute: '2-digit',
                              second: '2-digit',
                            })}
                          </span>
                        </div>
                        <p className="text-stone-700 leading-relaxed">{log.message}</p>
                        {log.details && (
                          <div className="text-[11px] text-stone-500 bg-stone-50 p-2 rounded-lg font-mono">
                            {log.details}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ) : (
            /* Listings List View */
            <div className="space-y-3">
              {displayedJobs.length === 0 ? (
                <div className="text-center py-12 bg-stone-50 rounded-2xl border border-stone-200">
                  <Calendar className="w-8 h-8 text-stone-300 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-stone-700">
                    No listings in this tab.
                  </p>
                  <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
                    {activeTab === 'scheduled'
                      ? 'No jobs are currently scheduled for future publishing. Create a new listing and pick a future publish date!'
                      : activeTab === 'expired'
                      ? 'No listings have expired yet.'
                      : 'No job listings found.'}
                  </p>
                  <button
                    onClick={() => {
                      onClose();
                      onOpenPostJob();
                    }}
                    className="mt-4 px-4 py-2 rounded-full bg-[#5925DC] text-white text-xs font-semibold hover:bg-[#471cb3] cursor-pointer"
                  >
                    + Post or Schedule a Job
                  </button>
                </div>
              ) : (
                displayedJobs.map((job) => {
                  const isLive = isJobLive(job, currentTime);
                  const isScheduled = Boolean(
                    job.status === 'scheduled' ||
                      (job.scheduledAt && new Date(job.scheduledAt).getTime() > currentTime.getTime())
                  );
                  const isExpired = Boolean(
                    job.status === 'expired' ||
                      (job.expiresAt && new Date(job.expiresAt).getTime() <= currentTime.getTime())
                  );

                  const schedRemaining = job.scheduledAt
                    ? formatTimeRemaining(job.scheduledAt, currentTime)
                    : null;
                  const expRemaining = job.expiresAt
                    ? formatTimeRemaining(job.expiresAt, currentTime)
                    : null;

                  const isEditingThis = editingJobId === job.id;

                  return (
                    <div
                      key={job.id}
                      className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                        isScheduled
                          ? 'bg-purple-50/40 border-purple-200 hover:border-purple-300'
                          : isExpired
                          ? 'bg-stone-100/60 border-stone-300 opacity-80'
                          : 'bg-white border-stone-200 hover:border-stone-300 shadow-2xs'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                        {/* Job Details */}
                        <div className="space-y-1.5 flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            {/* Status Badge */}
                            {isScheduled ? (
                              <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider bg-purple-100 text-[#5925DC] px-2.5 py-0.5 rounded-full border border-purple-200">
                                <Clock className="w-3 h-3" /> Scheduled{' '}
                                {schedRemaining && !schedRemaining.isPast
                                  ? `(${schedRemaining.text})`
                                  : ''}
                              </span>
                            ) : isExpired ? (
                              <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider bg-stone-200 text-stone-700 px-2.5 py-0.5 rounded-full">
                                Expired / Archived
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full border border-emerald-200">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                Live Now
                              </span>
                            )}

                            <span className="text-xs font-semibold text-stone-500">
                              {job.category}
                            </span>
                            <span className="text-stone-300">•</span>
                            <span className="text-xs font-medium text-stone-500">
                              {job.type}
                            </span>
                          </div>

                          <h4 className="text-base sm:text-lg font-bold text-[#1C1917] truncate">
                            {job.title}
                          </h4>

                          <div className="flex flex-wrap items-center gap-3 text-xs text-stone-600">
                            <span className="flex items-center gap-1 font-semibold text-stone-800">
                              <Building className="w-3.5 h-3.5 text-stone-400" />
                              {job.company}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5 text-stone-400" />
                              {job.location}
                            </span>
                            <span className="flex items-center gap-1 font-bold text-emerald-700">
                              <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                              {job.salary}
                            </span>
                          </div>

                          {/* Scheduling & Expiry Timestamps */}
                          <div className="pt-2 flex flex-wrap items-center gap-3 text-xs">
                            {job.scheduledAt && (
                              <div className="inline-flex items-center gap-1 bg-white px-2.5 py-1 rounded-lg border border-purple-200 text-purple-900 text-[11px]">
                                <Clock className="w-3 h-3 text-[#5925DC]" />
                                <span className="font-semibold">Publish Target:</span>
                                <span>
                                  {new Date(job.scheduledAt).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                  })}
                                </span>
                              </div>
                            )}

                            {job.expiresAt && (
                              <div className="inline-flex items-center gap-1 bg-white px-2.5 py-1 rounded-lg border border-stone-200 text-stone-700 text-[11px]">
                                <Calendar className="w-3 h-3 text-stone-400" />
                                <span className="font-semibold">Expires:</span>
                                <span>
                                  {new Date(job.expiresAt).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                  })}
                                </span>
                                {expRemaining && (
                                  <span
                                    className={`font-semibold ${
                                      expRemaining.isPast ? 'text-stone-400' : 'text-amber-600'
                                    }`}
                                  >
                                    ({expRemaining.text})
                                  </span>
                                )}
                              </div>
                            )}

                            {!job.scheduledAt && !job.expiresAt && (
                              <span className="text-[11px] text-stone-400">
                                Posted on {job.postedAt || 'Recently'}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex sm:flex-col items-center sm:items-end gap-2 shrink-0 pt-2 sm:pt-0">
                          {isScheduled && (
                            <button
                              onClick={() => handlePublishNow(job.id, job.title)}
                              className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center gap-1 cursor-pointer transition-colors shadow-2xs"
                              title="Publish listing to live public board immediately"
                            >
                              <Play className="w-3 h-3 fill-white" />
                              Publish Now
                            </button>
                          )}

                          {isLive && (
                            <button
                              onClick={() => {
                                if (onViewJobInFeed) {
                                  onClose();
                                  onViewJobInFeed(job);
                                }
                              }}
                              className="px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-purple-50 text-stone-700 hover:text-[#5925DC] font-semibold text-xs flex items-center gap-1 cursor-pointer transition-colors"
                            >
                              <Eye className="w-3 h-3" />
                              View Public
                            </button>
                          )}

                          {isExpired && (
                            <button
                              onClick={() => handleReactivateJob(job)}
                              className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center gap-1 cursor-pointer transition-colors shadow-2xs"
                              title="Restore and re-publish this listing"
                            >
                              <RotateCcw className="w-3 h-3" />
                              Re-publish Live
                            </button>
                          )}

                          <button
                            onClick={() => {
                              if (isEditingThis) {
                                setEditingJobId(null);
                              } else {
                                startEditSchedule(job);
                              }
                            }}
                            className="px-3 py-1.5 rounded-xl border border-stone-300 hover:bg-stone-100 text-stone-700 font-semibold text-xs flex items-center gap-1 cursor-pointer transition-colors"
                          >
                            <Calendar className="w-3 h-3" />
                            {isEditingThis ? 'Cancel' : 'Edit Timing'}
                          </button>

                          {isLive && (
                            <button
                              onClick={() => handleExpireNow(job.id, job.title)}
                              className="text-stone-400 hover:text-amber-700 text-[11px] underline p-1 cursor-pointer"
                              title="Move this listing to expired/archived immediately"
                            >
                              Expire Now
                            </button>
                          )}

                          <button
                            onClick={() => {
                              if (confirm(`Delete listing "${job.title}"?`)) {
                                deleteJob(job.id);
                              }
                            }}
                            className="text-stone-400 hover:text-red-600 p-1 rounded-lg transition-colors cursor-pointer"
                            title="Delete listing"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Inline Timing Editor Drawer */}
                      {isEditingThis && (
                        <div className="mt-4 pt-4 border-t border-stone-200 bg-white p-4 rounded-xl space-y-3 animate-in fade-in duration-150">
                          <h5 className="font-bold text-xs text-[#1F104F] uppercase tracking-wider flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-[#5925DC]" />
                            Adjust Publication & Expiry Dates
                          </h5>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                            <div>
                              <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                                Publish On (Date & Time):
                              </label>
                              <input
                                type="datetime-local"
                                value={editScheduledDate}
                                onChange={(e) => setEditScheduledDate(e.target.value)}
                                className="w-full px-3 py-2 rounded-lg border border-stone-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#5925DC]"
                              />
                              <div className="flex flex-wrap gap-1 mt-1.5">
                                <button
                                  type="button"
                                  onClick={() => {
                                    const d = new Date(Date.now() + 2 * 60000);
                                    const localIso = new Date(d.getTime() - d.getTimezoneOffset() * 60000)
                                      .toISOString()
                                      .slice(0, 16);
                                    setEditScheduledDate(localIso);
                                  }}
                                  className="px-2 py-0.5 rounded bg-purple-50 text-[#5925DC] hover:bg-purple-100 text-[10px] font-bold cursor-pointer"
                                >
                                  +2 mins
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const d = new Date(Date.now() + 15 * 60000);
                                    const localIso = new Date(d.getTime() - d.getTimezoneOffset() * 60000)
                                      .toISOString()
                                      .slice(0, 16);
                                    setEditScheduledDate(localIso);
                                  }}
                                  className="px-2 py-0.5 rounded bg-purple-50 text-[#5925DC] hover:bg-purple-100 text-[10px] font-bold cursor-pointer"
                                >
                                  +15 mins
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const d = new Date(Date.now() + 60 * 60000);
                                    const localIso = new Date(d.getTime() - d.getTimezoneOffset() * 60000)
                                      .toISOString()
                                      .slice(0, 16);
                                    setEditScheduledDate(localIso);
                                  }}
                                  className="px-2 py-0.5 rounded bg-purple-50 text-[#5925DC] hover:bg-purple-100 text-[10px] font-bold cursor-pointer"
                                >
                                  +1 hr
                                </button>
                              </div>
                            </div>

                            <div>
                              <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                                Optional Expiry (Date & Time):
                              </label>
                              <input
                                type="datetime-local"
                                value={editExpiresDate}
                                onChange={(e) => setEditExpiresDate(e.target.value)}
                                className="w-full px-3 py-2 rounded-lg border border-stone-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#5925DC]"
                              />
                              <div className="flex flex-wrap gap-1 mt-1.5">
                                <button
                                  type="button"
                                  onClick={() => {
                                    const d = new Date(Date.now() + 7 * 86400000);
                                    const localIso = new Date(d.getTime() - d.getTimezoneOffset() * 60000)
                                      .toISOString()
                                      .slice(0, 16);
                                    setEditExpiresDate(localIso);
                                  }}
                                  className="px-2 py-0.5 rounded bg-stone-100 text-stone-700 hover:bg-stone-200 text-[10px] font-medium cursor-pointer"
                                >
                                  +7 days
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const d = new Date(Date.now() + 30 * 86400000);
                                    const localIso = new Date(d.getTime() - d.getTimezoneOffset() * 60000)
                                      .toISOString()
                                      .slice(0, 16);
                                    setEditExpiresDate(localIso);
                                  }}
                                  className="px-2 py-0.5 rounded bg-stone-100 text-stone-700 hover:bg-stone-200 text-[10px] font-medium cursor-pointer"
                                >
                                  +30 days
                                </button>
                                {editExpiresDate && (
                                  <button
                                    type="button"
                                    onClick={() => setEditExpiresDate('')}
                                    className="px-2 py-0.5 rounded bg-stone-100 text-red-600 hover:bg-red-50 text-[10px] font-medium cursor-pointer"
                                  >
                                    Remove Expiry
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="flex justify-end gap-2 pt-2">
                            <button
                              type="button"
                              onClick={() => setEditingJobId(null)}
                              className="px-3 py-1.5 rounded-lg border border-stone-300 text-stone-600 hover:bg-stone-100 text-xs font-semibold cursor-pointer"
                            >
                              Cancel
                            </button>
                            <button
                              type="button"
                              onClick={() => handleSaveScheduleEdit(job.id)}
                              className="px-4 py-1.5 rounded-lg bg-[#5925DC] hover:bg-[#471cb3] text-white text-xs font-semibold cursor-pointer"
                            >
                              Save Timing Changes
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-stone-200 bg-stone-50 flex items-center justify-between text-xs text-stone-500 shrink-0">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Automated in-app scheduler ticks every 10 seconds to check due dates.</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-white border border-stone-300 text-stone-700 hover:bg-stone-100 font-semibold cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
