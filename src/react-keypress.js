import React, { useEffect, useContext, useReducer } from "react";
import keypress from "keypress.js";

const KeypressListener = new keypress.Listener();
const ShortcutsContext = React.createContext();

const ShortcutsReducer = (state, action) => {
  const { shortcuts } = state;

  switch (action.type) {
    case "register": {
      const { callback, combo, description, ref } = action;
      return {
        shortcuts: [...shortcuts, { callback, combo, description, ref }],
      };
    }

    case "unregister": {
      const { ref } = action,
        new_shortcuts = shortcuts.filter(({ ref: this_ref }) => {
          return ref !== this_ref;
        });
      return { shortcuts: new_shortcuts };
    }

    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

/**
 * It's a React component that wraps around the child component and provides the `ShortcutsContext` to any `Shortcuts` components nested within
 * @returns The `ShortcutsContext.Provider` component is being returned.
 */
const ShortcutsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ShortcutsReducer, {
    shortcuts: [],
  });

  return (
    <ShortcutsContext.Provider value={{ state, dispatch }}>
      {children}
    </ShortcutsContext.Provider>
  );
};
/**
 * When the user presses the key combination, call the callback function.
 * @returns null.
 */
const KeyboardShortcut = (props) => {
  const { combo, callback, description } = props,
    { dispatch } = useContext(ShortcutsContext);

  useEffect(() => {
    const ref = KeypressListener.simple_combo(combo, callback);
    dispatch({
      type: "register",
      combo,
      callback,
      description,
      ref,
    });
    return () => {
      KeypressListener.unregister_combo(ref);
      dispatch({ type: "unregister", ref });
    };
  }, []);

  return null;
};

/**
 * `useActiveShortcuts` returns the active shortcuts
 * @returns shortcuts as An array of Object.
 */
const useActiveShortcuts = () => {
  const { state } = useContext(ShortcutsContext);
  return state.shortcuts;
};

export { ShortcutsContextProvider, KeyboardShortcut, useActiveShortcuts };
