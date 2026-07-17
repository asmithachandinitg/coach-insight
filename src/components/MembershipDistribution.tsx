import PieChart from "../charts/PieChart";
import { clients } from "../data/clients";

const MembershipDistribution = () => {

    const data = [

        {
            label: "General Membership",
            value: clients.filter(
                client =>
                    client.membership ===
                    "General Membership"
            ).length,
        },

        {
            label: "Personal Training",
            value: clients.filter(
                client =>
                    client.membership ===
                    "Personal Training"
            ).length,
        },

        {
            label: "Body Building",
            value: clients.filter(
                client =>
                    client.membership ===
                    "Body Building"
            ).length,
        },

    ];

    return (

        <PieChart

            title="Membership Distribution"

            subtitle="Client Membership Overview"

            data={data}

        />

    );

};

export default MembershipDistribution;