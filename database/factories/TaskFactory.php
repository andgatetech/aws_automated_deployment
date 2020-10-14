<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Task;
use Faker\Generator as Faker;

$factory->define(Task::class, function (Faker $faker) {
    return [
        'task_name' => $faker->name,
        'start_date' => now(),
        'end_date' => now(),
        'perfomance_rate' => $faker->numberBetween(1, 100),
    ];
});
