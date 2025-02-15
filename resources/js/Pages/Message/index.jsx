import { router } from "@inertiajs/react";
import { useState } from "react";

function MessagesList({ messages }) {
  const [loading, setLoading] = useState(null);

  function handleResponse(messageId, status) {
    if (!confirm(`Êtes-vous sûr de vouloir ${status === "accepted" ? "accepter" : "rejeter"} cette demande ?`)) {
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
    <div className="space-y-4">
      {messages.map((message) => (
        <div key={message.id} className="p-4 border rounded bg-white shadow">
          <p>{message.content}</p>

          {message.status === "pending" && (
            <div className="flex space-x-2 mt-2">
              <button
                onClick={() => handleResponse(message.id, "accepted")}
                className={`px-4 py-2 text-white rounded ${
                  loading === message.id ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"
                }`}
                disabled={loading === message.id}
              >
                Accepter
              </button>
              <button
                onClick={() => handleResponse(message.id, "rejected")}
                className={`px-4 py-2 text-white rounded ${
                  loading === message.id ? "bg-gray-400 cursor-not-allowed" : "bg-red-500 hover:bg-red-600"
                }`}
                disabled={loading === message.id}
              >
                Rejeter
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default MessagesList;
