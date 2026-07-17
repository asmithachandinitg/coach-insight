import { clients } from "../../data/clients";
import "./ClientsNearGoal.css";

const ClientsNearGoal = () => {

    const topClients = [...clients]
        .sort((a, b) => {
            const aRemaining = a.currentWeight - a.targetWeight;
            const bRemaining = b.currentWeight - b.targetWeight;
            return aRemaining - bRemaining;
        })
        .slice(0, 5);

    return (
        <div className="insight-section">

            <div className="insight-header">
                <h3>🎯 Clients Near Goal</h3>
                <p>Clients closest to reaching their target weight</p>
            </div>

            <div className="near-goal-list">

                {topClients.map((client) => {

                    const remaining =
                        client.currentWeight - client.targetWeight;

                    return (

                        <div
                            key={client.id}
                            className="near-goal-row"
                        >

                            <div className="near-goal-left">

                                <div className="near-goal-avatar">
                                    {client.name.charAt(0)}
                                </div>

                                <div>

                                    <h4>{client.name}</h4>

                                    <span>{client.goal}</span>

                                </div>

                            </div>

                            <div className="near-goal-right">

                                <div className="goal-progress">
                                    {client.progress}%
                                </div>

                                <span>
                                    {remaining} kg left
                                </span>

                            </div>

                        </div>

                    );

                })}

            </div>

        </div>
    );
};

export default ClientsNearGoal;