<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Project;
use Illuminate\Support\Facades\Storage;

class ProjectController extends Controller
{
    public function index()
    {
        $projects = Project::with('images')
            ->latest()
            ->get();
        return response()->json($projects);
    }

    public function show($id)
    {
        $project = Project::with('images')
            ->findOrFail($id);

        return response()->json($project);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'project_type' => 'required|string|max:255',
            'location' => 'nullable|string|max:255',
            'date' => 'nullable|date',
            'main_image' => 'required|image'
        ]);

        $mainImagePath = $request
            ->file('main_image')
            ->store('projects/main', 'public');

        $project = Project::create([
            'name' => $validated['name'],
            'description' => $validated['description'] ?? null,
            'project_type' => $validated['project_type'],
            'location' => $validated['location'] ?? null,
            'date' => $validated['date'] ?? null,
            'main_image' => $mainImagePath,
        ]);
        
        return response()->json([
            'message' => 'Project created successfully',
            'project' => $project->load('images')
        ], 201);
    }

    public function update(Request $request, $id) 
    {
        $project = Project::findOrFail($id);

        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'project_type' => 'sometimes|required|string|max:255',
            'location' => 'nullable|string|max:255',
            'date' => 'nullable|date',
            'main_image' => 'nullable|image',
        ]);

        if ($request->hasFile('main_image')) {
            
            if ($project->main_image && Storage::disk('public')->exists($project->main_image)) {
                Storage::disk('public')->delete($project->main_image);
            }
        
            $mainImagePath = $request
                ->file('main_image')
                ->store('projects/main', 'public');

            $validated['main_image'] = $mainImagePath;
        }

        $project->update($validated);

        return response()->json([
            'message' => 'Project updated successfully',
            'project' => $project->load('images')
        ]);
    }

    public function destroy($id)
    {
        $project = Project::with('images')
            ->findOrFail($id);

        if (
            $project->main_image &&
            Storage::disk('public')->exists($project->main_image)
        ) {
            Storage::disk('public')->delete($project->main_image);
        }

        foreach ($project->images as $image) {

            if (
                Storage::disk('public')->exists($image->image_path)
            ) {
                Storage::disk('public')->delete($image->image_path);
            }
        }

        $project->delete();

        return response()->json([
            'message' => 'Project deleted successfully'
        ]);
    }
}