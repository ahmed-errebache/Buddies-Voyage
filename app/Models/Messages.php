<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Messages extends Model
{
    use HasFactory;

    protected $fillable = [
        'sender_id',
        'receiver_id',
        'trajet_id',
        'trajet_request_id',
        'content',
        'status',
        'type',
    ];

    const STATUSES = ['pending', 'accepted', 'rejected'];

    protected $attributes = [
        'status' => 'pending',
    ];

    protected $casts = [
        'sender_id' => 'integer',
        'receiver_id' => 'integer',
        'trajet_id' => 'integer',
        'trajet_request_id' => 'integer',
    ];

    public function sender()
    {
        return $this->belongsTo(User::class, 'sender_id');
    }


    public function receiver()
    {
        return $this->belongsTo(User::class, 'receiver_id');
    }

    public function trajet()
    {
        return $this->belongsTo(Trajet::class);
    }


    public function trajetRequest()
    {
        return $this->belongsTo(TrajetRequest::class);
    }

    /**
     * Filtrer les messages en attente.
     */
    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }
}
