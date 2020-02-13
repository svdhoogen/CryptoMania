@extends('layout')

@section('content')
    <div class="row justify-content-center overflow-hidden" id="root">
        <div class="col-md-12">
            <cointable source="{{ asset('images/loading.gif') }}"></cointable>
        </div>
    </div>
@endsection