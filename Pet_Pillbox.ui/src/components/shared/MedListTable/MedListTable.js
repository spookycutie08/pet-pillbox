import './MedListTable.scss'

import React from 'react';

import doseTypesData from '../../../helpers/data/doseTypesData';
import { Link } from 'react-router-dom';
import Moment from 'moment';

class MedListTable extends React.Component {
    state = {
        doseType: ''
    }

    componentDidMount = () => {
        const { med } = this.props;
        const typeId = med.doseTypeId;
            doseTypesData.getSingleDoseType(typeId)
            .then((dose) => {
                this.setState({ doseType: dose.description})
            })
    };

    render() {
        const { med } = this.props;
        const medEndDate = Moment(med.endDate).format('MM/DD/YYYY');
        const medFreq = (hours) => {
            if (hours <= 23.9) {
                return hours + " hour(s)";
            } else if (hours >= 24 && hours < 168) {
                return hours/24 + " day(s)"
            } else if (hours >= 168 && hours < 730){
                return hours/168 + " week(s)";
            } else if (hours >= 730) {
                return hours/730 + " month(s)";
            } else {
                return hours + " hour(s)";
            }
        };
        const historyLink = `/history/${med.id}`
        if (med) {
            return (
                <>
                <tr>
                    <td>{med.name}</td>
                    <td rowspan="2"><Link to={historyLink}><i className="fas fa-notes-medical font-olive"></i></Link></td>
                </tr><tr>
                    <td className="font-small-custom">{med.doseAmount} {this.state.doseType} every {medFreq(med.hoursBetweenDoses)}
                    <br/> exp: {medEndDate}</td>
                </tr>
                </>
            )

        } else {
            return (
                <h4>This pet has no medications.</h4>
            );
        }
    }
}

export default MedListTable;