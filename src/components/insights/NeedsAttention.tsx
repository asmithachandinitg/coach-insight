import { clients } from "../../data/clients";
import "./NeedsAttention.css";

const NeedsAttention = () => {

    const lowProgressClients = [...clients]
        .sort((a, b) => a.progress - b.progress)
        .slice(0, 5);

    return (
        <div className="insight-section">

            <div className="insight-header">
                <h3>⚠️ Needs Attention</h3>
                <p>Clients with the lowest progress</p>
            </div>

            <div className="attention-list">

                {lowProgressClients.map((client) => (

                    <div
                        key={client.id}
                        className="attention-row"
                    >

                        <div>

                            <h4>{client.name}</h4>

                            <span>{client.goal}</span>

                        </div>

                        <div className="attention-right">

                            <span className="attention-progress">
                                {client.progress}%
                            </span>

                            <div className="attention-bar">

                                <div
                                    className="attention-fill"
                                    style={{
                                        width: `${client.progress}%`,
                                    }}
                                />

                            </div>

                        </div>

                    </div>

                ))}

            </div>

        </div>
    );
};

export default NeedsAttention;