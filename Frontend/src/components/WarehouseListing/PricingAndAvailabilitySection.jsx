import React from 'react';

const PricingAndAvailabilitySection = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const inputStyles =
    'w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e8630a] shadow-sm transition';

  const labelStyles = 'text-sm font-medium text-gray-700';

  return (
    <div className="space-y-5 mb-10">
      <h3 className="text-2xl font-semibold text-[#e8630a] mb-2">
        Pricing & Availability
      </h3>

      <div className="space-y-2">
        <label htmlFor="monthlyRent" className={labelStyles}>
          Monthly Rent (₹)
        </label>
        <input
          type="number"
          name="monthlyRent"
          id="monthlyRent"
          placeholder="e.g. 15000"
          value={formData.monthlyRent}
          onChange={handleChange}
          className={inputStyles}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="pricePerDay" className={labelStyles}>
          Price Per Day (₹)
        </label>
        <input
          type="number"
          name="pricePerDay"
          id="pricePerDay"
          placeholder="e.g. 500"
          value={formData.pricePerDay}
          onChange={handleChange}
          className={inputStyles}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="availability" className={labelStyles}>
          Availability
        </label>
        <select
          name="availability"
          id="availability"
          value={formData.availability}
          onChange={handleChange}
          className={inputStyles}
        >
          <option value="">-- Select Availability --</option>
          <option value="available">Available</option>
          <option value="limited">Limited</option>
          <option value="waitlist">Waitlist Only</option>
        </select>
      </div>

      <div className="space-y-2">
        <label htmlFor="accessSchedule" className={labelStyles}>
          Access Schedule
        </label>
        <select
          name="accessSchedule"
          id="accessSchedule"
          value={formData.accessSchedule}
          onChange={handleChange}
          className={inputStyles}
        >
          <option value="24-7">24/7 Access</option>
          <option value="business-hours">Business Hours</option>
          <option value="custom">Custom Schedule</option>
        </select>
      </div>
    </div>
  );
};

export default PricingAndAvailabilitySection;
