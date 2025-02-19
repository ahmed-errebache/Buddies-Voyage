<?php

use App\Http\Controllers\{
    ProfileController,
    MessageController,
    TrajetController,
    UserController,
    PostsController
};
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Routes protégées par 'auth' et 'verified'
Route::middleware(['auth', 'verified'])->group(function () {
    
    // Dashboard
    Route::get('/dashboard', fn () => Inertia::render('Dashboard'))->name('dashboard');

    // Routes pour les trajets
    Route::prefix('trajets')->controller(TrajetController::class)->group(function () {
        Route::get('/', 'index')->name('trajet.index');
        Route::get('/create', 'create')->name('trajet.create');
        Route::post('/', 'store')->name('trajets.store');
        Route::get('/{trajet}/edit', 'edit')->name('trajet.edit');
        Route::put('/{trajet}', 'update')->name('trajet.update');
        Route::post('/trajets/{trajet}/join', [TrajetController::class, 'join'])->name('trajet.join');
        Route::post('/trajets/request/{trajetRequest}/respond', [TrajetController::class, 'respondToRequest'])->name('trajet.request.respond');        
        Route::delete('/{trajet}', 'destroy')->name('trajet.delete');
    });
    Route::middleware(['auth'])->group(function () {
        Route::get('/messages', [MessageController::class, 'index'])->name('messages.index');
        Route::post('/trajets/{trajet}/join', [MessageController::class, 'sendRequest'])->name('trajet.join');
        Route::post('/messages/{message}/respond', [MessageController::class, 'respondRequest'])->name('trajet.request.respond');
    });
    // Routes pour les autres ressources
    Route::resources([
        'posts' => PostsController::class,
        'messages' => MessageController::class,
        'users' => UserController::class, 
    ]);

    // Routes pour le profil utilisateur
    Route::prefix('profile')->controller(ProfileController::class)->group(function () {
        Route::get('/', 'edit')->name('profile.edit');
        Route::patch('/', 'update')->name('profile.update');
        Route::delete('/', 'destroy')->name('profile.destroy');
    });
});

// Redirection par défaut vers le dashboard
Route::redirect('/', '/dashboard');

require __DIR__.'/auth.php';
