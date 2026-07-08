import { Analytics } from "@vercel/analytics/react";

import { useState, useEffect, useRef } from "react";

const SECTIONS = ["home", "about", "services", "solutions", "approach", "contact"];

function useOnScreen(ref, threshold = 0.15) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return visible;
}

function FadeIn({ children, delay = 0, className = "" }) {
  const ref = useRef();
  const visible = useOnScreen(ref);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.8s cubic-bezier(.23,1,.32,1) ${delay}s, transform 0.8s cubic-bezier(.23,1,.32,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

function Nav({ active }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const scrollTo = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? "rgba(250,247,243,0.92)" : "transparent",
      backdropFilter: scrolled ? "blur(16px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(60,55,48,0.08)" : "1px solid transparent",
      transition: "all 0.4s ease",
    }}>
      <div style={{
        maxWidth: 1200, margin: "0 auto", padding: "0 32px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        height: scrolled ? 64 : 80, transition: "height 0.4s ease",
      }}>
        <button onClick={() => scrollTo("home")} style={{
          background: "none", border: "none", cursor: "pointer", padding: 0,
          fontFamily: "'DM Serif Display', serif", fontSize: 22, color: "#2C2825",
          letterSpacing: "-0.5px",
        }}>
          Peter Weinold
        </button>

        {/* Desktop nav */}
        <div style={{ display: "flex", gap: 36, alignItems: "center" }}
          className="desktop-nav">
          {SECTIONS.filter(s => s !== "home").map(s => (
            <button key={s} onClick={() => scrollTo(s)} style={{
              background: "none", border: "none", cursor: "pointer", padding: "4px 0",
              fontFamily: "'Outfit', sans-serif", fontSize: 13, fontWeight: 500,
              textTransform: "uppercase", letterSpacing: "1.5px",
              color: active === s ? "#D4882B" : "#6B6560",
              borderBottom: active === s ? "1.5px solid #D4882B" : "1.5px solid transparent",
              transition: "all 0.3s",
            }}>
              {s}
            </button>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button className="mobile-menu-btn" onClick={() => setMenuOpen(!menuOpen)} style={{
          background: "none", border: "none", cursor: "pointer", padding: 8,
          display: "none",
        }}>
          <div style={{ width: 24, display: "flex", flexDirection: "column", gap: 5 }}>
            <span style={{
              display: "block", height: 2, background: "#2C2825", borderRadius: 1,
              transform: menuOpen ? "rotate(45deg) translate(5px, 5px)" : "none",
              transition: "transform 0.3s",
            }} />
            <span style={{
              display: "block", height: 2, background: "#2C2825", borderRadius: 1,
              opacity: menuOpen ? 0 : 1, transition: "opacity 0.3s",
            }} />
            <span style={{
              display: "block", height: 2, background: "#2C2825", borderRadius: 1,
              transform: menuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none",
              transition: "transform 0.3s",
            }} />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="mobile-menu" style={{
          background: "rgba(250,247,243,0.98)", backdropFilter: "blur(20px)",
          padding: "24px 32px 32px", display: "flex", flexDirection: "column", gap: 20,
        }}>
          {SECTIONS.filter(s => s !== "home").map(s => (
            <button key={s} onClick={() => scrollTo(s)} style={{
              background: "none", border: "none", cursor: "pointer", padding: "8px 0",
              fontFamily: "'Outfit', sans-serif", fontSize: 16, fontWeight: 500,
              textTransform: "uppercase", letterSpacing: "2px",
              color: "#2C2825", textAlign: "left",
            }}>
              {s}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

function Hero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);

  return (
    <section id="home" style={{
      minHeight: "100vh", display: "flex", alignItems: "center",
      position: "relative", overflow: "hidden",
      background: "linear-gradient(168deg, #FAF7F3 0%, #F0EBE3 40%, #E8E0D4 100%)",
    }}>
      {/* Decorative elements */}
      <div style={{
        position: "absolute", top: -120, right: -120,
        width: 500, height: 500, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(139,105,20,0.06) 0%, transparent 70%)",
        opacity: loaded ? 1 : 0, transition: "opacity 2s ease 0.5s",
      }} />
      <div style={{
        position: "absolute", bottom: -80, left: "10%",
        width: 300, height: 300, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(139,105,20,0.04) 0%, transparent 70%)",
        opacity: loaded ? 1 : 0, transition: "opacity 2s ease 0.8s",
      }} />
      <div style={{
        position: "absolute", top: "20%", right: "8%",
        width: 1, height: 180, background: "rgba(139,105,20,0.12)",
        opacity: loaded ? 1 : 0, transition: "opacity 1.5s ease 1.2s",
      }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "140px 32px 80px", width: "100%" }}>
        <div style={{
          opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(40px)",
          transition: "all 1s cubic-bezier(.23,1,.32,1) 0.2s",
        }}>
          <p style={{
            fontFamily: "'Outfit', sans-serif", fontSize: 13, fontWeight: 500,
            textTransform: "uppercase", letterSpacing: "3px", color: "#D4882B",
            marginBottom: 24,
          }}>
            Independent Consultant & Executive Advisor
          </p>
        </div>
        <div style={{
          opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(40px)",
          transition: "all 1s cubic-bezier(.23,1,.32,1) 0.4s",
        }}>
          <h1 style={{
            fontFamily: "'DM Serif Display', serif", fontSize: "clamp(42px, 6vw, 80px)",
            fontWeight: 400, color: "#2C2825", lineHeight: 1.08,
            letterSpacing: "-1.5px", marginBottom: 32, maxWidth: 800,
          }}>
            Turning procurement<br />
            into a strategic<br />
            <span style={{ color: "#D4882B" }}>growth engine</span>
          </h1>
        </div>
        <div style={{
          opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(40px)",
          transition: "all 1s cubic-bezier(.23,1,.32,1) 0.6s",
        }}>
          <p style={{
            fontFamily: "'Outfit', sans-serif", fontSize: 19, lineHeight: 1.7,
            color: "#7A756F", maxWidth: 560, marginBottom: 48,
          }}>
            20+ years shaping global procurement strategy, transformation,
            and leadership across asset-intensive industries.
          </p>
        </div>
        <div style={{
          opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(40px)",
          transition: "all 1s cubic-bezier(.23,1,.32,1) 0.8s",
          display: "flex", gap: 16, flexWrap: "wrap",
        }}>
          <button onClick={() => { const el = document.getElementById("contact"); if(el) { const y = el.getBoundingClientRect().top + window.pageYOffset - 80; window.scrollTo({ top: y, behavior: "smooth" }); } }}
            style={{
              fontFamily: "'Outfit', sans-serif", fontSize: 14, fontWeight: 600,
              textTransform: "uppercase", letterSpacing: "1.5px",
              background: "#2C2825", color: "#FAF7F3", border: "none",
              padding: "16px 40px", cursor: "pointer",
              transition: "all 0.3s",
            }}
            onMouseEnter={e => { e.target.style.background = "#D4882B"; }}
            onMouseLeave={e => { e.target.style.background = "#2C2825"; }}
          >
            Get in Touch
          </button>
          <button onClick={() => { const el = document.getElementById("solutions"); if(el) { const y = el.getBoundingClientRect().top + window.pageYOffset - 80; window.scrollTo({ top: y, behavior: "smooth" }); } }}
            style={{
              fontFamily: "'Outfit', sans-serif", fontSize: 14, fontWeight: 600,
              textTransform: "uppercase", letterSpacing: "1.5px",
              background: "transparent", color: "#2C2825",
              border: "1.5px solid #2C2825", padding: "16px 40px", cursor: "pointer",
              transition: "all 0.3s",
            }}
            onMouseEnter={e => { e.target.style.borderColor = "#D4882B"; e.target.style.color = "#D4882B"; }}
            onMouseLeave={e => { e.target.style.borderColor = "#2C2825"; e.target.style.color = "#2C2825"; }}
          >
            Explore Solutions
          </button>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" style={{
      background: "#FAF7F3",
      padding: "120px 32px",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <FadeIn>
          <p style={{
            fontFamily: "'Outfit', sans-serif", fontSize: 13, fontWeight: 500,
            textTransform: "uppercase", letterSpacing: "3px", color: "#D4882B",
            marginBottom: 20,
          }}>About</p>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 64 }}
          className="about-grid">
          <FadeIn delay={0.1}>
            <h2 style={{
              fontFamily: "'DM Serif Display', serif", fontSize: "clamp(32px, 4vw, 48px)",
              fontWeight: 400, color: "#2C2825", lineHeight: 1.15,
              letterSpacing: "-0.5px", marginBottom: 32, maxWidth: 700,
            }}>
              Strategy meets execution—at the intersection of procurement, leadership & innovation.
            </h2>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 48 }}>
            <FadeIn delay={0.2}>
              <p style={{
                fontFamily: "'Outfit', sans-serif", fontSize: 17, lineHeight: 1.8,
                color: "#7A756F",
              }}>
                With more than 20 years of experience across global logistics, supply chain,
                and asset-intensive industries—including nearly two decades in senior leadership
                at A.P. Moller - Maersk—I bring deep operational knowledge and a proven track
                record of transforming procurement into a strategic business partner.
              </p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <p style={{
                fontFamily: "'Outfit', sans-serif", fontSize: 17, lineHeight: 1.8,
                color: "#7A756F",
              }}>
                I've led globally distributed procurement organisations with accountability
                spanning multi-billion-dollar spend, P&L impact, and complex transformation
                agendas. Today, I advise organisations on procurement transformation,
                digitalisation, and AI-enabled decision-making—grounded in real business
                needs and tangible value creation.
              </p>
            </FadeIn>
          </div>
        </div>

        {/* Key stats */}
        <FadeIn delay={0.35}>
          <div style={{
            marginTop: 80, display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 1, background: "rgba(60,55,48,0.08)",
          }}>
            {[
              { num: "20+", label: "Years of Experience" },
              { num: "Global", label: "Procurement Leadership" },
              { num: "Multi-Bn", label: "Spend Under Management" },
              { num: "AI-Enabled", label: "Transformation Focus" },
            ].map((s, i) => (
              <div key={i} style={{
                background: "#FAF7F3", padding: "40px 32px", textAlign: "center",
              }}>
                <p style={{
                  fontFamily: "'DM Serif Display', serif", fontSize: 36,
                  color: "#D4882B", marginBottom: 8, letterSpacing: "-1px",
                }}>{s.num}</p>
                <p style={{
                  fontFamily: "'Outfit', sans-serif", fontSize: 13, fontWeight: 500,
                  textTransform: "uppercase", letterSpacing: "1.5px", color: "#9A948D",
                }}>{s.label}</p>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function Services() {
  const services = [
    {
      num: "01",
      title: "Executive Advisory & Strategy Design",
      desc: "Strategic narratives, transformation frameworks, and decision-ready options for senior leaders navigating complex change.",
      icon: "◇",
    },
    {
      num: "02",
      title: "Procurement Transformation",
      desc: "Reframe procurement as a value-creation engine through data, governance, supplier innovation, and stakeholder engagement.",
      icon: "△",
    },
    {
      num: "03",
      title: "Operating Model Optimisation",
      desc: "Map roles, decision rights, and processes to design operating models that drive accountability, agility, and performance.",
      icon: "○",
    },
    {
      num: "04",
      title: "Leadership & Change Advisory",
      desc: "Develop leadership capability frameworks, change readiness assessments, and stakeholder alignment programmes.",
      icon: "□",
    },
    {
      num: "05",
      title: "Digital & AI Enablement",
      desc: "Guide technology adoption roadmaps and data-driven decision systems—pragmatically, with measurable ROI.",
      icon: "⬡",
    },
    {
      num: "06",
      title: "Capability Development",
      desc: "Create learning experiences and coaching frameworks that embed transformation into organisational culture.",
      icon: "⊕",
    },
  ];

  return (
    <section id="services" style={{
      background: "#6B6560", color: "#FAF7F3",
      padding: "120px 32px",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <FadeIn>
          <p style={{
            fontFamily: "'Outfit', sans-serif", fontSize: 13, fontWeight: 500,
            textTransform: "uppercase", letterSpacing: "3px", color: "#D4882B",
            marginBottom: 20,
          }}>Services</p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 style={{
            fontFamily: "'DM Serif Display', serif", fontSize: "clamp(32px, 4vw, 48px)",
            fontWeight: 400, lineHeight: 1.15, letterSpacing: "-0.5px",
            marginBottom: 72, maxWidth: 600,
          }}>
            How I create value for organisations
          </h2>
        </FadeIn>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
          gap: 1, background: "rgba(250,247,243,0.08)",
        }}>
          {services.map((s, i) => (
            <FadeIn key={i} delay={0.15 + i * 0.08}>
              <div style={{
                background: "#6B6560", padding: "48px 36px",
                minHeight: 240, display: "flex", flexDirection: "column",
                transition: "background 0.4s",
                cursor: "default",
              }}
                onMouseEnter={e => e.currentTarget.style.background = "#7A756F"}
                onMouseLeave={e => e.currentTarget.style.background = "#6B6560"}
              >
                <div style={{
                  display: "flex", justifyContent: "space-between",
                  alignItems: "flex-start", marginBottom: 24,
                }}>
                  <span style={{
                    fontFamily: "'Outfit', sans-serif", fontSize: 12, fontWeight: 500,
                    letterSpacing: "2px", color: "#D4882B",
                  }}>{s.num}</span>
                  <span style={{ fontSize: 24, color: "rgba(250,247,243,0.15)" }}>{s.icon}</span>
                </div>
                <h3 style={{
                  fontFamily: "'DM Serif Display', serif", fontSize: 22,
                  fontWeight: 400, marginBottom: 16, lineHeight: 1.3,
                }}>{s.title}</h3>
                <p style={{
                  fontFamily: "'Outfit', sans-serif", fontSize: 15,
                  lineHeight: 1.7, color: "#9A948D", marginTop: "auto",
                }}>{s.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function Solutions() {
  const [pulseHover, setPulseHover] = useState(false);

  return (
    <section id="solutions" style={{
      background: "#FAF7F3",
      padding: "120px 32px",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <FadeIn>
          <p style={{
            fontFamily: "'Outfit', sans-serif", fontSize: 13, fontWeight: 500,
            textTransform: "uppercase", letterSpacing: "3px", color: "#D4882B",
            marginBottom: 20,
          }}>Solutions</p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 style={{
            fontFamily: "'DM Serif Display', serif", fontSize: "clamp(32px, 4vw, 48px)",
            fontWeight: 400, color: "#2C2825", lineHeight: 1.15,
            letterSpacing: "-0.5px", marginBottom: 24, maxWidth: 700,
          }}>
            Measure where you stand — then move forward
          </h2>
        </FadeIn>
        <FadeIn delay={0.15}>
          <p style={{
            fontFamily: "'Outfit', sans-serif", fontSize: 18, lineHeight: 1.8,
            color: "#7A756F", maxWidth: 620, marginBottom: 72,
          }}>
            Every transformation starts with an honest assessment. Use the Procurement
            Pulse Check to get a rapid read on your maturity across six critical
            dimensions — no sign-up, no data collected.
          </p>
        </FadeIn>

        {/* Pulse Check Card */}
        <FadeIn delay={0.2}>
          <a href="/pulse" style={{ textDecoration: "none", display: "block" }}
            onMouseEnter={() => setPulseHover(true)}
            onMouseLeave={() => setPulseHover(false)}>
            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 0,
              borderRadius: 0,
              overflow: "hidden",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              transform: pulseHover ? "translateY(-4px)" : "none",
              boxShadow: pulseHover ? "0 20px 60px rgba(44,40,37,0.12)" : "0 4px 24px rgba(44,40,37,0.06)",
            }}
              className="pulse-card"
            >
              {/* Left — info */}
              <div style={{
                background: "#6B6560",
                padding: "56px 48px",
                color: "#fff",
                display: "flex", flexDirection: "column", justifyContent: "center",
              }}>
                <p style={{
                  fontFamily: "'Outfit', sans-serif", fontSize: 11, fontWeight: 600,
                  textTransform: "uppercase", letterSpacing: "2.5px",
                  color: "#D4882B", marginBottom: 16,
                }}>Free Diagnostic</p>
                <h3 style={{
                  fontFamily: "'DM Serif Display', serif", fontSize: "clamp(26px, 3.5vw, 36px)",
                  fontWeight: 400, lineHeight: 1.2, marginBottom: 16,
                }}>
                  Procurement Pulse Check
                </h3>
                <p style={{
                  fontFamily: "'Outfit', sans-serif", fontSize: 16, lineHeight: 1.7,
                  color: "#B5AFA6", marginBottom: 28,
                }}>
                  Six questions a CPO should be able to answer from the gut.
                  Two minutes. No sign-up. You get a maturity score and your
                  single biggest exposure.
                </p>
                <div style={{ display: "flex", gap: 32, flexWrap: "wrap", marginBottom: 28 }}>
                  {[
                    { val: "6", label: "Questions" },
                    { val: "2 min", label: "To complete" },
                    { val: "0", label: "Forms to fill" },
                  ].map((f, i) => (
                    <div key={i}>
                      <p style={{
                        fontFamily: "'DM Serif Display', serif", fontSize: 28,
                        color: "#fff", lineHeight: 1,
                      }}>{f.val}</p>
                      <p style={{
                        fontFamily: "'Outfit', sans-serif", fontSize: 11,
                        textTransform: "uppercase", letterSpacing: "1px",
                        color: "#9A948D", marginTop: 4,
                      }}>{f.label}</p>
                    </div>
                  ))}
                </div>
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: 10,
                  fontFamily: "'Outfit', sans-serif", fontSize: 15, fontWeight: 600,
                  color: "#D4882B",
                }}>
                  Start the Pulse Check
                  <span style={{ fontSize: 20, transition: "transform 0.3s", transform: pulseHover ? "translateX(6px)" : "none" }}>→</span>
                </div>
              </div>

              {/* Right — radar preview */}
              <div style={{
                background: "#F0EBE3",
                padding: "56px 48px",
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center",
              }}>
                {(() => {
                  const scores = [2, 1, 2, 3, 2, 1];
                  const labels = ["Mandate", "Strategy", "Credibility", "Compliance", "Resilience", "AI"];
                  const R = 100, cx = 150, cy = 140, n = 6;
                  const ang = i => -Math.PI/2 + i * 2 * Math.PI / n;
                  const pt = (i, r) => [cx + r * Math.cos(ang(i)), cy + r * Math.sin(ang(i))];
                  const scorePts = scores.map((s, i) => pt(i, R * s / 4));
                  return (
                    <>
                      <svg viewBox="0 0 300 280" style={{ width: "100%", maxWidth: 280 }}>
                        {[4,3,2,1].map(k => {
                          const pts = Array.from({length: n}, (_, i) => pt(i, R * k / 4).map(v => v.toFixed(1)).join(",")).join(" ");
                          return <polygon key={k} points={pts} fill={k === 4 ? "#E9EEF5" : "none"} stroke="#D5CFC6" strokeWidth="0.8" />;
                        })}
                        {Array.from({length: n}, (_, i) => {
                          const [x, y] = pt(i, R);
                          return <line key={i} x1={cx} y1={cy} x2={x.toFixed(1)} y2={y.toFixed(1)} stroke="#D5CFC6" strokeWidth="0.8" />;
                        })}
                        <polygon
                          points={scorePts.map(p => p.map(v => v.toFixed(1)).join(",")).join(" ")}
                          fill="rgba(60,54,50,0.25)" stroke="#3C3632" strokeWidth="2.5" strokeLinejoin="round"
                        />
                        {scorePts.map((p, i) => (
                          <circle key={i} cx={p[0].toFixed(1)} cy={p[1].toFixed(1)} r="4" fill="#D4882B" stroke="#fff" strokeWidth="1.5" />
                        ))}
                        {labels.map((label, i) => {
                          const [lx, ly] = pt(i, R + 18);
                          const anchor = Math.abs(lx - cx) < 12 ? "middle" : (lx > cx ? "start" : "end");
                          return <text key={i} x={lx.toFixed(1)} y={(ly + 4).toFixed(1)} textAnchor={anchor} fontSize="10.5" fill="#6B6560" fontFamily="-apple-system, sans-serif">{label}</text>;
                        })}
                      </svg>
                      <div style={{
                        display: "flex", alignItems: "baseline", gap: 8,
                        marginTop: 14, justifyContent: "center",
                      }}>
                        <span style={{
                          fontFamily: "'DM Serif Display', serif", fontSize: 28,
                          color: "#2C2825", lineHeight: 1,
                        }}>1.83</span>
                        <span style={{
                          fontFamily: "'Outfit', sans-serif", fontSize: 13,
                          color: "#9A948D",
                        }}>/ 4.0</span>
                        <span style={{
                          fontFamily: "'Outfit', sans-serif", fontSize: 10,
                          fontWeight: 600, letterSpacing: "0.08em",
                          textTransform: "uppercase", color: "#fff",
                          background: "#C07825", borderRadius: 3,
                          padding: "3px 8px", marginLeft: 4,
                        }}>Consistent</span>
                      </div>
                      <p style={{
                        fontFamily: "'Outfit', sans-serif", fontSize: 12,
                        color: "#9A948D", marginTop: 10, textAlign: "center",
                        fontStyle: "italic",
                      }}>
                        Sample result — your profile will look different
                      </p>
                    </>
                  );
                })()}
              </div>
            </div>
          </a>
        </FadeIn>

        {/* Privacy note */}
        <FadeIn delay={0.25}>
          <p style={{
            fontFamily: "'Outfit', sans-serif", fontSize: 13,
            color: "#9A948D", marginTop: 20, textAlign: "center",
          }}>
            Runs entirely in your browser — no data is collected or transmitted.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

function Approach() {
  const principles = [
    { title: "Client-Centric", desc: "Every engagement starts with context, goals, and the specific value to be created." },
    { title: "Evidence-Based", desc: "Recommendations grounded in data, benchmarks, and rigorous analysis." },
    { title: "Structured Creativity", desc: "Conceptual thinking paired with disciplined, sequenced execution." },
    { title: "Outcome-Driven", desc: "Every deliverable translates into measurable business or behavioural results." },
    { title: "Human-Focused", desc: "Strategy aligned with culture, leadership motivation, and stakeholder engagement." },
  ];

  return (
    <section id="approach" style={{
      background: "#F0EBE3",
      padding: "120px 32px",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <FadeIn>
          <p style={{
            fontFamily: "'Outfit', sans-serif", fontSize: 13, fontWeight: 500,
            textTransform: "uppercase", letterSpacing: "3px", color: "#D4882B",
            marginBottom: 20,
          }}>Approach</p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 style={{
            fontFamily: "'DM Serif Display', serif", fontSize: "clamp(32px, 4vw, 48px)",
            fontWeight: 400, color: "#2C2825", lineHeight: 1.15,
            letterSpacing: "-0.5px", marginBottom: 24, maxWidth: 700,
          }}>
            Big-picture thinking with executional drive
          </h2>
        </FadeIn>
        <FadeIn delay={0.15}>
          <p style={{
            fontFamily: "'Outfit', sans-serif", fontSize: 18, lineHeight: 1.8,
            color: "#7A756F", maxWidth: 620, marginBottom: 72,
          }}>
            I combine strategic insight with a pragmatic, hands-on approach—ensuring
            solutions are grounded in real business needs, scalable across complex
            environments, and aligned with tangible value creation.
          </p>
        </FadeIn>

        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {principles.map((p, i) => (
            <FadeIn key={i} delay={0.2 + i * 0.08}>
              <div style={{
                display: "grid", gridTemplateColumns: "48px 1fr 1fr",
                gap: 32, alignItems: "start",
                padding: "36px 0",
                borderTop: "1px solid rgba(60,55,48,0.12)",
              }}
                className="approach-row"
              >
                <span style={{
                  fontFamily: "'DM Serif Display', serif", fontSize: 20,
                  color: "#D4882B",
                }}>{String(i + 1).padStart(2, "0")}</span>
                <h3 style={{
                  fontFamily: "'DM Serif Display', serif", fontSize: 24,
                  fontWeight: 400, color: "#2C2825", lineHeight: 1.3,
                }}>{p.title}</h3>
                <p style={{
                  fontFamily: "'Outfit', sans-serif", fontSize: 16,
                  lineHeight: 1.7, color: "#7A756F",
                }}>{p.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" style={{
      background: "#6B6560", color: "#FAF7F3",
      padding: "120px 32px",
      position: "relative",
    }}>
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
        background: "radial-gradient(ellipse at 80% 20%, rgba(139,105,20,0.08) 0%, transparent 60%)",
        pointerEvents: "none",
      }} />
      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>
        <FadeIn>
          <p style={{
            fontFamily: "'Outfit', sans-serif", fontSize: 13, fontWeight: 500,
            textTransform: "uppercase", letterSpacing: "3px", color: "#D4882B",
            marginBottom: 20,
          }}>Contact</p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 style={{
            fontFamily: "'DM Serif Display', serif", fontSize: "clamp(32px, 4vw, 52px)",
            fontWeight: 400, lineHeight: 1.15, letterSpacing: "-0.5px",
            marginBottom: 32, maxWidth: 650,
          }}>
            Let's explore how to unlock your procurement potential
          </h2>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p style={{
            fontFamily: "'Outfit', sans-serif", fontSize: 18, lineHeight: 1.8,
            color: "#9A948D", maxWidth: 500, marginBottom: 56,
          }}>
            Whether you're planning a transformation, seeking strategic advisory,
            or building procurement capabilities—I'd welcome the conversation.
          </p>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 48, maxWidth: 800,
          }}>
            <div>
              <p style={{
                fontFamily: "'Outfit', sans-serif", fontSize: 12, fontWeight: 600,
                textTransform: "uppercase", letterSpacing: "2px",
                color: "#D4882B", marginBottom: 16,
              }}>Email</p>
              <a href="mailto:WeinoldConsulting@gmail.com" style={{
                fontFamily: "'DM Serif Display', serif", fontSize: 20,
                color: "#FAF7F3", textDecoration: "none",
                borderBottom: "1px solid rgba(250,247,243,0.2)",
                paddingBottom: 4, transition: "border-color 0.3s",
              }}>WeinoldConsulting@gmail.com</a>
            </div>
            <div>
              <p style={{
                fontFamily: "'Outfit', sans-serif", fontSize: 12, fontWeight: 600,
                textTransform: "uppercase", letterSpacing: "2px",
                color: "#D4882B", marginBottom: 16,
              }}>LinkedIn</p>
              <a href="https://linkedin.com/in/peterweinold" target="_blank" rel="noopener noreferrer" style={{
                fontFamily: "'DM Serif Display', serif", fontSize: 20,
                color: "#FAF7F3", textDecoration: "none",
                borderBottom: "1px solid rgba(250,247,243,0.2)",
                paddingBottom: 4, transition: "border-color 0.3s",
              }}>linkedin.com/in/peterweinold</a>
            </div>
            <div>
              <p style={{
                fontFamily: "'Outfit', sans-serif", fontSize: 12, fontWeight: 600,
                textTransform: "uppercase", letterSpacing: "2px",
                color: "#D4882B", marginBottom: 16,
              }}>Location</p>
              <p style={{
                fontFamily: "'DM Serif Display', serif", fontSize: 20,
                color: "#FAF7F3",
              }}>Copenhagen, Denmark</p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{
      background: "#5F5A54", padding: "40px 32px",
      borderTop: "1px solid rgba(250,247,243,0.06)",
    }}>
      <div style={{
        maxWidth: 1200, margin: "0 auto",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        flexWrap: "wrap", gap: 16,
      }}>
        <p style={{
          fontFamily: "'Outfit', sans-serif", fontSize: 13,
          color: "#7A756F",
        }}>
          © {new Date().getFullYear()} Peter Weinold. All rights reserved.
        </p>
        <p style={{
          fontFamily: "'Outfit', sans-serif", fontSize: 13,
          color: "#7A756F",
        }}>
          Procurement · Transformation · Leadership
        </p>
      </div>
    </footer>
  );
}

export default function PeterWeinoldWebsite() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handler = () => {
      for (const s of [...SECTIONS].reverse()) {
        const el = document.getElementById(s);
        if (el && el.getBoundingClientRect().top < 200) {
          setActiveSection(s);
          break;
        }
      }
    };
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div style={{ background: "#FAF7F3", color: "#2C2825", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Outfit:wght@300;400;500;600;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { overflow-x: hidden; }

        ::selection {
          background: rgba(139,105,20,0.2);
          color: #2C2825;
        }

        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
          .about-grid { grid-template-columns: 1fr !important; }
          .approach-row {
            grid-template-columns: 1fr !important;
            gap: 8px !important;
          }
          .pulse-card {
            grid-template-columns: 1fr !important;
          }
        }

        @media (min-width: 769px) {
          .mobile-menu { display: none !important; }
        }
      `}</style>

      <Nav active={activeSection} />
      <Hero />
      <About />
      <Services />
      <Solutions />
      <Approach />
      <Contact />
      <Footer />
      <Analytics />
    </div>
  );
}
