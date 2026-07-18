import React, { useEffect, useMemo, useState } from "react";
import {
    Box,
    Button,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    MenuItem,
    Step,
    StepLabel,
    Stepper,
    TextField,
    Typography,
} from "@mui/material";

interface AddClientModalProps {
    open: boolean;
    onClose: () => void;
    onSave?: (client: ClientForm) => void;
    onUpdate?: (client: ClientForm) => void;
    editClient?: ClientForm;
}

interface ClientForm {
    name: string;
    age: string;
    gender: string;
    phone: string;
    email: string;

    membership: string;
    goal: string;
    currentWeight: string;
    targetWeight: string;
    height: string;

    workoutDays: string[];
    preferredTime: string;
    startDate: string;
    notes: string;
}

const steps = [
    "Personal Details",
    "Fitness Details",
    "Training Plan",
];

const workoutOptions = [
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
    "Sun",
];

const initialState: ClientForm = {
    name: "",
    age: "",
    gender: "",
    phone: "",
    email: "",

    membership: "",
    goal: "",
    currentWeight: "",
    targetWeight: "",
    height: "",

    workoutDays: [],
    preferredTime: "",
    startDate: "",
    notes: "",
};

const lavenderFieldSx = {
    "& .MuiOutlinedInput-root": {
        borderRadius: 2,

        "& fieldset": {
            borderColor: "#D1C4E9",
        },

        "&:hover fieldset": {
            borderColor: "#9575CD",
        },

        "&.Mui-focused fieldset": {
            borderColor: "#7E57C2",
            borderWidth: 2,
        },
    },

    "& .MuiInputLabel-root.Mui-focused": {
        color: "#7E57C2",
    },

    "& .MuiSvgIcon-root": {
        color: "#7E57C2",
    },
};

