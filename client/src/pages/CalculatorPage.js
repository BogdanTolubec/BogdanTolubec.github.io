import React from "react";
import Calculator from "../components/StakingCalculator/Calculator";
import "./PagesStyles/CalculatorPageStyle.css"

const CalculatorPage = () => {
    return(
        <div className = "calculator_page_wrapper">
            <Calculator/>
        </div>
    )
}

export default CalculatorPage