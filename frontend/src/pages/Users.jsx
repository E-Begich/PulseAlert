import { useState, useEffect } from "react";
import { Trash2, Edit, Plus, X } from "lucide-react";

export default function Users() {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);





    const pageSize = 20;

    // Fetch users
    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem("token");
                const res = await fetch("http://localhost:5000/api/getAllUsers", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const data = await res.json();
                console.log(data); // <--- ovo provjeri

                setUsers(data || []); // <-- sigurnosna provjera
            } catch (err) {
                console.error(err);
                setUsers([]);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    // Filtriranje po search
    const filteredUsers = (users || []).filter(
        (p) =>
            p.first_name.toLowerCase().includes(search.toLowerCase()) ||
            p.last_name.toLowerCase().includes(search.toLowerCase())
    );

    // Pagination
    const totalPages = Math.ceil(filteredUsers.length / pageSize);
    const paginatedUsers = filteredUsers.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    const toggleSelect = (id) => {
        setSelectedUsers((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
        );
    };

    const toggleSelectAll = () => {
        const selectableIds = paginatedUsers.filter(p => !p.hasInvoice).map(p => p.user_id);
        const allSelected = selectableIds.every(id => selectedUsers.includes(id));

        if (allSelected) {
            setSelectedUsers(prev => prev.filter(id => !selectableIds.includes(id)));
        } else {
            setSelectedUsers(prev => [...new Set([...prev, ...selectableIds])]);
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <input
                    type="text"
                    placeholder="Pretraži korisnike po imenu ili prezimenu..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="px-3 py-2 rounded border border-gray-300 w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                    onClick={() => setShowModal(true)} // <-- ovo je bitno
                    className="flex items-center gap-2 bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800"
                >
                    <Plus size={18} /> Dodaj novog korisnika
                </button>
            </div>
            <div className="overflow-x-auto border rounded">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2">
                                <input
                                    type="checkbox"
                                    checked={paginatedUsers.length > 0 && paginatedUsers.every(p => selectedUsers.includes(p.user_id))}
                                    onChange={toggleSelectAll}
                                /> </th>
                            <th className="px-4 py-2">ID</th>
                            <th className="px-4 py-2">Ime</th>
                            <th className="px-4 py-2">Prezime</th>
                            <th className="px-4 py-2">Korisničko ime</th>
                            <th className="px-4 py-2">Email</th>
                            <th className="px-4 py-2">Uloga</th>
                            <th className="px-4 py-2">Kreirano</th>
                            <th className="px-4 py-2">Akcije</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="11" className="text-center p-4">
                                    Učitavanje korisnika...
                                </td>
                            </tr>
                        ) : paginatedUsers.length === 0 ? (
                            <tr>
                                <td colSpan="11" className="text-center p-4">
                                    Nema korisnika
                                </td>
                            </tr>
                        ) : (
                            paginatedUsers.map((p) => (
                                <tr key={p.user_id} className="border-b hover:bg-gray-50 divide-y">
                                    <td className="px-4 py-2 text-center">
                                        <input
                                            type="checkbox"
                                            checked={selectedUsers.includes(p.user_id)}
                                            onChange={() => toggleSelect(p.user_id)}
                                            disabled={p.hasInvoice}
                                        />
                                    </td>
                                    <td className="px-4 py-2">{p.user_id}</td>
                                    <td className="px-4 py-2">{p.first_name}</td>
                                    <td className="px-4 py-2">{p.last_name}</td>
                                    <td className="px-4 py-2">{p.username}</td>
                                    <td className="px-4 py-2">{p.email}</td>
                                    <td className="px-4 py-2">{p.role}</td>
                                    <td className="px-4 py-2">
                                        {p.created_at
                                            ? new Date(p.created_at).toLocaleDateString("hr-HR", {
                                                day: "2-digit",
                                                month: "2-digit",
                                                year: "2-digit"
                                            })
                                            : "-"}
                                    </td>
                                    <td className="px-4 py-2 flex gap-2">
                                         {/* Pregledaj */}
                                        <button
                                            className="flex items-center gap-1 px-2 py-1 border border-blue-600 rounded hover:bg-blue-600 hover:text-white transition"
                                        >
                                            <Edit size={16} />
                                            <span>Pregledaj</span>
                                        </button>
                                        {/* Uredi */}
                                        <button
                                            className="flex items-center gap-1 px-2 py-1 border border-blue-600 rounded hover:bg-blue-600 hover:text-white transition"
                                        >
                                            <Edit size={16} />
                                            <span>Uredi</span>
                                        </button>

                                        {/* Gumb Obriši */}
                                        <button
                                            className="flex items-center gap-1 px-2 py-1 border rounded transition border-red-600 hover:bg-red-600 hover:text-white"
                                        >
                                            <Trash2 size={16} />
                                            <span>Obriši</span>
                                        </button>

                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
                {/* Pagination */}
                <div className="flex justify-between items-center mt-4">
                    <span>
                        Stranica {currentPage} od {totalPages || 1}
                    </span>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                        >
                            Prethodna
                        </button>
                        <button
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                        >
                            Sljedeća
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}