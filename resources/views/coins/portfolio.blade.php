@extends('layout')

@section('portfolio')active @endsection

@section('content')
    <div class="row justify-content-center overflow-hidden" id="root">
        <coinportfolio></coinportfolio>
        
        <notifications ref="notifications"></notifications>
    </div>
@endsection
