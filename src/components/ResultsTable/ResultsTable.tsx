import React from 'react';
import ResultsList  from './ResultsList';

import '../../index.scss';


interface YearlyDataType {
    year: number,
    yearlyInterest: number,
    savingsEndOfYear: number,
    yearlyContribution: number
} 

interface ResultsTableProps {
    onGetResults: () => YearlyDataType[];
    initialInvestment: number;
}


const ResultsTable = ({onGetResults, initialInvestment}: ResultsTableProps) => {

    return (
    <React.Fragment>
        <table className="result">
            <thead>
              <tr>
                <th>Year</th>
                <th>Total Savings</th>
                <th>Interest (Year)</th>
                <th>Total Interest</th>
                <th>Invested Capital</th>
              </tr>
            </thead>
            
            <ResultsList onGetResults={onGetResults} initialInvestment={initialInvestment}/>
        </table>
    </React.Fragment> 
    );
};

export default ResultsTable;
