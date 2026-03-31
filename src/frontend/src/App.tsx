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
  { label: "PHOTOS", href: "#photos" },
  { label: "VIDEO", href: "#video" },
  { label: "CONTACT", href: "#contact" },
];

const STATS = [
  { value: "100%", label: "Pure Breed" },
  { value: "Fresh", label: "Daily Eggs" },
  { value: "🇧🇭", label: "Bahrain" },
  { value: "1 Click", label: "Doorstep Delivery" },
];

const EGG_BENEFITS = [
  {
    icon: "🥚",
    title: "High Protein",
    desc: "Ande mein zaruri proteins hote hain jo muscles banate hain aur body ko mazboot rakhte hain.",
  },
  {
    icon: "🧠",
    title: "Brain Health",
    desc: "Ande mein Choline hota hai jo brain ke liye bohot zaroori hai -- yaaddasht aur concentration behtar karta hai.",
  },
  {
    icon: "💪",
    title: "Energy Boost",
    desc: "Roz ek anda khana jism ko din bhar energy deta hai. Subah ke nashte mein anda sabse behtareen choice hai.",
  },
  {
    icon: "❤️",
    title: "Heart & Bones",
    desc: "Ande mein Vitamin D, Calcium aur Omega-3 hote hain jo dil aur haddiyon ko taqatwar banate hain.",
  },
  {
    icon: "🌟",
    title: "Vitamins & Minerals",
    desc: "Vitamin A, B12, Iron aur Zinc -- ek ande mein itne nutrients hain ke doctors roz khane ki salah dete hain.",
  },
  {
    icon: "🐔",
    title: "Lal Chuza Special",
    desc: "Lal Chuza ke ande extra fresh aur naturally nutritious hote hain -- seedha aapke darwaze tak pahunchte hain.",
  },
];

