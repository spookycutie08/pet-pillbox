import './MedHistory.scss';

import React from 'react';

import MedHistoryTable from '../../shared/MedHistoryTable/MedHistoryTable';
import medLogsData from '../../../helpers/data/medLogsData';

class MedHistory extends React.Component {
    state = {
        logs: []
    };

    getMedLogs = () => {
        const medId = this.props.match.params.medId * 1;
        medLogsData.getMedLogsByMedId(medId)
            .then(logs => { this.setState({ logs }) });
    };
    
    componentDidMount() {
        this.getMedLogs();
    }

    render() {
        const { logs } = this.state;
        const buildHistoryTable = logs.map((log) => {
            return <MedHistoryTable key={log.id} log={log}/>
        })
        return (
            <div>
                <h1>Medication Log</h1>
                <table className="table">
                    <tbody>
                        {buildHistoryTable}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default MedHistory;