import React from "react";
import "./PetsDashboard.scss";

import petsData from '../../../helpers/data/petsData';

import SinglePet from '../SinglePet/SinglePet'

class PetsDashboard extends React.Component {
    
    state = { pets: [] };
    
    componentDidMount() {
        petsData.getPetsByUser()
            .then(pets => { this.setState({pets})});
    }

    render() {
        const {pets} = this.state;
        const buildPetsList = pets.map((p) => {
            return (<SinglePet key={p.id} pet={p}/>)
        });
        
        return (
            <div>
                <h1>Pets component</h1>
            </div>
        );
    }
}

export default PetsDashboard;