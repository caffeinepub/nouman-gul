import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import type { Variants } from "motion/react";
import { useEffect, useState } from "react";
import { SiFacebook, SiInstagram, SiTiktok } from "react-icons/si";
import { useGetProfile } from "./hooks/useQueries";

const NAV_LINKS = [
  { label: "HOME", href: "#hero" },
  { label: "ABOUT", href: "#about" },
  { label: "VIDEO", href: "#video" },
  { label: "CONTACT", href: "#contact" },
];

const STATS = [
  { value: "50+", label: "Videos" },
  { value: "100K+", label: "Followers" },
  { value: "200+", label: "Posts" },
  { value: "5+", label: "Years Active" },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const fadeRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut", delay: 0.15 },
  },
};

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { data: profile, isLoading } = useGetProfile();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToContact = () => {
    window.location.hash = "contact";
    setMenuOpen(false);
  };

  const currentYear = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ─────────── NAVBAR ─────────── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-background/95 backdrop-blur-md shadow-lg shadow-black/30 border-b border-border"
            : "bg-background/70 backdrop-blur-sm"
        }`}
        style={{ height: "76px" }}
        data-ocid="nav.section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between gap-4">
          {/* Brand */}
          <a
            href="#hero"
            className="font-playfair text-gold font-bold tracking-wider uppercase text-sm lg:text-base whitespace-nowrap"
            data-ocid="nav.link"
          >
            NOUMAN GUL LAL CHUZA
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-muted-foreground hover:text-gold text-[11px] font-semibold tracking-[0.2em] uppercase transition-colors duration-200"
                data-ocid="nav.link"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-3">
            <a href="#contact" className="hidden md:block">
              <Button
                className="bg-gold text-primary-foreground hover:bg-gold-light font-semibold text-[11px] tracking-[0.2em] uppercase px-5 h-9 rounded-sm"
                data-ocid="nav.primary_button"
              >
                CONTACT ME
              </Button>
            </a>
            <button
              type="button"
              className="md:hidden text-foreground p-1.5 rounded hover:bg-card transition-colors"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              data-ocid="nav.toggle"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="md:hidden bg-card border-b border-border px-4 py-5 flex flex-col gap-4"
            >
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-muted-foreground hover:text-gold text-xs font-semibold tracking-[0.2em] uppercase transition-colors py-1"
                  onClick={() => setMenuOpen(false)}
                  data-ocid="nav.link"
                >
                  {link.label}
                </a>
              ))}
              <Button
                type="button"
                className="w-full bg-gold text-primary-foreground hover:bg-gold-light font-semibold text-[11px] tracking-[0.2em] uppercase h-9 rounded-sm"
                onClick={scrollToContact}
                data-ocid="nav.primary_button"
              >
                CONTACT ME
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ─────────── HERO ─────────── */}
      <section
        id="hero"
        className="min-h-screen pt-[76px] flex items-center bg-background overflow-hidden"
        data-ocid="hero.section"
      >
        {/* Subtle background glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 70% 50%, oklch(0.72 0.12 80 / 0.06) 0%, transparent 70%)",
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Left: Profile Photo */}
            <motion.div
              variants={fadeLeft}
              initial="hidden"
              animate="visible"
              className="flex justify-center lg:justify-end"
            >
              <div className="relative">
                {/* Glow halo */}
                <div
                  className="absolute inset-0 rounded-2xl scale-105"
                  style={{
                    background:
                      "radial-gradient(ellipse at center, oklch(0.72 0.12 80 / 0.18) 0%, transparent 70%)",
                    filter: "blur(24px)",
                  }}
                />
                <img
                  src="/assets/uploads/profile.jpeg"
                  alt="Nouman Gul Lal Chuza"
                  className="relative w-64 h-[360px] sm:w-80 sm:h-[450px] lg:w-[360px] lg:h-[500px] object-cover rounded-2xl shadow-2xl shadow-black/60 border border-gold/20"
                />
                {/* Gold corner accent */}
                <div className="absolute -bottom-3 -right-3 w-16 h-16 border-b-2 border-r-2 border-gold/50 rounded-br-xl" />
                <div className="absolute -top-3 -left-3 w-16 h-16 border-t-2 border-l-2 border-gold/50 rounded-tl-xl" />
              </div>
            </motion.div>

            {/* Right: Name + CTA */}
            <motion.div
              variants={fadeRight}
              initial="hidden"
              animate="visible"
              className="flex flex-col gap-3"
            >
              {/* Large display name */}
              <div className="font-playfair font-bold leading-[0.9] select-none">
                <div
                  className="uppercase text-foreground tracking-tight"
                  style={{ fontSize: "clamp(56px, 9vw, 104px)" }}
                >
                  NOUMAN
                </div>
                <div
                  className="uppercase text-foreground tracking-tight"
                  style={{ fontSize: "clamp(56px, 9vw, 104px)" }}
                >
                  GUL
                </div>
              </div>

              {/* Gold subtitle */}
              <div className="font-inter font-bold tracking-[0.35em] uppercase text-gold text-xl sm:text-2xl lg:text-3xl mt-1">
                LAL CHUZA
              </div>

              {/* Tagline */}
              <div className="mt-2">
                {isLoading ? (
                  <div className="space-y-2">
                    <Skeleton
                      className="h-4 w-3/4 bg-muted"
                      data-ocid="hero.loading_state"
                    />
                    <Skeleton className="h-4 w-1/2 bg-muted" />
                  </div>
                ) : (
                  <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-md">
                    {profile?.tagline ||
                      "Content Creator, Entertainer & Digital Personality from Pakistan"}
                  </p>
                )}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4 mt-4">
                <a href="#video">
                  <Button
                    className="bg-gold text-primary-foreground hover:bg-gold-light font-semibold text-[11px] tracking-[0.2em] uppercase px-8 h-11 rounded-sm"
                    data-ocid="hero.primary_button"
                  >
                    WATCH VIDEO
                  </Button>
                </a>
                <a href="#about">
                  <Button
                    variant="outline"
                    className="border-gold/50 text-gold bg-transparent hover:bg-gold/10 hover:border-gold font-semibold text-[11px] tracking-[0.2em] uppercase px-8 h-11 rounded-sm"
                    data-ocid="hero.secondary_button"
                  >
                    ABOUT ME
                  </Button>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─────────── ABOUT ─────────── */}
      <section
        id="about"
        className="py-20 lg:py-28 bg-card"
        data-ocid="about.section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Left: My Story */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-col gap-6"
            >
              <div>
                <span className="font-inter font-semibold text-[11px] tracking-[0.3em] uppercase text-gold">
                  MY STORY
                </span>
                <h2 className="font-playfair font-bold text-3xl sm:text-4xl lg:text-5xl text-foreground mt-2 leading-tight">
                  A Bit About Me
                </h2>
              </div>

              {isLoading ? (
                <div className="space-y-3" data-ocid="about.loading_state">
                  <Skeleton className="h-4 w-full bg-muted" />
                  <Skeleton className="h-4 w-5/6 bg-muted" />
                  <Skeleton className="h-4 w-4/6 bg-muted" />
                  <Skeleton className="h-4 w-full bg-muted" />
                  <Skeleton className="h-4 w-3/4 bg-muted" />
                </div>
              ) : (
                <div className="space-y-4 text-muted-foreground leading-relaxed text-base">
                  <p>
                    {profile?.bio ||
                      "Mera naam Nouman Gul Lal Chuza hai. Main Pakistan ka ek mashhoor content creator aur entertainer hoon. Apni unique personality aur engaging videos ki wajah se log mujhe bohot pyar karte hain."}
                  </p>
                  <p>
                    Social media par meri journey ne mujhe lakhon followers tak
                    pahuncha diya hai. Main apne fans ke saath zindagi ke
                    dilchasp lamhe share karta hoon aur unhe khush rakhne ki
                    koshish karta rehta hoon har roz.
                  </p>
                </div>
              )}
            </motion.div>

            {/* Right: Stats Grid */}
            <div className="grid grid-cols-2 gap-4 lg:gap-5">
              {STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-background border border-border rounded-xl p-6 flex flex-col items-center justify-center text-center hover:border-gold/40 transition-all duration-300 hover:shadow-gold group"
                  data-ocid={`about.item.${i + 1}`}
                >
                  <span className="font-playfair font-bold text-4xl sm:text-5xl text-gold group-hover:text-gold-light transition-colors">
                    {stat.value}
                  </span>
                  <span className="text-muted-foreground font-inter text-xs font-semibold mt-2 tracking-[0.15em] uppercase">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─────────── VIDEO ─────────── */}
      <section
        id="video"
        className="py-20 lg:py-28 bg-background"
        data-ocid="video.section"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section heading */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <span className="font-inter font-semibold text-[11px] tracking-[0.3em] uppercase text-gold">
              FEATURED
            </span>
            <h2 className="font-playfair font-bold text-3xl sm:text-4xl lg:text-5xl text-foreground mt-2">
              My Video
            </h2>
            <div className="w-14 h-0.5 bg-gold mx-auto mt-4" />
          </motion.div>

          {/* Video card */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative rounded-2xl overflow-hidden border border-gold/30 shadow-2xl shadow-black/50"
            data-ocid="video.card"
          >
            {/* Gold corner accents */}
            <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-gold/70 rounded-tl-2xl z-10 pointer-events-none" />
            <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-gold/70 rounded-tr-2xl z-10 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-gold/70 rounded-bl-2xl z-10 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-gold/70 rounded-br-2xl z-10 pointer-events-none" />

            <video
              src="/assets/uploads/profile-video.mp4"
              autoPlay
              muted
              loop
              controls
              playsInline
              className="w-full aspect-video object-contain bg-black"
              data-ocid="video.canvas_target"
            />
          </motion.div>
        </div>
      </section>

      {/* ─────────── FOOTER / CONTACT ─────────── */}
      <footer
        id="contact"
        className="bg-card border-t border-border"
        data-ocid="footer.section"
      >
        {/* Connect section */}
        <div className="text-center py-14 border-b border-border px-4">
          <span className="font-inter font-semibold text-[11px] tracking-[0.3em] uppercase text-muted-foreground">
            GET IN TOUCH
          </span>
          <h2 className="font-playfair font-bold text-3xl sm:text-4xl text-foreground mt-2">
            Connect With Me
          </h2>
          <div className="w-10 h-0.5 bg-gold mx-auto mt-3 mb-6" />

          {/* Social icons */}
          <div className="flex justify-center items-center gap-6">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-gold transition-colors duration-200 p-2 hover:bg-gold/10 rounded-lg"
              aria-label="Instagram"
              data-ocid="footer.link"
            >
              <SiInstagram size={20} />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-gold transition-colors duration-200 p-2 hover:bg-gold/10 rounded-lg"
              aria-label="Facebook"
              data-ocid="footer.link"
            >
              <SiFacebook size={20} />
            </a>
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-gold transition-colors duration-200 p-2 hover:bg-gold/10 rounded-lg"
              aria-label="TikTok"
              data-ocid="footer.link"
            >
              <SiTiktok size={20} />
            </a>
          </div>
        </div>

        {/* Footer bar: brand | nav | social */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Brand */}
            <span className="font-playfair text-gold font-bold text-sm tracking-wider uppercase">
              NOUMAN GUL LAL CHUZA
            </span>

            {/* Nav links */}
            <nav className="flex flex-wrap justify-center gap-5 sm:gap-6">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-muted-foreground hover:text-gold text-[11px] font-semibold tracking-[0.2em] uppercase transition-colors"
                  data-ocid="footer.link"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Social icons small */}
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-gold transition-colors"
                aria-label="Instagram"
                data-ocid="footer.link"
              >
                <SiInstagram size={16} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-gold transition-colors"
                aria-label="Facebook"
                data-ocid="footer.link"
              >
                <SiFacebook size={16} />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-gold transition-colors"
                aria-label="TikTok"
                data-ocid="footer.link"
              >
                <SiTiktok size={16} />
              </a>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-border py-5 text-center">
            <p className="text-muted-foreground text-xs">
              &copy; {currentYear}. Built with ❤️ using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold hover:underline"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
