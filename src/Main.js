import React, { useState, useEffect } from "react";
import Home from "./Home";

const Main = () => {
    //동적UI 구성을 위한 상태관리
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

    //메뉴 Tab 구성
    const [currnetTab, setCurrentTab] = useState(0);

    // const menuArr = [
    //     { name: "공지사항", content: <AdminMemberList /> },
    //     { name: "캐릭터 가이드", content: <AdimWdList /> },
    //     { name: "홈", content: <AdminMemberList /> },
    //     { name: "랭킹", content: <AdminMemberList /> },
    //     { name: "유저검색", content: <AdminMemberList /> },
    //     { 후원: "커뮤니티", content: <AdminMemberList /> },
    // ];

    const selectMenuHandler = (index: any) => {
        setCurrentTab(index);
    };

    // useEffect(() => {
    //     console.log(width, height);
    // }, [width, height]);

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
        width: width > 1000 ? width / 1.5 : width,
        // backgroundColor: "red",
    };

    const tabMenuStyle = {
        height: height / 7,
        width: width > 1000 ? width / 1.5 : width,
        borderBottomColor: "white",
        borderBottom: "2px solid white",
        justifyContent: "center", // 가로 중앙 정렬
        alignItems: "center", // 세로 중앙 정렬
    };

    return (
        <div style={containerBackStyle}>
            <div style={containerStyle}></div>
            <div style={containerCoverStyle}>
                <div style={contentLayoutStyle}>
                    <div style={tabMenuStyle}>
                        <h1>메뉴바</h1>
                    </div>
                    <Home />
                </div>
            </div>
        </div>
    );
};

export default Main;
