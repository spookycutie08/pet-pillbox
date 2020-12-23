import "./PetToday.scss";

import React from "react";

import SingleMedDue from '../SingleMedDue/SingleMedDue';

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
        .then((lastDoses) => this.setState( { lastDoses }))
    };

    componentDidMount = () => {
        this.setLastDoses();
    };

    render() {
        const { lastDoses, pet } = this.state;
        const buildMedsDue = lastDoses.map((entry) => {
            return (<SingleMedDue key={entry.id} entry={entry}/>)
        });
        return (
            <div>
                <h3>{pet.name}</h3>
                {buildMedsDue}
            </div>
        );
    }
}

export default PetToday;