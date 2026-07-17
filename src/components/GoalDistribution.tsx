import PieChart from "../charts/PieChart";
import { clients } from "../data/clients";

const GoalDistribution = () => {

    const data = [

        {
            label: "Weight Loss",
            value: clients.filter(
                client =>
                    client.goal ===
                    "Weight Loss"
            ).length,
        },

        {
            label: "Muscle Gain",
            value: clients.filter(
                client =>
                    client.goal ===
                    "Muscle Gain"
            ).length,
        },

        {
            label: "Fitness",
            value: clients.filter(
                client =>
                    client.goal ===
                    "Fitness"
            ).length,
        },

        {
            label: "Competition",
            value: clients.filter(
                client =>
                    client.goal ===
                    "Competition"
            ).length,
        },

    ];

    return (

        <PieChart

            title="Goal Distribution"

            subtitle="Fitness Goals"

            data={data}

        />

    );

};

export default GoalDistribution;