const opportunities = [
  {
    title: "Tech Innovation Summit",
    organization: "XYZ University",
    category: "Technology",
    location: "Bengaluru, India",
    audience: "5,000+ attendees",
    budget: "₹2L – ₹5L",
  },
  {
    title: "National Gaming Championship",
    organization: "GameNation",
    category: "Gaming",
    location: "Mumbai, India",
    audience: "10,000+ viewers",
    budget: "₹1L – ₹3L",
  },
  {
    title: "Youth Entrepreneurship Forum",
    organization: "Future Founders",
    category: "Business",
    location: "Delhi, India",
    audience: "3,000+ attendees",
    budget: "₹50K – ₹2L",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">

      {/* NAVBAR */}
      <nav className="border-b border-white/10 bg-black">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          <a href="/" className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 font-bold text-white">
              W
            </div>

            <div>
              <div className="font-bold tracking-tight">
                World Sponsor Link
              </div>

              <div className="text-xs text-gray-500">
                WSL
              </div>
            </div>

          </a>

          <div className="hidden items-center gap-8 text-sm font-medium text-gray-300 md:flex">

            <a
              href="#discover"
              className="transition hover:text-blue-400"
            >
              Discover
            </a>

            <a
              href="#how-it-works"
              className="transition hover:text-blue-400"
            >
              How it works
            </a>

            <a
              href="#about"
              className="transition hover:text-blue-400"
            >
              About
            </a>

          </div>

          <div className="flex items-center gap-3">

            <a
              href="/login"
              className="hidden px-4 py-2 text-sm font-medium text-gray-300 transition hover:text-white sm:block"
            >
              Log in
            </a>

            <a
              href="/signup"
              className="rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500"
            >
              Get started
            </a>

          </div>

        </div>
      </nav>


      {/* HERO */}

      <section className="relative overflow-hidden">

        {/* BLUE GLOW */}

        <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-blue-600/10 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-28 md:pb-32 md:pt-36">

          <div className="mx-auto max-w-5xl text-center">

            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-400">

              <span className="h-2 w-2 rounded-full bg-blue-500" />

              The sponsorship marketplace

            </div>


            <h1 className="text-5xl font-bold tracking-tight md:text-7xl">

              Where brands meet

              <br />

              <span className="text-blue-500">
                opportunities.
              </span>

            </h1>


            <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-gray-400 md:text-xl">

              World Sponsor Link connects brands with events,
              organizations, communities, creators and projects
              looking for sponsorship.

            </p>


            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">

              <a
                href="#discover"
                className="rounded-full bg-blue-600 px-8 py-4 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-500"
              >
                Find opportunities →
              </a>

              <a
                href="/signup"
                className="rounded-full border border-white/20 px-8 py-4 font-semibold text-white transition hover:bg-white/5"
              >
                Find sponsors
              </a>

            </div>

          </div>


          {/* MARKETPLACE PREVIEW */}

          <div className="mx-auto mt-20 max-w-6xl">

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-3 shadow-2xl shadow-blue-950/20">

              <div className="rounded-2xl border border-white/10 bg-[#080808] p-6 md:p-8">

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-sm text-gray-500">
                      Recommended for you
                    </p>

                    <h3 className="mt-1 text-xl font-bold">
                      Sponsorship opportunities
                    </h3>

                  </div>

                  <div className="hidden rounded-full bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-400 sm:block">
                    24 matches
                  </div>

                </div>


                <div className="mt-6 grid gap-4 md:grid-cols-3">

                  {opportunities.map((opportunity) => (

                    <div
                      key={opportunity.title}
                      className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 text-left transition hover:-translate-y-1 hover:border-blue-500/40 hover:bg-blue-500/[0.03]"
                    >

                      <div className="flex items-center justify-between">

                        <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-400">
                          {opportunity.category}
                        </span>

                        <span className="text-xs text-blue-400">
                          94% match
                        </span>

                      </div>


                      <h4 className="mt-5 font-bold">
                        {opportunity.title}
                      </h4>


                      <p className="mt-1 text-sm text-gray-500">
                        {opportunity.organization}
                      </p>


                      <div className="mt-5 space-y-2 text-xs text-gray-500">

                        <p>📍 {opportunity.location}</p>

                        <p>👥 {opportunity.audience}</p>

                        <p>💰 {opportunity.budget}</p>

                      </div>


                      <button className="mt-5 w-full rounded-xl border border-white/10 py-2.5 text-sm font-semibold transition hover:border-blue-500/40 hover:bg-white/5">
                        View opportunity
                      </button>

                    </div>

                  ))}

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* STATS */}

      <section className="border-y border-white/10 bg-[#050505]">

        <div className="mx-auto grid max-w-6xl grid-cols-2 md:grid-cols-4">

          <Stat number="∞" label="Opportunities" />

          <Stat number="∞" label="Brands" />

          <Stat number="🌎" label="Global reach" />

          <Stat number="🤝" label="Partnerships" />

        </div>

      </section>


      {/* HOW IT WORKS */}

      <section
        id="how-it-works"
        className="px-6 py-24 md:py-32"
      >

        <div className="mx-auto max-w-7xl">

          <div className="max-w-2xl">

            <p className="text-sm font-bold tracking-widest text-blue-500">
              HOW IT WORKS
            </p>

            <h2 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
              One platform.
              <br />
              Two sides.
            </h2>

            <p className="mt-6 text-lg leading-8 text-gray-400">
              WSL makes it easier for organizations to find sponsors
              and for brands to discover opportunities worth backing.
            </p>

          </div>


          <div className="mt-16 grid gap-6 md:grid-cols-2">


            {/* ORGANIZATIONS */}

            <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-8 md:p-10">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 text-2xl">
                🏢
              </div>

              <h3 className="mt-7 text-2xl font-bold">
                Looking for sponsorship?
              </h3>

              <p className="mt-4 leading-7 text-gray-400">
                Turn your event, organization, community or project
                into a sponsorship opportunity.
              </p>

              <div className="mt-8 space-y-4 text-sm text-gray-300">

                <div>✓ Create sponsorship opportunities</div>

                <div>✓ Set your budget and requirements</div>

                <div>✓ Receive applications from brands</div>

              </div>

              <a
                href="/signup"
                className="mt-10 inline-block rounded-full bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-500"
              >
                Find sponsors →
              </a>

            </div>


            {/* BRANDS */}

            <div className="rounded-3xl border border-blue-500/20 bg-blue-500/[0.04] p-8 md:p-10">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 text-2xl">
                🚀
              </div>

              <h3 className="mt-7 text-2xl font-bold">
                Looking to sponsor?
              </h3>

              <p className="mt-4 leading-7 text-gray-400">
                Discover opportunities that match your audience,
                industry, location and sponsorship budget.
              </p>

              <div className="mt-8 space-y-4 text-sm text-gray-300">

                <div>✓ Discover relevant opportunities</div>

                <div>✓ Filter by audience and category</div>

                <div>✓ Connect directly with organizations</div>

              </div>

              <a
                href="#discover"
                className="mt-10 inline-block rounded-full bg-white px-6 py-3 font-semibold text-black transition hover:bg-gray-200"
              >
                Explore opportunities →
              </a>

            </div>

          </div>

        </div>

      </section>


      {/* DISCOVER */}

      <section
        id="discover"
        className="border-y border-white/10 bg-[#050505] px-6 py-24 md:py-32"
      >

        <div className="mx-auto max-w-7xl">

          <div>

            <p className="text-sm font-bold tracking-widest text-blue-500">
              DISCOVER
            </p>

            <h2 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
              Opportunities worth backing.
            </h2>

            <p className="mt-5 max-w-2xl text-gray-400">
              Explore sponsorship opportunities from organizations
              around the world.
            </p>

          </div>


          <div className="mt-12 grid gap-6 md:grid-cols-3">

            {opportunities.map((opportunity) => (

              <OpportunityCard
                key={opportunity.title}
                opportunity={opportunity}
              />

            ))}

          </div>

        </div>

      </section>


      {/* CTA */}

      <section
        id="about"
        className="px-6 py-24 md:py-32"
      >

        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-blue-500/20 bg-blue-600 px-8 py-16 text-center text-white md:px-16 md:py-24">

          <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-96 -translate-x-1/2 rounded-full bg-white/20 blur-3xl" />

          <div className="relative">

            <p className="text-sm font-bold tracking-widest text-blue-100">
              WORLD SPONSOR LINK
            </p>

            <h2 className="mx-auto mt-5 max-w-3xl text-4xl font-bold tracking-tight md:text-6xl">
              Your next partnership starts here.
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-blue-100">
              Whether you're looking for a sponsor or looking for
              your next opportunity, WSL brings both sides together.
            </p>

            <a
              href="/signup"
              className="mt-10 inline-block rounded-full bg-white px-8 py-4 font-semibold text-blue-600 shadow-lg transition hover:bg-blue-50"
            >
              Get started →
            </a>

          </div>

        </div>

      </section>


      {/* FOOTER */}

      <footer className="border-t border-white/10 px-6 py-10">

        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-5 md:flex-row">

          <div>

            <div className="font-bold">
              WORLD SPONSOR LINK
            </div>

            <p className="mt-2 text-sm text-gray-500">
              Where brands meet opportunities.
            </p>

          </div>

          <div className="text-sm text-gray-600">
            © 2026 World Sponsor Link. All rights reserved.
          </div>

        </div>

      </footer>

    </main>
  );
}


