<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>@yield('title', 'Crypto Mania')</title>

    <meta name="format-detection" content="telephone=no"/>

    <link rel="stylesheet" href="/css/app.css">

    <!-- Bootstrap CSS -->
    {{-- <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous"> --}}
</head>
<body>
    <nav class="navbar navbar-expand-lg navbar-dark bg-success mb-3">
        <a class="navbar-brand" href="/">Crypto Mania</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item @yield('index', '')">
                    <a class="nav-link" href="/">Crypto table</a>
                </li>
                <li class="nav-item @yield('news', '')">
                    <a class="nav-link" href="/news">Crypto news</a>
                </li>
                @guest
                @else
                <li class="nav-item @yield('portfolio', '')">
                    <a class="nav-link" href="/portfolio">My crypto portfolio</a>
                </li>
                @endif
            </ul>
            <!-- Right Side Of Navbar -->
            <ul class="navbar-nav ml-auto">
                <!-- Authentication Links -->
                @guest
                    <li class="nav-item @yield('login', '')">
                        <a class="nav-link" href="/login">Login</a>
                    </li>
                    <li class="nav-item @yield('register', '')">
                        <a class="nav-link" href="/register">Register</a>
                    </li>
                @else
                    <li class="nav-item">
                        <a class="nav-link" href="/logout"onclick="event.preventDefault(); document.getElementById('logout-form').submit();">Logout</a>
                    </li>
                    <form id="logout-form" class="hidden" action="/logout" method="POST">
                        @csrf
                    </form>
                @endguest
            </ul>
        </div>
    </nav>

    <div @yield('fluid', ' class=container')>
        @yield('content', 'Whoops! No content found!')
    </div>

    <script src="/js/manifest.js"></script>
    <script src="/js/vendor.js"></script>
    <script src="/js/app.js"></script>
</body>
</html>
