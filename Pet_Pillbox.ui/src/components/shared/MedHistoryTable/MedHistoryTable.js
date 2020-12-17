import './MedHistoryTable.scss'

import React from 'react';
import { Link } from 'react-router-dom';

class MedListTable extends React.Component {
    state = {
        log: []
    }

    componentDidMount = () => {
        const { log } = this.props;
        const typeId = med.doseTypeId;
            doseTypesData.getSingleDoseType(typeId)
            .then((dose) => {
                this.setState({ doseType: dose.description})
            })
    };

    render() {
        const { med, pet } = this.props;
        const historyLink = `/history/${pet.id}`
        if (med) {
            return (
                <tr>
                    <td>{med.name}</td>
                    <td>{med.doseAmount} {this.state.doseType}</td>
                    <td>{med.hoursBetweenDoses} hours</td>
                    <td>{med.endDate}</td>
                    <td><Link to={historyLink}><i class="fas fa-notes-medical"></i></Link></td>
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