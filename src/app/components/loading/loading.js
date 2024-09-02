import React from "react";
import './loading.css';

export default function Loading() {
  return (
    <div className="loader">
      <div className="circle">
        <div className="dot" />
        <div className="outline" />
      </div>
      <div className="circle">
        <div className="dot" />
        <div className="outline" />
      </div>
      <div className="circle">
        <div className="dot" />
        <div className="outline" />
      </div>
      <div className="circle">
        <div className="dot" />
        <div className="outline" />
      </div>
    </div>
  );
}
