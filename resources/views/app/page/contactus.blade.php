@extends('app.index')

@section('content')

<div class="container">
    <div class="row">
        <div class="col-12">
            <div class="body bg-success p-2">
                <div class="alert alert-success">
                    hi {{$name}}
                </div>
                <h3>Welcome To Contact page</h3>
                <P>
                    Use the e-mail address and numbers below to contact us<br>
                    <h6>Email address : mohmm137394@gmail.com</h6>

                    <h6>Phone Call : 09139747006</h6>
                </P>
            </div>
        </div>
    </div>
</div>

@endsection
