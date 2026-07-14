<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Project;
use App\Models\ProjectImage;

class ProjectSeeder extends Seeder
{
    public function run(): void
    {
        /*
        |--------------------------------------------------------------------------
        | Project 1
        |--------------------------------------------------------------------------
        */
        $project1 = Project::create([
            'name' => 'Modern Concrete Villa',
            'description' => 'A modern residential villa focused on minimal concrete aesthetics and natural lighting.',
            'project_type' => 'Residential',
            'location' => 'Beirut, Lebanon',
            'date' => '2025-03-15',
            'main_image' => 'projects/main/villa-main.webp',
        ]);

        ProjectImage::create([
            'project_id' => $project1->id,
            'image_path' => 'projects/gallery/villa-living-room.webp',
            'zone' => 'living_room',
            'sort_order' => 0,
        ]);

        ProjectImage::create([
            'project_id' => $project1->id,
            'image_path' => 'projects/gallery/villa-kitchen.webp',
            'zone' => 'kitchen',
            'sort_order' => 1,
        ]);

        ProjectImage::create([
            'project_id' => $project1->id,
            'image_path' => 'projects/gallery/villa-bedroom.webp',
            'zone' => 'bedroom',
            'sort_order' => 2,
        ]);

        /*
        |--------------------------------------------------------------------------
        | Project 2
        |--------------------------------------------------------------------------
        */
        $project2 = Project::create([
            'name' => 'Luxury Beach House',
            'description' => 'A beachfront luxury villa combining open spaces with panoramic sea views.',
            'project_type' => 'Residential',
            'location' => 'Byblos, Lebanon',
            'date' => '2024-11-20',
            'main_image' => 'projects/main/beach-house-main.webp',
        ]);

        ProjectImage::create([
            'project_id' => $project2->id,
            'image_path' => 'projects/gallery/beach-exterior.webp',
            'zone' => 'exterior',
            'sort_order' => 0,
        ]);

        ProjectImage::create([
            'project_id' => $project2->id,
            'image_path' => 'projects/gallery/beach-pool.webp',
            'zone' => 'pool',
            'sort_order' => 1,
        ]);

        /*
        |--------------------------------------------------------------------------
        | Project 3
        |--------------------------------------------------------------------------
        */
        $project3 = Project::create([
            'name' => 'Minimal Interior Apartment',
            'description' => 'A minimalist apartment interior emphasizing warm textures and soft lighting.',
            'project_type' => 'Interior',
            'location' => 'Dubai, UAE',
            'date' => '2025-01-10',
            'main_image' => 'projects/main/apartment-main.webp',
        ]);

        ProjectImage::create([
            'project_id' => $project3->id,
            'image_path' => 'projects/gallery/apartment-living.webp',
            'zone' => 'living_room',
            'sort_order' => 0,
        ]);

        ProjectImage::create([
            'project_id' => $project3->id,
            'image_path' => 'projects/gallery/apartment-dining.webp',
            'zone' => 'dining_room',
            'sort_order' => 1,
        ]);
    }
}