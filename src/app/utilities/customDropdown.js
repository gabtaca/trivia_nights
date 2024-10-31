import React, { useState, useEffect, useRef } from "react";

// Composant de base pour les menus déroulants personnalisés
function CustomDropdown({ label, selectedValue, setSelectedValue, options }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (value) => {
    setSelectedValue(value);
    setIsOpen(false);
  };

  // Gère le clic à l'extérieur
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
      {/* Bouton pour ouvrir le menu déroulant */}
      <div
        onClick={toggleDropdown}
        className="font-montserrat font-bold text-white text-center border-[3.2px] rounded-[17px] border-[#FF38D3] bg-[#430086] px-[20px] py-[15px] cursor-pointer flex justify-between items-center"
        style={{
          backgroundImage: "url('./arrow_down.svg')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 1rem center",
        }}
      >
        {options.find((opt) => opt.value === selectedValue)?.label || label}
      </div>

      {/* Overlay div */}
      {isOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center z-30"
          onClick={() => setIsOpen(false)} // Ferme le menu si on clique sur l'overlay
        >
          <div className="absolute bg-[#430086] border-[#FF38D3] border-[3.2px] mt-2 rounded-[17px] shadow-lg z-40">
            {options.map((opt) => (
              <div
                key={opt.value}
                onClick={() => handleSelect(opt.value)}
                className="text-white text-center py-2 px-4 cursor-pointer hover:bg-[#5a0da6] rounded-[12px]"
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

// Composants spécifiques pour chaque menu déroulant

export function QuestionAmountDropdown({ selectedAmount, setSelectedAmount, amounts }) {
  return (
    <CustomDropdown
      label="Nombre de questions"
      selectedValue={selectedAmount}
      setSelectedValue={setSelectedAmount}
      options={amounts}
    />
  );
}

export function CategoryDropdown({ selectedCategory, setSelectedCategory, categories }) {
  return (
    <CustomDropdown
      label="Catégorie"
      selectedValue={selectedCategory}
      setSelectedValue={setSelectedCategory}
      options={categories}
    />
  );
}

export function DifficultyDropdown({ selectedDifficulty, setSelectedDifficulty, difficulties }) {
  return (
    <CustomDropdown
      label="Difficulté"
      selectedValue={selectedDifficulty}
      setSelectedValue={setSelectedDifficulty}
      options={difficulties}
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
    />
  );
}
