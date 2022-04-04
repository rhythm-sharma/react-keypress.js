import React, { useState } from "react";

import {
  ShortcutsContextProvider,
  KeyboardShortcut,
  useActiveShortcuts,
} from "./react-keypress";

const BoxComponent = ({ content, combo, description }) => {
  const [showBlue, toggleBlueBackground] = useState(true);

  return (
    <div className="box" style={{ background: showBlue ? "#3f6691" : "red" }}>
      {content}
      <KeyboardShortcut
        combo={combo}
        description={description}
        callback={() => {
          toggleBlueBackground((showBlue) => !showBlue);
        }}
      />
    </div>
  );
};

const ShortcutsHelp = () => {
  let activeShortcuts = useActiveShortcuts();

  return (
    <div className="box shortcut-description-container">
      <div className="shortcut-description-heading">Active Shortcuts</div>
      {activeShortcuts.map(({ combo, description }, index) => {
        return (
          <div key={index} className="combo-description-container">
            <span className="combo">"{combo}" : </span>
            <span>"{description}"</span>
          </div>
        );
      })}
    </div>
  );
};

export default function App() {
  return (
    <div className="App">
      <ShortcutsContextProvider>
        <ShortcutsHelp />
        <BoxComponent
          content={"A"}
          combo="shift a"
          description="Toggle component A color"
        />
        <BoxComponent
          content={"B"}
          combo="shift b"
          description="Toggle component B color"
        />
        <BoxComponent
          content={"C"}
          combo="shift c"
          description="Toggle component C color"
        />
      </ShortcutsContextProvider>
    </div>
  );
}
