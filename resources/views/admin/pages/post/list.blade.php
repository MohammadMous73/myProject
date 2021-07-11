@extends('admin.index')

@section('content')
    <div class="container">
        <div class="row">
            <div class="col-md-10 text-center mx-auto my-5">
                <table CLASS="rounded table table-hover table-bordered">
                    <tr>
                        <th>ردیف</th>
                        <th>عنوان</th>
                        <th> کلمات کلیدی </th>
                        <th>متن</th>
                        <th>زمان انتشار</th>
                        <th>زمان بروز رسانی</th>
                        <th>تنظیمات</th>
                    </tr>
                    @foreach($posts as $row => $post)
                        <tr>
                            <td>{{++$row}}</td>
                            <td>{{$post->title}}</td>
                            <td>{{$post->keyword}}</td>
                            <td>{{$post->body}}</td>
                            <td>{{$post->created_at}}</td>
                            <td>{{$post->updated_at}}</td>
                            <td>{{}}</td>
                        </tr>
                    @endforeach
                </table>
            </div>
        </div>
    </div>
@endsection
