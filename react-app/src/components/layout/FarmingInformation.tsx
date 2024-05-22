import React from "react";

const FarmingInformation: React.FC = () => {
  return (
    <div className="container mx-auto py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Tips for Beginner Farmers
        </h1>
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4">
            1. Start with easy-to-grow vegetables
          </h2>
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2">
              <p className="text-lg mb-4">
                {" "}
                As a beginner farmer, it is recommended to start with easy to
                grow vegetables including tomatoes and lettuce. These vegetables
                are ideal for beginners and require minimal maintenance. They
                grow quickly and are rewarding to cultivate.
              </p>
              <p className="text-lg">
                Tomatoes are rich in flavor and versatile in recipes and lettuce
                provides crispness to salads.
              </p>
            </div>
            <div className="md:w-1/2 md:pl-8">
              <img
                src="https://images.unsplash.com/photo-1607305387299-a3d9611cd469?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Tomatoes, lettuce, and peppers"
                className="w-full rounded-lg shadow-md"
              />
            </div>
          </div>
        </div>
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4">
            2. Ensure your soil is well-drained and rich in nutrients
          </h2>
          <div className="flex flex-col md:flex-row-reverse items-center">
            <div className="md:w-1/2 md:mr-4">
              <p className="text-lg mb-4">
                Healthy soil is the foundation of a successful garden. Ensure
                your soil has good drainage to prevent waterlogging, and enrich
                it with compost and organic matter to provide essential
                nutrients to your plants.
              </p>
            </div>
            <div className="md:w-1/2 md:pr-8">
              <img
                src="https://plus.unsplash.com/premium_photo-1678548904724-8a7d6ef79eb7?q=80&w=3542&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Well-drained soil"
                className="w-full rounded-lg shadow-md"
              />
            </div>
          </div>
        </div>
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4">
            3. Water your plants regularly, but avoid overwatering
          </h2>
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2">
              <p className="text-lg mb-4">
                Proper watering is essential for plant health. Water your plants
                deeply and evenly, ensuring that the soil is moist but not
                waterlogged. Ensure you monitor soil moisture levels regularly
                and adjust your watering schedule as needed to prevent both
                under- and overwatering.
              </p>
            </div>
            <div className="md:w-1/2 md:pl-8">
              <img
                src="https://images.unsplash.com/photo-1599277100479-3252d492a19a?q=80&w=3424&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Watering plants"
                className="w-full rounded-lg shadow-md"
              />
            </div>
          </div>
        </div>
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4">
            4. Consider using organic fertilizers
          </h2>
          <div className="flex flex-col md:flex-row-reverse items-center">
            <div className="md:w-1/2">
              <p className="text-lg mb-4">
                Organic fertilizers provide essential nutrients to your plants
                while improving soil health and fertility to promote plant
                growth. Organic fertilizers for your garden come in different
                types. Compost, made from food scraps and yard waste, is great
                for adding nutrients to the soil. Manure from animals like cows
                or chickens is another option, providing essential nutrients
                like nitrogen. These natural fertilizers are derived from
                natural sources and are environmentally friendly, making them a
                sustainable choice for gardeners.
              </p>
            </div>
            <div className="md:w-1/2 md:pr-8">
              <img
                src="https://images.unsplash.com/photo-1516711345667-ebafb3ebea12?q=80&w=3544&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Organic fertilizers"
                className="w-full rounded-lg shadow-md"
              />
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-3xl font-bold mb-4">
            5. Monitor for pests and diseases
          </h2>
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2">
              <p className="text-lg mb-4">
                Regular inspection of your plants allows you to identify and
                address pest infestations and diseases early on. Practice
                integrated pest management (IPM) techniques, such as handpicking
                pests, using insecticidal soaps, and rotating crops, to manage
                pests and diseases effectively.
              </p>
            </div>
            <div className="md:w-1/2 md:pl-8">
              <img
                src="https://plus.unsplash.com/premium_photo-1680344513218-507f51918944?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Pests and diseases"
                className="w-full rounded-lg shadow-md"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmingInformation;
