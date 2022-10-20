import React from "react";
import "./loadingComponent.css"
import leafOne from "../images/leaf1.png"
import leafTwo from "../images/leaf2.png"
import rcp from "../images/r.c.p.png"
export default function LoadingComponent() {
    return (
        <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 h-screen">
            <div className="sk-chase">
            <img className="sk-chase-dot" src={leafOne} alt="" />
            <img src={rcp} alt="" />
            <img className="sk-chase-dot" src={leafTwo} alt="" />
        </div>
        </div>
    );
}
