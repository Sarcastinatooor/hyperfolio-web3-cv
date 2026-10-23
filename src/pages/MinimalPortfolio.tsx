import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, ExternalLink, Menu, X } from "lucide-react";
import { useState } from "react";

const chapters = ["Intro", "Work", "Writing", "Signals", "Contact"];

const work = [
  { year: "2024—25", company: "Brahma", role: "Growth marketing manager", note: "Turned product narratives into distribution loops for an onchain account abstraction protocol.", metric: "$300M", metricLabel: "peak TVL" },
  { year: "2023—24", company: "Liminal", role: "Content & communications", note: "Built the technical content engine behind a digital-asset custody business.", metric: "Top 3", metricLabel: "organic rankings" },
  { year: "2022—23", company: "BitMart", role: "Senior BD manager", note: "Built a KOL-led acquisition channel across the Indian crypto market.", metric: "$100M+", metricLabel: "futures volume" },
];

const writing = [
  { label: "Brahma / essay", title: "Bringing AI agents onchain", href: "https://brahma.fi/blog/bringing-ai-agents-onchain-introducing-the-consolekit" },
  { label: "Liminal / research", title: "A decade of crypto hacks", href: "https://www.liminalcustody.com/insights/a-decade-of-hacks/" },
  { label: "X / thread", title: "The future of crypto cards", href: "https://x.com/BrahmaFi/status/1953510651235573973" },
];

const campaigns = [
  { name: "Berachain launch", detail: "Partner campaign · narrative + KOL distribution", value: "600%+", label: "social engagement" },
  { name: "Imprint NFT", detail: "Product campaign · community activation", value: "$300M", label: "peak TVL" },
  { name: "BitMart India", detail: "Exchange growth · 80+ KOL partnerships", value: "100M+", label: "futures volume" },
];

export default function MinimalPortfolio() {
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const heroY = useTransform(scrollYProgress, [0, 0.25], [0, -120]);

  return (
    <div className="minimal-shell">
      <motion.div className="minimal-progress" style={{ scaleX: progress }} />
      <header className="minimal-nav">
        <a href="#intro" className="minimal-mark">SK<span> / 26</span></a>
        <nav className={open ? "minimal-nav-links is-open" : "minimal-nav-links"}>
          {chapters.map((chapter) => <a key={chapter} href={`#${chapter.toLowerCase()}`} onClick={() => setOpen(false)}>{chapter}</a>)}
        </nav>
        <button className="minimal-menu" onClick={() => setOpen((value) => !value)} aria-label="Toggle navigation">{open ? <X size={20} /> : <Menu size={20} />}</button>
      </header>

      <main>
        <section id="intro" className="minimal-hero">
          <motion.div className="minimal-hero-copy" style={{ y: heroY }}>
            <p className="minimal-kicker">Sheel Khandelwal · GTM engineer</p>
            <h1>I make technical<br /><em>things move.</em></h1>
            <p className="minimal-lede">A marketer who can read the code, an engineer of distribution. I build the systems, stories and campaigns that take web3 products from good to everywhere.</p>
            <a className="minimal-scroll" href="#work"><span>Scroll to explore</span><ArrowDownRight size={18} /></a>
          </motion.div>
          <div className="minimal-hero-index"><span>01</span><span>of</span><span>05</span></div>
        </section>

        <section id="work" className="minimal-section">
          <div className="minimal-section-head"><span className="minimal-index">01</span><div><p className="minimal-kicker">Selected work</p><h2>Where strategy<br /><em>became signal.</em></h2></div></div>
          <div className="minimal-work-list">{work.map((item, index) => <motion.article key={item.company} className="minimal-work-row" initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ delay: index * 0.08 }}><div className="minimal-year">{item.year}</div><div><h3>{item.company}</h3><p className="minimal-role">{item.role}</p><p className="minimal-note">{item.note}</p></div><div className="minimal-metric"><strong>{item.metric}</strong><span>{item.metricLabel}</span></div><ArrowUpRight className="minimal-arrow" size={20} /></motion.article>)}</div>
        </section>

        <section id="writing" className="minimal-section minimal-writing"><div className="minimal-section-head"><span className="minimal-index">02</span><div><p className="minimal-kicker">Writing / thinking</p><h2>Ideas with<br /><em>receipts.</em></h2></div></div><div className="minimal-writing-grid">{writing.map((item, index) => <a className="minimal-writing-card" href={item.href} target="_blank" rel="noreferrer" key={item.title}><span>{String(index + 1).padStart(2, "0")} · {item.label}</span><h3>{item.title}</h3><ExternalLink size={18} /></a>)}</div></section>

        <section id="signals" className="minimal-section minimal-signals"><div className="minimal-section-head"><span className="minimal-index">03</span><div><p className="minimal-kicker">Campaigns / distribution</p><h2>Make a little<br /><em>noise.</em></h2></div></div><div className="minimal-campaigns">{campaigns.map((campaign, index) => <div className="minimal-campaign" key={campaign.name}><span className="minimal-campaign-no">0{index + 1}</span><div><h3>{campaign.name}</h3><p>{campaign.detail}</p></div><div className="minimal-campaign-value"><strong>{campaign.value}</strong><span>{campaign.label}</span></div></div>)}</div><div className="minimal-x-note"><span>Currently on X</span><a href="https://x.com/sarcastinator" target="_blank" rel="noreferrer">@sarcastinator <ArrowUpRight size={16} /></a><p>Writing about crypto, agents, growth and whatever the timeline is getting wrong.</p></div></section>

        <section id="contact" className="minimal-contact"><p className="minimal-kicker">04 / Say hello</p><h2>Have a hard<br /><em>problem?</em></h2><a className="minimal-email" href="mailto:sheel@protonmail.com">Let's talk <ArrowUpRight size={24} /></a><footer><span>© 2026 Sheel Khandelwal</span><span>Built for the curious</span></footer></section>
      </main>
    </div>
  );
}
