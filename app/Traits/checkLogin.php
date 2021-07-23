<?php
namespace App\Traits;
trait checkLogin
{
    public function checkVipUser()
    {
        if(!empty(auth()->user()) && auth()->user()->role === 'vip')
            return true;
        else
            return false;
    }
}
