@extends('app.index')

@section('content')

<div class="container-fluid ">
    <div class="row">
        <div class="col-12">
            <div class="body bg-success p-2">
                <div class="alert alert-success">
                    hi {{$name}}
                </div>
                <h3>Welcome To Our Website</h3>
                <h5>
                    This is Home Page my site
                </h5>
                <img src="storage/IMG_۲۰۲۰۰۹۱۶_۱۶۴۱۲۰.jpg" height="100px" width="100px">

            </div>
        </div>
    </div>
</div>

@endsection
