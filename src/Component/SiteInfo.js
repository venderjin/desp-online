import React, { useState } from "react";
import SiteInfoConstants from "../Constants/SiteInfoConstants";
import { SocialIcon } from "react-social-icons";

const SiteInfo = () => {
    const [isHoveringDiscord, setIsHoveringDiscord] = useState(false);

    const handleMouseOver_Discord = () => {
        setIsHoveringDiscord(true);
    };
    const handleMouseOut_Discord = () => {
        setIsHoveringDiscord(false);
    };

    const discord_color = isHoveringDiscord ? "#5865f2" : "gray";

    const SiteInfo = {
        width: "100%",
        color: "grey", // 텍스트 색상을 흰색으로 설정
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        marginTop: "4rem",
        paddingTop: "1rem",
        paddingLeft: "1rem",
        marginBottom: "3rem",
        borderTop: "1px solid white", // 아래 테두리를 흰색으로 설정
    };

    return (
        <div style={SiteInfo}>
            <SocialIcon
                url="https://discord.gg/desponline"
                onMouseOver={handleMouseOver_Discord}
                onMouseOut={handleMouseOut_Discord}
                target="_blank"
                bgColor={discord_color}
                style={{ height: 30, width: 30 }}
            />
            <div>
                <p style={{ textAlign: "left" }}>
                    상호명 : {SiteInfoConstants.name} | 대표 : {SiteInfoConstants.representative}
                    <br />✉ {SiteInfoConstants.email} | ☎ {SiteInfoConstants.tell}
                    <br />
                    사업자등록번호 : {SiteInfoConstants.registrationNo} | 통신판매업신고번호 : {SiteInfoConstants.mailOrderRegistrationNo}
                    <br />
                    {SiteInfoConstants.address}
                    <br />
                    {SiteInfoConstants.copyright}
                </p>
            </div>
        </div>
    );
};

export default SiteInfo;
