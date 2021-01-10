import './MedHistoryTable.scss'

import React from 'react';
import Moment from 'moment';

import doseTypesData from '../../../helpers/data/doseTypesData';

class MedListTable extends React.Component {
    state = {
        doseDecription: ''
    }

    getDoseDescription = (typeId) => {
        doseTypesData.getSingleDoseType(typeId)
        .then((doseInfo) => this.setState({ doseDecription : doseInfo.description }));
    };

    componentDidMount = () => {
        const { log } = this.props;
        this.getDoseDescription(log.doseTypeId);
    };

    render() {
        const { log } = this.props;
        const adminDateFormatted = Moment(log.adminDateTime).format('MM/DD/YYYY hh:mm a');
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