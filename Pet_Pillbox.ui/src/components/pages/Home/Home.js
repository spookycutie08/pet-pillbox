import './Home.scss'

import Moment from 'moment';
import React from 'react';

import authData from '../../../helpers/data/authData';
import petsData from '../../../helpers/data/petsData';

import PetToday from '../../shared/PetToday/PetToday';

class Home extends React.Component {
    state = {
        pets: [],
        currentDateTime: '',
        uid: authData.getUid(),
    }

    getUserPets = () => {
        petsData.getPetsByUser(this.state.uid)
            .then(pets => { this.setState({ pets }) });
    };

    setCurrentDateTime = () => {
        const capDateTime = Moment().format();
        this.setState({ currentDateTime: capDateTime })
    };

    componentDidMount = () => {
        this.getUserPets();
        this.setCurrentDateTime();
    };

    render() {
        const { pets, currentDateTime } = this.state;

        const buildPetsToday = pets.map((p) => {
            return (<PetToday key={p.id} pet={p} currentDateTime={currentDateTime}/>)
        });
        return (
            <div>
                <h1>Due Today</h1>
                <table className="table custom-table">
                    {buildPetsToday}
                </table>
            </div>
        );
    }
}   

export default Home;