import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integration/supabase/client';
import { Trophy, TrendingUp, Zap, Leaf, Medal, Crown } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface LeaderboardEntry {
  rank: number;
  userId: string;
  displayName: string;
  walletAddress: string;
  totalEnergyTraded: number;
  totalRevenue: number;
  carbonOffset: number;
  efficiencyScore: number;
  tradingStreak: number;
  achievements: string[];
  compositeScore: number;
}

export const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalProsumers, setTotalProsumers] = useState(0);

  useEffect(() => {
    fetchLeaderboard();
    const interval = setInterval(fetchLeaderboard, 60000); // Refresh every minute
    return () => clearInterval(interval);
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('calculate-leaderboard');
      if (error) throw error;
      
      setLeaderboard(data.leaderboard);
      setTotalProsumers(data.totalProsumers);
    } catch (error) {
      console.error('Failed to fetch leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="h-5 w-5 text-yellow-500" />;
      case 2: return <Medal className="h-5 w-5 text-gray-400" />;
      case 3: return <Medal className="h-5 w-5 text-amber-600" />;
      default: return <span className="text-sm font-semibold text-muted-foreground">#{rank}</span>;
    }
  };

  const getRankBadge = (rank: number) => {
    if (rank === 1) return <Badge className="bg-gradient-to-r from-yellow-500 to-amber-500">Champion</Badge>;
    if (rank <= 3) return <Badge variant="secondary">Top 3</Badge>;
    if (rank <= 10) return <Badge variant="outline">Top 10</Badge>;
    return null;
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-primary" />
            Prosumer Leaderboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center p-8">
            <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-primary" />
          Prosumer Leaderboard
        </CardTitle>
        <CardDescription>
          Top performers across the energy trading network ({totalProsumers} total prosumers)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {leaderboard.map((entry) => (
            <div
              key={entry.userId}
              className={`flex items-center gap-4 p-4 rounded-lg border transition-all ${
                entry.rank <= 3 
                  ? 'border-primary/20 bg-gradient-to-r from-primary/5 to-transparent' 
                  : 'border-border hover:border-primary/30'
              }`}
            >
              <div className="flex items-center justify-center w-12 h-12">
                {getRankIcon(entry.rank)}
              </div>

              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                  {entry.displayName.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-semibold truncate">{entry.displayName}</p>
                  {getRankBadge(entry.rank)}
                </div>
                <p className="text-xs text-muted-foreground truncate">
                  {entry.walletAddress.substring(0, 10)}...{entry.walletAddress.slice(-8)}
                </p>
              </div>

              <div className="hidden md:flex items-center gap-6 text-sm">
                <div className="text-center">
                  <div className="flex items-center gap-1 text-muted-foreground mb-1">
                    <Zap className="h-3 w-3" />
                    <span className="text-xs">Energy</span>
                  </div>
                  <p className="font-semibold">{entry.totalEnergyTraded.toFixed(0)} kWh</p>
                </div>

                <div className="text-center">
                  <div className="flex items-center gap-1 text-muted-foreground mb-1">
                    <Leaf className="h-3 w-3" />
                    <span className="text-xs">Carbon</span>
                  </div>
                  <p className="font-semibold text-green-600">{entry.carbonOffset.toFixed(0)} kg</p>
                </div>

                <div className="text-center">
                  <div className="flex items-center gap-1 text-muted-foreground mb-1">
                    <TrendingUp className="h-3 w-3" />
                    <span className="text-xs">Revenue</span>
                  </div>
                  <p className="font-semibold">${entry.totalRevenue.toFixed(0)}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Trophy className="h-3 w-3" />
                  {entry.achievements.length}
                </Badge>
                {entry.tradingStreak > 0 && (
                  <Badge variant="outline" className="flex items-center gap-1">
                    🔥 {entry.tradingStreak}d
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};