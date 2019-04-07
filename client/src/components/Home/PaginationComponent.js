import React, {Component} from 'react';
import {querySearch} from '../../helpers';
import Pager from '../common/pager/Pages'
import { withRouter } from 'react-router-dom';

import './paginate.css';
function Pagination (props){

    const {page, pages} = props;

    function handlePageChanged(newPage) {
        const queries = querySearch(props.history.location.search,{page: newPage});
        props.history.push(`/companies${queries}`)
	}

    return (
        <Pager
            total={pages}
            current={page}
            visiblePages={5}
            titles={{ first: '<|', last: '>|' }}
            className="pagination-sm pull-right"
            onPageChanged={handlePageChanged}
        />
    );
}

export default withRouter(Pagination)
