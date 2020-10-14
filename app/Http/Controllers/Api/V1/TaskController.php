<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\ProjectTask;
use App\Models\Task;
use DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class TaskController extends Controller
{
    public function index()
    {
        $data = Task::get();
        return response()->json($data);
    }

    public function storeItem(Request $request)
    {
        $users = $request->input('users');
        log::info($users);
        $applicants = $request->input('task');
        log::info($applicants);
        DB::beginTransaction();

        try {
            foreach ($applicants as $kapp => $vapp) {
                Log::info('start: insertion: individual task');
                log::info($kapp);
                log::info($vapp);
                $task = new Task;
                $task->task_name = $vapp['task_name'];
                $task->start_date = date('Y-m-d H:i:s', strtotime($vapp['start_date']));
                $task->end_date = date('Y-m-d H:i:s', strtotime($vapp['end_date']));
                $task->perfomance_rate = $vapp['amount'];
                $task->save();
                Log::info('end: insert: individual task');
                Log::info('task Id' . $task->id);

                foreach ($users as $k => $v) {
                    Log::info('start: insertion: project task');
                    log::info($k);
                    log::info($v['value']);
                    $projectTask = new ProjectTask;
                    $projectTask->project_id = $request->projects[0];
                    $projectTask->client_id = $request->clients[0];
                    $projectTask->user_id = $v['value'];
                    $projectTask->task_id = $task->id;
                    $projectTask->save();
                    Log::info('end: insert: project task');
                }
            }

            DB::commit();
        } catch (\Exception $e) {
            DB::rollback();
            Log::error('TaskController.storeitem : save error');
            Log::error($e->getMessage());
            return response()->json('Task Saved Failed');
        }
    }

    public function edit($id)
    {
        $task = Task::find($id);
        return response()->json($task);
    }

    public function update($id, Request $request)
    {
        $task = Task::find($id);
        $task->update($request->all());
        return response()->json('successfully updated');
    }


    public function delete($id)
    {
        $task = Task::find($id);
        $task->delete();
        return response()->json('successfully deleted');
    }
}
