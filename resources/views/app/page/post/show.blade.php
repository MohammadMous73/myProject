@extends('app.index')

@section('content')

    <section class="my-5">
        <div class="container">
            <div class="row">
                <div class="col-md-4">
                    <img src="{{url($post->image)}}" class="img-fluid rounded" alt="{{$post->title}}">
                </div>
                <div class="col-md-8">
                    <h2>{{$post->title}}</h2>
                    <div class="text-justify">
                        {!! $post->body !!}
                    </div>
                </div>
            </div>
        </div>
    </section>
@endsection
