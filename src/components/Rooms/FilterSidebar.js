import React from "react";

const FilterSidebar = ({ filters, toggleFilter }) => (
  <aside className="p-4 bg-gray-100 w-full  h-screen">
    <h2 className="text-2xl font-semibold mb-4">Filter by</h2>
    {Object.keys(filters).map((category) => (
      <div key={category} className="mb-6">
        <h3 className="font-semibold text-lg capitalize">{category}</h3>
        <ul className="space-y-2 mt-2">
          {Object.keys(filters[category]).map((filter) => (
            <li key={filter}>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={filters[category][filter]}
                  onChange={() => toggleFilter(category, filter)}
                  className="form-checkbox"
                />
                <span className="capitalize">{filter.replace(/([A-Z])/g, " $1").toLowerCase()}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>
    ))}
  </aside>
);

export default FilterSidebar;
