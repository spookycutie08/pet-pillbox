import "./PetToday.scss";

import React from "react";

import medLogsData from '../../../helpers/data/medLogsData';

class PetToday extends React.Component {
    state = {
        currentDateTime: this.props.currentDateTime,
        pet: this.props.pet,
        lastDoses: []
    }

    setLastDoses = () => {
        const petId = this.state.pet.id;
        medLogsData.getLastDosesForPet(petId)
        .then((doseLogs) => this.setState( { lastDoses: doseLogs }))
    };

    componentDidMount = () => {
        this.setLastDoses();
    };

    render() {
        const { pet } = this.props;
        return (
            <div>
                <p>{pet.name}</p>
            </div>
        );
    }
}

export default PetToday;