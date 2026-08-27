import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Heart, Sparkles, ShieldCheck, Gem, Shirt, MoveRight } from "lucide-react";

const philosophy = [
  {
    icon: Gem,
    title: "Timeless Design",
    description:
      "Clean silhouettes and refined details designed to stay relevant beyond seasonal trends.",
  },
  {
    icon: ShieldCheck,
    title: "Quality First",
    description:
      "We focus on materials, construction, and details that make every piece feel thoughtfully made.",
  },
  {
    icon: Shirt,
    title: "Everyday Comfort",
    description:
      "Premium style should never come at the cost of comfort. Our pieces are made to live in.",
  },
  {
    icon: Heart,
    title: "Your Individual Style",
    description:
      "STYQLO is not about telling you who to be. It is about giving you pieces to express yourself.",
  },
];

const reasons = [
  {
    number: "01",
    title: "Premium Feel",
    description:
      "Thoughtful fabrics, refined finishing, and attention to the small details that elevate everyday clothing.",
  },
  {
    number: "02",
    title: "Modern Minimalism",
    description:
      "We believe great fashion does not need to be loud. Clean design creates effortless versatility.",
  },
  {
    number: "03",
    title: "Made for Real Life",
    description:
      "From everyday plans to special moments, STYQLO pieces are designed to move naturally with your lifestyle.",
  },
  {
    number: "04",
    title: "Accessible Luxury",
    description:
      "We want premium-looking fashion to feel attainable without unnecessary complexity.",
  },
];

