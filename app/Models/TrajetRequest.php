<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TrajetRequest extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'trajet_id', 'owner_id', 'status'];

    protected $casts = [
        'user_id' => 'integer',
        'trajet_id' => 'integer',
        'owner_id' => 'integer',
    ];

    // Constantes pour les statuts de la demande
    public const STATUS_PENDING = 'pending';
    public const STATUS_ACCEPTED = 'accepted';
    public const STATUS_REJECTED = 'rejected';

    /**
     * Relation avec l'utilisateur qui fait la demande.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Relation avec le trajet concerné.
     */
    public function trajet(): BelongsTo
    {
        return $this->belongsTo(Trajet::class);
    }

    /**
     * Scope pour récupérer uniquement les demandes en attente.
     */
    public function scopePending($query)
    {
        return $query->where('status', self::STATUS_PENDING);
    }

    /**
     * Vérifie si la demande est acceptée.
     */
    public function isAccepted(): bool
    {
        return $this->status === self::STATUS_ACCEPTED;
    }

    /**
     * Vérifie si la demande est rejetée.
     */
    public function isRejected(): bool
    {
        return $this->status === self::STATUS_REJECTED;
    }

    /**
     * Vérifie si la demande est toujours en attente.
     */
    public function isPending(): bool
    {
        return $this->status === self::STATUS_PENDING;
    }

    /**
     * Accepter la demande et réduire les places disponibles dans le trajet.
     */
    public function approve()
    {
        if ($this->isPending()) {
            $this->update(['status' => self::STATUS_ACCEPTED]);
            $this->trajet->decreaseSeats(); // Appelle la méthode `decreaseSeats()` de Trajet
        }
    }

    /**
     * Rejeter la demande.
     */
    public function reject()
    {
        if ($this->isPending()) {
            $this->update(['status' => self::STATUS_REJECTED]);
        }
    }
}
