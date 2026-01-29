export default function HeartLoader() {
  return (
    <div className="flex flex-col items-center justify-center h-64 w-full">
      <svg
        className="w-full max-w-2xl h-32"
        viewBox="0 0 200 50"
        xmlns="http://www.w3.org/2000/svg"
      >
        <polyline
          className="stroke-current text-red-500 fill-none stroke-2 animate-ekg-once"
          points="0,25 20,25 30,10 40,40 50,25 70,25 80,5 90,45 100,25 120,25 130,15 140,35 150,25 170,25 180,10 190,25 200,25"
        />
      </svg>

      <p className="text-white mt-4 font-semibold text-lg">Prijava u tijeku...</p>

      <style>
        {`
        @keyframes ekg-once {
          0% { stroke-dashoffset: 200; }
          100% { stroke-dashoffset: 0; }
        }
        .animate-ekg-once {
          stroke-dasharray: 200;
          stroke-dashoffset: 200;
          animation: ekg-once 1.5s linear forwards;
        }
        `}
      </style>
    </div>
  );
}
