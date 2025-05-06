import React, { useState } from 'react';

const DosageCalculation = () => {
  const [weight, setWeight] = useState('');
  const [dosage, setDosage] = useState('');
  const [calculatedDosage, setCalculatedDosage] = useState(null);

  const calculateDosage = () => {
    // Example calculation: Dosage = Weight * 0.5 (This is just an example formula)
    if (weight) {
      const result = parseFloat(weight) * 0.5;
      setCalculatedDosage(result);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Dosage Calculation</h2>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="weight" className="block text-gray-700">Patient Weight (kg):</label>
          <input
            id="weight"
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-200"
            placeholder="Enter patient's weight"
          />
        </div>
        
        <button
          onClick={calculateDosage}
          className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Calculate Dosage
        </button>
        
        {calculatedDosage !== null && (
          <div className="mt-4 p-4 bg-green-100 rounded-lg">
            <h3 className="text-xl font-semibold">Calculated Dosage:</h3>
            <p className="text-lg">{calculatedDosage} mg</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DosageCalculation;
