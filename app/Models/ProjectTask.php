<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProjectTask extends Model
{
    protected $fillable = ['project_id', 'client_id', 'user_id', 'task_id'];
}
