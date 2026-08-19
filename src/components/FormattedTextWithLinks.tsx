import React from 'react';
import { ExternalLink, Mail, FileText, Globe } from 'lucide-react';

interface FormattedTextWithLinksProps {
  text?: string;
  className?: string;
  preserveLineBreaks?: boolean;
}

export const FormattedTextWithLinks: React.FC<FormattedTextWithLinksProps> = ({
  text = '',
  className = '',
  preserveLineBreaks = true,
}) => {
  if (!text) return null;

  // Pre-process text to separate any accidental concatenations like FORMhttps:// or APPLYhttps://
  const sanitizedText = text
    .replace(/([a-zA-Z0-9_-]+)(https?:\/\/)/gi, '$1 $2')
    .replace(/([a-zA-Z0-9_-]+)(www\.)/gi, '$1 $2');

  const lines = sanitizedText.split('\n');

  // Regex to extract URLs and Emails
  const URL_REGEX = /(https?:\/\/[^\s]+|www\.[^\s]+)/i;
  const EMAIL_REGEX = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/i;

  const renderWord = (word: string, key: string | number) => {
    // Check if the word is or contains an email
    if (EMAIL_REGEX.test(word)) {
      const match = word.match(EMAIL_REGEX);
      if (match) {
        const email = match[0];
        const before = word.substring(0, match.index);
        const after = word.substring((match.index || 0) + email.length);
        return (
          <span key={key} className="break-words">
            {before}
            <a
              href={`mailto:${email}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[#E25B38] hover:text-[#b84121] underline font-medium break-all px-1 py-0.5 rounded hover:bg-orange-50 transition-colors cursor-pointer"
            >
              <Mail className="w-3 h-3 shrink-0 inline opacity-80" />
              <span>{email}</span>
            </a>
            {after}
          </span>
        );
      }
    }

    // Check if the word is or contains a URL
    if (URL_REGEX.test(word)) {
      const match = word.match(URL_REGEX);
      if (match) {
        let rawUrl = match[0];
        const before = word.substring(0, match.index);
        
        // Strip trailing punctuation from the url (like trailing dot, comma, paren)
        let trailingPunctuation = '';
        const punctuationMatch = rawUrl.match(/[.,;:)\]]+$/);
        if (punctuationMatch) {
          trailingPunctuation = punctuationMatch[0];
          rawUrl = rawUrl.substring(0, rawUrl.length - trailingPunctuation.length);
        }

        const after = word.substring((match.index || 0) + match[0].length) + trailingPunctuation;

        let href = rawUrl;
        if (rawUrl.toLowerCase().startsWith('www.')) {
          href = `https://${rawUrl}`;
        }

        const isGoogleForm =
          rawUrl.includes('forms.gle') ||
          rawUrl.includes('docs.google.com/forms') ||
          rawUrl.includes('viewform');

        const isDocumentOrDrive =
          rawUrl.includes('drive.google.com') ||
          rawUrl.includes('docs.google.com');

        return (
          <span key={key} className="break-words">
            {before}
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-1.5 font-semibold text-xs sm:text-sm px-2.5 py-1 my-0.5 rounded-lg border transition-all shadow-2xs hover:shadow-xs cursor-pointer break-all max-w-full ${
                isGoogleForm
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100 hover:border-emerald-400'
                  : isDocumentOrDrive
                  ? 'bg-blue-50 text-blue-800 border-blue-200 hover:bg-blue-100'
                  : 'bg-orange-50 text-[#E25B38] border-orange-200 hover:bg-orange-100 hover:text-[#b84121]'
              }`}
              style={{ overflowWrap: 'anywhere', wordBreak: 'break-all' }}
              title={`Open ${href}`}
            >
              {isGoogleForm ? (
                <>
                  <FileText className="w-3.5 h-3.5 shrink-0 text-emerald-600" />
                  <span className="break-all underline">Google Application Form</span>
                  <ExternalLink className="w-3 h-3 shrink-0 opacity-70" />
                </>
              ) : isDocumentOrDrive ? (
                <>
                  <Globe className="w-3.5 h-3.5 shrink-0 text-blue-600" />
                  <span className="break-all underline">{rawUrl}</span>
                  <ExternalLink className="w-3 h-3 shrink-0 opacity-70" />
                </>
              ) : (
                <>
                  <ExternalLink className="w-3.5 h-3.5 shrink-0 opacity-80" />
                  <span className="break-all underline">{rawUrl}</span>
                </>
              )}
            </a>
            {after}
          </span>
        );
      }
    }

    return <span key={key}>{word} </span>;
  };

  const renderLine = (line: string, lineIdx: number) => {
    const words = line.split(' ');
    return (
      <p
        key={lineIdx}
        className="break-words max-w-full overflow-hidden mb-1.5 last:mb-0"
        style={{ overflowWrap: 'anywhere', wordBreak: 'break-word' }}
      >
        {words.map((word, wordIdx) => renderWord(word, `${lineIdx}-${wordIdx}`))}
      </p>
    );
  };

  return (
    <div
      className={`break-words max-w-full overflow-hidden ${className}`}
      style={{ overflowWrap: 'anywhere', wordBreak: 'break-word' }}
    >
      {lines.map((line, lineIdx) => renderLine(line, lineIdx))}
    </div>
  );
};
