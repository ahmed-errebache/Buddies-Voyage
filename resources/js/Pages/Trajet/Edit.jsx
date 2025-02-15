import { useForm } from "@inertiajs/react";
import Swal from "sweetalert2";
import { Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Edit({ trajet, id }) {
  const { data, setData, put, processing, errors } = useForm({
    departure_station: trajet.data?.departure_station || "",
    arrival_station: trajet.data?.arrival_station || "",
    departure_date: trajet.data?.departure_date || "",
    departure_time: trajet.data?.departure_time || "",
    message: trajet.data?.message || "",
    available_seats: trajet.data?.available_seats || 1,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Vérification avant soumission
    if (data.departure_station === data.arrival_station) {
      Swal.fire({
        title: "Erreur",
        text: "La gare de départ et d'arrivée doivent être différentes.",
        icon: "warning",
        background: "#ffcc00",
        color: "#000",
        timer: 2500,
      });
      return;
    }

    Swal.fire({
      title: "Voulez-vous vraiment modifier ce trajet ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#28a745",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui, modifier !",
      cancelButtonText: "Annuler",
    }).then((result) => {
      if (result.isConfirmed) {
        put(route("trajet.update", id), {
          preserveScroll: true,
          onSuccess: () => {
            Swal.fire({
              title: "Succès !",
              text: "Les modifications ont été enregistrées.",
              icon: "success",
              background: "#28a745",
              color: "#ffffff",
              timer: 2500,
            });
          },
          onError: () => {
            Swal.fire({
              title: "Erreur",
              text: "Une erreur s'est produite lors de la modification.",
              icon: "error",
              background: "#d33",
              color: "#ffffff",
              timer: 2500,
            });
          },
        });
      }
    });
  };

  return (
    <AuthenticatedLayout>
      <Head title="Modifier le trajet" />
      <div className="max-w-4xl mx-auto bg-gray-800 p-6 rounded shadow-md text-white mt-4 mb-4">
        <h2 className="text-2xl font-semibold mb-4">Modifier le trajet</h2>
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
              processing ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
            disabled={processing}
          >
            {processing ? "Mise à jour en cours..." : "Modifier le trajet"}
          </button>
        </form>
      </div>
    </AuthenticatedLayout>
  );
}
