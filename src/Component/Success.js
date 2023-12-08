import React, { useRef, useEffect, useState } from "react";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import paymentsKey from "../Constants/PaymentsConstants";
import { AiOutlineCheck } from "react-icons/ai";
import backEndUri from "../Constants/Constants";

export default function Success() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [contentsHeight, setContetnsHeight] = useState(100); // 초기 높이를 100으로 설정
    const [contentsWidth, setContentsWidth] = useState(100); // 초기 너비를 100으로 설정
    const contentsRef = useRef(null); // 컨텐츠의 ref를 설정
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const nickname = queryParams.get("nickname");
    const orderId = searchParams.get("orderId");
    const amount = searchParams.get("amount");
    const formattedAmount = new Intl.NumberFormat("ko-KR", { currency: "KRW" }).format(amount);

    //backEndUri
    const cashCharge = backEndUri.charge;
    const cashChargeLog = backEndUri.chargeLog;

    // cash charge
    async function cashChargeFunction() {
        const chargeData = {
            nick_name: nickname,
            amount: amount,
        };
        try {
            const response = await fetch(cashCharge, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json", // 요청 본문의 데이터 형식 설정 (JSON)
                },
                body: JSON.stringify(chargeData), // 데이터 객체를 JSON 문자열로 변환하여 요청 본문에 설정
            });

            if (!response.ok) {
                // 응답이 정상이 아닌 경우 오류 처리
                const errorData = await response.json(); // 오류 응답 데이터 파싱
                console.error("charge POST 요청 오류:", errorData);
                return;
            }

            const json = await response.json();
            console.log("charge POST 요청 성공", json);
        } catch (error) {
            // 오류가 발생한 경우
            console.error("charge POST 요청 오류:", error);
        }
    }

    // cash charge log
    async function cashChargeLogFunction() {
        const chargeLogData = {
            toss_order_number: orderId,
            nick_name: nickname,
            amount: amount,
        };
        try {
            // console.log("chargeLogData is", chargeLogData);
            const response = await fetch(cashChargeLog, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json", // 요청 본문의 데이터 형식 설정 (JSON)
                },
                body: JSON.stringify(chargeLogData), // 데이터 객체를 JSON 문자열로 변환하여 요청 본문에 설정
            });

            if (!response.ok) {
                // 응답이 정상이 아닌 경우 오류 처리
                const errorData = await response.json(); // 오류 응답 데이터 파싱
                console.error("log POST 요청 오류:", errorData);
                return;
            }

            const json = await response.json();
            console.log("log POST 요청 성공", json);
        } catch (error) {
            // 오류가 발생한 경우
            console.error("log POST 요청 오류:", error);
        }
    }

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

    useEffect(() => {
        const requestData = {
            orderId: searchParams.get("orderId"),
            amount: searchParams.get("amount"),
            paymentKey: searchParams.get("paymentKey"),
        };

        const secretKey = paymentsKey.secretKey;

        const encryptedSecretKey = `Basic ${btoa(secretKey + ":")}`;

        async function confirm() {
            const response = await fetch("https://api.tosspayments.com/v1/payments/confirm", {
                method: "POST",
                headers: {
                    Authorization: encryptedSecretKey,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestData),
            });

            const json = await response.json();

            if (!response.ok) {
                // TODO: 구매 실패 비즈니스 로직 구현
                // console.log("fail reason is", json);
                navigate(`/fail?code=${json.code}&message=${json.message}`);
                return;
            }

            // TODO: 구매 완료 비즈니스 로직 구현
            console.log("success ", json);
            cashChargeLogFunction();
            cashChargeFunction();
        }

        confirm();
    }, []);

    //css
    const donationChargeContainer = {
        width: contentsWidth > 700 ? contentsWidth / 1.5 : contentsWidth,
        height: contentsHeight > 500 ? contentsHeight / 2 : contentsHeight,
        marginTop: contentsHeight * 0.05,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        borderRadius: "20px",
        flexDirection: "column",
    };

    const successTitleContainer = {
        width: contentsWidth > 700 ? contentsWidth / 1.5 - contentsWidth * 0.08 : contentsWidth - contentsWidth * 0.08,
        height: contentsHeight > 500 ? contentsHeight / 4 : contentsHeight / 3,
        marginLeft: contentsWidth * 0.05,
        marginRight: contentsWidth * 0.05,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
        flexDirection: "column",
        borderBottom: "2px solid #372B2A", // 아래 테두리를 흰색으로 설정
    };

    const paymentsTitle = {
        fontSize: contentsWidth > 1100 ? "35px" : contentsWidth > 900 ? "30px" : contentsWidth > 700 ? "25px" : "20px", // 글자 크기 설정
        color: "#372B2A",
        fontWeight: "bold",
        margin: 0,
        marginTop: "0px",
        marginBottom: "5px",
        // backgroundColor: "white",
    };

    const successcontentsContainer = {
        width: contentsWidth > 700 ? contentsWidth / 1.5 - contentsWidth * 0.08 : contentsWidth - contentsWidth * 0.08,
        height: contentsHeight > 500 ? contentsHeight / 6 : contentsHeight / 3,
        marginLeft: contentsWidth * 0.05,
        marginRight: contentsWidth * 0.05,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        flexDirection: "row",
    };

    const sucessSubContents = {
        fontSize: contentsWidth > 1100 ? "20px" : contentsWidth > 900 ? "18px" : contentsWidth > 700 ? "16px" : "15px", // 글자 크기 설정
        color: "#575656",
        fontWeight: "bold",
        margin: 0,
        marginTop: "0px",
        marginBottom: "5px",
    };

    const sucessContents = {
        fontSize: contentsWidth > 1100 ? "20px" : contentsWidth > 900 ? "18px" : contentsWidth > 700 ? "16px" : "15px", // 글자 크기 설정
        color: "#372B2A",
        fontWeight: "bold",
        margin: 0,
        marginTop: "0px",
        marginBottom: "5px",
    };

    return (
        <div ref={contentsRef} className="contents">
            <div style={donationChargeContainer}>
                <div style={successTitleContainer}>
                    <AiOutlineCheck size={contentsWidth > 600 ? 60 : contentsWidth > 500 ? 50 : 40} color="#372B2A" />
                    <p style={paymentsTitle}>충전이 성공적으로 완료되었습니다!</p>
                </div>
                <div style={successcontentsContainer}>
                    <div>
                        <p style={sucessSubContents}>닉네임</p>
                        <p style={sucessSubContents}>결제 번호</p>
                        <p style={sucessSubContents}>결제 금액</p>
                    </div>
                    <div style={{ textAlign: "right" }}>
                        <p style={sucessContents}> {nickname}</p>
                        <p style={sucessContents}> {orderId}</p>
                        <p style={sucessContents}>{formattedAmount}원</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
