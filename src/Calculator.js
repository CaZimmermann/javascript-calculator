import React, { useState } from 'react';

const Calculator = () => {
    const [current, setCurrent] = useState(''); // answer
    const [history, setHistory] = useState(''); // expression
    const et = history.trim();  

const isOperator = (symbol) => {
return /[*/+-]/.test(symbol);
}

const buttonPress = (value) => {
  if (value === "clear") {
    setCurrent("");
    setHistory("0");
  } else if (isOperator(value)) {
    setHistory(et + " " + value + " ");
  } else if (value === "=") {
    calculate();
  } else if (value === "0") {
    if(history.charAt(0) !== "0") {
      setHistory(history + value);
    }
  } else if ( value === ".") {
    const lastNumber = history.split(/[-+/*]/g).pop();
    if (lastNumber?.includes(".")) return;
    setHistory(history + value);
  } else if( value === "delete") {
    const lastPartIndex = et.lastIndexOf(" ");
    if (lastPartIndex !== -1) {
      const newHistory = et.substring(0, lastPartIndex).trim();
      setHistory(newHistory);
    } else {
      setHistory("");
    }
  } else {
    if (history.charAt(0) === "0") {
      setHistory(history.slice(1) + value);
    } else {
      setHistory(history + value);
    }
  }

}

const calculate = () => {
  if (isOperator(et.charAt(et.length - 1))) return;
  const parts = et.split(" ");
  const newParts = [];

  for (let i = parts.length - 1; i >= 0; i--) {
    if (["*", "/", "+"].includes(parts[i]) && isOperator(parts[i - 1])) {
      newParts.unshift(parts[i]);
      let j = 0;
      let k = i - 1;
      while (isOperator(parts[k])) {
        k--;
        j++;
      }
      i -= j;
     } else {
      newParts.unshift(parts[i]);
     }
  }
  const newHistory = newParts.join(" ");
  if (isOperator(newHistory.charAt(0))) {
   setCurrent(eval(current + newHistory));
  } else {
    setCurrent(eval(newHistory));
  }
  setHistory("");
} ;
 
  return (
    <div className="calculator">
      <div id="display" className="display">
        <div className="history">{history}</div>
        <div className="current">{current}</div>
      </div>
      <button id='clear' onClick={() => buttonPress("clear")} className="clear-button span-two">AC</button>
      <button id='delete' onClick={() => buttonPress("delete")} className='delete-button'>DEL</button>
      <button id='divide' onClick={() => buttonPress("/")} className='operator'>/</button>
      <button id='one' onClick={() => buttonPress("1")} className="number">1</button>
      <button id='two' onClick={() => buttonPress("2")} className="number">2</button>
      <button id='three' onClick={() => buttonPress("3")} className="number">3</button>
      <button id='multiply' onClick={() => buttonPress("*")} className='operator'>*</button>
      <button id='four' onClick={() => buttonPress("4")} className="number">4</button>
      <button id='five' onClick={() => buttonPress("5")} className="number">5</button>
      <button id='six' onClick={() => buttonPress("6")} className="number">6</button>
      <button id='add' onClick={() => buttonPress("+")} className='operator'>+</button>
      <button id='seven' onClick={() => buttonPress("7")} className="number">7</button>
      <button id='eight' onClick={() => buttonPress("8")} className="number">8</button>
      <button id='nine' onClick={() => buttonPress("9")} className="number">9</button>
      <button id='subtract' onClick={() => buttonPress("-")} className='operator'>-</button>
      <button id='decimal' onClick={() => buttonPress(".")} className="number">.</button>
      <button id='zero' onClick={() => buttonPress("0")} className="number">0</button>
      <button id='equals' onClick={() => buttonPress("=")} className="equal-button span-two">=</button>
    </div>
  );
};

export default Calculator;