import './MedListTable.scss'

import React from 'react';

import doseTypesData from '../../../helpers/data/doseTypesData';

class MedListTable extends React.Component {
    state = {
        doseTypes: [],
    }
    
    render() {
        const { med } = this.props;
        const getDoseTypeInfo = (id) => {
            doseTypesData.getSingleDoseType(id)
            .then((dose) => {
                med.doseDesc = dose.description;
            })
        };

        if (med) {
            return (
                <tr>
                    <td>{med.name}</td>
                    <td>{med.doseAmount} {med.doseDesc}</td>
                    <td>{med.hoursBetweenDoses} hours</td>
                    <td>{med.endDate}</td>
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