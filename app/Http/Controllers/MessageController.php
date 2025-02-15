<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Models\Trajet;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class MessageController extends Controller
{
    /**
     * Affiche les messages de l'utilisateur connecté.
     */
    public function index()
    {
        $user = Auth::user();

        $messages = Message::where('sender_id', $user->id)
            ->orWhere('receiver_id', $user->id)
            ->with('trajet')
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Message/Index', [
            'messages' => $messages,
        ]);
    }

    /**
     * Envoie une demande pour rejoindre un trajet.
     */
    public function sendRequest(Request $request, Trajet $trajet)
    {
        $user = Auth::user();

        if ($trajet->user_id === $user->id) {
            return back()->with('error', 'Vous ne pouvez pas rejoindre votre propre trajet.');
        }

        if ($trajet->available_seats < 1) {
            return back()->with('error', 'Ce trajet est complet.');
        }

        // Vérifier si une demande existe déjà
        $existingRequest = Message::where([
            ['sender_id', $user->id],
            ['receiver_id', $trajet->user_id],
            ['trajet_id', $trajet->id],
            ['status', 'pending'],
        ])->exists();

        if ($existingRequest) {
            return back()->with('error', 'Vous avez déjà envoyé une demande.');
        }

        // Créer une demande
        Message::create([
            'sender_id' => $user->id,
            'receiver_id' => $trajet->user_id,
            'content' => "Demande d'adhésion au trajet {$trajet->departure_station} → {$trajet->arrival_station}.",
            'status' => 'pending',
            'trajet_id' => $trajet->id,
        ]);

        return back()->with('success', 'Votre demande a été envoyée.');
    }

    /**
     * Répond à une demande.
     */
    public function respondRequest(Request $request, Message $message)
    {
        $request->validate([
            'status' => 'required|in:accepted,rejected',
        ]);

        if ($message->receiver_id !== Auth::user()->id) {
            return back()->with('error', 'Vous ne pouvez pas répondre à cette demande.');
        }

        // Vérifier si le trajet est encore disponible avant d'accepter la demande
        if ($request->status === 'accepted' && $message->trajet->available_seats < 1) {
            return back()->with('error', 'Le trajet est complet, impossible d’accepter.');
        }

        // Mettre à jour le statut
        $message->update([
            'status' => $request->status,
        ]);

        if ($request->status === 'accepted') {
            // Réduire le nombre de places disponibles
            $message->trajet->decrement('available_seats');
        }

        return back()->with('success', 'Réponse envoyée.');
    }
}
