import React, { useState, useRef, useEffect } from "react";
import { announcementIndex } from "../Constants/AnnouncementConstants";
import SiteInfo from "./SiteInfo";

const Announcement = () => {
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

    const [isFocusedAnnouncement, setIsFocusedAnnouncement] = useState(announcementIndex.server); // 현재 포커스된 페이지를 추적하는 상태

    //css
    const indexContainerStyle = {
        width: contentsWidth > 700 ? contentsWidth / 1.5 - contentsWidth * 0.01 : contentsWidth - contentsWidth * 0.01,
        marginLeft: contentsWidth * 0.01,
        marginRight: contentsWidth * 0.01,
        display: "flex",
        flexDirection: "row",
        marginTop: contentsHeight * 0.02,
        // backgroundColor: "skyblue",
        alignItems: "center",
        justifyContent: "center",
    };
    const announcementContainerStyle = {
        width: contentsWidth > 700 ? contentsWidth / 1.5 : contentsWidth,
        backgroundColor: "skyblue",
        marginLeft: contentsWidth * 0.01,
        marginRight: contentsWidth * 0.01,
        zIndex: isFocusedAnnouncement === announcementIndex.server ? 1 : 0,
    };
    const tutorialContainerStyle = {
        width: contentsWidth > 700 ? contentsWidth / 1.5 : contentsWidth,
        backgroundColor: "skyblue",
        marginLeft: contentsWidth * 0.01,
        marginRight: contentsWidth * 0.01,
    };
    const indexStyle = {
        width: contentsWidth > 700 ? contentsWidth / 3 - contentsWidth * 0.01 : contentsWidth / 2 - contentsWidth * 0.01,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderBottom: "1px solid grey", // 아래 테두리를 흰색으로 설정
        borderTopLeftRadius: "30px", // 윗쪽 왼쪽 모서리를 둥글게 설정
        borderTopRightRadius: "30px", // 윗쪽 오른쪽 모서리를 둥글게 설정
    };
    const indexText = {
        color: "black", // 텍스트 색상을 흰색으로 설정
        fontSize: contentsWidth > 1100 ? "25px" : contentsWidth > 900 ? "22px" : contentsWidth > 700 ? "19px" : "15px", // 글자 크기 설정
    };

    return (
        <div ref={contentsRef} className="contents">
            <div style={indexContainerStyle}>
                <div
                    className={announcementIndex.server}
                    style={{
                        ...indexStyle,
                        backgroundColor: isFocusedAnnouncement === announcementIndex.server ? "rgba(255, 255, 255, 0.7)" : "rgba(150, 150, 150, 0.7)",
                    }}
                    onClick={() => {
                        setIsFocusedAnnouncement(announcementIndex.server);
                    }}
                >
                    <p style={indexText}>서버 공지사항</p>
                </div>
                <div
                    className={announcementIndex.tutorial}
                    style={{
                        ...indexStyle,
                        backgroundColor: isFocusedAnnouncement === announcementIndex.tutorial ? "rgba(255, 255, 255, 0.7)" : "rgba(150, 150, 150, 0.7)",
                    }}
                    onClick={() => {
                        setIsFocusedAnnouncement(announcementIndex.tutorial);
                    }}
                >
                    <p style={indexText}>튜토리얼</p>
                </div>
            </div>
            <div style={announcementContainerStyle}>
                <h1>서버 공지사항</h1>
            </div>
            <div style={tutorialContainerStyle}>
                <h1>튜토리얼</h1>
            </div>
            <SiteInfo width={contentsWidth} height={contentsHeight} />
        </div>
    );
};

export default Announcement;
