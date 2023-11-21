import React from "react";
import { useLocation } from "react-router-dom";

const Payments = () => {
    const location = useLocation();
    const { totalAmount } = location.state || {}; // Ensure there's a default in case state is undefined

    return (
        <div style={{ backgroundColor: "white" }}>
            <h1>토스 페이먼츠</h1>
            <h2>결제 금액: {totalAmount}원</h2>
        </div>
    );
};

export default Payments;
