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
          alert('Backup restored successfully! 🎉');
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-gray-200 dark:border-slate-700 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-slate-800">
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-slate-100">
              Data Backup & Export
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Save your progress offline, export to Excel/Sheets, or restore from a backup
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {importError && (
            <div className="flex items-center gap-2 p-3 text-xs rounded-lg bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{importError}</span>
            </div>
          )}

          {/* Export JSON Card */}
          <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800/50">
            <div>
              <div className="font-semibold text-sm text-gray-800 dark:text-slate-200">
                Complete Backup (JSON)
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Includes all questions progress, custom code solutions, planner entries, and revision logs.
              </div>
            </div>
            <button
              onClick={handleExportJSON}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-md bg-blue-600 hover:bg-blue-700 text-white transition-colors shrink-0 ml-3"
            >
              {copiedStatus === 'json' ? <Check className="w-3.5 h-3.5" /> : <Download className="w-3.5 h-3.5" />}
              {copiedStatus === 'json' ? 'Downloaded!' : 'Export JSON'}
            </button>
          </div>

          {/* Export CSV Card */}
          <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800/50">
            <div>
              <div className="font-semibold text-sm text-gray-800 dark:text-slate-200">
                Progress Spreadsheet (CSV)
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Structured spreadsheet compatible with Excel, Google Sheets, or Notion.
              </div>
            </div>
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-md bg-emerald-600 hover:bg-emerald-700 text-white transition-colors shrink-0 ml-3"
            >
              {copiedStatus === 'csv' ? <Check className="w-3.5 h-3.5" /> : <FileText className="w-3.5 h-3.5" />}
              {copiedStatus === 'csv' ? 'Downloaded!' : 'Export CSV'}
            </button>
          </div>

          {/* Restore Backup Card */}
          <div className="flex items-center justify-between p-4 rounded-lg border border-dashed border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900">
            <div>
              <div className="font-semibold text-sm text-gray-800 dark:text-slate-200">
                Restore from JSON Backup
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Load previously downloaded .json file to restore your progress.
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
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-md bg-gray-800 hover:bg-gray-700 dark:bg-slate-700 dark:hover:bg-slate-600 text-white transition-colors shrink-0 ml-3"
            >
              <Upload className="w-3.5 h-3.5" />
              Upload Backup
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-gray-50 dark:bg-slate-800/50 border-t border-gray-200 dark:border-slate-800 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700 rounded-md transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
