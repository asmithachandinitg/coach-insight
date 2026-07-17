import { dailyLogs } from "../../data/dailyLogs";
import "./CalendarView.css";

const CalendarView = () => {

    const today = new Date();

    const currentYear = today.getFullYear();

    const currentMonth = today.getMonth();

    const currentDate = today.getDate();

    const firstDay = new Date(
        currentYear,
        currentMonth,
        1
    ).getDay();

    const totalDays = new Date(
        currentYear,
        currentMonth + 1,
        0
    ).getDate();

    const weekDays = [
        "Sun",
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat",
    ];

    const cells = [];

    for (
        let i = 0;
        i < firstDay;
        i++
    ) {

        cells.push({
            empty: true,
        });

    }

    for (
        let day = 1;
        day <= totalDays;
        day++
    ) {

 const log = dailyLogs.find((item) => {

    const logDate = new Date(item.date);

    return (
        logDate.getDate() === day &&
        logDate.getMonth() === currentMonth
    );

});

        cells.push({

            day,

            isToday:
                day === currentDate,

            isFuture:
    currentMonth === today.getMonth()
        ? day > currentDate
        : false,

            log,

        });

    }

    return (

        <div className="calendar-card">

            <div className="calendar-header">

                <h2>

                    Workout Calendar

                </h2>

                <span>

                    {today.toLocaleString(
                        "default",
                        {
                            month: "long",
                        }
                    )}{" "}
                    {currentYear}

                </span>

            </div>

            <div className="weekdays">

                {weekDays.map(day => (

                    <div
                        key={day}
                        className="weekday"
                    >

                        {day}

                    </div>

                ))}

            </div>

            <div className="calendar-grid">
                                {cells.map((cell, index) => {

                    if (cell.empty) {

                        return (

                            <div
                                key={index}
                                className="calendar-cell empty-cell"
                            />

                        );

                    }

                    let statusClass = "no-entry";

                    let symbol = "";

                    if (!cell.isFuture && cell.log) {

                        switch (cell.log.status) {

                            case "completed":

                                statusClass = "completed";

                                symbol = "✓";

                                break;

                            case "partial":

                                statusClass = "partial";

                                symbol = "•";

                                break;

                            case "missed":

                                statusClass = "missed";

                                symbol = "✕";

                                break;

                            default:

                                statusClass = "no-entry";

                        }

                    }

                    return (

                        <div
                            key={index}
                            className={`calendar-cell ${
                                cell.isToday
                                    ? "today"
                                    : ""
                            }`}
                        >

                            <span className="day-number">

                                {cell.day}

                            </span>

                            {!cell.isFuture ? (

                                <div
                                    className={`status-circle ${statusClass}`}
                                >

                                    {symbol}

                                </div>

                            ) : (

                                <div className="future-dot" />

                            )}

                        </div>

                    );

                })}

            </div>

            <div className="calendar-legend">

                <div>

                    <span className="legend completed"></span>

                    Completed

                </div>

                <div>

                    <span className="legend partial"></span>

                    Partial

                </div>

                <div>

                    <span className="legend missed"></span>

                    Missed

                </div>

                <div>

                    <span className="legend no-entry"></span>

                    Future / No Entry

                </div>

            </div>

        </div>

    );

};

export default CalendarView;