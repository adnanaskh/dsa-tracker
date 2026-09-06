import React, { useState, useMemo } from 'react';
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
  Crown,
  Star,
  Compass,
  Layers,
  Crosshair,
  Gem,
  TrendingUp,
  Medal,
  Activity,
  Cpu,
  Swords,
  Flag,
  BookOpen
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
  const [achievementFilter, setAchievementFilter] = useState('all');

  React.useEffect(() => {
    setNameInput(customDisplayName || currentUser?.displayName || '');
  }, [customDisplayName, currentUser, isOpen]);

  const handleSaveName = () => {
    if (!nameInput.trim()) return;
    onSaveDisplayName(nameInput.trim());
    setIsEditingName(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  // 24 Gamified Achievements Calculation
  const achievements = useMemo(() => [
    // Problem Solving Volume
    {
      id: 'first_blood',
      title: 'First Blood',
      desc: 'Solve your very first DSA problem',
      category: 'milestone',
      icon: Zap,
      unlocked: userStats.solved >= 1,
      color: 'text-amber-500 bg-amber-50 dark:bg-amber-950/60 border-amber-300'
    },
    {
      id: 'high_five',
      title: 'High Five',
      desc: 'Solve 5 algorithm problems',
      category: 'milestone',
      icon: Star,
      unlocked: userStats.solved >= 5,
      color: 'text-yellow-500 bg-yellow-50 dark:bg-yellow-950/60 border-yellow-300'
    },
    {
      id: 'ten_club',
      title: 'Foundation Master',
      desc: 'Solve 10 curated algorithm problems',
      category: 'milestone',
      icon: Target,
      unlocked: userStats.solved >= 10,
      color: 'text-blue-500 bg-blue-50 dark:bg-blue-950/60 border-blue-300'
    },
    {
      id: 'quarter_century',
      title: 'Quarter Century',
      desc: 'Conquer 25 curated DSA problems',
      category: 'milestone',
      icon: Compass,
      unlocked: userStats.solved >= 25,
      color: 'text-cyan-500 bg-cyan-50 dark:bg-cyan-950/60 border-cyan-300'
    },
    {
      id: 'half_century',
      title: 'Half Century',
      desc: 'Reach 50 solved algorithm problems',
      category: 'milestone',
      icon: Layers,
      unlocked: userStats.solved >= 50,
      color: 'text-indigo-500 bg-indigo-50 dark:bg-indigo-950/60 border-indigo-300'
    },
    {
      id: 'blind_75',
      title: 'Blind 75 Milestone',
      desc: 'Complete 75 core interview problems',
      category: 'milestone',
      icon: Crosshair,
      unlocked: userStats.solved >= 75,
      color: 'text-purple-500 bg-purple-50 dark:bg-purple-950/60 border-purple-300'
    },
    {
      id: 'century_club',
      title: 'Century Club',
      desc: 'Cross 100 solved LeetCode problems',
      category: 'milestone',
      icon: Award,
      unlocked: userStats.solved >= 100,
      color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300'
    },
    {
      id: 'double_century',
      title: 'Double Century',
      desc: 'Cross 200 solved algorithm problems',
      category: 'milestone',
      icon: Gem,
      unlocked: userStats.solved >= 200,
      color: 'text-fuchsia-500 bg-fuchsia-50 dark:bg-fuchsia-950/60 border-fuchsia-300'
    },
    {
      id: 'grandmaster',
      title: 'Grandmaster Finale',
      desc: 'Conquer all 305 problems in the roadmap',
      category: 'milestone',
      icon: Crown,
      unlocked: userStats.solved >= 305,
      color: 'text-amber-500 bg-amber-50 dark:bg-amber-950/60 border-amber-300'
    },

    // Study Streak & Consistency
    {
      id: 'momentum_3',
      title: '3-Day Momentum',
      desc: 'Maintain a consecutive 3-day study streak',
      category: 'streak',
      icon: Flame,
      unlocked: (userStats.streak >= 3 || userStats.maxStreak >= 3),
      color: 'text-orange-500 bg-orange-50 dark:bg-orange-950/60 border-orange-300'
    },
    {
      id: 'streak_7',
      title: 'Consistency King',
      desc: 'Achieve a 7-day daily study streak',
      category: 'streak',
      icon: Crown,
      unlocked: (userStats.streak >= 7 || userStats.maxStreak >= 7),
      color: 'text-purple-500 bg-purple-50 dark:bg-purple-950/60 border-purple-300'
    },
    {
      id: 'streak_14',
      title: 'Fortnight Warrior',
      desc: 'Maintain a 14-day continuous study streak',
      category: 'streak',
      icon: TrendingUp,
      unlocked: (userStats.streak >= 14 || userStats.maxStreak >= 14),
      color: 'text-sky-500 bg-sky-50 dark:bg-sky-950/60 border-sky-300'
    },
    {
      id: 'streak_30',
      title: 'Monthly Devotion',
      desc: 'Maintain a 30-day consecutive study streak',
      category: 'streak',
      icon: Sparkles,
      unlocked: (userStats.streak >= 30 || userStats.maxStreak >= 30),
      color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300'
    },
    {
      id: 'streak_60',
      title: 'Diamond Discipline',
      desc: 'Complete 60 days of consecutive daily study',
      category: 'streak',
      icon: ShieldCheck,
      unlocked: (userStats.streak >= 60 || userStats.maxStreak >= 60),
      color: 'text-blue-500 bg-blue-50 dark:bg-blue-950/60 border-blue-300'
    },

    // Difficulty Mastery: Easy
    {
      id: 'easy_10',
      title: 'Easy Warmup',
      desc: 'Solve 10 Easy difficulty problems',
      category: 'difficulty',
      icon: CheckCircle2,
      unlocked: userStats.easy >= 10,
      color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300'
    },
    {
      id: 'easy_25',
      title: 'Easy Ace',
      desc: 'Solve 25 Easy difficulty problems',
      category: 'difficulty',
      icon: Medal,
      unlocked: userStats.easy >= 25,
      color: 'text-teal-500 bg-teal-50 dark:bg-teal-950/60 border-teal-300'
    },

    // Difficulty Mastery: Medium
    {
      id: 'med_10',
      title: 'Medium Explorer',
      desc: 'Solve 10 Medium difficulty problems',
      category: 'difficulty',
      icon: Activity,
      unlocked: userStats.med >= 10,
      color: 'text-amber-500 bg-amber-50 dark:bg-amber-950/60 border-amber-300'
    },
    {
      id: 'med_30',
      title: 'Medium Maestro',
      desc: 'Solve 30 Medium difficulty problems',
      category: 'difficulty',
      icon: Cpu,
      unlocked: userStats.med >= 30,
      color: 'text-orange-500 bg-orange-50 dark:bg-orange-950/60 border-orange-300'
    },
    {
      id: 'med_75',
      title: 'Medium Dominator',
      desc: 'Solve 75 Medium difficulty problems',
      category: 'difficulty',
      icon: Swords,
      unlocked: userStats.med >= 75,
      color: 'text-rose-500 bg-rose-50 dark:bg-rose-950/60 border-rose-300'
    },

    // Difficulty Mastery: Hard
    {
      id: 'hard_1',
      title: 'Hard Initiate',
      desc: 'Conquer your very first Hard problem',
      category: 'difficulty',
      icon: Flag,
      unlocked: userStats.hard >= 1,
      color: 'text-rose-500 bg-rose-50 dark:bg-rose-950/60 border-rose-300'
    },
    {
      id: 'hard_conqueror',
      title: 'Hardcore Problem Solver',
      desc: 'Successfully conquer 3 Hard problems',
      category: 'difficulty',
      icon: Trophy,
      unlocked: userStats.hard >= 3,
      color: 'text-rose-600 bg-rose-50 dark:bg-rose-950/60 border-rose-300'
    },
    {
      id: 'hard_10',
      title: 'Titan of Algorithms',
      desc: 'Conquer 10 Hard difficulty problems',
      category: 'difficulty',
      icon: Swords,
      unlocked: userStats.hard >= 10,
      color: 'text-purple-600 bg-purple-50 dark:bg-purple-950/60 border-purple-300'
    },
    {
      id: 'hard_25',
      title: 'Apex Legend',
      desc: 'Conquer 25 Hard difficulty problems',
      category: 'difficulty',
      icon: Crown,
      unlocked: userStats.hard >= 25,
      color: 'text-amber-600 bg-amber-50 dark:bg-amber-950/60 border-amber-300'
    },

    // Versatility
    {
      id: 'balanced_triad',
      title: 'Balanced Triad',
      desc: 'Solve at least 10 Easy, 10 Medium, and 2 Hard problems',
      category: 'versatility',
      icon: BookOpen,
      unlocked: (userStats.easy >= 10 && userStats.med >= 10 && userStats.hard >= 2),
      color: 'text-indigo-600 bg-indigo-50 dark:bg-indigo-950/60 border-indigo-300'
    }
  ], [userStats]);

  const unlockedCount = achievements.filter(a => a.unlocked).length;

  if (!isOpen) return null;

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

          {/* Gamified Achievements Showcase (24 Achievements) */}
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <h4 className="text-xs font-bold text-gray-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-purple-500" />
                  Achievements ({unlockedCount} / {achievements.length})
                </h4>
                <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                  {Math.round((unlockedCount / achievements.length) * 100)}%
                </span>
              </div>

              {/* Filter Pills */}
              <div className="flex items-center gap-1 bg-gray-100 dark:bg-slate-800 p-0.5 rounded-lg text-[11px]">
                <button
                  type="button"
                  onClick={() => setAchievementFilter('all')}
                  className={`px-2 py-0.5 rounded font-semibold transition-colors ${
                    achievementFilter === 'all'
                      ? 'bg-white dark:bg-slate-700 text-gray-900 dark:text-white shadow-2xs'
                      : 'text-gray-500 hover:text-gray-800 dark:text-gray-400'
                  }`}
                >
                  All ({achievements.length})
                </button>
                <button
                  type="button"
                  onClick={() => setAchievementFilter('unlocked')}
                  className={`px-2 py-0.5 rounded font-semibold transition-colors ${
                    achievementFilter === 'unlocked'
                      ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-2xs'
                      : 'text-gray-500 hover:text-gray-800 dark:text-gray-400'
                  }`}
                >
                  Unlocked ({unlockedCount})
                </button>
                <button
                  type="button"
                  onClick={() => setAchievementFilter('locked')}
                  className={`px-2 py-0.5 rounded font-semibold transition-colors ${
                    achievementFilter === 'locked'
                      ? 'bg-white dark:bg-slate-700 text-gray-900 dark:text-white shadow-2xs'
                      : 'text-gray-500 hover:text-gray-800 dark:text-gray-400'
                  }`}
                >
                  Locked ({achievements.length - unlockedCount})
                </button>
              </div>
            </div>

            {/* Achievement Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[340px] overflow-y-auto pr-1">
              {achievements
                .filter(a => {
                  if (achievementFilter === 'unlocked') return a.unlocked;
                  if (achievementFilter === 'locked') return !a.unlocked;
                  return true;
                })
                .map(a => {
                  const IconComponent = a.icon;
                  return (
                    <div
                      key={a.id}
                      className={`p-3 rounded-xl border flex items-start gap-2.5 transition-all ${
                        a.unlocked 
                          ? 'border-gray-300 dark:border-slate-700 bg-gray-50/80 dark:bg-slate-800/40 shadow-2xs' 
                          : 'border-dashed border-gray-200 dark:border-slate-800/60 opacity-50 bg-gray-50/20'
                      }`}
                    >
                      <div className={`p-2 rounded-lg shrink-0 ${a.unlocked ? a.color : 'bg-gray-200 dark:bg-slate-800 text-gray-400'}`}>
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
