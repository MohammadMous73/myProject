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
@endsection
