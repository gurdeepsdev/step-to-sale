import { useState } from "react";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [showMore, setShowMore] = useState(false);

  const initialQuestions = [
    {
      question: "What is Step to Sale?",
      answer:
        "Step to Sale is a way of simplifying finding you great deals, discounts and Cashbacks. We have various special offers, cashbacks, and discounts to help you save on everything from the newest fashion and electronics to the daily needs that you face every day. We aim to make available to you the great deals to bring maximum value for the money spent.",
    },
    {
      question: "What types of offers can I find on Step to Sale?",
      answer:
        "Step to Sale gives the latest deals on all items from all departments such as e-commerce, finance, food delivery, cosmetics, travel, health and wellness or subscription services with the best savings for anything you buy.",
    },
    {
      question: "How do I claim the offers listed on Step to Sale?",
      answer:
        "It's really very easy to claim offers on Step to Sale! All you need to do is first sign up on our website and create your account. Once everything is set up, you may view the available offers and select one that will best suit your needs. All you need to do is click on the offer to make sure everything tracks properly, then buy using the link we provided.The cashback or rewards related to that offer will be credited to your Step to Sale account once you have finished purchasing, and you can then simply transfer the cashback amount to your bank or preferred method of payment once it shows in your account. Enjoy saving the easy way!",
    },
  ];

  const additionalQuestions = [
    {
      question: "Are the offers available for online purchases only?",
      answer:
        "Yes the offers on Step to Sale are only online. That means you get to enjoy the best sales, cashbacks, and discounts on a variety of products and services-all from the comfort of your home. We have everything you need here-from travel deals, fashionable clothing, to everyday needs!",
    },
    {
      question: "Are there any additional fees to use Step to Sale?",
      answer:
        "It is absolutely free to use Step to Sale, no hidden fees or even any subscription to use our offers.",
    },
    {
      question: "How often are new deals updated on the website?",
      answer:
        "We ensure you will never miss any of the good deals by changing the offers on the platform frequently for giving you a fresh deal and saving money opportunities.",
    },
    {
      question:"What should I do if an offer doesn't work?",
      answer:"We shall respond promptly and are more than willing to be contacted through either e-mail or by filling the form provided if any issue comes along with you regarding redemption."

    }
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
          <div key={index} className="border-b border-gray-700 pb-2">
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
              <div className="mt-2 text-gray-600 px-0 md:px-4 lg:px-4">
                <p>{item.answer}</p>
              </div>
            )}
          </div>
        ))}

        {showMore &&
          additionalQuestions.map((item, index) => (
            <div
              key={initialQuestions.length + index}
              className="border-b border-gray-700 pb-2"
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
                <div className="mt-2 text-gray-600 ">
                  <p>{item.answer}</p>
                </div>
              )}
            </div>
          ))}
      </div>
      <div className="text-center mt-6">
        {showMore ? (
          <button
            className="text-black underline"
            onClick={() => setShowMore(false)}
          >
            Hide
          </button>
        ) : (
          <button
            className="text-black underline"
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
