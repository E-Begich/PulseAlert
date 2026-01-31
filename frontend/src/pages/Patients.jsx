import { useState, useEffect } from "react";
import { Trash2, Edit, Plus, X } from "lucide-react";

export default function Patients() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPatients, setSelectedPatients] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newPatient, setNewPatient] = useState({
    first_name: "",
    last_name: "",
    oib: "",
    address: "",
    postal_code: "",
    city: "",
    phone: "",
    gender: "",
  });

  const [editModal, setEditModal] = useState(false);
  const [editPatient, setEditPatient] = useState(null);

  const [deleteModal, setDeleteModal] = useState(false);
  const [patientsToDelete, setPatientsToDelete] = useState([]);


  const pageSize = 20;

  // Fetch pacijenata
  useEffect(() => {
    const fetchPatients = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:5000/api/getAllPatients", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        console.log(data); // <--- ovo provjeri

        setPatients(data || []); // <-- sigurnosna provjera
      } catch (err) {
        console.error(err);
        setPatients([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  // Filtriranje po search
  const filteredPatients = (patients || []).filter(
    (p) =>
      p.first_name.toLowerCase().includes(search.toLowerCase()) ||
      p.last_name.toLowerCase().includes(search.toLowerCase()) ||
      (p.oib && p.oib.includes(search))
  );

  // Pagination
  const totalPages = Math.ceil(filteredPatients.length / pageSize);
  const paginatedPatients = filteredPatients.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Selektirani pacijenti
  const toggleSelect = (id) => {
    setSelectedPatients((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    const selectableIds = paginatedPatients.filter(p => !p.hasInvoice).map(p => p.patient_id);
    const allSelected = selectableIds.every(id => selectedPatients.includes(id));

    if (allSelected) {
      setSelectedPatients(prev => prev.filter(id => !selectableIds.includes(id)));
    } else {
      setSelectedPatients(prev => [...new Set([...prev, ...selectableIds])]);
    }
  };




  // Dodaj novog pacijenta
  const addPatient = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/addPatient", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(newPatient),
      });
      const data = await res.json();
      setPatients((prev) => [...prev, data]);
      setShowModal(false);
      setNewPatient({
        first_name: "",
        last_name: "",
        oib: "",
        address: "",
        postal_code: "",
        city: "",
        phone: "",
        gender: "",
      });
    } catch (err) {
      console.error(err);
      alert("Greška prilikom dodavanja pacijenta");
    }
  };

  const openEditModal = (patient) => {
    setEditPatient({ ...patient }); // kopiramo podatke pacijenta
    setEditModal(true);
  };

  // Funkcija za spremanje izmjena
  const saveEditPatient = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:5000/api/updatePatient/${editPatient.patient_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editPatient),
      });
      const data = await res.json();

      // Update state-a pacijenata
      setPatients((prev) =>
        prev.map((p) => (p.patient_id === editPatient.patient_id ? data : p))
      );

      setEditModal(false);
      setEditPatient(null);
    } catch (err) {
      console.error(err);
      alert("Greška prilikom uređivanja pacijenta");
    }
  };

  const openDeleteModal = (patient) => {
    setPatientsToDelete([patient]);
    setDeleteModal(true);
  };

  const openDeleteSelectedModal = () => {
    const toDelete = patients.filter(p => selectedPatients.includes(p.patient_id));
    setPatientsToDelete(toDelete);
    setDeleteModal(true);
  };

  // Brisanje jednog pacijenta
  const confirmDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      const successfullyDeleted = [];
      const failedToDelete = [];

      for (const p of patientsToDelete) {
        const res = await fetch(`http://localhost:5000/api/deletePatient/${p.patient_id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        if (res.ok) {
          successfullyDeleted.push(p.patient_id);
        } else {
          failedToDelete.push({ name: `${p.first_name} ${p.last_name}`, reason: data.message });
        }
      }

      // Update state samo za uspješno obrisane
      setPatients(prev => prev.filter(p => !successfullyDeleted.includes(p.patient_id)));
      setSelectedPatients(prev => prev.filter(id => !successfullyDeleted.includes(id)));
      setDeleteModal(false);
      setPatientsToDelete([]);

      // Prikaz poruka za one koji nisu obrisani
      if (failedToDelete.length > 0) {
        const messages = failedToDelete.map(p => `${p.name}: ${p.reason}`).join("\n");
        alert(`Neki pacijenti nisu obrisani:\n${messages}`);
      }

    } catch (err) {
      console.error(err);
      alert("Greška prilikom brisanja pacijenata");
    }
  };




  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Pretraži pacijente po imenu, prezimenu ili OIB-u..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-3 py-2 rounded border border-gray-300 w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={() => setShowModal(true)} // <-- ovo je bitno
          className="flex items-center gap-2 bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800"
        >
          <Plus size={18} /> Dodaj novog pacijenta
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg w-96 p-6 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>
            <h2 className="text-xl font-semibold mb-4">Dodaj novog pacijenta</h2>
            <form onSubmit={addPatient} className="space-y-2 max-h-[70vh] overflow-y-auto">
              <input
                required
                placeholder="Ime"
                value={newPatient.first_name}
                onChange={(e) => setNewPatient({ ...newPatient, first_name: e.target.value })}
                className="w-full px-3 py-2 border rounded"
              />
              <input
                required
                placeholder="Prezime"
                value={newPatient.last_name}
                onChange={(e) => setNewPatient({ ...newPatient, last_name: e.target.value })}
                className="w-full px-3 py-2 border rounded"
              />
              <input
                required
                placeholder="OIB"
                value={newPatient.oib}
                onChange={(e) => setNewPatient({ ...newPatient, oib: e.target.value })}
                className="w-full px-3 py-2 border rounded"
              />
              <input
                placeholder="Adresa"
                value={newPatient.address}
                onChange={(e) => setNewPatient({ ...newPatient, address: e.target.value })}
                className="w-full px-3 py-2 border rounded"
              />
              <input
                placeholder="Poštanski broj"
                value={newPatient.postal_code}
                onChange={(e) => setNewPatient({ ...newPatient, postal_code: e.target.value })}
                className="w-full px-3 py-2 border rounded"
              />
              <input
                placeholder="Mjesto"
                value={newPatient.city}
                onChange={(e) => setNewPatient({ ...newPatient, city: e.target.value })}
                className="w-full px-3 py-2 border rounded"
              />
              <input
                placeholder="Broj telefona"
                value={newPatient.phone}
                onChange={(e) => setNewPatient({ ...newPatient, phone: e.target.value })}
                className="w-full px-3 py-2 border rounded"
              />
              <select
                required
                value={newPatient.gender}
                onChange={(e) => setNewPatient({ ...newPatient, gender: e.target.value })}
                className="w-full px-3 py-2 border rounded"
              >
                <option value="">Odaberi spol</option>
                <option value="M">Muški</option>
                <option value="Ž">Ženski</option>
              </select>
              <button
                type="submit"
                className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800 mt-2"
              >
                Spremi
              </button>
            </form>
          </div>
        </div>
      )}

      {editModal && editPatient && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg w-96 p-6 relative">
            <button
              onClick={() => setEditModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>
            <h2 className="text-xl font-semibold mb-4">Uredi pacijenta</h2>
            <form onSubmit={saveEditPatient} className="space-y-2 max-h-[70vh] overflow-y-auto">
              <input
                required
                placeholder="Ime"
                value={editPatient.first_name}
                onChange={(e) => setEditPatient({ ...editPatient, first_name: e.target.value })}
                className="w-full px-3 py-2 border rounded"
              />
              <input
                required
                placeholder="Prezime"
                value={editPatient.last_name}
                onChange={(e) => setEditPatient({ ...editPatient, last_name: e.target.value })}
                className="w-full px-3 py-2 border rounded"
              />
              <input
                required
                placeholder="OIB"
                value={editPatient.oib}
                onChange={(e) => setEditPatient({ ...editPatient, oib: e.target.value })}
                className="w-full px-3 py-2 border rounded"
              />
              <input
                placeholder="Adresa"
                value={editPatient.address}
                onChange={(e) => setEditPatient({ ...editPatient, address: e.target.value })}
                className="w-full px-3 py-2 border rounded"
              />
              <input
                placeholder="Poštanski broj"
                value={editPatient.postal_code}
                onChange={(e) => setEditPatient({ ...editPatient, postal_code: e.target.value })}
                className="w-full px-3 py-2 border rounded"
              />
              <input
                placeholder="Mjesto"
                value={editPatient.city}
                onChange={(e) => setEditPatient({ ...editPatient, city: e.target.value })}
                className="w-full px-3 py-2 border rounded"
              />
              <input
                placeholder="Broj telefona"
                value={editPatient.phone}
                onChange={(e) => setEditPatient({ ...editPatient, phone: e.target.value })}
                className="w-full px-3 py-2 border rounded"
              />
              <select
                required
                value={editPatient.gender}
                onChange={(e) => setEditPatient({ ...editPatient, gender: e.target.value })}
                className="w-full px-3 py-2 border rounded"
              >
                <option value="">Odaberi spol</option>
                <option value="M">Muški</option>
                <option value="Ž">Ženski</option>
              </select>
              <button
                type="submit"
                className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800 mt-2"
              >
                Spremi izmjene
              </button>
            </form>
          </div>
        </div>
      )}

      {deleteModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg w-96 p-6 relative">
            <button
              onClick={() => setDeleteModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>
            <h2 className="text-xl font-semibold mb-4">
              Potvrda brisanja
            </h2>
            <p className="mb-4">
              Jeste li sigurni da želite obrisati {patientsToDelete.length} pacijenta/pacijente?
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setDeleteModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Odustani
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Obriši
              </button>
            </div>
          </div>
        </div>
      )}


      {selectedPatients.length > 0 && (
        <div className="mb-2">
          {selectedPatients.length > 0 && (
            <div className="mb-2">
              <button
                onClick={openDeleteSelectedModal}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                Obriši odabrane ({selectedPatients.length})
              </button>
            </div>
          )}

        </div>
      )}

      <div className="overflow-x-auto border rounded">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">
                <input
                  type="checkbox"
                  checked={paginatedPatients.length > 0 && paginatedPatients.every(p => selectedPatients.includes(p.patient_id))}
                  onChange={toggleSelectAll}
                />

              </th>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Ime</th>
              <th className="px-4 py-2">Prezime</th>
              <th className="px-4 py-2">OIB</th>
              <th className="px-4 py-2">Adresa</th>
              <th className="px-4 py-2">Poštanski broj</th>
              <th className="px-4 py-2">Mjesto</th>
              <th className="px-4 py-2">Broj telefona</th>
              <th className="px-4 py-2">Spol</th>
              <th className="px-4 py-2">Akcije</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="11" className="text-center p-4">
                  Učitavanje pacijenata...
                </td>
              </tr>
            ) : paginatedPatients.length === 0 ? (
              <tr>
                <td colSpan="11" className="text-center p-4">
                  Nema pacijenata
                </td>
              </tr>
            ) : (
              paginatedPatients.map((p) => (
                <tr key={p.patient_id} className="border-b hover:bg-gray-50 divide-y">
                  <td className="px-4 py-2 text-center">
                    <input
                      type="checkbox"
                      checked={selectedPatients.includes(p.patient_id)}
                      onChange={() => toggleSelect(p.patient_id)}
                      disabled={p.hasInvoice} // ako pacijent ima račun, ne može se odabrati
                    />
                  </td>
                  <td className="px-4 py-2">{p.patient_id}</td>
                  <td className="px-4 py-2">{p.first_name}</td>
                  <td className="px-4 py-2">{p.last_name}</td>
                  <td className="px-4 py-2">{p.oib}</td>
                  <td className="px-4 py-2">{p.address}</td>
                  <td className="px-4 py-2">{p.postal_code}</td>
                  <td className="px-4 py-2">{p.city}</td>
                  <td className="px-4 py-2">{p.phone}</td>
                  <td className="px-4 py-2">{p.gender}</td>
                  <td className="px-4 py-2 flex gap-2">
                    {/* Uredi */}
                    <button
                      onClick={() => openEditModal(p)}
                      className="flex items-center gap-1 px-2 py-1 border border-blue-600 rounded hover:bg-blue-600 hover:text-white transition"
                    >
                      <Edit size={16} />
                      <span>Uredi</span>
                    </button>

                    {/* Gumb Obriši */}
                    <button
                      onClick={() => openDeleteModal(p)}
                      className={`flex items-center gap-1 px-2 py-1 border rounded transition 
    ${p.hasInvoice ? 'border-gray-400 text-gray-400 cursor-not-allowed' : 'border-red-600 hover:bg-red-600 hover:text-white'}`}
                      disabled={p.hasInvoice} // <-- onemogućeno ako ima invoice
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
      </div>

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
  );
}
