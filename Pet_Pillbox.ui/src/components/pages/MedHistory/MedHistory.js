import './MedHistory.scss';

import React from 'react';

import MedHistoryTable from '../../shared/MedHistoryTable/MedHistoryTable';
import medListData from '../../../helpers/data/medListData';
import medLogsData from '../../../helpers/data/medLogsData';

class MedHistory extends React.Component {
    state = {
        logs: [],
        medInfo: {}
    };

    getMedInfo = () => {
        const medId = this.props.match.params.medId * 1;
        medListData.getSingleMedByMedId(medId)
            .then(medInfo => { this.setState({ medInfo }) });
    };

    getMedLogs = () => {
        const medId = this.props.match.params.medId * 1;
        medLogsData.getMedLogsByMedId(medId)
            .then(logs => { this.setState({ logs }) });
    };
    
    componentDidMount() {
        this.getMedInfo();
        this.getMedLogs();
    }

    render() {
        const { logs, medInfo } = this.state;
        const buildHistoryTable = logs.map((log) => {
            return <MedHistoryTable key={log.id} log={log}/>
        })
        return (
            <div>
                <h1>{medInfo.name}</h1>
                <table className="table">
                    <tbody>
                        <th>Dose Amount</th>
                        <th>When</th>
                        {buildHistoryTable}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default MedHistory;