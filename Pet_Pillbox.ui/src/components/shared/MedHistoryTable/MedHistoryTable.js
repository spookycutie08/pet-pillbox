import './MedHistoryTable.scss'

import React from 'react';
import Moment from 'moment';

class MedListTable extends React.Component {
    state = {
        log: []
    }

    render() {
        const { log } = this.props;
        const adminDateFormatted = Moment(log.adminDateTime).format('MM/DD/YYYY hh:mm a');
        if (log) {
            return (
                <tr>
                    <td>{log.doseAmount}</td>
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