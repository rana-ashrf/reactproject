import React from 'react'

function Shipping()  {
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
    paragraph: {
      marginBottom: "14px",
    },
    subHeading: {
      marginTop: "26px",
      marginBottom: "12px",
      fontSize: "18px",
      color: "#000",
    },
    list: {
      paddingLeft: "20px",
      marginTop: "10px",
    },
    listItem: {
      marginBottom: "10px",
    },
    note: {
      fontStyle: "italic",
      marginTop: "16px",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Shipping & Delivery</h1>

      <p style={styles.paragraph}>
        We aim to deliver your orders in a timely and secure manner. Below is
        detailed information about our shipping process, delivery timelines,
        and related policies.
      </p>

      <h2 style={styles.subHeading}>Delivery Timeline</h2>
      <p style={styles.paragraph}>
        Orders are usually processed within <strong>1–3 business days</strong>
        after successful confirmation. Once dispatched, delivery timelines
        depend on your location and logistics availability.
      </p>
      <ul style={styles.list}>
        <li style={styles.listItem}>
          Metro & Tier-1 cities: <strong>3–5 business days</strong>
        </li>
        <li style={styles.listItem}>
          Other cities & towns: <strong>5–7 business days</strong>
        </li>
        <li style={styles.listItem}>
          Remote or rural locations: <strong>7–10 business days</strong>
        </li>
      </ul>
      <p style={styles.paragraph}>
        Delivery timelines may be extended during sale periods, festivals,
        public holidays, or due to unforeseen logistical constraints.
      </p>

      <h2 style={styles.subHeading}>Cash on Delivery (COD)</h2>
      <p style={styles.paragraph}>
        Cash on Delivery is available for selected pin codes and may be subject
        to order value limits. COD availability is automatically determined at
        checkout based on your delivery location.
      </p>
      <p style={styles.paragraph}>
        An additional COD or convenience fee may be applicable. This fee, if
        charged, is non-refundable in case of returns or partial cancellations.
      </p>
      <p style={styles.paragraph}>
        COD orders must be paid in full at the time of delivery. Please ensure
        availability of the exact payable amount to avoid delivery issues.
      </p>

      <h2 style={styles.subHeading}>Order Tracking</h2>
      <p style={styles.paragraph}>
        Once your order is shipped, you will receive a confirmation message via
        SMS or email containing the tracking details.
      </p>
      <p style={styles.paragraph}>
        Tracking information allows you to monitor your shipment status,
        including dispatch, in-transit updates, and expected delivery date.
      </p>
      <p style={styles.paragraph}>
        Tracking status updates may take up to <strong>24 hours</strong> to
        reflect after dispatch. In some cases, updates may be delayed due to
        courier system synchronization.
      </p>

      <p style={styles.paragraph}>
        If your order shows as delivered but has not been received by you,
        please contact our customer support team within <strong>48 hours</strong>
        for assistance.
      </p>

      <p style={styles.note}>
        Note: Delivery attempts are made as per courier policies. If an order
        cannot be delivered due to incorrect address details, unavailability of
        the recipient, or repeated failed attempts, the order may be returned
        to origin.
      </p>
    </div>
  );
}


export default Shipping