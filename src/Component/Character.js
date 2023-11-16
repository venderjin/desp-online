import React, { useRef, useEffect, useState } from "react";
import SiteInfo from "./SiteInfo";
import Modal from "react-modal";

import { CharacterImgSrc_1, CharacterImgSrc_2, CharacterImgSrc_3 } from "../Constants/CharacterConstants";

const Character = () => {
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

    const [hoveredCharacter, setHoveredCharacter] = useState(null);
    const handleMouseEnter = (characterName) => {
        setHoveredCharacter(characterName);
    };
    const handleMouseLeave = () => {
        setHoveredCharacter(null);
    };

    const [modalOpen, setModalOpen] = useState(false);
    const [openCharacter, setOpenCharacter] = useState(null); // 캐릭터 이름을 저장할 상태 변수

    const openModal = (clickedCharacterName) => {
        setModalOpen(true);
        setOpenCharacter(clickedCharacterName); // 캐릭터 이름 저장
    };
    const closeModal = () => {
        setModalOpen(false);
    };

    //css
    const characterImgLayout = {
        paddingTop: contentsHeight > 500 ? contentsHeight * 0.05 : 25,
        // backgroundColor: "red",
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
    };

    const isHovered = {
        filter: "brightness(20%)",
        transitionDuration: "1s",
        transitionTimingFunction: "ease",
        transform: "scale(1.2)",
        transformOrigin: "center",
    };

    const isUnHovered = {
        filter: "none",
        transitionDuration: "1s",
        transitionTimingFunction: "ease",
    };

    const isTextHovered = {
        position: "absolute",
        top: "30%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        color: "white",
        opacity: 1,
        transitionDuration: "1s",
        transitionTimingFunction: "ease",
        fontSize: contentsWidth > 700 ? contentsWidth * 0.013 : 10,
        fontWeight: "bold",
    };

    const isTextUnHovered = {
        position: "absolute",
        top: "30%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        color: "white",
        opacity: 0,
        transitionDuration: "1s",
        fontSize: contentsWidth > 700 ? contentsWidth * 0.013 : 10,
        fontWeight: "bold",
        transitionTimingFunction: "ease",
    };

    return (
        <div ref={contentsRef} className="contents">
            <div style={{ ...characterImgLayout, textAlign: "center" }}>
                {Object.keys(CharacterImgSrc_1).map((characterName) => (
                    <div
                        style={{ position: "relative", overflow: "hidden" }}
                        class="img_box"
                        key={characterName}
                        onMouseEnter={() => handleMouseEnter(characterName)}
                        onMouseLeave={handleMouseLeave}
                    >
                        <div class="img_box__overlay" onClick={() => openModal(characterName)}>
                            <img
                                src={CharacterImgSrc_1[characterName]}
                                alt={characterName}
                                width={"90%"}
                                height={"100%"}
                                style={hoveredCharacter === characterName ? isHovered : isUnHovered}
                            />
                        </div>
                        <p style={hoveredCharacter === characterName ? isTextHovered : isTextUnHovered}>{characterName}</p>
                    </div>
                ))}
            </div>
            <div style={{ ...characterImgLayout, textAlign: "center" }}>
                {Object.keys(CharacterImgSrc_2).map((characterName) => (
                    <div
                        style={{
                            position: "relative",
                            overflow: "hidden",
                        }}
                        class="img_box"
                        key={characterName}
                        onMouseEnter={() => handleMouseEnter(characterName)}
                        onMouseLeave={handleMouseLeave}
                    >
                        <div class="img_box__overlay">
                            <img
                                src={CharacterImgSrc_2[characterName]}
                                alt={characterName}
                                width={"90%"}
                                height={"100%"}
                                style={{
                                    ...(hoveredCharacter === characterName && characterName !== "EMPTY" ? isHovered : isUnHovered),
                                    opacity: characterName === "EMPTY" ? 0 : 1,
                                }}
                            />
                        </div>
                        <p style={hoveredCharacter === characterName && characterName !== "EMPTY" ? isTextHovered : isTextUnHovered}>
                            {characterName === "UNKNOWN1" ? "Comming Soon..." : characterName}
                        </p>
                    </div>
                ))}
            </div>
            <div style={{ ...characterImgLayout, textAlign: "center" }}>
                {Object.keys(CharacterImgSrc_3).map((characterName) => (
                    <div
                        style={{ position: "relative", overflow: "hidden" }}
                        class="img_box"
                        key={characterName}
                        onMouseEnter={() => handleMouseEnter(characterName)}
                        onMouseLeave={handleMouseLeave}
                    >
                        <div class="img_box__overlay">
                            <img
                                src={CharacterImgSrc_3[characterName]}
                                alt={characterName}
                                width={"90%"}
                                height={"100%"}
                                style={hoveredCharacter === characterName ? isHovered : isUnHovered}
                            />
                        </div>
                        <p style={hoveredCharacter === characterName ? isTextHovered : isTextUnHovered}>Comming Soon...</p>
                    </div>
                ))}
            </div>
            <SiteInfo width={contentsWidth} height={contentsHeight} />
        </div>
    );
};

export default Character;
