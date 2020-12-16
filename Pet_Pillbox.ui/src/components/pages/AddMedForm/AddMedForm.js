import './AddMedForm.scss';

import React from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import DatePicker from 'react-datepicker';

import doseTypesData from '../../../helpers/data/doseTypesData'

class AddMedForm extends React.Component {
    state = {
        doseTypes: []
    }

    componentDidMount = () => {
        doseTypesData.getAllDoseTypes()
            .then((doses) => {
                this.setState({ doseTypes: doses })
            })
    };

    render() {
        return (
            <div className="col-6">
                <Form>
                    <FormGroup>
                        <Label for="medName">Medication Name</Label>
                        <Input type="text" name="medName" id="medName" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="medDose">Amount</Label>
                        <Input type="number" name="medDose" id="medDose" min="0.25" max="9999" step="0.25">
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="medDoseType">Form</Label>
                        <Input type="select" name="medDoseType" id="medDoseType">
                            {this.state.doseTypes.map((oneDose) => (
                                <option id={oneDose.id} key={oneDose.id}>{oneDose.description}</option>
                            ))}
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="medFreqNum">Every...</Label>
                        <Input type="number" name="medFreqNum" id="medFreqNum" min="1" max="99" step="1">
                        </Input>
                        <Input type="select" name="medFreqUnit" id="medFreqUnit">
                            <option>hour(s)</option>
                            <option>day(s)</option>
                            <option>week(s)</option>
                            <option>month(s)</option>
                        </Input>
                        <DatePicker
                            className="picker"
                            // selected={this.state.endDate}
                            // onChange={this.endDateChange}
                            dateFormat={'MM/dd/yyyy'}
                        />
                    </FormGroup>
                </Form>
            </div>
        );
    }
}

export default AddMedForm;