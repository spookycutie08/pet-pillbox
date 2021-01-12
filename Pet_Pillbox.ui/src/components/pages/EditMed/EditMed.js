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
        medInfo: {},
        smallHours: 0,
        smallUnits: 0,
    }

    componentDidMount = () => {
        const medId = this.props.match.params.medId;
        medListData.getSingleMedByMedId(medId)
            .then((medInfo) => {
                this.setState({ medInfo });
            })
        doseTypesData.getAllDoseTypes()
            .then((doses) => {
                this.setState({ doseTypes: doses })
            })
        const calcSmallUnits = this.medFreqCalc(this.state.medInfo.hoursBetweenDoses);
        this.setState({ smallUnits: calcSmallUnits });
    };

    medFreqCalc = (hours) => {
        console.log('hours: ', this.state.medInfo); // calculating here
        if (hours <= 23.9) {
            return 1;
        } else if (hours >= 24 && hours < 168) {
            return 24
        } else if (hours >= 168 && hours < 730) {
            return 168;
        } else if (hours >= 730) {
            return 730;
        } else {
            return 0;
        }
    };

    endDateChange = (date) => {
        this.setState({ endDate: date });
    }

    updateFormString = (e) => {
        e.preventDefault();
               this.setState({
            medInfo: {
              ...this.state.medInfo,
              [e.target.name]: e.target.value
            }
          });
    };

    updateFormNum = (e) => {
        e.preventDefault();
               this.setState({
            medInfo: {
              ...this.state.medInfo,
              [e.target.name]: parseInt(e.target.value)
            }
          });
    };
    

    render() {
        const medInfo = this.state.medInfo;
        const formattedEndDate = Moment(medInfo.endDate);
        const dateValue = new Date(formattedEndDate);
        return (
            <>
                <h1>Edit Medication</h1>
                <Form>
                    <FormGroup>
                        <Label for="name">Medication Name</Label>
                        <Input type="text" name="name" id="name" value={medInfo.name} onChange={this.updateFormString} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="doseAmount">Amount</Label>
                        <Input type="number" name="doseAmount" id="medInfo.doseAmount" value={medInfo.doseAmount} min="0.25" max="9999" step="0.25" onChange={this.updateFormNum}>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="doseTypeId">Form</Label>
                        <Input type="select" name="doseTypeId" id="medInfo.doseTypeId" value={medInfo.doseTypeId} onChange={this.updateFormNum}>
                            {this.state.doseTypes.map((oneDose) => (
                                <option id={oneDose.id} key={oneDose.id} value={oneDose.id}>{oneDose.description}</option>
                            ))}
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="medFreqNum">Every...</Label>
                        <Input type="number" name="medFreqNum" id="medFreqNum" value={this.state.smallHours} min="1" max="99" step="1" onChange={this.updateFormNum}>
                        </Input>
                        <Input type="select" name="medFreqUnit" id="medFreqUnit" value={this.state.smallUnits} onChange={this.updateFormNum}>
                            <option value="1">hour(s)</option>
                            <option value="24">day(s)</option>
                            <option value="168">week(s)</option>
                            <option value="730">month(s)</option>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="medEndDate" >Until...</Label><br />
                        <DatePicker
                            selected={dateValue}
                            onChange={this.endDateChange}
                            dateFormat={'yyyy-MM-dd'}
                        />
                    </FormGroup>
                    <button className="btn btn-success" onClick={this.saveMed}>Save</button>
                </Form>
            </>
        );
    }
}

export default EditMed;