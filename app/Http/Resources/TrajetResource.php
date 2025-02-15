<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TrajetResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'departure_station' => $this->departure_station,
            'arrival_station' => $this->arrival_station,
            'departure_date' => $this->departure_date,
            'departure_time' => $this->departure_time,
            'message' => $this->message,
            'user_id' => $this->user_id,
            'user_name' => $this->user->name, 
            'available_seats' => (int) $this->available_seats,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'is_expired' => $this->departure_date < now()->toDateString(),
        ];
    }
}
