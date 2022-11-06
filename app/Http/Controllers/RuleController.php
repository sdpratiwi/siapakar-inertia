<?php

namespace App\Http\Controllers;

use App\Models\Rule;
use Illuminate\Http\Request;

class RuleController extends Controller
{
    public function store(Request $request)
    {
      // $request->validate([
      // 'symptom_id' => 'required',
      // 'disease_id' => 'required',
      // 'value' => 'required',
      // ]);
      return request();
    }

    public function data()
    {
      return Rule::latest()->get();
    }
}
