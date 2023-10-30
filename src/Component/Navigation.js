import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Navigation = () => {
    //navBar 높이 설정
    const [navHeight, setNavHeight] = useState(100); // 초기 높이를 100으로 설정
    const navRef = useRef(null);

    useEffect(() => {
        const updateNavHeight = () => {
            const newHeight = window.innerHeight; // 현재 브라우저 창의 높이
            setNavHeight(newHeight); // 높이 업데이트
        };

        // 컴포넌트가 마운트될 때 높이 설정
        updateNavHeight();

        // 브라우저 창의 크기가 변경될 때 높이 다시 설정
        window.addEventListener("resize", updateNavHeight);

        return () => {
            // 컴포넌트가 언마운트될 때 이벤트 리스너 삭제
            window.removeEventListener("resize", updateNavHeight);
        };
    }, []);
    console.log(navHeight / 6);
    const navBarStyle = {
        height: navHeight > 600 ? `${navHeight / 6}px` : "100px",
        borderBottom: "2px solid white", // 아래 테두리를 흰색으로 설정
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    };

    //nav 버튼 클릭 시 페이지 이동
    const buttons = [
        { label: "Announcement", path: "/Announcement" },
        { label: "Character", path: "/Character" },
        { label: "Home", path: "/" },
        { label: "Ranking", path: "/Ranking" },
        { label: "UserSearch", path: "/UserSearch" },
        { label: "Donation", path: "/Donation" },
    ];
    const navigate = useNavigate();

    return (
        <div ref={navRef} style={navBarStyle}>
            {buttons.map((button, index) => (
                <button key={index} onClick={() => navigate(button.path)}>
                    {button.label}
                </button>
            ))}
        </div>
    );
};

export default Navigation;
