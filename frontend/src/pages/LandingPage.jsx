import { useState } from 'react';

const P = '#4C539F';   // purple
const D = '#393C46';   // dark text
const CARD_BG = '#F0F4FC';
const BORDER = '#EC0B48';

function StatCard({ num, label }) {
  return (
    <div style={{
      background: CARD_BG,
      border: `1.5px solid ${BORDER}`,
      borderRadius: '1rem',
      padding: '1.5rem 1.25rem',
      textAlign: 'left',
    }}>
      <div style={{ fontSize: '2rem', fontWeight: 800, color: P, lineHeight: 1 }}>{num}</div>
      <div style={{ fontSize: '0.875rem', color: D, marginTop: '0.35rem' }}>{label}</div>
    </div>
  );
}

function FaqItem({ q, a, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div
      onClick={() => setOpen(o => !o)}
      style={{ background: CARD_BG, border: `1.5px solid ${BORDER}`, borderRadius: '1rem', padding: '0.875rem 1rem', cursor: 'pointer' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.75rem' }}>
        <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: P, flex: 1 }}>{q}</span>
        <div style={{ width: '1.75rem', height: '1.75rem', borderRadius: '50%', background: 'rgba(216,218,220,0.70)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <svg viewBox="0 0 10 6" width="10" height="6" style={{ fill: 'rgba(76,83,159,0.90)', transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s ease' }}>
            <polygon points="0,0 10,0 5,6" />
          </svg>
        </div>
      </div>
      <div className={`lp-faq-body ${open ? 'open' : ''}`}>
        <p style={{ fontSize: '0.8125rem', color: D, margin: '0.5rem 0 0', lineHeight: 1.55 }}>{a}</p>
      </div>
    </div>
  );
}

const sec = {
  padding: '5rem 2rem',
  position: 'relative',
};

