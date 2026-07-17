import BarChart from "../charts/BarChart";
import { lastWeekAttendance } from "../data/dashboard";

const LastWeekAttendance = () => {

    return (

        <BarChart
            title="Last Week Attendance"
            subtitle="Previous Week Overview"
            data={lastWeekAttendance.map(item => ({
                label: item.day,
                value: item.attendance,
            }))}
        />

    );

};

export default LastWeekAttendance;