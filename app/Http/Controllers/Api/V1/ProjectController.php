<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Project;
use App\Models\ProjectTask;

class ProjectController extends Controller
{
    public function index()
    {
        $data = Project::get();
        return response()->json($data);
    }

    public function store(Request $request)
    {
        $project = new Project([
            'prj_name' => $request->get('prj_name')
        ]);
        $project->save();
        return response()->json(($project->id));
    }

    public function edit($id)
    {
        $project = Project::find($id);
        return response()->json($project);
    }

    public function update($id, Request $request)
    {
        $project = Project::find($id);
        $project->update($request->all());
        return response()->json('successfully updated');
    }

    public function delete($id)
    {
        $project = Project::find($id);
        $project->delete();
        return response()->json('successfully deleted');
    }
    public function userUnderProjects()
    {
        $data = Projecttask::
            join('users', 'project_tasks.user_id', 'users.id')
            ->join('projects', 'project_tasks.project_id', 'projects.id')
            ->orderBy('project_id')->get()->groupBy(function ($item) {
                return $item->prj_name;
            });

        $data = $data->map(function ($array) {
            return collect($array)->unique('user_id')->all();
        });
        $data = json_decode(json_encode($data));
        return response()->json($data);
        
        //return view('check')->with('data', $data);
    }
}
