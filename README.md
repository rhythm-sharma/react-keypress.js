# React Keypress js

> This is the library to Bind Keyboard shortcuts to react components - Uses keypress.js under the hood

Keypress is an input capture library which can be used to capture combination of keys in a simple way.

## Usage

Lets say that you want to fire a function when the user press `shift + enter + a`:

```javascript
import {
  ShortcutsContextProvider,
  KeyboardShortcut,
  useActiveShortcuts,
} from "./react-keypress";

export default function App() {
  // useActiveShortcuts hook contains the active shortcuts
  let activeShortcuts = useActiveShortcuts();

  return (
    <ShortcutsContextProvider>
      <div>
        Component A
        <KeyboardShortcut
          combo="shift a"
          description="description about shortcut"
          callback={() => {
            // Write the code for callback
          }}
        />
      </div>
    </ShortcutsContextProvider>
  );
}
```

## API

#### < ShortcutsContextProvider />

```
 It's a React component that wraps around the child component and provides the `ShortcutsContext` to any `Shortcuts` components nested within.
```

#### < KeyboardShortcut />

```
When the user presses the key combination, call the callback function.
```

#### useActiveShortcuts()

```
`useActiveShortcuts` is a hook that returns the active shortcuts
```
