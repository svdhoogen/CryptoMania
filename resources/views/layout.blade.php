<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>@yield('title', 'Crypto Mania')</title>

    <link rel="stylesheet" href="/css/app.css">

    <!-- Bootstrap core CSS -->
    <link href = {{ asset("bootstrap/css/bootstrap.css") }} rel="stylesheet" />

    <!-- Custom styles for this template -->
    <link href = {{ asset("bootstrap/css/sticky-footer-navbar.css") }} rel="stylesheet" />

    <!-- Optional theme -->
    <link rel="stylesheet" href="{{ asset('bootstrap/css/bootstrap-theme.min.css') }}">
</head>
<body>
    <!-- Navbar -->
    <nav class="navbar col-md navbar-dark bg-dark navbar-expand-lg sticky-top mb-2">
        <div class="container">
            <!-- Site logo/ brand -->

            <!-- Toggler/collapsibe Button -->

            <!-- Navbar links -->

    <div @yield('fluid', ' class=container')>
        @yield('content', 'Whoops! No content found!')
    </div>

    <script src="/js/manifest.js"></script>
    <script src="/js/vendor.js"></script>
    <script src="/js/app.js"></script>
</body>
</html>
