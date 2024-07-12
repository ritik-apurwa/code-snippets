"use client"

import React, { useState, useEffect } from "react";
import { ResultsTable } from "./ResultTable";
import useRandomValues from "./generatedResult";

const numberOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const colorOptions = ["red", "green", "violet"];

export default function ColorGame() {
  const {
    results,
    givenNumber,
    handleGivenNumberChange,
    currentGame,
    remainingTime,
  } = useRandomValues();

  const [userBet, setUserBet] = useState({ color: "", number: 0, size: "" });
  const [betResult, setBetResult] = useState("");
  const [previousNumber, setPreviousNumber] = useState(0);

  useEffect(() => {
    if (currentGame) {
      setPreviousNumber(currentGame.randomNumber);
    }
  }, [currentGame]);

  const placeBet = (
    type: "color" | "number" | "size",
    value: string | number
  ) => {
    setUserBet({ ...userBet, [type]: value });
  };

  const checkBet = () => {
    if (!currentGame) return;

    let result = [];
    if (userBet.color && userBet.color === currentGame.randomColor) {
      result.push("Color matched!");
    }
    if (userBet.number && userBet.number === currentGame.randomNumber) {
      result.push("Number matched!");
    }
    if (userBet.size && userBet.size === currentGame.randomSize) {
      result.push("Size matched!");
    }
    if (result.length === 0) {
      result.push("No match. Better luck next time!");
    }
    setBetResult(result.join(" "));
  };

  const BetControls = () => {
    return (
      <section>
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2 text-gray-700">
            Place Your Bet:
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h3 className="font-semibold mb-2">Color</h3>
              <div className="grid grid-cols-3 gap-2">
                {colorOptions.map((color) => (
                  <button
                    key={color}
                    onClick={() => placeBet("color", color)}
                    className={`px-3 py-2 border rounded-full capitalize ${
                      userBet.color === color
                        ? "bg-blue-500 text-white"
                        : "bg-white hover:bg-blue-100"
                    } transition duration-200`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Number</h3>
              <div className="grid grid-cols-4 gap-2">
                {numberOptions.map((number) => (
                  <button
                    key={number}
                    onClick={() => placeBet("number", number)}
                    className={`px-3 py-2 border rounded-full ${
                      userBet.number === number
                        ? "bg-blue-500 text-white"
                        : "bg-white hover:bg-blue-100"
                    } transition duration-200`}
                  >
                    {number}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Size</h3>
              <div className="grid grid-cols-2 gap-2">
                {["big", "small"].map((size) => (
                  <button
                    key={size}
                    onClick={() => placeBet("size", size)}
                    className={`px-3 py-2 border rounded-full capitalize ${
                      userBet.size === size
                        ? "bg-blue-500 text-white"
                        : "bg-white hover:bg-blue-100"
                    } transition duration-200`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };

  const CurrentGameResult = () => {
    return (
      <div>
        {currentGame && (
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-3">
              <div className="flex w-full justify-center">Color</div>
              <div className="flex w-full justify-center">Number</div>
              <div className="flex w-full justify-center">Size</div>
            </div>
            <div className="grid grid-cols-3">
              <div className="flex w-full justify-center">
                {currentGame.randomColor}
              </div>
              <div className="flex w-full justify-center">
                {currentGame.randomNumber}
              </div>
              <div className="flex w-full justify-center">
                {currentGame.randomSize}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const BetResults = () => {
    return (
      <section>
        {betResult && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h2 className="text-xl font-bold mb-2 text-blue-700">
              Bet Result:
            </h2>
            <p className="text-lg">{betResult}</p>
          </div>
        )}
      </section>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
          Color Number Game
        </h1>

        <BetControls />
        <CurrentGameResult />
        {remainingTime}
        <div className="text-center">
          <button
            onClick={checkBet}
            className="px-6 py-3 bg-green-500 text-white rounded-full font-bold hover:bg-green-600 transition duration-200"
          >
            Check Bet
          </button>
        </div>

        {betResult && <BetResults />}
      </div>

      <div className="w-full max-w-6xl mt-8">
        <ResultsTable results={results} />
      </div>
    </div>
  );
}