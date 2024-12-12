import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const fetchSubscriptions = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/subs');
    if (!response.ok) {
      throw new Error('Failed to fetch subscriptions');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching subscriptions:', error);
    throw error;
  }
};

const SubscriptionPage = ({ isDarkMode }) => {
  const [subscriptionPlans, setSubscriptionPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getSubscriptions = async () => {
      try {
        const plans = await fetchSubscriptions();
        setSubscriptionPlans(plans);
      } catch (err) {
        setError('Failed to fetch subscription plans');
      } finally {
        setLoading(false);
      }
    };

    getSubscriptions();
  }, []);

  const handleSubscribe = (plan) => {
    // Navigate to PaymentPage with selected plan details
    navigate('/payment', { state: { plan } });
  };

  const planColors = {
    Basic: {
      bgColor: isDarkMode ? 'bg-gray-800' : 'bg-gray-100',
      textColor: isDarkMode ? '!text-gray-300' : '!text-gray-700',
    },
    Premium: {
      bgColor: isDarkMode ? 'bg-blue-900' : 'bg-blue-100',
      textColor: isDarkMode ? '!text-blue-300' : '!text-blue-700',
    },
    VIP: {
      bgColor: isDarkMode ? 'bg-yellow-800' : 'bg-yellow-100',
      textColor: isDarkMode ? '!text-yellow-300' : '!text-yellow-700',
    },
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div
      className={`min-h-screen flex flex-col items-center py-10 ${
        isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'
      }`}
    >
      <header className="text-center mb-10">
        <h1 className="text-4xl font-extrabold">Choose Your Plan</h1>
        <p className="mt-2 text-lg">
          Select the best plan that suits your needs and enjoy premium features.
        </p>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
        {subscriptionPlans.map((plan, index) => {
          const { bgColor, textColor } = planColors[plan.name] || {};

          return (
            <div
              key={index}
              className={`rounded-lg shadow-lg p-6 ${bgColor} hover:scale-105 transition-transform duration-300`}
            >
              <h2 className={`text-2xl font-bold mb-4 text-center ${textColor}`}>{plan.name}</h2>
              <p className={`text-xl font-semibold text-center ${textColor}`}>{plan.price}</p>
              <ul className="mt-4 mb-6 space-y-2">
                {plan.features.map((benefit, index) => (
                  <li key={index} className="flex items-center">
                    <span className="mr-2 text-green-500">✔</span>
                    {benefit}
                  </li>
                ))}
              </ul>
              <div className="text-center">
                <button
                  className={`px-6 py-2 rounded-full font-bold ${
                    plan.name === 'Premium'
                      ? 'bg-blue-500 hover:bg-blue-700'
                      : plan.name === 'VIP'
                      ? 'bg-yellow-500 hover:bg-yellow-700'
                      : 'bg-gray-500 hover:bg-gray-700'
                  } text-white`}
                  onClick={() => handleSubscribe(plan)}
                >
                  Subscribe Now
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SubscriptionPage;