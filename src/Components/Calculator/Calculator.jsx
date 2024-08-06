import React, { useState } from 'react';
import styles from './Calculator.module.css';

function Calculator() {
    const [data, setData] = useState('');
    const [value, setValue] = useState('');
    const [numArray, setNumArray] = useState([]);
    const [opArray, setOpArray] = useState([]);
    const [ans,setAns]=useState('')
    const handleNumber = (e) => {
        setData((prev) => prev + e.target.value);
        setValue((prev) => prev + e.target.value);
    };

    const handleOperation = (op) => {
        if (value !== '') {
            setData((prev) => prev + op);
            setNumArray((prev) => [...prev, parseFloat(value)]);
            setOpArray((prev) => [...prev, op]);
            setValue('');
        }
    };

    const handleValue = () => {
        if(data==''){
            setAns('Error')

        }
        if (value !== '') {
            const numArr = [...numArray, parseFloat(value)];
            const opArr = [...opArray];
            const result = evaluateExpression(numArr, opArr);
            setAns(result.toString());
            setValue(result.toString());
            setNumArray([]);
            setOpArray([]);
        }
    };

    const evaluateExpression = (numbers, operators) => {
      
         const applyOperation = (a, b, operator) => {
            switch (operator) {
                case '+': return a + b;
                case '-': return a - b;
                case '*': return a * b;
                case '/': return a / b;
                default: return 0;
            }
        };

        let newNumbers = [];
        let newOperators = [];

        for (let i = 0; i < operators.length; i++) {
            const operator = operators[i];
            const currentNumber = numbers[i];

            if (operator === '*' || operator === '/') {
                const nextNumber = numbers[i + 1];
                const result = applyOperation(currentNumber, nextNumber, operator);
                numbers[i + 1] = result;
            }
            else {
                newNumbers.push(currentNumber);
                newOperators.push(operator);
            }
        }
        newNumbers.push(numbers[numbers.length - 1]);
        let result = newNumbers[0];
        for (let i = 0; i < newOperators.length; i++) {
            result = applyOperation(result, newNumbers[i + 1], newOperators[i]);
        }

        return result;
    };

    const handleClear = () => {
        setData('');
        setValue('');
        setAns('')
        setNumArray([]);
        setOpArray([]);
    };

    return (
        <div style={{ display: 'flex', textAlign: 'center', justifyContent: 'space-between', alignItems: "center", flexDirection: "column" }}>
            <h1>React Calculator</h1>
            <input type='text' style={{ height: '30px', width: '20rem' }} value={data} readOnly />
            <p style={{fontSize:'20px'}}>{ans}</p>
            <div className={styles.gridcontainer}>
                <button className={styles.item} onClick={handleNumber} value={7}>7</button>
                <button className={styles.item} onClick={handleNumber} value={8}>8</button>
                <button className={styles.item} onClick={handleNumber} value={9}>9</button>
                <button className={styles.item} onClick={() => handleOperation('+')}>+</button>
                <button className={styles.item} onClick={handleNumber} value={4}>4</button>
                <button className={styles.item} onClick={handleNumber} value={5}>5</button>
                <button className={styles.item} onClick={handleNumber} value={6}>6</button>
                <button className={styles.item} onClick={() => handleOperation('-')}>-</button>
                <button className={styles.item} onClick={handleNumber} value={1}>1</button>
                <button className={styles.item} onClick={handleNumber} value={2}>2</button>
                <button className={styles.item} onClick={handleNumber} value={3}>3</button>
                <button className={styles.item} onClick={() => handleOperation('*')}>*</button>
                <button className={styles.item} onClick={handleClear}>C</button>
                <button className={styles.item} onClick={handleNumber} value={0}>0</button>
                <button className={styles.item} onClick={handleValue}>=</button>
                <button className={styles.item} onClick={() => handleOperation('/')}>/</button>
            </div>
        </div>
    );
}

export default Calculator;
