import React from "react";
import Loadingimage from "./img/lightningbolt.png";
export default function Loading() {
  return (
    <div className="loading-box">
      <img src={Loadingimage} alt="" />
      <div>Loading...</div>
    </div>
  );
}
