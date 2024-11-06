import React, { useState, useEffect, useRef } from "react";
import arrowDownIcon from '/public/arrow_down.svg'; // Import the image

function CustomDropdown({
  label,
  selectedValue,
  setSelectedValue,
  options,
  buttonStyle = {},
  dropdownStyle = {},
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (value) => {
    setSelectedValue(value);
    setIsOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div ref={dropdownRef} className="relative inline-block w-[300px]">
      {/* Button with imported image */}
      <div
        onClick={toggleDropdown}
        className="font-montserrat font-bold text-center px-[20px] py-[15px] cursor-pointer flex justify-between items-center"
        style={{
          ...buttonStyle,
          backgroundImage: `url(${arrowDownIcon.src})`, // Use the imported image
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 1rem center",
        }}
      >
        {options.find((opt) => opt.value === selectedValue)?.label || label}
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center z-30"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="absolute mt-2 rounded-[17px] shadow-lg z-40 overflow-y-auto"
            style={dropdownStyle}
          >
            {options.map((opt, index) => (
              <div
                key={opt.value}
                onClick={index === 0 ? null : () => handleSelect(opt.value)}
                className={`text-white text-center py-2 px-4 cursor-pointer hover:bg-[#5a0da6] rounded-[12px] ${
                  index === 0 ? "cursor-not-allowed text-gray-400" : ""
                }`}
                style={{
                  pointerEvents: index === 0 ? "none" : "auto",
                }}
              >
                {opt.label}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Composants spécifiques pour chaque menu déroulant avec styles uniques
export function QuestionAmountDropdown({
  selectedAmount,
  setSelectedAmount,
  amounts,
}) {
  return (
    <CustomDropdown
      label="Nombre de questions"
      selectedValue={selectedAmount}
      setSelectedValue={setSelectedAmount}
      options={amounts}
      buttonStyle={{
        backgroundColor: "#430086",
        border: "3.2px solid #FF38D3",
        color: "#FFFFFF",
        borderRadius: "20px",
      }}
      dropdownStyle={{
        backgroundColor: "#222222",
        border: "2px solid #FF38D4",
      }}
    />
  );
}

export function CategoryDropdown({
  selectedCategory,
  setSelectedCategory,
  categories,
}) {
  return (
    <CustomDropdown
      label="Catégorie"
      selectedValue={selectedCategory}
      setSelectedValue={setSelectedCategory}
      options={categories}
      buttonStyle={{
        backgroundColor: "#430086",
        border: "3.2px solid #FF38D3",
        color: "#FFFFFF",
        borderRadius: "20px",
      }}
      dropdownStyle={{
        backgroundColor: "#222222",
        border: "2px solid #FF38D4",
        borderRadius: "12px",
        height: "50%", 
        overflowY: "auto", 
      }}
    />
  );
}

export function DifficultyDropdown({
  selectedDifficulty,
  setSelectedDifficulty,
  difficulties,
}) {
  return (
    <CustomDropdown
      label="Difficulté"
      selectedValue={selectedDifficulty}
      setSelectedValue={setSelectedDifficulty}
      options={difficulties}
      buttonStyle={{
        backgroundColor: "#430086",
        border: "3.2px solid #FF38D3",
        color: "#FFFFFF",
        borderRadius: "20px",
      }}
      dropdownStyle={{
        backgroundColor: "#222222",
        border: "2px solid #FF38D4",
      }}
    />
  );
}

export function TypeDropdown({ selectedType, setSelectedType, types }) {
  return (
    <CustomDropdown
      label="Type"
      selectedValue={selectedType}
      setSelectedValue={setSelectedType}
      options={types}
      buttonStyle={{
        backgroundColor: "#430086",
        border: "3.2px solid #FF38D3",
        color: "#FFFFFF",
        borderRadius: "20px",
      }}
      dropdownStyle={{
        backgroundColor: "#222222",
        border: "2px solid #FF38D4",
      }}
    />
  );
}
