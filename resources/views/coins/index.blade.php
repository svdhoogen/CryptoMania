@extends('layout')

@section('index')active @endsection

@section('content')
    <div class="row justify-content-center overflow-hidden" id="root">
        <cointable></cointable>
        
        <coinmodal @guest loggedin="false" @else loggedin="true" @endif></coinmodal>
    </div>
@endsection