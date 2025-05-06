import React, { useState } from 'react';

const HealthChecklist = () => {
  const [isChildChecked, setIsChildChecked] = useState(false);
  const [isAdultChecked, setIsAdultChecked] = useState(false);

  const handleChildChange = () => setIsChildChecked(!isChildChecked);
  const handleAdultChange = () => setIsAdultChecked(!isAdultChecked);

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Health Assessment Checklist</h2>

      <div className="space-y-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="child"
            checked={isChildChecked}
            onChange={handleChildChange}
            className="mr-3"
          />
          <label htmlFor="child" className="text-lg">Child Health Assessment</label>
        </div>
        {isChildChecked && (
          <div className="ml-6">
            <ul className="list-disc">
              <li>Check Vaccination Status</li>
              <li>Growth and Development Milestones</li>
              <li>Nutrition and Feeding</li>
              <li>Physical Exam (Height, Weight, etc.)</li>
            </ul>
          </div>
        )}

        <div className="flex items-center mt-4">
          <input
            type="checkbox"
            id="adult"
            checked={isAdultChecked}
            onChange={handleAdultChange}
            className="mr-3"
          />
          <label htmlFor="adult" className="text-lg">Adult Health Assessment</label>
        </div>
        {isAdultChecked && (
          <div className="ml-6">
            <ul className="list-disc">
              <li>Blood Pressure Check</li>
              <li>Weight and BMI</li>
              <li>Chronic Disease Screening</li>
              <li>General Physical Examination</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default HealthChecklist;
