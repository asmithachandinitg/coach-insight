import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import LinearProgress from "@mui/material/LinearProgress";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import "./ClientDrawer.css";

interface Props {
    open: boolean;
    onClose: () => void;
    client: any;
}

const ClientDrawer: React.FC<Props> = ({
    open,
    onClose,
    client,
}) => {

    if (!client) return null;

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
         slotProps={{
    paper: {
        className: "client-profile-dialog",
    },
}}
        >

            <DialogTitle className="profile-header">

                <div className="profile-title">
                    Client Profile
                </div>

                <IconButton onClick={onClose}>
                    <CloseIcon />
                </IconButton>

            </DialogTitle>

            <DialogContent>

                <div className="profile-top">

                    <div className="avatar-circle">
                        {client.name.charAt(0)}
                    </div>

                    <h2>{client.name}</h2>

                    <Chip
                        label={client.status}
                        color="success"
                    />

                </div>

                <div className="info-card">

                    <h3>👤 Personal Information</h3>

                    <div className="info-grid">

                        <div>
                            <label>Phone</label>
                            <p>{client.phone}</p>
                        </div>

                        <div>
                            <label>Email</label>
                            <p>{client.email}</p>
                        </div>

                        <div>
                            <label>Age</label>
                            <p>{client.age}</p>
                        </div>

                        <div>
                            <label>Gender</label>
                            <p>{client.gender}</p>
                        </div>

                    </div>

                </div>

                <div className="info-card">

                    <h3>🏋 Fitness Details</h3>

                    <div className="info-grid">

                        <div>
                            <label>Goal</label>
                            <p>{client.goal}</p>
                        </div>

                        <div>
                            <label>Membership</label>
                            <p>{client.membership}</p>
                        </div>

                        <div>
                            <label>Current Weight</label>
                            <p>{client.currentWeight} kg</p>
                        </div>

                        <div>
                            <label>Target Weight</label>
                            <p>{client.targetWeight} kg</p>
                        </div>

                        <div>
                            <label>Height</label>
                            <p>{client.height} cm</p>
                        </div>

                    </div>

                    <div className="progress-section">

                        <div className="progress-text">

                            <span>Overall Progress</span>

                            <span>{client.progress}%</span>

                        </div>

                        <LinearProgress
                            variant="determinate"
                            value={client.progress}
                            className="progress-bar"
                        />

                    </div>

                </div>
                                <div className="info-card">

                    <h3>📅 Training Schedule</h3>

                    <div className="info-grid">

                        <div>
                            <label>Workout Days</label>
                            <p>{client.workoutDay}</p>
                        </div>

                        <div>
                            <label>Session Time</label>
                            <p>{client.sessionTime}</p>
                        </div>

                        <div>
                            <label>Trainer</label>
                            <p>{client.trainer}</p>
                        </div>

                        <div>
                            <label>Join Date</label>
                            <p>{client.joinDate}</p>
                        </div>

                    </div>

                </div>

                <div className="info-card">

                    <h3>📝 Trainer Notes</h3>

                    <div className="notes-box">
                        {client.notes
                            ? client.notes
                            : "No notes available for this client."}
                    </div>

                </div>

            </DialogContent>

            <DialogActions className="profile-actions">

                <Button
                    variant="outlined"
                    color="secondary"
                    onClick={onClose}
                >
                    Close
                </Button>

                <Button
                    variant="contained"
                    className="edit-profile-btn"
                >
                    Edit Client
                </Button>

            </DialogActions>

        </Dialog>
    );
};

export default ClientDrawer;