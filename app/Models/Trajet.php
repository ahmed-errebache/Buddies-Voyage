<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Trajet extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 
        'departure_station',
        'arrival_station',
        'departure_date',
        'departure_time',
        'message',
        'available_seats',
    ];

    protected $casts = [
        'user_id' => 'integer',
        'available_seats' => 'integer',
        'departure_date' => 'date',
        'departure_time' => 'string',
    ];

    /**
     * Relation avec l'utilisateur qui a créé le trajet.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Relation avec les demandes de participation à ce trajet.
     */
    public function requests(): HasMany
    {
        return $this->hasMany(TrajetRequest::class);
    }

    /**
     * Relation avec les utilisateurs ayant rejoint ce trajet.
     */
    public function participants(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'trajet_participants', 'trajet_id', 'user_id')
                    ->withTimestamps();
    }

    /**
     * Scope pour récupérer uniquement les trajets avec des places disponibles.
     */
    public function scopeAvailable($query)
    {
        return $query->where('available_seats', '>', 0);
    }

    /**
     * Vérifier si le trajet est complet.
     */
    public function isFull(): bool
    {
        return $this->available_seats <= 0;
    }

    /**
     * Réduire le nombre de places disponibles en toute sécurité.
     */
    public function decreaseSeats()
    {
        if (!$this->isFull()) {
            $this->decrement('available_seats');
        }
    }
}