const AboutPage = () => {
  return (
    <main className="bg-background text-foreground overflow-hidden">
      {/* ================= HERO ================= */}
      <section className="relative min-h-[75vh] flex items-center bg-luxury">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-secondary/10 blur-3xl" />

        <div className="relative max-w-7xl mx-auto w-full px-6 lg:px-8 py-24">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 border border-border mb-8">
              <Sparkles size={15} className="text-primary" />

              <span className="text-sm font-semibold tracking-wide">
                THE STYQLO STORY
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-8xl font-bold leading-[1.05] tracking-[-0.04em]">
              Style that
              <br />
              <span className="text-gradient">speaks for you.</span>
            </h1>

            <p className="mt-8 max-w-2xl text-lg lg:text-xl text-muted-foreground leading-relaxed">
              STYQLO was created with one simple belief — everyday fashion
              should feel effortless, refined, and distinctly yours.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/products"
                className="inline-flex items-center gap-3 px-7 py-4 rounded-full bg-foreground text-white font-semibold transition-luxury hover:-translate-y-0.5 hover:shadow-luxury"
              >
                Explore Collection
                <ArrowRight size={18} />
              </Link>

              <Link
                to="/about#our-story"
                className="inline-flex items-center gap-3 px-7 py-4 rounded-full bg-white/70 border border-border font-semibold transition-luxury hover:bg-white"
              >
                Our Story
                <MoveRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================= BRAND PHILOSOPHY ================= */}
      <section className="py-24 lg:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-16 lg:gap-24">
            <div>
              <span className="text-sm font-bold tracking-[0.2em] text-primary uppercase">
                01 — Philosophy
              </span>

              <h2 className="mt-5 text-4xl lg:text-5xl font-bold">
                Designed for confidence.
                <br />
                Made for everyday life.
              </h2>

              <div className="mt-7 w-16 h-[2px] bg-primary" />
            </div>

            <div>
              <p className="text-xl lg:text-2xl leading-relaxed text-muted-foreground">
                At STYQLO, we believe great style doesn't need to be
                complicated. It starts with thoughtful design, quality
                materials, comfortable fits, and details that feel
                effortlessly refined.
              </p>

              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                Our philosophy is simple: create fashion that looks premium,
                feels comfortable, and becomes a natural part of your everyday
                identity.
              </p>
            </div>
          </div>

          {/* Philosophy Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-20">
            {philosophy.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="card-luxury p-7 group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-primary-lighter flex items-center justify-center transition-luxury group-hover:bg-primary">
                    <Icon
                      size={21}
                      className="text-primary transition-luxury group-hover:text-foreground"
                    />
                  </div>

                  <h3 className="mt-6 text-xl font-semibold">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= WHY STYQLO ================= */}
      <section className="py-24 lg:py-32 bg-[#F5EAE7]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-sm font-bold tracking-[0.2em] text-primary uppercase">
              02 — Why STYQLO
            </span>

            <h2 className="mt-5 text-4xl lg:text-6xl font-bold leading-tight">
              Because your everyday style{" "}
              <span className="text-gradient">deserves more.</span>
            </h2>

            <p className="mt-7 text-lg lg:text-xl text-muted-foreground leading-relaxed">
              We wanted to build a brand where minimal design, comfort,
              quality, and modern aesthetics come together without unnecessary
              complexity.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-x-20 mt-20">
            {reasons.map((item, index) => (
              <div
                key={item.number}
                className={`group py-9 border-border ${
                  index < 2 ? "border-b" : ""
                }`}
              >
                <div className="flex gap-7">
                  <span className="text-sm font-semibold text-primary pt-1">
                    {item.number}
                  </span>

                  <div>
                    <h3 className="text-2xl font-semibold transition-luxury group-hover:text-primary">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-muted-foreground leading-7 max-w-lg">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= BRAND STORY ================= */}
      <section
        id="our-story"
        className="relative py-24 lg:py-36 bg-luxury-hero text-white overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[120px]" />

        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-secondary/10 blur-[100px]" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-28 items-center">
            <div>
              <span className="text-sm font-bold tracking-[0.2em] text-primary-light uppercase">
                03 — Brand Story
              </span>

              <h2 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
                It started with
                <br />
                <span className="text-primary-light">
                  a simple idea.
                </span>
              </h2>

              <div className="mt-8 w-16 h-[2px] bg-primary" />
            </div>

            <div className="space-y-6">
              <p className="text-xl lg:text-2xl leading-relaxed text-white/90">
                What if everyday clothing could feel a little more special?
              </p>

              <p className="leading-8 text-white/65">
                Fashion doesn't always need bold logos, complicated designs,
                or constantly changing trends. Sometimes, the most powerful
                style is the one that feels natural.
              </p>

              <p className="leading-8 text-white/65">
                STYQLO was born from this belief. We set out to create a
                modern fashion brand centered around clean aesthetics,
                confidence, comfort, and timeless style.
              </p>

              <p className="leading-8 text-white/65">
                Every piece is intended to become something you reach for
                again and again — not because it's trending, but because it
                simply feels right.
              </p>

              <p className="leading-8 text-white/65">
                From the first idea to every detail of the final product,
                STYQLO is about making everyday fashion more refined.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= BRAND STATEMENT ================= */}
      <section className="py-24 lg:py-32 bg-background">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <div className="w-14 h-14 mx-auto rounded-full bg-primary-lighter flex items-center justify-center">
            <Heart size={22} className="text-primary" />
          </div>

          <p className="mt-10 text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight">
            “This is more than what you wear.
            <br />
            <span className="text-gradient">
              It's how you carry yourself.
            </span>
            ”
          </p>

          <p className="mt-8 text-sm font-bold tracking-[0.3em] text-muted-foreground">
            STYQLO
          </p>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto rounded-[2rem] bg-luxury-warm overflow-hidden">
          <div className="px-8 py-16 lg:px-20 lg:py-20 text-center">
            <span className="text-sm font-bold tracking-[0.2em] uppercase text-foreground/60">
              Discover STYQLO
            </span>

            <h2 className="mt-4 text-4xl lg:text-5xl font-bold">
              Find your everyday style.
            </h2>

            <p className="mt-5 max-w-xl mx-auto text-foreground/70">
              Explore pieces designed to make your everyday wardrobe feel
              effortlessly refined.
            </p>

            <Link
              to="/products"
              className="inline-flex items-center gap-3 mt-8 px-8 py-4 rounded-full bg-foreground text-white font-semibold transition-luxury hover:-translate-y-0.5 hover:shadow-luxury"
            >
              Shop STYQLO
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;