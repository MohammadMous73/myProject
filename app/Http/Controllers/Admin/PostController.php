<?php

namespace App\Http\Controllers\Admin;




use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public  function index(Request $request)
    {
        //$posts = Post::paginate(3);

        $posts = Post::orderBy('id','desc');

        if (isset($request->title) && $request -> title != '')
        {
            $posts = $posts -> where('title','like','%'.$request -> title . '%');
        }
        if (isset($request->keyword) && $request -> keyword != '')
        {
            $posts = $posts -> orwhere('keyword','like','%'.$request -> keyword . '%');
        }
        if (isset($request->paginate_count) && $request -> paginate_count != '')
        {
            $posts = $posts -> paginate($request -> paginate_count);
        }
        else
        {
            $posts = $posts->paginate(2);
        }


        return view('admin.pages.post.list',compact('posts'));
    }

    public function create()
    {
        return view('admin.pages.post.add');
    }

    public function store(Request $request)
    {
        $request->validate([
           'title'   => 'required|unique:posts',
           'keyword' => 'required',
           'body'    => 'required|min:30',
        ]);

        $post = new Post();

        $post->title   = $request->title;
        $post->keyword = $request->keyword;
        $post->body    = $request->body;

        try {
            $post->save();
        }
        catch (\Exception $exception)
        {
            return redirect()->back()->with('warning',$exception->getMessage());
        }
        return redirect()->route('admin.post.list')->with('success','اطلاعات با موفقیت ثبت شد');
    }

    public function edit(Post $post)
    {
        //$post = Post::where('id',$id)->first();
        //$post = Post::firstWhere('id',$id);
        return view('admin.pages.post.edit',compact('post'));
    }

    public function update(Request $request,Post $post)
    {
        //$post = Post::firstWhere('id',$id);
        $request->validate([
            'title'   => 'required|unique:posts,title,'.$post->id,
            'keyword' => 'required',
            'body'    => 'required|min:30',
        ]);


        $post->title   = $request->title;
        $post->keyword = $request->keyword;
        $post->body    = $request->body;

        try {
            $post->save();
        }
        catch (\Exception $exception)
        {
            return redirect()->back()->with('warning',$exception->getMessage());
        }
        return redirect()->route('admin.post.list')->with('success','اطلاعات با موفقیت ویرایش شد');
    }
}
