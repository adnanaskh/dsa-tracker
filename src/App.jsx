import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged 
} from 'firebase/auth';
import { 
  getFirestore, 
  collection, 
  onSnapshot, 
  doc, 
  setDoc,
  deleteDoc,
  getDocs,
  getDoc
} from 'firebase/firestore';
import { 
  LayoutDashboard, 
  ListTodo, 
  Calendar, 
  RotateCcw, 
  BookOpen, 
  BarChart3, 
  Edit,
  CheckCircle,
  Clock,
  Upload,
  Eye,
  Trash2,
  Copy,
  Check,
  Search,
  Shuffle,
  Sun,
  Moon,
  Cloud,
  CloudOff,
  Download,
  Flame,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  Filter,
  CheckCircle2,
  X,
  Trophy,
  Crown,
  UserCheck,
  User,
  Lock,
  Play,
  Code2
} from 'lucide-react';

function LinkedinIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.64 1.64 0 1 0 0 3.28 1.64 1.64 0 0 0 0-3.28" />
    </svg>
  );
}

import { 
  TOPICS, 
  INITIAL_QUESTIONS, 
  PATTERNS, 
  DAILY_PLAN, 
  WEEKLY_PLAN 
} from './data/questionsData';

import CodeViewer from './components/CodeViewer';
import ActivityHeatmap from './components/ActivityHeatmap';
import CommandPalette from './components/CommandPalette';
import ExportBackupModal from './components/ExportBackupModal';
import LeaderboardTab from './components/LeaderboardTab';
import ProfileModal from './components/ProfileModal';
import EditorialModal from './components/EditorialModal';
import CodePlaygroundModal from './components/CodePlaygroundModal';

