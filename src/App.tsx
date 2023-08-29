import "./App.css";

import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live";

import * as styled from "@slimr/styled";
import { useEffect } from "react";

function App() {
  const initialCode =
    new URL(location.href).searchParams.get("code") ??
    "<>\n<H1>Hello World!</H1>\n</>";

  useEffect(() => {
    const keyUpListener = () => {
      const code = document.querySelector("pre")?.innerText ?? "";
      const url = new URL(location.href);
      url.searchParams.set("code", code);
      window.history.pushState(null, "", url.toString());
    };
    addEventListener("keyup", keyUpListener);
    return () => removeEventListener("keyup", keyUpListener);
  }, []);

  return (
    <>
      <h1 style={{ textAlign: "center" }}>React Playground</h1>
      <LiveProvider code={initialCode} scope={styled}>
        <div
          style={{
            backgroundColor: "gray",
            border: "1px solid gray",
            borderRadius: "8px",
            display: "grid",
            gap: "1px",
            gridTemplateColumns: "1fr 1fr",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              backgroundColor: "var(--background-color)",
            }}
          >
            <LiveEditor
              style={{ backgroundColor: "rgb(1, 22, 39)", minHeight: 200 }}
            />
            <LiveError />
          </div>
          <div
            style={{
              backgroundColor: "var(--background-color)",
            }}
          >
            <LivePreview />
          </div>
        </div>
      </LiveProvider>
    </>
  );
}

export default App;
