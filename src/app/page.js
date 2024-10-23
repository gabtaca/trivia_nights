import Image from "next/image";

export default function Home() {
  return (
    <div className="z-0 bg-brick-background bg-repeat bg-contain bg-[#31325D] w-full h-[100vh]">
      <div className="bg_gradient-top z-10 absolute top-0 w-full h-[20%] bg-gradient-to-b from-slate-900 to-transparent"></div>
      <div className="bg_gradient-bot z-10 absolute bottom-0 w-full h-[20%] bg-gradient-to-t from-slate-900 to-transparent"></div>
      <main className=" flex flex-col justify-center items-center w-full h-full">
        <div className="main_modal z-40 flex flex-col items-center bg-[#2B0B38] bg-opacity-[79%] w-[90%] h-[80%] rounded-[50px]">
          <div className="logo ">
            <div className="ctrl_logo_h1 flex blur-[1px]">
              <h1 className="font-tiltNeon text-[109px] text-shadow-neon-pink text-stroke-pink text-pink-100">TRIVIA</h1>
              <h1 className="font-tiltNeon text-[109px] absolute text-pink-100">TRIVIA</h1>
            </div>
            <div className="ctrl_logo_h2 flex blur-[1px] m-[-35px] pr-2 justify-end">
              <h2 className="font-girlNextDoor font-thin text-[67px] text-shadow-neon-purple text-stroke-purple text-pink-100">NIGHTS</h2>
              <h2 className="font-girlNextDoor font-thin text-[67px] absolute text-pink-100">NIGHTS</h2>
            </div>
          </div>
        
          <div className="welcome_text flex flex-col font-montserrat font-bold text-white text-[12px] gap-6 p-6 text-center md:w-270 ">
            <p>Trivia nights vous offre un défi contre la montre où vous avez à répondre à des questions rapidement et correctement pour accumuler des points.</p>
            <p>En partie rapide ou personnalisée, mettez à l’épreuve vos méninges et battez les scores des génies avant vous!</p>
          </div>

          <button className="font-montserrat font-bold text-white text-[12px] border-[#FF38D3] bg-[#430086] p-11 w-196">Start</button>

        </div>
        <div className="main_modal-gameMenu flex flex-col">
          <button id="btn_qickMatch">QUICK MATCH</button>
          <button id="btn_cstmMatch">CUSTOM MATCH</button>
          <button className="btn_scores bg-black font-sixtyFour font-bold text-[#FEFFB2] px-[75px] py-[12px] rounded-lg border-[#FEFFB2] border-[1.5px] shadow-[5px_5px_0px_0px_rgba(254,255,178)]" id="btn_scores">SCORES
            <span>&gt</span>
          </button>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">

      </footer>
    </div>
  );
}
