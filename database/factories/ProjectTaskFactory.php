<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\ProjectTask;
use Faker\Generator as Faker;

$factory->define(ProjectTask::class, function (Faker $faker) {
    return [
        'project_id' =>function () {
            return \App\Models\Project::all()->random();
        },
        'client_id' =>function () {
            return \App\Models\Client::all()->random();
        },
        'user_id' =>function () {
            return \App\Models\User::all()->random();
        },
        'task_id' =>function () {
            return \App\Models\Task::all()->random();
        },
    ];
});
