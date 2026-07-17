import "./KpiCard.css";

interface KpiCardProps {
    title: string;
    value: string | number;
    subtitle?: string;
    icon: string;
    color: string;
}

const KpiCard = ({
    title,
    value,
    subtitle,
    icon,
    color,
}: KpiCardProps) => {
    return (
        <div
            className="kpi-card"
            style={{
                borderTop: `5px solid ${color}`,
            }}
        >
            <div className="kpi-header">

                <div
                    className="kpi-icon"
                    style={{
                        background: `${color}20`,
                        color: color,
                    }}
                >
                    {icon}
                </div>

            </div>

            <h2>{value}</h2>

            <h4>{title}</h4>

            {subtitle && (
                <p>{subtitle}</p>
            )}
        </div>
    );
};

export default KpiCard;