import React, { useState, useEffect, useRef } from "react";

const HighScoreModal = ({ onClose }) => {
  const [showCustom, setShowCustom] = useState(true);
  const [customMatchScores, setCustomMatchScores] = useState([]);
  const [quickMatchScores, setQuickMatchScores] = useState([]);
  const modalRef = useRef(null); 

  // Charger les scores du localStorage
  useEffect(() => {
    const customScores = JSON.parse(localStorage.getItem("customMatch")) || [];
    const quickScores = JSON.parse(localStorage.getItem("quickMatch")) || [];

    setCustomMatchScores(customScores);
    setQuickMatchScores(quickScores);
  }, []);

  const toggleScoreView = () => setShowCustom(!showCustom);

  // Fermer la modal si on clique en dehors
  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div
        ref={modalRef}
        className="bg-[#2B0C39] border-[#FEFFB2] border-[2px] rounded-xl p-5 w-[300px]"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-[#FEFFB2] text-lg font-bold">
            {showCustom ? "PARTIES PERSONNALISÉES" : "PARTIES RAPIDE"}
          </h2>
          <button
            onClick={toggleScoreView}
            className="bg-[#FEFFB2] text-black font-bold py-1 px-3 rounded-lg"
          >
            MODE
          </button>
        </div>

        <div className="flex">
          <div className="w-full text-[#FEFFB2]">
            <ul>
              {(showCustom ? customMatchScores : quickMatchScores).map(
                (score, index) => (
                  <li key={index} className="flex justify-between py-1">
                    <span>{index + 1}:</span>
                    <span>{score.name}</span>
                    <span>{score.score}</span>
                    <span>{score.date}</span>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        <button
          onClick={onClose}
          className="mt-4 bg-black text-[#FEFFB2] font-bold py-2 px-4 rounded-lg border-[1.5px] border-[#FEFFB2]"
        >
          Fermer
        </button>
      </div>
    </div>
  );
};

export default HighScoreModal;
