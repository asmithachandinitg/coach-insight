import FinanceSummary from "../components/finance/FinanceSummary";
import RevenueTrend from "../components/finance/RevenueTrend";
import PaymentStatus from "../components/finance/PaymentStatus";
import MonthlyCollections from "../components/finance/MonthlyCollections";
import InstallmentTracker from "../components/finance/InstallmentTracker";
import RevenueInsights from "../components/finance/RevenueInsights";

const Finance = () => {
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