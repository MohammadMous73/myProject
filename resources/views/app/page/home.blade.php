@extends('app.index')

@section('content')

    <section class="my-5">
        <div class="container">
            <div class="row">
                <div class="col-6">
                    <img src="{{url('img/me.jpg')}}" width="50%" class="img-fluid rounded">
                </div>
                <div class="col-6 text-center">
                    <h1>
                        @lang('app.site_name')
                    </h1>
                    <h3>
                        @lang('app.site_description')
                    </h3>
                </div>
    {{--            <div class="col-12 body bg-success p-2">--}}
    {{--                --}}
    {{--                <div class="">--}}
    {{--                                    <div class="alert alert-success">--}}
    {{--                                        hi {{$name}}--}}
    {{--                                    </div>--}}
    {{--                   --}}

    {{--                </div>--}}
    {{--            </div>--}}
            </div>
        </div>
    </section>
    <section>
        <div class="container">
            <div class="row">
                @foreach($posts as $post)
                    <div class="card px-0 m-1" style="width: 18rem;">
                        <img src="{{url($post->image)}}" class="card-img-top" alt="{{$post->title}}">
                        <div class="card-body">
                            <h5 class="card-title">{{$post->title}}</h5>
{{--                            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>--}}
                            <a href="#" class="btn btn-primary btn-block" style="width: 100%">مشاهده مطلب</a>
                        </div>
                    </div>
                @endforeach
            </div>
        </div>
    </section>
@endsection
