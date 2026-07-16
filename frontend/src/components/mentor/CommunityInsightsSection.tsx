import { motion } from "framer-motion";
import { Activity, MessageSquareText, TrendingUp, Users2, Zap } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { COMMUNITY_INSIGHTS } from "@/data/mentorMockData";

export function CommunityInsightsSection() {
  const maxValue = Math.max(...COMMUNITY_INSIGHTS.weeklyEngagement.map((d) => d.value), 1);

  return (
    <Card id="community-insights">
      <CardHeader className="flex-row items-center justify-between">
        <div>
          <CardTitle className="text-lg">Community Insights</CardTitle>
          <CardDescription>Your weekly engagement at a glance</CardDescription>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Activity className="h-5 w-5" />
        </div>
      </CardHeader>

      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="glass flex flex-col gap-1 rounded-2xl p-4">
          <span className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
            <MessageSquareText className="h-3.5 w-3.5" />
            Questions Asked
          </span>
          <span className="text-lg font-extrabold text-foreground">{COMMUNITY_INSIGHTS.questionsAsked}</span>
        </div>
        <div className="glass flex flex-col gap-1 rounded-2xl p-4">
          <span className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
            <Users2 className="h-3.5 w-3.5" />
            Discussions Started
          </span>
          <span className="text-lg font-extrabold text-foreground">{COMMUNITY_INSIGHTS.discussionsStarted}</span>
        </div>
        <div className="glass flex flex-col gap-1 rounded-2xl p-4">
          <span className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
            <TrendingUp className="h-3.5 w-3.5" />
            Community Growth
          </span>
          <span className="text-lg font-extrabold text-success">{COMMUNITY_INSIGHTS.communityGrowth}</span>
        </div>
        <div className="glass flex flex-col gap-1 rounded-2xl p-4">
          <span className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
            <Zap className="h-3.5 w-3.5" />
            Response Rate
          </span>
          <span className="text-lg font-extrabold text-foreground">{COMMUNITY_INSIGHTS.responseRate}</span>
        </div>
      </div>

      <div>
        <p className="mb-3 text-xs font-semibold text-muted-foreground">Weekly engagement</p>
        <div className="flex items-end justify-between gap-2">
          {COMMUNITY_INSIGHTS.weeklyEngagement.map((d, idx) => (
            <div key={d.day} className="flex flex-1 flex-col items-center gap-1.5">
              <div className="flex h-20 w-full items-end overflow-hidden rounded-md bg-muted">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(d.value / maxValue) * 100}%` }}
                  transition={{ delay: idx * 0.05, duration: 0.5, ease: "easeOut" }}
                  className="w-full gradient-brand"
                />
              </div>
              <span className="text-[10px] font-medium text-muted-foreground">{d.day}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
