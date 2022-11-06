<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rule extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function symptom()
    {
        return $this->belongsTo('App\Models\Symptom', 'gejala_id', 'id');
    }

    public function disease()
    {
        return $this->belongsTo('App\Models\Disease', 'penyakit_id', 'id');
    }
}
