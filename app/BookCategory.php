<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class BookCategory extends Model
{
    protected $table = 'book_categories';
    protected $primaryKey = 'book_categorie_id';
    protected $fillable = ['category_name', 'status'];

    public function validation()
    {
        return [
            'category_name' => 'required',
            'status'        => 'required',
        ];
    }
}
