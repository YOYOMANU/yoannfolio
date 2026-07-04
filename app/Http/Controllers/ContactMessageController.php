<?php

namespace App\Http\Controllers;

use App\Http\Requests\ContactMessageRequest;
use App\Mail\ContactFormSubmitted;
use App\Models\ContactMessage;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;
use Inertia\Response;

class ContactMessageController extends Controller
{
    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('contact/index');
    }

    public function store(ContactMessageRequest $request): RedirectResponse
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