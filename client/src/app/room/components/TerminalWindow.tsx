"use client";

import clsx from "clsx";
import React, { useState } from "react";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { solarizedDarkAtom } from "react-syntax-highlighter/dist/esm/styles/prism";

const TerminalWindow: React.FC = () => {
  const inputRef = React.createRef<HTMLInputElement>();
  const [commands, setCommands] = useState(["c1.hp-=10", "e1.mp-=1d6", "c2.hp+=5", "e3.san-=1d6"]);

  const addCommand = () => {
    if (inputRef.current) {
      setCommands([...commands, inputRef.current.value]);
      inputRef.current.value = "";
    }
  };

  return (
    <div
      className={clsx(
        "flex",
        "flex-col",
        "bg-gray-800",
        "border-2",
        "border-gray-700",
        "overflow-hidden",
        "p-2",
        "bottom-0",
        "h-full",
        "text-gray-200"
      )}
    >
      <div className="flex-grow overflow-y-auto">
        <SyntaxHighlighter language="javascript" style={solarizedDarkAtom}>
          {commands.join("\n")}
        </SyntaxHighlighter>
      </div>
      <div className="flex">
        <input
          ref={inputRef}
          className={clsx(
            "bg-gray-700",
            "border-2",
            "border-gray-700",
            "text-gray-200",
            "p-1",
            "w-full"
          )}
          type="text"
          placeholder="Enter command"
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              addCommand();
            }
          }}
        />
        <button
          className={clsx("bg-gray-700", "border-2", "border-gray-700", "text-gray-200", "p-1")}
          onClick={() => {
            addCommand();
          }}
        >
          Execute
        </button>
      </div>
    </div>
  );
};

export default TerminalWindow;
