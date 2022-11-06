<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Disease extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function rule()
    {
        return $this->hasMany('App\Models\Rule', 'id', 'penyakit_id');
    }
}
