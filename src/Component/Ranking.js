import React, { useState, useEffect } from "react";
import backEndUri from "../Constants/Constants";

const Ranking = () => {
    const [data, setData] = useState([]);

    // console.log(backEndUri.rankingLevel);

    useEffect(() => {
        fetch(backEndUri.rankingLevel, {
            method: "GET",
        })
            .then((res) => res.json())
            .then((res) => {
                console.log("res is", res);
                setData(res);
            });
    }, []);

    return (
        <div className="contents" style={{ backgroundColor: "white" }}>
            <h1>asdasd</h1>/<button>X</button>
        </div>
    );
};

export default Ranking;
