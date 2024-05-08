import React from "react";
import ServiceCard from "./ServiceCard";
import Special from "./Special";

const Home: React.FC = () => {
  // Example data for SOIL's services
  const services = [
    {
      title: "Premium Organic Foods",
      description:
        "Explore our wide range of premium, organic fresh foods sourced directly from local farms.",
    },
    {
      title: "Diet & Nutrition Seminars",
      description:
        "Join our face-to-face seminars to learn more about maintaining a healthy diet and the benefits of organic food.",
    },
    {
      title: "Small-Scale Organic Farming",
      description:
        "Learn how to start your own organic garden with our small-scale farming workshops.",
    },
    // Add more services as needed
  ];

  return (
    <main className="container mx-auto p-4 space-y-4">
      <h2 className="text-2xl font-semibold mb-4">
        Welcome to SOIL Organic Foods
      </h2>
      <p>
        SOIL is a long-term organic food grocer with several store locations
        around Melbourne. We focus on bringing premium organic fresh food to the
        community. In addition to being food grocers, we also offer face-to-face
        seminars on diet, nutrition, and small-scale organic farming. Discover
        the best organic foods and learn how to maintain a healthy diet with our
        seminars and workshops.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((service, index) => (
          <ServiceCard
            key={index}
            title={service.title}
            description={service.description}
          />
        ))}
      </div>

      {/* Specials Banner */}
      <section className="my-8">
        <h3 className="text-lg md:text-xl font-semibold text-center mb-2">
          This Week's Specials
        </h3>
        <p className="text-sm md:text-base text-gray-600 text-center mb-6">
          Check out the best deals on our premium organic products!
        </p>
        <Special />
      </section>
    </main>
  );
};

export default Home;
