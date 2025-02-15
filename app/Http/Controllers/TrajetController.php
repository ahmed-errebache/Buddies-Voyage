<?php

namespace App\Http\Controllers;

use App\Models\Trajet;
use App\Models\TrajetRequest;
use App\Models\Message;
use App\Http\Requests\StoreTrajetRequest;
use App\Http\Requests\UpdateTrajetRequest;
use App\Http\Resources\TrajetResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TrajetController extends Controller
{
    /**
     * Afficher la liste des trajets.
     */
    public function index()
    {
        $trajets = Trajet::with('user')
            ->orderBy('departure_date', 'desc')
            ->orderBy('departure_time', 'desc')
            ->paginate(12);

        return inertia('Trajet/Index', [
            "trajets" => TrajetResource::collection($trajets),
        ]);
    }

    /**
     * Afficher le formulaire de création de trajet.
     */
    public function create()
    {
        return inertia('Trajet/Create');
    }

    /**
     * Enregistrer un nouveau trajet.
     */
    public function store(Request $request)
    {
        if (!Auth::check()) {
            return redirect()->back()->withErrors(['error' => 'Vous devez être connecté pour ajouter un trajet.']);
        }

        $validated = $request->validate([
            'departure_station' => 'required|string|max:255',
            'arrival_station' => 'required|string|max:255',
            'departure_date' => 'required|date|after:today',
            'departure_time' => 'required',
            'message' => 'nullable|string|max:500',
            'available_seats' => 'required|integer|min:1',
        ]);

        Trajet::create([
            'user_id' => Auth::id(),
            'departure_station' => $validated['departure_station'],
            'arrival_station' => $validated['arrival_station'],
            'departure_date' => $validated['departure_date'],
            'departure_time' => $validated['departure_time'],
            'message' => $validated['message'] ?? null,
            'available_seats' => $validated['available_seats'],
        ]);

        return redirect()->route('trajet.index')->with('success', 'Trajet ajouté avec succès !');
    }

    /**
     * Modifier le trajet.
     */
    public function edit(Trajet $trajet)
    {
        return inertia('Trajet/Edit', [
            'trajet' => new TrajetResource($trajet),
            'id' => $trajet->id,
        ]);
    }

    public function update(UpdateTrajetRequest $request, Trajet $trajet)
    {
        if ($trajet->user_id !== Auth::id()) {
            abort(403, 'Vous n’êtes pas autorisé à modifier ce trajet.');
        }

        $trajet->update($request->validated());

        return redirect()->route('trajet.index')->with('success', 'Trajet mis à jour avec succès.');
    }

    /**
     * Supprimer un trajet.
     */
    public function destroy(Trajet $trajet)
    {
        if (Auth::id() !== $trajet->user_id) {
            abort(403, 'Vous n\'êtes pas autorisé à supprimer ce trajet.');
        }

        $trajet->delete();

        return redirect()->route('trajet.index')->with('success', 'Trajet supprimé avec succès.');
    }

    /**
     * Envoyer une demande pour rejoindre un trajet.
     */
    public function join(Request $request, Trajet $trajet)
    {
        $user = Auth::user();

        if ($trajet->available_seats < 1) {
            return redirect()->back()->with('error', 'Ce trajet est complet.');
        }

        if ($trajet->requests()->where('user_id', $user->id)->where('status', 'pending')->exists()) {
            return redirect()->back()->with('error', 'Vous avez déjà envoyé une demande.');
        }

        // Créer une demande d'adhésion
        $trajetRequest = TrajetRequest::create([
            'user_id' => $user->id,
            'trajet_id' => $trajet->id,
            'owner_id' => $trajet->user_id,
            'status' => 'pending',
        ]);

        // Envoyer un message automatique au créateur du trajet
        Message::create([
            'sender_id' => $user->id,
            'receiver_id' => $trajet->user_id,
            'content' => "Demande d'adhésion au trajet {$trajet->departure_station} → {$trajet->arrival_station}. Accepter ou rejeter ?",
            'type' => 'trajet_request',
            'trajet_request_id' => $trajetRequest->id,
        ]);

        return redirect()->back()->with('success', 'Votre demande a été envoyée.');
    }

    /**
     * Répondre à une demande de trajet.
     */
    public function respondToRequest(Request $request, TrajetRequest $trajetRequest)
    {
        $user = Auth::user();

        if ($trajetRequest->owner_id !== $user->id) {
            abort(403, 'Action non autorisée.');
        }

        $request->validate([
            'action' => 'required|in:accept,reject',
        ]);

        if ($request->action === 'accept') {
            if ($trajetRequest->trajet->available_seats < 1) {
                return redirect()->back()->with('error', 'Le trajet est complet.');
            }

            $trajetRequest->update(['status' => 'accepted']);

            // Ajouter l'utilisateur au trajet
            $trajetRequest->trajet->participants()->attach($trajetRequest->user_id);
            $trajetRequest->trajet->decrement('available_seats');

            // Notification de confirmation
            Message::create([
                'sender_id' => $user->id,
                'receiver_id' => $trajetRequest->user_id,
                'content' => "Votre demande a été acceptée ! Vous pouvez maintenant discuter avec votre compagnon de voyage.",
                'type' => 'confirmation',
            ]);
        } else {
            $trajetRequest->update(['status' => 'rejected']);

            Message::create([
                'sender_id' => $user->id,
                'receiver_id' => $trajetRequest->user_id,
                'content' => "Votre demande a été refusée.",
                'type' => 'rejection',
            ]);
        }

        return redirect()->back()->with('success', 'Réponse envoyée.');
    }
}
