"use client";

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
    breakTime,
  } = useRandomValues();

  const [userBet, setUserBet] = useState({ color: "", number: 0, size: "" });
  const [betResult, setBetResult] = useState("");
  const [previousNumber, setPreviousNumber] = useState(0);
  const [betChecked, setBetChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState(false); // State to control when to show results

  useEffect(() => {
    if (currentGame) {
      setPreviousNumber(currentGame.randomNumber);
      setBetChecked(false);
      setUserBet({ color: "", number: 0, size: "" });
      setBetResult("");
      setShowResult(false); // Reset showResult state
    }
  }, [currentGame]);

  useEffect(() => {
    let timeout: NodeJS.Timeout | undefined;

    if (remainingTime === 0 && !betChecked) {
      timeout = setTimeout(() => {
        setShowResult(true);
      }, 5000); // Show results for 5 seconds when remainingTime reaches 0
    } else {
      setShowResult(false);
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [remainingTime, betChecked]);

  const placeBet = (
    type: "color" | "number" | "size",
    value: string | number
  ) => {
    if (!betChecked) {
      setUserBet({ ...userBet, [type]: value });
    }
  };

  const checkBet = () => {
    if (!currentGame || betChecked) return;

    setLoading(true);
    setTimeout(() => {
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
      setBetChecked(true);
      setLoading(false);
    }, 1000); // simulate loading time
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
                    disabled={betChecked}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Number</h3>
              <div className="grid grid-cols-6 gap-2">
                {numberOptions.map((number) => (
                  <button
                    key={number}
                    onClick={() => placeBet("number", number)}
                    className={`px-3 py-2 border rounded-full ${
                      userBet.number === number
                        ? "bg-blue-500 text-white"
                        : "bg-white hover:bg-blue-100"
                    } transition duration-200`}
                    disabled={betChecked}
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
                    disabled={betChecked}
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

  const BetResults = () => {
    const hasSelectedBet = userBet.color || userBet.number || userBet.size;

    return (
      <section className="w-full flex flex-col justify-center">
        <button
          onClick={checkBet}
          className={`border-2 border-indigo-600 py-3 px-5 rounded-md capitalize ${
            hasSelectedBet
              ? "bg-indigo-600 text-white hover:bg-indigo-700"
              : "bg-gray-200 text-gray-500 cursor-not-allowed"
          }`}
          disabled={!hasSelectedBet || betChecked || loading}
        >
          {loading ? (
            <span className="animate-spin">🔄</span>
          ) : betChecked ? (
            remainingTime > 0 ? (
              `Wait ${remainingTime} seconds for results `
            ) : (
              `Next Game in ${breakTime} seconds`
            )
          ) : (
            "Set Bet"
          )}
        </button>

        {showResult && betResult && (
          <div className="ml-4">
            <div className="bg-blue-50 p-4 rounded-lg mt-4">
              <h2 className="text-xl font-bold mb-2 text-blue-700">
                Bet Result:
              </h2>
              <p className="text-lg">{betResult}</p>
              <div className="mt-4">
                <h3 className="text-lg font-semibold">Your Selection:</h3>
                {userBet.color && <p>Color: {userBet.color}</p>}
                {userBet.number && <p>Number: {userBet.number}</p>}
                {userBet.size && <p>Size: {userBet.size}</p>}
              </div>
            </div>
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
        <BetResults />
      </div>

      <div className="w-full max-w-6xl mt-8">
        <ResultsTable results={results} />
      </div>
    </div>
  );
}
