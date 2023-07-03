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
  const [selected, setSelected] = useState([]);
  const [i, j] = useMemo(() => {
    let i = table.findIndex((item) => item.includes("X"));
    let j = table[i].findIndex((str) => str === "X");
    return [i, j];
  }, [table]);

  useEffect(() => {
    let s = [];

    while (s.length < 6) {
      let randomI = Math.floor(Math.random() * 8);
      let randomJ = Math.floor(Math.random() * 8);
      let randomCell = [randomI, randomJ];
      console.log({ randomCell });
      if (!s.some((k) => k[0] === randomCell[0] && k[1] === randomCell[1])) {
        s.push(randomCell);
      }
    }

    setSelected(s);
  }, []);
  const isDifferent = useCallback(
    (i, j) => {
      return selected.some((cell) => cell[0] === i && cell[1] === j);
    },
    [selected]
  );
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

        let destI, destJ;
        if (e.key === "ArrowUp") {
          //destI = Math.max(0, i - 1);
          destJ = j;
          for (let m = 0; m < i; m++) {
            if (selected.some((cell) => cell[0] === m && cell[1] === j)) {
              continue;
            } else {
              destI = Math.max(0, m);
            }
          }
        }
        if (e.key === "ArrowDown") {
          //destI = Math.min(7, i + 1);
          destJ = j;
          for (let m = 7; m > i; m--) {
            if (selected.some((cell) => cell[0] === m && cell[1] === j)) {
              continue;
            } else {
              destI = Math.min(7, m);
            }
          }
        }
        if (e.key === "ArrowLeft") {
          destI = i;
          // destJ = Math.max(0, j - 1);
          for (let m = 0; m < j; m++) {
            if (selected.some((cell) => cell[0] === i && cell[1] === m)) {
              continue;
            } else {
              destJ = Math.max(0, m);
            }
          }
        }
        if (e.key === "ArrowRight") {
          destI = i;
          // destJ = Math.min(7, j + 1);
          for (let m = 7; m > j; m--) {
            if (selected.some((cell) => cell[0] === i && cell[1] === m)) {
              continue;
            } else {
              destJ = Math.min(7, m);
            }
          }
        }

        // if (selected.some((cell) => cell[0] === destI && cell[1] === destJ)) {
        if (destI !== undefined && destJ !== undefined) {
          cache[i][j] = "";
          cache[destI][destJ] = "X";
          return cache;
        } else {
          return cache;
        }
      });
    },
    [i, j, selected]
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
