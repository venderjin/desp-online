import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navigation from "./Navigation";
import Home from "./Home";
import Announcement from "./Announcement";
import Character from "./Character";
import Ranking from "./Ranking";
import UserSearch from "./UserSearch";
import Donation from "./Donation";
import Payments from "./Payments";

const Main = () => {
    //시간에 따라 배경화면 변경
    const [hour, setHour] = useState(new Date().getHours());

    const mainMap_night = "https://despbukkit.s3.ap-northeast-2.amazonaws.com/mainMap_night.jpg";
    const mainMap_daytime = "https://despbukkit.s3.ap-northeast-2.amazonaws.com/mainMap_daytime.jpg";
    const mainMap_evening = "https://despbukkit.s3.ap-northeast-2.amazonaws.com/mainMap_evening.jpg";

    useEffect(() => {
        const interval = setInterval(() => {
            const currentHour = new Date().getHours();
            setHour(currentHour);
        }, 10000); // 10초(10,000 밀리초)마다 실행

        return () => {
            clearInterval(interval);
        };
    }, []); // 빈 배열을 사용하여 이펙트가 초기 한 번만 실행되도록 설정
    const mainMap = hour >= 7 && hour < 16 ? mainMap_daytime : hour >= 16 && hour < 20 ? mainMap_evening : mainMap_night;

    //화면 크기에 따라 배경화면 크기 변경
    const [width, setWidth] = useState(window.innerWidth); // 화면 너비를 초기화
    const [height, setHeight] = useState(window.innerHeight); // 화면 높이를 초기화

    const handleResize = () => {
        setWidth(window.innerWidth); // 브라우저 창 너비가 변경될 때 너비를 업데이트
        setHeight(window.innerHeight); // 브라우저 창 높이가 변경될 때 높이를 업데이트
    };

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    //스타일 시트
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
        backgroundImage: `url(${mainMap})`,
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

    const contentLayoutStyle = {
        height: height,
        width: width > 700 ? width / 1.5 : width,
        // backgroundColor: "white",
    };

    return (
        <div style={containerBackStyle}>
            <div style={containerStyle}></div>
            <div style={containerCoverStyle}>
                <div style={contentLayoutStyle}>
                    <Router>
                        <Navigation />
                        <Routes>
                            <Route exact path="/" element={<Home />} />
                            <Route path="/Announcement" element={<Announcement />} />
                            <Route path="/Character" element={<Character />} />
                            <Route path="/Ranking" element={<Ranking />} />
                            <Route path="/UserSearch" element={<UserSearch />} />
                            <Route path="/Donation" element={<Donation />} />
                            <Route path="/Payments" element={<Payments />} />
                        </Routes>
                    </Router>
                </div>
            </div>
        </div>
    );
};

export default Main;
