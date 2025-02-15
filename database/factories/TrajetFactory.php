<?php

namespace Database\Factories;

use App\Models\Trajet;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Trajet>
 */
class TrajetFactory extends Factory
{
    /**
     * Le modèle associé à la factory.
     */
    protected $model = Trajet::class;

    /**
     * Définition de l'état par défaut du modèle.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $stations = ['Paris','Marseille','Nice','Toulouse','Strasbourg','Bordeaux',
                    'Lille','Toulon','Grenoble','Angers','Rennes','Nantes'];

        $departure_station = $this->faker->randomElement($stations);
        $arrival_station = $this->faker->randomElement($stations);

        // Vérifier que la station d'arrivée est différente
        while ($departure_station === $arrival_station) {
            $arrival_station = $this->faker->randomElement($stations);
        }

        return [
            'user_id' => User::factory(), // Associer à un utilisateur aléatoire
            'departure_station' => $departure_station,
            'arrival_station' => $arrival_station,
            'departure_date' => $this->faker->dateTimeBetween('+1 days', '+1 year')->format('Y-m-d'),
            'departure_time' => $this->faker->time('H:i:s'),
            'available_seats' => $this->faker->numberBetween(1, 5), // Ajout du nombre de places disponibles
            'message' => $this->faker->realText(50),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
