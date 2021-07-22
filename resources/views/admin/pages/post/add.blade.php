@extends('admin.index')


@section('content')
    <div class="row m-5">
        <div class="col-12 mx-auto">
            @include('message-error.message')
            <form action="{{route('admin.post.store')}}" enctype="multipart/form-data"
                  method="post" class="border rounded p-5">
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
                    <label for="image" class="form-label">
                        عکس
                    </label>
                    <input type="file" name="file" id="file"
                           class="form-control @error('file') border-danger @enderror">
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
    <script src="https://cdn.tiny.cloud/1/no-api-key/tinymce/5/tinymce.min.js" referrerpolicy="origin"></script>
    <script type="text/javascript">
        tiny();
        function tiny() {
            var editor_config = {
                path_absolute : "/",
                selector: "#body",
                directionality:'rtl',
                height:'350px',
                plugins: [
                    "advlist autolink lists link image charmap print preview hr anchor pagebreak",
                    "searchreplace wordcount visualblocks visualchars code fullscreen",
                    "insertdatetime media nonbreaking save table contextmenu directionality",
                    "emoticons template paste textcolor colorpicker textpattern"
                ],
                toolbar: "insertfile undo redo | styleselect fontselect fontsizeselect forecolor | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image media",
                fontsize_formats: "8px 9px 10px 11px 12px 14px 16px 18px 20px 22px 24px 36px",
                relative_urls: false,
            };
            tinymce.init(editor_config);
        }
    </script>
@endsection
