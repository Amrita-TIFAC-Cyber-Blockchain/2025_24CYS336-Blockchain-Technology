import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integration/supabase/client';
import { Trophy, Lock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  points: number;
}

export const AchievementsBadges = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [unlockedIds, setUnlockedIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPoints, setTotalPoints] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    checkAchievements();
    const interval = setInterval(checkAchievements, 30000); // Check every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const checkAchievements = async () => {
    try {
      // Check for new achievements
      const { data: checkData, error: checkError } = await supabase.functions.invoke('check-achievements');
      
      if (checkError) throw checkError;

      // Fetch all achievements
      const { data: allAchievements, error: achievementsError } = await supabase
        .from('achievements')
        .select('*')
        .order('category');

      if (achievementsError) throw achievementsError;

      // Map database fields to component interface
      const mappedAchievements = (allAchievements || []).map(a => ({
        id: a.id,
        name: a.name,
        description: a.description,
        icon: a.icon,
        category: a.category,
        points: a.reward_points
      }));

      setAchievements(mappedAchievements);
      setUnlockedIds(checkData.allUnlocked || []);
      setTotalPoints(checkData.totalPoints || 0);

      // Show toast for new achievements
      if (checkData.newAchievements && checkData.newAchievements.length > 0) {
        checkData.newAchievements.forEach((achievement: Achievement) => {
          toast({
            title: '🎉 Achievement Unlocked!',
            description: `${achievement.icon} ${achievement.name} - ${achievement.points} points`,
          });
        });
      }
    } catch (error) {
      console.error('Failed to check achievements:', error);
    } finally {
      setLoading(false);
    }
  };

  const groupedAchievements = achievements.reduce((acc, achievement) => {
    if (!acc[achievement.category]) {
      acc[achievement.category] = [];
    }
    acc[achievement.category].push(achievement);
    return acc;
  }, {} as Record<string, Achievement[]>);

  const isUnlocked = (achievementId: string) => unlockedIds.includes(achievementId);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-primary" />
            Achievements
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
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-primary" />
              Achievements
            </CardTitle>
            <CardDescription>
              {unlockedIds.length} of {achievements.length} unlocked
            </CardDescription>
          </div>
          <Badge variant="secondary" className="text-lg px-4 py-2">
            <Trophy className="h-4 w-4 mr-1" />
            {totalPoints} points
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {Object.entries(groupedAchievements).map(([category, categoryAchievements]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold text-muted-foreground uppercase mb-3 flex items-center gap-2">
                {category}
                <Badge variant="outline" className="text-xs">
                  {categoryAchievements.filter(a => isUnlocked(a.id)).length}/{categoryAchievements.length}
                </Badge>
              </h3>
              <div className="grid gap-3 md:grid-cols-2">
                {categoryAchievements.map((achievement) => {
                  const unlocked = isUnlocked(achievement.id);
                  return (
                    <div
                      key={achievement.id}
                      className={`flex items-start gap-3 p-4 rounded-lg border transition-all ${
                        unlocked
                          ? 'border-primary/20 bg-gradient-to-r from-primary/5 to-transparent'
                          : 'border-border opacity-50'
                      }`}
                    >
                      <div className="text-3xl">{unlocked ? achievement.icon : <Lock className="h-6 w-6 text-muted-foreground" />}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-semibold text-sm">{achievement.name}</p>
                          {unlocked && (
                            <Badge variant="secondary" className="text-xs">
                              +{achievement.points}
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">{achievement.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};