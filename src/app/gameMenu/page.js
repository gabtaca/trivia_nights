"use client";

import { useRouter } from 'next/navigation'; // Import useRouter

export default function GameMenu() {
  const router = useRouter(); // Define router within GameMenu

  const quickMatch = () => {
    router.push("/quickMatch"); // Redirects to /quickMatch
  };

  return (
    <div className="z-0 bg-brick-background bg-repeat bg-contain bg-[#31325D] w-full h-[100vh]">
      <div className="bg_gradient-top z-0 absolute top-0 w-full h-[20%] bg-gradient-to-b from-slate-900 to-transparent"></div>
      <div className="bg_gradient-bot z-0 absolute bottom-0 w-full h-[20%] bg-gradient-to-t from-slate-900 to-transparent"></div>
      <main className="flex flex-col justify-center items-center w-full h-full">
        <div className="main_modal-gameMenu z-10 flex flex-col gap-10 justify-evenly items-center w-[90%] h-[90%]">
          <div className="logo">
            <div className="ctrl_logo_h1 flex blur-[1px]">
              <h1 className="font-tiltNeon text-[80px] text-shadow-neon-pink text-stroke-pink text-pink-100">
                TRIVIA
              </h1>
              <h1 className="font-tiltNeon text-[80px] absolute text-pink-100">
                TRIVIA
              </h1>
            </div>
            <div className="ctrl_logo_h2 flex blur-[1px] m-[-35px] pr-2 justify-end">
              <h2 className="font-girlNextDoor font-thin text-[50px] text-shadow-neon-purple text-stroke-purple text-pink-100">
                NIGHTS
              </h2>
              <h2 className="font-girlNextDoor font-thin text-[50px] absolute text-pink-100">
                NIGHTS
              </h2>
            </div>
          </div>

          <nav className="flex flex-col items-center gap-10">
            <button
              onClick={quickMatch}
              id="btn_quickMatch"
              className="font-montserrat font-bold text-white text-[12px] text-center border-[3.2px] rounded-[17px] border-[#FF38D3] bg-[#430086] w-[200px] px-[20px] py-[12px] items-center"
            >
              QUICK MATCH
            </button>
            <button
              id="btn_cstmMatch"
              className="font-montserrat font-bold text-white text-[12px] text-center border-[3.2px] rounded-[17px] border-[#FF38D3] bg-[#430086] w-[200px] px-[20px] py-[12px] items-center"
            >
              CUSTOM MATCH
            </button>
          </nav>

          <button
            id="btn_scores"
            className="flex flex-row justify-between items-center text-center bg-black font-sixtyFour font-scan-0 text-[#FEFFB2] w-[215px] px-[20px] py-[7px] rounded-lg border-[#FEFFB2] border-[1.5px] shadow-[5px_5px_0px_0px_#FEFFB2]"
          >
            <span className="text-[#FEFFB2] pl-5 text-[16px] tracking-wider">
              SCORES
            </span>
            <span className="text-lg text-[#FEFFB2] items-baseline -rotate-90">
              &gt;
            </span>
          </button>
        </div>
      </main>
    </div>
  );
}