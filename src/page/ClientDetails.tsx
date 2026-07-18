import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { clients } from "../data/clients";

import ClientHeader from "../components/client-details/ClientHeader";
import StatsCards from "../components/client-details/StatsCards";
import WeightProgress from "../components/client-details/WeightProgress";
import GoalProgress from "../components/client-details/GoalProgress";
import CalendarView from "../components/client-details/CalendarView";
import TableView from "../components/client-details/TableView";
import MonthlySummary from "../components/client-details/MonthlySummary";
import DailyLogModal from "../components/DailyLogModal";

import "./ClientDetails.css";

const ClientDetails = () => {

    const { id } = useParams();
const navigate = useNavigate();
    const client = clients.find(
        c => c.id === Number(id)
    );

    const [activeTab, setActiveTab] =
        useState("overview");

    const [openModal, setOpenModal] =
        useState(false);

    const [mode] =
        useState<"add" | "edit">("add");

    const [selectedLog] =
        useState<any>(null);

    if (!client) {

        return <h2>Client not found</h2>;

    }

    return (

        <div className="client-details">

 <button
        className="back-btn"
        onClick={() => navigate(-1)}
    >
        ← Back to Clients
    </button>
    
            <ClientHeader client={client} />

            <div className="log-tabs">

                <button
                    className={
                        activeTab === "overview"
                            ? "active"
                            : ""
                    }
                    onClick={() =>
                        setActiveTab("overview")
                    }
                >
                    Overview
                </button>

                <button
                    className={
                        activeTab === "calendar"
                            ? "active"
                            : ""
                    }
                    onClick={() =>
                        setActiveTab("calendar")
                    }
                >
                    Calendar
                </button>

                <button
                    className={
                        activeTab === "table"
                            ? "active"
                            : ""
                    }
                    onClick={() =>
                        setActiveTab("table")
                    }
                >
                    Daily Logs
                </button>

                <button
                    className={
                        activeTab === "summary"
                            ? "active"
                            : ""
                    }
                    onClick={() =>
                        setActiveTab("summary")
                    }
                >
                    Monthly Summary
                </button>

            </div>


            {activeTab === "overview" && (

                <>

                    <StatsCards />

                    <div className="chart-grid">

                        <WeightProgress
                            currentWeight={client.currentWeight}
                            targetWeight={client.targetWeight}
                        />

                        <GoalProgress
                            startWeight={
                                client.currentWeight + 8
                            }
                            currentWeight={
                                client.currentWeight
                            }
                            targetWeight={
                                client.targetWeight
                            }
                        />

                    </div>

                </>

            )}

            {activeTab === "calendar" && (

                <CalendarView />

            )}

            {activeTab === "table" && (

                <TableView />

            )}

            {activeTab === "summary" && (

                <MonthlySummary />

            )}


            <DailyLogModal

                open={openModal}

                mode={mode}

                log={selectedLog}

                onClose={() => setOpenModal(false)}

                onSave={(log) => {

                    console.log(log);

                    setOpenModal(false);

                }}

            />
        </div>

    );

};

export default ClientDetails;