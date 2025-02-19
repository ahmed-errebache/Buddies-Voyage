import Pagination from "@/Components/Pagination";
import Swal from "sweetalert2";
import { router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import {
  FaMapMarkerAlt,
  FaClock,
  FaUser,
  FaComments,
  FaSearch,
  FaFilter,
  FaCity,
  FaCalendarAlt,
  FaClock as FaClockIcon,
  FaChair,
} from "react-icons/fa";
import { useState, useEffect, useCallback } from "react";
import TextInput from "@/Components/TextInput";
import SelectInput from "@/Components/SelectInput";
import Checkbox from "@/Components/Checkbox";

export default function Index({ auth, trajets }) {
  const [trajetsList, setTrajetsList] = useState(trajets.data);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [filters, setFilters] = useState({
    departureStation: "",
    arrivalStation: "",
    departureDate: "",
    departureTime: "",
    availableSeats: "",
    isExpired: false,
  });

  const handleSearch = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  const handleFilterChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: type === "checkbox" ? checked : value,
    }));
  }, []);

  const filteredTrajets = trajets.data.filter((trajet) => {
    return (
      (trajet.departure_station
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
        trajet.arrival_station
          .toLowerCase()
          .includes(searchTerm.toLowerCase())) &&
      (!filters.departureStation ||
        trajet.departure_station === filters.departureStation) &&
      (!filters.arrivalStation ||
        trajet.arrival_station === filters.arrivalStation) &&
      (!filters.departureDate ||
        trajet.departure_date === filters.departureDate) &&
      (!filters.departureTime ||
        trajet.departure_time.includes(filters.departureTime)) &&
      (!filters.availableSeats ||
        trajet.nombre_place >= filters.availableSeats) &&
      (!filters.isExpired || trajet.is_expired === !filters.isExpired)
    );
  });

  const departureStations = [
    ...new Set(trajets.data.map((t) => t.departure_station)),
  ];
  const arrivalStations = [
    ...new Set(trajets.data.map((t) => t.arrival_station)),
  ].filter((station) => station !== filters.departureStation);

  const handleExpiredChange = useCallback((e) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      isExpired: e.target.checked,
    }));
  }, []);

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
            Trouvez votre compagnon de voyage ✈️
          </h2>
          <Link
            href={route("trajet.create")}
            className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold"
          >
            + Ajouter un trajet
          </Link>
        </div>
      }
    >
      <Head title="Voyages" />

      <div className="bg-white shadow-md rounded-lg p-6 dark:bg-gray-800">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
          🔎 Rechercher un trajet
        </h3>
        <div className="flex items-center space-x-4">
          <div className="relative w-full">
            <TextInput
              type="text"
              placeholder="Rechercher par ville ou destination..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm dark:bg-gray-700 dark:border-gray-600"
            />
            <FaSearch className="absolute left-3 top-3 text-gray-500" />
          </div>
          <button
            onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
            className="px-4 py-2 flex items-center space-x-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            <FaFilter />
            <span>Recherche Avancée</span>
          </button>
        </div>

        {showAdvancedSearch && (
          <div className="mt-6">
            <h4 className="text-md font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Recherche Avancée
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              <div className="flex items-center space-x-2">
                <FaCity className="text-gray-500" />
                <SelectInput
                  options={departureStations}
                  value={filters.departureStation}
                  onChange={handleFilterChange}
                  name="departureStation"
                  label="Ville de départ"
                  className="w-full border border-gray-300 rounded-lg shadow-sm dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
              <div className="flex items-center space-x-2">
                <FaCity className="text-gray-500" />
                <SelectInput
                  options={arrivalStations}
                  value={filters.arrivalStation}
                  onChange={handleFilterChange}
                  name="arrivalStation"
                  label="Ville d’arrivée"
                  className="w-full border border-gray-300 rounded-lg shadow-sm dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
              <div className="flex items-center space-x-2">
                <FaCalendarAlt className="text-gray-500" />
                <TextInput
                  type="date"
                  name="departureDate"
                  value={filters.departureDate}
                  onChange={handleFilterChange}
                  className="w-full border border-gray-300 rounded-lg shadow-sm dark:bg-gray-700 dark:border-gray-600"
                  label="Date de départ"
                />
              </div>
              <div className="flex items-center space-x-2">
                <FaClockIcon className="text-gray-500" />
                <TextInput
                  type="time"
                  name="departureTime"
                  value={filters.departureTime}
                  onChange={handleFilterChange}
                  className="w-full border border-gray-300 rounded-lg shadow-sm dark:bg-gray-700 dark:border-gray-600"
                  label="Heure de départ"
                />
              </div>
              <div className="flex items-center space-x-2">
                <FaChair className="text-gray-500" />
                <TextInput
                  type="number"
                  name="availableSeats"
                  placeholder="Places disponibles"
                  value={filters.availableSeats}
                  onChange={handleFilterChange}
                  className="w-full border border-gray-300 rounded-lg shadow-sm dark:bg-gray-700 dark:border-gray-600"
                  label="Places disponibles"
                />
              </div>
              <div className="flex items-center space-x-2">
                <FaClock className="text-gray-500" />
                <Checkbox
                  name="isExpired"
                  checked={filters.isExpired}
                  onChange={handleExpiredChange}
                  className="h-5 w-5 text-blue-600"
                />
                <label className="text-gray-800 dark:text-gray-200">
                  Masquer les trajets expirés
                </label>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredTrajets.map((trajet) => (
              <div
                key={trajet.id}
                className={`overflow-hidden shadow-md rounded-lg transition ${
                  trajet.is_expired
                    ? "bg-black opacity-70"
                    : "bg-white dark:bg-gray-800 hover:scale-105"
                }`}
              >
                <div className="p-6 relative">
                  {trajet.is_expired && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                      <span className="text-2xl font-bold text-red-500 bg-white px-4 py-2 rounded-lg">
                        Expiré
                      </span>
                    </div>
                  )}

                  <div className="flex items-center mb-4">
                    <FaMapMarkerAlt className="text-blue-500 mr-2" />
                    <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">
                      {trajet.departure_station} → {trajet.arrival_station}
                    </h3>
                  </div>

                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 flex items-center">
                    <FaClock className="mr-2 text-green-500" />
                    Départ : {trajet.departure_date.split("T")[0]} à{" "}
                    {trajet.departure_time.slice(0, 5)}
                  </p>

                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 flex items-center">
                    <FaUser className="mr-2 text-gray-500" />
                    Proposé par : {trajet.user_name || "Anonyme"}
                  </p>

                  <div className="mt-4 flex justify-between items-center">
                    <p className="text-sm text-gray-800 font-bold dark:text-gray-200">
                      Places disponibles :
                      {trajet?.available_seats ?? "Non spécifié"}
                    </p>

                    {!trajet.is_expired ? (
                      trajet.user_id === auth.user.id ? (
                        <div className="flex space-x-2">
                          <Link
                            href={route("trajet.edit", trajet.id)}
                            className="px-4 py-2 text-sm font-medium text-white bg-yellow-600 rounded-lg hover:bg-yellow-700"
                          >
                            Modifier
                          </Link>
                          <Link
                            as="button"
                            onClick={(e) => {
                              e.preventDefault();
                              Swal.fire({
                                title:
                                  "Voulez-vous vraiment supprimer ce trajet ?",
                                icon: "warning",
                                showCancelButton: true,
                                confirmButtonColor: "#d33",
                                cancelButtonColor: "#3085d6",
                                confirmButtonText: "Oui, supprimer !",
                                cancelButtonText: "Annuler",
                              }).then((result) => {
                                if (result.isConfirmed) {
                                  router.delete(
                                    route("trajet.delete", trajet.id),
                                    {
                                      preserveScroll: true,
                                      onSuccess: () => {
                                        Swal.fire({
                                          title:
                                            "Trajet supprimé avec succès !",
                                          icon: "success",
                                          timer: 2500,
                                        });
                                      },
                                      onError: () => {
                                        Swal.fire({
                                          title:
                                            "Erreur lors de la suppression",
                                          icon: "error",
                                          timer: 2500,
                                        });
                                      },
                                    }
                                  );
                                }
                              });
                            }}
                            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
                          >
                            Supprimer
                          </Link>
                        </div>
                      ) : (
                        <Link
                          as="button"
                          onClick={(e) => {
                            e.preventDefault();
                            Swal.fire({
                              title:
                                "Envoyer une demande pour rejoindre ce trajet ?",
                              icon: "question",
                              showCancelButton: true,
                              confirmButtonColor: "#28a745",
                              cancelButtonColor: "#d33",
                              confirmButtonText: "Oui, envoyer !",
                              cancelButtonText: "Annuler",
                            }).then((result) => {
                              if (result.isConfirmed) {
                                router.post(route("trajet.join", trajet.id), {
                                  preserveScroll: true,
                                  onSuccess: () => {
                                    Swal.fire({
                                      title: "Votre demande a été envoyée !",
                                      icon: "success",
                                      timer: 2500,
                                    });
                                  },
                                  onError: (errors) => {
                                    Swal.fire({
                                      title: "Erreur",
                                      text:
                                        errors.error ||
                                        "Une erreur s'est produite.",
                                      icon: "error",
                                      timer: 2500,
                                    });
                                  },
                                });
                              }
                            });
                          }}
                          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                        >
                          Envoyer une demande
                        </Link>
                      )
                    ) : (
                      <span className="text-gray-500 text-sm font-semibold">
                        Actions indisponibles
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6">
            {trajets.meta && trajets.meta.links ? (
              <Pagination Links={trajets.meta.links} />
            ) : null}
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
