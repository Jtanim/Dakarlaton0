import { JobListing, JobStatus, SchedulerLogEntry } from '../types';

export const LOCAL_STORAGE_LOGS_KEY = 'dakarlaton_scheduler_logs';

/**
 * Determines whether a job listing is currently live and visible to the public.
 */
export function isJobLive(job: JobListing, now: Date = new Date()): boolean {
  if (job.status === 'draft') return false;
  if (job.status === 'expired') return false;

  // Check scheduled publish date/time
  if (job.scheduledAt) {
    const scheduledTime = new Date(job.scheduledAt).getTime();
    if (!isNaN(scheduledTime) && scheduledTime > now.getTime()) {
      return false; // Still pending future publish
    }
  } else if (job.status === 'scheduled') {
    return false;
  }

  // Check expiry date/time
  if (job.expiresAt) {
    const expiryTime = new Date(job.expiresAt).getTime();
    if (!isNaN(expiryTime) && expiryTime <= now.getTime()) {
      return false; // Has reached or passed expiry
    }
  }

  return true;
}

/**
 * Returns the effective operational status of a job given the current time.
 */
export function getJobComputedStatus(job: JobListing, now: Date = new Date()): JobStatus {
  if (job.status === 'draft') return 'draft';
  if (job.status === 'expired') return 'expired';

  // Check if expired
  if (job.expiresAt) {
    const expiryTime = new Date(job.expiresAt).getTime();
    if (!isNaN(expiryTime) && expiryTime <= now.getTime()) {
      return 'expired';
    }
  }

  // Check if scheduled for future
  if (job.scheduledAt) {
    const scheduledTime = new Date(job.scheduledAt).getTime();
    if (!isNaN(scheduledTime) && scheduledTime > now.getTime()) {
      return 'scheduled';
    }
  } else if (job.status === 'scheduled') {
    return 'scheduled';
  }

  return 'published';
}

/**
 * Formats a duration in a concise human-readable way.
 */
export function formatTimeRemaining(targetIso: string, now: Date = new Date()): {
  text: string;
  isPast: boolean;
  diffMinutes: number;
} {
  const targetTime = new Date(targetIso).getTime();
  if (isNaN(targetTime)) {
    return { text: 'Invalid date', isPast: false, diffMinutes: 0 };
  }

  const diffMs = targetTime - now.getTime();
  const isPast = diffMs <= 0;
  const absMs = Math.abs(diffMs);

  const seconds = Math.floor(absMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  let text = '';
  if (days > 0) {
    text = `${days}d ${hours % 24}h`;
  } else if (hours > 0) {
    text = `${hours}h ${minutes % 60}m`;
  } else if (minutes > 0) {
    text = `${minutes}m ${seconds % 60}s`;
  } else {
    text = `${seconds}s`;
  }

  return {
    text: isPast ? `${text} ago` : `in ${text}`,
    isPast,
    diffMinutes: Math.floor(diffMs / 60000),
  };
}

/**
 * Read scheduler audit logs from local cache.
 */
export function getStoredSchedulerLogs(): SchedulerLogEntry[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_LOGS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (e) {
    console.warn('Could not read scheduler logs:', e);
  }
  return [];
}

/**
 * Save scheduler audit logs to local cache.
 */
export function saveSchedulerLogs(logs: SchedulerLogEntry[]): void {
  try {
    // Keep last 100 entries
    const trimmed = logs.slice(0, 100);
    localStorage.setItem(LOCAL_STORAGE_LOGS_KEY, JSON.stringify(trimmed));
  } catch (e) {
    console.warn('Could not save scheduler logs:', e);
  }
}

/**
 * Appends a log entry to scheduler audit logs.
 */
export function appendSchedulerLog(entry: Omit<SchedulerLogEntry, 'id' | 'timestamp'>): SchedulerLogEntry {
  const now = new Date();
  const newEntry: SchedulerLogEntry = {
    ...entry,
    id: `log-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    timestamp: now.toISOString(),
  };

  const current = getStoredSchedulerLogs();
  const updated = [newEntry, ...current];
  saveSchedulerLogs(updated);

  // Friendly console output for developer/debug audit
  const prefix =
    newEntry.action === 'AUTO_PUBLISHED'
      ? '🟢 [SCHEDULER AUTO-PUBLISH]'
      : newEntry.action === 'AUTO_EXPIRED'
      ? '⚪ [SCHEDULER AUTO-EXPIRE]'
      : newEntry.action === 'ERROR'
      ? '🔴 [SCHEDULER ERROR]'
      : '🕒 [SCHEDULER INFO]';
  console.log(`${prefix} ${newEntry.jobTitle} (${newEntry.company}): ${newEntry.message}`);

  return newEntry;
}
