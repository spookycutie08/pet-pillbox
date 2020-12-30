import './MedHistoryTable.scss'

import React from 'react';
import Moment from 'moment';

import doseTypesData from '../../../helpers/data/doseTypesData';

class MedListTable extends React.Component {
    state = {
        log: [],
        doseDecription: ''
    }

    render() {
        const { log } = this.props;
        const adminDateFormatted = Moment(log.adminDateTime).format('MM/DD/YYYY hh:mm a');
        const getDoseDescription = (typeId) => {
            doseTypesData.getSingleDoseType(typeId)
            .then((doseInfo) => this.setState({ doseDecription : doseInfo.descrition }));
        };
        getDoseDescription(log.doseTypeId);
        if (log) {
            return (
                <tr>
                    <td>{log.doseAmount} {this.state.doseDecription}</td>
                    <td>{adminDateFormatted}</td>
                </tr>
            )

        } else {
            return (
                <h4>No logs for this medication.</h4>
            );
        }
    }
}

export default MedListTable;