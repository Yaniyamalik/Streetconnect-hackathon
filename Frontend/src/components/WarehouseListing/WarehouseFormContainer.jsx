import React from 'react';

const WarehouseFormContainer = ({ children }) => {
  return (
    <div className="max-w-5xl mx-auto p-8 bg-white rounded-2xl shadow-md mt-10">
      <h2 className="text-3xl font-bold text-primary mb-2">
        List Your Warehouse
      </h2>
      <p className="text-md text-gray-600 mb-6">
        Fill out the form to showcase your warehouse to verified vendors & businesses.
      </p>
      {children}
    </div>
  );
};

export default WarehouseFormContainer;
