import React, { useRef, useEffect, useState } from "react";
import "../CSS/Contents.css";
import SiteInfo from "./SiteInfo";

const UserSearch = () => {
    const [contentsHeight, setContetnsHeight] = useState(100); // 초기 높이를 100으로 설정
    const [contentsWidth, setContentsWidth] = useState(100); // 초기 너비를 100으로 설정
    const contentsRef = useRef(null);

    const [search, setSearch] = useState("");
    const onChange = (e) => {
        setSearch(e.target.value);
    };
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

    const userSearchBarLayout = {
        // backgroundColor: "green",
        height: contentsHeight > 500 ? contentsHeight * 0.13 : 65,
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
    };

    const userSearchBar = {
        width: contentsWidth > 700 ? contentsWidth * 0.5 : 350,
        height: contentsHeight > 500 ? contentsHeight * 0.08 : 40,
        backgroundColor: "transparent",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderBottom: "1px solid white", // 아래 테두리를 흰색으로 설정
    };
    return (
        <div ref={contentsRef} className="contents">
            <div style={userSearchBarLayout}>
                <input type="text" value={search} onChange={onChange} style={userSearchBar} placeholder="유저 닉네임을 검색해주세요" />
            </div>
            {/* <div>유저 검색확인</div> */}
            <SiteInfo width={contentsWidth} height={contentsHeight} />
        </div>
    );
};

export default UserSearch;
