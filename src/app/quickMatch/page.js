"use client";

import { useRouter } from "next/navigation";

export default function StartScreen() {
  const router = useRouter();

  const startGame = () => {
    router.push("/gameMenu");
  };

  return (
    <div className="z-0 bg-brick-background bg-repeat bg-contain bg-[#31325D] w-full h-[100vh]">
      <div className="bg_gradient-top z-0 absolute top-0 w-full h-[20%] bg-gradient-to-b from-slate-900 to-transparent"></div>
      <div className="bg_gradient-bot z-0 absolute bottom-0 w-full h-[20%] bg-gradient-to-t from-slate-900 to-transparent"></div>
      <main className=" flex flex-col justify-center items-center w-full h-full">
        <div className="main_modal-homeMenu z-40 flex flex-col items-center bg-[#2B0B38] bg-opacity-[79%] w-[90%] h-[80%] rounded-[50px] justify-evenly">
          <div className="logo">
            <div className="ctrl_logo_h1 flex blur-[1px]">
              <h1 className="font-tiltNeon text-[109px] text-shadow-neon-pink text-stroke-pink text-pink-100">
                TRIVIA
              </h1>
              <h1 className="font-tiltNeon text-[109px] absolute text-pink-100">
                TRIVIA
              </h1>
            </div>
            <div className="ctrl_logo_h2 flex blur-[1px] m-[-35px] pr-2 justify-end">
              <h2 className="font-girlNextDoor font-thin text-[67px] text-shadow-neon-purple text-stroke-purple text-pink-100">
                NIGHTS
              </h2>
              <h2 className="font-girlNextDoor font-thin text-[67px] absolute text-pink-100">
                NIGHTS
              </h2>
            </div>
          </div>

<<<<<<< HEAD:src/app/page.js
          <div className="welcome_text flex flex-col font-montserrat font-bold text-white text-[12px] gap-6 p-6 text-center w-[300px] sm:w-270px">
            <p>
              Trivia nights vous offre un défi contre la montre où vous avez à
              répondre à des questions rapidement et correctement pour accumuler
              des points.
            </p>
            <p>
              En partie rapide ou personnalisée, mettez à l’épreuve vos méninges
              et battez les scores des génies avant vous!
            </p>
          </div>

          <button
            onClick={startGame}
            className="font-montserrat font-bold text-white text-[12px] text-center border-[3.2px] rounded-[17px] border-[#FF38D3] bg-[#430086] w-[200px] px-[20px] py-[12px] items-center"
          >
            START
          </button>
=======
          <button className="font-montserrat font-bold text-white text-[12px] text-center border-[3.2px] rounded-[17px] border-[#FF38D3] bg-[#430086] w-[200px] px-[20px] py-[12px] items-center ">START</button>

        </div>
        <div className="main_modal-gameMenu hidden z-10 flex flex-col gap-10 justify-center items-center w-[90%] h-[90%]">
          <div className="logo ">
            <div className="ctrl_logo_h1 flex blur-[1px]">
              <h1 className="font-tiltNeon text-[80px] text-shadow-neon-pink text-stroke-pink text-pink-100">TRIVIA</h1>
              <h1 className="font-tiltNeon text-[80px] absolute text-pink-100">TRIVIA</h1>
            </div>
            <div className="ctrl_logo_h2 flex blur-[1px] m-[-35px] pr-2 justify-end">
              <h2 className="font-girlNextDoor font-thin text-[50px] text-shadow-neon-purple text-stroke-purple text-pink-100">NIGHTS</h2>
              <h2 className="font-girlNextDoor font-thin text-[50px] absolute text-pink-100">NIGHTS</h2>
            </div>
          </div>
          <nav className="flex flex-col items-center gap-10">
            <button id="btn_quickMatch" className="font-montserrat font-bold text-white text-[12px] text-center border-[3.2px] rounded-[17px] border-[#FF38D3] bg-[#430086] w-[200px] px-[20px] py-[12px] items-center" >QUICK MATCH</button>
            <button id="btn_cstmMatch" className="font-montserrat font-bold text-white text-[12px] text-center border-[3.2px] rounded-[17px] border-[#FF38D3] bg-[#430086] w-[200px] px-[20px] py-[12px] items-center" >CUSTOM MATCH</button>
            <button id="btn_scores" className="flex flex-row justify-between items-center text-center bg-black font-sixtyFour font-scan-0  text-[#FEFFB2] w-[215px] px-[20px] py-[12px] rounded-lg border-[#FEFFB2] border-[1.5px] shadow-[5px_5px_0px_0px_#FEFFB2]">
              <span className="text-[#FEFFB2] pl-5 text-[16px] tracking-wider">SCORES</span>
              <span className="text-3xl text-[#FEFFB2]">˄</span>
            </button>
          </nav>
>>>>>>> f8e6ffe7d21a22610898e66a7901cc9d92ca7167:src/app/quickMatch/page.js
        </div>
        <div className="main_modal-quickmatch z-10 flex flex-col gap-10 justify-center items-center w-[90%] h-[90%]">
          <div className="main_modal-quickmatch-banner bg-black flex-row h-[100px] w-full">
            <button id="btn_scores" className="flex flex-row justify-between items-center text-center bg-black font-sixtyFour font-scan-0  text-[#FEFFB2] w-[215px] px-[20px] py-[12px] rounded-lg border-[#FEFFB2] border-[1.5px] shadow-[5px_5px_0px_0px_#FEFFB2]">
                <span className="text-[#FEFFB2] pl-5 text-[16px] tracking-wider">SCORES</span>
                <span className="text-lg text-[#FEFFB2] items-baseline rotate-90">
                  &gt;
                </span>
            </button>
          </div>
          <div className="myscore_container text-[#61FF64] font-sixtyFour text-[16px]">
            <h2>Score:</h2>
          </div>
          <div className="question_container bg-[#2B0C39] border-r-[#FF38D4] w-full h-[100px]">

          </div>
          
          
          <nav className="flex flex-col items-center gap-10">
            <button id="btn_reponse1" className="font-montserrat font-bold text-white text-[12px] text-center border-[3.2px] rounded-[17px] border-[#FF38D3] bg-[#430086] w-[200px] px-[20px] py-[12px] items-center" >RÉPONSE 1</button>
            <button id="btn_reponse2" className="font-montserrat font-bold text-white text-[12px] text-center border-[3.2px] rounded-[17px] border-[#FF38D3] bg-[#430086] w-[200px] px-[20px] py-[12px] items-center" >RÉPONSE 2</button>
            <button id="btn_reponse3" className="font-montserrat font-bold text-white text-[12px] text-center border-[3.2px] rounded-[17px] border-[#FF38D3] bg-[#430086] w-[200px] px-[20px] py-[12px] items-center" >RÉPONSE 3</button>
            <button id="btn_reponse4" className="font-montserrat font-bold text-white text-[12px] text-center border-[3.2px] rounded-[17px] border-[#FF38D3] bg-[#430086] w-[200px] px-[20px] py-[12px] items-center" >RÉPONSE 4</button>
          </nav>
          <div className="logo ">
            <div className="ctrl_logo_h1 flex blur-[1px]">
              <h1 className="font-tiltNeon text-[80px] text-shadow-neon-pink text-stroke-pink text-pink-100">TRIVIA</h1>
              <h1 className="font-tiltNeon text-[80px] absolute text-pink-100">TRIVIA</h1>
            </div>
            <div className="ctrl_logo_h2 flex blur-[1px] m-[-35px] pr-2 justify-end">
              <h2 className="font-girlNextDoor font-thin text-[50px] text-shadow-neon-purple text-stroke-purple text-pink-100">NIGHTS</h2>
              <h2 className="font-girlNextDoor font-thin text-[50px] absolute text-pink-100">NIGHTS</h2>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
