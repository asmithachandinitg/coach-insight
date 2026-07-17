import QuickStats from "../components/insights/QuickStats";
import TopPerformers from "../components/insights/TopPerformers";
import NeedsAttention from "../components/insights/NeedsAttention";
import SmartRecommendations from "../components/insights/SmartRecommendations";
import ClientsNearGoal from "../components/insights/ClientsNearGoal";

const Insights = () => {
  return (
    <div className="analytics">

      <div className="analytics-title">
        <h2>Key Business Insights</h2>
        <p>
          Actionable insights to help trainers improve client performance
        </p>
      </div>

      <QuickStats />

      <div className="analytics-grid">
        <TopPerformers />
        <NeedsAttention />
      </div>

      <div className="analytics-grid">

        <ClientsNearGoal />

        <SmartRecommendations />

      </div>

    </div>
  );
};

export default Insights;