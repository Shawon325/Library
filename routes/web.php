<?php

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

// use Illuminate\Routing\Route;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('Backend.index');
});

Route::resource('category', 'BookCategoryController');
Route::get('category/edit/{id}', 'BookCategoryController@edit');

Route::get('{ReactRoutePath}', function () {
    return view('Backend.index');
})->where('ReactRoutePath', '.*');
