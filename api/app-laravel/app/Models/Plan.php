<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Plan extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'name',
        'updates',
        'digital_midia',
        'printed',
        'presentations',
        'videos',
    ];

    public function users(): HasMany
    {
        return $this->hasMany(User::class);
    }
}
