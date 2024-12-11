import React from "react";

// Utility function to format amenities and other labels
const formatLabel = (text) => {
  return text
    .replace(/([A-Z])/g, " $1") // Adds space before uppercase letters
    .replace(/^./, (str) => str.toUpperCase()); // Capitalizes the first letter
};

const FilterSidebar = ({ filters, toggleFilter }) => {
  return (
    <div className="bg-gray-100 p-4 rounded-md">
      <h3 className="text-xl font-semibold mb-4">Filters</h3>

      {/* Size Filter */}
      <div className="mb-4">
        <h4 className="font-medium">Room Size</h4>
        {["small", "medium", "large"].map((size) => (
          <label key={size} className="block">
            <input
              type="checkbox"
              checked={filters.size[size]}
              onChange={() => toggleFilter("size", size)}
              className="mr-2"
            />
            {formatLabel(size)} {/* Format label to be more readable */}
          </label>
        ))}
      </div>

      {/* Occupancy Filter */}
      <div className="mb-4">
        <h4 className="font-medium">Occupancy</h4>
        {["single", "double", "family"].map((type) => (
          <label key={type} className="block">
            <input
              type="checkbox"
              checked={filters.occupancy[type]}
              onChange={() => toggleFilter("occupancy", type)}
              className="mr-2"
            />
            {formatLabel(type)} {/* Format label to be more readable */}
          </label>
        ))}
      </div>

      {/* Amenities Filter */}
      <div>
        <h4 className="font-medium">Amenities</h4>
        {Object.keys(filters.amenities).map((amenity) => (
          <label key={amenity} className="block">
            <input
              type="checkbox"
              checked={filters.amenities[amenity]}
              onChange={() => toggleFilter("amenities", amenity)}
              className="mr-2"
            />
            {formatLabel(amenity)} {/* Format label to be more readable */}
          </label>
        ))}
      </div>
    </div>
  );
};

export default FilterSidebar;
