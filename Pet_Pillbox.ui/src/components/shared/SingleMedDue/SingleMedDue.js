import Moment from 'moment';
import React from 'react';

class SingleMedDue extends React.Component {
    state = {
        isDisabled: false,
    }

    medLogEvent = (e) => {
        e.preventDefault();
        const medButton = e.target;
        const medId = medButton.value;
        const currentDateTime = Moment().format();
        this.setState({ isDisabled: true });
        console.log('logged: ', medId, currentDateTime);
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
                    <button onClick={this.medLogEvent} id={med.id} value={med.id} className="btn btn-warning"><i class="fas fa-check"></i></button>
                </div>
            );
        }
    }
}

export default SingleMedDue;