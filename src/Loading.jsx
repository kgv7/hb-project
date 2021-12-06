import React from "react";
import Loadingimage from "./img/lightningbolt.png";
import "../static/loading.css"

export default function Loading() {
  return (
    <div className="loading-box">
      <img src={Loadingimage} alt="" />
      <div>Loading...</div>
    </div>
  );
}
