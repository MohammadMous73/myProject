<div class="container-fluid px-0">
    <nav class="navbar navbar-expand-lg navbar-light bg-light-blue">
        <a class="navbar-brand mx-5 text-white text-bold fw-bold" href="#">
            پنل مدیریت
        </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>


        <form method="post" action="http://127.0.0.1:8000/logout" style="position: absolute; left: 15px;">
            @csrf
            <input class="btn rounded btn-danger btn-sm" type="submit" value="خروج">
        </form>

{{--        <div class="collapse navbar-collapse" id="navbarSupportedContent">--}}
{{--            <ul class="navbar-nav mr-auto">--}}
{{--                <li class="nav-item">--}}
{{--                    --}}
{{--                </li>--}}
{{--            </ul>--}}
{{--        </div>--}}
    </nav>
</div>
