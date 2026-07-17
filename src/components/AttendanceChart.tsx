import BarChart from "../charts/BarChart";
import { weeklyAttendance } from "../data/dashboard";

const AttendanceChart = () => {

    const today = new Date().getDay();

    const data = weeklyAttendance.filter(
        (_, index) => index < today
    );

    return (

        <BarChart
            title="Attendance This Week"
            subtitle="Current Week Attendance"
            data={data.map(item => ({
                label: item.day,
                value: item.attendance,
            }))}
        />

    );

};

export default AttendanceChart;