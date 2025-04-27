import { motion } from "framer-motion";

function Pricing() {
  return (
    <div className="pt-32 min-h-screen flex flex-col items-center justify-start bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 text-gray-900 p-6">
      <motion.h1
        className="text-5xl font-extrabold mb-8 text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Pricing Plans
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
        {/* Free Plan */}
        <motion.div
          className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-3xl font-bold mb-4">Free</h2>
          <p className="text-gray-600 mb-6">Get started for free</p>
          <p className="text-4xl font-extrabold mb-6">$0</p>
          <ul className="text-gray-700 mb-8 space-y-2">
            <li>✅ 5 image generations</li>
            <li>✅ Basic quality</li>
            <li>✅ Limited support</li>
          </ul>
          <button className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-6 rounded-full font-semibold transition-all">
            Start Free
          </button>
        </motion.div>

        {/* Pro Plan */}
        <motion.div
          className="bg-white rounded-2xl shadow-2xl p-8 flex flex-col items-center border-4 border-purple-400"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold mb-4">Pro</h2>
          <p className="text-gray-600 mb-6">Perfect for enthusiasts</p>
          <p className="text-4xl font-extrabold mb-6">$9.99/mo</p>
          <ul className="text-gray-700 mb-8 space-y-2">
            <li>✅ 100 image generations</li>
            <li>✅ High quality outputs</li>
            <li>✅ Priority support</li>
          </ul>
          <button className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-6 rounded-full font-semibold transition-all">
            Go Pro
          </button>
        </motion.div>

        {/* Enterprise Plan */}
        <motion.div
          className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-4">Enterprise</h2>
          <p className="text-gray-600 mb-6">For businesses and teams</p>
          <p className="text-4xl font-extrabold mb-6">Contact Us</p>
          <ul className="text-gray-700 mb-8 space-y-2">
            <li>✅ Unlimited generations</li>
            <li>✅ Custom solutions</li>
            <li>✅ Dedicated account manager</li>
          </ul>
          <button className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-6 rounded-full font-semibold transition-all">
            Contact Sales
          </button>
        </motion.div>
      </div>
    </div>
  );
}

export default Pricing;
