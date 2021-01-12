import Moment from 'moment';
import React from 'react';

import doseTypesData from '../../../helpers/data/doseTypesData';
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
            .then((medInfo) => {
                this.setState({ medInfo });
                this.getDoseDescription(medInfo.doseTypeId);
            });
    };

    getDoseDescription = () => {
        const doseId = this.state.medInfo.doseTypeId;
        doseTypesData.getSingleDoseType(doseId)
        .then((doseInfo) => this.setState({ doseDesc : doseInfo.description}))
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
        const medInfo = this.state.medInfo;
        const doseDesc = this.state.doseDesc;
        if (this.state.isDisabled) {
            return (
                <>
                <tr>
                    <td>{med.name}</td>
                    <td className="font-small-custom">{medInfo.doseAmount} {doseDesc}</td>
                    <td><button onClick={this.medLogEvent} value={med.id} className="btn btn-custom"><i className="fas fa-check"></i></button></td>
                </tr>
                </>
            )
        } else {
            return (
                <>
                    <tr>
                        <td>{med.name}</td>
                        <td className="font-small-custom">{medInfo.doseAmount} {doseDesc}</td>
                        <td><button onClick={this.medLogEvent} value={med.id} className="btn btn-custom disabled font-olive"><i className="fas fa-pills"></i></button></td>
                    </tr>
                </>
            );
        }
    }
}

export default SingleMedDue;