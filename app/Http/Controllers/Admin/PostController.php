<?php

namespace App\Http\Controllers\Admin;




use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public  function index()
    {
        $posts = Post::all();
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

        $post->save();
    }

    public function edit()
    {

    }

    public function update()
    {

    }
}
