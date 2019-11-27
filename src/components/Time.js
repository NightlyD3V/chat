import React, { useState, useEffect } from 'react';

function Time(props) {
    const [time, setTime] = useState();

    useEffect(() => {
        const date = new Date().toLocaleTimeString();
        setTime(date);
        setInterval(() => tick(), 1000);
    }, []);

    function tick() {
        setTime(new Date().toLocaleTimeString());
    }

    return (
        <div style={{ display: 'flex', alignItems: 'center', marginRight: "20px"}}>
            <h3 style={{ color: "white" }}>{time}</h3>
            {props.connection === 0 ? '🟡' : '🟢'}
        </div>
    )
}

export default Time;