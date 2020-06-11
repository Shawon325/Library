<?php

namespace App\Http\Controllers;

use App\MemberType;
use Validator;
use Illuminate\Http\Request;

class MemberTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $all_data = MemberType::all();
        return response()->json($all_data);
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
        $member_type = new MemberType;
        $requested_data = $request->all();
        $validate = Validator::make($requested_data, $member_type->validation());
        if ($validate->fails()) {
            $status = 400;
            $response = [
                "status" => $status,
                "errors" => $validate->errors(),
            ];
        } else {
            $member_type->fill($requested_data)->save();
            $status = 201;
            $response = [
                "status" => $status,
                "data"   => $member_type,
            ];
        }
        return response()->json($response, $status);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\MemberType  $memberType
     * @return \Illuminate\Http\Response
     */
    public function show(MemberType $memberType)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\MemberType  $memberType
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $edit_data = MemberType::findOrFail($id);
        return response()->json($edit_data);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\MemberType  $memberType
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        // dd($request->all());
        $type_update = MemberType::findOrFail($id);
        $requested_data = $request->all();
        $validate = Validator::make($requested_data, $type_update->validation());
        if ($validate->fails()) {
            $status = 400;
            $response = [
                "status" => $status,
                "errors" => $validate->errors(),
            ];
        } else {
            $type_update->fill($requested_data)->save();
            $status = 204;
            $response = [
                "status" => $status,
                "data"   => $type_update,
            ];
        }
        return response()->json($response, $status);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\MemberType  $memberType
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $type_delete = MemberType::where('member_type_id', $id)->delete();
        return response()->json($type_delete, 202);
    }
}
