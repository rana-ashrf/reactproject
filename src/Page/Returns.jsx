import { useNavigate } from "react-router-dom";
import "../styles/MyOrders.css"; // or your returns css
import { useAuth } from "../Context/AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";

function Returns() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [returnsList, setReturnsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return; // safety

    const fetchReturns = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `http://localhost:5000/returns?userId=${user.id}`
        );

        // optional: latest returns first
        const sorted = [...res.data].sort(
          (a, b) => new Date(b.orderDate) - new Date(a.orderDate)
        );

        setReturnsList(sorted);
      } catch (err) {
        console.error("Error fetching returns:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReturns();
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-100 pt-24 pb-20 px-4">
        <h2 className="text-center text-gray-700">
          Please login to view your returns.
        </h2>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 pt-24 pb-20 px-4">
        <p className="text-center text-gray-600">Loading your returns...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-24 pb-20 px-4">
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-gray-500"
        >
          ← Back
        </button>
        <h2 className="text-xl font-semibold">My Returns</h2>
      </div>

      {returnsList.length === 0 ? (
        <div className="bg-white p-6 rounded-xl text-center">
          <p className="text-gray-600">You have no returns yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {returnsList.map((item) => (
            <div
              key={item.id}
              className="bg-white p-4 rounded-xl flex gap-4"
            >
              <img
                src={item.image}
                alt={item.productName}
                className="w-20 h-24 object-cover rounded-lg"
              />

              <div className="flex-1">
                <h3 className="font-semibold">{item.productName}</h3>

                <p className="text-sm text-gray-500">
                  Order ID: #{item.orderId}
                </p>

                <p className="text-sm text-gray-500">
                  Ordered on{" "}
                  {item.orderDate
                    ? new Date(item.orderDate).toDateString()
                    : item.orderDate}
                </p>

                <p className="text-sm">
                  <b>Size:</b> {item.size}
                </p>

                <p className="text-sm mt-1">
                  <b>Reason:</b> {item.reason}
                </p>

                <span className="inline-block mt-2 px-3 py-1 text-xs rounded-full bg-yellow-100 text-yellow-700">
                  {item.status}
                </span>

                {item.refund && (
                  <p className="text-xs text-green-700 mt-2">
                    {item.refund}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Returns;