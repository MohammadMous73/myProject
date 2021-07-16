@extends('admin.index')

@section('content')
    <div class="container">
        <div class="row my-5">
            @include('message-error.message')
            <div class="col-12 ">
                <a class="text-decoration-none btn btn-success btn-sm fw-bold" href="{{route('admin.post.add')}}">
                    ثبت مطلب
                </a>
            </div>
            <div class="col-md-12 text-center mx-auto mt-4">
                <table CLASS="rounded table table-hover table-bordered">
                    <tr>
                        <th>ردیف</th>
                        <th>عنوان</th>
                        <th> کلمات کلیدی </th>
                        <th>زمان انتشار</th>
                        <th>زمان بروز رسانی</th>
                        <th>تنظیمات</th>
                    </tr>
                    @foreach($posts as $row => $post)
                        <tr>
                            <td>{{++$row}}</td>
                            <td>{{$post->title}}</td>
                            <td>{{$post->keyword}}</td>
                            <td>{{jdate($post->created_at)->format('Y.m.d')}}</td>
                            <td>{{jdate($post->updated_at)->format('Y.m.d')}}</td>
                            <td>
                                <a href="{{route('admin.post.edit',$post->id)}}" class="btn btn-info btn-sm rounded">ویرایش</a>
                                <a href="" class="btn btn-danger btn-sm rounded">حذف</a>
                            </td>
                        </tr>
                    @endforeach
                </table>
                {{$posts->links()}}
            </div>
        </div>
    </div>
@endsection
