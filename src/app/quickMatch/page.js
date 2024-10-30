/*quickMatch.js*/

"use client";
 
export default function quickmatch() {
  return (
    <div className="z-0 bg-brick-background bg-repeat bg-contain bg-[#31325D] w-full h-[100vh] m-0">
      <div className="bg_gradient-top hidden z-0 absolute top-0 w-full h-[20%] bg-gradient-to-b from-slate-900 to-transparent"></div>
      <div className="bg_gradient-bot z-0 absolute bottom-0 w-full h-[20%] bg-gradient-to-t from-slate-900 to-transparent"></div>
      <main className=" flex flex-col justify-center items-center w-full h-full">
        <div className="main_modal-quickmatch z-10 flex flex-col gap-10 justify-center items-center w-[90%] h-[90%]">
          <div className="main_modal-quickmatch-banner z-0 absolute top-0 bg-black flex-row h-[100px] w-full">
            <button id="btn_scores" className="flex flex-row justify-between items-center text-center bg-black font-sixtyFour font-scan-0  text-[#FEFFB2] w-[215px] px-[20px] py-[12px] sm:text-[12px] sm:w-[115px] sm:px-[10px] sm:py-[6px] rounded-lg border-[#FEFFB2] border-[1.5px] shadow-[5px_5px_0px_0px_#FEFFB2]">
                <span className="text-[#FEFFB2] pl-5 md:text-[16px] text-[12px] tracking-wider">SCORES</span>
                <span className=" sm:text-md  md:text-lg text-[#FEFFB2] items-baseline rotate-90">
                  &gt;
                </span>
            </button>
          </div>
          <div className="myscore_container text-[#61FF64] font-sixtyFour text-[16px]">
            <h2>Score:</h2>
          </div>
          <div className="question_container bg-[#2B0C39] bg-opacity-60 rounded-3xl shadow-[3px_4px_0px_0px_rgba(255,57,212)] w-full h-[100px]">
 
          </div>
         
          <nav className="flex flex-col items-center gap-10">
            <button id="btn_reponse1" className="font-montserrat font-bold text-white text-[12px] text-center border-[3.2px] rounded-[17px] border-[#FF38D3] bg-[#430086] w-[200px] px-[20px] py-[12px] items-center" >RÉPONSE 1</button>
            <button id="btn_reponse2" className="font-montserrat font-bold text-white text-[12px] text-center border-[3.2px] rounded-[17px] border-[#FF38D3] bg-[#430086] w-[200px] px-[20px] py-[12px] items-center" >RÉPONSE 2</button>
            <button id="btn_reponse3" className="font-montserrat font-bold text-white text-[12px] text-center border-[3.2px] rounded-[17px] border-[#FF38D3] bg-[#430086] w-[200px] px-[20px] py-[12px] items-center" >RÉPONSE 3</button>
            <button id="btn_reponse4" className="font-montserrat font-bold text-white text-[12px] text-center border-[3.2px] rounded-[17px] border-[3] bg-[#430086] w-[200px] px-[20px] py-[12px] items-center" >RÉPONSE 4</button>
          </nav>

          <div className="logo_quickmatch flex flex-row justify-between  w-full">
            <div className="logo  flex flex-col">
              <div className="ctrl_logo_h1 flex blur-[1px] w-[60%]">
                <h1 className="font-tiltNeon text-[40px] text-shadow-neon-pink text-stroke-pink text-pink-100">TRIVIA</h1>
                <h1 className="font-tiltNeon text-[40px] absolute text-pink-100">TRIVIA</h1>
              </div>
              <div className="ctrl_logo_h2 flex blur-[1px] m-[-35px] pr-2 justify-end">
                <h2 className="font-girlNextDoor font-thin text-[25px] text-shadow-neon-purple text-stroke-purple text-pink-100">NIGHTS</h2>
                <h2 className="font-girlNextDoor font-thin text-[25px] absolute text-pink-100">NIGHTS</h2>
              </div>
            </div>
            <div className="font-tiltNeon text-neonPink text-[25px] flex flex-row">
            <h2 className="text-neonPink">Quick match</h2>
            </div>
          </div>
          

        </div>
      </main>
    </div>
  );
}