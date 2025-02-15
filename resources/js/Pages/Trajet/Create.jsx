import { useState } from "react";
import Swal from "sweetalert2";
import { Head, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function TrajetCreate() {
  const { data, setData, post, processing, errors } = useForm({
    departure_station: "",
    arrival_station: "",
    departure_date: "",
    departure_time: "",
    message: "",
    available_seats: 1,
  });

  const [localProcessing, setLocalProcessing] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Vérification des données avant soumission
    if (data.departure_station === data.arrival_station) {
      Swal.fire({
        title: "Erreur",
        text: "La gare de départ et d'arrivée doivent être différentes.",
        icon: "warning",
        showConfirmButton: false,
        background: "#ffcc00",
        color: "#000",
        timer: 2500,
      });
      return;
    }

    setLocalProcessing(true);

    post(route("trajets.store"), {
      preserveScroll: true,
      onSuccess: () => {
        setLocalProcessing(false);
        Swal.fire({
          title: "Succès !",
          text: "Le trajet a été créé avec succès !",
          icon: "success",
          showConfirmButton: false,
          background: "#28a745",
          color: "#ffffff",
          timer: 2500,
        });
      },
      onError: () => {
        setLocalProcessing(false);
        Swal.fire({
          title: "Erreur",
          text: "Une erreur s'est produite lors de la création du trajet.",
          icon: "error",
          showConfirmButton: false,
          background: "#d33",
          color: "#ffffff",
          timer: 2500,
        });
      },
    });
  };

  return (
    <AuthenticatedLayout>
      <Head title="Créer un trajet" />
      <div className="max-w-4xl mx-auto bg-gray-800 p-6 rounded shadow-md text-white mt-4 mb-4">
        <h2 className="text-2xl font-semibold mb-4">Créer un nouveau trajet</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">Gare de départ</label>
            <input
              type="text"
              className="w-full border rounded p-2 bg-gray-700 text-white focus:ring focus:ring-blue-500"
              value={data.departure_station}
              onChange={(e) => setData("departure_station", e.target.value)}
              required
            />
            {errors.departure_station && (
              <p className="text-red-500">{errors.departure_station}</p>
            )}
          </div>

          <div>
            <label className="block mb-1">Gare d'arrivée</label>
            <input
              type="text"
              className="w-full border rounded p-2 bg-gray-700 text-white focus:ring focus:ring-blue-500"
              value={data.arrival_station}
              onChange={(e) => setData("arrival_station", e.target.value)}
              required
            />
            {errors.arrival_station && (
              <p className="text-red-500">{errors.arrival_station}</p>
            )}
          </div>

          <div>
            <label className="block mb-1">Date de départ</label>
            <input
              type="date"
              className="w-full border rounded p-2 bg-gray-700 text-white focus:ring focus:ring-blue-500"
              value={data.departure_date}
              onChange={(e) => setData("departure_date", e.target.value)}
              required
            />
            {errors.departure_date && (
              <p className="text-red-500">{errors.departure_date}</p>
            )}
          </div>

          <div>
            <label className="block mb-1">Heure de départ</label>
            <input
              type="time"
              className="w-full border rounded p-2 bg-gray-700 text-white focus:ring focus:ring-blue-500"
              value={data.departure_time}
              onChange={(e) => setData("departure_time", e.target.value)}
              required
            />
            {errors.departure_time && (
              <p className="text-red-500">{errors.departure_time}</p>
            )}
          </div>

          <div>
            <label className="block mb-1">Message (optionnel)</label>
            <textarea
              className="w-full border rounded p-2 bg-gray-700 text-white focus:ring focus:ring-blue-500"
              value={data.message}
              onChange={(e) => setData("message", e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-1">Nombre de places disponibles</label>
            <input
              type="number"
              className="w-full border rounded p-2 bg-gray-700 text-white focus:ring focus:ring-blue-500"
              min="1"
              value={data.available_seats}
              onChange={(e) => setData("available_seats", e.target.value)}
              required
            />
            {errors.available_seats && (
              <p className="text-red-500">{errors.available_seats}</p>
            )}
          </div>

          <button
            type="submit"
            className={`w-full px-4 py-2 rounded text-white ${
              localProcessing ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
            disabled={localProcessing}
          >
            {localProcessing ? "Ajout en cours..." : "Ajouter le trajet"}
          </button>
        </form>
      </div>
    </AuthenticatedLayout>
  );
}
