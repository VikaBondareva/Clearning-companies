import React, {Component} from 'react';
import CardCompanyComponent from '../CompanyCard/CardCompanyComponent';
import apiService from '../../api/companies.api';

export default class HomeComponent extends Component {

    state = {
        companies: []
    }

    componentDidMount(){
        apiService.getCompanies()
            .then(response =>{
                console.log(response);
                this.setState({companies: response.data.docs})
            });
    }

    renderCompany(company){
        return <CardCompanyComponent key={company._id} company={company}/>
    }

    render(){
        // const {companies} = this.props;

        return (
            <>
                {this.state.companies.map(this.renderCompany)}
            </>
        );
    }
}