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
  const [givenNumber, setGivenNumber] = useState<number>(() => {
    const storedNumber = localStorage.getItem('givenNumber');
    return storedNumber ? JSON.parse(storedNumber) : 5;
  });
  const [results, setResults] = useState<Result[]>(() => {
    const storedResults = localStorage.getItem('results');
    return storedResults ? JSON.parse(storedResults) : [];
  });
  const [currentGame, setCurrentGame] = useState<Result | null>(null);
  const [remainingTime, setRemainingTime] = useState<number>(() => {
    const storedRemainingTime = localStorage.getItem('remainingTime');
    return storedRemainingTime ? JSON.parse(storedRemainingTime) : 30;
  });
  const [breakTime, setBreakTime] = useState<number>(() => {
    const storedBreakTime = localStorage.getItem('breakTime');
    return storedBreakTime ? JSON.parse(storedBreakTime) : 0;
  });
  const [paused, setPaused] = useState<boolean>(() => {
    const storedPaused = localStorage.getItem('paused');
    return storedPaused ? JSON.parse(storedPaused) : false;
  });

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
      if (paused) return;
      
      if (breakTime > 0) {
        setBreakTime((prev) => prev - 1);
      } else if (remainingTime > 0) {
        setRemainingTime((prev) => prev - 1);
      } else {
        const newGame = generateGame();
        setCurrentGame(newGame);
        setResults((prevResults) => {
          const updatedResults = [newGame, ...prevResults.slice(0, 19)];
          localStorage.setItem('results', JSON.stringify(updatedResults));
          return updatedResults;
        });
        setRemainingTime(30);
        setBreakTime(5);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [remainingTime, breakTime, paused, generateGame]);

  useEffect(() => {
    localStorage.setItem('givenNumber', JSON.stringify(givenNumber));
  }, [givenNumber]);

  useEffect(() => {
    localStorage.setItem('remainingTime', JSON.stringify(remainingTime));
  }, [remainingTime]);

  useEffect(() => {
    localStorage.setItem('breakTime', JSON.stringify(breakTime));
  }, [breakTime]);

  useEffect(() => {
    localStorage.setItem('paused', JSON.stringify(paused));
  }, [paused]);

  const handleGivenNumberChange = (number: number) => {
    setGivenNumber(number);
  };

  const togglePause = () => {
    setPaused(prev => !prev);
  };

  return {
    results,
    givenNumber,
    handleGivenNumberChange,
    currentGame,
    remainingTime,
    breakTime,
    paused,
    togglePause,
  };
};

export default useRandomValues;