export default function LandingPage({ onAskBitsy }) {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #FFFFFF 0%, #DADDFF 40%, #A2A8FE 70%, #6069FF 100%)',
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      overflowX: 'hidden',
      color: D,
    }}>

      {/* ── FIXED NAVBAR ── */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0.875rem 2rem',
        background: 'rgba(255,255,255,0.72)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(76,83,159,0.1)',
        boxShadow: '0 2px 12px rgba(76,83,159,0.08)',
      }}>
        <span style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#000' }}>Blinc Logo</span>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          {[
            { label: 'The Challenge', id: 'challenge' },
            { label: 'The Solution', id: 'solution' },
            { label: 'About', id: 'about' },
            { label: 'FAQs', id: 'faqs' },
          ].map(({ label, id }) => (
            <button
              key={id}
              onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })}
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.875rem', color: D, fontWeight: 500, padding: 0 }}
            >
              {label}
            </button>
          ))}
          <button
            className="lp-btn-smooth"
            onClick={onAskBitsy}
            style={{ border: `1.5px solid ${P}`, borderRadius: '999px', padding: '0.4rem 1.25rem', background: P, color: '#FFF', fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer' }}
          >
            Ask Bitsy
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative', paddingTop: '4rem' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '2rem 2rem 6rem' }}>
          <h1 style={{ margin: '0 0 0.25rem', lineHeight: 1.2 }}>
            <span style={{ display: 'block', fontSize: 'clamp(1.75rem, 3.5vw, 2.625rem)', fontWeight: 700, color: P }}>
              Intern smarter at
            </span>
            <span style={{
              display: 'block',
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 800,
              background: 'linear-gradient(90deg, #F50642 0%, #A62A6E 33%, #923379 55%, #5F4A94 77%, #4E529E 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              BLINC Technologies
            </span>
          </h1>
          <p style={{ fontSize: '0.9375rem', color: D, maxWidth: '480px', margin: '1rem auto 1.75rem', lineHeight: 1.65 }}>
            Bitsy, the AI chatbot answers all your questions about BLIP (BLINC
            Internship Program) – instantly, accurately, any time of day.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              className="lp-btn-smooth"
              onClick={onAskBitsy}
              style={{ border: `1.5px solid ${P}`, borderRadius: '999px', padding: '0.5rem 1.5rem', background: 'transparent', color: D, fontSize: '0.875rem', cursor: 'pointer' }}
            >
              Ask Bitsy now
            </button>
            <button
              className="lp-btn-smooth"
              onClick={() => window.open('https://bitshareslabs.com/', '_blank')}
              style={{ border: `1.5px solid ${P}`, borderRadius: '999px', padding: '0.5rem 1.5rem', background: 'transparent', color: D, fontSize: '0.875rem', cursor: 'pointer' }}
            >
              View BLIP page
            </button>
          </div>
        </div>
      </section>

      {/* ── THE CHALLENGE ── */}
      <section id="challenge" style={{ ...sec, textAlign: 'center' }}>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, color: P, margin: '0 0 0.5rem', letterSpacing: '-0.01em' }}>
          THE CHALLENGE
        </h2>
        <p style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'rgba(76,83,159,0.84)', letterSpacing: '0.08em', margin: '0 0 0.75rem' }}>
          INTERNSHIP QUESTIONS SLOW YOU DOWN.
        </p>
        <p style={{ fontSize: '0.9rem', color: D, maxWidth: '520px', margin: '0 auto 3rem', lineHeight: 1.65 }}>
          Most interns have the same set of concerns before they even apply — and
          waiting days for an email reply shouldn't stop you from moving forward.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '1.25rem', maxWidth: '1000px', margin: '0 auto' }}>
          {[
            {
              icon: <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke={P} strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
              title: 'Slow response times',
              body: 'Sending emails and waiting 2–3 days for answers costs you preparation time during critical application windows.',
            },
            {
              icon: <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke={P} strokeWidth="2"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="9" y1="7" x2="15" y2="7"/><line x1="9" y1="11" x2="15" y2="11"/><line x1="9" y1="15" x2="13" y2="15"/></svg>,
              title: 'Unclear requirements',
              body: 'What documents do I need? Is my school a partner? What MOA applies to me? Questions pile up before you start.',
            },
            {
              icon: <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke={P} strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
              title: 'Role confusion',
              body: "Web Dev, Mobile, Design, or Social Media — it's hard to know which BLIP team is the right fit without clear info.",
            },
            {
              icon: <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke={P} strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
              title: 'Missing batch windows',
              body: 'Batches open in January, May, and September. Missing the right window means a months-long wait to reapply.',
            },
          ].map(({ icon, title, body }) => (
            <div key={title} className="lp-card-smooth" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ width: '2.75rem', height: '2.75rem', borderRadius: '50%', background: '#D8DADC', border: `2px solid ${BORDER}`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '-1.375rem', position: 'relative', zIndex: 1 }}>{icon}</div>
              <div style={{ background: CARD_BG, border: `1.5px solid ${BORDER}`, borderRadius: '1rem', padding: '2rem 1.25rem 1.25rem', textAlign: 'left', width: '100%' }}>
                <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: P, margin: '0 0 0.5rem' }}>{title}</h3>
                <p style={{ fontSize: '0.8125rem', color: D, margin: 0, lineHeight: 1.6 }}>{body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── THE SOLUTION ── */}
      <section id="solution" style={sec}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', gap: '3rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ flex: '0 0 280px', minWidth: '200px' }}>
            <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.75rem)', fontWeight: 900, color: P, margin: '0 0 0.75rem', lineHeight: 1.05 }}>THE<br />SOLUTION</h2>
            <p style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'rgba(76,83,159,0.84)', letterSpacing: '0.07em', margin: '0 0 0.75rem' }}>BITSY KNOWS BLIP INSIDE AND OUT</p>
            <p style={{ fontSize: '0.875rem', color: D, lineHeight: 1.65, margin: '0 0 0.75rem' }}>
              Bitsy is trained on all official BLINC internship information — roles, hiring steps, documents, school partnerships, and schedules — so you get the right answer immediately.
            </p>
            <p style={{ fontSize: '0.875rem', color: D, lineHeight: 1.65, margin: 0 }}>
              No waiting. No guessing. Just clear guidance whenever you need it.
            </p>
          </div>
          <div style={{ flex: 1, minWidth: '280px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {[
              { n: '01', title: 'Application documents', body: 'Endorsement letter, LOI, CV, portfolio — exactly what to submit' },
              { n: '02', title: 'Hiring process', body: 'All 6 steps from initial submission to onboarding' },
              { n: '03', title: 'Role responsibilities', body: "Detailed breakdown of each BLIP team's work and requirements", center: true },
              { n: '04', title: 'Partner schools & MOA', body: 'Whether your school is partnered and what agreement applies' },
              { n: '05', title: 'Batch schedules', body: 'Exact months when new internship batches open' },
            ].map(({ n, title, body, center }) => (
              <div key={n} className="lp-card-smooth" style={{ gridColumn: center ? '1 / -1' : undefined, display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: center ? '260px' : undefined, margin: center ? '0 auto' : undefined }}>
                <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '50%', background: '#D8DADC', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700, color: D, marginBottom: '-1.25rem', position: 'relative', zIndex: 1 }}>{n}</div>
                <div style={{ background: CARD_BG, border: `1.5px solid ${BORDER}`, borderRadius: '1rem', padding: '1.75rem 1rem 1rem', textAlign: 'center', width: '100%' }}>
                  <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: P, margin: '0 0 0.35rem' }}>{title}</h4>
                  <p style={{ fontSize: '0.8rem', color: D, margin: 0, lineHeight: 1.55 }}>{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT BLINC ── */}
      <section id="about" style={{ ...sec, textAlign: 'center' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, color: P, margin: '0 0 0.5rem', letterSpacing: '-0.01em' }}>
            ABOUT BLINC
          </h2>
          <p style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'rgba(76,83,159,0.84)', letterSpacing: '0.07em', margin: '0 0 1rem' }}>
            A BLOCKCHAIN &amp; WEB TECHNOLOGY COMPANY – BASED IN BAGUIO
          </p>
          <p style={{ fontSize: '0.9rem', color: D, maxWidth: '640px', margin: '0 auto 3.5rem', lineHeight: 1.65 }}>
            BITSHARES LABS, INC. (BLINC) builds blockchain platforms, web and mobile applications, and digital products.
            We're passionate, competitive, and flexible and we invest in the next generation of tech talent through BLIP.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', maxWidth: '580px', margin: '0 auto' }}>
            <div style={{ justifySelf: 'end', width: '220px' }}><StatCard num="212+" label="Total interns trained" /></div>
            <div style={{ justifySelf: 'start', width: '220px' }}><StatCard num="15" label="Batches completed" /></div>
            <div style={{ justifySelf: 'start', width: '220px' }}><StatCard num="11" label="Interns hired full-time" /></div>
            <div style={{ justifySelf: 'end', width: '220px' }}><StatCard num="50+" label="Industry partners" /></div>
          </div>
        </div>
      </section>

      {/* ── FAQs ── */}
      <section id="faqs" style={sec}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', gap: '3rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <div style={{ flex: '0 0 300px', minWidth: '220px' }}>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, color: P, margin: '0 0 0.5rem' }}>FAQs</h2>
            <p style={{ fontSize: '0.75rem', fontWeight: 700, color: 'rgba(76,83,159,0.84)', letterSpacing: '0.07em', margin: '0 0 0.5rem' }}>
              EVERYTHING INTERNS ASK BEFORE APPLYING
            </p>
            <p style={{ fontSize: '0.875rem', color: D, margin: '0 0 0.5rem', lineHeight: 1.6 }}>
              These are the real questions that come up during BLIP recruitment.
            </p>
            <p style={{ fontSize: '0.875rem', color: D, margin: '0 0 1.75rem', lineHeight: 1.6 }}>
              Bitsy can answer all of these — and more.
            </p>
            <div style={{ background: CARD_BG, border: `1.5px solid ${BORDER}`, borderRadius: '1rem', padding: '1.25rem' }}>
              <p style={{ fontSize: '0.875rem', fontWeight: 700, color: P, margin: '0 0 0.5rem' }}>STILL HAVE A QUESTION?</p>
              <p style={{ fontSize: '0.8125rem', color: D, margin: '0 0 0.875rem', lineHeight: 1.55 }}>
                Can't find the answer to your question? Send us an email and we'll get back to you as soon as possible.
              </p>
              <button
                className="lp-btn-smooth"
                onClick={() => window.location.href = 'mailto:blip@bitshareslabs.com'}
                style={{ border: `1.5px solid ${P}`, borderRadius: '999px', padding: '0.4rem 1.25rem', background: 'transparent', color: D, fontSize: '0.875rem', cursor: 'pointer' }}
              >
                Send Email
              </button>
            </div>
          </div>

          <div style={{ flex: 1, minWidth: '280px', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {[
              { q: 'WHEN DOES THE NEXT BLIP BATCH OPEN?', a: 'Batches open in January, May, and September. Keep an eye on the official BLINC careers page for the most current schedule and deadlines.' },
              { q: 'WHAT DOCUMENTS DO I NEED TO SUBMIT?', a: "Endorsement letter, letter of intent (LOI), CV, and portfolio — exactly what you submit depends on the team you're applying to." },
              { q: "WHAT IF MY SCHOOL ISN'T A PARTNER SCHOOL?", a: 'Contact BLINC directly to check if your school has an MOA or whether you can apply as a non-partner institution.' },
              { q: 'HOW DO I KNOW WHICH BLIP TEAM TO APPLY TO?', a: 'Ask Bitsy for a detailed breakdown of Web Dev, Mobile, Design, and Social Media roles — it will help you figure out the best fit.' },
              { q: 'IS THERE A CHANCE OF GETTING HIRED FULL-TIME AFTER?', a: 'Yes! BLINC has hired 11+ interns full-time after completing their BLIP stint.' },
              { q: 'WHERE IS THE BLINC OFFICE LOCATED?', a: 'Level 5 Abanao Square Mall, Baguio City 2600, Philippines.' },
            ].map(({ q, a }, i) => <FaqItem key={q} q={q} a={a} defaultOpen={i === 0} />)}
          </div>
        </div>
      </section>

      {/* ── CHAT WITH BITSY ── */}
      <section id="chat" style={{ ...sec, textAlign: 'center' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 900, color: P, margin: '0 0 0.5rem', letterSpacing: '-0.01em' }}>
            Chat with bitsy
          </h2>
          <p style={{ fontSize: '0.9rem', color: D, maxWidth: '520px', margin: '0 auto 2.5rem', lineHeight: 1.65 }}>
            Ask anything about BLIP — documents, roles, batch dates, requirements. Bitsy is live and ready.
          </p>
          <div style={{ maxWidth: '540px', margin: '0 auto', background: '#FFFFFF', borderRadius: '1.25rem', padding: '1.25rem 1.25rem 0', boxShadow: '0 24px 48px rgba(0,0,0,0.12)' }}>
            <img src="/cbitsy.png" alt="Chat with Bitsy preview" style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '0.75rem 0.75rem 0 0' }} />
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ ...sec, textAlign: 'center' }}>
        <p style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'rgba(76,83,159,0.84)', letterSpacing: '0.08em', margin: '0 0 0.5rem' }}>READY TO BEGIN?</p>
        <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, color: P, margin: '0 0 1rem', letterSpacing: '-0.01em' }}>
          Start your BLIP journey today.
        </h2>
        <p style={{ fontSize: '0.9rem', color: D, maxWidth: '520px', margin: '0 auto 2.5rem', lineHeight: 1.65 }}>
          Apply for the next batch, explore available roles, or just ask Bitsy your first question right now.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            className="lp-btn-smooth"
            onClick={onAskBitsy}
            style={{ border: `1.5px solid ${P}`, borderRadius: '999px', padding: '0.6rem 2rem', background: P, color: '#FFF', fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer' }}
          >
            Ask Bitsy now
          </button>
          <button
            className="lp-btn-smooth"
            onClick={() => window.open('https://bitshareslabs.com/', '_blank')}
            style={{ border: `1.5px solid ${P}`, borderRadius: '999px', padding: '0.6rem 2rem', background: 'transparent', color: D, fontSize: '0.9rem', cursor: 'pointer' }}
          >
            View BLIP page
          </button>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: '#E6E8F8', padding: '2rem', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div style={{ fontSize: '0.75rem', color: D, lineHeight: 1.6, textAlign: 'left' }}>
            <strong style={{ color: P }}>BITSHARES LABS, INC. (BLINC)</strong><br />
            Level 5 Abanao Square Mall, Baguio City 2600, Philippines<br />
            Globe: +63 917 459 7000 · Smart: +63 919 627 7000
          </div>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <a href="#" aria-label="Facebook" style={{ width: '2.5rem', height: '2.5rem', borderRadius: '50%', background: P, display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}>
              <svg width="16" height="16" fill="#FFF" viewBox="0 0 24 24"><path d="M9 8H7v3h2v9h3v-9h3l.5-3H12V6c0-.88.72-1 1-1h2V2h-3c-2.76 0-5 2.24-5 5v1z"/></svg>
            </a>
            <a href="#" aria-label="Twitter" style={{ width: '2.5rem', height: '2.5rem', borderRadius: '50%', background: P, display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}>
              <svg width="14" height="14" fill="#FFF" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a href="#" aria-label="LinkedIn" style={{ width: '2.5rem', height: '2.5rem', borderRadius: '50%', background: P, display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}>
              <svg width="14" height="14" fill="#FFF" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
}
