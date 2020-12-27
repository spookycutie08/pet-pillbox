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
        const historyLink = `/history/${med.id}`
        if (med) {
            return (
                <tr>
                    <td>{med.name}</td>
                    <td>{med.doseAmount} {this.state.doseType}</td>
                    <td>{med.hoursBetweenDoses} hours</td>
                    <td>{medEndDate}</td>
                    <td><Link to={historyLink}><i className="fas fa-notes-medical"></i></Link></td>
                </tr>
            )

        } else {
            return (
                <h4>This pet has no medications.</h4>
            );
        }
    }
}

export default MedListTable;