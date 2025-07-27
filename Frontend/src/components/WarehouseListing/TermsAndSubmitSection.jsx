import React from 'react';

const TermsAndSubmitSection = ({ onSubmit, agreed, setAgreed }) => {
  return (
    <div className="space-y-4 mt-6 bg-[#f9f9f9] p-6 rounded-xl shadow-sm">
      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className="accent-[#e8630a] mt-1 w-4 h-4"
        />
        <span className="text-sm text-gray-600 leading-relaxed">
          I agree to the{' '}
          <a href="#" className="text-[#e8630a] underline hover:text-[#cc560a] transition-colors">Terms of Service</a>{' '}
          and{' '}
          <a href="#" className="text-[#e8630a] underline hover:text-[#cc560a] transition-colors">Privacy Policy</a>.
        </span>
      </label>

      <button
        onClick={onSubmit}
        disabled={!agreed}
        className={`w-full py-3 text-center rounded-xl font-semibold transition-all duration-300 ${
          agreed
            ? 'bg-[#e8630a] text-white hover:bg-[#d65f0c]'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
      >
        Submit Warehouse
      </button>
    </div>
  );
};

export default TermsAndSubmitSection;
