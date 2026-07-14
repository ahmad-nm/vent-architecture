<?php

use App\Http\Controllers\API\AdminDashboardController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\ProjectController;
use App\Http\Controllers\API\ProjectImageController;
use App\Http\Controllers\API\AuthController;

// Auth routes (public)
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {

    Route::post('/logout', [AuthController::class, 'logout']);

    Route::get('/admin/dashboard/stats', [AdminDashboardController::class, 'stats']);

    Route::post('/projects', [ProjectController::class, 'store']);

    Route::put('/projects/{id}', [ProjectController::class, 'update']);

    Route::delete('/projects/{id}', [ProjectController::class, 'destroy']);

    Route::post(
        '/projects/{projectId}/images',
        [ProjectImageController::class, 'store']
    );

    Route::put(
        '/projects/{projectId}/images/{imageId}',
        [ProjectImageController::class, 'update']
    );

    Route::put(
        '/projects/{projectId}/images/{imageId}/replace',
        [ProjectImageController::class, 'replaceImage']
    );

    Route::delete(
        '/projects/{projectId}/images/{imageId}',
        [ProjectImageController::class, 'destroy']
    );
});

// Project routes
Route::get('/projects', [ProjectController::class, 'index']);

Route::get('/projects/{id}', [ProjectController::class, 'show']);
