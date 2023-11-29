import React, { useState, useEffect } from "react";
import backEndUri from "../Constants/Constants";

const Ranking = () => {
    const [data, setData] = useState([]);

    console.log(backEndUri.rankingPVP);
    const name = "dople_L";

    useEffect(() => {
        fetch(backEndUri.searchPlayer + name, {
            method: "GET",
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Network response was not ok");
                }
                return res.json();
            })
            .then((res) => {
                console.log("res type is", typeof res);
                console.log("res is", res);
                setData(res);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                // 에러 처리 또는 예외 처리를 여기에 추가할 수 있습니다.
            });
    }, []);

    return (
        <div className="contents" style={{ backgroundColor: "white" }}>
            <button>X</button>
            {/* <div>{data.levelRank.nickname}</div> */}
        </div>
    );
};

export default Ranking;
