import React from 'react'
import { FaShippingFast, FaUndoAlt, FaBoxOpen } from "react-icons/fa";

function Features(){
  return (
    <section className="w-full bg-[#faf9f7] border-t border-gray-200">
      <div className="max-w-8xl mx-auto px-4 py-5">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          
          {/* Free Shipping */}
          <div className="flex items-center justify-center gap-4 md:border-r md:border-gray-300">
            <FaBoxOpen className="text-2xl text-gray-700 " />
            <div className="text-left">
              <h4 className="font-medium text-gray-900">Free Shipping</h4>
              <p className="text-sm text-gray-500">On all orders</p>
            </div>
          </div>

          {/* Fast Delivery */}
          <div className="flex items-center justify-center gap-4 md:border-r md:border-gray-300">
            <FaShippingFast className="text-2xl text-gray-700" />
            <div className="text-left">
              <h4 className="font-medium text-gray-900">Fast Delivery</h4>
              <p className="text-sm text-gray-500">Within 2–3 days</p>
            </div>
          </div>

          {/* Easy Returns */}
          <div className="flex items-center justify-center gap-4">
            <FaUndoAlt className="text-2xl text-gray-700" />
            <div className="text-left">
              <h4 className="font-medium text-gray-900">Easy Returns</h4>
              <p className="text-sm text-gray-500">30-day hassle free</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}


export default Features