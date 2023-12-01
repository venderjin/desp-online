import React, { useState, useEffect, useRef } from "react";
import backEndUri from "../Constants/Constants";
import SiteInfo from "./SiteInfo";

const Ranking = () => {
    const [contentsHeight, setContetnsHeight] = useState(100); // 초기 높이를 100으로 설정
    const [contentsWidth, setContentsWidth] = useState(100); // 초기 너비를 100으로 설정
    const contentsRef = useRef(null); // 컨텐츠의 ref를 설정
    const [data, setData] = useState([]);

    useEffect(() => {
        const updateSize = () => {
            const newHeight = window.innerHeight; // 현재 브라우저 창의 높이
            const newWidth = window.innerWidth; // 현재 브라우저 창의 너비
            setContetnsHeight(newHeight); // 높이 업데이트
            setContentsWidth(newWidth); // 너비 업데이트
        };

        // 컴포넌트가 마운트될 때 사이즈 설정
        updateSize();

        // 브라우저 창의 크기가 변경될 때 사이즈 다시 설정
        window.addEventListener("resize", updateSize);

        return () => {
            // 컴포넌트가 언마운트될 때 이벤트 리스너 삭제
            window.removeEventListener("resize", updateSize);
        };
    }, []);

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

    const donationChargeContainer = {
        width: contentsWidth > 700 ? contentsWidth / 1.5 : contentsWidth,
        height: contentsHeight > 500 ? contentsHeight / 1.5 : contentsHeight,
        // paddingTop: contentsHeight > 500 ? contentsHeight * 0.05 : 25,
        marginTop: contentsHeight * 0.05,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        borderRadius: "20px",
        flexDirection: "column",
    };

    return (
        <div ref={contentsRef} className="contents">
            <div style={donationChargeContainer}>
                <button>X</button>
            </div>
            <SiteInfo width={contentsWidth} height={contentsHeight} />
        </div>
    );
};

export default Ranking;