// --- Firebase Configuration ---
const firebaseConfig = {
  apiKey: "AIzaSyC6Y6QWQvym7uJvx0OzoWjIw-iRm-l3hrw",
  authDomain: "dsa-tracker-adnan.firebaseapp.com",
  projectId: "dsa-tracker-adnan",
  storageBucket: "dsa-tracker-adnan.firebasestorage.app",
  messagingSenderId: "260699769889",
  appId: "1:260699769889:web:f8e195fe7c334378ec6760"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();
const appId = "dsa-tracker-adnan";

// Local storage keys for guest mode
const LS_KEYS = {
  QUESTIONS: 'dsa_progress_questions',
  PLANNER: 'dsa_progress_planner',
  REVISION: 'dsa_progress_revision',
  WEEKLY: 'dsa_progress_weekly',
  SOLUTIONS: 'dsa_progress_solutions',
  THEME: 'dsa_tracker_theme',
  DISMISSED_BANNER: 'dsa_guest_banner_dismissed'
};

// SRS Interval schedule (in days)
const SRS_INTERVALS = [1, 3, 7, 14, 30];

export default function App() {
  // Theme state
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem(LS_KEYS.THEME);
    if (saved !== null) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem(LS_KEYS.THEME, 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem(LS_KEYS.THEME, 'light');
    }
  }, [isDark]);

  // Auth & User State
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [authError, setAuthError] = useState(null);
  const [activeTab, setActiveTab] = useState('questions'); // Always landing on Questions tab
  const [dismissedGuestBanner, setDismissedGuestBanner] = useState(() => {
    return localStorage.getItem(LS_KEYS.DISMISSED_BANNER) === 'true';
  });

  // Auth gate prompt modal state
  const [isAuthPromptOpen, setIsAuthPromptOpen] = useState(false);
  const [authPromptFeature, setAuthPromptFeature] = useState('');

  // Modals state
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [randomQuestionModal, setRandomQuestionModal] = useState(null);
  const [activeEditorialQuestion, setActiveEditorialQuestion] = useState(null);
  const [activePlaygroundQuestion, setActivePlaygroundQuestion] = useState(null);
  const [customDisplayName, setCustomDisplayName] = useState(() => {
    return localStorage.getItem('dsa_custom_handle') || '';
  });
  const [customUsername, setCustomUsername] = useState(() => {
    return localStorage.getItem('dsa_custom_username') || '';
  });
  const [customBio, setCustomBio] = useState(() => {
    return localStorage.getItem('dsa_custom_bio') || '';
  });
  const [customLinkedin, setCustomLinkedin] = useState(() => {
    return localStorage.getItem('dsa_custom_linkedin') || '';
  });
  const [customGithub, setCustomGithub] = useState(() => {
    return localStorage.getItem('dsa_custom_github') || '';
  });
  const [viewingPublicProfile, setViewingPublicProfile] = useState(null);
  const [cloudLeaderboard, setCloudLeaderboard] = useState([]);

  // Helper to generate SEO clean slugs for problem deep links
  const toSlug = useCallback((name) => {
    return name ? name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : '';
  }, []);

  // Open Editorial Solution and synchronize browser URL without page reload
  const openEditorialSolution = useCallback((q) => {
    setActiveEditorialQuestion(q);
    if (q) {
      try {
        const url = new URL(window.location.href);
        url.searchParams.set('solution', toSlug(q.name));
        window.history.pushState({ solutionId: q.id }, '', url.toString());
      } catch {}
    }
  }, [toSlug]);

  // Close Editorial Solution and clean browser URL
  const closeEditorialSolution = useCallback(() => {
    setActiveEditorialQuestion(null);
    try {
      const url = new URL(window.location.href);
      url.searchParams.delete('solution');
      url.searchParams.delete('q');
      window.history.pushState({}, '', url.toString());
    } catch {}
  }, []);

  // Deep-Linking Handler for Editorial (?solution=two-sum) and Public Profiles (https://dsa.adnanahmad.tech/username or ?u=username)
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const query = params.get('solution') || params.get('q');
      if (query) {
        const clean = query.trim().toLowerCase();
        const matched = INITIAL_QUESTIONS.find(q => 
          String(q.id) === clean || 
          toSlug(q.name) === clean
        );
        if (matched) {
          setActiveTab('questions');
          setActiveEditorialQuestion(matched);
        }
      }

      // Check search params or direct path (e.g. https://dsa.adnanahmad.tech/username or /u/username)
      let userQuery = params.get('u') || params.get('user') || params.get('profile');
      if (!userQuery) {
        const rawPath = window.location.pathname.replace(/^\/+|\/+$/g, '');
        const segments = rawPath.split('/').filter(Boolean);
        const SYSTEM_PATHS = new Set([
          '',
          'index.html',
          'favicon.svg',
          'icons.svg',
          'robots.txt',
          'sitemap.xml',
          'manifest.json',
          '_redirects',
          'google857404d1925a5f5a.html'
        ]);

        if (segments.length > 0) {
          const first = segments[0].toLowerCase();
          if (first === 'u' && segments.length > 1) {
            userQuery = segments[1];
          } else if (!SYSTEM_PATHS.has(first) && !first.includes('.')) {
            userQuery = segments[0];
          }
        }
      }

      if (userQuery) {
        const cleanU = userQuery.trim().toLowerCase();

        (async () => {
          try {
            // 1. Check in-memory cloudLeaderboard
            let userMatch = cloudLeaderboard.find(u => {
              const uUname = (u.username || u.email?.split('@')[0] || u.displayName?.toLowerCase().replace(/[^a-z0-9_]/g, '') || '').toLowerCase();
              const uDName = (u.displayName || '').toLowerCase();
              return (
                uUname === cleanU ||
                u.uid?.toLowerCase() === cleanU ||
                uDName === cleanU ||
                uDName.replace(/[^a-z0-9_]/g, '') === cleanU
              );
            });

            // 2. Query Firestore if not found in memory
            if (!userMatch) {
              // Try username index mapping doc first
              try {
                const unameSnap = await getDoc(doc(db, 'artifacts', appId, 'usernames', cleanU));
                if (unameSnap.exists()) {
                  const targetUid = unameSnap.data().uid;
                  const targetDoc = await getDoc(doc(db, 'artifacts', appId, 'leaderboard', targetUid));
                  if (targetDoc.exists()) {
                    userMatch = { uid: targetDoc.id, ...targetDoc.data() };
                  }
                }
              } catch {}

              // Try direct uid doc
              if (!userMatch) {
                try {
                  const directDoc = await getDoc(doc(db, 'artifacts', appId, 'leaderboard', cleanU));
                  if (directDoc.exists()) {
                    userMatch = { uid: directDoc.id, ...directDoc.data() };
                  }
                } catch {}
              }

              // Scan entire leaderboard collection for matching email / username / display name
              if (!userMatch) {
                try {
                  const boardSnap = await getDocs(collection(db, 'artifacts', appId, 'leaderboard'));
                  boardSnap.forEach(d => {
                    const data = d.data();
                    const uHandle = (data.username || data.email?.split('@')[0] || data.displayName?.toLowerCase().replace(/[^a-z0-9_]/g, '') || '').toLowerCase();
                    const dName = (data.displayName || '').toLowerCase();
                    if (
                      uHandle === cleanU ||
                      d.id.toLowerCase() === cleanU ||
                      dName === cleanU ||
                      dName.replace(/[^a-z0-9_]/g, '') === cleanU ||
                      (data.email && data.email.toLowerCase().startsWith(cleanU))
                    ) {
                      userMatch = { uid: d.id, ...data };
                    }
                  });
                } catch {}
              }
            }

            // 3. If matched, fetch their full subcollections if not present
            if (userMatch) {
              if (!userMatch.questionsProgress) {
                try {
                  const qSnap = await getDocs(collection(db, 'artifacts', appId, 'users', userMatch.uid, 'questionsProgress'));
                  const qProg = {};
                  qSnap.forEach(qd => { qProg[qd.id] = qd.data(); });
                  userMatch.questionsProgress = qProg;
                } catch {}
              }
              if (!userMatch.revisionLogs) {
                try {
                  const rSnap = await getDocs(collection(db, 'artifacts', appId, 'users', userMatch.uid, 'revisionLogs'));
                  const rLogs = {};
                  rSnap.forEach(rd => { rLogs[rd.id] = rd.data(); });
                  userMatch.revisionLogs = rLogs;
                } catch {}
              }

              setViewingPublicProfile(userMatch);
              setIsProfileModalOpen(true);
            } else {
              // 4. Fallback for new/unregistered usernames: Always display public profile view
              setViewingPublicProfile({
                uid: cleanU,
                displayName: cleanU,
                username: cleanU,
                solvedCount: 0,
                streak: 0,
                maxStreak: 0,
                easyCount: 0,
                medCount: 0,
                hardCount: 0,
                bio: 'DSA Explorer & Competitive Programmer',
                isGuestProfile: true
              });
              setIsProfileModalOpen(true);
            }
          } catch (err) {
            console.error("Public profile resolution error:", err);
            setViewingPublicProfile({
              uid: cleanU,
              displayName: cleanU,
              username: cleanU,
              solvedCount: 0,
              streak: 0,
              maxStreak: 0,
              easyCount: 0,
              medCount: 0,
              hardCount: 0,
              bio: 'DSA Explorer & Competitive Programmer',
              isGuestProfile: true
            });
            setIsProfileModalOpen(true);
          }
        })();
      }
    } catch (e) {
      console.error("Deep-linking error:", e);
    }
  }, [toSlug, cloudLeaderboard]);

  // Auth Protection Guard
  const requireAuth = useCallback((featureName, callback) => {
    if (!user) {
      setAuthPromptFeature(featureName);
      setIsAuthPromptOpen(true);
      return false;
    }
    if (callback) callback();
    return true;
  }, [user]);

  // Tab switching guard: Only 'questions' is accessible without sign-in
  const handleTabClick = useCallback((tabId) => {
    if (tabId === 'questions') {
      setActiveTab('questions');
      return;
    }
    const featureLabels = {
      dashboard: 'Dashboard Analytics & Heatmap',
      leaderboard: 'Global Leaderboard & Rankings',
      planner: '60-Day Structured Planner',
      revision: 'Spaced Repetition System (SRS)',
      patterns: 'DSA Pattern Guides & Cheatsheets',
      weekly: 'Weekly Reviews & Reflections'
    };
    requireAuth(featureLabels[tabId] || 'this feature', () => {
      setActiveTab(tabId);
    });
  }, [requireAuth]);

  // Data States
  const [questionsProgress, setQuestionsProgress] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(LS_KEYS.QUESTIONS) || '{}');
    } catch {
      return {};
    }
  });

  const [plannerProgress, setPlannerProgress] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(LS_KEYS.PLANNER) || '{}');
    } catch {
      return {};
    }
  });

  const [revisionLogs, setRevisionLogs] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(LS_KEYS.REVISION) || '{}');
    } catch {
      return {};
    }
  });

  const [weeklyReviews, setWeeklyReviews] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(LS_KEYS.WEEKLY) || '{}');
    } catch {
      return {};
    }
  });

  const [solutions, setSolutions] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(LS_KEYS.SOLUTIONS) || '{}');
    } catch {
      return {};
    }
  });

  // Sync to localStorage for local/guest resilience
  useEffect(() => {
    localStorage.setItem(LS_KEYS.QUESTIONS, JSON.stringify(questionsProgress));
  }, [questionsProgress]);
  useEffect(() => {
    localStorage.setItem(LS_KEYS.PLANNER, JSON.stringify(plannerProgress));
  }, [plannerProgress]);
  useEffect(() => {
    localStorage.setItem(LS_KEYS.REVISION, JSON.stringify(revisionLogs));
  }, [revisionLogs]);
  useEffect(() => {
    localStorage.setItem(LS_KEYS.WEEKLY, JSON.stringify(weeklyReviews));
  }, [weeklyReviews]);
  useEffect(() => {
    localStorage.setItem(LS_KEYS.SOLUTIONS, JSON.stringify(solutions));
  }, [solutions]);

  // Compute Current User's aggregated stats & streaks
  const userStats = useMemo(() => {
    let solved = 0;
    let easy = 0;
    let med = 0;
    let hard = 0;

    let easyTotal = 0;
    let medTotal = 0;
    let hardTotal = 0;

    INITIAL_QUESTIONS.forEach(q => {
      if (q.difficulty === 'Easy') easyTotal++;
      if (q.difficulty === 'Medium') medTotal++;
      if (q.difficulty === 'Hard') hardTotal++;

      const prog = questionsProgress[q.id];
      if (prog && prog.status === '✅ Done') {
        solved++;
        if (q.difficulty === 'Easy') easy++;
        if (q.difficulty === 'Medium') med++;
        if (q.difficulty === 'Hard') hard++;
      }
    });

    const dateCounts = {};
    Object.values(questionsProgress).forEach(q => {
      if (q.status === '✅ Done') {
        const d = (q.completedAt || q.date || '').split('T')[0];
        if (d && /^\d{4}-\d{2}-\d{2}$/.test(d)) dateCounts[d] = (dateCounts[d] || 0) + 1;
      }
    });
    Object.values(revisionLogs).forEach(r => {
      ['attempt1', 'attempt2', 'attempt3', 'lastReviewedAt', 'flaggedAt'].forEach(field => {
        const val = r[field];
        if (val) {
          const d = val.split('T')[0];
          if (d && /^\d{4}-\d{2}-\d{2}$/.test(d)) dateCounts[d] = (dateCounts[d] || 0) + 1;
        }
      });
    });

    const today = new Date();
    const formatLocal = (d) => {
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      return `${y}-${m}-${day}`;
    };
    const todayStr = formatLocal(today);
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const yesterdayStr = formatLocal(yesterday);

    let streak = 0;
    if (dateCounts[todayStr]) {
      streak = 1;
      let checkDate = new Date(today);
      for (let i = 1; i <= 1000; i++) {
        checkDate.setDate(today.getDate() - i);
        const s = formatLocal(checkDate);
        if (dateCounts[s]) streak++;
        else break;
      }
    } else if (dateCounts[yesterdayStr]) {
      streak = 1;
      let checkDate = new Date(yesterday);
      for (let i = 1; i <= 1000; i++) {
        checkDate.setDate(yesterday.getDate() - i);
        const s = formatLocal(checkDate);
        if (dateCounts[s]) streak++;
        else break;
      }
    }

    // Longest streak calculation
    const sortedDates = Object.keys(dateCounts).sort();
    let maxStreak = 0;
    let tempStreak = 0;
    let prevDate = null;

    sortedDates.forEach(dStr => {
      const parts = dStr.split('-').map(Number);
      const d = new Date(parts[0], parts[1] - 1, parts[2]);
      if (prevDate) {
        const diffDays = Math.round((d.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24));
        if (diffDays === 1) {
          tempStreak++;
        } else if (diffDays > 1) {
          tempStreak = 1;
        }
      } else {
        tempStreak = 1;
      }
      if (tempStreak > maxStreak) maxStreak = tempStreak;
      prevDate = d;
    });

    return {
      solved,
      streak,
      maxStreak: Math.max(maxStreak, streak),
      easy,
      med,
      hard,
      easyTotal,
      medTotal,
      hardTotal
    };
  }, [questionsProgress, revisionLogs]);

  // Firestore leaderboard listener
  useEffect(() => {
    try {
      const q = collection(db, 'artifacts', appId, 'leaderboard');
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const list = [];
        snapshot.forEach(docSnap => {
          const data = docSnap.data();
          const docId = docSnap.id;
          // Purge and delete legacy fake benchmark documents or coder dummy entries
          if (docId.startsWith('leader_') || (data.uid && String(data.uid).startsWith('leader_')) || docId === 'coder' || data.username === 'coder') {
            try {
              deleteDoc(doc(db, 'artifacts', appId, 'leaderboard', docId)).catch(() => {});
            } catch {}
            return;
          }
          list.push({ uid: docId, ...data });
        });
        setCloudLeaderboard(list);
      }, (err) => {
        console.error("Leaderboard fetch error:", err);
      });
      return () => unsubscribe();
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Sync user's public stats & profile to Leaderboard in Firestore
  useEffect(() => {
    if (!user) return;
    const fallbackUname = user.displayName?.toLowerCase().replace(/[^a-z0-9_]/g, '') || user.email?.split('@')[0] || `user_${user.uid.slice(0, 6)}`;
    const effectiveUsername = (customUsername || fallbackUname).toLowerCase().replace(/[^a-z0-9_]/g, '');
    const userDocRef = doc(db, 'artifacts', appId, 'leaderboard', user.uid);
    setDoc(userDocRef, {
      uid: user.uid,
      displayName: customDisplayName || user.displayName || user.email?.split('@')[0] || 'User',
      username: effectiveUsername,
      bio: customBio || '',
      linkedin: customLinkedin || '',
      github: customGithub || '',
      photoURL: user.photoURL || null,
      solvedCount: userStats.solved,
      streak: userStats.streak,
      maxStreak: userStats.maxStreak,
      easyCount: userStats.easy,
      medCount: userStats.med,
      hardCount: userStats.hard,
      questionsProgress: questionsProgress,
      revisionLogs: revisionLogs,
      lastActive: new Date().toISOString()
    }, { merge: true }).catch(err => console.error("Error updating leaderboard entry:", err));

    // Also index username for direct URL deep-linking (?u=username)
    if (effectiveUsername) {
      const unameDoc = doc(db, 'artifacts', appId, 'usernames', effectiveUsername);
      setDoc(unameDoc, {
        uid: user.uid,
        username: effectiveUsername,
        updatedAt: new Date().toISOString()
      }, { merge: true }).catch(() => {});
    }
  }, [
    user, 
    userStats, 
    customDisplayName, 
    customUsername, 
    customBio, 
    customLinkedin, 
    customGithub, 
    questionsProgress, 
    revisionLogs
  ]);

  // Real leaderboard list containing only real authenticated users from Firestore
  const combinedLeaderboard = useMemo(() => {
    const map = new Map();
    // Only real users fetched from Firestore
    cloudLeaderboard.forEach(item => {
      if (item && item.uid && item.uid !== 'coder' && item.username !== 'coder') {
        map.set(item.uid, item);
      }
    });

    // If current authenticated user is signed in, ensure their latest live stats are represented immediately
    if (user) {
      const fallbackUname = user.displayName?.toLowerCase().replace(/[^a-z0-9_]/g, '') || user.email?.split('@')[0] || `user_${user.uid.slice(0, 6)}`;
      const effectiveUsername = (customUsername || fallbackUname).toLowerCase().replace(/[^a-z0-9_]/g, '');
      map.set(user.uid, {
        uid: user.uid,
        displayName: customDisplayName || user.displayName || user.email?.split('@')[0] || 'User',
        username: effectiveUsername,
        bio: customBio || '',
        linkedin: customLinkedin || '',
        github: customGithub || '',
        photoURL: user.photoURL || null,
        solvedCount: userStats.solved || 0,
        streak: userStats.streak || 0,
        maxStreak: userStats.maxStreak || 0,
        easyCount: userStats.easy || 0,
        medCount: userStats.med || 0,
        hardCount: userStats.hard || 0,
        questionsProgress: questionsProgress,
        revisionLogs: revisionLogs,
        isCurrentUser: true,
        lastActive: new Date().toISOString()
      });
    }

    return Array.from(map.values());
  }, [
    cloudLeaderboard, 
    user, 
    userStats, 
    customDisplayName, 
    customUsername, 
    customBio, 
    customLinkedin, 
    customGithub, 
    questionsProgress, 
    revisionLogs
  ]);

  // Calculate real rank of current user among real users
  const estimatedRank = useMemo(() => {
    if (!user) return '-';
    let higherCount = 0;
    combinedLeaderboard.forEach(u => {
      if (u.uid !== user.uid) {
        if ((u.solvedCount || 0) > userStats.solved) {
          higherCount++;
        } else if ((u.solvedCount || 0) === userStats.solved && (u.streak || 0) > userStats.streak) {
          higherCount++;
        }
      }
    });
    return higherCount + 1;
  }, [combinedLeaderboard, user, userStats]);

  // Save Profile Handler (Display Name, Username, Bio, Social Links)
  const handleSaveProfile = async ({ displayName, username, bio, linkedin, github }) => {
    if (displayName !== undefined) {
      setCustomDisplayName(displayName);
      localStorage.setItem('dsa_custom_handle', displayName);
    }
    if (username !== undefined) {
      setCustomUsername(username);
      localStorage.setItem('dsa_custom_username', username);
    }
    if (bio !== undefined) {
      setCustomBio(bio);
      localStorage.setItem('dsa_custom_bio', bio);
    }
    if (linkedin !== undefined) {
      setCustomLinkedin(linkedin);
      localStorage.setItem('dsa_custom_linkedin', linkedin);
    }
    if (github !== undefined) {
      setCustomGithub(github);
      localStorage.setItem('dsa_custom_github', github);
    }

    if (user) {
      try {
        const fallbackUname = user.displayName?.toLowerCase().replace(/[^a-z0-9_]/g, '') || user.email?.split('@')[0] || `user_${user.uid.slice(0, 6)}`;
        const cleanUsername = (username || customUsername || fallbackUname).toLowerCase().replace(/[^a-z0-9_]/g, '');
        const userDocRef = doc(db, 'artifacts', appId, 'leaderboard', user.uid);
        await setDoc(userDocRef, {
          displayName: displayName || customDisplayName || user.displayName || user.email?.split('@')[0] || 'User',
          username: cleanUsername,
          bio: bio || '',
          linkedin: linkedin || '',
          github: github || '',
          photoURL: user.photoURL || null,
          solvedCount: userStats.solved,
          streak: userStats.streak,
          maxStreak: userStats.maxStreak,
          easyCount: userStats.easy,
          medCount: userStats.med,
          hardCount: userStats.hard,
          questionsProgress: questionsProgress,
          revisionLogs: revisionLogs,
          lastActive: new Date().toISOString()
        }, { merge: true });

        if (cleanUsername) {
          const unameDoc = doc(db, 'artifacts', appId, 'usernames', cleanUsername);
          await setDoc(unameDoc, {
            uid: user.uid,
            username: cleanUsername,
            updatedAt: new Date().toISOString()
          }, { merge: true });
        }
      } catch (err) {
        console.error("Error saving profile:", err);
      }
    }
  };

  // Delete Profile Handler (Owner-Only)
  const handleDeleteProfile = async () => {
    try {
      if (user) {
        const uid = user.uid;
        const currentUname = (customUsername || user.email?.split('@')[0] || '').toLowerCase().replace(/[^a-z0-9_]/g, '');

        // 1. Delete leaderboard entry
        try {
          await deleteDoc(doc(db, 'artifacts', appId, 'leaderboard', uid));
        } catch (e) {
          console.error("Error removing leaderboard record:", e);
        }

        // 2. Delete username index
        if (currentUname) {
          try {
            await deleteDoc(doc(db, 'artifacts', appId, 'usernames', currentUname));
          } catch (e) {
            console.error("Error removing username index:", e);
          }
        }

        // 3. Clear cloud subcollections
        const collections = ['questionsProgress', 'plannerProgress', 'revisionLogs', 'weeklyReviews', 'solutions'];
        for (const colName of collections) {
          try {
            const snap = await getDocs(collection(db, 'artifacts', appId, 'users', uid, colName));
            const deleteOps = [];
            snap.forEach(d => deleteOps.push(deleteDoc(d.ref)));
            await Promise.all(deleteOps);
          } catch (e) {
            console.error(`Error purging ${colName}:`, e);
          }
        }
      }

      // 4. Wipe local storage
      localStorage.removeItem(LS_KEYS.QUESTIONS);
      localStorage.removeItem(LS_KEYS.PLANNER);
      localStorage.removeItem(LS_KEYS.REVISION);
      localStorage.removeItem(LS_KEYS.WEEKLY);
      localStorage.removeItem(LS_KEYS.SOLUTIONS);
      localStorage.removeItem('dsa_custom_handle');
      localStorage.removeItem('dsa_custom_username');
      localStorage.removeItem('dsa_custom_bio');
      localStorage.removeItem('dsa_custom_linkedin');
      localStorage.removeItem('dsa_custom_github');

      // 5. Reset local component states
      setQuestionsProgress({});
      setPlannerProgress({});
      setRevisionLogs({});
      setWeeklyReviews({});
      setSolutions({});
      setCustomDisplayName('');
      setCustomUsername('');
      setCustomBio('');
      setCustomLinkedin('');
      setCustomGithub('');
      setViewingPublicProfile(null);
      setIsProfileModalOpen(false);

      // 6. Clean URL parameters
      try {
        const url = new URL(window.location.href);
        url.searchParams.delete('u');
        url.searchParams.delete('user');
        url.searchParams.delete('profile');
        window.history.pushState({}, '', url.toString());
      } catch {}

      // 7. Sign out auth session
      if (user) {
        await signOut(auth);
      }
    } catch (err) {
      console.error("Failed to delete profile:", err);
      throw err;
    }
  };

  // Auth Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setAuthLoading(false);
      if (firebaseUser) {
        if (!localStorage.getItem('dsa_custom_username') && firebaseUser.email) {
          const defaultU = firebaseUser.email.split('@')[0].toLowerCase().replace(/[^a-z0-9_]/g, '');
          setCustomUsername(defaultU);
          localStorage.setItem('dsa_custom_username', defaultU);
        }
        if (!localStorage.getItem('dsa_custom_handle') && firebaseUser.displayName) {
          setCustomDisplayName(firebaseUser.displayName);
          localStorage.setItem('dsa_custom_handle', firebaseUser.displayName);
        }
      }
    });
    return () => unsubscribe();
  }, []);

  // Sync with Firestore when logged in
  useEffect(() => {
    if (!user) return;

    const collections = ['questionsProgress', 'plannerProgress', 'revisionLogs', 'weeklyReviews', 'solutions'];
    const setters = {
      questionsProgress: setQuestionsProgress,
      plannerProgress: setPlannerProgress,
      revisionLogs: setRevisionLogs,
      weeklyReviews: setWeeklyReviews,
      solutions: setSolutions
    };

    const unsubscribes = collections.map(colName => {
      const q = collection(db, 'artifacts', appId, 'users', user.uid, colName);
      return onSnapshot(q, (snapshot) => {
        const cloudData = {};
        snapshot.forEach(doc => {
          cloudData[doc.id] = doc.data();
        });

        // Merge local data into cloud state if cloud state has fewer or non-conflicting entries
        setters[colName](prev => {
          const merged = { ...prev, ...cloudData };
          return merged;
        });
      }, (err) => {
        console.error(`Error fetching ${colName}:`, err);
      });
    });

    return () => unsubscribes.forEach(unsub => unsub());
  }, [user]);

  // Keyboard shortcut listener for Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Save Data Handler (Works in both Guest Mode and Authenticated Mode)
  const saveData = useCallback(async (colName, docId, data) => {
    // Update local state immediately
    const setters = {
      questionsProgress: setQuestionsProgress,
      plannerProgress: setPlannerProgress,
      revisionLogs: setRevisionLogs,
      weeklyReviews: setWeeklyReviews,
      solutions: setSolutions
    };
    
    if (setters[colName]) {
      setters[colName](prev => ({
        ...prev,
        [docId]: { ...(prev[docId] || {}), ...data }
      }));
    }

    // If authenticated, sync to Firestore
    if (user) {
      try {
        const docRef = doc(db, 'artifacts', appId, 'users', user.uid, colName, String(docId));
        await setDoc(docRef, data, { merge: true });
      } catch (err) {
        console.error(`Error saving ${colName} to cloud:`, err);
      }
    }
  }, [user]);

  // Delete Data Handler
  const deleteData = useCallback(async (colName, docId) => {
    const setters = {
      questionsProgress: setQuestionsProgress,
      plannerProgress: setPlannerProgress,
      revisionLogs: setRevisionLogs,
      weeklyReviews: setWeeklyReviews,
      solutions: setSolutions
    };

    if (setters[colName]) {
      setters[colName](prev => {
        const copy = { ...prev };
        delete copy[docId];
        return copy;
      });
    }

    if (user) {
      try {
        const docRef = doc(db, 'artifacts', appId, 'users', user.uid, colName, String(docId));
        await deleteDoc(docRef);
      } catch (err) {
        console.error(`Error deleting ${colName}:`, err);
      }
    }
  }, [user]);

  // Open Code Playground & auto-mark In Progress if currently Todo or Not Started
  const handleOpenPlayground = useCallback((q) => {
    if (!q) return;
    setActivePlaygroundQuestion(q);
    const prog = questionsProgress[q.id] || {};
    if (!prog.status || prog.status === '❌ Todo' || prog.status === 'Todo') {
      const now = new Date().toISOString();
      saveData('questionsProgress', q.id, {
        ...prog,
        status: '🟡 In Progress',
        startedAt: prog.startedAt || now,
        lastModified: now
      });
    }
  }, [questionsProgress, saveData]);

  // Restore imported backup
  const handleRestoreData = (backupData) => {
    if (backupData.questionsProgress) setQuestionsProgress(backupData.questionsProgress);
    if (backupData.plannerProgress) setPlannerProgress(backupData.plannerProgress);
    if (backupData.revisionLogs) setRevisionLogs(backupData.revisionLogs);
    if (backupData.weeklyReviews) setWeeklyReviews(backupData.weeklyReviews);
    if (backupData.solutions) setSolutions(backupData.solutions);

    // If logged in, push all restored records to Firestore
    if (user) {
      Object.entries(backupData.questionsProgress || {}).forEach(([id, val]) => saveData('questionsProgress', id, val));
      Object.entries(backupData.solutions || {}).forEach(([id, val]) => saveData('solutions', id, val));
      Object.entries(backupData.revisionLogs || {}).forEach(([id, val]) => saveData('revisionLogs', id, val));
      Object.entries(backupData.plannerProgress || {}).forEach(([id, val]) => saveData('plannerProgress', id, val));
    }
  };

  // Google Sign In
  const handleGoogleSignIn = async () => {
    setAuthError(null);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      // Auto-sync guest records to cloud
      if (result.user) {
        const uid = result.user.uid;
        // Push local questionsProgress if present
        Object.entries(questionsProgress).forEach(async ([k, v]) => {
          await setDoc(doc(db, 'artifacts', appId, 'users', uid, 'questionsProgress', String(k)), v, { merge: true });
        });
        // Push solutions
        Object.entries(solutions).forEach(async ([k, v]) => {
          await setDoc(doc(db, 'artifacts', appId, 'users', uid, 'solutions', String(k)), v, { merge: true });
        });
        // Push revision logs
        Object.entries(revisionLogs).forEach(async ([k, v]) => {
          await setDoc(doc(db, 'artifacts', appId, 'users', uid, 'revisionLogs', String(k)), v, { merge: true });
        });
      }
    } catch (err) {
      console.error("Sign-in error:", err);
      setAuthError("Sign-in failed. Please try again.");
    }
  };

  // Sign Out & Comprehensive Cache / Storage Purge
  const handleSignOut = async () => {
    try {
      // 1. Sign out from Firebase Auth
      await signOut(auth);

      // 2. Clear all in-memory user progress and customized profile state
      setQuestionsProgress({});
      setPlannerProgress({});
      setRevisionLogs({});
      setWeeklyReviews({});
      setSolutions({});
      setCustomDisplayName('');
      setCustomUsername('');
      setCustomBio('');
      setCustomLinkedin('');
      setCustomGithub('');
      setViewingPublicProfile(null);
      setIsProfileModalOpen(false);

      // 3. Clear all localStorage keys (all dsa_ user data, saved code, submissions, and caches)
      try {
        const keysToRemove = [];
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key && (key.startsWith('dsa_') || key.startsWith('firebase:') || key.startsWith('artifact_') || key.includes('user_code') || key.includes('submission'))) {
            keysToRemove.push(key);
          }
        }
        keysToRemove.forEach(k => localStorage.removeItem(k));
      } catch (e) {
        console.error('Error clearing localStorage:', e);
      }

      // 4. Clear sessionStorage
      try {
        sessionStorage.clear();
      } catch (e) {
        console.error('Error clearing sessionStorage:', e);
      }

      // 5. Clear CacheStorage (Service Worker / browser HTTP cache)
      try {
        if ('caches' in window) {
          const cacheKeys = await caches.keys();
          await Promise.all(cacheKeys.map(k => caches.delete(k)));
        }
      } catch (e) {
        console.error('Error clearing caches:', e);
      }

      // 6. Reset URL query parameters if present
      try {
        if (window.location.search) {
          window.history.replaceState({}, '', window.location.pathname);
        }
      } catch {}

    } catch (err) {
      console.error("Sign-out error:", err);
    }
  };

  // Pick a random unsolved problem (Roulette)
  const handlePickRandomQuestion = () => {
    const unsolved = INITIAL_QUESTIONS.filter(q => (questionsProgress[q.id] || {}).status !== '✅ Done');
    const pool = unsolved.length > 0 ? unsolved : INITIAL_QUESTIONS;
    const random = pool[Math.floor(Math.random() * pool.length)];
    setRandomQuestionModal(random);
  };

  // Calculate Spaced Repetition Due Count
  const dueRevisionQuestions = useMemo(() => {
    const todayStr = new Date().toISOString().split('T')[0];
    const due = [];

    Object.entries(revisionLogs).forEach(([key, item]) => {
      if (item && item.mastered !== 'Mastered' && item.mastered !== 'Yes') {
        const nextDate = item.nextReviewDate ? item.nextReviewDate.split('T')[0] : null;
        if (!nextDate || nextDate <= todayStr) {
          due.push({ key, ...item });
        }
      }
    });

    return due;
  }, [revisionLogs]);

  return (
    <div className="min-h-screen bg-[#f3f4f6] dark:bg-slate-950 font-sans text-gray-900 dark:text-slate-100 transition-colors duration-200">
      {/* Top Header */}
      <header className="bg-[#1e293b] dark:bg-slate-900 text-white border-b border-slate-800 px-4 sm:px-6 py-3.5 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-500 flex items-center justify-center font-bold text-slate-950 text-lg shadow-sm">
              &lt;/&gt;
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-extrabold tracking-tight">
                  DSA TRACKER
                </h1>
                <span className="hidden sm:inline-block text-[11px] font-semibold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  60 DAYS • 305 PROBLEMS
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Curated 305 LeetCode problems & solution vault with spaced repetition revision
              </p>
            </div>
          </div>

          {/* Quick Actions & Auth */}
          <div className="flex items-center gap-2 sm:gap-3 text-xs">
            {/* Command Palette Trigger */}
            <button
              onClick={() => setIsCommandPaletteOpen(true)}
              className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
              title="Search and commands (Ctrl+K)"
            >
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <span>Search...</span>
              <kbd className="font-mono text-[10px] bg-slate-900 px-1.5 py-0.5 rounded text-slate-400 border border-slate-700">
                Ctrl K
              </kbd>
            </button>

            {/* Random Question Button */}
            <button
              onClick={handlePickRandomQuestion}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
              title="Pick a random unsolved problem"
            >
              <Shuffle className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline font-medium">Random</span>
            </button>

            {/* Export & Backup */}
            <button
              onClick={() => setIsExportModalOpen(true)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
              title="Backup & Export Data"
            >
              <Download className="w-3.5 h-3.5 text-blue-400" />
              <span className="hidden sm:inline font-medium">Backup</span>
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-400" />}
            </button>

            {/* User Profile & Achievements Pill - Always accessible */}
            <button
              onClick={() => {
                setViewingPublicProfile(null);
                setIsProfileModalOpen(true);
              }}
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors cursor-pointer"
              title="View Profile, Achievements & Stats"
            >
              <div className="w-5 h-5 rounded-full bg-blue-500/20 border border-blue-400/40 text-blue-400 font-bold flex items-center justify-center text-[10px] overflow-hidden">
                {user?.photoURL ? (
                  <img src={user.photoURL} alt="" className="w-full h-full object-cover" />
                ) : user ? (
                  (customDisplayName || user?.displayName || 'U')[0].toUpperCase()
                ) : (
                  <User className="w-3 h-3 text-blue-400" />
                )}
              </div>
              <span className="hidden sm:inline font-bold text-xs max-w-[85px] truncate">
                {customDisplayName || user?.displayName?.split(' ')[0] || (user ? 'Profile' : 'Profile')}
              </span>
              <span className="px-1.5 py-0.2 rounded bg-amber-400 text-slate-950 font-black text-[10px]">
                {user ? `#${estimatedRank}` : `${userStats.solved} Solved`}
              </span>
            </button>

            {/* Auth Block */}
            {user ? (
              <div className="flex items-center gap-2 pl-2 border-l border-slate-700">
                <div className="hidden sm:flex items-center gap-1 text-[11px] text-emerald-400 font-semibold">
                  <Cloud className="w-3.5 h-3.5" />
                  <span>Synced</span>
                </div>
                <button
                  onClick={handleSignOut}
                  className="px-2.5 py-1 rounded bg-rose-900/80 hover:bg-rose-800 text-white font-semibold border border-rose-700 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 pl-2 border-l border-slate-700">
                <div className="hidden sm:flex items-center gap-1 text-[11px] text-amber-400 font-semibold" title="Progress saved in this browser">
                  <CloudOff className="w-3.5 h-3.5" />
                  <span>Guest</span>
                </div>
                <button
                  onClick={handleGoogleSignIn}
                  className="flex items-center gap-1.5 bg-white text-slate-900 hover:bg-slate-100 px-3 py-1.5 rounded-lg font-bold shadow-sm transition-all text-xs"
                >
                  <svg width="14" height="14" viewBox="0 0 48 48">
                    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                  </svg>
                  <span>Sign In</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Guest Mode Informational Banner (Dismissible) */}
      {!user && !dismissedGuestBanner && (
        <div className="bg-amber-50 dark:bg-amber-950/70 border-b border-amber-200 dark:border-amber-900/60 px-4 py-2.5 text-xs text-amber-900 dark:text-amber-200 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 max-w-5xl mx-auto">
            <Lock className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
            <span>
              <strong>Questions Explorer Mode:</strong> You are viewing all 305 curated problems.
              <button onClick={() => requireAuth('unlock all features & save progress')} className="underline font-bold ml-1 hover:text-amber-700 dark:hover:text-amber-300">
                Sign in with Google
              </button> to unlock Dashboard analytics, the Global Leaderboard, 60-Day Planner, Spaced Repetition, and save your solutions.
            </span>
          </div>
          <button 
            onClick={() => {
              setDismissedGuestBanner(true);
              localStorage.setItem(LS_KEYS.DISMISSED_BANNER, 'true');
            }}
            className="text-amber-500 hover:text-amber-700 dark:hover:text-amber-300 p-1"
            title="Dismiss notice"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Navigation Tabs */}
      <nav className="bg-[#243347] dark:bg-slate-900 border-b border-gray-300 dark:border-slate-800 px-4 sm:px-6 pt-2">
        <div className="max-w-7xl mx-auto flex flex-wrap gap-1">
          {[
            { id: 'questions', icon: ListTodo, label: 'Problems', badge: user ? `${Object.values(questionsProgress).filter(q => q.status === '✅ Done').length}/305` : '305 Problems', locked: false },
            { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard', locked: !user },
            { id: 'leaderboard', icon: Trophy, label: 'Leaderboard', badge: user ? `#${estimatedRank}` : null, badgeColor: 'bg-amber-400 text-slate-950 font-black', locked: !user },
            { id: 'planner', icon: Calendar, label: 'Study Plan', locked: !user },
            { id: 'revision', icon: RotateCcw, label: 'Revision', badge: user && dueRevisionQuestions.length > 0 ? `${dueRevisionQuestions.length} Due` : null, badgeColor: 'bg-rose-500 text-white', locked: !user },
            { id: 'patterns', icon: BookOpen, label: 'Patterns', locked: !user },
            { id: 'weekly', icon: BarChart3, label: 'Analytics', locked: !user },
          ].map(tab => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-bold rounded-t-md transition-all ${
                  isActive 
                    ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-emerald-400 shadow-xs border-t-2 border-blue-600 dark:border-emerald-400' 
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.locked && (
                  <Lock className="w-3 h-3 text-amber-400/80" />
                )}
                {tab.badge && (
                  <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full ${tab.badgeColor || 'bg-slate-700 dark:bg-slate-700 text-slate-300'}`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Main Content Container */}
      <main className="max-w-7xl mx-auto p-4 sm:p-6">
        <div className="bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-800 rounded-xl p-4 sm:p-6 shadow-sm min-h-[75vh]">
          {activeTab === 'questions' && (
            <QuestionsTab 
              questionsProgress={questionsProgress} 
              solutions={solutions} 
              revisionLogs={revisionLogs}
              onSave={(id, data) => saveData('questionsProgress', id, data)} 
              onRevisionSave={(id, data) => saveData('revisionLogs', id, data)} 
              onSolutionSave={(id, data) => saveData('solutions', id, data)} 
              onSolutionDelete={(id) => deleteData('solutions', id)} 
              user={user} 
              isDark={isDark}
              requireAuth={requireAuth}
              onOpenEditorial={(q) => openEditorialSolution(q)}
              onOpenPlayground={handleOpenPlayground}
            />
          )}

          {activeTab === 'dashboard' && (
            <DashboardTab 
              questionsProgress={questionsProgress} 
              revisionLogs={revisionLogs} 
              dueQuestions={dueRevisionQuestions}
              onNavigateTab={handleTabClick}
              onPickRandom={handlePickRandomQuestion}
              onOpenPlayground={handleOpenPlayground}
            />
          )}

          {activeTab === 'leaderboard' && (
            <LeaderboardTab
              leaderboardUsers={combinedLeaderboard}
              currentUser={user}
              userStats={userStats}
              customDisplayName={customDisplayName}
              onOpenProfile={(targetUser) => {
                setViewingPublicProfile(targetUser && targetUser.uid !== user?.uid ? targetUser : null);
                setIsProfileModalOpen(true);
              }}
              onGoogleSignIn={handleGoogleSignIn}
            />
          )}

          {activeTab === 'planner' && (
            <PlannerTab 
              plannerProgress={plannerProgress} 
              questionsProgress={questionsProgress} 
              onSave={(id, data) => saveData('plannerProgress', id, data)} 
              onOpenPlayground={handleOpenPlayground}
            />
          )}

          {activeTab === 'revision' && (
            <RevisionTab 
              revisionLogs={revisionLogs} 
              onSave={(id, data) => saveData('revisionLogs', id, data)} 
              onDelete={(id) => deleteData('revisionLogs', id)} 
              onOpenPlayground={handleOpenPlayground}
            />
          )}

          {activeTab === 'patterns' && (
            <PatternsTab />
          )}

          {activeTab === 'weekly' && (
            <WeeklyTab 
              weeklyReviews={weeklyReviews} 
              questionsProgress={questionsProgress} 
              onSave={(id, data) => saveData('weeklyReviews', id, data)} 
            />
          )}
        </div>
      </main>

      {/* Navigation Footer */}
      <footer className="mt-12 border-t border-gray-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 backdrop-blur-xs py-10 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-mono text-emerald-500 font-black text-lg">&lt;/&gt;</span>
                <span className="font-extrabold text-base tracking-tight text-gray-900 dark:text-white">
                  DSA Tracker & 60-Day Roadmap
                </span>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 max-w-lg leading-relaxed">
                A structured practice roadmap featuring 305 curated problems across all major algorithmic patterns, equipped with spaced repetition revision, solution code storage, and activity tracking.
              </p>
              <div className="mt-4">
                <a
                  href="https://www.linkedin.com/in/adnanrahmad"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0a66c2] hover:bg-[#004182] text-white font-bold text-xs transition-colors shadow-xs"
                >
                  <LinkedinIcon className="w-3.5 h-3.5 fill-current" />
                  <span>Connect on LinkedIn</span>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-gray-200 mb-3">
                Curriculum Topics
              </h3>
              <ul className="space-y-1.5 text-xs text-gray-600 dark:text-gray-400">
                <li><span className="hover:text-emerald-500 cursor-pointer" onClick={() => handleTabClick('questions')}>Arrays & Hashing (Days 1–5)</span></li>
                <li><span className="hover:text-emerald-500 cursor-pointer" onClick={() => handleTabClick('questions')}>Strings (Days 6–10)</span></li>
                <li><span className="hover:text-emerald-500 cursor-pointer" onClick={() => handleTabClick('questions')}>Two Pointers & Sliding Window</span></li>
                <li><span className="hover:text-emerald-500 cursor-pointer" onClick={() => handleTabClick('questions')}>Binary Search & Stack</span></li>
                <li><span className="hover:text-emerald-500 cursor-pointer" onClick={() => handleTabClick('questions')}>Linked Lists & Trees</span></li>
                <li><span className="hover:text-emerald-500 cursor-pointer" onClick={() => handleTabClick('questions')}>Graphs & Dynamic Programming</span></li>
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-gray-200 mb-3">
                Features
              </h3>
              <ul className="space-y-1.5 text-xs text-gray-600 dark:text-gray-400">
                <li><span className="hover:text-emerald-500 cursor-pointer" onClick={() => handleTabClick('revision')}>Spaced Repetition (SRS)</span></li>
                <li><span className="hover:text-emerald-500 cursor-pointer" onClick={() => handleTabClick('patterns')}>Algorithmic Patterns</span></li>
                <li><span className="hover:text-emerald-500 cursor-pointer" onClick={() => handleTabClick('planner')}>60-Day Planner</span></li>
                <li><span className="hover:text-emerald-500 cursor-pointer" onClick={() => handleTabClick('leaderboard')}>Community Leaderboard</span></li>
                <li><span className="hover:text-emerald-500 cursor-pointer" onClick={() => handleTabClick('dashboard')}>Activity Heatmap</span></li>
                <li><span className="hover:text-emerald-500 cursor-pointer" onClick={() => setIsExportModalOpen(true)}>Data Backup & Export</span></li>
              </ul>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span>© {new Date().getFullYear()} DSA Tracker. Created by </span>
              <a
                href="https://www.linkedin.com/in/adnanrahmad"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-bold text-blue-600 dark:text-blue-400 hover:underline"
              >
                <span>Adnan Ahmad</span>
                <LinkedinIcon className="w-3 h-3 text-[#0a66c2]" />
              </a>
              <span>• Free educational tool.</span>
            </div>
            <div className="flex items-center gap-4">
              <a href="https://dsa.adnanahmad.tech/" className="hover:underline">Home</a>
              <span>•</span>
              <a
                href="https://www.linkedin.com/in/adnanrahmad"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[#0a66c2] dark:text-blue-400 hover:underline font-semibold"
              >
                <LinkedinIcon className="w-3.5 h-3.5 fill-current" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Auth Prompt Modal for Locked Features */}
      {isAuthPromptOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-slate-700 p-6 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <Lock className="w-5 h-5" />
              </div>
              <button
                onClick={() => setIsAuthPromptOpen(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1.5">
              Sign In to Unlock
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-300 mb-5 leading-relaxed">
              Please sign in with Google to {authPromptFeature || 'unlock this feature'}. Signing in unlocks:
            </p>

            <ul className="text-xs space-y-2 mb-6 text-gray-700 dark:text-gray-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span><strong>Saving your solved questions</strong> & custom notes</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span><strong>Uploading and managing</strong> your code solutions</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span><strong>Global Leaderboard ranking</strong> and streak tracking</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span><strong>60-Day Planner & Spaced Repetition (SRS)</strong></span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span><strong>Interactive Pattern Mastery Reference</strong></span>
              </li>
            </ul>

            <div className="space-y-3">
              <button
                onClick={async () => {
                  setIsAuthPromptOpen(false);
                  await handleGoogleSignIn();
                }}
                className="w-full flex items-center justify-center gap-3 bg-white border-2 border-slate-800 dark:border-slate-600 px-5 py-2.5 rounded-xl font-bold text-slate-800 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-all text-sm shadow-sm cursor-pointer"
              >
                <svg width="18" height="18" viewBox="0 0 48 48">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                </svg>
                <span>Sign In with Google</span>
              </button>

              <button
                onClick={() => setIsAuthPromptOpen(false)}
                className="w-full py-2 text-xs font-semibold text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                Continue browsing questions
              </button>
            </div>
          </div>
        </div>
      )}

      {/* User Profile, LeetCode-Style Public Showcase & Rank Modal */}
      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => {
          setIsProfileModalOpen(false);
          setViewingPublicProfile(null);
          try {
            window.history.pushState({}, '', '/');
          } catch {}
        }}
        currentUser={user}
        profileData={viewingPublicProfile}
        userStats={userStats}
        globalRank={estimatedRank}
        customDisplayName={customDisplayName}
        customUsername={customUsername}
        customBio={customBio}
        customLinkedin={customLinkedin}
        customGithub={customGithub}
        questionsProgress={questionsProgress}
        revisionLogs={revisionLogs}
        onSaveProfile={handleSaveProfile}
        onDeleteProfile={handleDeleteProfile}
        onGoogleSignIn={handleGoogleSignIn}
        onSignOut={handleSignOut}
      />

      {/* Command Palette Modal (Ctrl + K) */}
      <CommandPalette 
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onNavigateTab={(tab) => {
          setActiveTab(tab);
          setIsCommandPaletteOpen(false);
        }}
        onSelectQuestion={(q) => {
          setIsCommandPaletteOpen(false);
          handleOpenPlayground(q);
        }}
        onToggleTheme={() => setIsDark(!isDark)}
        isDark={isDark}
        onPickRandom={() => {
          setIsCommandPaletteOpen(false);
          handlePickRandomQuestion();
        }}
        onOpenProfile={() => {
          setIsCommandPaletteOpen(false);
          setViewingPublicProfile(null);
          setIsProfileModalOpen(true);
        }}
      />

      {/* Complete GFG-Style Editorial Solution Modal (100% Public & Deep-Linkable) */}
      {activeEditorialQuestion && (
        <EditorialModal
          isOpen={!!activeEditorialQuestion}
          question={activeEditorialQuestion}
          onClose={closeEditorialSolution}
          onMarkDone={(q) => {
            requireAuth('mark problems as done', () => {
              const prog = questionsProgress[q.id] || {};
              const next = prog.status === '✅ Done' ? '❌ Todo' : '✅ Done';
              saveData('questionsProgress', q.id, {
                ...prog,
                status: next,
                completedAt: next === '✅ Done' ? new Date().toISOString() : null
              });
            });
          }}
          onScheduleRevision={(q) => {
            requireAuth('schedule spaced repetition revisions', () => {
              const prog = questionsProgress[q.id] || {};
              const next = prog.revisit === '🔄 Revisit' ? 'No' : '🔄 Revisit';
              saveData('questionsProgress', q.id, { ...prog, revisit: next });
              if (next === '🔄 Revisit') {
                saveData('revisionLogs', q.id, {
                  id: q.id,
                  name: q.name,
                  difficulty: q.difficulty,
                  topic: q.topic,
                  nextReviewDate: new Date(Date.now() + 86400000).toISOString()
                });
              }
            });
          }}
          isDone={(questionsProgress[activeEditorialQuestion.id] || {}).status === '✅ Done'}
          isRevisit={(questionsProgress[activeEditorialQuestion.id] || {}).revisit === '🔄 Revisit'}
          onOpenPlayground={handleOpenPlayground}
        />
      )}

      {/* Python 3 Code Playground & Automated Test Runner Modal */}
      {activePlaygroundQuestion && (
        <CodePlaygroundModal
          isOpen={!!activePlaygroundQuestion}
          question={activePlaygroundQuestion}
          initialCode={(solutions[`q_${activePlaygroundQuestion.id}`] || {}).code || null}
          isDone={(questionsProgress[activePlaygroundQuestion.id] || {}).status === '✅ Done'}
          onClose={() => setActivePlaygroundQuestion(null)}
          onSubmitSuccess={(q, submittedCode) => {
            const now = new Date().toISOString();
            const prog = questionsProgress[q.id] || {};
            saveData('questionsProgress', q.id, {
              ...prog,
              status: '✅ Done',
              completedAt: now,
              lastModified: now
            });
            saveData('solutions', `q_${q.id}`, {
              questionId: q.id,
              questionName: q.name,
              code: submittedCode,
              language: 'python',
              uploadedAt: now,
              userId: user?.uid || 'guest',
              userEmail: user?.email || 'guest'
            });
          }}
          onSubmitAttempt={(q, attemptCode) => {
            const now = new Date().toISOString();
            const prog = questionsProgress[q.id] || {};
            if (prog.status !== '✅ Done') {
              saveData('questionsProgress', q.id, {
                ...prog,
                status: '🟡 In Progress',
                lastModified: now
              });
            }
          }}
          onRunCode={(q, runCode) => {
            const now = new Date().toISOString();
            const prog = questionsProgress[q.id] || {};
            if (prog.status !== '✅ Done') {
              saveData('questionsProgress', q.id, {
                ...prog,
                status: '🟡 In Progress',
                lastModified: now
              });
            }
          }}
          onSaveCode={(q, codeToSave) => {
            const now = new Date().toISOString();
            const prog = questionsProgress[q.id] || {};
            if (prog.status !== '✅ Done') {
              saveData('questionsProgress', q.id, {
                ...prog,
                status: '🟡 In Progress',
                lastModified: now
              });
            }
            saveData('solutions', `q_${q.id}`, {
              questionId: q.id,
              questionName: q.name,
              code: codeToSave,
              language: 'python',
              uploadedAt: now,
              userId: user?.uid || 'guest',
              userEmail: user?.email || 'guest'
            });
          }}
          onOpenEditorial={(q) => {
            setActivePlaygroundQuestion(null);
            openEditorialSolution(q);
          }}
        />
      )}

      {/* Export & Backup Modal */}
      <ExportBackupModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        trackerData={{
          questionsProgress,
          plannerProgress,
          revisionLogs,
          weeklyReviews,
          solutions
        }}
        onRestoreData={handleRestoreData}
      />

      {/* Random Question Roulette Modal */}
      {randomQuestionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-gray-200 dark:border-slate-700 p-6 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300">
                🎯 Random Challenge
              </span>
              <button 
                onClick={() => setRandomQuestionModal(null)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              {randomQuestionModal.name}
            </h3>

            <div className="flex flex-wrap gap-2 mb-4 text-xs font-medium">
              <span className="px-2 py-0.5 rounded bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300">
                Day {randomQuestionModal.day}
              </span>
              <span className="px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                {randomQuestionModal.topic}
              </span>
              <span className="px-2 py-0.5 rounded bg-purple-50 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                {randomQuestionModal.pattern}
              </span>
              <span className={`px-2 py-0.5 rounded font-bold ${
                randomQuestionModal.difficulty === 'Easy' ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/50' :
                randomQuestionModal.difficulty === 'Medium' ? 'text-amber-600 bg-amber-50 dark:bg-amber-950/50' :
                'text-rose-600 bg-rose-50 dark:bg-rose-950/50'
              }`}>
                {randomQuestionModal.difficulty}
              </span>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  const q = randomQuestionModal;
                  setRandomQuestionModal(null);
                  handleOpenPlayground(q);
                }}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors cursor-pointer shadow-xs"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                Solve in IDE
              </button>
              <a
                href={randomQuestionModal.link}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-2.5 rounded-lg border border-gray-300 dark:border-slate-700 hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-700 dark:text-gray-300 font-semibold text-xs flex items-center justify-center gap-1 transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                LeetCode
              </a>
              <button
                onClick={handlePickRandomQuestion}
                className="px-3 py-2.5 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-200 font-semibold text-xs transition-colors cursor-pointer"
              >
                Reroll
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// =========================================================================
// TAB 1: DASHBOARD TAB
// =========================================================================
function DashboardTab({ questionsProgress, revisionLogs, dueQuestions, onNavigateTab, onPickRandom }) {
  const totalQuestions = 305;

  const stats = useMemo(() => {
    let done = 0;
    let revisit = 0;
    let easyDone = 0;
    let medDone = 0;
    let hardDone = 0;

    let easyTotal = 0;
    let medTotal = 0;
    let hardTotal = 0;

    INITIAL_QUESTIONS.forEach(q => {
      if (q.difficulty === 'Easy') easyTotal++;
      if (q.difficulty === 'Medium') medTotal++;
      if (q.difficulty === 'Hard') hardTotal++;

      const p = questionsProgress[q.id];
      if (p && p.status === '✅ Done') {
        done++;
        if (q.difficulty === 'Easy') easyDone++;
        if (q.difficulty === 'Medium') medDone++;
        if (q.difficulty === 'Hard') hardDone++;
      }
      if (p && p.revisit === '🔄 Revisit') {
        revisit++;
      }
    });

    const pct = Math.round((done / totalQuestions) * 100);

    return {
      done,
      remaining: totalQuestions - done,
      revisit,
      pct,
      easyDone,
      easyTotal,
      medDone,
      medTotal,
      hardDone,
      hardTotal
    };
  }, [questionsProgress]);

  return (
    <div className="space-y-6">
      {/* Due for Spaced Review Banner */}
      {dueQuestions.length > 0 && (
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-200">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-500 text-slate-950 font-bold">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-sm">
                Spaced Repetition: {dueQuestions.length} Problem{dueQuestions.length === 1 ? '' : 's'} Due for Review Today!
              </div>
              <div className="text-xs text-amber-700 dark:text-amber-300">
                Consistent review strengthens neural pathways and prevents forgetting previous patterns.
              </div>
            </div>
          </div>
          <button
            onClick={() => onNavigateTab('revision')}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-xs transition-colors shrink-0"
          >
            Review Now
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Top Stat Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-gray-50 dark:bg-slate-800/60 border border-gray-200 dark:border-slate-800 p-4 rounded-xl">
          <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Total Solved
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400 mt-1">
            {stats.done} <span className="text-sm font-normal text-gray-400">/ 305</span>
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {stats.pct}% Complete
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-slate-800/60 border border-gray-200 dark:border-slate-800 p-4 rounded-xl">
          <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Remaining
          </div>
          <div className="text-2xl sm:text-3xl font-black text-gray-800 dark:text-slate-200 mt-1">
            {stats.remaining}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Target: 5 per day
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-slate-800/60 border border-gray-200 dark:border-slate-800 p-4 rounded-xl">
          <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Flagged Revisit
          </div>
          <div className="text-2xl sm:text-3xl font-black text-amber-600 dark:text-amber-400 mt-1">
            {stats.revisit}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            In revision queue
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-slate-800/60 border border-gray-200 dark:border-slate-800 p-4 rounded-xl flex flex-col justify-between">
          <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Quick Practice
          </div>
          <button
            onClick={onPickRandom}
            className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors shadow-xs"
          >
            <Shuffle className="w-3.5 h-3.5" />
            Pick Problem
          </button>
        </div>
      </div>

      {/* Difficulty Breakdown */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl border border-emerald-200 dark:border-emerald-950/60 bg-emerald-50/50 dark:bg-emerald-950/20">
          <div className="flex justify-between items-center mb-2">
            <span className="font-bold text-emerald-700 dark:text-emerald-400 text-sm">Easy</span>
            <span className="font-mono text-xs font-bold text-emerald-800 dark:text-emerald-300">
              {stats.easyDone} / {stats.easyTotal}
            </span>
          </div>
          <div className="w-full bg-emerald-200 dark:bg-emerald-950 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-emerald-600 dark:bg-emerald-400 h-full rounded-full transition-all duration-500" 
              style={{ width: `${Math.round((stats.easyDone / Math.max(1, stats.easyTotal)) * 100)}%` }}
            />
          </div>
        </div>

        <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-950/60 bg-amber-50/50 dark:bg-amber-950/20">
          <div className="flex justify-between items-center mb-2">
            <span className="font-bold text-amber-700 dark:text-amber-400 text-sm">Medium</span>
            <span className="font-mono text-xs font-bold text-amber-800 dark:text-amber-300">
              {stats.medDone} / {stats.medTotal}
            </span>
          </div>
          <div className="w-full bg-amber-200 dark:bg-amber-950 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-amber-500 dark:bg-amber-400 h-full rounded-full transition-all duration-500" 
              style={{ width: `${Math.round((stats.medDone / Math.max(1, stats.medTotal)) * 100)}%` }}
            />
          </div>
        </div>

        <div className="p-4 rounded-xl border border-rose-200 dark:border-rose-950/60 bg-rose-50/50 dark:bg-rose-950/20">
          <div className="flex justify-between items-center mb-2">
            <span className="font-bold text-rose-700 dark:text-rose-400 text-sm">Hard</span>
            <span className="font-mono text-xs font-bold text-rose-800 dark:text-rose-300">
              {stats.hardDone} / {stats.hardTotal}
            </span>
          </div>
          <div className="w-full bg-rose-200 dark:bg-rose-950 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-rose-600 dark:bg-rose-500 h-full rounded-full transition-all duration-500" 
              style={{ width: `${Math.round((stats.hardDone / Math.max(1, stats.hardTotal)) * 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* GitHub-style Activity Heatmap (Feature 3.1) */}
      <ActivityHeatmap 
        questionsProgress={questionsProgress}
        revisionLogs={revisionLogs}
      />

      {/* Topic by Topic Progress Grid */}
      <div>
        <h3 className="text-base font-bold text-gray-900 dark:text-white mb-3">
          Topic Breakdown ({TOPICS.length} Topics)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {TOPICS.map(topic => {
            const topicQuestions = INITIAL_QUESTIONS.filter(q => q.topic === topic.name);
            const doneCount = topicQuestions.filter(q => (questionsProgress[q.id] || {}).status === '✅ Done').length;
            const topicPct = Math.round((doneCount / Math.max(1, topic.total)) * 100);

            return (
              <div 
                key={topic.name}
                onClick={() => onNavigateTab('questions')}
                className="p-3.5 rounded-xl border border-gray-200 dark:border-slate-800 bg-gray-50/70 dark:bg-slate-800/40 hover:border-blue-300 dark:hover:border-slate-700 cursor-pointer transition-all"
              >
                <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
                  <span className="text-gray-800 dark:text-slate-200">{topic.name}</span>
                  <span className="font-mono text-gray-500 dark:text-gray-400">
                    {doneCount}/{topic.total} ({topicPct}%)
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-300 ${
                      topicPct === 100 ? 'bg-emerald-500' : topicPct > 0 ? 'bg-blue-600 dark:bg-blue-500' : 'bg-transparent'
                    }`}
                    style={{ width: `${topicPct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// =========================================================================
// TAB 2: QUESTIONS TAB (With Code Viewer Modal)
// =========================================================================
function QuestionsTab({
  questionsProgress,
  solutions,
  revisionLogs,
  onSave,
  onRevisionSave,
  onSolutionSave,
  onSolutionDelete,
  user,
  isDark,
  requireAuth,
  onOpenEditorial,
  onOpenPlayground = () => {}
}) {
  const [filterTopic, setFilterTopic] = useState('All');
  const [filterDifficulty, setFilterDifficulty] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  // Editing modal state
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [editForm, setEditForm] = useState({ status: '❌ Todo', revisit: 'No', timeSpent: '', notes: '' });

  // Solution modal state
  const [viewingSolutionQ, setViewingSolutionQ] = useState(null);
  const [uploadingQ, setUploadingQ] = useState(null);
  const [uploadCode, setUploadCode] = useState('');
  const [uploadLanguage, setUploadLanguage] = useState('java');

  const allTopics = useMemo(() => ['All', ...TOPICS.map(t => t.name)], []);

  // Instant 1-click status cycle: Todo -> In Progress -> Done -> Todo
  const handleQuickToggleStatus = (q) => {
    requireAuth('update problem solving status', () => {
      const current = (questionsProgress[q.id] || {}).status || '❌ Todo';
      let next = '🟡 In Progress';
      if (current === '🟡 In Progress') next = '✅ Done';
      else if (current === '✅ Done') next = '❌ Todo';

      const now = new Date().toISOString();
      onSave(q.id, {
        status: next,
        completedAt: next === '✅ Done' ? now : null,
        lastModified: now
      });
    });
  };

  // Instant 1-click revisit flag toggle
  const handleQuickToggleRevisit = (q) => {
    requireAuth('flag problems for spaced revision', () => {
      const current = (questionsProgress[q.id] || {}).revisit || 'No';
      const next = current === '🔄 Revisit' ? 'No' : '🔄 Revisit';
      const now = new Date().toISOString();
      onSave(q.id, { revisit: next, lastModified: now });

      if (next === '🔄 Revisit') {
        const nextDate = new Date(Date.now() + 86400000).toISOString();
        onRevisionSave(`q_${q.id}`, {
          questionId: q.id,
          questionName: q.name,
          topic: q.topic,
          difficulty: q.difficulty,
          link: q.link,
          flaggedAt: now,
          intervalStage: 0,
          nextReviewDate: nextDate,
          mastered: 'Needs Work',
          notes: ''
        });
      }
    });
  };

  // Filtered Questions
  const filteredQuestions = useMemo(() => {
    return INITIAL_QUESTIONS.filter(q => {
      const p = questionsProgress[q.id] || {};
      const topicMatch = filterTopic === 'All' || q.topic === filterTopic;
      const diffMatch = filterDifficulty === 'All' || q.difficulty === filterDifficulty;
      const statusMatch = 
        filterStatus === 'All' ||
        (filterStatus === 'Done' && p.status === '✅ Done') ||
        (filterStatus === 'In Progress' && p.status === '🟡 In Progress') ||
        (filterStatus === 'Todo' && (!p.status || p.status === '❌ Todo')) ||
        (filterStatus === 'Revisit' && p.revisit === '🔄 Revisit');

      const searchMatch = !searchTerm || 
        q.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.pattern.toLowerCase().includes(searchTerm.toLowerCase()) ||
        `day ${q.day}`.includes(searchTerm.toLowerCase()) ||
        `#${q.id}`.includes(searchTerm);

      return topicMatch && diffMatch && statusMatch && searchMatch;
    });
  }, [filterTopic, filterDifficulty, filterStatus, searchTerm, questionsProgress]);

  const handleOpenEdit = (q) => {
    const existing = questionsProgress[q.id] || {};
    setEditingQuestion(q);
    setEditForm({
      status: existing.status || '❌ Todo',
      revisit: existing.revisit || 'No',
      timeSpent: existing.timeSpent || '',
      notes: existing.notes || ''
    });
  };

  const handleSaveEdit = () => {
    if (!editingQuestion) return;
    const now = new Date().toISOString();
    const dataToSave = {
      ...editForm,
      completedAt: editForm.status === '✅ Done' ? now : null,
      lastModified: now
    };
    onSave(editingQuestion.id, dataToSave);

    // If flagged for revisit, auto-create SRS log with initial 1-day interval
    if (editForm.revisit === '🔄 Revisit') {
      const srsInterval = SRS_INTERVALS[0]; // 1 day
      const nextDate = new Date(Date.now() + srsInterval * 86400000).toISOString();
      onRevisionSave(`q_${editingQuestion.id}`, {
        questionId: editingQuestion.id,
        questionName: editingQuestion.name,
        topic: editingQuestion.topic,
        difficulty: editingQuestion.difficulty,
        link: editingQuestion.link,
        flaggedAt: now,
        intervalStage: 0,
        nextReviewDate: nextDate,
        mastered: 'Needs Work',
        notes: editForm.notes || ''
      });
    }

    setEditingQuestion(null);
  };

  const handleUploadSolution = () => {
    if (!uploadCode.trim()) {
      alert('Please enter your solution code.');
      return;
    }

    const solutionId = `q_${uploadingQ.id}`;
    const now = new Date().toISOString();
    onSolutionSave(solutionId, {
      questionId: uploadingQ.id,
      questionName: uploadingQ.name,
      code: uploadCode,
      language: uploadLanguage,
      uploadedAt: now,
      userId: user?.uid || 'guest',
      userEmail: user?.email || 'guest'
    });

    const prog = questionsProgress[uploadingQ.id] || {};
    onSave(uploadingQ.id, {
      ...prog,
      status: '✅ Done',
      completedAt: now,
      lastModified: now
    });

    setUploadingQ(null);
    setUploadCode('');
  };

  return (
    <div>
      {/* Header & Filters */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 dark:border-slate-800 pb-4 mb-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <ListTodo className="w-5 h-5 text-blue-600 dark:text-emerald-400" />
            Problemset
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Showing {filteredQuestions.length} of 305 curated problems
          </p>
        </div>

        {/* Filter Toolbar */}
        <div className="flex flex-wrap items-center gap-2.5 text-xs">
          {/* Search box */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search problem, pattern, day..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-8 pr-3 py-1.5 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-400 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Topic filter */}
          <select
            value={filterTopic}
            onChange={e => setFilterTopic(e.target.value)}
            className="px-3 py-1.5 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-800 dark:text-white text-xs font-medium focus:outline-none"
          >
            {allTopics.map(t => <option key={t} value={t}>{t}</option>)}
          </select>

          {/* Difficulty filter */}
          <select
            value={filterDifficulty}
            onChange={e => setFilterDifficulty(e.target.value)}
            className="px-3 py-1.5 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-800 dark:text-white text-xs font-medium focus:outline-none"
          >
            {['All', 'Easy', 'Medium', 'Hard'].map(d => <option key={d} value={d}>{d}</option>)}
          </select>

          {/* Status filter */}
          <select
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
            className="px-3 py-1.5 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-800 dark:text-white text-xs font-medium focus:outline-none"
          >
            {['All', 'Done', 'In Progress', 'Todo', 'Revisit'].map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>

      {/* Questions Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-slate-800">
        <table className="w-full border-collapse text-left text-xs">
          <thead>
            <tr className="bg-gray-100 dark:bg-slate-800/90 text-gray-600 dark:text-gray-300 font-semibold border-b border-gray-200 dark:border-slate-800">
              <th className="py-2.5 px-3 text-center w-12">#</th>
              <th className="py-2.5 px-3 text-center w-16">DAY</th>
              <th className="py-2.5 px-3">TOPIC</th>
              <th className="py-2.5 px-3">TITLE</th>
              <th className="py-2.5 px-3 text-center">DIFFICULTY</th>
              <th className="py-2.5 px-3">PATTERN</th>
              <th className="py-2.5 px-3 text-center">STATUS</th>
              <th className="py-2.5 px-3 text-center">REVISIT</th>
              <th className="py-2.5 px-3 text-center">SOLVE</th>
              <th className="py-2.5 px-3 text-center">EDITORIAL</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-slate-800/60">
            {filteredQuestions.map(q => {
              const prog = questionsProgress[q.id] || {};
              const isDone = prog.status === '✅ Done';
              const isRevisit = prog.revisit === '🔄 Revisit';

              const diffBadge = {
                Easy: 'text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-900',
                Medium: 'text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-900',
                Hard: 'text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-900',
              }[q.difficulty];

              return (
                <tr 
                  key={q.id}
                  className={`hover:bg-blue-50/40 dark:hover:bg-slate-800/40 transition-colors ${
                    isDone ? 'bg-emerald-50/20 dark:bg-emerald-950/10' : ''
                  }`}
                >
                  <td className="py-2.5 px-3 text-center font-mono text-gray-400">{q.id}</td>
                  <td className="py-2.5 px-3 text-center font-bold text-gray-700 dark:text-gray-300">
                    Day {q.day}
                  </td>
                  <td className="py-2.5 px-3 font-medium text-gray-600 dark:text-gray-300 whitespace-nowrap">
                    {q.topic}
                  </td>
                  <td className="py-2.5 px-3 font-semibold text-gray-900 dark:text-white">
                    <a
                      href={q.link}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-blue-600 dark:hover:text-emerald-400 inline-flex items-center gap-1"
                    >
                      {q.name}
                      <ExternalLink className="w-3 h-3 text-gray-400 shrink-0" />
                    </a>
                  </td>
                  <td className="py-2.5 px-3 text-center whitespace-nowrap">
                    <span className={`px-2 py-0.5 rounded border text-[11px] font-bold ${diffBadge}`}>
                      {q.difficulty}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-gray-500 dark:text-gray-400 text-[11px] whitespace-nowrap">
                    {q.pattern}
                  </td>
                  <td className="py-2.5 px-3 text-center whitespace-nowrap">
                    <button
                      onClick={() => handleQuickToggleStatus(q)}
                      className={`px-2.5 py-1 rounded text-[11px] font-bold transition-all active:scale-95 cursor-pointer shadow-2xs ${
                        isDone ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 hover:bg-emerald-200' :
                        prog.status === '🟡 In Progress' ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 hover:bg-amber-200' :
                        'bg-gray-100 text-gray-600 dark:bg-slate-800 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-slate-700'
                      }`}
                      title="Click to toggle status: Todo ➔ In Progress ➔ Done"
                    >
                      {prog.status || '❌ Todo'}
                    </button>
                  </td>
                  <td className="py-2.5 px-3 text-center whitespace-nowrap">
                    <button
                      onClick={() => handleQuickToggleRevisit(q)}
                      className={`px-2 py-1 rounded text-[11px] font-bold transition-all active:scale-95 cursor-pointer ${
                        isRevisit 
                          ? 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800 shadow-xs' 
                          : 'text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-800'
                      }`}
                      title="Click to toggle Spaced Repetition revisit flag"
                    >
                      {isRevisit ? '🔄 Revisit' : '+ Revisit'}
                    </button>
                  </td>
                  <td className="py-2.5 px-3 text-center whitespace-nowrap">
                    <button
                      onClick={() => onOpenPlayground(q)}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 font-bold text-[11px] border border-emerald-200 dark:border-emerald-800 transition-all active:scale-95 shadow-2xs cursor-pointer"
                      title="Open Python 3 in-browser code editor and test suite"
                    >
                      <Play className="w-3 h-3 text-emerald-500 fill-emerald-500" />
                      <span>Solve</span>
                    </button>
                  </td>
                  <td className="py-2.5 px-3 text-center whitespace-nowrap">
                    <button
                      onClick={() => onOpenEditorial(q)}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-purple-50 dark:bg-purple-950/60 hover:bg-purple-100 dark:hover:bg-purple-900/60 text-purple-700 dark:text-purple-300 font-bold text-[11px] border border-purple-200 dark:border-purple-800 transition-all active:scale-95 shadow-2xs cursor-pointer"
                      title="Read complete GFG-style editorial with Python, Java, C++, JS code"
                    >
                      <BookOpen className="w-3 h-3 text-purple-500" />
                      <span>Editorial</span>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Edit Question Modal */}
      {editingQuestion && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-gray-200 dark:border-slate-700 p-6 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between mb-4 border-b border-gray-200 dark:border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white">
                  {editingQuestion.name}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Day {editingQuestion.day} • {editingQuestion.topic}
                </p>
              </div>
              <button
                onClick={() => setEditingQuestion(null)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 dark:text-gray-300 uppercase mb-1">Status</label>
                <select
                  value={editForm.status}
                  onChange={e => setEditForm({ ...editForm, status: e.target.value })}
                  className="w-full p-2 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
                >
                  <option value="❌ Todo">❌ Todo</option>
                  <option value="🟡 In Progress">🟡 In Progress</option>
                  <option value="✅ Done">✅ Done</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-gray-700 dark:text-gray-300 uppercase mb-1">Revisit Flag (SRS)</label>
                <select
                  value={editForm.revisit}
                  onChange={e => setEditForm({ ...editForm, revisit: e.target.value })}
                  className="w-full p-2 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
                >
                  <option value="No">No</option>
                  <option value="🔄 Revisit">🔄 Revisit (Add to Spaced Repetition)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-gray-700 dark:text-gray-300 uppercase mb-1">Time Spent (Minutes)</label>
                <input
                  type="number"
                  placeholder="e.g. 25"
                  value={editForm.timeSpent}
                  onChange={e => setEditForm({ ...editForm, timeSpent: e.target.value })}
                  className="w-full p-2 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 dark:text-gray-300 uppercase mb-1">Notes / Key Intuition</label>
                <textarea
                  rows={3}
                  placeholder="Key observations, edge cases, time/space complexity..."
                  value={editForm.notes}
                  onChange={e => setEditForm({ ...editForm, notes: e.target.value })}
                  className="w-full p-2 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6 pt-3 border-t border-gray-200 dark:border-slate-800">
              <button
                onClick={() => setEditingQuestion(null)}
                className="px-4 py-2 rounded-lg text-xs font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-4 py-2 rounded-lg text-xs font-bold text-white bg-blue-600 hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Solution Modal (Featuring CodeViewer with syntax highlighting) */}
      {viewingSolutionQ && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-3xl bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-gray-200 dark:border-slate-700 overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-slate-800">
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  Solution: {viewingSolutionQ.name}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {viewingSolutionQ.topic} • {viewingSolutionQ.pattern}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    if (window.confirm('Delete this solution?')) {
                      onSolutionDelete(viewingSolutionQ.id);
                      setViewingSolutionQ(null);
                    }
                  }}
                  className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/50"
                  title="Delete solution"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewingSolutionQ(null)}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6 overflow-y-auto">
              <CodeViewer 
                code={viewingSolutionQ.solution?.code || ''}
                language={viewingSolutionQ.solution?.language || 'java'}
                isDark={isDark}
              />
            </div>

            <div className="px-6 py-3 bg-gray-50 dark:bg-slate-800/60 border-t border-gray-200 dark:border-slate-800 flex justify-between items-center text-xs">
              <span className="text-gray-500">
                Uploaded: {viewingSolutionQ.solution?.uploadedAt ? new Date(viewingSolutionQ.solution.uploadedAt).toLocaleDateString() : 'N/A'}
              </span>
              <button
                onClick={() => setViewingSolutionQ(null)}
                className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-slate-700 text-gray-800 dark:text-gray-200 font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upload Solution Modal */}
      {uploadingQ && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-gray-200 dark:border-slate-700 p-6 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between mb-4 border-b border-gray-200 dark:border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white">
                  Upload Solution: {uploadingQ.name}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Save your verified solution code for fast review before interviews
                </p>
              </div>
              <button
                onClick={() => setUploadingQ(null)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 dark:text-gray-300 uppercase mb-1">Language</label>
                <select
                  value={uploadLanguage}
                  onChange={e => setUploadLanguage(e.target.value)}
                  className="w-full p-2 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
                >
                  <option value="java">☕ Java</option>
                  <option value="python">🐍 Python</option>
                  <option value="cpp">⚙️ C++</option>
                  <option value="javascript">📜 JavaScript / TypeScript</option>
                  <option value="go">🐹 Go</option>
                  <option value="rust">🦀 Rust</option>
                  <option value="csharp">#️⃣ C#</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-gray-700 dark:text-gray-300 uppercase mb-1">Code Solution</label>
                <textarea
                  rows={12}
                  placeholder="// Paste your clean LeetCode solution here..."
                  value={uploadCode}
                  onChange={e => setUploadCode(e.target.value)}
                  className="w-full p-3 rounded-lg border border-gray-300 dark:border-slate-700 bg-gray-50 dark:bg-slate-950 font-mono text-xs text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6 pt-3 border-t border-gray-200 dark:border-slate-800">
              <button
                onClick={() => setUploadingQ(null)}
                className="px-4 py-2 rounded-lg text-xs font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                onClick={handleUploadSolution}
                className="px-4 py-2 rounded-lg text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700"
              >
                Save Solution
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// =========================================================================
// TAB 3: DAILY PLANNER TAB (Strictly 60 Days)
// =========================================================================
function PlannerTab({ plannerProgress, questionsProgress, onSave, onOpenPlayground = () => {} }) {
  const [filterDay, setFilterDay] = useState('All');

  const filteredDays = useMemo(() => {
    if (filterDay === 'All') return DAILY_PLAN;
    const num = parseInt(filterDay, 10);
    return DAILY_PLAN.filter(p => p.day === num);
  }, [filterDay]);

  const handleUpdate = (day, field, value) => {
    const existing = plannerProgress[day] || {};
    onSave(day, { ...existing, [field]: value });
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 dark:border-slate-800 pb-4 mb-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-600 dark:text-emerald-400" />
            60-Day Structured Curriculum
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Day 1 to 60 sequential roadmap. Target: ~5 problems per day
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <label className="font-semibold text-gray-600 dark:text-gray-400">Jump to Day:</label>
          <select
            value={filterDay}
            onChange={e => setFilterDay(e.target.value)}
            className="px-3 py-1.5 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-800 dark:text-white font-medium"
          >
            <option value="All">All 60 Days</option>
            {DAILY_PLAN.map(p => (
              <option key={p.day} value={p.day}>Day {p.day} ({p.topic.split(' + ')[0]})</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredDays.map(p => {
          const prog = plannerProgress[p.day] || {};
          const solvedCount = p.questions.filter(q => (questionsProgress[q.id] || {}).status === '✅ Done').length;
          const target = p.questions.length;
          const isComplete = solvedCount >= target && target > 0;
          const pct = target > 0 ? Math.round((solvedCount / target) * 100) : 0;

          return (
            <div
              key={p.day}
              className={`p-4 rounded-xl border transition-all ${
                isComplete 
                  ? 'border-emerald-300 dark:border-emerald-800 bg-emerald-50/30 dark:bg-emerald-950/20' 
                  : 'border-gray-200 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-800/40'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-sm text-gray-900 dark:text-white">
                    Day {p.day}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 font-medium">
                    {p.topic}
                  </span>
                </div>
                <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                  isComplete ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300' :
                  solvedCount > 0 ? 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300' :
                  'bg-gray-200 dark:bg-slate-700 text-gray-600 dark:text-gray-400'
                }`}>
                  {solvedCount}/{target} ({pct}%)
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-gray-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden mb-3">
                <div 
                  className={`h-full rounded-full transition-all duration-300 ${isComplete ? 'bg-emerald-500' : 'bg-blue-600'}`}
                  style={{ width: `${pct}%` }}
                />
              </div>

              {/* Problem list */}
              <div className="space-y-1.5 mb-3">
                {p.questions.map(q => {
                  const qProg = questionsProgress[q.id] || {};
                  const done = qProg.status === '✅ Done';
                  const inProg = qProg.status === '🟡 In Progress';
                  return (
                    <div key={q.id} className="flex items-center justify-between text-xs py-0.5">
                      <div className="flex items-center gap-1.5 truncate">
                        <span className="w-4 text-center text-gray-400 shrink-0">#{q.id}</span>
                        <button
                          onClick={() => onOpenPlayground(q)}
                          className={`truncate hover:underline text-left cursor-pointer ${
                            done ? 'line-through text-gray-400 dark:text-gray-500' : 'text-gray-800 dark:text-slate-200 font-medium'
                          }`}
                          title="Solve in IDE (auto-tracks In Progress/Done)"
                        >
                          {q.name}
                        </button>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        {inProg && (
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 font-semibold">
                            In Progress
                          </span>
                        )}
                        <button
                          onClick={() => onOpenPlayground(q)}
                          className="p-1 rounded text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 cursor-pointer"
                          title="Solve in Code Playground"
                        >
                          <Play className="w-3 h-3 fill-emerald-600" />
                        </button>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                          q.difficulty === 'Easy' ? 'text-emerald-600' :
                          q.difficulty === 'Medium' ? 'text-amber-600' : 'text-rose-600'
                        }`}>
                          {q.difficulty}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Daily reflection note */}
              <div className="pt-2 border-t border-gray-200 dark:border-slate-800">
                <input
                  type="text"
                  placeholder="Daily reflection notes..."
                  value={prog.notes || ''}
                  onChange={e => handleUpdate(p.day, 'notes', e.target.value)}
                  className="w-full px-2.5 py-1 text-xs rounded border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-gray-800 dark:text-gray-200 focus:outline-none"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// =========================================================================
// TAB 4: REVISION TAB (Spaced Repetition System - Feature 1.3)
// =========================================================================
function RevisionTab({ revisionLogs, onSave, onDelete, onOpenPlayground = () => {} }) {
  const [selectedMastery, setSelectedMastery] = useState('All');
  const todayStr = new Date().toISOString().split('T')[0];

  const logEntries = useMemo(() => {
    return Object.entries(revisionLogs).map(([key, val]) => ({
      key,
      ...val
    }));
  }, [revisionLogs]);

  // Due questions
  const dueQuestions = useMemo(() => {
    return logEntries.filter(item => {
      if (item.mastered === 'Mastered' || item.mastered === 'Yes') return false;
      const nextDate = item.nextReviewDate ? item.nextReviewDate.split('T')[0] : null;
      return !nextDate || nextDate <= todayStr;
    });
  }, [logEntries, todayStr]);

  const filteredLogs = useMemo(() => {
    if (selectedMastery === 'All') return logEntries;
    if (selectedMastery === 'Due') return dueQuestions;
    return logEntries.filter(item => item.mastered === selectedMastery);
  }, [logEntries, dueQuestions, selectedMastery]);

  // Handle Review Attempt completion
  const handleCompleteReview = (key, currentItem, quality) => {
    // quality: 'again' | 'good' | 'mastered'
    const currentStage = currentItem.intervalStage || 0;
    let nextStage = currentStage;
    let nextIntervalDays = 1;
    let newMastery = 'Needs Work';

    if (quality === 'again') {
      nextStage = 0;
      nextIntervalDays = SRS_INTERVALS[0];
      newMastery = 'Needs Work';
    } else if (quality === 'good') {
      nextStage = Math.min(currentStage + 1, SRS_INTERVALS.length - 1);
      nextIntervalDays = SRS_INTERVALS[nextStage];
      newMastery = nextStage >= 3 ? 'Mastered' : 'Getting Better';
    } else if (quality === 'mastered') {
      nextStage = SRS_INTERVALS.length - 1;
      nextIntervalDays = 30;
      newMastery = 'Mastered';
    }

    const nextDate = new Date(Date.now() + nextIntervalDays * 86400000).toISOString();
    const now = new Date().toISOString();

    const updated = {
      ...currentItem,
      intervalStage: nextStage,
      nextReviewDate: nextDate,
      mastered: newMastery,
      lastReviewedAt: now,
      attemptCount: (currentItem.attemptCount || 0) + 1
    };

    onSave(key, updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 dark:border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <RotateCcw className="w-5 h-5 text-amber-500" />
            Spaced Repetition System (SRS)
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Scientifically scheduled reviews: 1 day ➔ 3 days ➔ 7 days ➔ 14 days ➔ 30 days
          </p>
        </div>

        {/* Filter */}
        <div className="flex items-center gap-2 text-xs">
          <label className="font-semibold text-gray-600 dark:text-gray-400">Filter:</label>
          <select
            value={selectedMastery}
            onChange={e => setSelectedMastery(e.target.value)}
            className="px-3 py-1.5 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-800 dark:text-white font-medium"
          >
            <option value="All">All ({logEntries.length})</option>
            <option value="Due">🔔 Due Today ({dueQuestions.length})</option>
            <option value="Needs Work">Needs Work</option>
            <option value="Getting Better">Getting Better</option>
            <option value="Mastered">Mastered</option>
          </select>
        </div>
      </div>

      {/* Due Today Queue Card */}
      {dueQuestions.length > 0 && (
        <div className="p-4 rounded-xl border border-amber-300 dark:border-amber-900/60 bg-amber-500/10">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-sm text-amber-900 dark:text-amber-200 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
              Due for Review Today ({dueQuestions.length})
            </h3>
            <span className="text-xs text-amber-700 dark:text-amber-300">
              Complete these to reinforce memory
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {dueQuestions.map(item => {
              const matchedQ = INITIAL_QUESTIONS.find(q => q.id === item.questionId || q.name === item.questionName);
              return (
                <div
                  key={item.key}
                  className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-amber-200 dark:border-slate-800 shadow-xs flex flex-col justify-between"
                >
                  <div className="mb-2">
                    <div className="flex items-center justify-between text-xs">
                      <button
                        onClick={() => matchedQ && onOpenPlayground(matchedQ)}
                        className="font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 inline-flex items-center gap-1 cursor-pointer text-left"
                        title="Solve in Code Playground"
                      >
                        {item.questionName}
                        <Play className="w-3 h-3 text-emerald-500 fill-emerald-500" />
                      </button>
                      <span className="font-bold text-[10px] px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300">
                        Stage {(item.intervalStage || 0) + 1} ({SRS_INTERVALS[item.intervalStage || 0]}d)
                      </span>
                    </div>
                    <div className="text-[11px] text-gray-500 dark:text-gray-400 mt-1">
                      {item.topic} • {item.difficulty}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t border-gray-100 dark:border-slate-800 text-[11px]">
                    <span className="text-gray-400 font-semibold mr-auto">Review result:</span>
                    <button
                      onClick={() => handleCompleteReview(item.key, item, 'again')}
                      className="px-2 py-1 rounded bg-rose-50 dark:bg-rose-950/60 hover:bg-rose-100 text-rose-700 dark:text-rose-300 font-medium cursor-pointer"
                      title="Reset to 1-day interval"
                    >
                      Struggled
                    </button>
                    <button
                      onClick={() => handleCompleteReview(item.key, item, 'good')}
                      className="px-2 py-1 rounded bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 text-blue-700 dark:text-blue-300 font-medium cursor-pointer"
                      title="Advance to next interval"
                    >
                      Recalled
                    </button>
                    <button
                      onClick={() => handleCompleteReview(item.key, item, 'mastered')}
                      className="px-2 py-1 rounded bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 text-emerald-700 dark:text-emerald-300 font-medium cursor-pointer"
                      title="Mark completely mastered"
                    >
                      Mastered
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Main Revision Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-slate-800">
        <table className="w-full border-collapse text-left text-xs">
          <thead>
            <tr className="bg-gray-100 dark:bg-slate-800/90 text-gray-600 dark:text-gray-300 font-semibold border-b border-gray-200 dark:border-slate-800">
              <th className="py-2.5 px-3">QUESTION NAME</th>
              <th className="py-2.5 px-3">TOPIC</th>
              <th className="py-2.5 px-3 text-center">DIFFICULTY</th>
              <th className="py-2.5 px-3 text-center">SRS STAGE</th>
              <th className="py-2.5 px-3 text-center">NEXT DUE</th>
              <th className="py-2.5 px-3 text-center">MASTERY</th>
              <th className="py-2.5 px-3 text-center w-14">ACTION</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-slate-800/60">
            {filteredLogs.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-8 text-gray-400">
                  No questions in revision queue. Click 🔄 Revisit on any question in the Questions tab to add!
                </td>
              </tr>
            ) : (
              filteredLogs.map(item => {
                const nextDate = item.nextReviewDate ? item.nextReviewDate.split('T')[0] : null;
                const isDue = nextDate && nextDate <= todayStr;

                return (
                  <tr key={item.key} className="hover:bg-gray-50/50 dark:hover:bg-slate-800/40">
                    <td className="py-2.5 px-3 font-semibold text-gray-900 dark:text-white">
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:underline inline-flex items-center gap-1"
                      >
                        {item.questionName}
                        <ExternalLink className="w-3 h-3 text-gray-400 shrink-0" />
                      </a>
                    </td>
                    <td className="py-2.5 px-3 text-gray-500">{item.topic}</td>
                    <td className="py-2.5 px-3 text-center font-bold">
                      <span className={item.difficulty === 'Easy' ? 'text-emerald-600' : item.difficulty === 'Medium' ? 'text-amber-600' : 'text-rose-600'}>
                        {item.difficulty}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-center font-mono text-[11px]">
                      Stage {(item.intervalStage || 0) + 1} ({SRS_INTERVALS[item.intervalStage || 0]}d)
                    </td>
                    <td className="py-2.5 px-3 text-center font-mono">
                      {isDue ? (
                        <span className="px-2 py-0.5 rounded font-bold bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300">
                          Due Today
                        </span>
                      ) : (
                        <span className="text-gray-500">{nextDate || 'N/A'}</span>
                      )}
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                        item.mastered === 'Mastered' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' :
                        item.mastered === 'Getting Better' ? 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300' :
                        'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                      }`}>
                        {item.mastered || 'Needs Work'}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <button
                        onClick={() => {
                          if (window.confirm(`Remove "${item.questionName}" from revision queue?`)) {
                            onDelete(item.key);
                          }
                        }}
                        className="p-1 rounded text-gray-400 hover:text-rose-600 transition-colors"
                        title="Remove from revision"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// =========================================================================
// TAB 5: PATTERNS TAB
// =========================================================================
function PatternsTab() {
  return (
    <div>
      <div className="border-b border-gray-200 dark:border-slate-800 pb-4 mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-blue-600 dark:text-emerald-400" />
          DSA Pattern Mastery Reference
        </h2>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Core mental models to identify and solve any LeetCode problem in technical interviews
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {PATTERNS.map((p, idx) => (
          <div
            key={idx}
            className="p-5 rounded-xl border border-gray-200 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-800/40 shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-base font-bold text-gray-900 dark:text-white">
                  {p.pattern}
                </h3>
                <div className="flex items-center gap-2 font-mono text-[11px]">
                  <span className="px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-semibold">
                    Time: {p.time}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 font-semibold">
                    Space: {p.space}
                  </span>
                </div>
              </div>

              <p className="text-xs text-gray-600 dark:text-gray-300 mb-3 leading-relaxed">
                {p.usage}
              </p>

              {p.keyTip && (
                <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/60 text-emerald-900 dark:text-emerald-300 text-xs mb-3">
                  <strong>💡 Pro Tip:</strong> {p.keyTip}
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-gray-200 dark:border-slate-800/60 text-xs">
              <span className="font-semibold text-gray-500 dark:text-gray-400">Classic Problems: </span>
              <span className="text-gray-800 dark:text-slate-200 font-medium">{p.problems}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// =========================================================================
// TAB 6: WEEKLY REVIEW TAB
// =========================================================================
function WeeklyTab({ weeklyReviews, questionsProgress, onSave }) {
  const handleUpdate = (week, field, value) => {
    const existing = weeklyReviews[week] || {};
    onSave(week, { ...existing, [field]: value });
  };

  return (
    <div>
      <div className="border-b border-gray-200 dark:border-slate-800 pb-4 mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-blue-600 dark:text-emerald-400" />
          Weekly Auto-Summary & Reflection
        </h2>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Track weekly consistency, target completion, and note key areas to reinforce
        </p>
      </div>

      <div className="space-y-4">
        {WEEKLY_PLAN.map(plan => {
          const rev = weeklyReviews[plan.week] || {};
          const solved = plan.questionIds.filter(id => (questionsProgress[id] || {}).status === '✅ Done').length;
          const flagged = plan.questionIds.filter(id => (questionsProgress[id] || {}).revisit === '🔄 Revisit').length;
          const pct = plan.targetCount > 0 ? Math.round((solved / plan.targetCount) * 100) : 0;

          return (
            <div
              key={plan.week}
              className="rounded-xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs"
            >
              <div className="bg-gray-100 dark:bg-slate-800/80 px-5 py-3 flex items-center justify-between border-b border-gray-200 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <span className="font-extrabold text-sm text-gray-900 dark:text-white">
                    {plan.week}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                    {plan.days}
                  </span>
                </div>
                <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                  pct === 100 ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' :
                  pct > 0 ? 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300' :
                  'bg-gray-200 text-gray-600 dark:bg-slate-700 dark:text-gray-400'
                }`}>
                  {pct}% Completed
                </span>
              </div>

              {/* Stats Bar */}
              <div className="grid grid-cols-4 p-4 border-b border-gray-100 dark:border-slate-800 text-center">
                <div>
                  <div className="text-[11px] text-gray-400 uppercase font-semibold">Target</div>
                  <div className="text-lg font-bold text-gray-800 dark:text-slate-200">{plan.targetCount}</div>
                </div>
                <div>
                  <div className="text-[11px] text-gray-400 uppercase font-semibold">Solved</div>
                  <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400">{solved}</div>
                </div>
                <div>
                  <div className="text-[11px] text-gray-400 uppercase font-semibold">Remaining</div>
                  <div className="text-lg font-bold text-amber-600 dark:text-amber-400">{plan.targetCount - solved}</div>
                </div>
                <div>
                  <div className="text-[11px] text-gray-400 uppercase font-semibold">Flagged</div>
                  <div className="text-lg font-bold text-rose-600 dark:text-rose-400">{flagged}</div>
                </div>
              </div>

              {/* Topics */}
              <div className="px-5 py-2.5 bg-gray-50/50 dark:bg-slate-900/50 border-b border-gray-100 dark:border-slate-800 flex flex-wrap items-center gap-1.5 text-xs">
                <span className="font-semibold text-gray-400 mr-2">Topics:</span>
                {plan.topics.map(t => (
                  <span key={t} className="px-2 py-0.5 rounded bg-gray-200 dark:bg-slate-800 text-gray-700 dark:text-gray-300 text-[11px] font-medium">
                    {t}
                  </span>
                ))}
              </div>

              {/* Notes input */}
              <div className="p-4 flex items-center gap-3">
                <label className="text-xs font-bold text-gray-500 uppercase whitespace-nowrap">Your Reflection:</label>
                <input
                  type="text"
                  placeholder="Key takeaways, difficult algorithms to revisit, interview confidence..."
                  value={rev.notes || ''}
                  onChange={e => handleUpdate(plan.week, 'notes', e.target.value)}
                  className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-gray-900 dark:text-white focus:outline-none"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
