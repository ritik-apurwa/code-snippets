import { useState, useEffect, useCallback } from "react";

export interface Result {
  id: string;
  randomColor: string;
  randomNumber: number;
  randomSize: string;
  givenNumber: number;
  timestamp: string;
}

const useRandomValues = () => {
  const colorOptions = ["red", "green", "violet"];
  const numberOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const [givenNumber, setGivenNumber] = useState<number>(5);
  const [results, setResults] = useState<Result[]>([]);
  const [currentGame, setCurrentGame] = useState<Result | null>(null);
  const [remainingTime, setRemainingTime] = useState<number>(30);

  const getRandomColor = useCallback((): string => {
    const randomIndex1 = Math.floor(Math.random() * colorOptions.length);
    if (Math.random() < 0.9) {
      return colorOptions[randomIndex1];
    } else {
      let randomIndex2;
      do {
        randomIndex2 = Math.floor(Math.random() * colorOptions.length);
      } while (randomIndex1 === randomIndex2);
      return `${colorOptions[randomIndex1]}, ${colorOptions[randomIndex2]}`;
    }
  }, []);

  const getRandomNumber = useCallback((): number => {
    return numberOptions[Math.floor(Math.random() * numberOptions.length)];
  }, []);

  const getRandomSize = useCallback(
    (randomNumber: number): string => {
      if (randomNumber > givenNumber) {
        return "big";
      } else if (randomNumber < givenNumber) {
        return "small";
      } else {
        return "equal";
      }
    },
    [givenNumber]
  );

  const generateGame = useCallback((): Result => {
    const randomNumber = getRandomNumber();
    return {
      id: Date.now().toString(),
      randomColor: getRandomColor(),
      randomNumber,
      randomSize: getRandomSize(randomNumber),
      givenNumber,
      timestamp: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
    };
  }, [getRandomColor, getRandomNumber, getRandomSize, givenNumber]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (remainingTime > 0) {
        setRemainingTime((prev) => prev - 1);
      } else {
        const newGame = generateGame();
        setCurrentGame(newGame);
        setResults((prevResults) => [newGame, ...prevResults.slice(0, 19)]);
        setRemainingTime(30);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [remainingTime, generateGame]);

  const handleGivenNumberChange = (number: number) => {
    setGivenNumber(number);
  };

  return {
    results,
    givenNumber,
    handleGivenNumberChange,
    currentGame,
    remainingTime,
  };
};

export default useRandomValues;