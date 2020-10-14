<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Carbon\Carbon;
use Carbon\CarbonPeriod;
use DateInterval;
use DatePeriod;
use DateTime;
use DB;


class MonthController extends Controller
{
    public function getAllMonths()
    {
        $tblStartDate = DB::table('tasks')->min('start_date');
        $tblEndDate = DB::table('project_tasks')->max('created_at');
        $date = strtotime($tblStartDate);
        $endDateLast = strtotime($tblEndDate);
        $startDatePrev = strtotime("-7 day", $date);
        $endDate = strtotime("+0 day", $endDateLast);
        $startDate = Carbon::parse($startDatePrev)->next(Carbon::SUNDAY); 
        $endDate = Carbon::parse($endDate)->next(Carbon::SUNDAY);

        $startDate = new DateTime($startDate->toDateTimeString());
        $endDate = new DateTime($endDate->toDateTimeString()); 
        $interval = DateInterval::createFromDateString('0 month');
        $period = new DatePeriod($startDate, $interval, $endDate); 

        $period = CarbonPeriod::create($startDate, '1 month', $endDate);

        $months = [];

        foreach ($period as $dt) {
            $months[] = $dt->format("F Y");
        }

        return $months;
    }

    public function monthlyClientTotal()
    {
        $data = DB::select(DB::raw("SELECT YEAR(project_tasks.created_at) AS YEAR,
                                    MONTHNAME(project_tasks.created_at) AS month,
                                    ROUND (((SUM(tasks.perfomance_rate)) / 100),1) AS Amount,
                                    COUNT(project_tasks.user_id) AS Count,
                                    project_tasks.client_id,
                                    clients.clnt_name
                                    FROM project_tasks JOIN tasks ON project_tasks.task_id =tasks.id
                                    JOIN clients ON project_tasks.client_id =clients.id
                                    GROUP BY year, month,project_tasks.client_id ASC
                                    ORDER BY year, month,project_tasks.client_id ASC
"));

        $data = collect($data)->sortBy('month ASC')->all();
        $data = collect($data)->groupBy(function ($item) {
            return $item->clnt_name;
        });

        return response()->json($data);
    }
    public function monthlyClientUsrPerfmncTotal()
    {
        $data = DB::select(DB::raw("SELECT year(project_tasks.created_at) AS year,
                                    MONTHNAME(project_tasks.created_at) AS month,
                                    ROUND ((SUM(tasks.perfomance_rate)),1) AS Amount,
                                    project_tasks.client_id,
                                    clients.clnt_name,
                                    project_tasks.user_id,
                                    project_tasks.task_id,
                                    tasks.perfomance_rate,
                                    users.firstname
                                    FROM project_tasks JOIN tasks ON project_tasks.task_id =tasks.id
                                    JOIN clients ON project_tasks.client_id =clients.id
                                    JOIN users ON project_tasks.user_id =users.id
                                    GROUP BY year, month,project_tasks.user_id ASC,project_tasks.client_id ASC,project_tasks.task_id
                                    ORDER BY year, month,project_tasks.client_id ASC
"));

        $data = collect($data)->sortBy('month ASC')->all();
        $data = collect($data)->groupBy(function ($item) {
            return $item->clnt_name;
        });

        return response()->json($data);
    }

    public function monthlyProjectTotal()
    {
        $data = DB::select(DB::raw("SELECT YEAR(project_tasks.created_at) AS YEAR,
                                    MONTHNAME(project_tasks.created_at) AS month,
                                    ROUND (((SUM(tasks.perfomance_rate)) / 100),1) AS Amount,
                                    COUNT(project_tasks.user_id) AS Count,
                                    project_tasks.project_id,
                                    projects.prj_name
                                    FROM project_tasks JOIN tasks ON project_tasks.task_id =tasks.id
                                    JOIN projects ON project_tasks.project_id =projects.id
                                    GROUP BY year, month,project_tasks.project_id ASC
                                    ORDER BY year, month,project_tasks.project_id ASC
"));

        $data = collect($data)->sortBy('month ASC')->all();
        $data = collect($data)->groupBy(function ($item) {
            return $item->prj_name;
        });

        return response()->json($data);
    }
    public function monthlyProjetcUsrPerfmncTotal()
    {
        $data = DB::select(DB::raw("SELECT year(project_tasks.created_at) AS year,
                                    MONTHNAME(project_tasks.created_at) AS month,
                                    ROUND ((SUM(tasks.perfomance_rate)),1) AS Amount,
                                    project_tasks.project_id,
                                    projects.prj_name,
                                    project_tasks.user_id,
                                    project_tasks.task_id,
                                    tasks.perfomance_rate,
                                    users.firstname
                                    FROM project_tasks JOIN tasks ON project_tasks.task_id =tasks.id
                                    JOIN clients ON project_tasks.client_id =clients.id
                                    JOIN users ON project_tasks.user_id =users.id
                                    JOIN projects ON project_tasks.project_id =projects.id
                                    GROUP BY year, month,project_tasks.user_id ASC,project_tasks.project_id ASC,project_tasks.task_id
                                    ORDER BY year, month,project_tasks.project_id ASC
"));

        $data = collect($data)->sortBy('month ASC')->all();
        $data = collect($data)->groupBy(function ($item) {
            return $item->prj_name;
        });

        return response()->json($data);
    }

    public function monthlyUserTotal()
    {
        $data = DB::select(DB::raw("SELECT YEAR(project_tasks.created_at) AS YEAR,
                                    MONTHNAME(project_tasks.created_at) AS month,
                                    ROUND (((SUM(tasks.perfomance_rate)) / 100),1) AS Amount,
                                    COUNT(project_tasks.user_id) AS Count,
                                    project_tasks.user_id,
                                    users.firstname
                                    FROM project_tasks JOIN tasks ON project_tasks.task_id =tasks.id
                                    JOIN projects ON project_tasks.project_id =projects.id
                                    JOIN users ON project_tasks.user_id =users.id
                                    GROUP BY year, month,project_tasks.user_id ASC
                                    ORDER BY year, month,project_tasks.user_id ASC
"));

        $data = collect($data)->sortBy('month ASC')->all();
        $data = collect($data)->groupBy(function ($item) {
            return $item->firstname;
        });

        return response()->json($data);
    }
    public function monthlyUsrPrjctPerfmncTotal()
    {
        $data = DB::select(DB::raw("SELECT year(project_tasks.created_at) AS year,
                                    MONTHNAME(project_tasks.created_at) AS month,
                                    ROUND ((SUM(tasks.perfomance_rate)),1) AS Amount,
                                    project_tasks.project_id,
                                    project_tasks.user_id,
                                    project_tasks.task_id,
                                    tasks.perfomance_rate,
                                    users.firstname,
                                    projects.prj_name
                                    FROM project_tasks JOIN tasks ON project_tasks.task_id =tasks.id
                                    JOIN users ON project_tasks.user_id =users.id
                                    JOIN projects ON project_tasks.project_id =projects.id
                                    GROUP BY year, month,project_tasks.user_id ASC,project_tasks.project_id ASC,project_tasks.task_id
                                    ORDER BY year, month,project_tasks.user_id ASC
"));

        $data = collect($data)->sortBy('month ASC')->all();
        $data = collect($data)->groupBy(function ($item) {
            return $item->firstname;
        });

        return response()->json($data);
    }
}
