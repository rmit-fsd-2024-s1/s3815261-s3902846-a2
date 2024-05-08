import React from "react";

interface ServiceCardProps {
  title: string;
  description: string;
  // You can extend this interface with more props, such as an image URL
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white p-4 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-2xl">
      <h3 className="font-bold text-xl mb-2">{title}</h3>
      <p className="text-gray-700 text-base">{description}</p>
    </div>
  );
};

export default ServiceCard;
