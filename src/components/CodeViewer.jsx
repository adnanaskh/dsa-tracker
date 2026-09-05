import React, { useState } from 'react';
import { Copy, Check, Code2 } from 'lucide-react';

/**
 * Lightweight, robust syntax highlighter for code display
 */
export default function CodeViewer({ code = '', language = 'java', isDark = false }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.split('\n');

  // Syntax colorizer for common programming languages
  const highlightToken = (line) => {
    // Basic tokenizer for syntax presentation
    // Comments
    if (line.trim().startsWith('//') || line.trim().startsWith('#')) {
      return <span className="text-gray-400 dark:text-gray-500 italic">{line}</span>;
    }

    const keywordRegex = /\b(class|public|private|protected|static|final|void|int|double|float|char|boolean|new|return|if|else|for|while|do|switch|case|break|continue|default|import|package|def|import|from|as|in|elif|try|except|finally|lambda|const|let|var|function|async|await|struct|impl|fn|mut|pub|type|interface)\b/g;

    const parts = [];
    let lastIndex = 0;
    const matches = [...line.matchAll(keywordRegex)];

    matches.forEach((m, idx) => {
      const matchIndex = m.index;
      if (matchIndex > lastIndex) {
        parts.push(line.substring(lastIndex, matchIndex));
      }
      parts.push(
        <span key={idx} className="text-blue-600 dark:text-blue-400 font-semibold">
          {m[0]}
        </span>
      );
      lastIndex = matchIndex + m[0].length;
    });

    if (lastIndex < line.length) {
      parts.push(line.substring(lastIndex));
    }

    return parts.length > 0 ? parts : line;
  };

  return (
    <div className="rounded-lg border border-gray-300 dark:border-slate-700 overflow-hidden bg-white dark:bg-slate-900 shadow-sm font-mono text-sm">
      {/* Code Header Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-100 dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 text-xs text-gray-600 dark:text-gray-300 font-sans">
        <div className="flex items-center gap-2">
          <Code2 className="w-4 h-4 text-emerald-500" />
          <span className="uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-gray-200 dark:bg-slate-700 text-gray-800 dark:text-gray-200 text-[11px]">
            {language}
          </span>
          <span>{lines.length} lines • {code.length} chars</span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-1 rounded bg-white dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-slate-600 font-medium transition-colors"
          title="Copy code to clipboard"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span className="text-emerald-600 dark:text-emerald-400">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Container with Line Numbers */}
      <div className="max-h-[500px] overflow-y-auto overflow-x-auto p-4 leading-relaxed select-text bg-[#fafafa] dark:bg-[#0d1117] text-gray-800 dark:text-gray-200">
        <table className="w-full border-collapse">
          <tbody>
            {lines.map((line, i) => (
              <tr key={i} className="hover:bg-gray-200/50 dark:hover:bg-slate-800/50">
                <td className="w-10 pr-4 text-right select-none text-gray-400 dark:text-gray-600 text-xs align-top font-mono">
                  {i + 1}
                </td>
                <td className="whitespace-pre font-mono text-[13px] break-all">
                  {highlightToken(line)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
