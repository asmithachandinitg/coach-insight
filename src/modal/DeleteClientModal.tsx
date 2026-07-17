import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
} from "@mui/material";

interface Props {
    open: boolean;
    onClose: () => void;
    onDelete: () => void;
    clientName: string;
}

const DeleteClientModal = ({
    open,
    onClose,
    onDelete,
    clientName,
}: Props) => {

    return (

        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="xs"
            fullWidth
        >

            <DialogTitle>

                Delete Client

            </DialogTitle>

            <DialogContent>

                <Typography>

                    Are you sure you want to delete

                    <strong> {clientName}</strong>?

                </Typography>

                <Typography
                    sx={{
                        mt: 2,
                        color: "#ef4444"
                    }}
                >

                    This action cannot be undone.

                </Typography>

            </DialogContent>

            <DialogActions>

                <Button
                    variant="outlined"
                    onClick={onClose}
                    sx={{
                        color: "#7c3aed",
                        borderColor: "#c4b5fd",
                        textTransform: "none",
                        borderRadius: "10px",
                        px: 3,
                        "&:hover": {
                            borderColor: "#8b5cf6",
                            backgroundColor: "#f5f3ff",
                        },
                    }}
                >
                    Cancel
                </Button>

                <Button
                    variant="contained"
                    onClick={onDelete}
                    sx={{
                        background: "linear-gradient(135deg, #ef4444, #dc2626)",
                        textTransform: "none",
                        borderRadius: "10px",
                        px: 3,
                        boxShadow: "none",
                        "&:hover": {
                            background: "linear-gradient(135deg, #dc2626, #b91c1c)",
                            boxShadow: "0 8px 20px rgba(220,38,38,.3)",
                        },
                    }}
                >
                    Delete
                </Button>

            </DialogActions>

        </Dialog>

    );

};

export default DeleteClientModal;