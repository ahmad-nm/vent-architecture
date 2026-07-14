<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\ProjectImage;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'project_type',
        'location',
        'date',
        'main_image'
    ];

    protected $casts = [
        'date' => 'date'
    ];

    public function images()
    {
        return $this->hasMany(ProjectImage::class);
    }
}