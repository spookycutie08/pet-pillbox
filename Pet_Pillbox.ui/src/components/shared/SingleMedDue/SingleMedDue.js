import Moment from 'moment';
import React from 'react';

import medLogsData from '../../../helpers/data/medLogsData';

class SingleMedDue extends React.Component {
    state = {
        isDisabled: false,
    }

    medLogEvent = (e) => {
        e.preventDefault();
        const medId = e.target.value;
        const newLog = {
            medicationId: medId * 1,
            adminDateTime: Moment().format(),
        }
        medLogsData.addNewLog(newLog)
        .then(this.setState({ isDisabled: true }))
        console.log('logged: ', newLog);
    };

    render() {
        const { med } = this.props;

        if (this.state.isDisabled) {
            return (
                <div>
                    <p>{med.name}</p>
                </div>
            )
        } else {
            return (
                <div>
                    <p>{med.name}</p>
                    <button onClick={this.medLogEvent} value={med.id} className="btn btn-warning"><i class="fas fa-check"></i></button>
                </div>
            );
        }
    }
}

export default SingleMedDue;