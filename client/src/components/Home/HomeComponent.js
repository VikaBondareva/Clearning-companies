import React, {Component} from 'react';
import CardCompanyComponent from '../CompanyCard/CardCompanyComponent';
import LeftLayout   from '../LeftLayout/LeftLayout';
import apiService from '../../services/companies.service';
import Grid from '@material-ui/core/Grid';

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
        return (
                <CardCompanyComponent key={company._id} company={company}/>
        );
    }

    render(){
        return (
             <Grid container>
                <Grid item xs={9}>
                    <div style={{margin: "20px 50px"}}>
                        {this.state.companies.map(this.renderCompany)}
                    </div>
                </Grid>
                <Grid container  
                item xs={2} >
                    <LeftLayout/>
                </Grid>
            </Grid>
        );
    }
}