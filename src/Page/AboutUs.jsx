function AboutUs() {
  const styles = {
    container: {
      maxWidth: "900px",
      margin: "0 auto",
      padding: "24px",
      lineHeight: "1.8",
      color: "#444",
      fontSize: "15px",
    },
    heading: {
      fontSize: "28px",
      marginBottom: "20px",
      color: "#000",
    },
    subHeading: {
      marginTop: "26px",
      marginBottom: "12px",
      fontSize: "18px",
      color: "#000",
    },
    paragraph: {
      marginBottom: "14px",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>About Us</h1>

      <p style={styles.paragraph}>
        We are a fashion-focused brand committed to creating thoughtfully
        designed clothing that blends style, comfort, and quality. Our journey
        began with a passion for craftsmanship and a vision to make fashion
        accessible while maintaining high standards of design and detail.
      </p>

      <p style={styles.paragraph}>
        Every piece in our collection is carefully curated to reflect modern
        trends while staying true to timeless silhouettes. We believe fashion
        should not only look good but also feel effortless and confident when
        worn.
      </p>

      <h2 style={styles.subHeading}>Our Vision</h2>
      <p style={styles.paragraph}>
        Our vision is to build a brand that celebrates individuality and
        self-expression. We aim to empower our customers by offering styles
        that resonate with their personal identity and evolving lifestyle.
      </p>

      <h2 style={styles.subHeading}>What We Offer</h2>
      <p style={styles.paragraph}>
        From everyday essentials to statement pieces, our collections are
        designed with attention to fabric selection, fit, and finishing. Each
        design goes through multiple quality checks to ensure a refined
        experience from purchase to wear.
      </p>

      <p style={styles.paragraph}>
        We continuously evolve by listening to our customers, refining our
        designs, and adapting to the dynamic world of fashion.
      </p>

      <h2 style={styles.subHeading}>Quality & Craftsmanship</h2>
      <p style={styles.paragraph}>
        Quality is at the heart of everything we do. We work closely with
        skilled artisans and manufacturers who share our commitment to ethical
        practices and high-quality standards.
      </p>

      <h2 style={styles.subHeading}>Customer Commitment</h2>
      <p style={styles.paragraph}>
        Our customers are our priority. From secure shopping to reliable
        delivery and responsive support, we strive to offer a seamless and
        trustworthy shopping experience.
      </p>

      <p style={styles.paragraph}>
        Thank you for being part of our journey. We look forward to growing
        together and continuing to bring you designs you’ll love.
      </p>
    </div>
  );
}

export default AboutUs;
