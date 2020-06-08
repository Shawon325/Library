<?php

namespace App\Http\Controllers;

use App\BookCategory;
use App\BookList;
use Validator;
use Illuminate\Http\Request;

class BookListController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $category = BookCategory::all();
        return response()->json($category);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $all_data = BookList::all();
        return response()->json($all_data);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // dd($request->all());
        $book_list = new BookList;
        $requested_data = $request->all();
        $validate = Validator::make($requested_data, $book_list->validation());
        if ($validate->fails()) {
            $status = 400;
            $response = [
                "status" => $status,
                "errors" => $validate->errors(),
            ];
        } else {
            $book_list->fill($requested_data)->save();
            $status = 201;
            $response = [
                "status" => $status,
                "errors" => $validate->errors(),
            ];
        }
        return response()->json($response, $status);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\BookList  $bookList
     * @return \Illuminate\Http\Response
     */
    public function show(BookList $bookList)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\BookList  $bookList
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $book_list = BookList::findOrFail($id);
        return response()->json($book_list);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\BookList  $bookList
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        // dd($request->all());
        $book_list = BookList::findOrFail($id);
        $requested_data = $request->all();
        $validate = Validator::make($requested_data, $book_list->validation());
        if ($validate->fails()) {
            $status = 400;
            $response = [
                "status" => $status,
                "errors" => $validate->errors(),
            ];
        } else {
            $book_list->fill($requested_data)->save();
            $status = 201;
            $response = [
                "status" => $status,
                "errors" => $validate->errors(),
            ];
        }
        return response()->json($response, $status);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\BookList  $bookList
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $book_list = BookList::where('book_list_id', $id)->delete();
        return response()->json($book_list, 202);
    }
}
