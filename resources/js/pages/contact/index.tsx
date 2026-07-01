import { useForm } from '@inertiajs/react'
import { FormEventHandler, useMemo, useState } from 'react'
import { motion, AnimatePresence, Variants } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Loader2, Send, User, Mail, MessageSquare, Tag, Check } from 'lucide-react'
import { toast } from 'sonner'
import contact from '@/routes/contact'
import { ContactForm } from '@/types'
import { WithPublicLayout } from '@/layouts/public-layout'

const fadeUp = {
    hidden: { opacity: 0, y: 16 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    }),
} satisfies Variants

const MESSAGE_MAX = 800

function ContactPage() {
    const { data, setData, post, processing, errors, reset } = useForm<ContactForm>({
        name: '',
        email: '',
        subject: '',
        message: '',
    })

    const [sent, setSent] = useState(false)
    const [focusField, setFocusField] = useState<string | null>(null)

    const progress = useMemo(() => {
        const required = [data.name, data.email, data.message]
        const filled = required.filter((v) => v.trim().length > 0).length
        return Math.round((filled / required.length) * 100)
    }, [data.name, data.email, data.message])

    const submit: FormEventHandler = (e) => {
        e.preventDefault()

        post(contact.store().url, {
            preserveScroll: true,
            onSuccess: () => {
                setSent(true)
                // toast.success('Message envoyé avec succès !')
                setTimeout(() => {
                    reset()
                    setSent(false)
                }, 2400)
            },
            onError: () => {
                toast.error('Une erreur est survenue, vérifie le formulaire.')
            },
        })
    }

    const fieldClass = (name: string) =>
        `border-white/10 bg-white/[0.03] pl-10 transition-all duration-200 focus-visible:ring-2 ${focusField === name ? 'bg-white/[0.05]' : ''
        }`

    const ringStyle = { '--tw-ring-color': 'var(--sh-accent)' } as React.CSSProperties

    return (
        <section
            className="sh-public relative mx-auto w-full max-w-2xl overflow-hidden px-6 py-24"
            style={{ color: 'var(--sh-ink)' }}
        >
            {/* Halo gold en fond */}
            <div
                className="pointer-events-none absolute -top-40 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full opacity-20 blur-3xl"
                style={{ background: 'var(--sh-accent)' }}
            />

            {/* Grille "plan" en fond, très discrète */}
            <svg
                className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.04]"
                aria-hidden="true"
            >
                <defs>
                    <pattern id="blueprint-grid" width="32" height="32" patternUnits="userSpaceOnUse">
                        <path d="M 32 0 L 0 0 0 32" fill="none" stroke="var(--sh-accent)" strokeWidth="1" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#blueprint-grid)" />
            </svg>

            <motion.div
                initial="hidden"
                animate="visible"
                custom={0}
                variants={fadeUp}
                className="relative mb-12 text-center"
            >
                <span
                    className="mb-3 inline-block text-xs font-medium tracking-[0.3em] uppercase"
                    style={{ color: 'var(--sh-accent)' }}
                >
                    Prenons contact
                </span>
                <h1 className="mb-3 text-4xl font-semibold tracking-tight">Contactez-moi</h1>
                <p className="mx-auto max-w-md text-sm text-muted-foreground">
                    Une question, un projet, une opportunité ? Laissez-moi un message,
                    je réponds généralement sous 24h.
                </p>
                <div
                    className="mx-auto mt-6 h-px w-16"
                    style={{ background: 'var(--sh-accent)' }}
                />
            </motion.div>

            <motion.div
                initial="hidden"
                animate="visible"
                custom={0.5}
                variants={fadeUp}
                className="relative overflow-hidden rounded-2xl border shadow-2xl backdrop-blur-sm"
                style={{
                    borderColor: 'color-mix(in srgb, var(--sh-accent) 20%, transparent)',
                    background: 'color-mix(in srgb, var(--sh-ink) 4%, transparent)',
                }}
            >
                {/* Barre de "cote" (mesure) en tête, écho au thème plans */}
                <div
                    className="flex items-center justify-between px-8 pt-6 text-[10px] tracking-[0.2em] uppercase"
                    style={{ color: 'color-mix(in srgb, var(--sh-accent) 60%, var(--sh-ink))' }}
                >
                    <span>Dossier de contact</span>
                    <span>{progress}% complété</span>
                </div>
                <div className="mx-8 mt-2 h-px overflow-hidden rounded-full bg-white/10">
                    <motion.div
                        className="h-full"
                        style={{ background: 'var(--sh-accent)' }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    />
                </div>

                {/* 4 coins de plan */}
                {[
                    'top-0 left-0 border-t-2 border-l-2 rounded-tl-2xl',
                    'top-0 right-0 border-t-2 border-r-2 rounded-tr-2xl',
                    'bottom-0 left-0 border-b-2 border-l-2 rounded-bl-2xl',
                    'bottom-0 right-0 border-b-2 border-r-2 rounded-br-2xl',
                ].map((pos) => (
                    <span
                        key={pos}
                        className={`pointer-events-none absolute h-6 w-6 ${pos}`}
                        style={{ borderColor: 'var(--sh-accent)' }}
                    />
                ))}

                <AnimatePresence mode="wait">
                    {sent ? (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                            className="flex flex-col items-center justify-center gap-4 px-8 py-24 text-center"
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.1, type: 'spring', stiffness: 260, damping: 18 }}
                                className="flex h-14 w-14 items-center justify-center rounded-full"
                                style={{ background: 'var(--sh-accent)' }}
                            >
                                <Check className="h-7 w-7" style={{ color: 'var(--sh-ink)' }} />
                            </motion.div>
                            <p className="text-lg font-medium">Message envoyé</p>
                            <p className="max-w-xs text-sm text-muted-foreground">
                                Merci ! Je reviens vers vous sous 24h.
                            </p>
                        </motion.div>
                    ) : (
                        <motion.form
                            key="form"
                            onSubmit={submit}
                            initial={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="relative space-y-6 px-8 py-8"
                        >
                            <div className="grid gap-6 sm:grid-cols-2">
                                <motion.div initial="hidden" animate="visible" custom={1} variants={fadeUp} className="space-y-2">
                                    <Label htmlFor="name" className="flex items-center gap-2 text-xs tracking-wide uppercase">
                                        <User className="h-3.5 w-3.5" style={{ color: 'var(--sh-accent)' }} />
                                        Nom
                                    </Label>
                                    <div className="relative">
                                        <User
                                            className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 opacity-50"
                                            style={{ color: 'var(--sh-accent)' }}
                                        />
                                        <Input
                                            id="name"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            onFocus={() => setFocusField('name')}
                                            onBlur={() => setFocusField(null)}
                                            placeholder="Votre nom"
                                            autoComplete="name"
                                            className={fieldClass('name')}
                                            style={ringStyle}
                                        />
                                    </div>
                                    {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
                                </motion.div>

                                <motion.div initial="hidden" animate="visible" custom={2} variants={fadeUp} className="space-y-2">
                                    <Label htmlFor="email" className="flex items-center gap-2 text-xs tracking-wide uppercase">
                                        <Mail className="h-3.5 w-3.5" style={{ color: 'var(--sh-accent)' }} />
                                        Email
                                    </Label>
                                    <div className="relative">
                                        <Mail
                                            className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 opacity-50"
                                            style={{ color: 'var(--sh-accent)' }}
                                        />
                                        <Input
                                            id="email"
                                            type="email"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            onFocus={() => setFocusField('email')}
                                            onBlur={() => setFocusField(null)}
                                            placeholder="vous@example.com"
                                            autoComplete="email"
                                            className={fieldClass('email')}
                                            style={ringStyle}
                                        />
                                    </div>
                                    {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
                                </motion.div>
                            </div>

                            <motion.div initial="hidden" animate="visible" custom={3} variants={fadeUp} className="space-y-2">
                                <Label htmlFor="subject" className="flex items-center gap-2 text-xs tracking-wide uppercase">
                                    <Tag className="h-3.5 w-3.5" style={{ color: 'var(--sh-accent)' }} />
                                    Sujet <span className="normal-case text-muted-foreground">(optionnel)</span>
                                </Label>
                                <div className="relative">
                                    <Tag
                                        className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 opacity-50"
                                        style={{ color: 'var(--sh-accent)' }}
                                    />
                                    <Input
                                        id="subject"
                                        value={data.subject}
                                        onChange={(e) => setData('subject', e.target.value)}
                                        onFocus={() => setFocusField('subject')}
                                        onBlur={() => setFocusField(null)}
                                        placeholder="Objet de votre message"
                                        className={fieldClass('subject')}
                                        style={ringStyle}
                                    />
                                </div>
                                {errors.subject && <p className="text-xs text-destructive">{errors.subject}</p>}
                            </motion.div>

                            <motion.div initial="hidden" animate="visible" custom={4} variants={fadeUp} className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="message" className="flex items-center gap-2 text-xs tracking-wide uppercase">
                                        <MessageSquare className="h-3.5 w-3.5" style={{ color: 'var(--sh-accent)' }} />
                                        Message
                                    </Label>
                                    <span className="text-[10px] tabular-nums text-muted-foreground">
                                        {data.message.length}/{MESSAGE_MAX}
                                    </span>
                                </div>
                                <Textarea
                                    id="message"
                                    value={data.message}
                                    onChange={(e) => setData('message', e.target.value.slice(0, MESSAGE_MAX))}
                                    onFocus={() => setFocusField('message')}
                                    onBlur={() => setFocusField(null)}
                                    placeholder="Décrivez votre projet ou votre question..."
                                    rows={6}
                                    maxLength={MESSAGE_MAX}
                                    className={`resize-none border-white/10 bg-white/[0.03] transition-all duration-200 focus-visible:ring-2 ${focusField === 'message' ? 'bg-white/[0.05]' : ''
                                        }`}
                                    style={ringStyle}
                                />
                                {errors.message && <p className="text-xs text-destructive">{errors.message}</p>}
                            </motion.div>

                            <motion.div initial="hidden" animate="visible" custom={5} variants={fadeUp}>
                                <Button
                                    type="submit"
                                    disabled={processing}
                                    size="lg"
                                    className="group relative w-full overflow-hidden text-base font-medium shadow-lg transition-all hover:shadow-xl disabled:opacity-60"
                                    style={{
                                        backgroundColor: 'var(--primary)',
                                        color: 'var(--sh-ink)',
                                    }}
                                >
                                    {/* balayage lumineux au survol */}
                                    <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
                                    <span className="relative flex items-center justify-center">
                                        {processing ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Envoi en cours...
                                            </>
                                        ) : (
                                            <>
                                                Envoyer le message
                                                <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                                            </>
                                        )}
                                    </span>
                                </Button>
                            </motion.div>
                        </motion.form>
                    )}
                </AnimatePresence>
            </motion.div>
        </section>
    )
}

export default WithPublicLayout(ContactPage);