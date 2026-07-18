import { useMemo, useState } from "react";
import {
    Delete,
    Edit,
} from "@mui/icons-material";

import { dailyLogs } from "../../data/dailyLogs";

import "./TableView.css";

const TableView = () => {

    const rowsPerPage = 10;

    const [page, setPage] = useState(1);
    const [workoutFilter, setWorkoutFilter] = useState("All");
    const [statusFilter, setStatusFilter] = useState("All");
    const [dateFilter, setDateFilter] = useState("");

    const workoutOptions = useMemo(() => {
        const unique = Array.from(new Set(dailyLogs.map((log) => log.workout)));
        return ["All", ...unique];
    }, []);

    const logs = useMemo(() => {

        return dailyLogs
            .filter((log) =>
                workoutFilter === "All" || log.workout === workoutFilter
            )
            .filter((log) =>
                statusFilter === "All" || log.status === statusFilter
            )
            .filter((log) =>
                dateFilter === "" || log.date === dateFilter
            )
            .sort(
                (a, b) =>
                    new Date(b.date).getTime() -
                    new Date(a.date).getTime()
            );

    }, [workoutFilter, statusFilter, dateFilter]);

    const totalPages = Math.max(1, Math.ceil(logs.length / rowsPerPage));

    const currentRows = logs.slice(
        (page - 1) * rowsPerPage,
        page * rowsPerPage
    );

    function handleWorkoutFilter(value: string) {
        setWorkoutFilter(value);
        setPage(1);
    }

    function handleStatusFilter(value: string) {
        setStatusFilter(value);
        setPage(1);
    }

    function handleDateFilter(value: string) {
        setDateFilter(value);
        setPage(1);
    }

    return (

        <div className="table-card">

            <div className="table-filters">

                <select
                    value={workoutFilter}
                    onChange={(e) => handleWorkoutFilter(e.target.value)}
                >
                    {workoutOptions.map((option) => (
                        <option key={option} value={option}>
                            {option === "All" ? "All workouts" : option}
                        </option>
                    ))}
                </select>

                <select
                    value={statusFilter}
                    onChange={(e) => handleStatusFilter(e.target.value)}
                >
                    <option value="All">All statuses</option>
                    <option value="completed">Completed</option>
                    <option value="partial">Partial</option>
                    <option value="missed">Missed</option>
                </select>

                <input
                    type="date"
                    value={dateFilter}
                    onChange={(e) => handleDateFilter(e.target.value)}
                    className="table-date-filter"
                />

                {dateFilter !== "" && (
                    <button
                        className="table-clear-date"
                        onClick={() => handleDateFilter("")}
                    >
                        Clear date
                    </button>
                )}

                <span className="table-results-count">
                    {logs.length} {logs.length === 1 ? "entry" : "entries"}
                </span>

            </div>

            <table>

                <thead>

                    <tr>

                        <th>Date</th>

                        <th>Weight</th>

                        <th>Workout</th>

                        <th>Status</th>

                        <th>Calories</th>

                        <th>Sleep</th>

                        <th>Water</th>

                        <th>Mood</th>

                        <th>Actions</th>

                    </tr>

                </thead>

                <tbody>

                    {currentRows.length === 0 && (
                        <tr>
                            <td colSpan={9} className="table-empty-state">
                                No logs match your filters.
                            </td>
                        </tr>
                    )}

                    {currentRows.map(log => (

                        <tr key={log.id}>

                            <td>

                                {new Date(log.date)

                                    .toLocaleDateString(

                                        "en-GB",

                                        {

                                            day: "2-digit",

                                            month: "short",

                                            year: "numeric",

                                        }

                                    )}

                            </td>

                            <td>

                                {log.weight} kg

                            </td>

                            <td>

                                {log.workout}

                            </td>

                            <td>

                                <span

                                    className={`status ${log.status}`}

                                >

                                    {log.status}

                                </span>

                            </td>

                            <td>

                                {log.calories}

                            </td>

                            <td>

                                {log.sleep} hrs

                            </td>

                            <td>

                                {log.water} L

                            </td>

                            <td>

                                {log.mood}

                            </td>

                            <td>

                                <div className="actions">

                                    <Edit
                                        className="edit"
                                        fontSize="small"
                                    />

                                    <Delete
                                        className="delete"
                                        fontSize="small"
                                    />

                                </div>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>
                        <div className="table-footer">

                <button
                    disabled={page === 1}
                    onClick={() =>
                        setPage(page - 1)
                    }
                >

                    Previous

                </button>

                <div className="page-numbers">

                    {Array.from(
                        {
                            length: totalPages,
                        },
                        (_, i) => (

                            <button
                                key={i}
                                className={
                                    page === i + 1
                                        ? "active-page"
                                        : ""
                                }
                                onClick={() =>
                                    setPage(i + 1)
                                }
                            >

                                {i + 1}

                            </button>

                        )
                    )}

                </div>

                <button
                    disabled={
                        page === totalPages
                    }
                    onClick={() =>
                        setPage(page + 1)
                    }
                >

                    Next

                </button>

            </div>

        </div>

    );

};

export default TableView;