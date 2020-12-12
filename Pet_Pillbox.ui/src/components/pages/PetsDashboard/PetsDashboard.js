import React from "react";
import "./PetsDashboard.scss";

import authData from '../../../helpers/data/authData'
import petsData from '../../../helpers/data/petsData';

import SinglePet from '../SinglePet/SinglePet'

class PetsDashboard extends React.Component {
    
    state = { pets: [] };
    
    componentDidMount() {
        const userUid = authData.getUid()
        petsData.getPetsByUser(userUid)
            .then(pets => { this.setState({pets})});
    }

    render() {
        const {pets} = this.state;
        const buildPetsList = pets.map((p) => {
            return (<SinglePet key={p.id} pet={p}/>)
        });
        
        return (
            <div>
                <h1>Pets</h1>
                {buildPetsList}
            </div>
        );
    }
}

export default PetsDashboard;