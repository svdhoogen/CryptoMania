<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Coin extends Model
{
    protected $guarded = [];

    public function owner() {
        return $this->belongsTo(User::class);
    }
}
