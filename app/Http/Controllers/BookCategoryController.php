<?php

namespace App\Http\Controllers;

use App\BookCategory;
use Validator;
use Illuminate\Http\Request;

class BookCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $book_category = BookCategory::all();
        return response()->json($book_category);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
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
        $book_category = new BookCategory;
        $requested_data = $request->all();
        $validate = Validator::make($requested_data, $book_category->validation());
        if ($validate->fails()) {
            $status = 400;
            $response = [
                "status" => $status,
                "errors" => $validate->errors(),
            ];
        } else {
            $book_category->fill($requested_data)->save();
            $status = 201;
            $response = [
                "status" => $status,
                "errors" => $book_category,
            ];
        }
        return response()->json($response, $status);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\BookCategory  $bookCategory
     * @return \Illuminate\Http\Response
     */
    public function show(BookCategory $bookCategory)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\BookCategory  $bookCategory
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $book_category = BookCategory::findOrFail($id);
        return response()->json($book_category);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\BookCategory  $bookCategory
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        // dd($request->all());
        $bookCategory = BookCategory::findOrFail($id);
        $requested_data = $request->all();
        $validate = Validator::make($requested_data, $bookCategory->validation());
        if ($validate->fails()) {
            $status = 400;
            $response = [
                "status" => $status,
                "errors" => $validate->errors(),
            ];
        } else {
            $bookCategory->fill($requested_data)->save();
            $status = 204;
            $response = [
                "status" => $status,
                "errors" => $bookCategory,
            ];
        }
        return response()->json($response, $status);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\BookCategory  $bookCategory
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $book_category = BookCategory::where('book_categorie_id', $id)->delete();
        $status = 202;
        $response = [
            "status" => $status,
            "errors" => $book_category,
        ];
        return response()->json($response, $status);
    }
}
