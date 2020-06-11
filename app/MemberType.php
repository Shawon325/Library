<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class MemberType extends Model
{
    protected $table = 'member_types';
    protected $primaryKey = 'member_type_id';
    protected $fillable = ['type_name', 'status'];

    public function validation()
    {
        return [
            'type_name' => 'required',
            'status'    => 'required',
        ];
    }
}
