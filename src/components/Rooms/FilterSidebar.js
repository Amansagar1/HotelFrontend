import React, { useState } from "react";

const FilterSidebar = ({ filters, toggleFilter }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Filter Icon for mobile */}
      <button
        onClick={toggleDrawer}
        className="fixed bottom-4 right-4 z-50 bg-blue-500 text-white rounded-full p-4 shadow-lg sm:hidden"
      >
        <span className="material-icons">filter_list</span>
      </button>

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-screen w-3/4 max-w-sm bg-gray-100 z-40 transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out shadow-lg sm:relative sm:translate-x-0 sm:w-full sm:max-w-none`}
      >
        <div className="p-4 w-64">
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
                      <span className="capitalize">
                        {filter.replace(/([A-Z])/g, " $1").toLowerCase()}
                      </span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Close button */}
        <button
          onClick={toggleDrawer}
          className="absolute top-4 right-4 text-gray-600 text-2xl sm:hidden"
        >
          ×
        </button>
      </div>
    </>
  );
};

export default FilterSidebar;