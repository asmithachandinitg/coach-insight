import { useEffect, useState } from "react";
import "./DailyLogModal.css";

interface DailyLog {

    id?: number;

    date: string;

    weight: number;

    workout: string;

    status: string;

    calories: number;

    sleep: number;

    water: number;

    mood: string;

    notes: string;

}

interface Props {

    open: boolean;

    mode: "add" | "edit";

    log?: DailyLog;

    onClose: () => void;

    onSave: (log: DailyLog) => void;

}

const defaultForm: DailyLog = {

    date: "",

    weight: 0,

    workout: "Chest",

    status: "completed",

    calories: 0,

    sleep: 8,

    water: 3,

    mood: "😊",

    notes: "",

};

const workouts = [

    "Chest",

    "Back",

    "Legs",

    "Shoulders",

    "Arms",

    "Cardio",

    "Core",

    "Full Body",

    "Rest Day",

];

const moods = [

    "😁",

    "😊",

    "🙂",

    "😐",

    "😔",

    "😴",

];

const DailyLogModal = ({

    open,

    mode,

    log,

    onClose,

    onSave,

}: Props) => {

    const [form, setForm] =

        useState(defaultForm);

    useEffect(() => {

        if (

            mode === "edit" &&

            log

        ) {

            setForm(log);

        } else {

            setForm(defaultForm);

        }

    }, [

        mode,

        log,

        open,

    ]);

    if (!open)

        return null;

    return (

        <div className="modal-overlay" role="presentation">

            <div className="daily-modal" role="dialog" aria-modal="true" aria-labelledby="daily-modal-title">

                <div className="modal-header">

                    <h2 id="daily-modal-title">

                        {mode === "add"

                            ? "Add Daily Log"

                            : "Edit Daily Log"}

                    </h2>

                    <button

                        onClick={onClose}
                        aria-label="Close dialog"

                    >

                        ✕

                    </button>

                </div>

                <div className="modal-body">

                    <div className="form-grid">

                        <div>

                            <label>

                                Date

                            </label>

                            <input

                                type="date"

                                value={form.date}

                                onChange={(e) =>

                                    setForm({

                                        ...form,

                                        date: e.target.value,

                                    })

                                }

                            />

                        </div>

                        <div>

                            <label>

                                Weight

                            </label>

                            <input

                                type="number"

                                value={form.weight}

                                onChange={(e) =>

                                    setForm({

                                        ...form,

                                        weight: Number(

                                            e.target.value

                                        ),

                                    })

                                }

                            />

                        </div>

                        <div>

                            <label>

                                Workout

                            </label>

                            <select

                                value={form.workout}

                                onChange={(e) =>

                                    setForm({

                                        ...form,

                                        workout:

                                            e.target.value,

                                    })

                                }

                            >

                                {workouts.map(

                                    workout => (

                                        <option

                                            key={workout}

                                        >

                                            {workout}

                                        </option>

                                    )

                                )}

                            </select>

                        </div>
                                                <div>

                            <label>

                                Status

                            </label>

                            <select

                                value={form.status}

                                onChange={(e) =>

                                    setForm({

                                        ...form,

                                        status:
                                            e.target.value,

                                    })

                                }

                            >

                                <option value="completed">

                                    Completed

                                </option>

                                <option value="partial">

                                    Partial

                                </option>

                                <option value="missed">

                                    Missed

                                </option>

                            </select>

                        </div>

                        <div>

                            <label>

                                Calories Burned

                            </label>

                            <input

                                type="number"

                                value={form.calories}

                                onChange={(e) =>

                                    setForm({

                                        ...form,

                                        calories: Number(
                                            e.target.value
                                        ),

                                    })

                                }

                            />

                        </div>

                        <div>

                            <label>

                                Sleep (hrs)

                            </label>

                            <input

                                type="number"

                                step="0.5"

                                value={form.sleep}

                                onChange={(e) =>

                                    setForm({

                                        ...form,

                                        sleep: Number(
                                            e.target.value
                                        ),

                                    })

                                }

                            />

                        </div>

                        <div>

                            <label>

                                Water Intake (L)

                            </label>

                            <input

                                type="number"

                                step="0.5"

                                value={form.water}

                                onChange={(e) =>

                                    setForm({

                                        ...form,

                                        water: Number(
                                            e.target.value
                                        ),

                                    })

                                }

                            />

                        </div>

                    </div>

                    <div className="mood-section">

                        <label>

                            Mood

                        </label>

                        <div className="mood-list">

                            {moods.map(

                                mood => (

                                    <button

                                        type="button"

                                        key={mood}

                                        className={
                                            form.mood ===
                                            mood
                                                ? "selected-mood"
                                                : ""
                                        }

                                        onClick={() =>

                                            setForm({

                                                ...form,

                                                mood,

                                            })

                                        }

                                    >

                                        {mood}

                                    </button>

                                )

                            )}

                        </div>

                    </div>

                    <div className="notes-section">

                        <label>

                            Notes

                        </label>

                        <textarea

                            rows={4}

                            placeholder="Add today's notes..."

                            value={form.notes}

                            onChange={(e) =>

                                setForm({

                                    ...form,

                                    notes:
                                        e.target.value,

                                })

                            }

                        />

                    </div>

                </div>

                <div className="modal-footer">

                    <button

                        className="cancel-btn"

                        onClick={onClose}

                    >

                        Cancel

                    </button>

                    <button

                        className="save-btn"

                        onClick={() =>
                            onSave(form)
                        }

                    >

                        {mode === "add"

                            ? "Save Entry"

                            : "Update Entry"}

                    </button>

                </div>

            </div>

        </div>

    );

};

export default DailyLogModal;