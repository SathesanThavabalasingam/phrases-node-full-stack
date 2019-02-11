import * as React from "react";
import * as ReactDOM from "react-dom";

import { List } from "./components/List";

ReactDOM.render(
    <List compiler="TypeScript" framework="React" />,
    document.getElementById("example")
);
