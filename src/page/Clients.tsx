import { useMemo, useState } from "react";
import "./Clients.css";
import { clients } from "../data/clients";
import ClientDrawer from "../components/ClientDrawer";
import DeleteClientModal from "../modal/DeleteClientModal";
import AddClientModal from "../modal/AddClientModal";
import { useNavigate } from "react-router-dom";

const Clients = () => {
    const [search, setSearch] = useState("");
    const [membership, setMembership] = useState("All");
    const [goal, setGoal] = useState("All");
    const [selectedClient, setSelectedClient] = useState<any>(null);
    const [openDrawer, setOpenDrawer] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [clientList, setClientList] = useState(clients);
    const [clientToDelete, setClientToDelete] = useState<any>(null);
    const [openModal, setOpenModal] = useState(false);
    const navigate = useNavigate();
    const filteredClients = useMemo(() => {
        return clientList.filter((client) => {
            const matchesSearch =
                client.name.toLowerCase().includes(search.toLowerCase()) ||
                client.phone.includes(search);

            const matchesMembership =
                membership === "All" || client.membership === membership;

            const matchesGoal =
                goal === "All" || client.goal === goal;

            return (
                matchesSearch &&
                matchesMembership &&
                matchesGoal
            );
        });
    }, [clientList, search, membership, goal]);

    return (
        <div className="clients-page">

            <div className="clients-header">

                <div>
                    <h2>Clients</h2>
                    <p>Manage all your fitness clients in one place.</p>
                </div>

                <button
                    className="add-client-btn"
                    onClick={() => setOpenModal(true)}
                >
                    + Register Client
                </button>

            </div>

            <AddClientModal
                open={openModal}
                onClose={() => setOpenModal(false)}
            />

            <div className="filters">

                <input
                    type="text"
                    placeholder="Search client..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <select
                    value={membership}
                    onChange={(e) =>
                        setMembership(e.target.value)
                    }
                >
                    <option>All</option>
                    <option>General Membership</option>
                    <option>Personal Training</option>
                    <option>Body Building</option>
                </select>

                <select
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                >
                    <option>All</option>
                    <option>Weight Loss</option>
                    <option>Muscle Gain</option>
                    <option>Fitness</option>
                    <option>Competition</option>
                </select>

            </div>

            <table className="client-table">

                <thead>

                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Goal</th>
                        <th>Membership</th>
                        <th>Weight</th>
                        <th>Progress</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>

                </thead>

                <tbody>

                    {filteredClients.map((client) => (

                        <tr key={client.id}>

                            <td>{client.id}</td>

                            <td>
                                <div className="client-name">

                                    <div className="avatar">
                                        {client.name.charAt(0)}
                                    </div>

                                    <div>
                                        <h4>{client.name}</h4>
                                        <span>{client.phone}</span>
                                    </div>

                                </div>
                            </td>

                            <td>{client.goal}</td>

                            <td>{client.membership}</td>

                            <td>
                                {client.currentWeight} kg
                            </td>

                            <td>

                                <div className="progress">

                                    <div
                                        className="progress-fill"
                                        style={{
                                            width: `${client.progress}%`,
                                        }}
                                    />

                                </div>

                                <span>{client.progress}%</span>

                            </td>

                            <td>

                                <span className="status">
                                    {client.status}
                                </span>

                            </td>

                            <td>

                                <div className="actions">

                                    <button
                                        className="view-btn"
                                        onClick={() => {
                                            navigate(`/clients/${client.id}`);
                                        }}
                                    >
                                        View
                                    </button>

                                    <button
                                        className="edit-btn"
                                        onClick={() => {
                                            setSelectedClient(client);
                                            setEditOpen(true);
                                        }}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="delete-btn"
                                        onClick={() => {

                                            setClientToDelete(client);

                                            setDeleteOpen(true);

                                        }}
                                    >

                                        Delete

                                    </button>

                                </div>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>
            <ClientDrawer
                open={openDrawer}
                client={selectedClient}
                onClose={() => setOpenDrawer(false)}
            />

            <DeleteClientModal

                open={deleteOpen}

                clientName={clientToDelete?.name || ""}

                onClose={() => setDeleteOpen(false)}

                onDelete={() => {
                    setDeleteOpen(false);
                }}

            />

            <AddClientModal
                open={editOpen}
                editClient={selectedClient}
                onClose={() => {
                    setEditOpen(false);
                    setSelectedClient(null);
                }}
                onUpdate={(updatedClient) => {

                    setClientList((prev) =>
                        prev.map((item) =>
                            item.id === updatedClient.id
                                ? updatedClient
                                : item
                        )
                    );

                    setEditOpen(false);
                    setSelectedClient(null);
                }}
            />

        </div>
    );
};

export default Clients;