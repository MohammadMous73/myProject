<?php

namespace App\Http\Controllers\Admin;




use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public  function index()
    {
        $posts = Post::paginate(3);
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

    public function edit($id)
    {
        //$post = Post::where('id',$id)->first();
        $post = Post::firstWhere('id',$id);
        return view('admin.pages.post.edit',compact('post'));
    }

    public function update()
    {

    }
}
