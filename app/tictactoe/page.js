import React from "react";
import Tictactoe from "./Tictactoe.jsx";
import TictactoeBot from "./TictactoeBot.jsx";

export default function TictactoePage() {
  return (
    <div className="mx-auto max-w-screen-lg flex justify-around items-start">
      <Tictactoe />
      <TictactoeBot/>
    </div>
  );
}
