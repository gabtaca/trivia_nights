/*customMatch.js*/

"use client";

/*StartScreen*/

"use client";

import { useRouter } from "next/navigation";

export default function StartScreen() {
  const router = useRouter();

  const startGame = () => {
    router.push("/gameMenu");
  };

  return (
    <div className="z-0 bg-brick-background bg-repeat bg-contain bg-[#31325D] w-full h-[100vh]">
      <div className="bg_gradient-top z-0 absolute w-full h-[20%] bg-gradient-to-b from-slate-900 to-transparent"></div>
      <div className="bg_gradient-bot z-0 absolute bottom-0 w-full h-[20%] bg-gradient-to-t from-slate-900 to-transparent"></div>
      <main className="flex flex-col z-50  justify-evenly items-center w-full h-full">
        <div className="customSettings_container rounded-3xl bg-[#2b0c39] bg-opacity-60 shadow-[3px_4px_0px_0px_rgba(255,57,212)]">
        <div className="ctrl_customMatch-title flex  p-10  justify-center ">
            <h1 className="font-tiltNeon text-[35px] text-shadow-neon-pink text-stroke-pink text-pink-100">
              Partie personnalisée
            </h1>
            <h1 className="font-tiltNeon text-[35px] absolute text-pink-100">
            Partie personnalisée
            </h1>
          </div>
        <nav className="flex flex-col items-center p-10 gap-10">
            <button

              id="btn_quickMatch"
              className="font-montserrat font-bold text-white text-[12px] text-center border-[3.2px] rounded-[17px] border-[#FF38D3] bg-[#430086] w-[300px] px-[20px] py-[15px] items-center"
            >
              NOMBRES DE QUESTIONS
            </button>
            <button
              id="btn_cstmMatch"
              className="font-montserrat font-bold text-white text-[12px] text-center border-[3.2px] rounded-[17px] border-[#FF38D3] bg-[#430086] w-[300px] px-[20px] py-[15px] items-center"
            >
              CATÉGORIES
            </button>
            <button
              id="btn_cstmMatch"
              className="font-montserrat font-bold text-white text-[12px] text-center border-[3.2px] rounded-[17px] border-[#FF38D3] bg-[#430086] w-[300px] px-[20px] py-[15px] items-center"
            >
              NIVEAU DE DIFFICULTÉ

            </button>
            <button
              id="btn_cstmMatch"
              className="font-montserrat font-bold text-white text-[12px] text-center border-[3.2px] rounded-[17px] border-[#FF38D3] bg-[#430086] w-[300px] px-[20px] py-[15px] items-center"
            >
              TYPE

            </button>
          </nav>
        </div>
        <nav>
        <button
              id="btn_cstmMatch"
              className="font-montserrat font-bold text-white text-[12px] text-center border-[3.2px] rounded-[17px] border-[#430086] bg-[#FF38D3] w-[250px] px-[20px] py-[15px] items-center"
            >
              JOUER

            </button>
        </nav>
      <footer>
        <div className="logo_customMatch w-full">
          <div className="ctrl_logo_h1 flex blur-[0.5px]">
            <h1 className="font-tiltNeon text-[40px] text-shadow-neon-pink text-stroke-pink text-pink-100">
              TRIVIA
            </h1>
            <h1 className="font-tiltNeon text-[40px] absolute text-pink-100">
              TRIVIA
            </h1>
          </div>
          <div className="ctrl_logo_h2 flex  m-[-12px] mr-[-20px] blur-[0.5px] justify-end">
            <h2 className="font-girlNextDoor font-thin text-[25px] text-shadow-neon-purple text-stroke-purple text-pink-100">
              NIGHTS
            </h2>
            <h2 className="font-girlNextDoor font-thin text-[25px] absolute text-pink-100">
              NIGHTS
            </h2>
          </div>
        </div>
        <div className="match_type-customMatch"></div>
      </footer>
      </main>
    </div>
  );
}
