import React, {useState, useEffect, useRef} from "react";
import Card from "./Card";
import gsap from "gsap";

function Content3({top1, lastTop}) {
    const cardRef = useRef(null); 
    const [isInView, setIsInView] = useState(false); 

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true); 
                    observer.disconnect(); 
                }
            },
            { threshold: 0.1} 
        );

        if (cardRef.current) {
            observer.observe(cardRef.current); 
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if(isInView){
            gsap.fromTo(
                cardRef.current,
                { opacity: 0, y: 50 }, 
                { opacity: 1, y: 0, duration: 1, ease: "power3.out" } 
            );
        }
    }, [isInView]);

    return (
        <div className="sm:px-16 md:px-32 px-8 mt-24" ref={cardRef}>
            <p className="md:text-5xl text-3xl font-bold text-center tracking-wide text-primary-brown mb-12">Fun Facts</p>
            <ul className="space-y-8 ">
                <Card country={top1} desc={'largest'} />
                <Card country={lastTop} desc={'smallest'} />
            </ul>
        </div>
    );
}

export default Content3;
