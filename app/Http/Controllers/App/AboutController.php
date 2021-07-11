<?php
namespace App\Http\Controllers\App;



use App\Http\Controllers\Controller;

class AboutController extends Controller
{
    public function index(){
        $name = 'Mohammad Mousavi';
        return view('app.page.about',compact('name'));
    }

    public function show(){}

    public function create(){}
    public function store(){}

    public function edit(){}
    public function update(){}

    public function destroy(){}
}
