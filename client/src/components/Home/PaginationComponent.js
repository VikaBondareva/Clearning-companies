import React from 'react';

import './paginate.css';


export default  function Pagination (props){

    const {page, pages, changeListCompanies} = props;
    return (
        <nav className="paginate">
            <button className="btn-paginate btn-usual" onClick={()=>changeListCompanies(page)}>
                {pages}
            </button> 
            <button className="btn-paginate btn-usual" onClick={()=>changeListCompanies(page)}>
                {pages+1}
            </button> 
            <button className="btn-paginate btn-paginate_current" onClick={()=>changeListCompanies(page)}>
                {pages+2}
            </button> 
        </nav>
    );
}
