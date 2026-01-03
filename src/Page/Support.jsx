import "../styles/Support.css";

function Support() {
  const faqs = [
    {
      question: "How can I track my order?",
      answer: "You can track your order from the Orders page once it is shipped."
    },
    {
      question: "How do I return or exchange a product?",
      answer: "Returns and exchanges are available within 7 days of delivery."
    },
    {
      question: "When will my order be delivered?",
      answer: "Orders are usually delivered within 3–7 business days."
    },
    {
      question: "How can I contact customer support?",
      answer: "You can reach us via WhatsApp, email, or phone anytime."
    }
  ];

  return (
    <div className="support-container">
      <h2>Customer Service</h2>

      {/* FAQ SECTION */}
      <div className="support-section">
        <h3>Frequently Asked Questions</h3>

        {faqs.map((faq, index) => (
          <div className="faq-item" key={index}>
            <h4>{faq.question}</h4>
            <p>{faq.answer}</p>
          </div>
        ))}
      </div>

      {/* CONTACT SUPPORT */}
      <div className="support-section">
        <h3>Contact Support</h3>

        <div className="support-options">
          <a
            href="https://wa.me/919999999999"
            target="_blank"
            rel="noreferrer"
            className="support-card whatsapp"
          >
            📱 WhatsApp Support
            <span>Chat with us</span>
          </a>

          <a
            href="mailto:support@yourstore.com"
            className="support-card email"
          >
            ✉️ Email Support
            <span>support@yourstore.com</span>
          </a>

          <a
            href="tel:+919999999999"
            className="support-card call"
          >
            📞 Call Support
            <span>+91 99999 99999</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Support;
