import React from 'react';

import './paginate.css';


export default  function Pagination (props){

    const {total, handleClickPagination} = props;
    return (
        <nav className="paginate">
            <button className="btn-paginate" onClick={()=>handleClickPagination(total)}>
                {total}
            </button> 
        </nav>
       
    );
}
