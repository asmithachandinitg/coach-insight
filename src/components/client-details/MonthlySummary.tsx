import { dailyLogs } from "../../data/dailyLogs";
import GoalProgress from "./GoalProgress";
import "./MonthlySummary.css";

const MonthlySummary = () => {

    const today = new Date();

    const currentMonth =
        today.toLocaleString(
            "default",
            {
                month: "long",
            }
        );

    const currentYear =
        today.getFullYear();

    const totalWorkouts =
        dailyLogs.filter(
            x =>
                x.status ===
                "completed"
        ).length;

    const totalCalories =
        dailyLogs.reduce(
            (sum, x) =>
                sum +
                x.calories,
            0
        );

    const averageWeight =
        (
            dailyLogs.reduce(
                (sum, x) =>
                    sum +
                    x.weight,
                0
            ) /
            dailyLogs.length
        ).toFixed(1);

    const weightLost =
        (
            dailyLogs[0].weight -

            dailyLogs[
                dailyLogs.length -
                    1
            ].weight
        ).toFixed(1);

    const bestDay =
        dailyLogs.reduce(
            (prev, curr) =>
                curr.calories >
                prev.calories
                    ? curr
                    : prev
        );

    return (

        <div className="summary-page">

            <div className="summary-header">

                <h2>

                    Monthly Summary

                </h2>

                <span>

                    {currentMonth}{" "}
                    {currentYear}

                </span>

            </div>

            <div className="summary-top">

                <div className="summary-card">

                    <span>

                        Total Workouts

                    </span>

                    <h2>

                        {totalWorkouts}

                    </h2>

                    <p>

                        of{" "}
                        {
                            dailyLogs.length
                        }{" "}
                        days

                    </p>

                </div>

                <div className="summary-card">

                    <span>

                        Total Calories

                    </span>

                    <h2>

                        {totalCalories.toLocaleString()}

                    </h2>

                    <p>

                        kcal

                    </p>

                </div>

                <div className="summary-card">

                    <span>

                        Avg. Weight

                    </span>

                    <h2>

                        {
                            averageWeight
                        }{" "}
                        kg

                    </h2>

                    <p className="green">

                        ▼{" "}
                        {
                            weightLost
                        }{" "}
                        kg

                    </p>

                </div>

                <div className="summary-card">

                    <span>

                        Best Day

                    </span>

                    <h2>

                        {new Date(
                            bestDay.date
                        ).toLocaleDateString(
                            "en-US",
                            {
                                month: "short",
                                day: "numeric",
                            }
                        )}

                    </h2>

                    <p>

                        {
                            bestDay.calories
                        }{" "}
                        kcal

                    </p>

                </div>

            </div>
                        <div className="summary-middle">

                {/* <div className="summary-large-card">

                    <h3>

                        Weight Trend

                    </h3>

                    <div className="weight-info">

                        <h2>

                            {weightLost} kg lost

                        </h2>

                        <p>

                            from {dailyLogs[0].weight} kg to{" "}
                            {
                                dailyLogs[
                                    dailyLogs.length - 1
                                ].weight
                            }{" "}
                            kg

                        </p>

                    </div>

                    <WeightProgress
                        currentWeight={
                            dailyLogs[
                                dailyLogs.length - 1
                            ].weight
                        }
                        targetWeight={80}
                    />

                </div> */}

                <div className="summary-large-card">

                    <h3>

                        Workout Consistency

                    </h3>

                    <GoalProgress
                        startWeight={
                            dailyLogs[0].weight
                        }
                        currentWeight={
                            dailyLogs[
                                dailyLogs.length - 1
                            ].weight
                        }
                        targetWeight={80}
                    />

                    <p className="consistency-text">

                        {totalWorkouts}/
                        {dailyLogs.length} days

                    </p>

                </div>

                <div className="summary-large-card">

                    <h3>

                        Top Workout Type

                    </h3>

                    <div className="workout-box">

                        <h2>

                            Strength Training

                        </h2>

                        <p>

                            16 Sessions

                        </p>

                        <div className="workout-icon">

                            🏋️

                        </div>

                    </div>

                </div>

            </div>

            <div className="achievement-card">

                <h3>

                    Achievements

                </h3>

                <div className="achievement-grid">

                    <div className="achievement-item">

                        <div className="emoji">

                            🏆

                        </div>

                        <div>

                            <h4>

                                20 Workouts

                            </h4>

                            <p>

                                Great job!

                            </p>

                        </div>

                    </div>

                    <div className="achievement-item">

                        <div className="emoji">

                            ⭐

                        </div>

                        <div>

                            <h4>

                                7 Days Streak

                            </h4>

                            <p>

                                Keep it up!

                            </p>

                        </div>

                    </div>

                    <div className="achievement-item">

                        <div className="emoji">

                            🌅

                        </div>

                        <div>

                            <h4>

                                Early Bird

                            </h4>

                            <p>

                                Morning Person

                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

};

export default MonthlySummary;