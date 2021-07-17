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
            <div class="col-12 p-3 m-3 border rounded">
                <form method="post" action="{{route('admin.post.list')}}">
                    @csrf
                    <div class="row">
                        <div class="col-md-3 text-right">
                            <input type="text" autocomplete="off" name="title" id="title"
                                   value="{{request()->title}}"
                                   placeholder="عنوان"  class="form-control">
                        </div>

                        <div class="col-md-3 text-right">
                            <input type="text" autocomplete="off" name="keyword" id="keyword"
                                   value="{{request()->keyword}}"
                                   placeholder="کلمه کلیدی"  class="form-control">
                        </div>

                        <div class="text-right col-md-3">
                            <select name="paginate_count" class="form-control" style="text-align-last: center">
                                <option hidden="" value="">تعداد نمایش در هر صفحه</option>
                                <option value="1" {{request()->paginate_count == 1 ? 'selected' : ''}}>1</option>
                                <option value="2" {{request()->paginate_count == 2 ? 'selected' : ''}}>2</option>
                                <option value="3" {{request()->paginate_count == 3 ? 'selected' : ''}}>3</option>
                                <option value="4" {{request()->paginate_count == 4 ? 'selected' : ''}}>4</option>
                                <option value="5" {{request()->paginate_count == 5 ? 'selected' : ''}}>5</option>
                                <option value="6" {{request()->paginate_count == 6 ? 'selected' : ''}}>6</option>
                                <option value="7" {{request()->paginate_count == 7 ? 'selected' : ''}}>7</option>
                                <option value="8" {{request()->paginate_count == 8 ? 'selected' : ''}}>8</option>
                                <option value="9" {{request()->paginate_count == 9 ? 'selected' : ''}}>9</option>
                                <option value="10" {{request()->paginate_count == 10 ? 'selected' : ''}}>10</option>
                            </select>
                        </div>

                        <div class="col-md-3 text-right">
                            <input type="submit" value="جستوجو" class="btn form-control btn-info rounded btn-sm" name="search_btn" id="search_btn">
                        </div>
                    </div>
                </form>
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
                {{$posts->appends(\Illuminate\Support\Facades\Request::all())->render()}}
            </div>
        </div>
    </div>
@endsection
