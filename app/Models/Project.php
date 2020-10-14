<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $fillable = ['prj_name', 'client_id', 'user_id', 'task_id'];
}
