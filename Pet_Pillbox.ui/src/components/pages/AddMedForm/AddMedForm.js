import './AddMedForm.scss';

import Moment from 'moment';
import React from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';

import doseTypesData from '../../../helpers/data/doseTypesData'
import medListData from '../../../helpers/data/medListData'

class AddMedForm extends React.Component {
    state = {
        doseTypes: [],
        name: '',
        doseAmount: 0,
        doseTypeId: 10,
        medFreqNum: 0,
        medFreqUnit: 1,
        medStartMonth: 1,
        medStartDay: 1,
        medStartYear: 1999,
        petId: this.props.match.params.petId,
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
        const idOfPet = parseInt(this.props.match.params.petId);
        const idOfDoseType = parseInt(this.state.doseTypeId);
        const numOfDoseAmount = parseInt(this.state.doseAmount);
        const medName = this.state.name;
        const newMedObject = {
            hoursBetweenDoses: totalHours,
            name: medName.charAt(0).toUpperCase() + medName.slice(1),
            petId: idOfPet,
            doseTypeId: idOfDoseType,
            doseAmount: numOfDoseAmount,
            startDate: Moment().format('YYYY-MM-DD'),
            endDate: `${this.state.medStartYear}-${this.state.medStartMonth}-${this.state.medStartDay}`
        }
        console.log('obj; ', newMedObject);
        
        medListData.addNewMed(newMedObject)
        .then(() => this.props.history.push(`/medlist/${this.state.petId}`))
        .catch((err) => console.error('could not post new med:', err))
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
                            <option value="01">Jan</option>
                            <option value="02">Feb</option>
                            <option value="03">Mar</option>
                            <option value="04">Apr</option>
                            <option value="05">May</option>
                            <option value="06">Jun</option>
                            <option value="07">Jul</option>
                            <option value="08">Aug</option>
                            <option value="09">Sep</option>
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