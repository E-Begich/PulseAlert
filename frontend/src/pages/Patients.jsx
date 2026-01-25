import React from "react";

const patients = [
  {
    id: "001",
    firstName: "Ivana",
    lastName: "Horvat",
    oib: "12345678901",
    email: "ivana.horvat@pulsealert.hr",
    phone: "+385 91 234 5678",
  },
  {
    id: "002",
    firstName: "Marko",
    lastName: "Kovač",
    oib: "98765432109",
    email: "marko.kovac@pulsealert.hr",
    phone: "+385 98 765 4321",
  },
  {
    id: "003",
    firstName: "Ana",
    lastName: "Babić",
    oib: "45678912345",
    email: "ana.babic@pulsealert.hr",
    phone: "+385 99 111 2222",
  },
];

export default function Patients() {
  return (
    <div className="bg-blue-700/60 rounded-xl shadow-lg p-6 text-white">
      <h2 className="text-lg font-semibold mb-4">Pacijenti</h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-blue-600/60 text-left">
              <th className="px-3 py-2 rounded-tl-lg">
                <input type="checkbox" />
              </th>
              <th className="px-3 py-2">ID</th>
              <th className="px-3 py-2">Ime</th>
              <th className="px-3 py-2">Prezime</th>
              <th className="px-3 py-2">OIB</th>
              <th className="px-3 py-2">E-mail</th>
              <th className="px-3 py-2 rounded-tr-lg">Telefon</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((p, index) => (
              <tr
                key={p.id}
                className={`border-b border-blue-600/40 hover:bg-blue-600/40 transition ${
                  index % 2 === 0 ? "bg-blue-700/40" : "bg-blue-700/20"
                }`}
              >
                <td className="px-3 py-2">
                  <input type="checkbox" />
                </td>
                <td className="px-3 py-2">{p.id}</td>
                <td className="px-3 py-2">{p.firstName}</td>
                <td className="px-3 py-2">{p.lastName}</td>
                <td className="px-3 py-2">{p.oib}</td>
                <td className="px-3 py-2">{p.email}</td>
                <td className="px-3 py-2">{p.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center mt-4 text-xs text-blue-200">
        <span>1–{patients.length} od {patients.length}</span>
        <div className="flex items-center gap-2">
          <span>Rows per page:</span>
          <select className="bg-blue-800 text-white rounded px-2 py-1">
            <option>5</option>
            <option>10</option>
            <option>25</option>
          </select>
        </div>
      </div>
    </div>
  );
}
