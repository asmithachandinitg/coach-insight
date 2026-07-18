import { Inbox } from "@mui/icons-material";
import type { SvgIconComponent } from "@mui/icons-material";
import "./EmptyState.css";

interface Props {
    icon?: SvgIconComponent;
    title: string;
    message?: string;
    action?: { label: string; onClick: () => void };
}

const EmptyState = ({ icon: Icon = Inbox, title, message, action }: Props) => {
    return (
        <div className="empty-state">
            <div className="empty-state-icon">
                <Icon fontSize="inherit" />
            </div>
            <h4>{title}</h4>
            {message && <p>{message}</p>}
            {action && (
                <button className="empty-state-action" onClick={action.onClick}>
                    {action.label}
                </button>
            )}
        </div>
    );
};

export default EmptyState;
