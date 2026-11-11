
import { useState } from "react";
import {
  Mail,
  MessageCircle,
  MapPin,
  Send
} from "lucide-react";

export default function Contact() {
  const [sent, setSent] = useState(false);

  const contactDetails = [
    [Mail, "Email us", "hello@snip.ly"],
    [MessageCircle, "Live chat", "Mon–Fri, 9am–6pm"],
    [MapPin, "Visit", "Remote-first · HQ in Lisbon"]
  ];

  function handleSubmit(e) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <main className="inner-page">

      <section className="page-hero container">
        <span className="eyebrow">CONTACT</span>

        <h1>
          Let's <span className="gradient-text">talk links.</span>
        </h1>

        <p>
          Questions, enterprise plans or partnerships —
          our team usually replies within a few hours.
        </p>
      </section>

      <section className="container contact-grid">

        <div className="contact-info">
          {contactDetails.map(([Icon, title, description]) => (
            <article className="contact-tile" key={title}>
              <span className="icon-bubble">
                <Icon />
              </span>

              <div>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            </article>
          ))}
        </div>

        <form
          className="contact-form"
          onSubmit={handleSubmit}
        >

          <div className="form-two">
            <label>
              Name
              <input required placeholder="Jane Doe" />
            </label>

            <label>
              Email
              <input
                required
                type="email"
                placeholder="jane@company.com"
              />
            </label>
          </div>

          <label>
            Topic
            <select>
              <option>Sales & enterprise</option>
              <option>Technical support</option>
              <option>Partnership</option>
              <option>Other</option>
            </select>
          </label>

          <label>
            Message
            <textarea
              required
              rows="5"
              placeholder="Tell us what you need..."
            />
          </label>

          <button className="btn btn-primary" type="submit">
            {sent ? "Message received" : "Send message"}
            <Send size={16} />
          </button>

          {sent && (
            <p className="success-message">
              Thanks! This is a frontend demo submission.
            </p>
          )}

        </form>

      </section>

    </main>
  );
}
