<?php

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
 */

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });
Route::get('/v1/users', 'Api\V1\UserController@index');
Route::get('/v1/users/add', 'Api\V1\UserController@createUser');
Route::post('/v1/user/create', 'Api\V1\UserController@store');
Route::get('/v1/user/edit/{id}', 'Api\V1\UserController@edit');
Route::post('/v1/user/update/{id}', 'Api\V1\UserController@update');
Route::delete('/v1/user/delete/{id}', 'Api\V1\UserController@delete');

Route::get('/v1/tasks', 'Api\V1\TaskController@index');
Route::get('/v1/tasks/edit/{id}', 'Api\V1\TaskController@edit');
Route::post('/v1/tasks/update/{id}', 'Api\V1\TaskController@update');
Route::delete('/v1/tasks/delete/{id}', 'Api\V1\TaskController@delete');

Route::get('/v1/projects', 'Api\V1\ProjectController@index');
Route::post('/v1/project/create', 'Api\V1\ProjectController@store');
Route::get('/v1/project/edit/{id}', 'Api\V1\ProjectController@edit');
Route::post('/v1/project/update/{id}', 'Api\V1\ProjectController@update');
Route::delete('/v1/project/delete/{id}', 'Api\V1\ProjectController@delete');

Route::get('/v1/clients', 'Api\V1\ClientController@index');
Route::post('/v1/client/create', 'Api\V1\ClientController@store');
Route::get('/v1/client/edit/{id}', 'Api\V1\ClientController@edit');
Route::post('/v1/client/update/{id}', 'Api\V1\ClientController@update');
Route::delete('/v1/client/delete/{id}', 'Api\V1\ClientController@delete');
Route::post('/v1/store', 'Api\V1\TaskController@storeItem');
Route::get('/v1/user_under_clients', 'Api\V1\ClientController@userUnderClients');
Route::get('/v1/user_under_projects', 'Api\V1\ProjectController@userUnderProjects');
Route::get('/v1/projects_under-users', 'Api\V1\UserController@projectsUnderUsers');
Route::get('/v1/all_mondays_week', 'Api\V1\WeekController@getAllMondays');
Route::get('/v1/weekly_client_total_count', 'Api\V1\WeekController@weeklyClientTotal');
Route::get('/v1/weekly_client_user_prfmnc', 'Api\V1\WeekController@weeklyClientWiseUserPerfomance');
Route::get('/v1/weekly_project_total_count', 'Api\V1\WeekController@weeklyProjectTotal');
Route::get('/v1/weekly_project_user_prfmnc', 'Api\V1\WeekController@weeklyProjeectWiseUserPerfomance');
Route::get('/v1/weekly_user_total_count', 'Api\V1\WeekController@weeklyUserTotal');
Route::get('/v1/weekly_user_project_prfmnc', 'Api\V1\WeekController@weeklyUserWiseProjectPerfomance');
Route::get('/v1/all_months', 'Api\V1\MonthController@getAllMonths');
Route::get('/v1/monthly_client_total_count', 'Api\V1\MonthController@monthlyClientTotal');
Route::get('/v1/monthly_client_user_perfmnc_totl', 'Api\V1\MonthController@monthlyClientUsrPerfmncTotal');
Route::get('/v1/monthly_project_total_count', 'Api\V1\MonthController@monthlyProjectTotal');
Route::get('/v1/monthly_project_user_perfmnc_totl', 'Api\V1\MonthController@monthlyProjetcUsrPerfmncTotal');
Route::get('/v1/monthly_user_total_count', 'Api\V1\MonthController@monthlyUserTotal');
Route::get('/v1/monthly_user_prjct_perfmnc_totl', 'Api\V1\MonthController@monthlyUsrPrjctPerfmncTotal');
