
import { Heart, Rocket, Shield, Sparkles } from "lucide-react";

const values = [
  ["Craft over clutter", "We make links feel effortless.", Sparkles],
  ["Privacy by default", "Your data stays yours.", Shield],
  ["Ship fast, stay stable", "Reliable infrastructure and regular improvements.", Rocket],
  ["Customers first", "Real humans are here to help.", Heart]
];

const timeline = [
  ["2021", "A side project", "Two engineers build a tiny URL shortener."],
  ["2022", "First 10,000 users", "Branded domains and analytics arrive."],
  ["2024", "Series A", "We grow our link infrastructure."],
  ["2026", "4 billion clicks", "Teams across 150 countries use Snip."]
];

export default function About() {
  return (
    <main className="inner-page">

      <section className="page-hero container">
        <span className="eyebrow">ABOUT US</span>

        <h1>
          We make links<br />
          <span className="gradient-text">
            worth clicking.
          </span>
        </h1>

        <p>
          Snip started with a simple idea:
          links should be short, beautiful and honest
          about where they go.
        </p>
      </section>

      <section className="container stats-grid about-stats">
        {[
          ["150+", "Countries"],
          ["64", "Team members"],
          ["4.9/5", "Customer rating"]
        ].map(item => (
          <div className="stat-card" key={item[0]}>
            <strong>{item[0]}</strong>
            <span>{item[1]}</span>
          </div>
        ))}
      </section>

      <section className="section container story">
        <h2>Our story</h2>

        <div className="timeline">
          {timeline.map(item => (
            <article key={item[0]}>
              <span>{item[0]}</span>
              <h3>{item[1]}</h3>
              <p>{item[2]}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section section-muted">
        <div className="container">

          <div className="section-heading">
            <h2>What we believe</h2>
          </div>

          <div className="four-grid">
            {values.map(([title, desc, Icon]) => (
              <article className="value-card" key={title}>
                <Icon />
                <h3>{title}</h3>
                <p>{desc}</p>
              </article>
            ))}
          </div>

        </div>
      </section>

      <section className="section container">
        <div className="section-heading">
          <h2>The people behind the links</h2>
        </div>

        <div className="four-grid team-grid">
          {[
            ["AM", "Ava Moreno", "Co-founder & CEO"],
            ["RM", "Rohan Mehta", "Co-founder & CTO"],
            ["SL", "Sara Lindqvist", "Head of Design"],
            ["KW", "Kenji Watanabe", "Head of Engineering"]
          ].map(person => (
            <article className="team-card" key={person[0]}>
              <div>{person[0]}</div>
              <h3>{person[1]}</h3>
              <p>{person[2]}</p>
            </article>
          ))}
        </div>
      </section>

    </main>
  );
}
