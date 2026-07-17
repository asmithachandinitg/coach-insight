import {
    Button,
    Drawer,
    MenuItem,
    TextField,
} from "@mui/material";
import { useState } from "react";
import "./AddDailyEntryDrawer.css";

interface Props {
    open: boolean;
    onClose: () => void;
}

const AddDailyEntryDrawer = ({
    open,
    onClose,
}: Props) => {

    const [entry, setEntry] = useState({

        date: "",

        weight: "",

        workout: "",

        duration: "",

        calories: "",

        water: "",

        sleep: "",

        mood: "",

        notes: "",

    });

    const handleChange = (
        key: string,
        value: string
    ) => {

        setEntry(prev => ({

            ...prev,

            [key]: value,

        }));

    };

    return (

        <Drawer

            anchor="right"

            open={open}

            onClose={onClose}

        >

            <div className="daily-entry">

                <h2>

                    Add Daily Entry

                </h2>

                <TextField

                    type="date"

                    label="Date"

                    // InputLabelProps={{
                    //     shrink: true,
                    // }}

                    value={entry.date}

                    onChange={(e) =>
                        handleChange(
                            "date",
                            e.target.value
                        )
                    }

                    fullWidth

                />

                <TextField

                    label="Weight (kg)"

                    value={entry.weight}

                    onChange={(e) =>
                        handleChange(
                            "weight",
                            e.target.value
                        )
                    }

                    fullWidth

                />

                <TextField

                    select

                    label="Workout"

                    value={entry.workout}

                    onChange={(e) =>
                        handleChange(
                            "workout",
                            e.target.value
                        )
                    }

                    fullWidth

                >

                    <MenuItem value="Chest">

                        Chest

                    </MenuItem>

                    <MenuItem value="Back">

                        Back

                    </MenuItem>

                    <MenuItem value="Leg">

                        Leg

                    </MenuItem>

                    <MenuItem value="Shoulder">

                        Shoulder

                    </MenuItem>

                    <MenuItem value="Cardio">

                        Cardio

                    </MenuItem>

                </TextField>

                <TextField

                    label="Workout Duration (mins)"

                    value={entry.duration}

                    onChange={(e) =>
                        handleChange(
                            "duration",
                            e.target.value
                        )
                    }

                    fullWidth

                />

                <TextField

                    label="Calories Burned"

                    value={entry.calories}

                    onChange={(e) =>
                        handleChange(
                            "calories",
                            e.target.value
                        )
                    }

                    fullWidth

                />

                <TextField

                    label="Water Intake (L)"

                    value={entry.water}

                    onChange={(e) =>
                        handleChange(
                            "water",
                            e.target.value
                        )
                    }

                    fullWidth

                />

                <TextField

                    label="Sleep (hrs)"

                    value={entry.sleep}

                    onChange={(e) =>
                        handleChange(
                            "sleep",
                            e.target.value
                        )
                    }

                    fullWidth

                />

                <TextField

                    select

                    label="Mood"

                    value={entry.mood}

                    onChange={(e) =>
                        handleChange(
                            "mood",
                            e.target.value
                        )
                    }

                    fullWidth

                >

                    <MenuItem value="😊">

                        😊 Happy

                    </MenuItem>

                    <MenuItem value="😐">

                        😐 Normal

                    </MenuItem>

                    <MenuItem value="😔">

                        😔 Tired

                    </MenuItem>

                </TextField>

                <TextField

                    label="Notes"

                    multiline

                    rows={4}

                    value={entry.notes}

                    onChange={(e) =>
                        handleChange(
                            "notes",
                            e.target.value
                        )
                    }

                    fullWidth

                />

                <div className="drawer-buttons">

                    <Button

                        variant="outlined"

                        onClick={onClose}

                    >

                        Cancel

                    </Button>

                    <Button

                        variant="contained"

                    >

                        Save Entry

                    </Button>

                </div>

            </div>

        </Drawer>

    );

};

export default AddDailyEntryDrawer;