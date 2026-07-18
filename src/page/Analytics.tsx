import { useEffect, useState } from "react";
import { Skeleton } from "@mui/material";
import ClientGrowth from "../components/analytics/ClientGrowth";
import RevenueTrend from "../components/analytics/RevenueTrend";
import WorkoutDistribution from "../components/analytics/WorkoutDistribution";
import AttendanceChart from "../components/AttendanceChart";
import LastWeekAttendance from "../components/LastWeekAttendance";
import GoalAchievement from "../components/analytics/GoalAchievement";
import MembershipAnalytics from "../components/analytics/MembershipAnalytics";
import "./Analytics.css";

const Analytics = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="analytics">
        <div className="analytics-title">
          <h2>Analytics</h2>
          <p>Business trends and performance insights</p>
        </div>
        <div className="analytics-grid">
          <Skeleton variant="rounded" height={320} sx={{ borderRadius: "16px" }} />
          <Skeleton variant="rounded" height={320} sx={{ borderRadius: "16px" }} />
        </div>
        <div className="analytics-grid analytics-grid--three" style={{ marginTop: 20 }}>
          <Skeleton variant="rounded" height={320} sx={{ borderRadius: "16px" }} />
          <Skeleton variant="rounded" height={320} sx={{ borderRadius: "16px" }} />
          <Skeleton variant="rounded" height={320} sx={{ borderRadius: "16px" }} />
        </div>
        <div className="analytics-grid" style={{ marginTop: 20 }}>
          <Skeleton variant="rounded" height={320} sx={{ borderRadius: "16px" }} />
          <Skeleton variant="rounded" height={320} sx={{ borderRadius: "16px" }} />
        </div>
      </div>
    );
  }

  return (
   <div className="analytics">

    <div className="analytics-title">

        <h2>Analytics</h2>

        <p>
            Business trends and performance insights
        </p>

    </div>

    <div className="analytics-grid">

        <ClientGrowth />

        <RevenueTrend />

    </div>

    <div className="analytics-grid analytics-grid--three">

        <WorkoutDistribution />

        <AttendanceChart />

                <LastWeekAttendance />

    </div>

    <div className="analytics-grid">

        <GoalAchievement />

        <MembershipAnalytics />

    </div>

</div>
  );
};

export default Analytics;
