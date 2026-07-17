import { useState } from "react";
import "./Dashboard.css";
import AddClientModal from "../modal/AddClientModal";
import KpiCard from "../components/KpiCard";
import { clients } from "../data/clients";
import TodaySchedule from "../components/TodaySchedule";

const Dashboard = () => {

    const [openModal, setOpenModal] = useState(false);

    const activeClients = clients.filter(
        (client) => client.status === "Active"
    ).length;
    const totalClients = clients.length;

    const todaysSessions = clients.filter(
        (client) => client.status === "Active"
    ).length;

    const monthlyRevenue = clients.reduce((total, client) => {
        switch (client.membership) {
            case "General Membership":
                return total + 1500;

            case "Personal Training":
                return total + 7000;

            case "Body Building":
                return total + 8500;

            default:
                return total + 1500;
        }
    }, 0);

    const goalCompletion = Math.round(
        clients.reduce(
            (sum, client) => sum + client.progress,
            0
        ) / clients.length
    );

    return (
        <>

            <div className="dashboard">

                <div className="dashboard-title">

                    <h2>Dashboard</h2>

                    <button
                        className="add-client-btn"
                        onClick={() => setOpenModal(true)}
                    >
                        + Register Client
                    </button>

                </div>

            </div>

            <AddClientModal
                open={openModal}
                onClose={() => setOpenModal(false)}
            />

            <div className="dashboard-cards">

                <KpiCard
                    title="Active Clients"
                    value={activeClients}
                    subtitle={`${totalClients} enrolled`}
                    icon="👥"
                    color="#8B5CF6"
                />

                <KpiCard
                    title="Today's Sessions"
                    value={todaysSessions}
                    subtitle="Scheduled today"
                    icon="📅"
                    color="#10B981"
                />

                <KpiCard
                    title="Monthly Revenue"
                    value={`₹${monthlyRevenue}`}
                    subtitle="Current month"
                    icon="💰"
                    color="#F59E0B"
                />

                <KpiCard
                    title="Goal Completion"
                    value={`${goalCompletion}%`}
                    subtitle="Average Progress"
                    icon="🎯"
                    color="#EC4899"
                />

            </div>

            <div className="dashboard-grid">

                <TodaySchedule />

                {/* <WeightProgress /> */}

            </div>

            <div className="dashboard-grid">

                {/* <MembershipDistribution />

                <GoalDistribution /> */}

            </div>
        </>
    );
};

export default Dashboard;