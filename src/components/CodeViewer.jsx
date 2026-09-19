import React, { useState } from 'react';
import { Copy, Check, Code2 } from 'lucide-react';

/**
 * Lightweight, robust syntax highlighter for code display adhering to design.md
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
      return <span className="text-zinc-500 italic">{line}</span>;
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
        <span key={idx} className="text-indigo-400 font-semibold">
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
    <div className="rounded-md border border-zinc-800 overflow-hidden bg-[#18181b] font-mono text-sm">
      {/* Code Header Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#18181b] border-b border-zinc-800 text-xs text-zinc-400 font-sans">
        <div className="flex items-center gap-2">
          <Code2 className="w-4 h-4 text-emerald-500" />
          <span className="uppercase font-bold tracking-wider px-2 py-0.5 rounded border border-zinc-700 bg-zinc-800 text-zinc-200 text-[11px]">
            {language}
          </span>
          <span>{lines.length} lines • {code.length} chars</span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded border border-zinc-700 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-medium transition-colors cursor-pointer"
          title="Copy code to clipboard"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-zinc-400" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Container with Line Numbers */}
      <div className="max-h-[500px] overflow-y-auto overflow-x-auto p-4 leading-relaxed select-text bg-[#09090b] text-zinc-200 font-mono">
        <table className="w-full border-collapse">
          <tbody>
            {lines.map((line, i) => (
              <tr key={i} className="hover:bg-zinc-900/60">
                <td className="w-10 pr-4 text-right select-none text-zinc-600 text-xs align-top font-mono">
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
