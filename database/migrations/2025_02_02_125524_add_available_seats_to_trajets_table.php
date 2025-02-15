<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::table('trajets', function (Blueprint $table) {
            $table->integer('available_seats')->default(1); // Ajout de la colonne avec une valeur par défaut
        });
    }
    
    public function down()
    {
        Schema::table('trajets', function (Blueprint $table) {
            $table->dropColumn('available_seats');
        });
    }
    
};
