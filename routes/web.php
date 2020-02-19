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

Route::get('/', function () {
    return view('coins/index');
});

Route::get('/news', function () {
    return view('coins/news');
});

Auth::routes();

Route::get('/portfolio', 'HomeController@index')->name('portfolio');

Route::get('/mycoins', function() {
    $data = \App\Coin::select('coin_id', 'count')->where('owner_id', auth()->id())->get();
    
    $data = \App\Coin::select('coin_id', 'count')->get();

    return $data;
});
