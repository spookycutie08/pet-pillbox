import './MedHistoryTable.scss'

import React from 'react';

class MedListTable extends React.Component {
    state = {
        log: []
    }

    render() {
        const { log } = this.props;
        if (log) {
            return (
                <tr>
                    <td>{log.adminDateTime}</td>
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