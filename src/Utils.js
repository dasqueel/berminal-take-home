import React from "react";
import "./index.css";

// set the types and rules of the coin object
export const cleanCoinData = coin => {
  // update circulation attribute to an int
  coin.circulation = coin.circulation.replace(/[^\d,.-]/g, '');
};

export const Tips = () =>
  <div style={{ textAlign: "center" }}>
    <em>Tip: Hold shift when sorting to multi-sort!</em>
  </div>;