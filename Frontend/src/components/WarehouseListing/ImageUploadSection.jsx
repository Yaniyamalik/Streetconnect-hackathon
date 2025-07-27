import React from 'react';

const ImageUploadSection = ({ onImageUpload }) => {
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    onImageUpload(files);
  };

  return (
    <div className="space-y-4 mb-6 p-6 bg-[#f9f9f9] rounded-xl shadow-sm">
      <h3 className="text-xl font-semibold text-[#2a9d8f]">Upload Images</h3>
      <label className="block">
        <span className="text-sm text-gray-600">Select one or more images of your warehouse:</span>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
          className="mt-2 block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#2a9d8f] file:text-white hover:file:bg-[#23867c] cursor-pointer"
        />
      </label>
    </div>
  );
};

export default ImageUploadSection;
