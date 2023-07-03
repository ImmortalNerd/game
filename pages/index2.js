import { Box, Button } from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";

export default function Home() {
  const initState = [
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "X", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
  ];
  const [table, setTable] = useState(initState);
  const [i, j] = useMemo(() => {
    let i = table.findIndex((item) => item.includes("X"));
    let j = table[i].findIndex((str) => str === "X");
    return [i, j];
  }, [table]);

  const isDifferent = (i, j) => {
    let n = 8 * i + j;
    return n % 3 === 0;
    // if (n % 3 === 0) {
    //   return true;
    // } else {
    //   return false;
    // }
  };
  // const isDifferent = useMemo(() => {
  //   for (let m = 0; m <= 24; m += 3) {
  //     let i = Math.floor(m / 5);
  //     let j = m % 5;
  //     console.log({ i, j, m });
  //     return true;
  //   }
  // }, []);

  // useEffect(() => {});

  const move = useCallback(
    (e) => {
      if (
        ![
          "ArrowUp",
          "ArrowDown",
          "ArrowLeft",
          "ArrowRight",
          "Control",
        ].includes(e.key)
      )
        return;
      setTable((prev) => {
        let cache = [...prev];
        if (e.key !== "Control") cache[i][j] = "";

        if (e.key === "ArrowUp") {
          cache[Math.max(0, i - (e.ctrlKey ? 2 : 1))][j] = "X";
        }
        if (e.key === "ArrowDown") {
          cache[Math.min(4, i + (e.ctrlKey ? 2 : 1))][j] = "X";
        }
        if (e.key === "ArrowLeft") {
          cache[i][Math.max(0, j - (e.ctrlKey ? 2 : 1))] = "X";
        }
        if (e.key === "ArrowRight") {
          cache[i][Math.min(4, j + (e.ctrlKey ? 2 : 1))] = "X";
        }
        return cache;
      });
    },
    [i, j]
  );

  useEffect(() => {
    window.addEventListener("keydown", move);
    return () => {
      window.removeEventListener("keydown", move);
    };
  }, [move]);

  return (
    <>
      <div className="container grid justify-center items-center w-2/3 h-full	">
        {table.map((arr, i) => {
          return (
            <div key={i} className="grid grid-cols-8">
              {arr.map((s, j) => {
                return (
                  <Box
                    className="flex justify-center items-center"
                    key={j}
                    sx={{
                      border: "1px solid white",
                      width: 70,
                      height: 70,
                      backgroundColor: isDifferent(i, j)
                        ? "#ccc"
                        : "primary.main",
                    }}
                  >
                    {s}
                  </Box>
                );
              })}
            </div>
          );
        })}
        <Button
          color="error"
          variant="contained"
          onClick={() => setTable(initState)}
        >
          Reset
        </Button>
      </div>
    </>
  );
}
