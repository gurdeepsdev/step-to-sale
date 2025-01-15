import { useState } from "react";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [showMore, setShowMore] = useState(false);

  const initialQuestions = [
    {
      question: "What is Step for Sale?",
      answer:
        "Lorem ipsum dolor sit amet consectetur. Turpis ac pretium justo enim. Tellus at at cras aliquam ac volutpat in hac.",
    },
    {
      question: "What is Step for Sale cashback?",
      answer:
        "Lorem ipsum dolor sit amet consectetur. Turpis ac pretium justo enim. Tellus at at cras aliquam ac volutpat in hac.",
    },
    {
      question: "What are the benefits of using Step for Sale?",
      answer:
        "Lorem ipsum dolor sit amet consectetur. Turpis ac pretium justo enim. Tellus at at cras aliquam ac volutpat in hac.",
    },
  ];

  const additionalQuestions = [
    {
      question: "How can I create an account on Step for Sale?",
      answer:
        "Creating an account is simple. Just visit our website and click on the 'Sign Up' button.",
    },
    {
      question: "Is Step for Sale secure?",
      answer:
        "Yes, we prioritize the security of your data with advanced encryption techniques.",
    },
    {
      question: "Can I track my orders on Step for Sale?",
      answer:
        "Absolutely! Log in to your account to view and track your orders seamlessly.",
    },
  ];

  const toggleQuestion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="px-6 md:px-12 lg:px-20 py-12">
      <h1 className="text-center text-2xl md:text-3xl font-bold mb-6">
        Frequently Asked Questions
      </h1>
      <div className="space-y-4">
        {initialQuestions.map((item, index) => (
          <div key={index} className="border-b border-gray-300 pb-2">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleQuestion(index)}
            >
              <h2 className="text-lg font-semibold">{item.question}</h2>
              <span className="text-xl font-bold">
                {activeIndex === index ? "×" : "+"}
              </span>
            </div>
            {activeIndex === index && (
              <div className="mt-2 text-gray-600">
                <p>{item.answer}</p>
              </div>
            )}
          </div>
        ))}

        {showMore &&
          additionalQuestions.map((item, index) => (
            <div
              key={initialQuestions.length + index}
              className="border-b border-gray-300 pb-2"
            >
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() =>
                  toggleQuestion(initialQuestions.length + index)
                }
              >
                <h2 className="text-lg font-semibold">{item.question}</h2>
                <span className="text-xl font-bold">
                  {activeIndex === initialQuestions.length + index ? "×" : "+"}
                </span>
              </div>
              {activeIndex === initialQuestions.length + index && (
                <div className="mt-2 text-gray-600">
                  <p>{item.answer}</p>
                </div>
              )}
            </div>
          ))}
      </div>
      <div className="text-center mt-6">
        {showMore ? (
          <button
            className="text-blue-600 underline"
            onClick={() => setShowMore(false)}
          >
            Hide
          </button>
        ) : (
          <button
            className="text-blue-600 underline"
            onClick={() => setShowMore(true)}
          >
            See More
          </button>
        )}
      </div>
    </div>
  );
};

export default FAQ;
