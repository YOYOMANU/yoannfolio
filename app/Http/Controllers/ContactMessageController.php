<?php

namespace App\Http\Controllers;

use App\Http\Requests\ContactMessageRequest;
use App\Mail\ContactFormSubmitted;
use App\Models\ContactMessage;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class ContactMessageController extends Controller
{
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('contact/index');
    }

    public function store(ContactMessageRequest $request)
    {
        $data = $request->validated();

        $contactMessage = ContactMessage::create($data);

        // Optionnel : notification email
        try {
            Mail::to(config('mail.contact_recipient', 'toi@example.com'))
                ->send(new ContactFormSubmitted($contactMessage));
        } catch (\Throwable $e) {
            report($e);
        }

        return back()->with('success', 'Ton message a bien été envoyé, je te réponds rapidement !');
    }
}
