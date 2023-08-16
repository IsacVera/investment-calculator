import React, {useState} from 'react';
import Header from './components/Header/Header';
import UserInput from './components/UserInput/UserInput';
import ResultsTable from './components/ResultsTable/ResultsTable';

import './index.scss';


interface DataHandlerType {
    calculateHandler: (userInput: any) => any;
    getResults: () => YearlyDataType[];
    hideResultsHandler: (flag: boolean) => void;
};

interface YearlyDataType {
    year: number,
    yearlyInterest: number,
    savingsEndOfYear: number,
    yearlyContribution: number
} 

function App() {
    const initialResults: YearlyDataType[] = [];
    const [results, setResults] = useState<YearlyDataType[]>(initialResults);
    const [initialInvestment, setInitialInvestment] = useState<number>(0);
    const [hideResults, setHideResults] = useState<boolean>(true);

    const dataHandler: DataHandlerType = {
        calculateHandler: (userInput: any): any => {
            const yearlyData =[]; // per-year results

            let currentSavings = Number(userInput['current-savings']); 
            const yearlyContribution = userInput['yearly-contribution'];
            const expectedReturn = userInput['expected-return'] / 100;
            const duration = userInput['duration'];

            setInitialInvestment(currentSavings);
            // The below code calculates yearly results (total savings, interest etc)
            for (let i = 0; i < duration; i++) {
                const yearlyInterest = currentSavings * expectedReturn;
                currentSavings += yearlyInterest + yearlyContribution;
                yearlyData.push({
                    year: i + 1,
                    yearlyInterest: yearlyInterest,
                    savingsEndOfYear: currentSavings,
                    yearlyContribution: yearlyContribution,
                });
            };
            setResults(yearlyData);
        },

        getResults: (): YearlyDataType[] => {
            return results;
        },

        hideResultsHandler: (flag: boolean): void => {
            setHideResults(flag);
        }
    };

    return (
        <React.Fragment>
            <Header/>
            <UserInput 
                onCalculate={dataHandler.calculateHandler}
                onHideResults={dataHandler.hideResultsHandler}
            /> 
            {hideResults === false?
                <ResultsTable 
                    onGetResults={dataHandler.getResults}
                    initialInvestment={initialInvestment}
                />:
            null}
        </React.Fragment>
    );
}

export default App;
