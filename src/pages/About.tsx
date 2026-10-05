import { Link } from "react-router";

type IconName =
  | "arrow-down"
  | "arrow-down-right"
  | "arrow-right"
  | "arrow-up-right"
  | "door"
  | "refresh"
  | "info";

function Icon({
  name,
  className = "",
}: {
  name: IconName;
  className?: string;
}) {
  const paths: Record<IconName, React.ReactNode> = {
    "arrow-down": (
      <>
        <path d="M12 5v14" />
        <path d="m19 12-7 7-7-7" />
      </>
    ),
    "arrow-down-right": (
      <>
        <path d="m7 7 10 10" />
        <path d="M17 7v10H7" />
      </>
    ),
    "arrow-right": (
      <>
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
      </>
    ),
    "arrow-up-right": (
      <>
        <path d="M7 7h10v10" />
        <path d="M7 17 17 7" />
      </>
    ),
    door: (
      <>
        <path d="M13 4h3a2 2 0 0 1 2 2v14" />
        <path d="M2 20h3" />
        <path d="M13 20h9" />
        <path d="M5 20V5a2 2 0 0 1 1.5-1.94l5.26-1.35A1 1 0 0 1 13 2.68V21a1 1 0 0 1-1.24.97L5 20Z" />
        <path d="M10 12v.01" />
      </>
    ),
    refresh: (
      <>
        <path d="M3 12a9 9 0 0 1 15.36-6.36L21 8" />
        <path d="M21 3v5h-5" />
        <path d="M21 12a9 9 0 0 1-15.36 6.36L3 16" />
        <path d="M8 16H3v5" />
      </>
    ),
    info: (
      <>
        <circle cx="12" cy="12" r="10" />
        <path d="M12 16v-4" />
        <path d="M12 8h.01" />
      </>
    ),
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {paths[name]}
    </svg>
  );
}