const AddClientModal: React.FC<AddClientModalProps> = ({
    open,
    onClose,
    onSave,
    onUpdate,
    editClient,
}) => {
    const [activeStep, setActiveStep] = useState(0);

    const [client, setClient] =
        useState<ClientForm>(initialState);

    const [errors, setErrors] = useState<
        Record<string, string>
    >({});

useEffect(() => {

    if (open && editClient) {

        setClient({
            name: editClient.name || "",
            age: String(editClient.age || ""),
            gender: editClient.gender || "",
            phone: editClient.phone || "",
            email: editClient.email || "",

            membership: editClient.membership || "",
            goal: editClient.goal || "",
            currentWeight: String(editClient.currentWeight || ""),
            targetWeight: String(editClient.targetWeight || ""),
            height: String(editClient.height || ""),

            workoutDays: editClient.workoutDay
                ? editClient.workoutDay
                      .split(",")
                      .map((day: string) => day.trim())
                : [],

            preferredTime: editClient.sessionTime || "",
            startDate: editClient.joinDate || "",
            notes: editClient.notes || "",
        });

    } else {

        setClient(initialState);

    }

    setErrors({});
    setActiveStep(0);

}, [editClient, open]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = e.target;

        setClient((prev) => ({
            ...prev,
            [name]: value,
        }));

        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));
    };

    const toggleWorkoutDay = (day: string) => {
        setClient((prev) => ({
            ...prev,
            workoutDays: prev.workoutDays.includes(day)
                ? prev.workoutDays.filter((d) => d !== day)
                : [...prev.workoutDays, day],
        }));
    };

    const validateStep = () => {
        const e: Record<string, string> = {};

        if (activeStep === 0) {
            if (!client.name.trim())
                e.name = "Name is required";

            if (!client.age)
                e.age = "Age is required";

            if (!client.gender)
                e.gender = "Gender is required";

            if (!client.phone)
                e.phone = "Phone number is required";

            if (!/^[6-9]\d{9}$/.test(client.phone))
                e.phone = "Enter valid phone number";

            if (!client.email)
                e.email = "Email is required";

            if (
                !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                    client.email
                )
            )
                e.email = "Enter valid email";
        }

        if (activeStep === 1) {
            if (!client.membership)
                e.membership = "Membership required";

            if (!client.goal)
                e.goal = "Goal required";

            if (!client.currentWeight)
                e.currentWeight = "Current weight required";

            if (!client.targetWeight)
                e.targetWeight = "Target weight required";

            if (!client.height)
                e.height = "Height required";
        }

        if (activeStep === 2) {
            if ((client.workoutDays ?? []).length === 0)
                e.workoutDays =
                    "Select at least one day";

            if (!client.preferredTime)
                e.preferredTime =
                    "Preferred time required";

            if (!client.startDate)
                e.startDate =
                    "Start date required";
        }

        setErrors(e);

        return Object.keys(e).length === 0;
    };

    const isCurrentStepValid = useMemo(() => {
        switch (activeStep) {
            case 0:
                return (
                    client.name &&
                    client.age &&
                    client.gender &&
                    /^[6-9]\d{9}$/.test(client.phone) &&
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                        client.email
                    )
                );

            case 1:
                return (
                    client.membership &&
                    client.goal &&
                    client.currentWeight &&
                    client.targetWeight &&
                    client.height
                );

            case 2:
                return (
                    client.workoutDays.length > 0 &&
                    client.preferredTime &&
                    client.startDate
                );

            default:
                return false;
        }
    }, [activeStep, client]);

    const handleNext = () => {
        if (!validateStep()) return;

        setActiveStep((prev) => prev + 1);
    };

    const handleBack = () =>
        setActiveStep((prev) => prev - 1);

    const handleSubmit = () => {

        if (!validateStep()) return;

        if (editClient) {

            onUpdate?.({
                ...editClient,
                ...client,
            });

        } else {

            onSave?.(client);

        }

        setClient(initialState);
        setErrors({});
        setActiveStep(0);
        onClose();
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="md"
            slotProps={{
                paper: {
                    sx: {
                        borderRadius: 4,
                        background: "linear-gradient(180deg,#F8F3FF,#FFFFFF)",
                    },
                },
            }}
        >
       <DialogTitle
    sx={{
        fontWeight: 700,
        color: "#7E57C2",
        fontSize: "28px",
    }}
>
    {editClient ? "Edit Client" : "Register New Client"}
</DialogTitle>

            <DialogContent>
                <Stepper
                    activeStep={activeStep}
                    sx={{
                        mb: 4,

                        "& .MuiStepLabel-label.Mui-active": {
                            color: "#7E57C2",
                            fontWeight: 700,
                        },

                        "& .MuiStepLabel-label.Mui-completed": {
                            color: "#7E57C2",
                        },

                        "& .MuiStepIcon-root.Mui-active": {
                            color: "#9575CD",
                        },

                        "& .MuiStepIcon-root.Mui-completed": {
                            color: "#9575CD",
                        },
                    }}
                >
                    {steps.map((step) => (
                        <Step key={step}>
                            <StepLabel>{step}</StepLabel>
                        </Step>
                    ))}
                </Stepper>

                {activeStep === 0 && (
                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                fullWidth
                                label="Client Name"
                                name="name"
                                value={client.name}
                                onChange={handleChange}
                                error={!!errors.name}
                                helperText={errors.name}
                                sx={lavenderFieldSx}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                fullWidth
                                type="number"
                                label="Age"
                                name="age"
                                value={client.age}
                                onChange={handleChange}
                                error={!!errors.age}
                                helperText={errors.age}
                                sx={lavenderFieldSx}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                select
                                fullWidth
                                label="Gender"
                                name="gender"
                                value={client.gender}
                                onChange={handleChange}
                                error={!!errors.gender}
                                helperText={errors.gender}
                                sx={lavenderFieldSx}
                            >
                                <MenuItem value="Male">Male</MenuItem>
                                <MenuItem value="Female">Female</MenuItem>
                                <MenuItem value="Other">Other</MenuItem>
                            </TextField>
                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                fullWidth
                                label="Phone Number"
                                name="phone"
                                value={client.phone}
                                onChange={handleChange}
                                error={!!errors.phone}
                                helperText={errors.phone}
                                sx={lavenderFieldSx}
                            />
                        </Grid>

                        <Grid size={{ xs: 12 }}>
                            <TextField
                                fullWidth
                                label="Email"
                                name="email"
                                value={client.email}
                                onChange={handleChange}
                                error={!!errors.email}
                                helperText={errors.email}
                                sx={lavenderFieldSx}
                            />
                        </Grid>
                    </Grid>
                )}

                {activeStep === 1 && (
                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                select
                                fullWidth
                                label="Membership"
                                name="membership"
                                value={client.membership}
                                onChange={handleChange}
                                error={!!errors.membership}
                                helperText={errors.membership}
                                sx={lavenderFieldSx}
                            >
                                <MenuItem value="General">General</MenuItem>
                                <MenuItem value="Personal Training">
                                    Personal Training
                                </MenuItem>
                                <MenuItem value="Bodybuilding">
                                    Bodybuilding
                                </MenuItem>
                            </TextField>
                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                select
                                fullWidth
                                label="Goal"
                                name="goal"
                                value={client.goal}
                                onChange={handleChange}
                                error={!!errors.goal}
                                helperText={errors.goal}
                                sx={lavenderFieldSx}
                            >
                                <MenuItem value="Weight Loss">
                                    Weight Loss
                                </MenuItem>
                                <MenuItem value="Muscle Gain">
                                    Muscle Gain
                                </MenuItem>
                                <MenuItem value="General Fitness">
                                    General Fitness
                                </MenuItem>
                                <MenuItem value="Competition Prep">
                                    Competition Prep
                                </MenuItem>
                            </TextField>
                        </Grid>

                        <Grid size={{ xs: 12, md: 4 }}>
                            <TextField
                                fullWidth
                                label="Current Weight (kg)"
                                name="currentWeight"
                                value={client.currentWeight}
                                onChange={handleChange}
                                error={!!errors.currentWeight}
                                helperText={errors.currentWeight}
                                sx={lavenderFieldSx}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, md: 4 }}>
                            <TextField
                                fullWidth
                                label="Target Weight (kg)"
                                name="targetWeight"
                                value={client.targetWeight}
                                onChange={handleChange}
                                error={!!errors.targetWeight}
                                helperText={errors.targetWeight}
                                sx={lavenderFieldSx}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, md: 4 }}>
                            <TextField
                                fullWidth
                                label="Height (cm)"
                                name="height"
                                value={client.height}
                                onChange={handleChange}
                                error={!!errors.height}
                                helperText={errors.height}
                                sx={lavenderFieldSx}
                            />
                        </Grid>
                    </Grid>
                )}

                {activeStep === 2 && (
                    <Grid container spacing={3}>
                        <Grid size={{ xs: 12 }}>
                            <Typography
                                variant="h5"
                                sx={{
                                    fontWeight: 700,
                                    color: "#7E57C2",
                                }}
                            >
                                Workout Days
                            </Typography>

                            <Box
                                sx={{
                                    display: "flex",
                                    gap: 1,
                                    flexWrap: "wrap",
                                }}
                            >
                                {workoutOptions.map((day) => {
                                    const selected = (client.workoutDays ?? []).includes(day);

                                    return (
                                        <Chip
                                            key={day}
                                            label={day}
                                            clickable
                                            onClick={() => toggleWorkoutDay(day)}
                                            sx={{
                                                bgcolor: selected ? "#8B5CF6" : "#F5F3FF",
                                                color: selected ? "#FFFFFF" : "#6D28D9",
                                                border: "1px solid #C4B5FD",
                                                fontWeight: 600,
                                                transition: "all 0.25s ease",

                                                "&:hover": {
                                                    bgcolor: selected ? "#7C3AED" : "#EDE9FE",
                                                    color: selected ? "#FFFFFF" : "#5B21B6",
                                                    transform: "translateY(-2px)",
                                                    boxShadow: "0 4px 12px rgba(139, 92, 246, 0.25)",
                                                },
                                            }}
                                        />
                                    );
                                })}
                            </Box>
                            {errors.workoutDays && (
                                <Typography
                                    color="error"
                                    variant="caption"
                                >
                                    {errors.workoutDays}
                                </Typography>
                            )}
                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                fullWidth
                                type="time"
                                label="Preferred Time"
                                name="preferredTime"
                                value={client.preferredTime}
                                onChange={handleChange}
                                error={!!errors.preferredTime}
                                helperText={errors.preferredTime}
                                sx={lavenderFieldSx}
                                slotProps={{
                                    inputLabel: {
                                        shrink: true,
                                    },
                                }}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                fullWidth
                                type="date"
                                label="Start Date"
                                name="startDate"
                                value={client.startDate}
                                onChange={handleChange}
                                error={!!errors.startDate}
                                helperText={errors.startDate}
                                sx={lavenderFieldSx}
                                slotProps={{
                                    inputLabel: {
                                        shrink: true,
                                    },
                                }}
                            />
                        </Grid>

                        <Grid size={{ xs: 12 }}>
                            <TextField
                                fullWidth
                                multiline
                                rows={4}
                                label="Trainer Notes"
                                name="notes"
                                value={client.notes}
                                onChange={handleChange}
                                sx={lavenderFieldSx}
                            />
                        </Grid>
                    </Grid>
                )}
            </DialogContent>

            <DialogActions sx={{ p: 3 }}>
                {activeStep > 0 && (
                    <Button
                        variant="outlined"
                        onClick={handleBack}
                        sx={{
                            color: "#7C3AED",
                            border: "2px solid #C4B5FD",
                            backgroundColor: "#FFFFFF",
                            borderRadius: "12px",
                            textTransform: "none",
                            fontWeight: 600,
                            px: 3,
                            py: 1.2,
                            transition: "all 0.3s ease",

                            "&:hover": {
                                backgroundColor: "#F5F3FF",
                                borderColor: "#8B5CF6",
                                color: "#6D28D9",
                                transform: "translateY(-2px)",
                                boxShadow: "0 8px 20px rgba(139, 92, 246, 0.15)",
                            },

                            "&:active": {
                                transform: "scale(0.98)",
                            },
                        }}
                    >
                        Back
                    </Button>
                )}

                {activeStep < steps.length - 1 ? (
                    <Button
                        variant="contained"
                        onClick={handleNext}
                        disabled={!isCurrentStepValid}
                        sx={{
                            background: "linear-gradient(135deg, #A78BFA, #8B5CF6)",
                            color: "#fff",
                            borderRadius: "12px",
                            textTransform: "none",
                            fontWeight: 600,
                            px: 3,
                            py: 1.2,
                            transition: "all 0.3s ease",

                            "&:hover": {
                                background: "linear-gradient(135deg, #8B5CF6, #7C3AED)",
                                transform: "translateY(-2px)",
                                boxShadow: "0 8px 20px rgba(139, 92, 246, 0.35)",
                            },

                            "&:active": {
                                transform: "scale(0.98)",
                            },

                            "&.Mui-disabled": {
                                background: "#E9DDFB",
                                color: "#9E9E9E",
                            },
                        }}
                    >
                        Next
                    </Button>
                ) : (<Button
                    variant="contained"
                    onClick={handleSubmit}
                    disabled={!isCurrentStepValid}
                    sx={{
                        background: "linear-gradient(135deg, #A78BFA, #8B5CF6)",
                        color: "#FFFFFF",
                        borderRadius: "12px",
                        px: 4,
                        py: 1.2,
                        textTransform: "none",
                        fontWeight: 600,
                        fontSize: "15px",
                        boxShadow: "0 4px 14px rgba(139, 92, 246, 0.25)",
                        transition: "all 0.3s ease",

                        "&:hover": {
                            background: "linear-gradient(135deg, #8B5CF6, #7C3AED)",
                            transform: "translateY(-2px)",
                            boxShadow: "0 8px 22px rgba(139, 92, 246, 0.35)",
                        },

                        "&:active": {
                            transform: "scale(0.98)",
                        },

                        "&.Mui-disabled": {
                            background: "#E9DDFB",
                            color: "#9CA3AF",
                            boxShadow: "none",
                        },
                    }}
                >
                    {editClient ? "Update Client" : "Register Client"}
                </Button>
                )}
            </DialogActions>
        </Dialog>
    );
};

export default AddClientModal;

