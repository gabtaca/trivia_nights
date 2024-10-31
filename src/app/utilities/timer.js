// Timer.js
import React, { useState, useEffect, useRef } from 'react';

const Timer = () => {
    const [timer, setTimer] = useState("00:00:00");
    const timerRef = useRef(null);

    const getTimeRemaining = (endTime) => {
        const total = Date.parse(endTime) - Date.parse(new Date());
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        const hours = Math.floor((total / 1000 / 60 / 60) % 24);
        return {
            total,
            hours,
            minutes,
            seconds,
        };
    };

    const startTimer = (endTime) => {
        let { total, hours, minutes, seconds } = getTimeRemaining(endTime);
        if (total >= 0) {
            setTimer(
                `${hours > 9 ? hours : "0" + hours}:${minutes > 9 ? minutes : "0" + minutes}:${seconds > 9 ? seconds : "0" + seconds}`
            );
        }
    };

    const clearTimer = (endTime) => {
        setTimer("00:00:10");
        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = setInterval(() => startTimer(endTime), 1000);
    };

    const getDeadTime = () => {
        let deadline = new Date();
        deadline.setSeconds(deadline.getSeconds() + 10);
        return deadline;
    };

    useEffect(() => {
        clearTimer(getDeadTime());
        return () => clearInterval(timerRef.current); // Nettoie l'intervalle en cas de démontage du composant
    }, []);

    return (
        <div className="timer flex gap-5 text-white font-montserrat items-center text-[24px] ">
            <h2>{timer}</h2>
        </div>
    );
};

export default Timer;
