@extends('app.index')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-12">
            <div class="body bg-success p-2">
                <div class="alert alert-success ">
                    hi {{$name}}
                </div>
                <h3>Welcome To About Page</h3>
                <P>
                    Hi, I am Mohammad Mousavi. This is my introduction page.
                    My expertise in web programming is backend.
                </P>
            </div>
        </div>
    </div>
</div>

@endsection
