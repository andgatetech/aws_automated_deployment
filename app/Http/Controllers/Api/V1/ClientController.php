<?php

namespace App\Http\Controllers\Api\V1;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Client;
use App\Models\ProjectTask;

class ClientController extends Controller
{
    public function index()
    {
        $data = Client::get();
        return response()->json($data);
    }

    public function store(Request $request)
    {
        $client = new Client([
            'clnt_name' => $request->get('clnt_name'),
        ]);
        $client->save();
        return response()->json($client->id);
    }

    public function edit($id)
    {
        $client = Client::find($id);
        return response()->json($client);
    }

    public function update($id, Request $request)
    {
        $client = Client::find($id);
        $client->update($request->all());
        return response()->json('successfully updated');
    }

    public function delete($id)
    {
        $client = Client::find($id);
        $client->delete();
        return response()->json('successfully deleted');
    }
    public function userUnderClients()
    {
        $data = Projecttask::
            join('users', 'project_tasks.user_id', 'users.id')
            ->join('clients', 'project_tasks.client_id', 'clients.id')
            ->orderBy('client_id')->get()->groupBy(function ($item) {
                return $item->clnt_name;
            });
        $data = $data->map(function ($array) {
            return collect($array)->unique('user_id')->all();
        });
        $data = json_decode(json_encode($data));
        return response()->json($data);
        //return view('check')->with('data', $data);
    }
}
