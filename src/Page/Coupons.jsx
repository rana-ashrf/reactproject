import { useEffect, useState } from "react";
import axios from "axios";

function Coupons() {
  const [copiedCode, setCopiedCode] = useState(null);
  const [coupons, setCoupons] = useState([]);

  useEffect(() => {
    const fetchCoupons = async () => {
      const res = await axios.get(
        "http://localhost:5000/coupons"
      );
      setCoupons(res.data);
    };
    fetchCoupons();
  }, []);

  const isExpired = (expiry) =>
    new Date(expiry) < new Date();

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 1500);
  };

  const availableCoupons = coupons.filter(
    (c) => c.active && !c.used && !isExpired(c.expiry)
  );

  const otherCoupons = coupons.filter(
    (c) =>
      c.used || isExpired(c.expiry) || !c.active
  );

  return (
    <div className="min-h-screen bg-gray-100 pt-24 pb-20 px-4">
      <h2 className="text-xl font-semibold mb-6">
        My Coupons
      </h2>

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
              key={coupon.id}
              className="bg-white p-4 rounded-xl border border-dashed border-black"
            >
              <div className="flex justify-between items-center">
                <h4 className="font-bold text-lg">
                  {coupon.code}
                </h4>

                <button
                  onClick={() =>
                    handleCopy(coupon.code)
                  }
                  className="text-sm px-3 py-1 border border-black rounded-full"
                >
                  {copiedCode === coupon.code
                    ? "Copied"
                    : "Copy"}
                </button>
              </div>

              <p className="text-sm mt-1">
                {coupon.type === "percentage"
                  ? `${coupon.value}% off`
                  : `₹${coupon.value} off`}
              </p>

              <p className="text-xs text-gray-500 mt-1">
                Expires on {coupon.expiry}
              </p>
            </div>
          ))}
        </div>
      )}

      <h3 className="text-sm font-semibold mb-3">
        Used / Expired Coupons
      </h3>

      <div className="space-y-4">
        {otherCoupons.map((coupon) => (
          <div
            key={coupon.id}
            className="bg-gray-200 p-4 rounded-xl opacity-60"
          >
            <h4 className="font-bold text-lg">
              {coupon.code}
            </h4>
            <p className="text-sm mt-1">
              {coupon.used
                ? "Used"
                : "Inactive / Expired"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Coupons;