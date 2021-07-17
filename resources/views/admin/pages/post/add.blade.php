@extends('admin.index')


@section('content')
    <div class="row m-5">
        <div class="col-md-6 mx-auto">
            @include('message-error.message')
            <form action="{{route('admin.post.store')}}" method="post" class="border rounded p-5">
                @csrf
                <div class="row mb-3">
                    <h4>افزودن مطلب</h4>
                </div>
                <div class="row mb-3">
                    <label for="title" class="form-label">
                        عنوان
                    </label>
                    <input type="text" name="title" id="title" autocomplete="off"
                           value="{{old('title')}}" class="form-control @error('title') border-danger @enderror" placeholder="عنوان">
                </div>

                <div class="row mb-3">
                    <label for="keyword" class="form-label">
                        کلمه کلیدی
                    </label>
                    <input type="text" name="keyword" id="keyword" autocomplete="off"
                           value="{{old('keyword')}}" class="form-control @error('keyword') border-danger @enderror" placeholder="کلمه کلیدی">
                </div>

                <div class="row mb-3">
                    <label for="body" class="form-label">
                        متن
                    </label>
                    <textarea class="form-control @error('body') border-danger @enderror"
                              name="body" id="body" placeholder="متن">{{old('body')}}</textarea>
                </div>

                <div class="row mb-3">
                    <input type="submit" name="add_post" id="add_post" class="btn btn-success form-control" value="ثبت مطلب">
                </div>
            </form>
        </div>
    </div>
@endsection
