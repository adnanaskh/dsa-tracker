import React, { useRef, useState } from 'react';
import { Download, Upload, FileText, Check, AlertCircle, X } from 'lucide-react';
import { INITIAL_QUESTIONS } from '../data/questionsData';

export default function ExportBackupModal({
  isOpen,
  onClose,
  trackerData,
  onRestoreData
}) {
  const [copiedStatus, setCopiedStatus] = useState(null);
  const [importError, setImportError] = useState(null);
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  // Export full JSON
  const handleExportJSON = () => {
    const backup = {
      app: 'DSA Mastery Tracker',
      version: '2.0',
      exportedAt: new Date().toISOString(),
      data: trackerData
    };

    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(backup, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `dsa_tracker_backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    setCopiedStatus('json');
    setTimeout(() => setCopiedStatus(null), 2500);
  };

  // Export CSV
  const handleExportCSV = () => {
    const qProgress = trackerData.questionsProgress || {};
    const solutions = trackerData.solutions || {};

    const headers = ['ID', 'Day', 'Topic', 'Question Name', 'Difficulty', 'Pattern', 'Status', 'Revisit Flag', 'Time Spent (min)', 'Has Solution', 'Link'];
    
    const rows = INITIAL_QUESTIONS.map(q => {
      const prog = qProgress[q.id] || {};
      const hasSol = !!solutions[`q_${q.id}`];

      const clean = (val) => `"${String(val || '').replace(/"/g, '""')}"`;

      return [
        q.id,
        q.day,
        clean(q.topic),
        clean(q.name),
        q.difficulty,
        clean(q.pattern),
        clean(prog.status || 'Not Started'),
        clean(prog.revisit || 'No'),
        clean(prog.timeSpent || ''),
        hasSol ? 'Yes' : 'No',
        clean(q.link)
      ].join(',');
    });

    const csvContent = 'data:text/csv;charset=utf-8,' + encodeURIComponent([headers.join(','), ...rows].join('\n'));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', csvContent);
    downloadAnchor.setAttribute('download', `dsa_progress_report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    setCopiedStatus('csv');
    setTimeout(() => setCopiedStatus(null), 2500);
  };

  // Handle Restore
  const handleFileChange = (e) => {
    setImportError(null);
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result);
        const importedData = parsed.data || parsed;
        if (
          !importedData || 
          typeof importedData !== 'object' ||
          (!importedData.questionsProgress && !importedData.solutions)
        ) {
          throw new Error('Invalid DSA Tracker backup format');
        }

        if (window.confirm('Are you sure you want to restore this backup? It will update your current progress.')) {
          onRestoreData(importedData);
          alert('Backup restored successfully!');
          onClose();
        }
      } catch (err) {
        setImportError(err.message || 'Failed to parse JSON file');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
      <div className="w-full max-w-lg bg-[#18181b] rounded-md border border-zinc-800 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-zinc-800">
          <div>
            <h3 className="text-sm font-semibold text-zinc-100">
              Data Backup & Export
            </h3>
            <p className="text-xs text-zinc-400">
              Save progress offline, export to CSV, or restore from a backup
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-zinc-400 hover:text-zinc-200 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-3">
          {importError && (
            <div className="flex items-center gap-2 p-2.5 text-xs rounded border border-rose-500/40 bg-rose-950/40 text-rose-300">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{importError}</span>
            </div>
          )}

          {/* Export JSON Card */}
          <div className="flex items-center justify-between p-3.5 rounded border border-zinc-800 bg-[#09090b]">
            <div>
              <div className="font-medium text-xs text-zinc-200">
                Complete Backup (JSON)
              </div>
              <div className="text-[11px] text-zinc-500">
                Includes all progress, custom code solutions, planner entries, and SRS revision logs.
              </div>
            </div>
            <button
              onClick={handleExportJSON}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded border border-indigo-500/40 bg-indigo-600 hover:bg-indigo-500 text-white transition-colors shrink-0 ml-3 cursor-pointer"
            >
              {copiedStatus === 'json' ? <Check className="w-3.5 h-3.5" /> : <Download className="w-3.5 h-3.5" />}
              {copiedStatus === 'json' ? 'Exported' : 'Export JSON'}
            </button>
          </div>

          {/* Export CSV Card */}
          <div className="flex items-center justify-between p-3.5 rounded border border-zinc-800 bg-[#09090b]">
            <div>
              <div className="font-medium text-xs text-zinc-200">
                Progress Spreadsheet (CSV)
              </div>
              <div className="text-[11px] text-zinc-500">
                Structured spreadsheet compatible with Excel, Google Sheets, or Notion.
              </div>
            </div>
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded border border-emerald-500/40 bg-emerald-600 hover:bg-emerald-500 text-white transition-colors shrink-0 ml-3 cursor-pointer"
            >
              {copiedStatus === 'csv' ? <Check className="w-3.5 h-3.5" /> : <FileText className="w-3.5 h-3.5" />}
              {copiedStatus === 'csv' ? 'Exported' : 'Export CSV'}
            </button>
          </div>

          {/* Restore Backup Card */}
          <div className="flex items-center justify-between p-3.5 rounded border border-dashed border-zinc-700 bg-[#09090b]">
            <div>
              <div className="font-medium text-xs text-zinc-200">
                Restore from JSON Backup
              </div>
              <div className="text-[11px] text-zinc-500">
                Load previously exported .json file to restore all progress.
              </div>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".json"
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded border border-zinc-700 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 transition-colors shrink-0 ml-3 cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5" />
              Upload Backup
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 bg-[#09090b] border-t border-zinc-800 text-right">
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 text-xs font-medium text-zinc-300 hover:bg-zinc-800 border border-zinc-700 rounded transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
