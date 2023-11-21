import React, { useRef, useEffect, useState } from "react";
import SiteInfo from "./SiteInfo";
import cash from "../Constants/DonationConstans";

const Donation = () => {
    const [contentsHeight, setContetnsHeight] = useState(100); // 초기 높이를 100으로 설정
    const [contentsWidth, setContentsWidth] = useState(100); // 초기 너비를 100으로 설정
    const contentsRef = useRef(null); // 컨텐츠의 ref를 설정

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

    // Create a state for each donation amount, initializing each to 0
    const initialAmounts = Object.keys(cash).reduce((acc, key) => {
        acc[cash[key]] = 0;
        return acc;
    }, {});

    const [amounts, setAmounts] = useState(initialAmounts);

    // Function to update the amount for a specific donation
    const updateAmount = (cashAmount, increment) => {
        setAmounts((prevAmounts) => ({
            ...prevAmounts,
            [cashAmount]: increment ? prevAmounts[cashAmount] + 1 : Math.max(prevAmounts[cashAmount] - 1, 0),
        }));
    };

    // Function to calculate and format the total donation amount
    const calculateTotal = () => {
        const total = Object.entries(amounts).reduce((sum, [cashAmount, quantity]) => {
            return sum + parseInt(cashAmount) * quantity;
        }, 0);

        // Format the total amount with commas
        return total.toLocaleString();
    };
    const donationChargeContainer = {
        width: contentsWidth > 700 ? contentsWidth / 1.5 : contentsWidth,
        height: contentsHeight > 500 ? contentsHeight / 1.5 : contentsHeight,
        // paddingTop: contentsHeight > 500 ? contentsHeight * 0.05 : 25,
        marginTop: contentsHeight * 0.05,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        borderRadius: "20px",
        flexDirection: "column",
    };

    const donationTitleContainer = {
        // backgroundColor: "lightgrey",
        width: contentsWidth > 700 ? contentsWidth / 1.5 - contentsWidth * 0.08 : contentsWidth - contentsWidth * 0.08,
        height: contentsHeight > 500 ? contentsHeight / 10 : contentsHeight,
        marginLeft: contentsWidth * 0.05,
        marginRight: contentsWidth * 0.05,
        display: "flex",
        alignItems: "center",
        paddingLeft: contentsWidth * 0.03,
        // flexDirection: "row",
    };

    const donationAmountContainer = {
        // backgroundColor: "lightgrey",
        width: contentsWidth > 700 ? contentsWidth / 1.5 - contentsWidth * 0.08 : contentsWidth - contentsWidth * 0.08,
        height: contentsHeight > 500 ? contentsHeight / 2.5 : contentsHeight,
        marginLeft: contentsWidth * 0.05,
        marginRight: contentsWidth * 0.05,
        borderTop: "2px solid black", // 아래 테두리를 흰색으로 설정
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderBottom: "2px solid black", // 아래 테두리를 흰색으로 설정
        // paddingLeft: contentsWidth * 0.03,
    };

    const donationTotalAmountContainer = {
        // backgroundColor: "lightgrey",
        width: contentsWidth > 700 ? contentsWidth / 1.5 - contentsWidth * 0.08 : contentsWidth - contentsWidth * 0.08,
        height: contentsHeight > 500 ? contentsHeight / 10 : contentsHeight,
        marginLeft: contentsWidth * 0.05,
        marginRight: contentsWidth * 0.05,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        paddingLeft: contentsWidth * 0.03,
    };

    const donationTitle = {
        fontSize: contentsWidth > 1100 ? "23px" : contentsWidth > 900 ? "20px" : contentsWidth > 700 ? "17px" : "15px", // 글자 크기 설정
        fontWeight: "bold",
    };
    const cashLabelContainer = {
        // backgroundColor: "green",
        height: contentsHeight > 500 ? contentsHeight / 10 : contentsHeight,
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingLeft: contentsWidth * 0.02,
    };

    const cashLabelAmountContainer = {
        // backgroundColor: "yellow",
        height: contentsHeight > 500 ? contentsHeight / 10 : contentsHeight,
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        paddingRight: contentsWidth * 0.02,
    };

    const donationCashText = {
        fontSize: contentsWidth > 1100 ? "18px" : contentsWidth > 900 ? "16px" : contentsWidth > 700 ? "15px" : "13px", // 글자 크기 설정
    };

    const countbuttonStyle = {
        padding: "10px 25px",
        margin: "0 5px",
        backgroundColor: "#372B2A", // A nice shade of green
        color: "white",
        border: "none",
        borderRadius: "50px",
        cursor: "pointer",
        fontSize: contentsWidth > 1100 ? "18px" : contentsWidth > 900 ? "16px" : contentsWidth > 700 ? "15px" : "13px", // 글자 크기 설정
        outline: "none", // Remove the outline on focus
    };

    const donationTotalAmount = {
        // backgroundColor: "green",
        height: contentsHeight > 500 ? contentsHeight / 10 : contentsHeight,
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
    };

    const donationPaymentButtonContainer = {
        // backgroundColor: "yellow",
        height: contentsHeight > 500 ? contentsHeight / 10 : contentsHeight,
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        marginRight: contentsWidth * 0.04,
    };

    const paymentsbuttonStyle = {
        padding: "10px 55px",
        margin: "0 5px",
        backgroundColor: "#372B2A", // A nice shade of green
        color: "white",
        border: "none",
        borderRadius: "50px",
        cursor: "pointer",
        fontSize: contentsWidth > 1100 ? "20px" : contentsWidth > 900 ? "18px" : contentsWidth > 700 ? "15px" : "13px", // 글자 크기 설정
        outline: "none", // Remove the outline on focus
    };

    return (
        <div ref={contentsRef} className="contents">
            <div style={donationChargeContainer}>
                <div style={donationTitleContainer}>
                    <p style={donationTitle}>충전하실 금액을 선택해주세요.</p>
                </div>
                <div style={donationAmountContainer}>
                    <div>
                        {Object.entries(cash).map(([cashLabel, cashAmount], index, array) => (
                            <div
                                key={cashAmount}
                                style={{
                                    display: "flex",
                                    width: contentsWidth > 700 ? contentsWidth / 1.5 - contentsWidth * 0.08 : contentsWidth - contentsWidth * 0.08,
                                    justifyContent: "space-between",
                                    borderBottom: index === array.length - 1 ? "none" : "2px solid grey", // Remove border if last item
                                }}
                            >
                                <div style={cashLabelContainer}>
                                    <p style={donationCashText}>{cashLabel}</p>
                                </div>
                                <div style={cashLabelAmountContainer}>
                                    <div style={{ paddingRight: contentsWidth * 0.01 }}>
                                        <button style={countbuttonStyle} onClick={() => updateAmount(cashAmount, false)}>
                                            -
                                        </button>
                                    </div>
                                    <p style={donationCashText}>{amounts[cashAmount]}</p>
                                    <div style={{ paddingLeft: contentsWidth * 0.01 }}>
                                        <button style={countbuttonStyle} onClick={() => updateAmount(cashAmount, true)}>
                                            +
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div style={donationTotalAmountContainer}>
                    <div style={donationTotalAmount}>
                        <p style={donationTitle}>총 충전금액 : {calculateTotal()}원</p>
                    </div>
                    <div style={donationPaymentButtonContainer}>
                        <button style={paymentsbuttonStyle}>결제</button>
                    </div>
                </div>
            </div>
            <SiteInfo width={contentsWidth} height={contentsHeight} />
        </div>
    );
};

export default Donation;
