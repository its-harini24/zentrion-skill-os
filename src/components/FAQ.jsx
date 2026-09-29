import { useState } from "react";
import "./FAQ.css";

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What is Zentrion Skill OS?",
      answer:
        "Zentrion is a skill development platform where students can learn, practice, assess their skills, build projects, and prepare for their careers.",
    },
    {
      question: "Can I practice problems outside Computer Science?",
      answer:
        "Yes. Zentrion is designed to support multiple engineering domains including Computer Science, Mechanical, ECE, and Civil.",
    },
    {
      question: "How does the skill analysis work?",
      answer:
        "Your practice activity, assessments, and completed challenges can be used to build a skill profile and identify areas that need improvement.",
    },
    {
      question: "Can Zentrion help with interview preparation?",
      answer:
        "The platform is designed to connect skill development with interview preparation, including technical practice and personalized guidance.",
    },
    {
      question: "Is Zentrion only for placement preparation?",
      answer:
        "No. Placement preparation is one part of the journey. The platform focuses on continuously building and proving practical skills.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq-section">

      <div className="faq-heading">
        <p>HAVE QUESTIONS?</p>

        <h2>
          Everything you need
          <span> to know.</span>
        </h2>

        <p>
          A few answers about how Zentrion can fit into
          your learning and career journey.
        </p>
      </div>

      <div className="faq-list">

        {faqs.map((faq, index) => (
          <div
            className={`faq-item ${
              openIndex === index ? "faq-open" : ""
            }`}
            key={faq.question}
          >

            <button
              className="faq-question"
              onClick={() => toggleFAQ(index)}
            >
              <span>{faq.question}</span>

              <span className="faq-icon">
                {openIndex === index ? "−" : "+"}
              </span>
            </button>

            <div className="faq-answer">
              <p>{faq.answer}</p>
            </div>

          </div>
        ))}

      </div>

    </section>
  );
}

export default FAQ;