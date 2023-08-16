import React from 'react';

interface ResultsTableProps {
    onGetResults: () => YearlyDataType[];
    initialInvestment: number;
}

interface YearlyDataType {
    year: number,
    yearlyInterest: number,
    savingsEndOfYear: number,
    yearlyContribution: number
} 

const formatter = new Intl.NumberFormat('en-US', {
   style: 'currency',
   currency: 'USD',
   minimumFractionDigits: 2,
   maximumFractionDigits: 2
});

//{onGetResults}: ResultsTableProps
const ResultsList = ({onGetResults, initialInvestment}: ResultsTableProps) => {
    const yearlyData = onGetResults();

    const getTotalInterestGained = (yearData: YearlyDataType) => {
        return formatter.format(yearData.savingsEndOfYear - initialInvestment
            - yearData.yearlyContribution * yearData.year);   
    }

    const getTotalInvestedCaptial = (yearData: YearlyDataType) => {
        return formatter.format(initialInvestment + yearData.yearlyContribution
            * yearData.year);
    }

    return (
        <tbody>
              <tr>
                <td>YEAR NUMBER</td>
                <td>TOTAL SAVINGS END OF YEAR</td>
                <td>INTEREST GAINED IN YEAR</td>
                <td>TOTAL INTEREST GAINED</td>
                <td>TOTAL INVESTED CAPITAL</td>
              </tr>
            {yearlyData.map((yearData) => (
                <tr key={yearData.year}>
                    <td>{yearData.year}</td>
                    <td>{formatter.format(yearData.savingsEndOfYear)}</td>
                    <td>{formatter.format(yearData.yearlyInterest)}</td>
                    <td>{getTotalInterestGained(yearData)}</td>
                    <td>{getTotalInvestedCaptial(yearData)}</td>
                </tr>
            ))} 
        </tbody>
    );
}

export default ResultsList;
