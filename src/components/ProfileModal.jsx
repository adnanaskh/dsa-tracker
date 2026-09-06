import React, { useState, useMemo, useEffect } from 'react';
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
  BookOpen,
  Share2,
  Copy,
  Trash2,
  Globe,
  ExternalLink,
  User,
  Lock,
  AlertTriangle,
  Calendar
} from 'lucide-react';
import ActivityHeatmap from './ActivityHeatmap';
import { INITIAL_QUESTIONS } from '../data/questionsData';

function LinkedinIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.64 1.64 0 1 0 0 3.28 1.64 1.64 0 0 0 0-3.28" />
    </svg>
  );
}

function GithubIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

export default function ProfileModal({
  isOpen,
  onClose,
  currentUser,
  profileData = null, // If viewing another user's public profile
  userStats = { solved: 0, streak: 0, maxStreak: 0, easy: 0, med: 0, hard: 0, easyTotal: 43, medTotal: 167, hardTotal: 95 },
  globalRank = 1,
  customDisplayName = '',
  customUsername = '',
  customBio = '',
  customLinkedin = '',
  customGithub = '',
  questionsProgress = {},
  revisionLogs = {},
  onSaveProfile = () => {},
  onDeleteProfile = () => {},
  onGoogleSignIn = () => {},
  onSignOut = () => {}
}) {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'heatmap' | 'achievements'
  const [isEditing, setIsEditing] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [achievementFilter, setAchievementFilter] = useState('all');

  // Determine if viewer is the owner of this profile
  const isOwner = useMemo(() => {
    if (!profileData) return true; // Viewing own profile modal
    if (!currentUser) return false;
    return currentUser.uid === profileData.uid;
  }, [profileData, currentUser]);

  // Active profile info (supports both own profile and public user profile)
  const displayUser = useMemo(() => {
    if (profileData) {
      const qProg = { ...(profileData.questionsProgress || {}) };
      const rLogs = { ...(profileData.revisionLogs || {}) };

      // Calculate solved count and difficulty counts from questionsProgress if present
      let solvedCalculated = 0;
      let easyCalculated = 0;
      let medCalculated = 0;
      let hardCalculated = 0;

      Object.entries(qProg).forEach(([qId, item]) => {
        if (item && item.status === '✅ Done') {
          solvedCalculated++;
          const qObj = INITIAL_QUESTIONS.find(q => String(q.id) === String(qId));
          if (qObj) {
            if (qObj.difficulty === 'Easy') easyCalculated++;
            else if (qObj.difficulty === 'Medium') medCalculated++;
            else if (qObj.difficulty === 'Hard') hardCalculated++;
          }
        }
      });

      const finalSolved = profileData.solvedCount ?? (solvedCalculated || profileData.solved || 0);
      const finalEasy = profileData.easyCount ?? (easyCalculated || profileData.easy || 0);
      const finalMed = profileData.medCount ?? (medCalculated || profileData.med || 0);
      const finalHard = profileData.hardCount ?? (hardCalculated || profileData.hard || 0);
      const finalStreak = profileData.streak ?? (profileData.streakCount || 0);
      const finalMaxStreak = profileData.maxStreak ?? Math.max(finalStreak, profileData.streak || 0);

      // If qProg is empty but user has solvedCount > 0, generate timestamps for the heatmap
      if (Object.keys(qProg).length === 0 && finalSolved > 0) {
        let easyDone = 0, medDone = 0, hardDone = 0;
        const baseDate = profileData.lastActive ? new Date(profileData.lastActive) : new Date();

        INITIAL_QUESTIONS.forEach((q, idx) => {
          let shouldMark = false;
          if (q.difficulty === 'Easy' && easyDone < finalEasy) {
            shouldMark = true;
            easyDone++;
          } else if (q.difficulty === 'Medium' && medDone < finalMed) {
            shouldMark = true;
            medDone++;
          } else if (q.difficulty === 'Hard' && hardDone < finalHard) {
            shouldMark = true;
            hardDone++;
          }

          if (shouldMark) {
            const d = new Date(baseDate);
            d.setDate(d.getDate() - (idx % 45));
            qProg[q.id] = {
              status: '✅ Done',
              completedAt: d.toISOString(),
              date: d.toISOString()
            };
          }
        });
      }

      const fbName = profileData.displayName || profileData.email?.split('@')[0] || (profileData.uid ? `User_${profileData.uid.slice(0, 5)}` : 'User');
      const fbUser = profileData.username || profileData.displayName?.toLowerCase().replace(/[^a-z0-9_]/g, '') || profileData.email?.split('@')[0] || (profileData.uid ? `user_${profileData.uid.slice(0, 5)}` : 'user');

      return {
        uid: profileData.uid,
        displayName: fbName,
        username: fbUser,
        photoURL: profileData.photoURL || null,
        email: profileData.email || '',
        bio: profileData.bio || 'Cracking FAANG & top tech coding interviews with DSA Tracker.',
        linkedin: profileData.linkedin || '',
        github: profileData.github || '',
        rank: profileData.rank || globalRank || '-',
        solved: finalSolved,
        streak: finalStreak,
        maxStreak: finalMaxStreak,
        easy: finalEasy,
        med: finalMed,
        hard: finalHard,
        questionsProgress: qProg,
        revisionLogs: rLogs
      };
    }

    const defaultUsername = customUsername || currentUser?.displayName?.toLowerCase().replace(/[^a-z0-9_]/g, '') || currentUser?.email?.split('@')[0].toLowerCase().replace(/[^a-z0-9_]/g, '') || 'my_profile';
    const defaultDisplayName = customDisplayName || currentUser?.displayName || currentUser?.email?.split('@')[0] || (currentUser ? 'User' : 'Guest');

    return {
      uid: currentUser?.uid || 'guest',
      displayName: defaultDisplayName,
      username: defaultUsername,
      photoURL: currentUser?.photoURL || null,
      email: currentUser?.email || '',
      bio: customBio || 'Cracking FAANG & top tech coding interviews with DSA Tracker.',
      linkedin: customLinkedin || '',
      github: customGithub || '',
      rank: globalRank || '-',
      solved: userStats.solved,
      streak: userStats.streak,
      maxStreak: userStats.maxStreak,
      easy: userStats.easy,
      med: userStats.med,
      hard: userStats.hard,
      questionsProgress: questionsProgress,
      revisionLogs: revisionLogs
    };
  }, [
    profileData,
    currentUser,
    customDisplayName,
    customUsername,
    customBio,
    customLinkedin,
    customGithub,
    globalRank,
    userStats,
    questionsProgress,
    revisionLogs
  ]);

  // Edit form state
  const [editForm, setEditForm] = useState({
    displayName: '',
    username: '',
    bio: '',
    linkedin: '',
    github: ''
  });

  useEffect(() => {
    if (isOpen) {
      setEditForm({
        displayName: displayUser.displayName,
        username: displayUser.username,
        bio: displayUser.bio,
        linkedin: displayUser.linkedin,
        github: displayUser.github
      });
      setIsEditing(false);
      setIsConfirmingDelete(false);
    }
  }, [isOpen, displayUser]);
  const publicProfileUrl = useMemo(() => {
    const u = displayUser.username || 'coder';
    return `https://dsa.adnanahmad.tech/${encodeURIComponent(u)}`;
  }, [displayUser.username]);

  // Sync browser address bar with direct /username URL while viewing profile
  useEffect(() => {
    if (isOpen && displayUser?.username) {
      try {
        const targetPath = `/${encodeURIComponent(displayUser.username)}`;
        if (window.location.pathname !== targetPath) {
          window.history.pushState({ username: displayUser.username }, '', targetPath);
        }
      } catch {}
    }
  }, [isOpen, displayUser?.username]);

  const handleCopyProfileLink = () => {
    navigator.clipboard.writeText(publicProfileUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleSaveProfileForm = (e) => {
    e.preventDefault();
    const cleanUsername = editForm.username.toLowerCase().replace(/[^a-z0-9_]/g, '').trim();
    if (!cleanUsername) {
      alert('Please enter a valid username (letters, numbers, underscores).');
      return;
    }

    onSaveProfile({
      displayName: editForm.displayName.trim() || 'Coder',
      username: cleanUsername,
      bio: editForm.bio.trim(),
      linkedin: editForm.linkedin.trim(),
      github: editForm.github.trim()
    });

    setIsEditing(false);
  };

  const handleExecuteDelete = async () => {
    if (!isOwner || !currentUser) return;
    setIsDeleting(true);
    try {
      await onDeleteProfile();
      setIsConfirmingDelete(false);
      onClose();
    } catch (err) {
      console.error("Error deleting profile:", err);
      alert("Failed to delete profile. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  // 24 Gamified Achievements Calculation based on displayUser stats
  const achievements = useMemo(() => [
    // Problem Solving Volume
    {
      id: 'first_blood',
      title: 'First Blood',
      desc: 'Solve your very first DSA problem',
      icon: Zap,
      unlocked: displayUser.solved >= 1,
      color: 'text-amber-500 bg-amber-50 dark:bg-amber-950/60 border-amber-300'
    },
    {
      id: 'high_five',
      title: 'High Five',
      desc: 'Solve 5 algorithm problems',
      icon: Star,
      unlocked: displayUser.solved >= 5,
      color: 'text-yellow-500 bg-yellow-50 dark:bg-yellow-950/60 border-yellow-300'
    },
    {
      id: 'ten_club',
      title: 'Foundation Master',
      desc: 'Solve 10 curated algorithm problems',
      icon: Target,
      unlocked: displayUser.solved >= 10,
      color: 'text-blue-500 bg-blue-50 dark:bg-blue-950/60 border-blue-300'
    },
    {
      id: 'quarter_century',
      title: 'Quarter Century',
      desc: 'Conquer 25 curated DSA problems',
      icon: Compass,
      unlocked: displayUser.solved >= 25,
      color: 'text-cyan-500 bg-cyan-50 dark:bg-cyan-950/60 border-cyan-300'
    },
    {
      id: 'half_century',
      title: 'Half Century',
      desc: 'Reach 50 solved algorithm problems',
      icon: Layers,
      unlocked: displayUser.solved >= 50,
      color: 'text-indigo-500 bg-indigo-50 dark:bg-indigo-950/60 border-indigo-300'
    },
    {
      id: 'blind_75',
      title: 'Blind 75 Milestone',
      desc: 'Complete 75 core interview problems',
      icon: Crosshair,
      unlocked: displayUser.solved >= 75,
      color: 'text-purple-500 bg-purple-50 dark:bg-purple-950/60 border-purple-300'
    },
    {
      id: 'century_club',
      title: 'Century Club',
      desc: 'Cross 100 solved LeetCode problems',
      icon: Award,
      unlocked: displayUser.solved >= 100,
      color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300'
    },
    {
      id: 'double_century',
      title: 'Double Century',
      desc: 'Cross 200 solved algorithm problems',
      icon: Gem,
      unlocked: displayUser.solved >= 200,
      color: 'text-fuchsia-500 bg-fuchsia-50 dark:bg-fuchsia-950/60 border-fuchsia-300'
    },
    {
      id: 'grandmaster',
      title: 'Grandmaster Finale',
      desc: 'Conquer all 305 problems in the roadmap',
      icon: Crown,
      unlocked: displayUser.solved >= 305,
      color: 'text-amber-500 bg-amber-50 dark:bg-amber-950/60 border-amber-300'
    },

    // Study Streak & Consistency
    {
      id: 'momentum_3',
      title: '3-Day Momentum',
      desc: 'Maintain a consecutive 3-day study streak',
      icon: Flame,
      unlocked: (displayUser.streak >= 3 || displayUser.maxStreak >= 3),
      color: 'text-orange-500 bg-orange-50 dark:bg-orange-950/60 border-orange-300'
    },
    {
      id: 'streak_7',
      title: 'Consistency King',
      desc: 'Achieve a 7-day daily study streak',
      icon: Crown,
      unlocked: (displayUser.streak >= 7 || displayUser.maxStreak >= 7),
      color: 'text-purple-500 bg-purple-50 dark:bg-purple-950/60 border-purple-300'
    },
    {
      id: 'streak_14',
      title: 'Fortnight Warrior',
      desc: 'Maintain a 14-day continuous study streak',
      icon: TrendingUp,
      unlocked: (displayUser.streak >= 14 || displayUser.maxStreak >= 14),
      color: 'text-sky-500 bg-sky-50 dark:bg-sky-950/60 border-sky-300'
    },
    {
      id: 'streak_30',
      title: 'Monthly Devotion',
      desc: 'Maintain a 30-day consecutive study streak',
      icon: Sparkles,
      unlocked: (displayUser.streak >= 30 || displayUser.maxStreak >= 30),
      color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300'
    },
    {
      id: 'streak_60',
      title: 'Diamond Discipline',
      desc: 'Complete 60 days of consecutive daily study',
      icon: ShieldCheck,
      unlocked: (displayUser.streak >= 60 || displayUser.maxStreak >= 60),
      color: 'text-blue-500 bg-blue-50 dark:bg-blue-950/60 border-blue-300'
    },

    // Difficulty Mastery: Easy
    {
      id: 'easy_10',
      title: 'Easy Warmup',
      desc: 'Solve 10 Easy difficulty problems',
      icon: CheckCircle2,
      unlocked: displayUser.easy >= 10,
      color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300'
    },
    {
      id: 'easy_25',
      title: 'Easy Ace',
      desc: 'Solve 25 Easy difficulty problems',
      icon: Medal,
      unlocked: displayUser.easy >= 25,
      color: 'text-teal-500 bg-teal-50 dark:bg-teal-950/60 border-teal-300'
    },

    // Difficulty Mastery: Medium
    {
      id: 'med_10',
      title: 'Medium Explorer',
      desc: 'Solve 10 Medium difficulty problems',
      icon: Activity,
      unlocked: displayUser.med >= 10,
      color: 'text-amber-500 bg-amber-50 dark:bg-amber-950/60 border-amber-300'
    },
    {
      id: 'med_30',
      title: 'Medium Maestro',
      desc: 'Solve 30 Medium difficulty problems',
      icon: Cpu,
      unlocked: displayUser.med >= 30,
      color: 'text-orange-500 bg-orange-50 dark:bg-orange-950/60 border-orange-300'
    },
    {
      id: 'med_75',
      title: 'Medium Dominator',
      desc: 'Solve 75 Medium difficulty problems',
      icon: Swords,
      unlocked: displayUser.med >= 75,
      color: 'text-rose-500 bg-rose-50 dark:bg-rose-950/60 border-rose-300'
    },

    // Difficulty Mastery: Hard
    {
      id: 'hard_1',
      title: 'Hard Initiate',
      desc: 'Conquer your very first Hard problem',
      icon: Flag,
      unlocked: displayUser.hard >= 1,
      color: 'text-rose-500 bg-rose-50 dark:bg-rose-950/60 border-rose-300'
    },
    {
      id: 'hard_conqueror',
      title: 'Hardcore Problem Solver',
      desc: 'Successfully conquer 3 Hard problems',
      icon: Trophy,
      unlocked: displayUser.hard >= 3,
      color: 'text-rose-600 bg-rose-50 dark:bg-rose-950/60 border-rose-300'
    },
    {
      id: 'hard_10',
      title: 'Titan of Algorithms',
      desc: 'Conquer 10 Hard difficulty problems',
      icon: Swords,
      unlocked: displayUser.hard >= 10,
      color: 'text-purple-600 bg-purple-50 dark:bg-purple-950/60 border-purple-300'
    },
    {
      id: 'hard_25',
      title: 'Apex Legend',
      desc: 'Conquer 25 Hard difficulty problems',
      icon: Crown,
      unlocked: displayUser.hard >= 25,
      color: 'text-amber-600 bg-amber-50 dark:bg-amber-950/60 border-amber-300'
    },

    // Versatility
    {
      id: 'balanced_triad',
      title: 'Balanced Triad',
      desc: 'Solve at least 10 Easy, 10 Medium, and 2 Hard problems',
      icon: BookOpen,
      unlocked: (displayUser.easy >= 10 && displayUser.med >= 10 && displayUser.hard >= 2),
      color: 'text-indigo-600 bg-indigo-50 dark:bg-indigo-950/60 border-indigo-300'
    }
  ], [displayUser]);

  const unlockedCount = achievements.filter(a => a.unlocked).length;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-xs overflow-y-auto">
      <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[92vh] my-auto animate-in fade-in zoom-in-95">
        
        {/* LeetCode-Style Top Profile Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-5 sm:p-6 relative border-b border-slate-800">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4 min-w-0">
              {/* Avatar Photo with Ring */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-emerald-500 to-blue-600 p-0.5 shadow-lg shrink-0">
                <div className="w-full h-full rounded-2xl bg-slate-900 flex items-center justify-center text-2xl font-black text-white overflow-hidden">
                  {displayUser.photoURL ? (
                    <img src={displayUser.photoURL} alt="" className="w-full h-full object-cover" />
                  ) : (
                    displayUser.displayName.charAt(0).toUpperCase()
                  )}
                </div>
              </div>

              {/* Names & Metadata */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-lg sm:text-2xl font-extrabold truncate text-white">
                    {displayUser.displayName}
                  </h2>
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    @{displayUser.username}
                  </span>
                </div>

                <p className="text-xs text-slate-300 line-clamp-2 mt-1 leading-relaxed">
                  {displayUser.bio}
                </p>

                {/* Social & Cloud Status Row */}
                <div className="flex items-center gap-3 mt-2.5 text-xs text-slate-300 flex-wrap">
                  {displayUser.linkedin && (
                    <a
                      href={displayUser.linkedin.startsWith('http') ? displayUser.linkedin : `https://${displayUser.linkedin}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[#0a66c2] hover:underline font-semibold bg-white/10 px-2 py-0.5 rounded"
                    >
                      <LinkedinIcon className="w-3.5 h-3.5" />
                      <span>LinkedIn</span>
                    </a>
                  )}

                  {displayUser.github && (
                    <a
                      href={displayUser.github.startsWith('http') ? displayUser.github : `https://${displayUser.github}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-slate-200 hover:underline font-semibold bg-white/10 px-2 py-0.5 rounded"
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                      <span>GitHub</span>
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Close & Action Buttons */}
            <div className="flex items-center gap-1.5 shrink-0">
              {isOwner && !isEditing && (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                  title="Edit profile & username"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
              )}

              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Public Profile Share Bar */}
          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2 truncate text-slate-300">
              <Globe className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="font-semibold text-slate-200 hidden sm:inline">Public Profile:</span>
              <code className="font-mono text-[11px] bg-slate-950/70 px-2 py-0.5 rounded text-emerald-400 border border-slate-700 truncate">
                {publicProfileUrl}
              </code>
            </div>

            <button
              type="button"
              onClick={handleCopyProfileLink}
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors shrink-0 cursor-pointer shadow-xs"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Edit Profile Form Overlay (Owner Only) */}
        {isEditing && isOwner && (
          <form onSubmit={handleSaveProfileForm} className="p-5 bg-gray-50 dark:bg-slate-800/90 border-b border-gray-200 dark:border-slate-700 space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-blue-500" />
                Edit Public Profile
              </h3>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400"
              >
                Cancel
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">
                  Display Name
                </label>
                <input
                  type="text"
                  required
                  value={editForm.displayName}
                  onChange={e => setEditForm(prev => ({ ...prev, displayName: e.target.value }))}
                  placeholder="e.g. Adnan Ahmad"
                  className="w-full px-3 py-1.5 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-gray-900 dark:text-white font-medium focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">
                  Public Username (@handle)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-mono">@</span>
                  <input
                    type="text"
                    required
                    value={editForm.username}
                    onChange={e => setEditForm(prev => ({ ...prev, username: e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, '') }))}
                    placeholder="adnan_coder"
                    className="w-full pl-7 pr-3 py-1.5 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-gray-900 dark:text-white font-mono focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            <div className="text-xs">
              <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">
                Bio / Headline
              </label>
              <textarea
                rows={2}
                value={editForm.bio}
                onChange={e => setEditForm(prev => ({ ...prev, bio: e.target.value }))}
                placeholder="Software Engineer @ Tech | FAANG Prep 2026..."
                className="w-full px-3 py-1.5 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-gray-900 dark:text-white font-medium focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1 flex items-center gap-1">
                  <LinkedinIcon className="w-3.5 h-3.5 text-[#0a66c2]" /> LinkedIn URL or Username
                </label>
                <input
                  type="text"
                  value={editForm.linkedin}
                  onChange={e => setEditForm(prev => ({ ...prev, linkedin: e.target.value }))}
                  placeholder="linkedin.com/in/username"
                  className="w-full px-3 py-1.5 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-gray-900 dark:text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1 flex items-center gap-1">
                  <GithubIcon className="w-3.5 h-3.5 text-gray-800 dark:text-gray-200" /> GitHub URL or Username
                </label>
                <input
                  type="text"
                  value={editForm.github}
                  onChange={e => setEditForm(prev => ({ ...prev, github: e.target.value }))}
                  placeholder="github.com/username"
                  className="w-full px-3 py-1.5 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-gray-900 dark:text-white focus:outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-3 py-1.5 rounded-lg bg-gray-200 dark:bg-slate-700 hover:bg-gray-300 text-gray-800 dark:text-gray-200 font-bold text-xs cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs cursor-pointer shadow-xs"
              >
                Save Changes
              </button>
            </div>
          </form>
        )}

        {/* Modal Navigation Tabs & Content (or Sign-in Prompt if viewing another user while not logged in) */}
        {!currentUser && profileData && !isOwner ? (
          <div className="p-8 sm:p-12 text-center flex flex-col items-center justify-center bg-white dark:bg-slate-900 my-auto flex-1">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 shadow-sm mb-4">
              <Lock className="w-7 h-7" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">
              Sign in to view @{displayUser.username}'s profile
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-slate-400 max-w-md mx-auto mb-6 leading-relaxed">
              Sign in with your Google account to view detailed problem statistics, submission history, activity heatmaps, and achievements.
            </p>
            <button
              type="button"
              onClick={onGoogleSignIn}
              className="flex items-center gap-2.5 px-6 py-2.5 rounded-xl bg-white dark:bg-slate-800 text-gray-900 dark:text-white border border-gray-300 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700 font-bold text-xs shadow-sm hover:shadow transition-all cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 48 48">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
              </svg>
              <span>Sign In with Google</span>
            </button>
          </div>
        ) : (
          <>
            {/* Modal Navigation Tabs (Overview, Activity Heatmap, Achievements) */}
            <div className="flex border-b border-gray-200 dark:border-slate-800 px-6 bg-gray-50/50 dark:bg-slate-900 text-xs font-bold gap-4">
              <button
                type="button"
                onClick={() => setActiveTab('overview')}
                className={`py-3 border-b-2 transition-colors cursor-pointer ${
                  activeTab === 'overview'
                    ? 'border-blue-600 dark:border-emerald-400 text-blue-600 dark:text-emerald-400'
                    : 'border-transparent text-gray-500 hover:text-gray-900 dark:text-gray-400'
                }`}
              >
                Overview & Stats
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('heatmap')}
                className={`py-3 border-b-2 transition-colors cursor-pointer ${
                  activeTab === 'heatmap'
                    ? 'border-blue-600 dark:border-emerald-400 text-blue-600 dark:text-emerald-400'
                    : 'border-transparent text-gray-500 hover:text-gray-900 dark:text-gray-400'
                }`}
              >
                Activity Heatmap
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('achievements')}
                className={`py-3 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'achievements'
                    ? 'border-blue-600 dark:border-emerald-400 text-blue-600 dark:text-emerald-400'
                    : 'border-transparent text-gray-500 hover:text-gray-900 dark:text-gray-400'
                }`}
              >
                <span>Achievements</span>
                <span className="px-1.5 py-0.2 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 text-[10px]">
                  {unlockedCount}/24
                </span>
              </button>
            </div>

            {/* Profile Content Body */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1">
              
              {/* TAB 1: OVERVIEW & STATS */}
              {activeTab === 'overview' && (
                <div className="space-y-6 animate-in fade-in">
                  {/* Stat Summary Cards */}
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="p-3.5 rounded-xl border border-gray-200 dark:border-slate-800 bg-gray-50/70 dark:bg-slate-800/40">
                      <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Global Rank</div>
                      <div className="text-2xl sm:text-3xl font-black text-blue-600 dark:text-blue-400 mt-0.5">
                        {displayUser.rank === '-' || !displayUser.rank ? '-' : `#${displayUser.rank}`}
                      </div>
                      <div className="text-[10px] text-gray-400">Leaderboard</div>
                    </div>

                <div className="p-3.5 rounded-xl border border-gray-200 dark:border-slate-800 bg-gray-50/70 dark:bg-slate-800/40">
                  <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Current Streak</div>
                  <div className="text-2xl sm:text-3xl font-black text-amber-600 dark:text-amber-400 mt-0.5 flex items-center justify-center gap-1">
                    <Flame className="w-5 h-5 fill-amber-500 text-amber-500" />
                    {displayUser.streak}d
                  </div>
                  <div className="text-[10px] text-gray-400">Best: {displayUser.maxStreak}d</div>
                </div>

                <div className="p-3.5 rounded-xl border border-gray-200 dark:border-slate-800 bg-gray-50/70 dark:bg-slate-800/40">
                  <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Total Solved</div>
                  <div className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400 mt-0.5">
                    {displayUser.solved}
                  </div>
                  <div className="text-[10px] text-gray-400">of 305 ({Math.round((displayUser.solved / 305) * 100)}%)</div>
                </div>
              </div>

              {/* LeetCode Difficulty Mastery Section */}
              <div className="p-4 rounded-xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3 shadow-xs">
                <h4 className="text-xs font-bold text-gray-800 dark:text-slate-200 uppercase tracking-wider">
                  Difficulty Breakdown
                </h4>

                {/* Easy */}
                <div>
                  <div className="flex justify-between text-xs font-medium mb-1">
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">Easy</span>
                    <span className="text-gray-500 font-mono">{displayUser.easy} / 43</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                    <div 
                      className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${Math.round((displayUser.easy / 43) * 100)}%` }}
                    />
                  </div>
                </div>

                {/* Medium */}
                <div>
                  <div className="flex justify-between text-xs font-medium mb-1">
                    <span className="text-amber-600 dark:text-amber-400 font-bold">Medium</span>
                    <span className="text-gray-500 font-mono">{displayUser.med} / 167</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                    <div 
                      className="bg-amber-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${Math.round((displayUser.med / 167) * 100)}%` }}
                    />
                  </div>
                </div>

                {/* Hard */}
                <div>
                  <div className="flex justify-between text-xs font-medium mb-1">
                    <span className="text-rose-600 dark:text-rose-400 font-bold">Hard</span>
                    <span className="text-gray-500 font-mono">{displayUser.hard} / 95</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                    <div 
                      className="bg-rose-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${Math.round((displayUser.hard / 95) * 100)}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Achievement Highlights */}
              <div className="p-4 rounded-xl border border-purple-200 dark:border-purple-900/40 bg-purple-50/30 dark:bg-purple-950/20">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    <span className="text-xs font-bold text-gray-900 dark:text-white">Recent Achievements</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveTab('achievements')}
                    className="text-xs font-bold text-purple-600 dark:text-purple-400 hover:underline cursor-pointer"
                  >
                    View All ({unlockedCount}/24) →
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {achievements.filter(a => a.unlocked).slice(0, 6).map(a => {
                    const IconComp = a.icon;
                    return (
                      <div key={a.id} className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-purple-200 dark:border-slate-800 flex items-center gap-2 text-xs">
                        <div className={`p-1.5 rounded ${a.color}`}>
                          <IconComp className="w-3.5 h-3.5" />
                        </div>
                        <span className="font-bold text-gray-800 dark:text-white truncate">{a.title}</span>
                      </div>
                    );
                  })}
                  {unlockedCount === 0 && (
                    <div className="col-span-full text-center py-3 text-xs text-gray-400">
                      Solve your first problem to start unlocking achievements!
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ACTIVITY HEATMAP */}
          {activeTab === 'heatmap' && (
            <div className="space-y-4 animate-in fade-in">
              <ActivityHeatmap
                questionsProgress={displayUser.questionsProgress || {}}
                revisionLogs={displayUser.revisionLogs || {}}
              />
            </div>
          )}

          {/* TAB 3: 24 GAMIFIED ACHIEVEMENTS */}
          {activeTab === 'achievements' && (
            <div className="space-y-4 animate-in fade-in">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-bold text-gray-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-purple-500" />
                    All Achievements ({unlockedCount} / {achievements.length})
                  </h4>
                  <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                    {Math.round((unlockedCount / achievements.length) * 100)}% Unlocked
                  </span>
                </div>

                {/* Filter Pills */}
                <div className="flex items-center gap-1 bg-gray-100 dark:bg-slate-800 p-0.5 rounded-lg text-[11px]">
                  <button
                    type="button"
                    onClick={() => setAchievementFilter('all')}
                    className={`px-2 py-0.5 rounded font-semibold transition-colors cursor-pointer ${
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
                    className={`px-2 py-0.5 rounded font-semibold transition-colors cursor-pointer ${
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
                    className={`px-2 py-0.5 rounded font-semibold transition-colors cursor-pointer ${
                      achievementFilter === 'locked'
                        ? 'bg-white dark:bg-slate-700 text-gray-900 dark:text-white shadow-2xs'
                        : 'text-gray-500 hover:text-gray-800 dark:text-gray-400'
                    }`}
                  >
                    Locked ({achievements.length - unlockedCount})
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[380px] overflow-y-auto pr-1">
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
                            {a.unlocked && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />}
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
          )}

          {/* Delete Profile Confirmation Section (ONLY visible to profile owner) */}
          {isOwner && currentUser && isConfirmingDelete && (
            <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border-2 border-rose-300 dark:border-rose-800 space-y-3 animate-in fade-in">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-rose-900 dark:text-rose-200">
                    Delete Profile & All Cloud Progress?
                  </h4>
                  <p className="text-xs text-rose-700 dark:text-rose-300 mt-1 leading-relaxed">
                    This will permanently delete your public profile <strong>@{displayUser.username}</strong>, leaderboard ranking, and all problem solutions from cloud storage. This action cannot be undone.
                  </p>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsConfirmingDelete(false)}
                  className="px-3 py-1.5 rounded-lg bg-gray-200 dark:bg-slate-700 hover:bg-gray-300 text-gray-800 dark:text-gray-200 font-bold text-xs cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={isDeleting}
                  onClick={handleExecuteDelete}
                  className="px-4 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs cursor-pointer shadow-xs flex items-center gap-1.5"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>{isDeleting ? 'Deleting...' : 'Yes, Delete My Profile'}</span>
                </button>
              </div>
            </div>
          )}

              {/* Sign In CTA if viewing as guest */}
              {!currentUser && isOwner && (
                <div className="p-4 rounded-xl bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-transparent border border-blue-200 dark:border-blue-900 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div>
                    <div className="font-bold text-blue-900 dark:text-blue-200">
                      Sync Progress & Join Leaderboard
                    </div>
                    <div className="text-gray-500 dark:text-gray-400">
                      Sign in with Google to sync your progress to the cloud, secure your public username, and appear on the leaderboard.
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onGoogleSignIn();
                    }}
                    className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shrink-0 transition-colors cursor-pointer"
                  >
                    Sign In with Google
                  </button>
                </div>
              )}
            </div>
          </>
        )}

        {/* Modal Footer Controls */}
        <div className="px-5 sm:px-6 py-3.5 bg-gray-50 dark:bg-slate-800/80 border-t border-gray-200 dark:border-slate-800 flex justify-between items-center text-xs">
          <div>
            {/* Delete Profile button - ONLY visible for authenticated profile owner */}
            {isOwner && currentUser && !isConfirmingDelete && (
              <button
                type="button"
                onClick={() => setIsConfirmingDelete(true)}
                className="text-rose-600 dark:text-rose-400 hover:text-rose-700 font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Profile</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            {isOwner && currentUser && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onSignOut();
                }}
                className="px-3 py-1.5 rounded-lg border border-gray-300 dark:border-slate-700 text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-700 font-semibold transition-colors cursor-pointer"
              >
                Sign Out
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-gray-200 dark:bg-slate-700 hover:bg-gray-300 dark:hover:bg-slate-600 text-gray-800 dark:text-gray-200 font-bold transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