const steps = [
  "Find a category.",
  "Find a job.",
  "Read the details.",
  "Apply at the original source.",
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F7F8F6] font-[Arial,Helvetica,sans-serif] text-[#142C25]">
      <div className="mx-auto max-w-[1024px] px-[6%]">
        <header className="flex min-h-[91px] items-center justify-between gap-6 border-b border-[#DCE3DA] pr-[60px] max-[600px]:min-h-[77px] max-[600px]:flex-wrap max-[600px]:gap-[5px] max-[600px]:py-3 max-[600px]:pr-0">
          <Link
            to="/"
            aria-label="Fresher Jobs UAE home"
            className="whitespace-nowrap text-[24px] font-[750] tracking-[-1.3px] text-[#142C25] no-underline max-[600px]:text-[21px]"
          >
            fresherjobs
            <span className="ml-2 inline-block rounded border border-[#DCE3DA] px-[6px] py-[5px] align-middle text-[10px] font-semibold tracking-[1px]">
              UAE
            </span>
          </Link>

          <nav
            aria-label="Page navigation"
            className="flex items-center gap-[27px] text-[12px] max-[600px]:gap-[15px] max-[600px]:text-[11px]"
          >
            <span aria-current="page" className="font-bold">
              About us
            </span>

            <a
              href="#about-process"
              className="flex min-h-11 items-center gap-[7px] text-[#5D6C63] no-underline transition-colors hover:text-[#276343]"
            >
              How it works
              <Icon name="arrow-down" className="h-[13px] w-[13px]" />
            </a>
          </nav>
        </header>

        <main>
          <section className="pb-[29px] pt-[62px] max-[600px]:pt-[42px]">
            <div className="flex items-center gap-[9px] text-[10px] font-bold tracking-[1.9px] text-[#276343]">
              <span className="h-[6px] w-[6px] rounded-full bg-[#276343]" />
              A FRESH START, STARTS HERE
            </div>

            <h1 className="my-6 text-[clamp(43px,6.7vw,76px)] font-semibold leading-[1.05] tracking-[-3.6px] max-[600px]:text-[48px] max-[600px]:tracking-[-2.2px]">
              Jobs shouldn’t be
              <br />
              this hard to{" "}
              <em className="font-[Georgia,serif] font-normal text-[#276343]">
                find.
              </em>
            </h1>

            <p className="max-w-[490px] text-[16px] leading-[1.8] text-[#5D6C63] max-[600px]:text-[14px]">
              Fresher Jobs UAE helps you discover fresh job opportunities across
              the UAE — without digging through endless outdated listings.
            </p>

            <div className="mt-[29px] flex items-center justify-between text-[12px] font-semibold text-[#276343]">
              <span>Less searching. More possibility.</span>

              <span className="grid h-[42px] w-[42px] shrink-0 place-items-center rounded-full bg-[#E7EEE3]">
                <Icon name="arrow-down-right" className="h-5 w-5" />
              </span>
            </div>
          </section>

          <section
            aria-label="Why Fresher Jobs UAE"
            className="mt-2 grid grid-cols-2 gap-4 max-[600px]:grid-cols-1"
          >
            <article className="rounded-xl border border-[#DCE3DA] bg-white p-[30px] max-[600px]:p-[26px]">
              <div className="mb-[27px] flex items-center gap-[11px] text-[10px] font-bold tracking-[1.6px] text-[#276343] max-[600px]:mb-[21px]">
                <Icon name="door" className="h-5 w-5 stroke-[1.5]" />
                <span>THE OPPORTUNITY</span>
              </div>

              <h2 className="text-[29px] font-semibold leading-[1.16] tracking-[-1px] max-[600px]:text-[28px]">
                Built for people
                <br />
                looking for a way in.
              </h2>

              <p className="mt-[17px] max-w-[340px] text-[13px] leading-[1.85] text-[#5D6C63] max-[600px]:max-w-none max-[600px]:text-[14px]">
                We focus on fresher, entry-level, no-experience and accessible
                job opportunities, while also expanding into other useful job
                categories.
              </p>
            </article>

            <article className="rounded-xl border border-transparent bg-[#E7EEE3] p-[30px] max-[600px]:p-[26px]">
              <div className="mb-[27px] flex items-center gap-[11px] text-[10px] font-bold tracking-[1.6px] text-[#276343] max-[600px]:mb-[21px]">
                <Icon name="refresh" className="h-5 w-5 stroke-[1.5]" />
                <span>THE DIFFERENCE</span>
              </div>

              <h2 className="text-[29px] font-semibold leading-[1.16] tracking-[-1px] max-[600px]:text-[28px]">
                Fresh jobs,
                <br />
                not a graveyard.
              </h2>

              <p className="mt-[17px] max-w-[340px] text-[13px] leading-[1.85] text-[#5D6C63] max-[600px]:max-w-none max-[600px]:text-[14px]">
                We continuously update the platform so you’re more likely to find
                opportunities posted recently — not jobs that disappeared weeks
                ago.
              </p>
            </article>
          </section>

          <section
            id="about-process"
            className="scroll-mt-6 pb-[34px] pt-11"
          >
            <div className="flex items-end justify-between gap-5">
              <div>
                <div className="mb-3 text-[10px] font-bold tracking-[1.9px] text-[#276343]">
                  HOW IT WORKS
                </div>

                <h2 className="text-[29px] font-semibold leading-[1.16] tracking-[-1px] max-[600px]:text-[28px]">
                  Simple by design.
                </h2>
              </div>

              <span className="font-[Georgia,serif] text-[21px] italic text-[#276343] max-[600px]:text-[18px]">
                That’s it.
              </span>
            </div>

            <ol className="mt-[27px] grid list-none grid-cols-4 border-t border-[#DCE3DA] p-0 max-[600px]:grid-cols-2 max-[600px]:gap-y-5">
              {steps.map((step, index) => (
                <li
                  key={step}
                  className="relative flex flex-col gap-3 pr-[22px] pt-5 text-[13px] font-semibold leading-[1.5] max-[600px]:text-[14px]"
                >
                  <span className="text-[11px] font-normal tracking-[1px] text-[#5D6C63]">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span>
                    {index === 3 ? (
                      <>
                        Apply at the
                        <br className="max-[600px]:hidden" /> original source.
                      </>
                    ) : (
                      step
                    )}
                  </span>

                  <Icon
                    name={index === 3 ? "arrow-up-right" : "arrow-right"}
                    className={`absolute top-5 h-[15px] w-[15px] text-[#276343] ${
                      index === 3
                        ? "right-0"
                        : index === 1
                          ? "right-[19px] max-[600px]:right-0"
                          : "right-[19px]"
                    }`}
                  />
                </li>
              ))}
            </ol>
          </section>

          <aside className="flex items-start gap-3 border-t border-[#DCE3DA] py-[22px]">
            <Icon
              name="info"
              className="mt-[2px] h-[17px] w-[17px] shrink-0 text-[#5D6C63]"
            />

            <p className="max-w-[640px] text-[11px] leading-[1.8] text-[#5D6C63]">
              Fresher Jobs UAE is an independent job-discovery platform. We don’t
              represent the employers listed on the site and we don’t charge job
              seekers to apply.
            </p>
          </aside>
        </main>

        <footer className="flex justify-between gap-5 border-t border-[#DCE3DA] py-[23px] text-[10px] text-[#5D6C63] max-[600px]:flex-wrap max-[600px]:gap-[10px]">
          <span className="font-semibold text-[#142C25]">
            Fresher Jobs UAE
          </span>
          <span>A little clarity for your next step.</span>
        </footer>
      </div>
    </div>
  );
}