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
  const [ix, jx] = useMemo(() => {
    let i = table.findIndex((item) => item.includes("X"));
    let j = table[i].findIndex((str) => str === "X");
    return [i, j];
  }, [table]);

  const handleClick = useCallback(
    (i, j) => {
      let dx = Math.abs(ix - i);
      let dy = Math.abs(jx - j);
      setTable((prev) => {
        let cache = [...prev];
        if (dx === 1 && dy === 2) {
          cache[i][j] = "X";
          cache[ix][jx] = "";
        }
        if (dx === 2 && dy === 1) {
          cache[i][j] = "X";
          cache[ix][jx] = "";
        }
        return cache;
      });
    },
    [ix, jx]
  );
  const getColor = useCallback(
    (i, j) => {
      let dx = Math.abs(ix - i);
      let dy = Math.abs(jx - j);
      if (dx === 1 && dy === 2) return "#fed766";
      if (dx === 2 && dy === 1) return "#fed766";
      return (i + j) % 2 === 0 ? "#ccc" : "primary.main";
    },
    [ix, jx]
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
        if (e.key !== "Control") cache[ix][jx] = "";

        if (e.key === "ArrowUp") {
          cache[Math.max(0, ix - (e.ctrlKey ? 2 : 1))][jx] = "X";
        }
        if (e.key === "ArrowDown") {
          cache[Math.min(4, ix + (e.ctrlKey ? 2 : 1))][jx] = "X";
        }
        if (e.key === "ArrowLeft") {
          cache[ix][Math.max(0, jx - (e.ctrlKey ? 2 : 1))] = "X";
        }
        if (e.key === "ArrowRight") {
          cache[ix][Math.min(4, jx + (e.ctrlKey ? 2 : 1))] = "X";
        }
        return cache;
      });
    },
    [ix, jx]
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
                    onClick={() => handleClick(i, j)}
                    sx={{
                      border: "1px solid white",
                      width: 70,
                      height: 70,
                      backgroundColor: getColor(i, j),
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
