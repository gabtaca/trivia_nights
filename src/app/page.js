import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-brick-background bg-repeat bg-contain bg-[#31325D] w-full h-[100vh]">
      <main className="flex flex-col justify-center items-center w-full h-full">
        <div className="logo_trivia flex flex-col items-center bg-[#2B0B38] bg-opacity-[79%] w-[90%] h-[80%] rounded-[50px]">
          <div className="ctrl_logo flex blur-[1px]">
            <h1 className="font-tiltNeon text-[109px] text-shadow-neon-pink text-stroke-pink text-pink-100">TRIVIA</h1>
            <h1 className="font-tiltNeon text-[109px] absolute text-pink-100">TRIVIA</h1>
          </div>
          <h2 className="">NIGHT</h2>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">

      </footer>
    </div>
  );
}
