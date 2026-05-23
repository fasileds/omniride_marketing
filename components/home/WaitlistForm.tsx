'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import { CheckCircle2, Loader2, AlertCircle, CheckCircle } from 'lucide-react'
import Image from 'next/image'
import type { WaitlistFormData } from '@/types'

const initialForm: WaitlistFormData = { full_name: '', email: '', phone: '', role: 'sender' }

function validate(data: WaitlistFormData): Partial<Record<keyof WaitlistFormData, string>> {
  const e: Partial<Record<keyof WaitlistFormData, string>> = {}
  if (!data.full_name.trim() || data.full_name.trim().length < 2)
    e.full_name = 'Please enter your full name (min 2 characters)'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    e.email = 'Please enter a valid email address'
  if (!/^[\d\s+\-()]{7,15}$/.test(data.phone))
    e.phone = 'Please enter a valid phone number'
  return e
}

type EmailStatus = 'idle' | 'checking' | 'available' | 'taken'

const roleOptions: { value: WaitlistFormData['role']; label: string; sub: string; emoji: string }[] = [
  { value: 'sender',    label: 'Send Items',      sub: 'I need to send parcels or documents',  emoji: '📦' },
  { value: 'traveller', label: 'Travel & Carry',  sub: 'I travel intercity and can carry items', emoji: '🚌' },
  { value: 'both',      label: 'Both',            sub: 'I want to send and carry',              emoji: '⚡' },
]

