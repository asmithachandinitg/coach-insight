import { useNavigate } from "react-router-dom";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import "./QuickActions.css";

interface Props {
    onAddClient: () => void;
}

const QuickActions = ({ onAddClient }: Props) => {
    const navigate = useNavigate();

    const actions = [
        { label: "Add Client", icon: PersonAddAltOutlinedIcon, onClick: onAddClient },
        { label: "View Clients", icon: GroupOutlinedIcon, onClick: () => navigate("/clients") },
        { label: "View Analytics", icon: BarChartOutlinedIcon, onClick: () => navigate("/analytics") },
        { label: "View Revenue & Payments", icon: AccountBalanceWalletOutlinedIcon, onClick: () => navigate("/finance") },
    ];

    return (
        <div className="quick-actions-card">
            <h3>Quick Actions</h3>
            <div className="quick-actions-grid">
                {actions.map((action) => {
                    const Icon = action.icon;
                    return (
                        <button
                            key={action.label}
                            className="quick-action-btn"
                            onClick={action.onClick}
                            aria-label={action.label}
                        >
                            <Icon fontSize="small" />
                            <span>{action.label}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default QuickActions;
