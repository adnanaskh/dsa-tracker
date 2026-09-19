import React, { useState, useMemo } from 'react';
import { 
  Trophy, 
  Flame, 
  Crown, 
  Medal, 
  Search, 
  Filter, 
  UserCheck, 
  TrendingUp, 
  CheckCircle2, 
  ExternalLink,
  Layers,
  ArrowUpDown,
  Sparkles,
  ShieldCheck,
  User,
  Users
} from 'lucide-react';
import { DEFAULT_LEADERBOARD } from '../data/defaultLeaderboard';

export default function LeaderboardTab({
  liveUsers = [],
  currentUser = null,
  userStats = {},
  onOpenProfile = () => {},
  isGuest = false,
  onPromptAuth = () => {}
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('solved'); // 'solved' | 'streak' | 'hard'

  // Combine live users from Firebase with default high-ranking benchmarks
  const combinedUsers = useMemo(() => {
    const list = [...liveUsers];

    // If current user exists and is not already in liveUsers, inject them
    if (currentUser && !list.some(u => u.uid === currentUser.uid)) {
      list.push({
        uid: currentUser.uid,
        displayName: currentUser.displayName || 'You',
        photoURL: currentUser.photoURL,
        solvedCount: userStats.solvedCount || 0,
        easyCount: userStats.easyCount || 0,
        medCount: userStats.medCount || 0,
        hardCount: userStats.hardCount || 0,
        streak: userStats.streak || 0,
        lastActive: new Date().toISOString(),
        isCurrentUser: true
      });
    }

    // Sort by chosen metric
    list.sort((a, b) => {
      if (sortBy === 'solved') return (b.solvedCount || 0) - (a.solvedCount || 0);
      if (sortBy === 'streak') return (b.streak || 0) - (a.streak || 0);
      if (sortBy === 'hard') return (b.hardCount || 0) - (a.hardCount || 0);
      return (b.solvedCount || 0) - (a.solvedCount || 0);
    });

    // Assign ranking numbers
    return list.map((u, idx) => ({
      ...u,
      rank: idx + 1,
      isCurrentUser: currentUser && u.uid === currentUser.uid
    }));
  }, [liveUsers, currentUser, userStats, sortBy]);

  // Filter search
  const filteredUsers = useMemo(() => {
    if (!searchQuery.trim()) return combinedUsers;
    const q = searchQuery.toLowerCase();
    return combinedUsers.filter(u => 
      (u.displayName || '').toLowerCase().includes(q)
    );
  }, [combinedUsers, searchQuery]);

  // Top 3 Podium
  const top3 = useMemo(() => {
    return combinedUsers.slice(0, 3);
  }, [combinedUsers]);

  const currentUserRank = useMemo(() => {
    return combinedUsers.find(u => u.isCurrentUser);
  }, [combinedUsers]);

  return (
    <div className="space-y-6">
      {/* Top Banner & Quick Stats */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-md border border-zinc-800 bg-[#18181b]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded border border-zinc-700 bg-zinc-900 flex items-center justify-center text-amber-400 shrink-0">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-zinc-100 flex items-center gap-2">
              <span>Global Community Leaderboard</span>
              <span className="text-[10px] font-mono text-emerald-400 font-medium">
                LIVE
              </span>
            </h2>
            <p className="text-xs text-zinc-400">
              Benchmark your DSA progress and problem-solving streak against peers worldwide
            </p>
          </div>
        </div>

        {/* Current User Quick Badge */}
        {currentUser && currentUserRank && (
          <div className="flex items-center gap-3 px-3.5 py-1.5 rounded border border-zinc-800 bg-[#09090b] text-xs">
            <div className="text-zinc-400">Your Rank:</div>
            <div className="font-bold text-zinc-100 font-mono text-sm">
              #{currentUserRank.rank}
            </div>
            <div className="text-zinc-600">•</div>
            <div className="text-emerald-400 font-mono font-medium">
              {currentUserRank.solvedCount} Solved
            </div>
          </div>
        )}
      </div>

      {/* Guest Notice if not logged in */}
      {isGuest && (
        <div className="p-3.5 rounded border border-zinc-800 bg-[#18181b] flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-zinc-300">
            <User className="w-4 h-4 text-amber-400 shrink-0" />
            <span>You are currently in Guest Mode. Sign in with Google to record your live rank.</span>
          </div>
          <button
            onClick={() => onPromptAuth('Sign in to publish your name and score to the global leaderboard')}
            className="px-3 py-1 rounded border border-indigo-500/40 bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition-colors shrink-0 cursor-pointer"
          >
            Sign In with Google
          </button>
        </div>
      )}

      {/* Podium Showcase for Top Users */}
      {combinedUsers.length > 0 && !searchQuery ? (
        <div className={`grid gap-3 pt-1 ${
          combinedUsers.length === 1 
            ? 'grid-cols-1 max-w-md mx-auto' 
            : combinedUsers.length === 2 
            ? 'grid-cols-1 md:grid-cols-2 max-w-2xl mx-auto' 
            : 'grid-cols-1 md:grid-cols-3'
        }`}>
          {/* 2nd Place (Silver) */}
          {combinedUsers.length >= 2 && top3[1] && (
            <div 
              onClick={() => onOpenProfile(top3[1]?.isCurrentUser ? null : top3[1])}
              className="order-2 md:order-1 p-4 rounded-md border border-zinc-800 bg-[#18181b] flex flex-col items-center text-center relative cursor-pointer hover:bg-zinc-850 transition-colors"
            >
              <div className="px-2.5 py-0.5 rounded border border-zinc-700 bg-zinc-900 text-zinc-300 text-[11px] font-mono uppercase tracking-wider flex items-center gap-1 mb-2">
                <Medal className="w-3 h-3 text-zinc-400" /> Rank 2
              </div>

              <div className="w-12 h-12 rounded border border-zinc-700 bg-zinc-900 flex items-center justify-center font-bold text-sm text-zinc-300 my-1 overflow-hidden">
                {top3[1]?.photoURL ? (
                  <img src={top3[1].photoURL} alt="" className="w-full h-full object-cover" />
                ) : (
                  top3[1]?.displayName?.substring(0, 2).toUpperCase() || '2'
                )}
              </div>

              <div className="font-semibold text-xs text-zinc-200 truncate max-w-[180px] mt-1">
                {top3[1]?.displayName} {top3[1]?.isCurrentUser && <span className="text-indigo-400">(You)</span>}
              </div>

              <div className="text-lg font-bold text-zinc-100 font-mono mt-1">
                {top3[1]?.solvedCount} <span className="text-xs font-normal text-zinc-500">/ 305</span>
              </div>

              <div className="flex items-center gap-3 mt-2 text-[11px] font-mono">
                <span className="text-amber-400">
                  {top3[1]?.streak}d streak
                </span>
                <span className="text-rose-400">
                  {top3[1]?.hardCount} Hard
                </span>
              </div>
            </div>
          )}

          {/* 1st Place (Gold) */}
          {combinedUsers.length >= 1 && top3[0] && (
            <div 
              onClick={() => onOpenProfile(top3[0]?.isCurrentUser ? null : top3[0])}
              className="order-1 p-4 rounded-md border border-amber-500/40 bg-[#18181b] flex flex-col items-center text-center relative cursor-pointer hover:bg-zinc-850 transition-colors"
            >
              <div className="px-2.5 py-0.5 rounded border border-amber-500/40 bg-zinc-900 text-amber-400 text-[11px] font-mono uppercase tracking-wider flex items-center gap-1 mb-2">
                <Crown className="w-3 h-3 text-amber-400" /> Rank 1
              </div>

              <div className="w-14 h-14 rounded border border-amber-500/50 bg-zinc-900 flex items-center justify-center font-bold text-base text-amber-400 my-1 overflow-hidden">
                {top3[0]?.photoURL ? (
                  <img src={top3[0].photoURL} alt="" className="w-full h-full object-cover" />
                ) : (
                  top3[0]?.displayName?.substring(0, 2).toUpperCase() || '1'
                )}
              </div>

              <div className="font-bold text-sm text-zinc-100 truncate max-w-[200px] mt-1">
                {top3[0]?.displayName} {top3[0]?.isCurrentUser && <span className="text-indigo-400">(You)</span>}
              </div>

              <div className="text-2xl font-bold text-amber-400 font-mono mt-1">
                {top3[0]?.solvedCount} <span className="text-xs font-normal text-zinc-500">/ 305</span>
              </div>

              <div className="flex items-center gap-3 mt-2 text-[11px] font-mono">
                <span className="text-amber-400 font-medium">
                  {top3[0]?.streak}d streak
                </span>
                <span className="text-rose-400 font-medium">
                  {top3[0]?.hardCount} Hard
                </span>
              </div>
            </div>
          )}

          {/* 3rd Place (Bronze) */}
          {combinedUsers.length >= 3 && top3[2] && (
            <div 
              onClick={() => onOpenProfile(top3[2]?.isCurrentUser ? null : top3[2])}
              className="order-3 p-4 rounded-md border border-zinc-800 bg-[#18181b] flex flex-col items-center text-center relative cursor-pointer hover:bg-zinc-850 transition-colors"
            >
              <div className="px-2.5 py-0.5 rounded border border-zinc-700 bg-zinc-900 text-zinc-400 text-[11px] font-mono uppercase tracking-wider flex items-center gap-1 mb-2">
                <Medal className="w-3 h-3 text-amber-600" /> Rank 3
              </div>

              <div className="w-12 h-12 rounded border border-zinc-700 bg-zinc-900 flex items-center justify-center font-bold text-sm text-zinc-300 my-1 overflow-hidden">
                {top3[2]?.photoURL ? (
                  <img src={top3[2].photoURL} alt="" className="w-full h-full object-cover" />
                ) : (
                  top3[2]?.displayName?.substring(0, 2).toUpperCase() || '3'
                )}
              </div>

              <div className="font-semibold text-xs text-zinc-200 truncate max-w-[180px] mt-1">
                {top3[2]?.displayName} {top3[2]?.isCurrentUser && <span className="text-indigo-400">(You)</span>}
              </div>

              <div className="text-lg font-bold text-zinc-100 font-mono mt-1">
                {top3[2]?.solvedCount} <span className="text-xs font-normal text-zinc-500">/ 305</span>
              </div>

              <div className="flex items-center gap-3 mt-2 text-[11px] font-mono">
                <span className="text-amber-400">
                  {top3[2]?.streak}d streak
                </span>
                <span className="text-rose-400">
                  {top3[2]?.hardCount} Hard
                </span>
              </div>
            </div>
          )}
        </div>
      ) : combinedUsers.length === 0 ? (
        <div className="p-8 rounded-md border border-dashed border-zinc-800 text-center bg-[#18181b]">
          <Trophy className="w-10 h-10 text-zinc-600 mx-auto mb-2" />
          <h3 className="text-sm font-semibold text-zinc-300">No Leaderboard Entries</h3>
          <p className="text-xs text-zinc-500 mt-1 max-w-md mx-auto">
            Solve problems while signed in to claim your rank on the leaderboard.
          </p>
        </div>
      ) : null}

      {/* Control Bar (Filters & Search) */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1 p-1 rounded border border-zinc-800 bg-[#18181b] text-xs font-medium">
          <button
            onClick={() => setSortBy('solved')}
            className={`px-3 py-1 rounded transition-colors cursor-pointer ${
              sortBy === 'solved'
                ? 'bg-zinc-800 text-zinc-100 border border-zinc-700'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Most Solved
          </button>
          <button
            onClick={() => setSortBy('streak')}
            className={`px-3 py-1 rounded transition-colors cursor-pointer ${
              sortBy === 'streak'
                ? 'bg-zinc-800 text-zinc-100 border border-zinc-700'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Highest Streak
          </button>
          <button
            onClick={() => setSortBy('hard')}
            className={`px-3 py-1 rounded transition-colors cursor-pointer ${
              sortBy === 'hard'
                ? 'bg-zinc-800 text-zinc-100 border border-zinc-700'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Hard Solved
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search username..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="pl-8 pr-3 py-1.5 rounded border border-zinc-800 bg-[#18181b] text-zinc-100 placeholder-zinc-500 text-xs focus:outline-none"
          />
        </div>
      </div>

      {/* Rankings Table */}
      <div className="overflow-x-auto rounded-md border border-zinc-800 bg-[#18181b]">
        <table className="w-full border-collapse text-left text-xs font-sans">
          <thead>
            <tr className="bg-[#09090b] text-zinc-400 font-mono font-medium border-b border-zinc-800 text-[11px]">
              <th className="py-2.5 px-3 text-center w-14">RANK</th>
              <th className="py-2.5 px-3">USER</th>
              <th className="py-2.5 px-3 text-center">SOLVED</th>
              <th className="py-2.5 px-3 text-center">STREAK</th>
              <th className="py-2.5 px-3 text-center">BREAKDOWN</th>
              <th className="py-2.5 px-3 text-right">PROFILE</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/80">
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-12 text-center text-zinc-500 text-xs">
                  <p className="font-medium">No live entries match your search</p>
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
                        ? 'bg-zinc-800/50 font-medium' 
                        : 'hover:bg-[#09090b]'
                    }`}
                  >
                    <td className="py-2.5 px-3 text-center font-mono font-semibold text-zinc-300">
                      #{u.rank}
                    </td>

                    <td className="py-2.5 px-3">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded border border-zinc-700 bg-zinc-800 flex items-center justify-center text-[10px] font-bold text-zinc-300 overflow-hidden shrink-0">
                          {u.photoURL ? (
                            <img src={u.photoURL} alt="" className="w-full h-full object-cover" />
                          ) : (
                            u.displayName?.substring(0, 2).toUpperCase() || '?'
                          )}
                        </div>
                        <div className="font-medium text-zinc-200 flex items-center gap-1.5 truncate">
                          <span>{u.displayName}</span>
                          {isCurrent && (
                            <span className="text-[10px] px-1.5 py-0.2 rounded bg-zinc-800 border border-zinc-700 text-indigo-400 font-mono">
                              You
                            </span>
                          )}
                        </div>
                      </div>
                    </td>

                    <td className="py-2.5 px-3 text-center font-mono text-zinc-200">
                      {u.solvedCount || 0} <span className="text-zinc-600 text-[11px]">/ 305</span>
                    </td>

                    <td className="py-2.5 px-3 text-center font-mono text-amber-400">
                      {u.streak || 0}d
                    </td>

                    <td className="py-2.5 px-3 text-center">
                      <div className="inline-flex items-center gap-1.5 font-mono text-[11px] font-medium">
                        <span className="text-emerald-400">
                          E:{u.easyCount || 0}
                        </span>
                        <span className="text-amber-400">
                          M:{u.medCount || 0}
                        </span>
                        <span className="text-rose-400">
                          H:{u.hardCount || 0}
                        </span>
                      </div>
                    </td>

                    <td className="py-2.5 px-3 text-right">
                      <button
                        onClick={() => onOpenProfile(isCurrent ? null : u)}
                        className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer border ${
                          isCurrent
                            ? 'border-indigo-500/40 bg-indigo-600 hover:bg-indigo-500 text-white'
                            : 'border-zinc-700 bg-zinc-800 hover:bg-zinc-700 text-zinc-300'
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
