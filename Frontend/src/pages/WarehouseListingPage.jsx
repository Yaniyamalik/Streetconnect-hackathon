import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const WarehouseListingPage = () => {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    contact: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    features: {
      coldStorage: false,
      security: false,
      access247: false,
      loadingArea: false,
    },
    size: '',
    volume: '',
    weightCapacity: '',
    capsules: '',
    rent: '',
    pricePerDay: '',
    availability: 'available',
    accessSchedule: '24/7',
    images: [],
    notes: '',
    agreeToTerms: false,
  });

  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name in formData.features) {
      setFormData({
        ...formData,
        features: {
          ...formData.features,
          [name]: checked,
        },
      });
    } else if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleImageUpload = (e) => {
    setFormData({ ...formData, images: [...e.target.files] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.agreeToTerms) {
      alert('Please agree to the terms and conditions.');
      return;
    }
    setShowConfirmation(true);
    console.log('Submitted Data:', formData);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center text-[#e8630a] mb-8">List Your Warehouse</h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Warehouse Details */}
        <section className="bg-white p-6 rounded-2xl shadow-sm space-y-4">
          <h2 className="text-xl font-semibold text-[#e8630a]">Warehouse Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input type="text" name="name" placeholder="Warehouse Name" value={formData.name} onChange={handleChange} className="form-input" required />
            <input type="text" name="contact" placeholder="Owner / Contact Info" value={formData.contact} onChange={handleChange} className="form-input" required />
            <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} className="form-input" required />
            <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} className="form-input" required />
            <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleChange} className="form-input" required />
            <input type="text" name="pincode" placeholder="Pincode" value={formData.pincode} onChange={handleChange} className="form-input" required />
          </div>
          <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="form-input" rows="3" />
        </section>

        {/* Features & Specifications */}
        <section className="bg-white p-6 rounded-2xl shadow-sm space-y-4">
          <h2 className="text-xl font-semibold text-[#e8630a]">Features & Specifications</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {Object.entries(formData.features).map(([feature, isEnabled]) => (
              <label key={feature} className="flex items-center gap-2 text-gray-700 text-sm">
                <input type="checkbox" name={feature} checked={isEnabled} onChange={handleChange} className="accent-[#e8630a]" />
                {feature.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
              </label>
            ))}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <input type="text" name="size" placeholder="Size (WxDxH)" value={formData.size} onChange={handleChange} className="form-input" />
            <input type="text" name="volume" placeholder="Volume (m³)" value={formData.volume} onChange={handleChange} className="form-input" />
            <input type="text" name="weightCapacity" placeholder="Max Weight Capacity" value={formData.weightCapacity} onChange={handleChange} className="form-input" />
            <input type="text" name="capsules" placeholder="Capsules/Sections" value={formData.capsules} onChange={handleChange} className="form-input" />
          </div>
        </section>

        {/* Pricing & Availability */}
        <section className="bg-white p-6 rounded-2xl shadow-sm space-y-4">
          <h2 className="text-xl font-semibold text-[#e8630a]">Pricing & Availability</h2>
          <div className="grid grid-cols-2 gap-4">
            <input type="number" name="rent" placeholder="Monthly Rent (₹)" value={formData.rent} onChange={handleChange} className="form-input" />
            <input type="number" name="pricePerDay" placeholder="Price Per Day (₹)" value={formData.pricePerDay} onChange={handleChange} className="form-input" />
            <select name="availability" value={formData.availability} onChange={handleChange} className="form-input">
              <option value="available">Available</option>
              <option value="limited">Limited</option>
              <option value="waitlist">Waitlist</option>
            </select>
            <select name="accessSchedule" value={formData.accessSchedule} onChange={handleChange} className="form-input">
              <option value="24/7">24/7</option>
              <option value="Business Hours">Business Hours</option>
              <option value="Custom">Custom</option>
            </select>
          </div>
        </section>

        {/* Image Upload */}
        <section className="bg-white p-6 rounded-2xl shadow-sm">
          <h2 className="text-xl font-semibold text-[#e8630a] mb-4">Upload Images</h2>
          <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="form-input" />
          <div className="flex flex-wrap gap-4 mt-4">
            {formData.images.length > 0 &&
              [...formData.images].map((img, index) => (
                <img key={index} src={URL.createObjectURL(img)} alt="preview" className="w-24 h-24 object-cover rounded-lg shadow" />
              ))}
          </div>
        </section>

        {/* Terms & Submit */}
        <section className="bg-white p-6 rounded-2xl shadow-sm">
          <h2 className="text-xl font-semibold text-[#e8630a] mb-4">Additional Info & Submit</h2>
          <textarea name="notes" placeholder="Any special notes..." value={formData.notes} onChange={handleChange} className="form-input mb-4" rows="3" />
          <label className="flex items-start gap-2 mb-4">
            <input type="checkbox" name="agreeToTerms" checked={formData.agreeToTerms} onChange={handleChange} className="accent-[#e8630a] mt-1" />
            <span className="text-sm text-gray-600">
              I agree to the{' '}
              <a href="#" className="text-[#e8630a] underline hover:text-[#cc560a] transition-colors">Terms of Service</a>{' '}
              and{' '}
              <a href="#" className="text-[#e8630a] underline hover:text-[#cc560a] transition-colors">Privacy Policy</a>.
            </span>
          </label>
          <button type="submit" className={`w-full py-3 rounded-xl font-semibold transition-all ${
            formData.agreeToTerms
              ? 'bg-[#e8630a] text-white hover:bg-[#d65f0c]'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}>
            Submit Warehouse
          </button>
        </section>
      </form>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg text-center max-w-md w-full">
            <h3 className="text-2xl font-bold mb-2 text-[#e8630a]">Warehouse Listed Successfully!</h3>
            <p className="mb-4 text-gray-600">Thank you for sharing your warehouse.</p>
            <div className="flex justify-center gap-4">
           <button
  onClick={() => {
    setShowConfirmation(false);
    navigate('/warehouse-locator'); // ✅ Navigate to marketplace
  }}
  className="bg-[#e8630a] text-white px-4 py-2 rounded-lg hover:bg-[#d65f0c]"
>
  View Listings
</button>


              <button onClick={() => window.location.reload()} className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300">
                Add Another
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WarehouseListingPage;
