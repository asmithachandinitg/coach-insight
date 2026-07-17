import ClientGrowth from "../components/analytics/ClientGrowth";
import RevenueTrend from "../components/analytics/RevenueTrend";
import WorkoutDistribution from "../components/analytics/WorkoutDistribution";
import AttendanceChart from "../components/AttendanceChart";
import LastWeekAttendance from "../components/LastWeekAttendance";
import GoalAchievement from "../components/analytics/GoalAchievement";
import MembershipAnalytics from "../components/analytics/MembershipAnalytics";
import "./Analytics.css";

const Analytics = () => {
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