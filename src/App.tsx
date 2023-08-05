import React, {useState} from 'react';
import Header from './components/Header/Header';
import UserInput from './components/UserInput/UserInput';
import ResultsTable from './components/ResultsTable/ResultsTable';

import './index.scss';


interface CalculatorType {
        calculateHandler: (userInput: any) => any;
    };

interface YearlyDataType {
    year: number,
    yearlyInterest: number,
    savingsEndOfYear: number,
    yearlyContribution: number
} 

function App() {
    const initialResults: YearlyDataType[] = [];
    const [results, setResults] = useState(initialResults); 

    const calculator: CalculatorType = {
        calculateHandler: (userInput: any): any => {
            const yearlyData =[]; // per-year results

            let currentSavings = userInput['current-savings']; 
            const yearlyContribution = userInput['yearly-contribution'];
            const expectedReturn = userInput['expected-return'] / 100;
            const duration = userInput['duration'];

            // The below code calculates yearly results (total savings, interest etc)
            for (let i = 0; i < duration; i++) {
                const yearlyInterest = currentSavings * expectedReturn;
                currentSavings += yearlyInterest + yearlyContribution;
                yearlyData.push({
                    year: i + 1,
                    yearlyInterest: yearlyInterest,
                    'savingsEndOfYear': currentSavings,
                    yearlyContribution: yearlyContribution,
                });
            };
            setResults(yearlyData);
            console.log('pause');
        }
    };

    return (
        <div>
            <Header/>

            <UserInput onCalculate={calculator.calculateHandler}/> 
          {/* Todo: Show below table conditionally (only once result data is available) */}
          {/* Show fallback text if no data is available */}

            <ResultsTable/> 
        </div>
    );
}

export default App;
