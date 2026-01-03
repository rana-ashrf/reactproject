function ReturnPolicy() {
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
      marginTop: "16px",
      fontStyle: "italic",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Return Policy</h1>

      <p style={styles.paragraph}>
        The refund will be processed as soon as the pickup is completed and the
        returned item meets the required quality parameters. No refund will be
        issued if the product does not pass the quality check at the time of
        pickup.
      </p>

      <p style={styles.paragraph}>
        The timeline for the refund to reflect in your account is{" "}
        <strong>5–7 working days</strong>, subject to bank processing timelines.
      </p>

      <p style={styles.paragraph}>
        <strong>Note:</strong> Refunds are applicable only to the item value.
        Other charges such as shipping fees, COD service charges, or convenience
        fees are non-refundable. Our shipping partner will pick up the returned
        item at no additional cost.
      </p>

      <p style={styles.paragraph}>
        If you face any issues while submitting a return request through the app
        or website, please reach out to our chat support team for assistance.
      </p>

      <p style={styles.paragraph}>
        Certain products may have exceptions to the return policy as mentioned
        below.
      </p>

      <h2 style={styles.subHeading}>
        Exceptions & Rules Applicable to This Policy
      </h2>

      <ol style={styles.list}>
        <li style={styles.listItem}>
          All items must be unused, unworn, unwashed, and returned in their
          original condition with all original tags and packaging intact.
        </li>

        <li style={styles.listItem}>
          If an item was purchased along with a free gift or promotional offer,
          the free gift must also be returned along with the main product to
          process the refund.
        </li>

        <li style={styles.listItem}>
          The company will not be responsible for products returned mistakenly.
          If an incorrect or extra product is returned by the customer, the
          company will not be liable for its replacement or return.
        </li>

        <li style={styles.listItem}>
          In case an order is lost in transit or undelivered due to logistics
          issues at the delivery location, the complete prepaid order amount
          will be refunded.
        </li>

        <li style={styles.listItem}>
          If a customer rejects an order at the time of delivery, the
          convenience fee will not be refunded.
        </li>

        <li style={styles.listItem}>
          If a customer partially cancels an order or returns one or more items,
          the convenience fee will not be refunded.
        </li>

        <li style={styles.listItem}>
          If a product is successfully returned but the refund cannot be
          processed due to incorrect or inactive bank account details provided
          by the customer, the customer must share valid details and claim the
          refund within <strong>one year</strong> from the return date. Failure
          to do so will result in forfeiture of the refund amount.
        </li>

        <li style={styles.listItem}>
          Convenience fees will be refunded only in cases of full order
          cancellation. For more details, please refer to our Terms &
          Conditions or FAQs.
        </li>

        <li style={styles.listItem}>
          For accounts that violate fair usage or return policies, shipping or
          convenience fees will be non-refundable irrespective of the order
          value. Order value is calculated after applying discounts, VAT/GST, or
          other applicable charges.
        </li>
      </ol>
    </div>
  );
}

export default ReturnPolicy;
