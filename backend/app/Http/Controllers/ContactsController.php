<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Contact;

use Illuminate\Support\Facades\DB;

use App\Http\Requests\ContactRequest;

// use App\Requests\ContactRequest;



class ContactsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Contact::paginate(10);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return Contact::where("id", $id)->first();
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(ContactRequest $request)
    {
        DB::beginTransaction();

        try {
            // Apply a shared lock on the contacts table for selecting records
            DB::table('contacts')->sharedLock()->get();

            $data = $request->all();
            $request->validated();

            $contact = new Contact();

            $contact = Contact::create($data);

            DB::commit();

            return response()->json(['contact' => $contact]);


        } catch (\Exception $e) {

            DB::rollBack();
            return response()->json(['error' => 'An error occurred while creating a contact.'], 500);
        }

    }


    /**
     * Update the specified resource in storage.
     */
    public function update(ContactRequest $request, string $id)
    {

        DB::beginTransaction();

        try {

            $data = $request->all();
            $request->validated();

            // Apply a shared lock on the contacts table for selecting records
            DB::table('contacts')->sharedLock()->get();

            $contact = Contact::where('id', $id)->lockForUpdate()->first();

            if (!$contact) {
                return response()->json(['error' => 'Contact not found.'], 404);
            }

            $contact->update($data);

            DB::commit();

            return response()->json(['contact' => $contact]);


        } catch (\Exception $e) {

            DB::rollBack();
            return response()->json(['error' => 'An error occurred while updating a contact.'], 500);
        }

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $contact = Contact::findOrFail($id);
        $contact->destroy($id);

        return response()->json(['data' => "deleted"]);
    }
}