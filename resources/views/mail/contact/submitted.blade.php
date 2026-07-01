<!DOCTYPE html>
<html lang="fr" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
    xmlns:o="urn:schemas-microsoft-com:office:office">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Nouveau message de contact</title>
    <style>
        body,
        table,
        td,
        a {
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
        }

        table,
        td {
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
        }

        img {
            -ms-interpolation-mode: bicubic;
            border: 0;
            height: auto;
            line-height: 100%;
            outline: none;
            text-decoration: none;
        }

        body {
            margin: 0;
            padding: 0;
            width: 100% !important;
            height: 100% !important;
            background-color: #F8FAFC;
        }

        a[x-apple-data-detectors] {
            color: inherit !important;
            text-decoration: none !important;
        }

        @media screen and (max-width: 600px) {
            .email-container {
                width: 100% !important;
            }

            .fluid-padding {
                padding-left: 20px !important;
                padding-right: 20px !important;
                padding-top: 32px !important;
                padding-bottom: 32px !important;
            }

            .stack-column {
                display: block !important;
                width: 100% !important;
                max-width: 100% !important;
                direction: ltr !important;
                padding-bottom: 12px !important;
            }
        }
    </style>
</head>

<body
    style="margin:0; padding:0; background-color:#F8FAFC; font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#F8FAFC;">
        <tr>
            <td align="center" style="padding: 48px 16px;">

                <table role="presentation" width="600" cellpadding="0" cellspacing="0" class="email-container"
                    style="width:600px; max-width:600px;">

                    <tr>
                        <td align="center" style="padding-bottom: 24px;">
                            <span
                                style="font-size:11px; font-weight:800; letter-spacing:5px; text-transform:uppercase; color:#64748B;">
                                PORTFOLIO
                            </span>
                        </td>
                    </tr>

                    <tr>
                        <td
                            style="background-color:#FFFFFF; border-radius:16px; border:1px solid #E2E8F0; box-shadow: 0 10px 15px -3px rgba(15, 23, 42, 0.04), 0 4px 6px -4px rgba(15, 23, 42, 0.04); overflow: hidden;">

                            <div
                                style="height: 4px; background: linear-gradient(90deg, #4F46E5 0%, #818CF8 100%); line-height: 4px; font-size: 4px;">
                                &nbsp;</div>

                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td class="fluid-padding" style="padding: 40px 48px;">

                                        <table role="presentation" cellpadding="0" cellspacing="0"
                                            style="margin-bottom: 16px;">
                                            <tr>
                                                <td
                                                    style="background-color: #EEF2F6; border-radius: 6px; padding: 6px 12px;">
                                                    <span
                                                        style="font-size:11px; font-weight:700; letter-spacing:1px; text-transform:uppercase; color:#334155; display: inline-block; vertical-align: middle;">
                                                        Formulaire de contact
                                                    </span>
                                                </td>
                                            </tr>
                                        </table>

                                        <h1
                                            style="margin:0 0 32px; font-size:28px; font-weight:700; letter-spacing:-0.03em; color:#0F172A; line-height: 1.25;">
                                            Nouveau message reçu
                                        </h1>

                                        <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
                                            style="margin-bottom: 24px;">
                                            <tr>
                                                <td style="direction: ltr;" valign="top">
                                                    <div class="stack-column"
                                                        style="display:inline-block; width:100%; max-width:240px; vertical-align:top;">
                                                        <div style="padding-right: 16px;">
                                                            <span
                                                                style="display:block; font-size:11px; text-transform:uppercase; letter-spacing:0.5px; color:#94A3B8; margin-bottom:6px; font-weight:600;">Expéditeur</span>
                                                            <span
                                                                style="font-size:15px; font-weight:600; color:#1E293B; display:block; word-break:break-word;">{{ $contactMessage->name }}</span>
                                                        </div>
                                                    </div>
                                                    <div class="stack-column"
                                                        style="display:inline-block; width:100%; max-width:260px; vertical-align:top;">
                                                        <div>
                                                            <span
                                                                style="display:block; font-size:11px; text-transform:uppercase; letter-spacing:0.5px; color:#94A3B8; margin-bottom:6px; font-weight:600;">Adresse
                                                                email</span>
                                                            <a href="mailto:{{ $contactMessage->email }}"
                                                                style="font-size:15px; color:#4F46E5; text-decoration:none; font-weight: 600; display:block; word-break:break-all;">{{ $contactMessage->email }}</a>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        </table>

                                        @if ($contactMessage->subject)
                                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
                                                style="margin-bottom: 32px; border-top: 1px solid #F1F5F9; padding-top: 16px;">
                                                <tr>
                                                    <td>
                                                        <span
                                                            style="display:block; font-size:11px; text-transform:uppercase; letter-spacing:0.5px; color:#94A3B8; margin-bottom:6px; font-weight:600;">Sujet
                                                            du message</span>
                                                        <span
                                                            style="font-size:15px; color:#1E293B; font-weight: 500; line-height: 1.4;">{{ $contactMessage->subject }}</span>
                                                    </td>
                                                </tr>
                                            </table>
                                        @else
                                            <div
                                                style="height: 8px; border-bottom: 1px solid #F1F5F9; margin-bottom: 24px;">
                                                &nbsp;</div>
                                        @endif

                                        <span
                                            style="display:block; font-size:11px; text-transform:uppercase; letter-spacing:0.5px; color:#94A3B8; margin-bottom:10px; font-weight:600;">Message</span>
                                        <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
                                            style="background-color: #F8FAFC; border-radius: 12px; border: 1px solid #E2E8F0; border-left: 4px solid #4F46E5; margin-bottom: 40px;">
                                            <tr>
                                                <td style="padding: 20px 24px;">
                                                    <p
                                                        style="margin:0; font-size:15px; line-height:1.65; color:#334155; white-space:pre-line;">
                                                        {{ $contactMessage->message }}</p>
                                                </td>
                                            </tr>
                                        </table>

                                        <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                                            <tr>
                                                <td align="center">
                                                    <table role="presentation" cellpadding="0" cellspacing="0">
                                                        <tr>
                                                            <td align="center"
                                                                style="border-radius:10px; background-color:#4F46E5; box-shadow: 0 4px 6px -1px rgba(79, 70, 229, 0.2);">
                                                                <a href="mailto:{{ $contactMessage->email }}"
                                                                    target="_blank"
                                                                    style="display:inline-block; padding:16px 40px; font-size:14px; font-weight:600; color:#FFFFFF; text-decoration:none; letter-spacing: 0.3px;">
                                                                    Répondre directement
                                                                </a>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>

                                    </td>
                                </tr>
                            </table>

                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
                                style="border-top:1px solid #F1F5F9; background-color: #FAFBFD;">
                                <tr>
                                    <td class="fluid-padding" style="padding: 20px 48px;">
                                        <p
                                            style="margin:0; font-size:12px; color:#64748B; line-height:1.5; text-align: center; font-weight: 500;">
                                            Reçu le
                                            {{ $contactMessage->created_at?->translatedFormat('d F Y \à H:i') ?? now()->translatedFormat('d F Y \à H:i') }}
                                        </p>
                                    </td>
                                </tr>
                            </table>

                        </td>
                    </tr>

                    <tr>
                        <td align="center" style="padding: 32px 16px 0;">
                            <p
                                style="margin:0; font-size:11px; color:#94A3B8; line-height: 1.5; letter-spacing: 0.2px;">
                                Cet email automatique a été généré par le formulaire de contact de votre Portfolio.
                            </p>
                        </td>
                    </tr>

                </table>

            </td>
        </tr>
    </table>

</body>

</html>
