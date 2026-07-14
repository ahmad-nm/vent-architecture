<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\ProjectImage;

class AdminDashboardController extends Controller
{
    public function stats()
    {
        return response()->json([
            // Metrics
            'total_projects' => Project::count(),
            'total_images' => ProjectImage::count(),

            // Recent Projects (latest uploads - by ProjectImage created_at)
            'latest_uploads' => ProjectImage::with('project')
                ->latest('created_at')
                ->take(5)
                ->get()
                ->map(fn($image) => [
                    'id' => $image->id,
                    'project_name' => $image->project?->name,
                    'project_id' => $image->project_id,
                    'image_path' => $image->image_path,
                    'uploaded_at' => $image->created_at,
                    'type' => 'upload'
                ]),

            // Latest Edits (by Project updated_at)
            'latest_edits' => Project::latest('updated_at')
                ->take(5)
                ->get()
                ->map(fn($project) => [
                    'id' => $project->id,
                    'name' => $project->name,
                    'edited_at' => $project->updated_at,
                    'type' => 'edit'
                ])
        ]);
    }
}
