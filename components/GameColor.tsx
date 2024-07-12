// "use client";

// import React, { useState, useEffect, useMemo } from "react";
// import { motion, useAnimation } from "framer-motion";

// type BallColor = "red" | "violet" | "green";

// type BallProps = {
//   number: number;
//   color: BallColor;
//   borderColor: string;
// };

// type ColorButtonProps = {
//   borderColor: string;
//   color: BallColor;
//   name: string;
//   selected: boolean;
//   onClick: () => void;
// };

// type NumberButtonProps = {
//   number: number;
//   selected: boolean;
//   onClick: () => void;
// };

// type ButtonGroupProps = {
//   selectedSize: "big" | "small";
//   setSelectedSize: (size: "big" | "small") => void;
// };

// type Result = {
//   id: string;
//   number: number;
//   color: BallColor;
//   size: "big" | "small";
//   isNumberMatched: boolean;
//   timestamp: string;
// };

// const Ball: React.FC<BallProps> = React.memo(({ number, color, borderColor }) => {
//   return (
//     <motion.div
//       className={`w-16 h-16 rounded-full flex items-center justify-center text-white text-lg font-bold`}
//       style={{
//         backgroundColor: `bg-${color}-400`,
//         border: `4px solid ${borderColor}`,
//       }}
//       initial={{ scale: 0, opacity: 0 }}
//       animate={{ scale: 1, opacity: 1 }}
//       transition={{ duration: 0.5 }}
//     >
//       {number}
//     </motion.div>
//   );
// });

// const BigOrSmallButton: React.FC<ButtonGroupProps> = React.memo(({
//   selectedSize,
//   setSelectedSize,
// }) => {
//   return (
//     <div className="grid grid-cols-2 gap-4">
//       <button
//         className={`p-2 rounded-md text-white font-bold ${
//           selectedSize === "big" ? "bg-green-400" : "bg-gray-500 hover:bg-green-400"
//         }`}
//         onClick={() => setSelectedSize("big")}
//       >
//         Big
//       </button>
//       <button
//         className={`p-2 rounded-md text-white font-bold ${
//           selectedSize === "small" ? "bg-red-400" : "bg-gray-500 hover:bg-red-400"
//         }`}
//         onClick={() => setSelectedSize("small")}
//       >
//         Small
//       </button>
//     </div>
//   );
// });

// const ColorButton: React.FC<ColorButtonProps> = React.memo(({
//   borderColor,
//   color,
//   name,
//   selected,
//   onClick,
// }) => {
//   return (
//     <button
//       className={`p-2 border-2 w-full rounded-lg ${borderColor} bg-${color}-400 ${
//         selected ? "ring-4 ring-gray-400" : ""
//       }`}
//       onClick={onClick}
//     >
//       {name}
//     </button>
//   );
// });

// const NumberButton: React.FC<NumberButtonProps> = React.memo(({
//   number,
//   selected,
//   onClick,
// }) => {
//   return (
//     <motion.div>
//     <button
//       className={`w-10 h-10 flex items-center justify-center ${
//         selected ? "bg-violet-400" : "bg-gray-200"
//       } rounded-full`}
//       onClick={onClick}
//     >
//       {number}
//       </button>
//     </motion.div>
//   );
// });

// const BallContainer: React.FC = () => {
//   const [balls, setBalls] = useState(
//     Array.from({ length: 12 }, (_, i) => ({
//       number: i + 1,
//       color: ["red", "violet", "green"][i % 3] as BallColor,
//       borderColor: ["#4B0082", "#228B22", "#8B0000"][i % 3],
//     }))
//   );
//   const [timeLeft, setTimeLeft] = useState(5);
//   const [result, setResult] = useState<Result | null>(null);
//   const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
//   const [selectedColor, setSelectedColor] = useState<BallColor | null>(null);
//   const [selectedSize, setSelectedSize] = useState<"big" | "small">("big");
//   const controls = useAnimation();

//   const previousResults = useMemo(() => {
//     const storedResults = JSON.parse(localStorage.getItem("ballGameResults") || "[]");
//     return storedResults.sort((a: Result, b: Result) => {
//       const dateA = new Date(a.timestamp);
//       const dateB = new Date(b.timestamp);
//       return dateB.getTime() - dateA.getTime();
//     });
//   }, []);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setTimeLeft((prev) => (prev > 0 ? prev - 1 : 5));
//     }, 1000);

//     return () => clearInterval(timer);
//   }, []);

//   useEffect(() => {
//     if (timeLeft === 0) {
//       showResult();
//     }
//   }, [timeLeft]);

//   const showResult = () => {
//     const randomBall = balls[Math.floor(Math.random() * balls.length)];
//     const isNumberMatched = selectedNumber === randomBall.number;
//     const size = randomBall.number > 6 ? "big" : "small";
//     const timestamp = new Date().toLocaleString();
//     const result: Result = {
//       id: `${timestamp.replace(/[/: ]/g, '')}`,
//       number: randomBall.number,
//       color: randomBall.color,
//       size,
//       isNumberMatched,
//       timestamp,
//     };
//     setResult(result);

//     controls.start({
//       scale: 0,
//       opacity: 0,
//       transition: { duration: 0.5 },
//     });

