import { useState } from "react";
import type { Client } from "../../data/clients";
import "./ClientHeader.css";

interface Props {
    client: Client;
}

const ClientHeader = ({ client }: Props) => {

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    const months = [];

    for (let year = 2024; year <= currentYear; year++) {
        const endMonth = year === currentYear ? currentMonth : 11;
        for (let month = 0; month <= endMonth; month++) {
            months.push({
                value: `${year}-${month + 1}`,
                label: new Date(year, month).toLocaleString("default", {
                    month: "long",
                    year: "numeric",
                }),
            });
        }
    }

    const [selectedMonth, setSelectedMonth] = useState(
        `${currentYear}-${currentMonth + 1}`
    );

    return (
        <div className="client-header">
            <div className="client-left">
                <div className="client-avatar">{client.name.charAt(0)}</div>
                <div>
                    <h1>{client.name}</h1>
                    <p>
                        {client.membership}
                        {" • "}
                        {client.goal}
                    </p>
                </div>
            </div>

            <div className="client-right">
                <select
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                >
                    {months.map((month) => (
                        <option key={month.value} value={month.value}>
                            {month.label}
                        </option>
                    ))}
                </select>

                <button>+ Add Daily Entry</button>
            </div>
        </div>
    );
};

export default ClientHeader;