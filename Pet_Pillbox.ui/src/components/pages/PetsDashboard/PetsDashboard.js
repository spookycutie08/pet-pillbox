import React from "react";
import { Collapse } from 'reactstrap';
import "./PetsDashboard.scss";

import authData from '../../../helpers/data/authData'
import petsData from '../../../helpers/data/petsData';

import SinglePet from '../../shared/SinglePet/SinglePet'

class PetsDashboard extends React.Component {
    state = {
        pets: [],
        isOpen: false,
        petName: '',
        user: {},
    };

    toggle = () => {
        this.setState({ isOpen: !this.state.isOpen });
    }

    getPetsForDashboard = () => {
        const userUid = this.state.user.firebaseUid;
        petsData.getPetsByUser(userUid)
            .then(pets => { this.setState({ pets }) });
    };

    componentDidMount() {
        const uid = authData.getUid();
        authData.getUserByUid(uid)
        .then((response) =>{
            this.setState({ user: response});
            this.getPetsForDashboard();
        });
    }

    nameChange = (e) => {
        e.preventDefault();
        this.setState({ petName: e.target.value });
    }

    savePet = () => {
        const newPet = {
            name: this.state.petName,
            userId: this.state.user.id,
        }
        petsData.addNewPet(newPet, () => this.getPetsForDashboard())        
        this.toggle();
    };

    render() {
        const { pets, isOpen, petName } = this.state;
        const buildPetsList = pets.map((p) => {
            return (<SinglePet key={p.id} pet={p} />)
        });

        return (
            <div className="PetsDashboard col-12">
                <h1>Pets</h1>
                <table className="table custom-table">
                    <tbody>{buildPetsList}</tbody>
                </table>
                <br/>
                <button className='btn btn-custom' onClick={this.toggle}>Add New Pet</button>
                <Collapse isOpen={isOpen} className='col-3 collapse-form'>
                    <label htmlFor="petName">New Pet Name</label>
                    <input type="text" value={petName} onChange={this.nameChange} className="form-control" id="petName" aria-describedby="inputPetName" />
                    <button className="btn btn-custom" type="submit" onClick={this.savePet}>Submit</button>
                </Collapse>
            </div>
        );
    }
}

export default PetsDashboard;