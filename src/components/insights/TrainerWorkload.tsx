import { clients } from "../../data/clients";
import "./TrainerWorkload.css";

const TrainerWorkload = () => {

    const workload = Object.entries(
        clients.reduce((acc, client) => {
            acc[client.trainer] = (acc[client.trainer] || 0) + 1;
            return acc;
        }, {} as Record<string, number>)
    )
        .map(([trainer, count]) => ({
            trainer,
            count,
        }))
        .sort((a, b) => b.count - a.count);

    const maxCount = Math.max(...workload.map(item => item.count));

    return (
        <div className="insight-section">

            <div className="insight-header">
                <h3>👨‍🏫 Trainer Workload</h3>
                <p>Clients assigned to each trainer</p>
            </div>

            <div className="workload-list">

                {workload.map((item) => (

                    <div
                        key={item.trainer}
                        className="workload-row"
                    >

                        <div className="workload-header">

                            <span>{item.trainer}</span>

                            <span>{item.count} Clients</span>

                        </div>

                        <div className="workload-track">

                            <div
                                className="workload-fill"
                                style={{
                                    width: `${(item.count / maxCount) * 100}%`,
                                }}
                            />

                        </div>

                    </div>

                ))}

            </div>

        </div>
    );
};

export default TrainerWorkload;