function Stat({
  number,
  label,
}: {
  number: string;
  label: string;
}) {
  return (
    <div className="border-white/10 p-8 text-center md:border-r">
      <div className="text-3xl font-bold text-blue-500">
        {number}
      </div>

      <div className="mt-2 text-sm text-gray-500">
        {label}
      </div>
    </div>
  );
}


function OpportunityCard({
  opportunity,
}: {
  opportunity: {
    title: string;
    organization: string;
    category: string;
    location: string;
    audience: string;
    budget: string;
  };
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-black p-6 transition hover:-translate-y-1 hover:border-blue-500/40 hover:shadow-xl hover:shadow-blue-950/20">

      <div className="flex items-center justify-between">

        <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-400">
          {opportunity.category}
        </span>

        <span className="text-xs font-medium text-gray-600">
          New
        </span>

      </div>


      <h3 className="mt-6 text-xl font-bold">
        {opportunity.title}
      </h3>


      <p className="mt-2 text-sm text-gray-500">
        {opportunity.organization}
      </p>


      <div className="mt-6 space-y-3 text-sm text-gray-500">

        <p>📍 {opportunity.location}</p>

        <p>👥 {opportunity.audience}</p>

        <p>💰 {opportunity.budget}</p>

      </div>


      <button className="mt-7 w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-500">
        View opportunity
      </button>

    </div>
  );
}