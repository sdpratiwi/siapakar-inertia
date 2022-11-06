<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Symptom extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function rule()
    {
        return $this->hasMany('App\Models\Rule', 'gejala_id', 'id');
    }
}
