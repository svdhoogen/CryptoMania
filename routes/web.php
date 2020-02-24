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
    if (!auth())
        return redirect('/');

    $data = \App\Coin::select('coin_id', 'count')->where('owner_id', auth()->id())->get();

    return $data;
});

// Adds coin to user portfolio
Route::post('/mycoins', function() {
    // Check if logged in
    if (!auth())
        abort(403, 'Unauthorized');

    // Validate request
    request()->validate([
        'coin_id' => ['required', 'min:0', 'max:255'],
        'count' => ['required', 'numeric', "min:0", "not_in:0"]
    ]);

    // Get coin
    $coin = \App\Coin::where([['owner_id', auth()->id()], ['coin_id', request('coin_id')]])->first();

    // Null check
    if ($coin == null)
        return '';
    
    // Update count
    $coin->count = request('count');

    // Save changes
    $coin->save();

    // Return updated count
    return $coin->count;
});

// Returns coin count
Route::get('/mycoins/{coinId}', function($coinId) {
    // Check if logged in
    if (!auth())
        abort(403, 'Unauthorized');

    // Get coin
    $coin = \App\Coin::where([['owner_id', auth()->id()], ['coin_id', $coinId]])->first();

    // Null check
    if ($coin == null)
        return '';

    // Return coin count
    return $coin->count;
});

// Updates coin count
Route::post('/mycoins/{coinId}', function($coinId) {
    // Check if logged in
    if (!auth())
        abort(403, 'Unauthorized');

    // Validate request
    request()->validate([
        'count' => ['required', 'numeric', "min:0", "not_in:0"]
    ]);

    // Get coin
    $coin = \App\Coin::where([['owner_id', auth()->id()], ['coin_id', $coinId]])->first();

    // Null check
    if ($coin == null) {
        $coin = new \App\Coin();

        $coin['owner_id'] = auth()->id();

        $coin['coin_id'] = $coinId;
    }

    // Set count
    $coin['count'] = request('count');

    // Save updated coin
    $coin->save();

    // Return coin count
    return $coin->count;
});

// Removes coin from user's portfolio
Route::delete('/mycoins/{coinId}', function($coinId) {
    // Check if logged in
    if (!auth())
        abort(403, 'Unauthorized');

    // Get coin
    $coin = \App\Coin::where([['owner_id', auth()->id()], ['coin_id', $coinId]])->first();

    // Null check
    if ($coin == null)
        return '';

    // Delete coin
    $coin->delete();

    // Return coin id
    return $coinId;
});