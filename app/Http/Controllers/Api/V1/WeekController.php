<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Carbon\Carbon;
use DB;

class WeekController extends Controller
{
    public function getAllMondays()
    {
        $tblStartDate = DB::table('tasks')->min('start_date');
        $tblEndDate = DB::table('tasks')->max('end_date');
        $date = strtotime($tblStartDate);
        $endDateLast = strtotime($tblEndDate);
        $startDatePrev = strtotime("-7 day", $date);
        $endDate = strtotime("+0 day", $endDateLast);
        $mondays = [];
        $startDate = Carbon::parse($startDatePrev)->next(Carbon::SUNDAY);
        $endDate = Carbon::parse($endDate)->next(Carbon::SUNDAY);
        while ($startDate->lte($endDate)) {
            $mondays[] = $startDate->format('Y-m-d');

            $startDate->addWeek();
        }
        $mondays = json_decode(json_encode($mondays), false);

        return $mondays;
    }

    public function weeklyClientTotal()
    {
        $data = DB::select(DB::raw("SELECT FROM_DAYS(TO_DAYS(tasks.start_date) -MOD(TO_DAYS(tasks.end_date) -1, 7)) AS week_beginning,
                                            ROUND (((SUM(tasks.perfomance_rate)) / 100),1) AS Amount,
                                            COUNT(project_tasks.user_id) AS Count,
                                            project_tasks.client_id,
                                            clients.clnt_name
                                            FROM project_tasks JOIN tasks ON project_tasks.task_id =tasks.id
                                            JOIN clients ON project_tasks.client_id =clients.id
                                            GROUP BY week_beginning ASC, project_tasks.client_id ASC
                                            ORDER BY  STR_TO_DATE(week_beginning,'%M %d, %Y') ASC,project_tasks.client_id"));

        $data = collect($data)->sortBy('week_beginning ASC')->all();
        $data = collect($data)->groupBy(function ($item) {
            return $item->clnt_name;
        });

        return response()->json($data);
    }
    public function weeklyClientWiseUserPerfomance()
    {
        $data = DB::select(DB::raw("SELECT FROM_DAYS(TO_DAYS(project_tasks.created_at) -MOD(TO_DAYS(project_tasks.created_at) -1, 7)) AS week_beginning,
                                    project_tasks.client_id,
                                    project_tasks.user_id,
                                    project_tasks.task_id,
                                    tasks.perfomance_rate,
                                    users.firstname,
                                    clients.clnt_name
                                    FROM project_tasks JOIN tasks ON project_tasks.task_id =tasks.id
                                    JOIN clients ON project_tasks.client_id =clients.id
                                    JOIN users ON project_tasks.user_id =users.id
                                    GROUP BY week_beginning ASC,project_tasks.user_id ASC,project_tasks.client_id ASC,project_tasks.task_id
                                    ORDER BY STR_TO_DATE(week_beginning,'%M %d, %Y') ASC,project_tasks.client_id
        "));
        $data = collect($data)->groupBy(function ($item) {
            return $item->clnt_name;
        });

        return response()->json($data);
    }
    public function weeklyProjectTotal()
    {
        $data = DB::select(DB::raw("SELECT FROM_DAYS(TO_DAYS(tasks.start_date) -MOD(TO_DAYS(tasks.end_date) -1, 7)) AS week_beginning,
                                    ROUND (((SUM(tasks.perfomance_rate)) / 100),1) AS Amount,
                                    COUNT(project_tasks.user_id) AS Count,
                                    project_tasks.project_id,
                                    projects.prj_name
                                    FROM project_tasks JOIN tasks ON project_tasks.task_id =tasks.id
                                    JOIN projects ON project_tasks.project_id =projects.id
                                    JOIN users ON project_tasks.user_id =users.id
                                    GROUP BY week_beginning ASC,project_tasks.project_id ASC
                                    ORDER BY  STR_TO_DATE(week_beginning,'%M %d, %Y') ASC,project_tasks.project_id"));

        $data = collect($data)->sortBy('week_beginning ASC')->all();
        $data = collect($data)->groupBy(function ($item) {
            return $item->prj_name;
        });

        return response()->json($data);
    }
    public function weeklyProjeectWiseUserPerfomance()
    {
        $data = DB::select(DB::raw("SELECT FROM_DAYS(TO_DAYS(project_tasks.created_at) -MOD(TO_DAYS(project_tasks.created_at) -1, 7)) AS week_beginning,
                                    project_tasks.project_id,
                                    project_tasks.user_id,
                                    project_tasks.task_id,
                                    tasks.perfomance_rate,
                                    users.firstname,
                                    projects.prj_name
                                    FROM project_tasks JOIN tasks ON project_tasks.task_id =tasks.id
                                    JOIN projects ON project_tasks.project_id =projects.id
                                    JOIN users ON project_tasks.user_id =users.id
                                    GROUP BY week_beginning ASC,project_tasks.user_id ASC,project_tasks.project_id ASC,project_tasks.task_id
                                    ORDER BY STR_TO_DATE(week_beginning,'%M %d, %Y') ASC,project_tasks.project_id
        "));
        $data = collect($data)->groupBy(function ($item) {
            return $item->prj_name;
        });

        return response()->json($data);
    }
    public function weeklyUserTotal()
    {
        $data = DB::select(DB::raw("SELECT FROM_DAYS(TO_DAYS(tasks.start_date) -MOD(TO_DAYS(tasks.end_date) -1, 7)) AS week_beginning,
                                    ROUND (((SUM(tasks.perfomance_rate)) / 100),1) AS Amount,
                                    COUNT(project_tasks.user_id) AS Count,
                                    project_tasks.user_id,
                                    users.firstname
                                    FROM project_tasks JOIN tasks ON project_tasks.task_id =tasks.id
                                    JOIN projects ON project_tasks.project_id =projects.id
                                    JOIN users ON project_tasks.user_id =users.id
                                    GROUP BY week_beginning ASC,project_tasks.user_id ASC
                                    ORDER BY  STR_TO_DATE(week_beginning,'%M %d, %Y') ASC,project_tasks.user_id ASC"));

        $data = collect($data)->sortBy('week_beginning ASC')->all();
        $data = collect($data)->groupBy(function ($item) {
            return $item->firstname;
        });

        return response()->json($data);
    }
    public function weeklyUserWiseProjectPerfomance()
    {
        $data = DB::select(DB::raw("SELECT FROM_DAYS(TO_DAYS(project_tasks.created_at) -MOD(TO_DAYS(project_tasks.created_at) -1, 7)) AS week_beginning,
                                    project_tasks.project_id,
                                    project_tasks.user_id,
                                    project_tasks.task_id,
                                    tasks.perfomance_rate,
                                    users.firstname,
                                    projects.prj_name
                                    FROM project_tasks JOIN tasks ON project_tasks.task_id =tasks.id
                                    JOIN projects ON project_tasks.project_id =projects.id
                                    JOIN users ON project_tasks.user_id =users.id
                                    GROUP BY week_beginning ASC,project_tasks.user_id ASC,project_tasks.project_id ASC,project_tasks.task_id
                                    ORDER BY STR_TO_DATE(week_beginning,'%M %d, %Y') ASC,project_tasks.user_id
        "));
        $data = collect($data)->groupBy(function ($item) {
            return $item->firstname;
        });

        return response()->json($data);
    }
}
