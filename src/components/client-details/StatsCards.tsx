import MonitorWeightOutlinedIcon from "@mui/icons-material/MonitorWeightOutlined";
import FitnessCenterOutlinedIcon from "@mui/icons-material/FitnessCenterOutlined";
import LocalFireDepartmentOutlinedIcon from "@mui/icons-material/LocalFireDepartmentOutlined";
import TrackChangesOutlinedIcon from "@mui/icons-material/TrackChangesOutlined";

import "./StatsCards.css";

const StatsCards = () => {

    const cards = [

        {
            title: "Avg. Weight",
            value: "84.2 kg",
            change: "▼ 2.8 kg",
            color: "#16A34A",
            icon: <MonitorWeightOutlinedIcon />,
        },

        {
            title: "Workouts Completed",
            value: "24/30",
            change: "80%",
            color: "#7C3AED",
            icon: <FitnessCenterOutlinedIcon />,
        },

        {
            title: "Avg. Calories Burned",
            value: "512 kcal",
            change: "▲ 42 kcal",
            color: "#16A34A",
            icon: (
                <LocalFireDepartmentOutlinedIcon
                    sx={{ color: "#EF4444" }}
                />
            ),
        },

        {
            title: "Consistency",
            value: "83%",
            change: "Excellent",
            color: "#7C3AED",
            icon: <TrackChangesOutlinedIcon />,
            progress: 83,
        },

    ];

    return (

        <div className="stats-grid">

            {cards.map((card) => (

                <div
                    className="stats-card"
                    key={card.title}
                >

                    <div className="stats-left">

                        <div className="stats-icon">

                            {card.icon}

                        </div>

                        <div>

                            <span>

                                {card.title}

                            </span>

                            <h2>

                                {card.value}

                            </h2>

                            <p
                                style={{
                                    color: card.color,
                                }}
                            >

                                {card.change}

                            </p>

                        </div>

                    </div>

                    {card.progress && (

                        <div
                            className="progress-ring"
                            style={{
                                background: `conic-gradient(
                                    #7C3AED ${card.progress * 3.6}deg,
                                    #ECE8FF 0deg
                                )`,
                            }}
                        >

                            <div className="progress-inner">

                                {card.progress}%

                            </div>

                        </div>

                    )}

                </div>

            ))}

        </div>

    );

};

export default StatsCards;