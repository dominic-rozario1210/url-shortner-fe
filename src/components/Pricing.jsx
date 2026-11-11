
import { useState } from "react";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Starter",
    desc: "For individuals getting started.",
    monthly: 0,
    yearly: 0,
    items: [
      "1,000 links per month",
      "Basic click analytics",
      "QR codes",
      "snip.ly domain"
    ]
  },
  {
    name: "Pro",
    desc: "For creators and growing teams.",
    monthly: 15,
    yearly: 12,
    popular: true,
    items: [
      "25,000 links per month",
      "Real-time analytics",
      "3 branded domains",
      "Custom slugs",
      "Password and expiry links",
      "API access"
    ]
  },
  {
    name: "Enterprise",
    desc: "For organizations at scale.",
    monthly: "Custom",
    yearly: "Custom",
    items: [
      "Unlimited links",
      "Unlimited domains",
      "SSO and audit logs",
      "Dedicated support",
      "99.99% uptime SLA"
    ]
  }
];

export default function Pricing() {
  const [yearly, setYearly] = useState(true);

  return (
    <main className="inner-page">

      <section className="page-hero container">
        <span className="eyebrow">PRICING</span>

        <h1>
          Start free.<br />
          <span className="gradient-text">Scale when ready.</span>
        </h1>

        <p>
          Transparent plans for creators, startups
          and enterprises.
        </p>

        <div className="billing-toggle">
          <button
            className={!yearly ? "selected" : ""}
            onClick={() => setYearly(false)}
          >
            Monthly
          </button>

          <button
            className={yearly ? "selected" : ""}
            onClick={() => setYearly(true)}
          >
            Yearly <small>−20%</small>
          </button>
        </div>
      </section>

      <section className="container pricing-grid">

        {plans.map(plan => (
          <article
            className={`price-card ${plan.popular ? "popular" : ""}`}
            key={plan.name}
          >

            {plan.popular && (
              <span className="popular-label">
                Most popular
              </span>
            )}

            <h2>{plan.name}</h2>
            <p>{plan.desc}</p>

            <div className="price">
              {typeof plan[yearly ? "yearly" : "monthly"] === "number"
                ? "$" + plan[yearly ? "yearly" : "monthly"]
                : "Custom"}

              {plan.name === "Pro" && <small>/mo</small>}
            </div>

            <LinkButton />

            <ul>
              {plan.items.map(item => (
                <li key={item}>
                  <Check size={17} />
                  {item}
                </li>
              ))}
            </ul>

          </article>
        ))}

      </section>

    </main>
  );

  function LinkButton() {
    return (
      <a
        className={`btn ${planClass()}`}
        href="/register"
      >
        {planLabel()}
      </a>
    );
  }

  function planClass() {
    return "btn-primary";
  }

  function planLabel() {
    return "Get started";
  }
}