const GALLERY_IMAGES = [
  "/assets/uploads/profile.jpeg",
  "/assets/whatsapp_image_2026-03-21_at_3.00.20_pm_1-019d42fb-2713-73ba-bc65-7c6e1971d3c6.jpeg",
  "/assets/whatsapp_image_2026-03-31_at_1.27.13_pm-019d4301-d88b-75bb-90eb-3302db2992a3.jpeg",
  "/assets/whatsapp_image_2026-03-31_at_1.27.14_pm-019d4301-d785-75d7-af24-247a5d7ede15.jpeg",
  "/assets/whatsapp_image_2026-03-31_at_1.27.14_pm_1-019d4301-d983-737c-877f-72c08435a08e.jpeg",
  "/assets/whatsapp_image_2026-03-31_at_1.27.14_pm_2-019d4301-d822-71ed-aed6-cf7e3643f0a1.jpeg",
  "/assets/whatsapp_image_2026-03-31_at_1.27.14_pm_2-019d4302-bcf4-730b-a9e8-ae5a90448f7e.jpeg",
  "/assets/whatsapp_image_2026-03-31_at_1.27.14_pm_3-019d4301-d7a0-77ab-88c6-fe813a62dfdc.jpeg",
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
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);
  const { isLoading } = useGetProfile();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxImg(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
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
          <a
            href="#hero"
            className="font-playfair text-gold font-bold tracking-wider uppercase text-sm lg:text-base whitespace-nowrap"
            data-ocid="nav.link"
          >
            NOUMAN GUL LAL CHUZA
          </a>

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

          <div className="flex items-center gap-3">
            <a href="#contact" className="hidden md:block">
              <Button
                className="bg-gold text-primary-foreground hover:bg-gold-light font-semibold text-[11px] tracking-[0.2em] uppercase px-5 h-9 rounded-sm"
                data-ocid="nav.primary_button"
              >
                ORDER NOW
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
                ORDER NOW
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
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 70% 50%, oklch(0.72 0.12 80 / 0.06) 0%, transparent 70%)",
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <motion.div
              variants={fadeLeft}
              initial="hidden"
              animate="visible"
              className="flex justify-center lg:justify-end"
            >
              <div className="relative">
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
                <div className="absolute -bottom-3 -right-3 w-16 h-16 border-b-2 border-r-2 border-gold/50 rounded-br-xl" />
                <div className="absolute -top-3 -left-3 w-16 h-16 border-t-2 border-l-2 border-gold/50 rounded-tl-xl" />
              </div>
            </motion.div>

            <motion.div
              variants={fadeRight}
              initial="hidden"
              animate="visible"
              className="flex flex-col gap-3"
            >
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

              <div className="font-inter font-bold tracking-[0.35em] uppercase text-gold text-xl sm:text-2xl lg:text-3xl mt-1">
                LAL CHUZA
              </div>

              <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-md mt-2">
                Bahrain International Lal Chuza — ab sirf ek click mein seedha
                aapke darwaze tak!
              </p>

              <div className="flex flex-wrap gap-4 mt-4">
                <a href="#contact">
                  <Button
                    className="bg-gold text-primary-foreground hover:bg-gold-light font-semibold text-[11px] tracking-[0.2em] uppercase px-8 h-11 rounded-sm"
                    data-ocid="hero.primary_button"
                  >
                    ORDER NOW
                  </Button>
                </a>
                <a href="#about">
                  <Button
                    variant="outline"
                    className="border-gold/50 text-gold bg-transparent hover:bg-gold/10 hover:border-gold font-semibold text-[11px] tracking-[0.2em] uppercase px-8 h-11 rounded-sm"
                    data-ocid="hero.secondary_button"
                  >
                    ABOUT US
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
          {/* Section heading */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="font-inter font-semibold text-[11px] tracking-[0.3em] uppercase text-gold">
              WHO WE ARE
            </span>
            <h2 className="font-playfair font-bold text-3xl sm:text-4xl lg:text-5xl text-foreground mt-2 leading-tight">
              About Lal Chuza
            </h2>
            <div className="w-14 h-0.5 bg-gold mx-auto mt-4" />
          </motion.div>

          {/* Story + Stats */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start mb-16">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-col gap-5"
            >
              {isLoading ? (
                <div className="space-y-3" data-ocid="about.loading_state">
                  <Skeleton className="h-4 w-full bg-muted" />
                  <Skeleton className="h-4 w-5/6 bg-muted" />
                  <Skeleton className="h-4 w-4/6 bg-muted" />
                </div>
              ) : (
                <div className="space-y-5 text-muted-foreground leading-relaxed text-base">
                  <p className="text-foreground font-semibold text-lg">
                    Yeh hai asli Lal Chuza — Bahrain mein rehne wala, Bahrain
                    International Chuza.
                  </p>
                  <p>
                    Humara Lal Chuza Bahrain mein pala hua hai aur apni nasal ki
                    wajah se poori duniya mein mashhoor hai. Iska gosht aur ande
                    dono hi behtareen quality ke hain — 100% pure breed, bilkul
                    fresh.
                  </p>
                  <p>
                    Aur ab khushkhabri yeh hai ke aapko kahin jaane ki zaroorat
                    nahi — sirf ek click karo aur Lal Chuza seedha aapke ghar ke
                    darwaze tak pahunch jaata hai. Bahrain mein jahan bhi ho,
                    home delivery available hai!
                  </p>
                  <div className="flex items-center gap-3 pt-2">
                    <span className="text-2xl">🐔</span>
                    <span className="text-gold font-semibold tracking-wide">
                      Bahrain International Lal Chuza — 1 Click Delivery
                    </span>
                  </div>
                </div>
              )}
            </motion.div>

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
                  <span className="font-playfair font-bold text-3xl sm:text-4xl text-gold group-hover:text-gold-light transition-colors">
                    {stat.value}
                  </span>
                  <span className="text-muted-foreground font-inter text-xs font-semibold mt-2 tracking-[0.15em] uppercase">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Egg Benefits */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <span className="font-inter font-semibold text-[11px] tracking-[0.3em] uppercase text-gold">
              HEALTH BENEFITS
            </span>
            <h3 className="font-playfair font-bold text-2xl sm:text-3xl lg:text-4xl text-foreground mt-2">
              Ande Ki Ahmiyat
            </h3>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
              Roz ek anda aapki sehat ke liye kitna zaroori hai — janiye yeh 6
              ehm fayde.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {EGG_BENEFITS.map((benefit, i) => (
              <motion.div
                key={benefit.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="bg-background border border-border rounded-xl p-6 hover:border-gold/40 transition-all duration-300 hover:shadow-gold group"
                data-ocid={`about.egg.${i + 1}`}
              >
                <div className="text-4xl mb-3">{benefit.icon}</div>
                <h4 className="font-playfair font-bold text-lg text-gold mb-2 group-hover:text-gold-light transition-colors">
                  {benefit.title}
                </h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {benefit.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── PHOTOS GALLERY ─────────── */}
      <section
        id="photos"
        className="py-20 lg:py-28 bg-background"
        data-ocid="photos.section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="font-inter font-semibold text-[11px] tracking-[0.3em] uppercase text-gold">
              GALLERY
            </span>
            <h2 className="font-playfair font-bold text-3xl sm:text-4xl lg:text-5xl text-foreground mt-2">
              Our Photos
            </h2>
            <div className="w-14 h-0.5 bg-gold mx-auto mt-4" />
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {GALLERY_IMAGES.map((src, i) => (
              <motion.button
                key={src}
                type="button"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group relative overflow-hidden rounded-xl border border-border hover:border-gold/50 transition-all duration-300 shadow-md hover:shadow-gold cursor-pointer"
                onClick={() => setLightboxImg(src)}
                data-ocid={`photos.item.${i + 1}`}
              >
                <img
                  src={src}
                  alt={`Lal Chuza ${i + 1}`}
                  className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                  <span className="text-white text-xs font-semibold tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    VIEW
                  </span>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── LIGHTBOX ─────────── */}
      <AnimatePresence>
        {lightboxImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
            onClick={() => setLightboxImg(null)}
          >
            <button
              type="button"
              className="absolute top-4 right-4 text-white/70 hover:text-white p-2"
              onClick={() => setLightboxImg(null)}
              aria-label="Close"
            >
              <X size={28} />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              src={lightboxImg}
              alt="Full view"
              className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─────────── VIDEO ─────────── */}
      <section
        id="video"
        className="py-20 lg:py-28 bg-card"
        data-ocid="video.section"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
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
              Our Video
            </h2>
            <div className="w-14 h-0.5 bg-gold mx-auto mt-4" />
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative rounded-2xl overflow-hidden border border-gold/30 shadow-2xl shadow-black/50"
            data-ocid="video.card"
          >
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
        <div className="text-center py-14 border-b border-border px-4">
          <span className="font-inter font-semibold text-[11px] tracking-[0.3em] uppercase text-muted-foreground">
            ORDER NOW
          </span>
          <h2 className="font-playfair font-bold text-3xl sm:text-4xl text-foreground mt-2">
            1 Click — Aapke Darwaze Tak
          </h2>
          <div className="w-10 h-0.5 bg-gold mx-auto mt-3 mb-6" />
          <p className="text-muted-foreground max-w-md mx-auto mb-8">
            Bahrain mein kahan bhi ho — Lal Chuza aapke ghar pahunch jaata hai.
            Abhi contact karo!
          </p>

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

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="font-playfair text-gold font-bold text-sm tracking-wider uppercase">
              NOUMAN GUL LAL CHUZA
            </span>

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
