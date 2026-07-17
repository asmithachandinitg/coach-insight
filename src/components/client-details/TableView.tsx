import { useMemo, useState } from "react";
import {
    Delete,
    Edit,
} from "@mui/icons-material";

import { dailyLogs } from "../../data/dailyLogs";

import "./TableView.css";

const TableView = () => {

    const rowsPerPage = 10;

    const [page, setPage] =
        useState(1);

    const today = new Date();
    const currentDate = today.getDate();

    const logs = useMemo(() => {

        return dailyLogs

           .filter(log => {

    const day = Number(
        log.date.split("-")[2]
    );

    return day <= currentDate;

})

            .sort(

                (a, b) =>

                    new Date(b.date).getTime() -

                    new Date(a.date).getTime()

            );

    }, []);

    const totalPages = Math.ceil(

        logs.length / rowsPerPage

    );

    const currentRows = logs.slice(

        (page - 1) * rowsPerPage,

        page * rowsPerPage

    );

    return (

        <div className="table-card">

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