import React, { useState } from 'react';
import { 
  X, 
  Trophy, 
  Flame, 
  Award, 
  CheckCircle2, 
  Edit3, 
  Check, 
  Cloud, 
  CloudOff,
  Sparkles,
  Zap,
  Target,
  ShieldCheck,
  Crown
} from 'lucide-react';

export default function ProfileModal({
  isOpen,
  onClose,
  currentUser,
  userStats = { solved: 0, streak: 0, maxStreak: 0, easy: 0, med: 0, hard: 0, easyTotal: 43, medTotal: 167, hardTotal: 95 },
  globalRank = 1,
  customDisplayName = '',
  onSaveDisplayName = () => {},
  onGoogleSignIn = () => {},
  onSignOut = () => {}
}) {
  const [isEditingName, setIsEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(customDisplayName || currentUser?.displayName || '');
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSaveName = () => {
    if (!nameInput.trim()) return;
    onSaveDisplayName(nameInput.trim());
    setIsEditingName(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  // Achievements calculation
  const achievements = [
    {
      id: 'first_blood',
      title: 'First Blood',
      desc: 'Solve your very first DSA problem',
      icon: Zap,
      unlocked: userStats.solved >= 1,
      color: 'text-amber-500 bg-amber-50 dark:bg-amber-950/60 border-amber-300'
    },
    {
      id: 'momentum_3',
      title: '3-Day Momentum',
      desc: 'Maintain a consecutive 3-day study streak',
      icon: Flame,
      unlocked: (userStats.streak >= 3 || userStats.maxStreak >= 3),
      color: 'text-orange-500 bg-orange-50 dark:bg-orange-950/60 border-orange-300'
    },
    {
      id: 'ten_club',
      title: 'Foundation Master',
      desc: 'Solve 10 curated algorithm problems',
      icon: Target,
      unlocked: userStats.solved >= 10,
      color: 'text-blue-500 bg-blue-50 dark:bg-blue-950/60 border-blue-300'
    },
    {
      id: 'streak_7',
      title: 'Consistency King',
      desc: 'Achieve a 7-day daily study streak',
      icon: Crown,
      unlocked: (userStats.streak >= 7 || userStats.maxStreak >= 7),
      color: 'text-purple-500 bg-purple-50 dark:bg-purple-950/60 border-purple-300'
    },
    {
      id: 'hard_conqueror',
      title: 'Hardcore Problem Solver',
      desc: 'Successfully conquer 3 Hard difficulty problems',
      icon: Trophy,
      unlocked: userStats.hard >= 3,
      color: 'text-rose-500 bg-rose-50 dark:bg-rose-950/60 border-rose-300'
    },
    {
      id: 'halfway_hero',
      title: 'Century Club',
      desc: 'Cross 100 solved LeetCode problems',
      icon: Award,
      unlocked: userStats.solved >= 100,
      color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300'
    }
  ];

  const unlockedCount = achievements.filter(a => a.unlocked).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-slate-700 overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95">
        
        {/* Profile Top Banner */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-slate-800 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center text-xl font-black text-white shadow-inner overflow-hidden shrink-0">
              {currentUser?.photoURL ? (
                <img src={currentUser.photoURL} alt="" className="w-full h-full object-cover" />
              ) : (
                (customDisplayName || currentUser?.displayName || 'G')[0].toUpperCase()
              )}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                {isEditingName ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={nameInput}
                      onChange={e => setNameInput(e.target.value)}
                      placeholder="Enter coder handle..."
                      className="px-2.5 py-1 text-sm font-bold text-gray-900 rounded bg-white focus:outline-none"
                    />
                    <button
                      onClick={handleSaveName}
                      className="px-2.5 py-1 text-xs font-bold rounded bg-emerald-500 text-white hover:bg-emerald-600"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setIsEditingName(false)}
                      className="text-xs text-white/80 hover:text-white"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <>
                    <h3 className="text-xl font-extrabold truncate">
                      {customDisplayName || currentUser?.displayName || 'Guest Coder'}
                    </h3>
                    <button
                      onClick={() => {
                        setNameInput(customDisplayName || currentUser?.displayName || '');
                        setIsEditingName(true);
                      }}
                      className="p-1 rounded hover:bg-white/10 text-white/80 hover:text-white"
                      title="Edit coder handle"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                  </>
                )}
              </div>

              <div className="flex items-center gap-2 mt-1 text-xs text-blue-100">
                <span>{currentUser?.email || 'Local Browser Profile'}</span>
                <span>•</span>
                {currentUser ? (
                  <span className="flex items-center gap-1 text-emerald-300 font-semibold">
                    <Cloud className="w-3 h-3" /> Cloud Synced
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-amber-300 font-semibold">
                    <CloudOff className="w-3 h-3" /> Guest Mode
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Profile Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {savedSuccess && (
            <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs flex items-center gap-2">
              <Check className="w-4 h-4" /> Coder handle updated successfully!
            </div>
          )}

          {/* Quick Metrics Cards */}
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-3.5 rounded-xl border border-gray-200 dark:border-slate-800 bg-gray-50/70 dark:bg-slate-800/40">
              <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Global Rank</div>
              <div className="text-2xl font-black text-blue-600 dark:text-blue-400 mt-0.5">
                {globalRank === '-' || !globalRank ? '-' : `#${globalRank}`}
              </div>
              <div className="text-[10px] text-gray-400">Leaderboard</div>
            </div>

            <div className="p-3.5 rounded-xl border border-gray-200 dark:border-slate-800 bg-gray-50/70 dark:bg-slate-800/40">
              <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Current Streak</div>
              <div className="text-2xl font-black text-amber-600 dark:text-amber-400 mt-0.5 flex items-center justify-center gap-1">
                <Flame className="w-5 h-5 fill-amber-500 text-amber-500" />
                {userStats.streak}d
              </div>
              <div className="text-[10px] text-gray-400">Best: {userStats.maxStreak}d</div>
            </div>

            <div className="p-3.5 rounded-xl border border-gray-200 dark:border-slate-800 bg-gray-50/70 dark:bg-slate-800/40">
              <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Total Solved</div>
              <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-0.5">
                {userStats.solved}
              </div>
              <div className="text-[10px] text-gray-400">of 305 ({Math.round((userStats.solved / 305) * 100)}%)</div>
            </div>
          </div>

          {/* Difficulty Breakdown Bars */}
          <div className="p-4 rounded-xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
            <h4 className="text-xs font-bold text-gray-800 dark:text-slate-200 uppercase tracking-wider">
              Difficulty Mastery
            </h4>

            {/* Easy */}
            <div>
              <div className="flex justify-between text-xs font-medium mb-1">
                <span className="text-emerald-600 font-bold">Easy</span>
                <span className="text-gray-500 font-mono">{userStats.easy} / {userStats.easyTotal || 43}</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-emerald-500 h-full rounded-full"
                  style={{ width: `${Math.round((userStats.easy / Math.max(1, userStats.easyTotal || 43)) * 100)}%` }}
                />
              </div>
            </div>

            {/* Medium */}
            <div>
              <div className="flex justify-between text-xs font-medium mb-1">
                <span className="text-amber-600 font-bold">Medium</span>
                <span className="text-gray-500 font-mono">{userStats.med} / {userStats.medTotal || 167}</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-amber-500 h-full rounded-full"
                  style={{ width: `${Math.round((userStats.med / Math.max(1, userStats.medTotal || 167)) * 100)}%` }}
                />
              </div>
            </div>

            {/* Hard */}
            <div>
              <div className="flex justify-between text-xs font-medium mb-1">
                <span className="text-rose-600 font-bold">Hard</span>
                <span className="text-gray-500 font-mono">{userStats.hard} / {userStats.hardTotal || 95}</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-rose-500 h-full rounded-full"
                  style={{ width: `${Math.round((userStats.hard / Math.max(1, userStats.hardTotal || 95)) * 100)}%` }}
                />
              </div>
            </div>
          </div>

          {/* Gamified Achievements Showcase */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold text-gray-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                <Award className="w-4 h-4 text-purple-500" />
                Achievements ({unlockedCount} / {achievements.length})
              </h4>
              <span className="text-[11px] text-gray-400">
                {Math.round((unlockedCount / achievements.length) * 100)}% Unlocked
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {achievements.map(a => {
                const IconComponent = a.icon;
                return (
                  <div
                    key={a.id}
                    className={`p-3 rounded-xl border flex items-start gap-2.5 transition-all ${
                      a.unlocked 
                        ? 'border-gray-300 dark:border-slate-700 bg-gray-50/80 dark:bg-slate-800/40' 
                        : 'border-dashed border-gray-200 dark:border-slate-800/60 opacity-40 bg-gray-50/20'
                    }`}
                  >
                    <div className={`p-2 rounded-lg shrink-0 ${a.unlocked ? a.color : 'bg-gray-200 text-gray-400'}`}>
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-bold text-xs text-gray-900 dark:text-white flex items-center gap-1">
                        <span className="truncate">{a.title}</span>
                        {a.unlocked && <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />}
                      </div>
                      <div className="text-[10px] text-gray-500 dark:text-gray-400 line-clamp-2 mt-0.5">
                        {a.desc}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Claim Rank Call to Action for Guests */}
          {!currentUser && (
            <div className="p-4 rounded-xl bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-transparent border border-blue-200 dark:border-blue-900 flex items-center justify-between gap-3 text-xs">
              <div>
                <div className="font-bold text-blue-900 dark:text-blue-200">
                  Ready to show up on the Global Leaderboard?
                </div>
                <div className="text-gray-500 dark:text-gray-400">
                  Sign in with your Google account to sync stats and claim your ranking spot.
                </div>
              </div>
              <button
                onClick={() => {
                  onClose();
                  onGoogleSignIn();
                }}
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shrink-0 transition-colors"
              >
                Sign In Now
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-gray-50 dark:bg-slate-800/60 border-t border-gray-200 dark:border-slate-800 flex justify-between items-center text-xs">
          {currentUser ? (
            <button
              onClick={() => {
                onClose();
                onSignOut();
              }}
              className="font-semibold text-rose-600 hover:text-rose-700"
            >
              Sign Out
            </button>
          ) : (
            <span className="text-gray-400">Guest Profile</span>
          )}
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-gray-200 dark:bg-slate-700 hover:bg-gray-300 dark:hover:bg-slate-600 text-gray-800 dark:text-gray-200 font-semibold transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
