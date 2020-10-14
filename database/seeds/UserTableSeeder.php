<?php

use Faker\Generator as Faker;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(Faker $faker)
    {
        DB::table('users')->truncate();
        DB::table('users')->insert([
            [
                'firstname' => '陽葵',
                'lastname' => '陽菜',
                'status' => $faker->numberBetween(0, 1),
                'name' => '結愛',
                'email' => $faker->unique()->safeEmail,
                'email_verified_at' => now(),
                'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
                'remember_token' => Str::random(10),
            ],
            [
                'firstname' => '咲良',
                'lastname' => '一千花',
                'status' => $faker->numberBetween(0, 1),
                'name' => '丹梨',
                'email' => $faker->unique()->safeEmail,
                'email_verified_at' => now(),
                'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
                'remember_token' => Str::random(10),
            ],
            [
                'firstname' => '冴咲',
                'lastname' => '佑泉',
                'status' => $faker->numberBetween(0, 1),
                'name' => '亜桜依',
                'email' => $faker->unique()->safeEmail,
                'email_verified_at' => now(),
                'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
                'remember_token' => Str::random(10),
            ],
            [
                'firstname' => '二湖',
                'lastname' => '蓮',
                'status' => $faker->numberBetween(0, 1),
                'name' => '大翔',
                'email' => $faker->unique()->safeEmail,
                'email_verified_at' => now(),
                'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
                'remember_token' => Str::random(10),
            ],
            [
                'firstname' => '陽翔',
                'lastname' => '湊',
                'status' => $faker->numberBetween(0, 1),
                'name' => '悠真',
                'email' => $faker->unique()->safeEmail,
                'email_verified_at' => now(),
                'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
                'remember_token' => Str::random(10),
            ],
        ]);
    }
}
