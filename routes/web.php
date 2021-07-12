<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

//Route::get('/', function (){return view('welcome');});

Route::get('/home','App\Http\Controllers\HomeController@index');
Route::get('/about','App\Http\Controllers\AboutController@index');
Route::get('/contactus','App\Http\Controllers\ContactUsController@index');

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
Route::get('admin/dashboard', 'App\Http\Controllers\Admin\HomeController@dashboard')->name('admin.dashboard');

Route::get('admin/post/list', 'App\Http\Controllers\Admin\PostController@index')->name('admin.post.list');

//Add data
Route::get('admin/post/add', 'App\Http\Controllers\Admin\PostController@create')->name('admin.post.add');
Route::post('admin/post/store', 'App\Http\Controllers\Admin\PostController@store')->name('admin.post.store');

//Edit data
Route::get('admin/post/edit/{id}', 'App\Http\Controllers\Admin\PostController@edit')->name('admin.post.edit');
