import React from 'react';

const WarehouseDetailsSection = ({ formData, setFormData }) => {
  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold text-primary mb-4">Warehouse Details</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <input
          type="text"
          placeholder="Warehouse Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
        />

        <input
          type="text"
          placeholder="Location"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          className="p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
        />

        <input
          type="text"
          placeholder="Owner Name"
          value={formData.owner}
          onChange={(e) => setFormData({ ...formData, owner: e.target.value })}
          className="p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
        />

        <input
          type="text"
          placeholder="Contact Number"
          value={formData.contact}
          onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
          className="p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
    </div>
  );
};

export default WarehouseDetailsSection;
