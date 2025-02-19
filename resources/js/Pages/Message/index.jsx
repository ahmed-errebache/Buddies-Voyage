import { router } from "@inertiajs/react";
import { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link } from "@inertiajs/react";

function MessagesList({ auth, messages }) {
  const [loading, setLoading] = useState(null);

  function handleResponse(messageId, status) {
    if (
      !confirm(
        `Êtes-vous sûr de vouloir ${
          status === "accepted" ? "accepter" : "rejeter"
        } cette demande ?`
      )
    ) {
      return;
    }

    setLoading(messageId); // Désactive les boutons pour éviter le spam

    router
      .post(route("trajet.request.respond", { messageId }), { status })
      .then(() => setLoading(null))
      .catch((error) => {
        console.error("Erreur :", error);
        setLoading(null);
      });
  }

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
      <div className="space-y-4">
        {messages.length > 0 ? (
          messages.map((msg) => (
            <div key={msg.id} className="bg-gray-800 p-4 rounded-lg mb-2 text-gray-200">
              <p>
                <strong>{msg.sender ? msg.sender.name : "Utilisateur inconnu"}</strong>{" "}
                vous a envoyé une demande pour rejoindre le trajet :
              </p>
              <p className="text-blue-400">
                {msg.trajet.departure_station} → {msg.trajet.arrival_station}
              </p>
              <p className="text-sm text-gray-400">{msg.content}</p>
              
              {msg.status === "pending" && (
                <div className="flex space-x-2 mt-2">
                  <button
                    onClick={() => handleResponse(msg.id, "accepted")}
                    className={`px-4 py-2 text-white rounded ${
                      loading === msg.id
                        ? "bg-gray-600 cursor-not-allowed"
                        : "bg-green-500 hover:bg-green-600"
                    }`}
                    disabled={loading === msg.id}
                  >
                    Accepter
                  </button>
                  <button
                    onClick={() => handleResponse(msg.id, "rejected")}
                    className={`px-4 py-2 text-white rounded ${
                      loading === msg.id
                        ? "bg-gray-600 cursor-not-allowed"
                        : "bg-red-500 hover:bg-red-600"
                    }`}
                    disabled={loading === msg.id}
                  >
                    Refuser
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-400">Aucune demande reçue.</p>
        )}
      </div>
    </AuthenticatedLayout>
  );
}

export default MessagesList;
