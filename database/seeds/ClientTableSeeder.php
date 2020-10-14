<?php

use Illuminate\Database\Seeder;

class ClientTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('clients')->truncate();
        DB::table('clients')->insert([
            [
                'clnt_name' => "Hitachi",
            ],
            [
                'clnt_name' => "Fujitsu",
            ],
            [
                'clnt_name' => "Rakuten",
            ],
            [
                'clnt_name' => "Samurai",
            ],
            [
                'clnt_name' => "Sony",
            ],
        ]);
    }
}
