import Moment from 'moment';
import React from 'react';

import medListData from '../../../helpers/data/medListData';
import medLogsData from '../../../helpers/data/medLogsData';

class SingleMedDue extends React.Component {
    state = {
        isDisabled: false,
        medInfo: {}
    }

    componentDidMount = () => {
        const medId = this.props.med.id;
        medListData.getSingleMedByMedId(medId)
        .then((medInfo) => this.setState({ medInfo }));
    };

    medLogEvent = (e) => {
        e.preventDefault();
        const newLog = {
            medicationId: this.state.medInfo.id,
            adminDateTime: Moment().format(),
            doseAmount: this.state.medInfo.doseAmount,
            doseTypeId: this.state.medInfo.doseTypeId,
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
                <>
                    <tr>
                        <td>{med.name} 
                        <button onClick={this.medLogEvent} value={med.id} className="btn btn-custom"><i className="fas fa-check"></i></button></td>
                    </tr>
                </>
            );
        }
    }
}

export default SingleMedDue;