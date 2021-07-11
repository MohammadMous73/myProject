<?php

namespace App\Http\Controllers\App;




use App\Http\Controllers\Controller;

class HomeController extends Controller
{
    public function index(){
//        return 'It is Home Page ';
        $name = 'Mohammad Mousavi';
        return view('app.page.home',compact('name'));
    }

    public function show(){}

    public function create(){}
    public function store(){}

    public function edit(){}
    public function update(){}

    public function destroy(){}
}
