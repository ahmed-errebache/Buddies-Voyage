<?php

namespace App\Http\Controllers;

use App\Models\Messages;
use App\Models\Trajet;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class MessageController extends Controller
{
    /**
     * Affiche les message de l'utilisateur connecté.
     */
    public function index()
    {
        $user = Auth::user();

        $messages = Messages::where('receiver_id', $user->id)
            ->orWhere('sender_id', $user->id)
            ->with(['sender', 'trajet']) // 🔥 Ajoute 'sender' pour éviter l'erreur
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

        // Vérifier si l'utilisateur tente de rejoindre son propre trajet
        if ($trajet->user_id === $user->id) {
            return back()->with('error', 'Vous ne pouvez pas rejoindre votre propre trajet.');
        }

        // Vérifier si le trajet a encore des places disponibles
        if ($trajet->available_seats < 1) {
            return back()->with('error', 'Ce trajet est complet.');
        }

        // Vérifier si une demande a déjà été envoyée
        $existingRequest = Messages::where([
            ['sender_id', $user->id],
            ['receiver_id', $trajet->user_id],
            ['trajet_id', $trajet->id],
            ['status', 'pending'],
        ])->exists();

        if ($existingRequest) {
            return back()->with('error', 'Vous avez déjà envoyé une demande.');
        }

        // Créer une demande d'adhésion
        $message = Messages::create([
            'sender_id' => $user->id,
            'receiver_id' => $trajet->user_id,
            'trajet_id' => $trajet->id,
            'content' => " Demande de rejoindre le trajet **{$trajet->departure_station} → {$trajet->arrival_station}**.",
            'status' => 'pending',
        ]);

        return back()->with('success', 'Votre demande a été envoyée au créateur du trajet.');
    }


    /**
     * Répond à une demande.
     */
    public function respondRequest(Request $request, Messages $message)
    {
        $request->validate([
            'status' => 'required|in:accepted,rejected',
        ]);

        if ($message->receiver_id !== Auth::user()->id) {
            return back()->with('error', 'Vous ne pouvez pas répondre à cette demande.');
        }

        if ($request->status === 'accepted' && $message->trajet->available_seats < 1) {
            return back()->with('error', 'Le trajet est complet.');
        }

        $message->update(['status' => $request->status]);

        if ($request->status === 'accepted') {
            $message->trajet->decrement('available_seats');
        }

        return back()->with('success', 'Réponse envoyée.');
    }
}