export default function WaitlistForm() {
  const [form, setForm] = useState<WaitlistFormData>(initialForm)
  const [errors, setErrors] = useState<Partial<Record<keyof WaitlistFormData, string>>>({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [emailStatus, setEmailStatus] = useState<EmailStatus>('idle')
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Real-time email duplicate check
  useEffect(() => {
    const email = form.email.trim()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailStatus('idle')
      return
    }
    setEmailStatus('checking')
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(`/api/waitlist/check?email=${encodeURIComponent(email)}`)
        const { exists } = await res.json() as { exists: boolean }
        setEmailStatus(exists ? 'taken' : 'available')
      } catch {
        setEmailStatus('idle')
      }
    }, 700)
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current) }
  }, [form.email])

  function handleChange(field: keyof WaitlistFormData, value: string) {
    setForm((f) => ({ ...f, [field]: value }))
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (emailStatus === 'taken') {
      toast.error('This email is already on the waitlist!')
      return
    }
    const errs = validate(form)
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setLoading(true)
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) {
        const { error, already_registered } = await res.json() as { error?: string; already_registered?: boolean }
        if (already_registered) {
          setEmailStatus('taken')
          toast.error('This email is already on the waitlist!')
        } else {
          toast.error(error ?? 'Something went wrong. Please try again.')
        }
        return
      }
      setSuccess(true)
      toast.success('You\'re on the waitlist! Check your email 📬')
    } catch {
      toast.error('Network error — please check your connection.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="waitlist" className="py-28 bg-navy-950 relative overflow-hidden" aria-label="Join the waitlist">

      {/* Background decoration */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px,white 1px,transparent 0)', backgroundSize: '32px 32px' }} aria-hidden="true" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold-500/5 rounded-full blur-3xl" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* Left — Copy */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-gold-500 font-bold text-sm uppercase tracking-[0.2em] mb-4">Early Access</p>
            <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-5">
              Be the first to<br />
              <span className="text-gold-400">use OmneRide</span>
            </h2>
            <p className="text-navy-300 text-lg leading-relaxed mb-8">
              We're launching in Addis Ababa first. Waitlist members get priority access, founding member badges, and reduced fees — forever.
            </p>

            {/* Perks */}
            <div className="flex flex-col gap-3 mb-10">
              {[
                '🎯 Priority access before public launch',
                '💰 Founding member fee discounts — permanent',
                '📬 Welcome email with everything you need to know',
                '📰 Blog updates and platform progress reports',
              ].map((perk) => (
                <div key={perk} className="flex items-center gap-3 text-navy-200 text-sm">
                  <span>{perk}</span>
                </div>
              ))}
            </div>

            {/* Image */}
            <div className="relative h-52 rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1200&q=80"
                alt="Aerial view of Addis Ababa"
                fill className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <span className="inline-flex items-center gap-1.5 bg-gold-500/90 text-navy-900 text-xs font-bold px-3 py-1.5 rounded-full">
                  <span className="relative flex h-1.5 w-1.5"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-navy-900 opacity-75" /><span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-navy-900" /></span>
                  Launching Q3 2025 — Addis Ababa
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right — Form or Success */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <AnimatePresence mode="wait">
              {success ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white/5 border border-white/10 rounded-3xl p-10 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                    className="w-20 h-20 rounded-full bg-gold-500/20 border-2 border-gold-500/40 flex items-center justify-center mx-auto mb-6"
                  >
                    <CheckCircle2 size={36} className="text-gold-500" />
                  </motion.div>
                  <h3 className="font-display text-2xl font-bold text-white mb-3">You're on the list! 🎉</h3>
                  <p className="text-navy-300 mb-2 leading-relaxed">
                    Welcome, <strong className="text-white">{form.full_name.split(' ')[0]}</strong>!
                    We've sent a confirmation to <strong className="text-gold-400">{form.email}</strong>.
                  </p>
                  <p className="text-navy-400 text-sm mb-8">Check your inbox (and spam folder) for a welcome email with your next steps.</p>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-left">
                    <p className="text-white text-sm font-semibold mb-1">📢 Share OmneRide</p>
                    <p className="text-navy-300 text-xs leading-relaxed">Tell a friend about OmneRide and help us grow the community before launch!</p>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  noValidate
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white rounded-3xl p-8 shadow-2xl"
                  aria-label="Waitlist signup form"
                >
                  <h3 className="font-display text-2xl font-bold text-navy-900 mb-1">Reserve your spot</h3>
                  <p className="text-gray-400 text-sm mb-7">Free to join · No credit card required</p>

                  <div className="flex flex-col gap-5">

                    {/* Name */}
                    <div>
                      <label htmlFor="wl_name" className="block text-sm font-semibold text-navy-800 mb-1.5">
                        Full Name <span className="text-red-400" aria-hidden="true">*</span>
                      </label>
                      <input
                        id="wl_name" type="text" autoComplete="name"
                        value={form.full_name}
                        onChange={(e) => handleChange('full_name', e.target.value)}
                        placeholder="Selam Tadesse"
                        className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-navy-400 transition-all ${errors.full_name ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-gray-50 focus:bg-white'}`}
                        aria-invalid={!!errors.full_name}
                        aria-describedby={errors.full_name ? 'err_name' : undefined}
                      />
                      {errors.full_name && <p id="err_name" role="alert" className="mt-1.5 text-xs text-red-500 flex items-center gap-1"><AlertCircle size={11} />{errors.full_name}</p>}
                    </div>

                    {/* Email with real-time check */}
                    <div>
                      <label htmlFor="wl_email" className="block text-sm font-semibold text-navy-800 mb-1.5">
                        Email Address <span className="text-red-400" aria-hidden="true">*</span>
                      </label>
                      <div className="relative">
                        <input
                          id="wl_email" type="email" autoComplete="email"
                          value={form.email}
                          onChange={(e) => handleChange('email', e.target.value)}
                          placeholder="selam@example.com"
                          className={`w-full px-4 py-3 pr-10 rounded-xl border text-sm focus:outline-none focus:ring-2 transition-all ${
                            emailStatus === 'taken'     ? 'border-amber-400 bg-amber-50 focus:ring-amber-300'
                            : emailStatus === 'available' ? 'border-emerald-400 bg-emerald-50 focus:ring-emerald-300'
                            : errors.email              ? 'border-red-400 bg-red-50 focus:ring-red-300'
                            : 'border-gray-200 bg-gray-50 focus:bg-white focus:ring-navy-400'
                          }`}
                          aria-invalid={!!errors.email || emailStatus === 'taken'}
                          aria-describedby="email_status_msg"
                        />
                        {/* Status icon */}
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                          {emailStatus === 'checking'  && <Loader2 size={16} className="text-gray-400 animate-spin" />}
                          {emailStatus === 'available' && <CheckCircle size={16} className="text-emerald-500" />}
                          {emailStatus === 'taken'     && <AlertCircle size={16} className="text-amber-500" />}
                        </div>
                      </div>
                      {/* Inline status messages */}
                      <div id="email_status_msg" aria-live="polite" className="mt-1.5 text-xs min-h-[16px]">
                        {emailStatus === 'available' && <span className="text-emerald-600 flex items-center gap-1"><CheckCircle size={11} /> Great — this email is available!</span>}
                        {emailStatus === 'taken'     && <span className="text-amber-600 flex items-center gap-1"><AlertCircle size={11} /> This email is already registered on our waitlist.</span>}
                        {errors.email && emailStatus === 'idle' && <span className="text-red-500 flex items-center gap-1"><AlertCircle size={11} />{errors.email}</span>}
                      </div>
                    </div>

                    {/* Phone */}
                    <div>
                      <label htmlFor="wl_phone" className="block text-sm font-semibold text-navy-800 mb-1.5">
                        Phone Number <span className="text-red-400" aria-hidden="true">*</span>
                      </label>
                      <input
                        id="wl_phone" type="tel" autoComplete="tel"
                        value={form.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        placeholder="+251 911 000 000"
                        className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-navy-400 transition-all ${errors.phone ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-gray-50 focus:bg-white'}`}
                        aria-invalid={!!errors.phone}
                        aria-describedby={errors.phone ? 'err_phone' : undefined}
                      />
                      {errors.phone && <p id="err_phone" role="alert" className="mt-1.5 text-xs text-red-500 flex items-center gap-1"><AlertCircle size={11} />{errors.phone}</p>}
                    </div>

                    {/* Role selector */}
                    <fieldset>
                      <legend className="block text-sm font-semibold text-navy-800 mb-2.5">
                        I want to… <span className="text-red-400" aria-hidden="true">*</span>
                      </legend>
                      <div className="grid grid-cols-3 gap-2">
                        {roleOptions.map(({ value, label, sub, emoji }) => (
                          <label
                            key={value}
                            className={`flex flex-col items-center text-center p-3 rounded-xl border-2 cursor-pointer transition-all select-none ${
                              form.role === value
                                ? 'border-navy-900 bg-navy-900 text-white shadow-lg shadow-navy-900/20'
                                : 'border-gray-200 bg-gray-50 text-gray-600 hover:border-navy-300 hover:bg-navy-50'
                            }`}
                          >
                            <input type="radio" name="role" value={value} checked={form.role === value} onChange={() => handleChange('role', value)} className="sr-only" />
                            <span className="text-xl mb-1">{emoji}</span>
                            <span className={`text-xs font-bold ${form.role === value ? 'text-white' : 'text-navy-800'}`}>{label}</span>
                            <span className={`text-[10px] mt-0.5 leading-tight ${form.role === value ? 'text-white/70' : 'text-gray-400'}`}>{sub}</span>
                          </label>
                        ))}
                      </div>
                    </fieldset>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={loading || emailStatus === 'taken'}
                      className="w-full bg-navy-900 text-white py-3.5 rounded-xl font-bold text-sm hover:bg-navy-800 transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-navy-900/20 hover:shadow-navy-900/30"
                    >
                      {loading
                        ? <><Loader2 size={16} className="animate-spin" /> Joining…</>
                        : emailStatus === 'taken'
                        ? '⚠ Email already registered'
                        : '🚀 Join the Waitlist — Free'}
                    </button>

                    <p className="text-center text-xs text-gray-400 leading-relaxed">
                      By joining you agree to receive launch updates via email. No spam, ever.
                    </p>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
