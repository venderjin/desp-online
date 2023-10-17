import React, { useState, useEffect } from "react";
// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Home from "./Home";
import mainBackground from "./asset/mainMap4.png";
// import mainLogo from "./asset/desp-online logo.png";

const Main = () => {
    let cnt = 0;
    setInterval(() => console.log(++cnt), 2000);

    const [width, setWidth] = useState(window.innerWidth); // 화면 너비를 초기화
    const [height, setHeight] = useState(window.innerHeight); // 화면 높이를 초기화

    const handleResize = () => {
        setWidth(window.innerWidth); // 브라우저 창 너비가 변경될 때 너비를 업데이트
        setHeight(window.innerHeight); // 브라우저 창 높이가 변경될 때 높이를 업데이트
    };

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => {
            // cleanup
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const containerBackStyle = {
        backgroundColor: "#231C0D",
        display: "flex",
        justifyContent: "center", // 가로 중앙 정렬
        alignItems: "center", // 세로 중앙 정렬
        width: "100%",
        height: "100vh",
        overflow: "hidden",
    };

    const containerStyle = {
        width: width,
        height: height,
        filter: "blur(3px)", // 이미지에 5px 블러 효과 적용
        backgroundImage: `url(${mainBackground})`,
        backgroundPosition: "center",
        backgroundSize: "cover", // 이미지를
        overflowX: "auto", // 수평 스크롤을 자동으로 추가
        overflowY: "auto", // 수직 스크롤을 자동으로 추가
        zIndex: 1, // 이미지를 위로 올림
    };

    const containerCoverStyle = {
        position: "absolute",
        display: "flex",
        justifyContent: "center", // 가로 중앙 정렬
        alignItems: "center", // 세로 중앙 정렬
        width: width,
        height: height,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 2, // 이미지를 위로 올림
    };

    return (
        <div style={containerBackStyle}>
            <div style={containerStyle}></div>
            <div style={containerCoverStyle}>
                <h1 style={{ color: "white" }}>desp online</h1>
            </div>
        </div>
    );
};

export default Main;
