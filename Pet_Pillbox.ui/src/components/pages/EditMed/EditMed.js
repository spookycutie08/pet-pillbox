import './EditMed.scss'
import 'react-datepicker/dist/react-datepicker.css';

import DatePicker from 'react-datepicker';
import Moment from 'moment';
import React from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';

import doseTypesData from '../../../helpers/data/doseTypesData'
import medListData from '../../../helpers/data/medListData'

class EditMed extends React.Component {
    state = {
        doseTypes: [],
        medInfo: {}
    }

    componentDidMount = () => {
        const medId = this.props.match.params.medId;
        medListData.getSingleMedByMedId(medId)
            .then((medInfo) => {
                this.setState({ medInfo })
            })
        doseTypesData.getAllDoseTypes()
            .then((doses) => {
                this.setState({ doseTypes: doses })
            })
    };

    updateName = (e) => {
        e.preventDefault();
        var newState = {};
        newState[e.target.name] = e.target.value;
        this.setState(newState);
    };

    endDateChange = (date) => {
        this.setState({ endDate: date });
    }

    render() {
        const medInfo = this.state.medInfo;
        const formattedEndDate = Moment(medInfo.endDate);
        const test = new Date(formattedEndDate);
        return (
            <>
                <h1>Edit Medication</h1>
                <Form>
                    <FormGroup>
                        <Label for="name">Medication Name</Label>
                        <Input type="text" name="name" id="name" value={medInfo.name} onChange={this.updateName} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="doseAmount">Amount</Label>
                        <Input type="number" name="doseAmount" id="doseAmount" value={medInfo.doseAmount} min="0.25" max="9999" step="0.25" onChange={this.updateForm}>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="doseTypeId">Form</Label>
                        <Input type="select" name="doseTypeId" id="doseTypeId" value={medInfo.doseTypeId} onChange={this.updateForm}>
                            {this.state.doseTypes.map((oneDose) => (
                                <option id={oneDose.id} key={oneDose.id} value={oneDose.id}>{oneDose.description}</option>
                            ))}
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="medFreqNum">Every...</Label>
                        <Input type="number" name="medFreqNum" id="medFreqNum" value={medInfo.hoursBetweenDoses} min="1" max="99" step="1" onChange={this.updateForm}>
                        </Input>
                        <Input type="select" name="medFreqUnit" id="medFreqUnit" onChange={this.updateForm}>
                            <option value="1">hour(s)</option>
                            <option value="24">day(s)</option>
                            <option value="168">week(s)</option>
                            <option value="730">month(s)</option>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="medEndDate" >Until...</Label><br />
                        <DatePicker
                            selected={test}
                            onChange={this.endDateChange}
                            dateFormat={'yyyy-MM-dd'}
                        />
                    </FormGroup>
                    <button className="btn btn-success" onClick={this.saveNewMed}>Save</button>
                </Form>
            </>
        );
    }
}

export default EditMed;