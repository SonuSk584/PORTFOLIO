import { useState } from 'react'
import { Github, Linkedin, Mail } from 'lucide-react'
import Section from './Section'
import { data } from '../data/portfolio'
const KEY = import.meta.env.VITE_WEB3FORMS_KEY || data.web3formsKey
const field = 'w-full rounded-lg border border-line bg-panel px-4 py-3.5 outline-none transition focus:border-ac'
const link = 'inline-flex items-center gap-2.5 rounded-lg border border-line px-5 py-3 transition hover:-translate-y-0.5 hover:border-ac'
export default function Contact() {
  const [msg, setMsg] = useState('')
  const [busy, setBusy] = useState(false)
  async function submit(e) {
    e.preventDefault()
    const form = e.currentTarget
    if (!KEY) return setMsg(`Form not connected yet. Add your Web3Forms key (see README), or email ${data.email}.`)
    setBusy(true); setMsg('Sending...')
    const fd = new FormData(form)
    fd.append('access_key', KEY); fd.append('subject', 'New message from your portfolio')
    try {
      const r = await (await fetch('https://api.web3forms.com/submit', { method: 'POST', body: fd })).json()
      if (r.success) { setMsg('Sent. Thanks, I will reply soon.'); form.reset() } else setMsg('Could not send: ' + r.message)
    } catch { setMsg(`Network error. Email ${data.email} instead.`) }
    setBusy(false)
  }
  return (
    
    <Section id="contact">
      <div className="grid gap-12 md:grid-cols-2">
        <div>
          <p className="mb-6 text-mu">Hiring, or have a project in mind? Send a note.</p>
          <div className="flex flex-col items-start gap-3">
            <a className={link} href={data.github} target="_blank" rel="noopener noreferrer"><Github size={18} /> GitHub</a>
            <a className={link} href={data.linkedin} target="_blank" rel="noopener noreferrer"><Linkedin size={18} /> LinkedIn</a>
            <a className={link} href={`mailto:${data.email}`}><Mail size={18} /> {data.email}</a>
          </div>
        </div>
        <form onSubmit={submit} className="grid gap-3.5">
          <input className={field} name="name" placeholder="Your name" aria-label="Your name" required />
          <input className={field} name="email" type="email" placeholder="Your email" aria-label="Your email" required />
          <textarea className={`${field} min-h-36 resize-y`} name="message" placeholder="Your message" aria-label="Your message" required />
          <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} />
          <button disabled={busy} className="rounded-lg bg-ac px-6 py-3 font-semibold text-ink transition hover:brightness-110 disabled:opacity-60">Send message</button>
          <div role="status" className="min-h-6 text-[15px] text-mu">{msg}</div>
        </form>
      </div>
    </Section>
  )
}
