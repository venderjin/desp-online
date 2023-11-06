import React, { useRef, useEffect, useState } from "react";
import "../CSS/Contents.css";

const Home = () => {
    //navBar 사이즈 설정
    const [contentsHeight, setContetnsHeight] = useState(100); // 초기 높이를 100으로 설정
    const [contentsWidth, setContentsWidth] = useState(100); // 초기 너비를 100으로 설정
    const contentsRef = useRef(null);

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

    const HomeBannerStyle = {
        height: contentsHeight * 0.2,
        backgroundColor: "skyblue",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    };
    const HomeInfoStyle = {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
    };
    const HomeAnnouncementStyle = {
        width: contentsWidth * 0.32,
    };
    const HomeAnnouncementText = {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        borderBottom: "1px solid white", // 아래 테두리를 흰색으로 설정
        marginBottom: contentsHeight * 0.01,
    };
    const HomeText = {
        paddingRight: contentsWidth * 0.015,
        color: "white", // 텍스트 색상을 흰색으로 설정
        fontSize: "1.1rem", // 텍스트 크기를 1.5rem으로 설정
    };
    const HomeAnnouncementBoxStyle = {
        marginBottom: contentsHeight * 0.01,
        height: contentsHeight * 0.15,
        backgroundColor: "rgba(255, 255, 255, 0.7",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        borderRadius: "5px",
        paddingLeft: contentsWidth * 0.01,
    };

    return (
        <div ref={contentsRef} className="contents">
            <div style={HomeBannerStyle}>
                <h1>DESP-ONLINE</h1>
            </div>
            <div style={HomeInfoStyle}>
                <div style={HomeAnnouncementStyle}>
                    <div style={HomeAnnouncementText}>
                        <p style={HomeText}>실시간 TOP3 랭킹</p>
                    </div>
                    <div style={HomeAnnouncementBoxStyle}>
                        <h3>1위</h3>
                    </div>
                    <div style={HomeAnnouncementBoxStyle}>
                        <h3>2위</h3>
                    </div>
                    <div style={HomeAnnouncementBoxStyle}>
                        <h3>3위</h3>
                    </div>
                </div>
                <div style={HomeAnnouncementStyle}>
                    <div style={HomeAnnouncementText}>
                        <p style={HomeText}>공지사항</p>
                    </div>
                    <div style={HomeAnnouncementBoxStyle}>
                        <h3>1위</h3>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
