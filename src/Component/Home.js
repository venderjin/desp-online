import React, { useRef, useEffect, useState } from "react";
import "../CSS/Contents.css";
import { Ranking, Announcement } from "../Constants/HomeConstants";
import SiteInfo from "./SiteInfo";
import banner from "../asset/banner.png";

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
        height: contentsWidth > 700 ? contentsWidth / 4 : contentsWidth / 3,
        width: contentsWidth > 700 ? contentsWidth / 1.5 : contentsWidth,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "green",
    };
    const HomeInfoStyle = {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        paddingLeft: contentsWidth * 0.01,
        paddingRight: contentsWidth * 0.01,
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
        height: contentsHeight > 700 ? contentsHeight * 0.12 : contentsHeight * 0.14,
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
                <img src={banner} alt="DESP-ONLINE" style={{ width: "100%", height: contentsWidth > 700 ? contentsWidth / 4.5 : contentsWidth / 3 }} />
            </div>
            <div style={HomeInfoStyle}>
                <div style={HomeAnnouncementStyle}>
                    <div style={HomeAnnouncementText}>
                        <p style={HomeText}>{Ranking.name}</p>
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
                        <p style={HomeText}>{Announcement.name}</p>
                    </div>
                    <div style={HomeAnnouncementBoxStyle}>
                        <h3>1위</h3>
                    </div>
                </div>
            </div>
            <SiteInfo width={contentsWidth} height={contentsHeight} />
        </div>
    );
};

export default Home;
