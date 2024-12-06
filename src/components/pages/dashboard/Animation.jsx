import React from "react";
import Lottie from "lottie-react";
import animationData from "../../../assets/animasi3.json";

function Animation() {
    return (
        <Lottie
            autoplay
            loop
            animationData={animationData}
        />
    );
}

export default Animation;
