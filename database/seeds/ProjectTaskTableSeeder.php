<?php

use App\Models\ProjectTask;
use Illuminate\Database\Seeder;

class ProjectTaskTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('project_tasks')->truncate();
        factory(ProjectTask::class, 5)->create();
    }
}
