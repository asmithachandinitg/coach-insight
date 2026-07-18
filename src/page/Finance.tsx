import { useEffect, useState } from "react";
import { Skeleton } from "@mui/material";
import FinanceSummary from "../components/finance/FinanceSummary";
import RevenueTrend from "../components/finance/RevenueTrend";
import PaymentStatus from "../components/finance/PaymentStatus";
import MonthlyCollections from "../components/finance/MonthlyCollections";
import InstallmentTracker from "../components/finance/InstallmentTracker";
import RevenueInsights from "../components/finance/RevenueInsights";

const Finance = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 700);
        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return (
            <div className="analytics">
                <div className="analytics-title">
                    <h2>Revenue & Payments</h2>
                    <p>Track collections, installments and pending payments</p>
                </div>
                <Skeleton variant="rounded" height={90} sx={{ mb: 2.5, borderRadius: "16px" }} />
                <div className="analytics-grid">
                    <Skeleton variant="rounded" height={320} sx={{ borderRadius: "16px" }} />
                    <Skeleton variant="rounded" height={320} sx={{ borderRadius: "16px" }} />
                </div>
                <div className="analytics-grid" style={{ marginTop: 20 }}>
                    <Skeleton variant="rounded" height={320} sx={{ borderRadius: "16px" }} />
                    <Skeleton variant="rounded" height={320} sx={{ borderRadius: "16px" }} />
                </div>
                <Skeleton variant="rounded" height={280} sx={{ mt: 2.5, borderRadius: "16px" }} />
            </div>
        );
    }

    return (
        <div className="analytics">

            <div className="analytics-title">
                <h2>Revenue & Payments</h2>

                <p>
                    Track collections, installments and pending payments
                </p>
            </div>

            <FinanceSummary />

            <div className="analytics-grid">
                <RevenueTrend />
                <PaymentStatus />
            </div>

             <div className="analytics-grid">
                <MonthlyCollections />
                <RevenueInsights />
            </div>

            <InstallmentTracker />

        </div>
    );
};

export default Finance;
