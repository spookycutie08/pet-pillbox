import "./PetToday.scss";

import React from "react";

import SingleMedDue from '../SingleMedDue/SingleMedDue';

import medLogsData from '../../../helpers/data/medLogsData';

class PetToday extends React.Component {
    state = {
        currentDateTime: this.props.currentDateTime,
        pet: this.props.pet,
        medsDue: []
    }

    setMedsDue = () => {
        const petId = this.state.pet.id;
        medLogsData.getMedsDueForPet(petId)
        .then((medsDue) => this.setState( { medsDue }))
    };

    componentDidMount = () => {
        this.setMedsDue();
    };

    render() {
        const { medsDue, pet } = this.state;
        const buildMedsDue = medsDue.map((med) => {
            return (<SingleMedDue key={med.id} med={med}/>)
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