<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name')->nullable();
            $table->string('company')->nullable();
            $table->string('responsible')->nullable();
            $table->string('email')->unique();
            $table->enum('level', ['ADMIN', 'EDITOR', 'CLIENTE']);
            $table->string('whatsapp')->nullable();
            $table->integer('day')->nullable();
            $table->string('logo')->nullable();
            $table->uuid('plan_id');
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password')->nullable();
            $table->rememberToken();
            $table->timestamps();

            $table->foreign('plan_id')->references('id')->on('plans');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
