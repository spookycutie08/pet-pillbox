import './AddMedForm.scss';

import Moment from 'moment';
import React from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';

import doseTypesData from '../../../helpers/data/doseTypesData'

class AddMedForm extends React.Component {
    state = {
        doseTypes: [],
        name: '',
        doseAmount: 0,
        doseTypeId: 10,
        // hoursBetweenDoses: 0,
        // startDate: '',
        // endDate: '',
        medFreqNum: 0,
        medFreqUnit: 1,
        medStartMonth: 1,
        medStartDay: 1,
        medStartYear: 1999,
        // petId: this.props.match.params.petId,
    }

    componentDidMount = () => {
        doseTypesData.getAllDoseTypes()
            .then((doses) => {
                this.setState({ doseTypes: doses })
            })
    };

    saveNewMed = (e) => {
        e.preventDefault();
        const num = this.state.medFreqNum;
        const units = this.state.medFreqUnit;
        const totalHours = parseInt(num)*parseInt(units);
        const newMedObject = {
            a: totalHours,
            name: this.state.name,
            petId: this.props.match.params.petId,
            medFreqUnit: this.state.medFreqUnit,
            doseTypeId: this.state.doseTypeId,
            startDate: Moment().format('MM/DD/YYYY'),
            endDate: `${this.state.medStartMonth}/${this.state.medStartDay}/${this.state.medStartYear}`
        }
        console.log('new med: ', newMedObject);
        
    };

    updateForm = (e) => {
        e.preventDefault();
        var newState = {};
        newState[e.target.name] = e.target.value;
        this.setState(newState);
    };

    render() {
        return (
            <div className="col-6">
                <Form>
                    <FormGroup>
                        <Label for="name">Medication Name</Label>
                        <Input type="text" name="name" id="name" onChange={this.updateForm}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="doseAmount">Amount</Label>
                        <Input type="number" name="doseAmount" id="doseAmount" min="0.25" max="9999" step="0.25" onChange={this.updateForm}>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="doseTypeId">Form</Label>
                        <Input type="select" name="doseTypeId" id="doseTypeId" onChange={this.updateForm}>
                            {this.state.doseTypes.map((oneDose) => (
                                <option id={oneDose.id} key={oneDose.id} value={oneDose.id}>{oneDose.description}</option>
                            ))}
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="medFreqNum">Every...</Label>
                        <Input type="number" name="medFreqNum" id="medFreqNum" min="1" max="99" step="1" onChange={this.updateForm}>
                        </Input>
                        <Input type="select" name="medFreqUnit" id="medFreqUnit" onChange={this.updateForm}>
                            <option value="1">hour(s)</option>
                            <option value="24">day(s)</option>
                            <option value="168">week(s)</option>
                            <option value="730">month(s)</option>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="medEndDate">Until...</Label>
                        <Input type="select" name="medStartMonth" id="medStartMonth" onChange={this.updateForm}>
                            <option value="1">Jan</option>
                            <option value="2">Feb</option>
                            <option value="3">Mar</option>
                            <option value="4">Apr</option>
                            <option value="5">May</option>
                            <option value="6">Jun</option>
                            <option value="7">Jul</option>
                            <option value="8">Aug</option>
                            <option value="9">Sep</option>
                            <option value="10">Oct</option>
                            <option value="11">Nov</option>
                            <option value="12">Dec</option>
                        </Input>
                        <Input type="number" name="medStartDay" id="medStartDay" min="1" max="31" step="1" onChange={this.updateForm}/>
                        <Input type="number" name="medStartYear" id="medStartYear" min="2020" max="2099" step="1" onChange={this.updateForm}/>
                    </FormGroup>
                    <button className="btn btn-success" onClick={this.saveNewMed}>Save</button>
                </Form>
            </div>
        );
    }
}

export default AddMedForm;