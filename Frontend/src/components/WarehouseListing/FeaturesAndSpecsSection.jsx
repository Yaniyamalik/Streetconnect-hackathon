import React from 'react';

const featuresList = [
  "Cold Storage", "24/7 Access", "Security System", "Loading Dock", "Climate Control"
];

const FeaturesAndSpecsSection = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;

    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        features: checked
          ? [...prev.features, name]
          : prev.features.filter(f => f !== name)
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  return (
    <div className="space-y-4 mb-6">
      <h3 className="text-xl font-semibold text-primary">Features & Specifications</h3>

      <div className="flex flex-wrap gap-3">
        {featuresList.map((feature, idx) => (
          <label key={idx} className="inline-flex items-center">
            <input
              type="checkbox"
              name={feature}
              checked={formData.features.includes(feature)}
              onChange={handleChange}
              className="accent-primary rounded"
            />
            <span className="ml-2 text-sm text-gray-700">{feature}</span>
          </label>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <input
          name="width"
          type="number"
          placeholder="Width (ft)"
          value={formData.width}
          onChange={handleChange}
          className="p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <input
          name="depth"
          type="number"
          placeholder="Depth (ft)"
          value={formData.depth}
          onChange={handleChange}
          className="p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <input
          name="height"
          type="number"
          placeholder="Height (ft)"
          value={formData.height}
          onChange={handleChange}
          className="p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <input
        name="capacity"
        type="number"
        placeholder="Capacity (cubic ft)"
        value={formData.capacity}
        onChange={handleChange}
        className="p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary w-full"
      />
      <input
        name="maxWeight"
        type="number"
        placeholder="Max Weight (kg)"
        value={formData.maxWeight}
        onChange={handleChange}
        className="p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary w-full"
      />
    </div>
  );
};

export default FeaturesAndSpecsSection;
