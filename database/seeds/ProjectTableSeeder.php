<?php

use Illuminate\Database\Seeder;

class ProjectTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('projects')->truncate();
        DB::table('projects')->insert([
            [
                'prj_name' => "Happiness",
            ],
            [
                'prj_name' => "Carcon",
            ],
            [
                'prj_name' => "Ecooly",
            ],
            [
                'prj_name' => "Growbeans",
            ],
            [
                'prj_name' => "Logomaker",
            ],
        ]);
    }
}
