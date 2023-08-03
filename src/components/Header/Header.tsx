import React from 'react';

import '../../index.scss';

import logo from '../../assets/investment-calculator-logo.png';

const Header = (props: any): any => {
    return (
        <header className="header">
            <img src={logo} alt='logo'/>
            <h1>Investment Calculator</h1>
        </header>
    );
}


export default Header;
