function StatCard({ title, value, subtitle, color = "green", icon }) {
  const gradients = {
    purple: "linear-gradient(135deg,#c084fc,#a855f7)",
    blue: "linear-gradient(135deg,#60a5fa,#2563eb)",
    green: "linear-gradient(135deg,#34d399,#059669)",
    orange: "linear-gradient(135deg,#fdba74,#f97316)",
  };

  return (
    <div
      style={{
        background: gradients[color],
        color: "white",
        padding: "20px",
        borderRadius: "16px",
        display: "flex",
        alignItems: "center",
        gap: "16px",
        boxShadow: "0 10px 25px rgba(0,0,0,0.12)",
        minHeight: "110px",
      }}
    >
      {/* ICON */}
      <div
        style={{
          fontSize: "32px",
          background: "rgba(255,255,255,0.2)",
          width: "56px",
          height: "56px",
          borderRadius: "14px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {icon}
      </div>

      {/* TEXT */}
      <div>
        <p
          style={{
            fontSize: "14px",
            opacity: 0.9,
            marginBottom: "6px",
          }}
        >
          {title}
        </p>

        <h2
          style={{
            fontSize: "26px",
            fontWeight: "700",
            lineHeight: 1.2,
          }}
        >
          {value}
        </h2>

        {subtitle && (
          <p
            style={{
              fontSize: "12px",
              marginTop: "4px",
              opacity: 0.85,
            }}
          >
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}

export default StatCard;
