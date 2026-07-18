import { useEffect, useMemo, useState } from "react";
import { Skeleton } from "@mui/material";
import toast from "react-hot-toast";
import PeopleOutlineIcon from "@mui/icons-material/PeopleAltOutlined";
import "./Clients.css";
import { clients } from "../data/clients";
import type { Client } from "../types";
import ClientDrawer from "../components/ClientDrawer";
import DeleteClientModal from "../modal/DeleteClientModal";
import AddClientModal from "../modal/AddClientModal";
import EmptyState from "../components/EmptyState";
import { exportToCSV } from "../utils/csvExport";
import { usePersistedState } from "../utils/usePersistedState";
import { useNavigate } from "react-router-dom";

type SortKey = "name" | "currentWeight" | "progress";
type SortDirection = "asc" | "desc";

const Clients = () => {
    const [search, setSearch] = usePersistedState("clients:search", "");
    const [membership, setMembership] = usePersistedState("clients:membership", "All");
    const [goal, setGoal] = usePersistedState("clients:goal", "All");
    const [sortKey, setSortKey] = usePersistedState<SortKey>("clients:sortKey", "name");
    const [sortDirection, setSortDirection] = usePersistedState<SortDirection>("clients:sortDirection", "asc");

    const [selectedClient, setSelectedClient] = useState<Client | null>(null);
    const [openDrawer, setOpenDrawer] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [clientList, setClientList] = useState(clients);
    const [clientToDelete, setClientToDelete] = useState<Client | null>(null);
    const [openModal, setOpenModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 700);
        return () => clearTimeout(timer);
    }, []);

    const filteredClients = useMemo(() => {
        return clientList.filter((client) => {
            const matchesSearch =
                client.name.toLowerCase().includes(search.toLowerCase()) ||
                client.phone.includes(search);

            const matchesMembership =
                membership === "All" || client.membership === membership;

            const matchesGoal =
                goal === "All" || client.goal === goal;

            return matchesSearch && matchesMembership && matchesGoal;
        });
    }, [clientList, search, membership, goal]);

    const sortedClients = useMemo(() => {
        return [...filteredClients].sort((a, b) => {
            let result = 0;
            if (sortKey === "name") {
                result = a.name.localeCompare(b.name);
            } else {
                result = a[sortKey] - b[sortKey];
            }
            return sortDirection === "asc" ? result : -result;
        });
    }, [filteredClients, sortKey, sortDirection]);

    function handleSort(key: SortKey) {
        if (sortKey === key) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
            setSortKey(key);
            setSortDirection("asc");
        }
    }

    function SortArrow({ column }: { column: SortKey }) {
        if (sortKey !== column) return <span className="sort-arrow sort-arrow-inactive">↕</span>;
        return <span className="sort-arrow">{sortDirection === "asc" ? "↑" : "↓"}</span>;
    }

    function handleExportCSV() {
        exportToCSV(
            sortedClients,
            `clients-export-${new Date().toISOString().slice(0, 10)}.csv`,
            [
                { key: "id", label: "ID" },
                { key: "name", label: "Name" },
                { key: "phone", label: "Phone" },
                { key: "goal", label: "Goal" },
                { key: "membership", label: "Membership" },
                { key: "currentWeight", label: "Weight (kg)" },
                { key: "progress", label: "Progress (%)" },
                { key: "status", label: "Status" },
            ]
        );
        toast.success(`Exported ${sortedClients.length} clients to CSV`);
    }

    return (
        <div className="clients-page">

            <div className="clients-header">
                <div>
                    <h2>Clients</h2>
                    <p>Manage all your fitness clients in one place.</p>
                </div>

                <div className="clients-header-actions">
                    <button className="export-btn" onClick={handleExportCSV} aria-label="Export clients to CSV">
                        Export CSV
                    </button>
                    <button className="add-btn" onClick={() => setOpenModal(true)}>
                        + Register Client
                    </button>
                </div>
            </div>

            <AddClientModal
                open={openModal}
                onClose={() => setOpenModal(false)}
                onSave={(newClient) => {
                    const clientWithId: Client = {
                        ...(newClient as unknown as Client),
                        id: Math.max(0, ...clientList.map((c) => c.id)) + 1,
                    };
                    setClientList((prev) => [...prev, clientWithId]);
                    setOpenModal(false);
                    toast.success(`${clientWithId.name} added`);
                }}
            />

            <div className="filters">
                <input
                    type="text"
                    placeholder="Search client..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    aria-label="Search clients by name or phone"
                />

                <select
                    value={membership}
                    onChange={(e) => setMembership(e.target.value)}
                    aria-label="Filter by membership"
                >
                    <option>All</option>
                    <option>General Membership</option>
                    <option>Personal Training</option>
                    <option>Body Building</option>
                </select>

                <select
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                    aria-label="Filter by goal"
                >
                    <option>All</option>
                    <option>Weight Loss</option>
                    <option>Muscle Gain</option>
                    <option>Fitness</option>
                    <option>Competition</option>
                </select>
            </div>

            <p className="results-count">
                {sortedClients.length} {sortedClients.length === 1 ? "client" : "clients"}
            </p>

            {loading ? (
                <div className="clients-skeleton">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <Skeleton key={i} variant="rounded" height={64} sx={{ mb: 1.5, borderRadius: "12px" }} />
                    ))}
                </div>
            ) : sortedClients.length === 0 ? (
                <EmptyState
                    icon={PeopleOutlineIcon}
                    title="No clients match your filters"
                    message="Try adjusting your search or filter criteria, or register a new client."
                    action={{ label: "Register a client", onClick: () => setOpenModal(true) }}
                />
            ) : (
                <table className="client-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th className="sortable" onClick={() => handleSort("name")}>
                                Name <SortArrow column="name" />
                            </th>
                            <th>Goal</th>
                            <th>Membership</th>
                            <th className="sortable" onClick={() => handleSort("currentWeight")}>
                                Weight <SortArrow column="currentWeight" />
                            </th>
                            <th className="sortable" onClick={() => handleSort("progress")}>
                                Progress <SortArrow column="progress" />
                            </th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {sortedClients.map((client) => (
                            <tr key={client.id}>
                                <td>{client.id}</td>
                                <td>
                                    <div className="client-name">
                                        <div className="avatar">{client.name.charAt(0)}</div>
                                        <div>
                                            <h4>{client.name}</h4>
                                            <span>{client.phone}</span>
                                        </div>
                                    </div>
                                </td>
                                <td>{client.goal}</td>
                                <td>{client.membership}</td>
                                <td>{client.currentWeight} kg</td>
                                <td>
                                    <div className="progress">
                                        <div className="progress-fill" style={{ width: `${client.progress}%` }} />
                                    </div>
                                    <span>{client.progress}%</span>
                                </td>
                                <td>
                                    <span className="status">{client.status}</span>
                                </td>
                                <td>
                                    <div className="actions">
                                        <button
                                            className="view-btn"
                                            onClick={() => navigate(`/clients/${client.id}`)}
                                            aria-label={`View ${client.name}`}
                                        >
                                            View
                                        </button>
                                        <button
                                            className="edit-btn"
                                            onClick={() => {
                                                setSelectedClient(client);
                                                setEditOpen(true);
                                            }}
                                            aria-label={`Edit ${client.name}`}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="delete-btn"
                                            onClick={() => {
                                                setClientToDelete(client);
                                                setDeleteOpen(true);
                                            }}
                                            aria-label={`Delete ${client.name}`}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            <ClientDrawer open={openDrawer} client={selectedClient} onClose={() => setOpenDrawer(false)} />

            <DeleteClientModal
                open={deleteOpen}
                clientName={clientToDelete?.name || ""}
                onClose={() => setDeleteOpen(false)}
                onDelete={() => {
                    const deletedName = clientToDelete?.name;
                    const deletedId = clientToDelete?.id;
                    const previousList = clientList;

                    setClientList((prev) => prev.filter((c) => c.id !== deletedId));
                    setDeleteOpen(false);

                    toast(
                        (t) => (
                            <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                {deletedName} deleted
                                <button
                                    onClick={() => {
                                        setClientList(previousList);
                                        toast.dismiss(t.id);
                                    }}
                                    style={{
                                        background: "#8B5CF6",
                                        border: "none",
                                        color: "white",
                                        padding: "4px 10px",
                                        borderRadius: "6px",
                                        fontSize: "12px",
                                        cursor: "pointer",
                                    }}
                                >
                                    Undo
                                </button>
                            </span>
                        ),
                        { duration: 4000 }
                    );
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
                            item.id === (updatedClient as unknown as Client).id ? (updatedClient as unknown as Client) : item
                        )
                    );
                    setEditOpen(false);
                    setSelectedClient(null);
                    toast.success(`${(updatedClient as unknown as Client).name ?? "Client"} updated`);
                }}
            />
        </div>
    );
};

export default Clients;