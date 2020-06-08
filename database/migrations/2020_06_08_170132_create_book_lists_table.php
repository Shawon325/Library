<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBookListsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('book_lists', function (Blueprint $table) {
            $table->bigIncrements('book_list_id');
            $table->string('book_id');
            $table->string('book_name');
            $table->unsignedBigInteger('book_category');
            $table->foreign('book_category')->references('book_categorie_id')->on('book_categories')->onDelete('cascade');
            $table->string('language')->nullable();
            $table->string('edition_year')->nullable();
            $table->dateTime('add_date');
            $table->tinyInteger('status');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('book_lists');
    }
}
