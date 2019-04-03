import React from 'react';
import PropTypes from 'prop-types';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import loadingHOC from '../../../common/loading/loadingHOC';
import {BasicInformation} from './BasicInformation';
import {RoomsInformation} from './RoomsInformation';
import {ServicesInformation} from './ServicesInformation';
import AuthPage from '../../AuthPage';

export default class RegisterCompany extends React.Component{

    constructor(){
        super();
        this.state ={
            activeStep:0,
            steps: ['Basic Information','Your rooms price', 'Your services']
        };

        this.handleBack = this.handleBack.bind(this);
        this.handleNext = this.handleNext.bind(this);
        this.handleFinish = this.handleFinish.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.getStepContent = this.getStepContent.bind(this);
    }

    handleNext(data){
        this.handleSave(data);
        this.setState({
            activeStep: this.state.activeStep+1
        })
    }

    handleSave(data){
        const {activeStep} = this.state;
        let company = this.props.company;
        if(activeStep === 1 ){
             company.rooms = data;
        } else if (activeStep === 2){
            company.services = data.services;
        } else {
            company.personal = data;
        }
        this.props.saveInState(company);
    }
    
    handleBack(data){
        this.handleSave(data);
        this.setState({
            activeStep: this.state.activeStep-1
        })
    }

    handleFinish(data){
        this.handleSave(data);
        const {services, rooms, personal} = this.props.company;
        const company = {services, rooms, ...personal}
        this.props.registerCompany(company);
    }

    getStepContent(stepIndex){
        let {company} = this.props
        if(stepIndex === 0){
            return <BasicInformation handleNext={this.handleNext} company={company}/>;
        } else if(stepIndex === 1){
            return <RoomsInformation handleBack={this.handleBack} handleNext={this.handleNext} company={company}/>;
        }
        return <ServicesInformation handleFinish={ this.handleFinish} handleBack={this.handleBack} company={company}/>;
    }

    render(){
        const {activeStep, steps} = this.state;
        return (
            <AuthPage 
                title='Sign up to Mega Clean'
                titleDown="You have an account?"
                link='/login'
                size='big'
                error={this.props.message}
                isSendEmail={this.props.isSendEmail}
                nameAction='Sing in.'
                otherRegisterLink="/register"
                otherRegisterText="Registration as an user">
                 <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map(label => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                    ))}
                </Stepper>
                {activeStep !== steps.length && this.getStepContent(activeStep)}
            </AuthPage>
        );
    }
}

RegisterCompany.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    registerCompany: PropTypes.func.isRequired,
    saveInState: PropTypes.func.isRequired,
    isSendEmail: PropTypes.bool.isRequired,
    message: PropTypes.string,
    company: PropTypes.object
  };

export const RegistrationCompanyComponent = loadingHOC('isLoading')(RegisterCompany);

