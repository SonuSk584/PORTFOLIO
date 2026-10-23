// "Ask Sonu": no AI. Matches the question against your data and returns a short answer plus links.
const L = (t, h) => ({ t, h })
export function resolveLink(h, d) {
  return { GITHUB: d.github, LINKEDIN: d.linkedin, RESUME: d.resume }[h] || h
}
export function ask(raw, d) {
  const q = raw.toLowerCase()
  const hits = Object.values(d.skills).flat().filter((s) => q.includes(s.toLowerCase().replace('.js', '')))
  if (hits.length) {
    const ps = d.projects.filter((p) => hits.some((h) => p.tags.join(' ').toLowerCase().includes(h.toLowerCase())))
    return { a: `Yes. ${hits.join(', ')} ${hits.length > 1 ? 'are' : 'is'} in his toolkit${ps.length ? `, used in ${ps.map((p) => p.title).join(' and ')}` : ''}.`, l: [L('Skills', '#skills'), ...ps.map((p) => L(p.title, '#work'))] }
  }
  const pj = d.projects.find((p) => p.title.toLowerCase().split(' ').some((w) => w.length > 3 && q.includes(w)))
  if (pj) return { a: pj.blurb, l: [...(pj.live ? [L('Live demo', pj.live)] : []), L('Source code', pj.github)] }
  const f = d.faq.find((f) => f.k.some((w) => q.includes(w)))
  if (f) return { a: f.a, l: f.l.map((x) => L(x.t, x.h)) }
  if (/built|project|made|work|show/.test(q)) return { a: `He has shipped ${d.projects.length} projects: ${d.projects.map((p) => p.title).join(', ')}.`, l: [L('View projects', '#work')] }
  if (/stack|tech|skill|know|language/.test(q)) return { a: 'Core stack: ' + Object.values(d.skills).slice(0, 3).map((a) => a.slice(0, 3).join(', ')).join('; ') + '.', l: [L('All skills', '#skills')] }
  return { a: 'I do not have that one yet. Try asking about availability, projects, skills or education, or send Sonu a message.', l: [L('Contact', '#contact')] }
}
