<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class BookList extends Model
{
    protected $table = 'book_lists';
    protected $primaryKey = 'book_list_id';
    protected $fillable = ['book_id', 'book_name', 'book_category', 'language', 'edition_year', 'add_date', 'status'];

    public function validation()
    {
        return [
            'book_id'       => 'required',
            'book_name'     => 'required',
            'language'      => 'required',
            'book_category' => 'required',
            'edition_year'  => 'required',
            'add_date'      => 'required',
            'status'        => 'required',
        ];
    }
}
