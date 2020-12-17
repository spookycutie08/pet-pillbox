import './MedHistory.scss';

import React from 'react';
import { Link } from 'react-router-dom';

import petsData from '../../../helpers/data/petsData';

class MedHistory extends React.Component {
    state = {
        pet: {},
    };
    getPetInfo = () => {
        const petId = this.props.match.params.petId * 1;
        petsData.getSinglePetById(petId)
            .then(pet => { this.setState({ pet }) });
    };
    
    componentDidMount() {
        this.getPetInfo();
    }

    render() {
        const { pet } = this.state;
        const buildHistoryTable = meds.map((med) => {
            return <MedHistoryTable key={med.id} med={med} pet={pet}/>
        })
        return (
            <div>
                <h1>{pet.name}'s Medication Log</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Medication</th>
                            <th scope="col">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {buildHistoryTable}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default MedHistory;