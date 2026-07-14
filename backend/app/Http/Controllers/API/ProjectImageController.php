<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\ProjectImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProjectImageController extends Controller
{
    public function store(Request $request, $projectId)
    {
        $project = Project::findOrFail($projectId);

        $validated = $request->validate([
            'file' => 'required|image',
            'zone' => 'nullable|string|max:255',
        ]);

        $imagePath = $request
            ->file('file')
            ->store('projects/gallery', 'public');

        $image = ProjectImage::create([
            'project_id' => $project->id,
            'image_path' => $imagePath,
            'zone' => $validated['zone'] ?? null,
            'sort_order' => 0
        ]);

        return response()->json([
            'message' => 'Image uploaded successfully',
            'image' => $image
        ], 201);
    }

    public function update(Request $request, $projectId, $imageId)
    {
        $image = ProjectImage::where('id', $imageId)
            ->where('project_id', $projectId)
            ->firstOrFail();

        $validated = $request->validate([
            'zone' => 'nullable|string|max:255',
            'sort_order' => 'nullable|integer',
        ]);

        $image->update($validated);

        return response()->json([
            'message' => 'Image updated successfully',
            'image' => $image
        ]);
    }

    public function replaceImage(Request $request, $projectId, $imageId)
    {
        $image = ProjectImage::where('id', $imageId)
            ->where('project_id', $projectId)
            ->firstOrFail();

        $validated = $request->validate([
            'file' => 'required|image',
        ]);

        if ($image->image_path && Storage::disk('public')->exists($image->image_path)) {
            Storage::disk('public')->delete($image->image_path);
        }

        $newImagePath = $request
            ->file('file')
            ->store('projects/gallery', 'public');

        $image->update(['image_path' => $newImagePath]);

        return response()->json([
            'message' => 'Image replaced successfully',
            'image' => $image
        ]);
    }

    public function destroy($projectId, $imageId)
    {
        $image = ProjectImage::findOrFail($imageId);

        if ($image->image_path && Storage::disk('public')->exists($image->image_path)) {
            Storage::disk('public')->delete($image->image_path);
        }

        $image->delete();

        return response()->json([
            'message' => 'Image deleted successfully'
        ]);
    }
}