//     setTimeout(() => {
//       setResult(null);
//       setBalls((prev) =>
//         prev.map((ball) => ({
//           number: ball.number,
//           color: ["red", "violet", "green"][ball.number % 3] as BallColor,
//           borderColor: ["#4B0082", "#228B22", "#8B0000"][ball.number % 3],
//         }))
//       );
//       controls.start({
//         scale: 1,
//         opacity: 1,
//         transition: { duration: 0.5 },
//       });
//       setTimeLeft(5);
//     }, 5000);

//     // Save result to local storage
//     const storedResults = JSON.parse(localStorage.getItem("ballGameResults") || "[]");
//     localStorage.setItem(
//       "ballGameResults",
//       JSON.stringify([...storedResults, result])
//     );
//   };

//   return (
//     <div className="p-4 max-w-2xl mx-auto">
//       <div className="grid grid-cols-4 gap-4">
//         {result ? (
//           <motion.div
//             className={`w-64 h-64 flex items-center justify-center text-white text-2xl font-bold rounded-full border-4 mx-auto bg-${result.color}-400`}
//             animate={controls}
//           >
//             {result.number}
//           </motion.div>
//         ) : (
//           balls.map((ball) => <Ball key={ball.number} {...ball} />)
//         )}
//       </div>

//       <div className="mb-4">
//         <h3 className="text-lg">Select a number</h3>
//         <div className="grid grid-cols-6 border-2 p-2 rounded-md md:grid-cols-12 py-4 gap-4">
//           {balls.map((ball) => (
//             <NumberButton
//               key={ball.number}
//               number={ball.number}
//               selected={selectedNumber === ball.number}
//               onClick={() => setSelectedNumber(ball.number)}
//             />
//           ))}
//         </div>

//         <h3 className="text-lg">Select a color</h3>
//         <div className="grid grid-cols-3 gap-4 py-4">
//           <ColorButton
//             borderColor="border-red-400"
//             color="red"
//             name="Red"
//             selected={selectedColor === "red"}
//             onClick={() => setSelectedColor("red")}
//           />
//           <ColorButton
//             borderColor="border-violet-400"
//             color="violet"
//             name="Violet"
//             selected={selectedColor === "violet"}
//             onClick={() => setSelectedColor("violet")}
//           />
//           <ColorButton
//             borderColor="border-green-400"
//             color="green"
//             name="Green"
//             selected={selectedColor === "green"}
//             onClick={() => setSelectedColor("green")}
//           />
//         </div>

//         <h3 className="text-lg">Select big or small</h3>
//         <div className="p-4">
//           <BigOrSmallButton
//             selectedSize={selectedSize}
//             setSelectedSize={setSelectedSize}
//           />
//         </div>

//         <div className="w-full">
//           <button className="text-xl w-full py-2 bg-blue-400/40">
//             Time left: {timeLeft} seconds
//           </button>
//         </div>

//         {result && (
//           <div className="mt-4 p-4 bg-gray-100 rounded-lg">
//             <h3 className="text-xl font-bold">Result</h3>
//             <p>Number: {result.number}</p>
//             <p>Color: {result.color}</p>
//             <p>Number Matched: {result.isNumberMatched ? "Yes" : "No"}</p>
//             <p>Size: {result.size}</p>
//           </div>
//         )}

//         <div className="mt-8">
//           <h3 className="text-lg font-bold">Previous Results</h3>
//           <table className="w-full border-collapse">
//             <thead>
//               <tr className="bg-gray-200">
//                 <th className="p-2">ID</th>
//                 <th className="p-2">Number</th>
//                 <th className="p-2">Color</th>
//                 <th className="p-2">Size</th>
//                 <th className="p-2">Matched</th>
//                 <th className="p-2">Timestamp</th>
//               </tr>
//             </thead>
            
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// const GameColor = () => {
//   return (
//     <section className="min-h-screen flex flex-col justify-center items-center">
//       <BallContainer />
//     </section>
//   );
// };

// export default GameColor;




// Function to generate a random number from 1 to 12
const getRandomNumber = (): number => {
  return Math.floor(Math.random() * 12) + 1;
};

// Function to get a random color from a predefined set of colors
const getRandomColor = (): string => {
  const colors = ['#DC143C', '#32CD32', '#8A2BE2'];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};

// Function to generate a unique ID with a timestamp
const generateUniqueIdWithTimestamp = (): string => {
  const timestamp = new Date().toISOString();
  return `${timestamp}`;
};

// Function to generate the game result
type GameResult = {
  randomNumber: number;
  randomColor: string;
  isBigger: boolean;
  uniqueId: string;
  timestamp: string;
};

const generateGameResult = (selectedNumber: number): GameResult => {
  const randomNumber = getRandomNumber();
  const randomColor = getRandomColor();
  const isBigger = randomNumber > selectedNumber;
  const uniqueId = generateUniqueIdWithTimestamp();
  const timestamp = new Date().toISOString();

  return {
    randomNumber,
    randomColor,
    isBigger,
    uniqueId,
    timestamp,
  };
};



import React from 'react'

const GameColor = () => {
  return (
    <div>

        
    </div>
  )
}

export default GameColor
