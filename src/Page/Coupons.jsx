import { useState } from "react";

function Coupons() {
  const [copiedCode, setCopiedCode] = useState(null);

  const coupons = [
    {
      code: "SAVE20",
      description: "Get 20% off on orders above ₹1999",
      expiry: "2025-12-31",
      used: false
    },
    {
      code: "FIRSTBUY",
      description: "₹300 off on your first purchase",
      expiry: "2025-01-05",
      used: true
    },
    {
      code: "FESTIVE10",
      description: "Flat 10% off on festive collection",
      expiry: "2024-12-10",
      used: false
    },
    {
      code: "NORETURN5OFF",
      description: "Flat 5% off ",
      expiry: "2026-02-10",
      used: false
    }
  ];

  // EXPIRY CHECK
  const isExpired = (expiry) => {
    return new Date(expiry) < new Date();
  };

 
  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);

    setTimeout(() => setCopiedCode(null), 1500);
  };

  const availableCoupons = coupons.filter(
    (c) => !c.used && !isExpired(c.expiry)
  );

  const otherCoupons = coupons.filter(
    (c) => c.used || isExpired(c.expiry)
  );

  return (
    <div className="min-h-screen bg-gray-100 pt-24 pb-20 px-4">
      <h2 className="text-xl font-semibold mb-6">My Coupons</h2>

      {/* AVAILABLE COUPONS */}
      <h3 className="text-sm font-semibold mb-3">
        Available Coupons
      </h3>

      {availableCoupons.length === 0 ? (
        <p className="text-gray-500 mb-8">
          No available coupons right now
        </p>
      ) : (
        <div className="space-y-4 mb-8">
          {availableCoupons.map((coupon) => (
            <div
              key={coupon.code}
              className="bg-white p-4 rounded-xl border border-dashed border-black"
            >
              <div className="flex justify-between items-center">
                <h4 className="font-bold text-lg">
                  {coupon.code}
                </h4>

                <button
                  onClick={() => handleCopy(coupon.code)}
                  className="text-sm px-3 py-1 border border-black rounded-full"
                >
                  {copiedCode === coupon.code ? "Copied" : "Copy"}
                </button>
              </div>

              <p className="text-sm mt-1">
                {coupon.description}
              </p>

              <p className="text-xs text-gray-500 mt-1">
                Expires on {coupon.expiry}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* USED / EXPIRED COUPONS */}
      <h3 className="text-sm font-semibold mb-3">
        Used / Expired Coupons
      </h3>

      <div className="space-y-4">
        {otherCoupons.map((coupon) => (
          <div
            key={coupon.code}
            className="bg-gray-200 p-4 rounded-xl opacity-60"
          >
            <h4 className="font-bold text-lg">
              {coupon.code}
            </h4>

            <p className="text-sm mt-1">
              {coupon.description}
            </p>

            <p className="text-xs mt-1">
              {coupon.used ? "Used" : "Expired"} • Expires on{" "}
              {coupon.expiry}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Coupons;
