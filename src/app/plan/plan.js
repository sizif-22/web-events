const Plan = ({ title, description, price }) => {
  return (
    <div className="plan-card bg-white rounded-2xl shadow-lg p-6 flex flex-col">
      <div className="flex-1">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="mb-6">
          <p className="text-4xl font-bold text-gray-900">
            {price}
            <span className="text-sm font-medium text-gray-500"> /mo</span>
          </p>
        </div>
      </div>
      <a
        aria-describedby="plan-details"
        className="flex items-center justify-center px-4 py-2.5 text-center text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-colors duration-300"
        href="./signup"
      >
        Get Started
      </a>
    </div>
  );
};

export default Plan;
