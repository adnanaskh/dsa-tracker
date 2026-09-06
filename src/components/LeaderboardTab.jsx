import React, { useState, useMemo } from 'react';
import { 
  Trophy, 
  Flame, 
  Search, 
  Medal, 
  Crown, 
  Sparkles, 
  UserCheck, 
  ExternalLink,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

export default function LeaderboardTab({
  leaderboardUsers = [],
  currentUser = null,
  userStats = { solved: 0, streak: 0, easy: 0, med: 0, hard: 0 },
  customDisplayName = '',
  onOpenProfile = () => {},
  onGoogleSignIn = () => {}
}) {
  const [sortBy, setSortBy] = useState('solved'); // 'solved' | 'streak' | 'hard'
  const [searchQuery, setSearchQuery] = useState('');

  // Prepare full list including only real users
  const combinedUsers = useMemo(() => {
    const list = [...leaderboardUsers];

    // If current user is authenticated, ensure their latest live stats are represented
    if (currentUser) {
      const currentUid = currentUser.uid;
      const existingIndex = list.findIndex(u => u.uid === currentUid);

      const currentUserEntry = {
        uid: currentUid,
        displayName: customDisplayName || currentUser.displayName || currentUser.email?.split('@')[0] || 'You',
        photoURL: currentUser.photoURL || null,
        solvedCount: userStats.solved || 0,
        streak: userStats.streak || 0,
        easyCount: userStats.easy || 0,
        medCount: userStats.med || 0,
        hardCount: userStats.hard || 0,
        isCurrentUser: true,
        lastActive: new Date().toISOString()
      };

      if (existingIndex >= 0) {
        list[existingIndex] = {
          ...list[existingIndex],
          ...currentUserEntry,
          isCurrentUser: true
        };
      } else {
        list.push(currentUserEntry);
      }
    }

    // Sort according to active filter
    list.sort((a, b) => {
      if (sortBy === 'solved') {
        if ((b.solvedCount || 0) !== (a.solvedCount || 0)) return (b.solvedCount || 0) - (a.solvedCount || 0);
        return (b.streak || 0) - (a.streak || 0);
      }
      if (sortBy === 'streak') {
        if ((b.streak || 0) !== (a.streak || 0)) return (b.streak || 0) - (a.streak || 0);
        return (b.solvedCount || 0) - (a.solvedCount || 0);
      }
      if (sortBy === 'hard') {
        if ((b.hardCount || 0) !== (a.hardCount || 0)) return (b.hardCount || 0) - (a.hardCount || 0);
        return (b.solvedCount || 0) - (a.solvedCount || 0);
      }
      return 0;
    });

    // Assign 1-indexed ranks
    return list.map((user, idx) => ({
      ...user,
      rank: idx + 1
    }));
  }, [leaderboardUsers, currentUser, userStats, customDisplayName, sortBy]);

  // Find current user's rank
  const currentUserRankEntry = useMemo(() => {
    if (!currentUser) return null;
    return combinedUsers.find(u => u.isCurrentUser) || null;
  }, [combinedUsers, currentUser]);

  // Filtered by search query
  const filteredUsers = useMemo(() => {
    if (!searchQuery.trim()) return combinedUsers;
    const q = searchQuery.toLowerCase();
    return combinedUsers.filter(u => u.displayName?.toLowerCase().includes(q));
  }, [combinedUsers, searchQuery]);

  const top3 = combinedUsers.slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 dark:border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-500" />
            Global Leaderboard
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Global rankings based on total problems solved and consistency
          </p>
        </div>

        {/* User Rank Quick Badge */}
        {currentUser && currentUserRankEntry && (
          <div 
            onClick={onOpenProfile}
            className="flex items-center gap-3 px-4 py-2 rounded-xl bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-900 cursor-pointer hover:border-blue-400 transition-colors"
          >
            <div className="text-xs">
              <span className="text-gray-500 dark:text-gray-400 block font-medium">Your Global Rank</span>
              <span className="text-lg font-black text-blue-600 dark:text-blue-400">
                #{currentUserRankEntry.rank}
              </span>
            </div>
            <div className="border-l border-blue-200 dark:border-blue-900 pl-3 text-xs">
              <span className="text-gray-500 dark:text-gray-400 block font-medium">Streak</span>
              <span className="text-sm font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                {currentUserRankEntry.streak}d
              </span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </div>
        )}
      </div>

      {/* Guest notice if not logged in */}
      {!currentUser && (
        <div className="p-3.5 rounded-xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/30 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-amber-900 dark:text-amber-200">
            <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
            <span>
              Sign in with Google to record your submissions and appear on the global leaderboard.
            </span>
          </div>
          <button
            onClick={onGoogleSignIn}
            className="px-3.5 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-xs transition-colors shrink-0"
          >
            Sign In with Google
          </button>
        </div>
      )}

      {/* Dynamic Podium Showcase for Real Users */}
      {combinedUsers.length > 0 && !searchQuery ? (
        <div className={`grid gap-4 pt-2 ${
          combinedUsers.length === 1 
            ? 'grid-cols-1 max-w-md mx-auto' 
            : combinedUsers.length === 2 
            ? 'grid-cols-1 md:grid-cols-2 max-w-2xl mx-auto' 
            : 'grid-cols-1 md:grid-cols-3'
        }`}>
          {/* 2nd Place (Silver) - only if >= 2 users */}
          {combinedUsers.length >= 2 && top3[1] && (
            <div 
              onClick={() => onOpenProfile(top3[1]?.isCurrentUser ? null : top3[1])}
              className="order-2 md:order-1 p-5 rounded-2xl border border-slate-300 dark:border-slate-800 bg-gradient-to-b from-slate-100 to-white dark:from-slate-800/80 dark:to-slate-900 flex flex-col items-center text-center relative shadow-sm cursor-pointer hover:shadow-md transition-all group"
            >
              <div className="absolute -top-3 px-3 py-0.5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-black uppercase tracking-wider flex items-center gap-1 border border-slate-300 dark:border-slate-600">
                <Medal className="w-3.5 h-3.5 text-slate-400" /> 2nd Place
              </div>

              <div className="w-16 h-16 rounded-full bg-slate-200 dark:bg-slate-700 border-2 border-slate-400 flex items-center justify-center font-bold text-lg text-slate-700 dark:text-slate-200 mt-2 mb-3 shadow-sm overflow-hidden group-hover:scale-105 transition-transform">
                {top3[1]?.photoURL ? (
                  <img src={top3[1].photoURL} alt="" className="w-full h-full object-cover" />
                ) : (
                  top3[1]?.displayName?.substring(0, 2).toUpperCase() || '2'
                )}
              </div>

              <div className="font-bold text-sm text-gray-900 dark:text-white truncate max-w-[180px]">
                {top3[1]?.displayName} {top3[1]?.isCurrentUser && <span className="text-blue-500 font-semibold">(You)</span>}
              </div>

              <div className="text-2xl font-black text-gray-800 dark:text-slate-100 mt-2">
                {top3[1]?.solvedCount} <span className="text-xs font-normal text-gray-400">/ 305</span>
              </div>

              <div className="flex items-center gap-3 mt-3 text-xs">
                <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400 font-bold">
                  <Flame className="w-3.5 h-3.5 fill-amber-500" />
                  {top3[1]?.streak}d streak
                </span>
                <span className="text-rose-600 dark:text-rose-400 font-semibold">
                  {top3[1]?.hardCount} Hard
                </span>
              </div>
            </div>
          )}

          {/* 1st Place (Gold) */}
          {combinedUsers.length >= 1 && top3[0] && (
            <div 
              onClick={() => onOpenProfile(top3[0]?.isCurrentUser ? null : top3[0])}
              className={`order-1 ${combinedUsers.length >= 3 ? 'md:order-2 md:-translate-y-2' : ''} p-6 rounded-2xl border-2 border-amber-400/80 bg-gradient-to-b from-amber-500/15 to-white dark:from-amber-500/20 dark:to-slate-900 flex flex-col items-center text-center relative shadow-md cursor-pointer hover:shadow-lg transition-all group`}
            >
              <div className="absolute -top-3.5 px-3.5 py-1 rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 text-xs font-black uppercase tracking-wider flex items-center gap-1 shadow-sm">
                <Crown className="w-4 h-4 fill-slate-950" /> Rank 1
              </div>

              <div className="w-20 h-20 rounded-full bg-amber-100 dark:bg-amber-950/80 border-3 border-amber-400 flex items-center justify-center font-extrabold text-2xl text-amber-600 dark:text-amber-300 mt-2 mb-3 shadow-md overflow-hidden group-hover:scale-105 transition-transform">
                {top3[0]?.photoURL ? (
                  <img src={top3[0].photoURL} alt="" className="w-full h-full object-cover" />
                ) : (
                  top3[0]?.displayName?.substring(0, 2).toUpperCase() || '1'
                )}
              </div>

              <div className="font-extrabold text-base text-gray-900 dark:text-white truncate max-w-[200px]">
                {top3[0]?.displayName} {top3[0]?.isCurrentUser && <span className="text-blue-500 font-semibold">(You)</span>}
              </div>

              <div className="text-3xl font-black text-amber-600 dark:text-amber-400 mt-2">
                {top3[0]?.solvedCount} <span className="text-sm font-normal text-gray-400">/ 305</span>
              </div>

              <div className="flex items-center gap-3 mt-3 text-xs">
                <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400 font-extrabold">
                  <Flame className="w-4 h-4 fill-amber-500" />
                  {top3[0]?.streak}d streak
                </span>
                <span className="text-rose-600 dark:text-rose-400 font-bold">
                  {top3[0]?.hardCount} Hard
                </span>
              </div>
            </div>
          )}

          {/* 3rd Place (Bronze) - only if >= 3 users */}
          {combinedUsers.length >= 3 && top3[2] && (
            <div 
              onClick={() => onOpenProfile(top3[2]?.isCurrentUser ? null : top3[2])}
              className="order-3 p-5 rounded-2xl border border-amber-800/20 dark:border-amber-900/40 bg-gradient-to-b from-amber-900/10 to-white dark:from-amber-950/30 dark:to-slate-900 flex flex-col items-center text-center relative shadow-sm cursor-pointer hover:shadow-md transition-all group"
            >
              <div className="absolute -top-3 px-3 py-0.5 rounded-full bg-amber-900/20 text-amber-800 dark:text-amber-300 text-xs font-black uppercase tracking-wider flex items-center gap-1 border border-amber-800/30">
                <Medal className="w-3.5 h-3.5 text-amber-700" /> 3rd Place
              </div>

              <div className="w-16 h-16 rounded-full bg-amber-900/10 border-2 border-amber-700/60 flex items-center justify-center font-bold text-lg text-amber-800 dark:text-amber-300 mt-2 mb-3 shadow-sm overflow-hidden group-hover:scale-105 transition-transform">
                {top3[2]?.photoURL ? (
                  <img src={top3[2].photoURL} alt="" className="w-full h-full object-cover" />
                ) : (
                  top3[2]?.displayName?.substring(0, 2).toUpperCase() || '3'
                )}
              </div>

              <div className="font-bold text-sm text-gray-900 dark:text-white truncate max-w-[180px]">
                {top3[2]?.displayName} {top3[2]?.isCurrentUser && <span className="text-blue-500 font-semibold">(You)</span>}
              </div>

              <div className="text-2xl font-black text-gray-800 dark:text-slate-100 mt-2">
                {top3[2]?.solvedCount} <span className="text-xs font-normal text-gray-400">/ 305</span>
              </div>

              <div className="flex items-center gap-3 mt-3 text-xs">
                <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400 font-bold">
                  <Flame className="w-3.5 h-3.5 fill-amber-500" />
                  {top3[2]?.streak}d streak
                </span>
                <span className="text-rose-600 dark:text-rose-400 font-semibold">
                  {top3[2]?.hardCount} Hard
                </span>
              </div>
            </div>
          )}
        </div>
      ) : combinedUsers.length === 0 ? (
        <div className="p-8 rounded-2xl border border-dashed border-gray-300 dark:border-slate-800 text-center bg-white/40 dark:bg-slate-900/40">
          <Trophy className="w-12 h-12 text-amber-500/60 mx-auto mb-3" />
          <h3 className="text-base font-bold text-gray-800 dark:text-slate-200">No Leaderboard Entries</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 max-w-md mx-auto">
            Solve problems while signed in to claim your rank on the leaderboard.
          </p>
        </div>
      ) : null}

      {/* Control Bar (Filters & Search) */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-gray-100 dark:bg-slate-800 text-xs font-semibold">
          <button
            onClick={() => setSortBy('solved')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              sortBy === 'solved'
                ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-emerald-400 shadow-xs'
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900'
            }`}
          >
            Most Solved
          </button>
          <button
            onClick={() => setSortBy('streak')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              sortBy === 'streak'
                ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-emerald-400 shadow-xs'
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900'
            }`}
          >
            Highest Streak
          </button>
          <button
            onClick={() => setSortBy('hard')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              sortBy === 'hard'
                ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-emerald-400 shadow-xs'
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900'
            }`}
          >
            Hard Solved
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search username..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="pl-8 pr-3 py-1.5 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-400 text-xs focus:outline-none"
          />
        </div>
      </div>

      {/* Rankings Table */}
      <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-slate-800">
        <table className="w-full border-collapse text-left text-xs">
          <thead>
            <tr className="bg-gray-100 dark:bg-slate-800/90 text-gray-600 dark:text-gray-300 font-semibold border-b border-gray-200 dark:border-slate-800">
              <th className="py-3 px-4 text-center w-14">RANK</th>
              <th className="py-3 px-4">USER</th>
              <th className="py-3 px-4 text-center">PROBLEMS SOLVED</th>
              <th className="py-3 px-4 text-center">STREAK</th>
              <th className="py-3 px-4 text-center">DIFFICULTY BREAKDOWN</th>
              <th className="py-3 px-4 text-right">PROFILE</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-slate-800/60">
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-12 text-center text-gray-500 dark:text-gray-400">
                  <Trophy className="w-10 h-10 mx-auto mb-2 text-gray-400 opacity-40" />
                  <p className="font-semibold text-sm">No live entries yet</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Solve questions while signed in and your rank will appear here live!
                  </p>
                </td>
              </tr>
            ) : (
              filteredUsers.map((u) => {
                const isCurrent = u.isCurrentUser;

                return (
                  <tr
                    key={u.uid}
                    className={`transition-colors ${
                      isCurrent 
                        ? 'bg-blue-50/60 dark:bg-blue-950/40 font-semibold' 
                        : 'hover:bg-gray-50/60 dark:hover:bg-slate-800/40'
                    }`}
                  >
                    <td className="py-3 px-4 text-center font-black">
                      {u.rank === 1 ? (
                        <span className="w-6 h-6 rounded-full bg-amber-400 text-slate-950 inline-flex items-center justify-center text-xs shadow-xs">
                          1
                        </span>
                      ) : u.rank === 2 ? (
                        <span className="w-6 h-6 rounded-full bg-slate-300 text-slate-900 inline-flex items-center justify-center text-xs shadow-xs">
                          2
                        </span>
                      ) : u.rank === 3 ? (
                        <span className="w-6 h-6 rounded-full bg-amber-700 text-white inline-flex items-center justify-center text-xs shadow-xs">
                          3
                        </span>
                      ) : (
                        <span className="text-gray-400 font-mono">#{u.rank}</span>
                      )}
                    </td>

                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-gray-200 dark:bg-slate-700 flex items-center justify-center text-[11px] font-bold text-gray-700 dark:text-gray-300 overflow-hidden shrink-0">
                          {u.photoURL ? (
                            <img src={u.photoURL} alt="" className="w-full h-full object-cover" />
                          ) : (
                            u.displayName?.substring(0, 2).toUpperCase() || '?'
                          )}
                        </div>
                        <div>
                          <div className="font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                            <span>{u.displayName}</span>
                            {isCurrent && (
                              <span className="text-[10px] px-1.5 py-0.2 rounded bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                                You
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4 text-center">
                      <div className="flex flex-col items-center">
                        <span className="font-bold text-sm text-gray-900 dark:text-white">
                          {u.solvedCount || 0}
                        </span>
                        <div className="w-20 bg-gray-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden mt-1">
                          <div
                            className="bg-emerald-500 h-full rounded-full"
                            style={{ width: `${Math.min(100, Math.round(((u.solvedCount || 0) / 305) * 100))}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4 text-center font-bold text-amber-600 dark:text-amber-400">
                      <span className="inline-flex items-center gap-1 font-mono text-xs">
                        <Flame className="w-3.5 h-3.5 fill-amber-500" />
                        {u.streak || 0}d
                      </span>
                    </td>

                    <td className="py-3 px-4 text-center">
                      <div className="inline-flex items-center gap-1.5 text-[10px] font-mono">
                        <span className="px-1.5 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 font-bold border border-emerald-200 dark:border-emerald-900">
                          E: {u.easyCount || 0}
                        </span>
                        <span className="px-1.5 py-0.5 rounded bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 font-bold border border-amber-200 dark:border-amber-900">
                          M: {u.medCount || 0}
                        </span>
                        <span className="px-1.5 py-0.5 rounded bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400 font-bold border border-rose-200 dark:border-rose-900">
                          H: {u.hardCount || 0}
                        </span>
                      </div>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => onOpenProfile(isCurrent ? null : u)}
                        className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-colors cursor-pointer ${
                          isCurrent
                            ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs'
                            : 'bg-gray-100 hover:bg-gray-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        {isCurrent ? 'My Profile' : 'View'}
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
