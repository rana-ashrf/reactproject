import { useNavigate } from "react-router-dom";

function Returns() {
  const navigate = useNavigate();
  const returns = JSON.parse(localStorage.getItem("returns")) || [];

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

      {returns.length === 0 ? (
        <div className="bg-white p-6 rounded-xl text-center">
          <p className="text-gray-600">You have no returns yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {returns.map((item, index) => (
            <div
              key={index}
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
                  Ordered on {item.orderDate}
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
