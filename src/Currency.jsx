import React from "react";

export default function Currency(props) {
  const {
    currencyOptions,
    selectedCurrency,
    onchangeCurrency,
    amount,
    onChangeAmount,
  } = props;
  return (
    <div>
      <input type="number" className="input" value={amount} onChange={onChangeAmount}/>
      <select value={selectedCurrency} onChange={onchangeCurrency}>
        {currencyOptions.map((option) => {
          <option value={option}>{option}</option>;
        })}
      </select>
    </div>
  );
}
