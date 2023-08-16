import React, {FormEvent, ChangeEvent, useState} from 'react';

import '../../index.scss';

interface UserInputProps {
   onCalculate(userInput: any): any;
   onHideResults(flag: boolean): void;
}

const defaultInput = {
    "current-savings": 10000,
    "yearly-contribution": 1500,
    "expected-return": 5,
    "duration": 10
}

const UserInput = ({onCalculate, onHideResults}: UserInputProps) => {
    const [userInput, setUserInput] = useState(defaultInput);

    const submitHandler = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        onHideResults(false);
        onCalculate(userInput);
    }

    const resetHandler = (): void => {
        onHideResults(true);
        setUserInput(defaultInput);
    }

    const inputHandler = (id: string, value: string) => {
       setUserInput((prevInputs) => {
            return {
                ...prevInputs,
                [id]: value
            }
        });
    }

    return (
        <form onSubmit={submitHandler} className="form">
            <div className="input-group">
              <p>
                <label htmlFor="current-savings">Current Savings ($)</label>
                <input onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    inputHandler("current-savings", event.target.value)}
                    value={userInput["current-savings"]}
                    type="number" 
                    id="current-savings" />
              </p>
              <p>
                <label htmlFor="yearly-contribution">Yearly Savings ($)</label>
                <input onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    inputHandler("yearly-contribution", event.target.value)}
                    value={userInput["yearly-contribution"]}
                    type="number" 
                    id="yearly-contribution" />
              </p>
            </div>
            <div className="input-group">
              <p>
                <label htmlFor="expected-return">
                  Expected Interest (%, per year)
                </label>
                <input onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    inputHandler("expected-return", event.target.value)}
                    value={userInput["expected-return"]}
                    type="number" 
                    id="expected-return" />
              </p>
              <p>
                <label htmlFor="duration">Investment Duration (years)</label>
                <input onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    inputHandler("duration", event.target.value)}
                    value={userInput["duration"]}
                    type="duration" 
                    id="expected-return" />
              </p>
            </div>
            <p className="actions">
              <button onClick={resetHandler} type="reset" className="buttonAlt">
                Reset
              </button>
              <button type="submit" className="button">
                Calculate
              </button>
            </p>
        </form>
    );
};

export default UserInput;
