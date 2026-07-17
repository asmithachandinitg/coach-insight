import "./TodaySchedule.css";
import { clients } from "../data/clients";

const TodaySchedule = () => {

    const convertToMinutes = (time: string) => {
        const [timePart, modifier] = time.split(" ");

        let [hours, minutes] = timePart
            .split(":")
            .map(Number);

        if (modifier === "PM" && hours !== 12)
            hours += 12;

        if (modifier === "AM" && hours === 12)
            hours = 0;

        return hours * 60 + minutes;
    };

    const now = new Date();

    const currentMinutes =
        now.getHours() * 60 + now.getMinutes();

    const getTimeDifference = (sessionTime: string) => {

        const sessionMinutes = convertToMinutes(sessionTime);

        const difference = sessionMinutes - currentMinutes;

        if (difference <= 0)
            return "🟢 Live Now";

        if (difference <= 15)
            return "🟢 Starting Soon";

        if (difference < 60)
            return `Starts in ${difference} mins`;

        const hours = Math.floor(difference / 60);
        const minutes = difference % 60;

        if (minutes === 0)
            return `Starts in ${hours} hr`;

        return `Starts in ${hours} hr ${minutes} mins`;

    };

const todayClients = [...clients]
    .filter((client) =>

        convertToMinutes(client.sessionTime) >= currentMinutes

    )
    .sort(
        (a, b) =>
            convertToMinutes(a.sessionTime) -
            convertToMinutes(b.sessionTime)
    );

    return (

        <div className="schedule-card">

            <div className="schedule-header">

                <div>

                    <h2>Today's Schedule</h2>

                    <p>
                        {todayClients.length} Upcoming Sessions
                    </p>

                </div>

            </div>

            <div className="schedule-list">

                {todayClients.length === 0 ? (

                    <div className="empty-state">

                        <div className="empty-icon">
                            🎉
                        </div>

                        <h3>No More Sessions Today</h3>

                        <p>
                            All scheduled sessions have been completed.
                        </p>

                    </div>

                ) : (

                    todayClients.map((client, index) => (

                        <div
                            className="schedule-item"
                            key={client.id}
                        >

                            <div className="schedule-time">

                                <strong>
                                    {client.sessionTime}
                                </strong>

                                {index === 0 ? (

                                    <div className="next-session">

                                        <span className="next-badge">
                                            NEXT
                                        </span>

                                        <small>
                                            {getTimeDifference(
                                                client.sessionTime
                                            )}
                                        </small>

                                    </div>

                                ) : (

                                    <small className="later-session">
                                        {getTimeDifference(
                                            client.sessionTime
                                        )}
                                    </small>

                                )}

                            </div>

                            <div className="schedule-details">

                                <div className="client-avatar">
                                    {client.name.charAt(0)}
                                </div>

                                <div>

                                    <h4>
                                        {client.name}
                                    </h4>

                                    <span>
                                        {client.goal}
                                    </span>

                                    <p>
                                        {client.membership}
                                    </p>

                                </div>

                            </div>

                            <div
    className="status-dot"
    style={{
        backgroundColor:
            client.status.toLowerCase() === "active"
                ? "#22c55e"
                : "#ef4444",
    }}
/>

                        </div>

                    ))

                )}

            </div>

        </div>

    );

};

export default TodaySchedule;