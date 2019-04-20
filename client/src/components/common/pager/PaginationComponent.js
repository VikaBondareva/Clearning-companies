import React from 'react';
import {querySearch} from '../../../utils';
import Pager from './Pages'
import { withRouter } from 'react-router-dom';

function PaginationComponent (props){

    const {page, pages} = props;

    function handlePageChanged(newPage) {
        const pathname = props.location.pathname;
        const queries = querySearch(props.history.location.search,{page: newPage});
        props.history.push(`${pathname}${queries}`)
	}

    if(pages<=1){
        return null;
    }
    return (
        <Pager
            total={pages}
            current={page}
            visiblePages={5}
            titles={{ first: '<<', last: ">>" }}
            className="pagination-sm pull-right"
            onPageChanged={handlePageChanged}
        />
    );
}

export const Pagination =  withRouter(PaginationComponent)
