import { clients } from "../../data/clients";
import "./GoalAchievement.css";

const GoalAchievement = () => {

    const goals = ["Weight Loss", "Muscle Gain", "Fitness", "Competition"];

    const goalData = goals.map((goal) => {

        const goalClients = clients.filter(
            (client) => client.goal === goal
        );

        const averageProgress =
            goalClients.length > 0
                ? Math.round(
                    goalClients.reduce(
                        (sum, client) => sum + client.progress,
                        0
                    ) / goalClients.length
                )
                : 0;

        return {
            goal,
            progress: averageProgress,
        };
    });

    return (
        <div className="analytics-card">

            <div className="card-header">
                <h3>Goal Achievement</h3>
                <span>Average progress by fitness goal</span>
            </div>

            <div className="goal-list">

                {goalData.map((item) => (

                    <div
                        key={item.goal}
                        className="goal-row"
                    >

                        <div
                            className="goal-header"
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                width: "100%",
                            }}
                        >
                            <span>{item.goal}</span>
                            <span>{item.progress}%</span>
                        </div>

                        <div className="goal-track">

                            <div
                                className="goal-fill"
                                style={{
                                    width: `${item.progress}%`,
                                }}
                            />

                        </div>

                    </div>

                ))}

            </div>

        </div>
    );
};

export default GoalAchievement;