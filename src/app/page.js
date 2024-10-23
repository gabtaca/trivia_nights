import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-brick-background bg-repeat bg-contain bg-[#31325D] w-full h-[100vh]">
      <main className="flex flex-col justify-center items-center w-full h-full">
        <div className="home_title flex flex-col items-center bg-[#2B0B38] bg-opacity-[79%] w-[90%] h-[80%] rounded-[50px]">
          <div className="ctrl_title flex blur-[1px]">
            <h1 className="font-tiltNeon text-[109px] text-shadow-neon-pink text-stroke-pink text-pink-100">TRIVIA</h1>
            <h1 className="font-tiltNeon text-[109px] absolute text-pink-100">TRIVIA</h1>
          </div>
          <h2 className="">NIGHT</h2>
        
          <div className="welcome_text flex flex-col font-montserrat font-bold text-white text-[12px] gap-6 p-6 text-center md:w-270 ">
            <p>Trivia nights vous offre un défi contre la montre où vous avez à répondre à des questions rapidement et correctement pour accumuler des points.</p>
            <p>En partie rapide ou personnalisée, mettez à l’épreuve vos méninges et battez les scores des génies avant vous!</p>
          </div>

          <button className="font-montserrat font-bold text-white text-[12px] border-[#FF38D3] bg-[#430086]">Start</button>

       </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">

      </footer>
    </div>
  );
}
