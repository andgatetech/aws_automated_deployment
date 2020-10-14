<?php

namespace App\Http\Controllers\Api\V1;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use App\Models\ProjectTask;
use App\Models\User;

class UserController extends Controller
{
    public function index()
    {
        $data = User::get();
        return response()->json($data);
    }

    public function store(Request $request)
    {
        $user = new User([
            'firstname' => $request->get('firstname'),
            'lastname' => $request->get('lastname'),
            'status' => $request->get('status'),
            'name' => $request->get('name'),
            'email' => $request->get('email'),
            'password' => password_hash($request->get('password'), PASSWORD_BCRYPT),
        ]);
        $user->save();
        return response()->json($user->id);
    }

    public function edit($id)
    {
        $user = User::find($id);
        return response()->json($user);
    }

    public function update($id, Request $request)
    {
        $user = User::find($id);
        $request->merge(['password' => password_hash($request->get('password'), PASSWORD_BCRYPT)]);
        $user->update($request->all());
        return response()->json('successfully updated');
    }

    public function delete($id)
    {
        $user = User::find($id);
        $user->delete();
        return response()->json('successfully deleted');
    }
    public function projectsUnderUsers()
    {
        $data = Projecttask::
            join('users', 'project_tasks.user_id', 'users.id')
            ->join('projects', 'project_tasks.project_id', 'projects.id')
            ->orderBy('user_id')->get()->groupBy(function ($item) {
                return $item->firstname;
            });

        $data = $data->map(function ($array) {
            return collect($array)->unique('project_id')->all();
        });
        $data = json_decode(json_encode($data));
        return response()->json($data);
        //return view('check_2')->with('data', $data);
    }
    // public function clientsUnderUsers()
    // {
    //     $data = Projecttask::
    //         join('users', 'project_tasks.user_id', 'users.id')
    //         ->join('clients', 'project_tasks.project_id', 'clients.id')
    //         ->orderBy('client_id')->get()->groupBy(function ($item) {
    //         return $item->firstname;
    //     });

    //     // $data = $data->map(function ($array) {
    //     //     return collect($array)->unique('client_id')->all();
    //     // });
    //     $data = json_decode(json_encode($data));
    //     //return response()->json($data);
    //     return view('check_3')->with('data', $data);

    // }
}
