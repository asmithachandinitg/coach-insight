import { clients } from "../../data/clients";
import "./TopPerformers.css";

const TopPerformers = () => {

    const topClients = [...clients]
        .sort((a, b) => b.progress - a.progress)
        .slice(0, 5);

    const medals = ["🥇", "🥈", "🥉", "4️⃣", "5️⃣"];

    return (
        <div className="insight-section">

            <div className="insight-header">
                <h3>🏆 Top Performers</h3>
                <p>Highest client progress</p>
            </div>

            <div className="performer-list">

                {topClients.map((client, index) => (

                    <div
                        key={client.id}
                        className="performer-row"
                    >

                        <div className="performer-left">

                            <span className="performer-rank">
                                {medals[index]}
                            </span>

                            <div>

                                <h4>{client.name}</h4>

                                <span>{client.goal}</span>

                            </div>

                        </div>

                        <div className="performer-progress">

                            <span>{client.progress}%</span>

                        </div>

                    </div>

                ))}

            </div>

        </div>
    );
};

export default TopPerformers;