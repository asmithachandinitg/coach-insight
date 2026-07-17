import { useMemo, useState } from "react";
import "./InstallmentTracker.css";

interface Payment {
    id: number;
    name: string;
    membership: string;
    totalFee: number;
    paid: number;
}

const payments: Payment[] = [
    {
        id: 1,
        name: "Rahul Sharma",
        membership: "Personal Training",
        totalFee: 7000,
        paid: 3500,
    },
    {
        id: 2,
        name: "Priya Singh",
        membership: "Body Building",
        totalFee: 5000,
        paid: 5000,
    },
    {
        id: 3,
        name: "Arjun Kumar",
        membership: "Personal Training",
        totalFee: 7000,
        paid: 0,
    },
    {
        id: 4,
        name: "Neha Patel",
        membership: "Body Building",
        totalFee: 5000,
        paid: 2500,
    },
    {
        id: 5,
        name: "Karan Verma",
        membership: "Personal Training",
        totalFee: 7000,
        paid: 7000,
    },
];

const InstallmentTracker = () => {

    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("All");

    const filteredPayments = useMemo(() => {

        return payments.filter((client) => {

            const balance = client.totalFee - client.paid;

            let status = "Paid";

            if (client.paid === 0) {
                status = "Due";
            } else if (balance > 0) {
                status = "Installment";
            }

            const matchesSearch = client.name
                .toLowerCase()
                .includes(search.toLowerCase());

            const matchesFilter =
                filter === "All" || filter === status;

            return matchesSearch && matchesFilter;

        });

    }, [search, filter]);

    return (

        <div className="finance-card">

            <div className="finance-card-header">

                <h3>Installment Tracker</h3>

                <p>Track client payments and pending balances</p>

            </div>

            <div className="finance-toolbar">

                <input
                    type="text"
                    placeholder="Search client..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                >
                    <option>All</option>
                    <option>Paid</option>
                    <option>Installment</option>
                    <option>Due</option>
                </select>

            </div>

            <table className="finance-table">

                <thead>

                    <tr>
                        <th>Client</th>
                        <th>Membership</th>
                        <th>Total Fee</th>
                        <th>Paid</th>
                        <th>Balance</th>
                        <th>Installment</th>
                        <th>Status</th>
                        <th></th>
                    </tr>

                </thead>

                <tbody>

                    {filteredPayments.map((client) => {

                        const balance =
                            client.totalFee - client.paid;

                        let status = "Paid";
                        let badge = "paid";

                        if (client.paid === 0) {
                            status = "Due";
                            badge = "due";
                        } else if (balance > 0) {
                            status = "Installment";
                            badge = "installment";
                        }

                        let installment = "Complete";

                        if (client.paid === 0) {
                            installment = "0 / 2";
                        } else if (balance > 0) {
                            installment = "1 / 2";
                        }

                        return (

                            <tr key={client.id}>

                                <td>{client.name}</td>

                                <td>{client.membership}</td>

                                <td>₹{client.totalFee}</td>

                                <td>₹{client.paid}</td>

                                <td>₹{balance}</td>

                                <td>{installment}</td>

                                <td>

                                    <span
                                        className={`payment-badge ${badge}`}
                                    >
                                        {status}
                                    </span>

                                </td>

                                <td>

                                    <button className="finance-btn">
                                        View
                                    </button>

                                </td>

                            </tr>

                        );

                    })}

                </tbody>

            </table>

        </div>

    );

};

export default InstallmentTracker;