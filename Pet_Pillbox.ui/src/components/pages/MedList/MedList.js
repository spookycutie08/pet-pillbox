import './MedList.scss';

import React from 'react';
import { Link } from 'react-router-dom';

import medListData from '../../../helpers/data/medListData';
import petsData from '../../../helpers/data/petsData';

import MedListTable from '../../shared/MedListTable/MedListTable';

class MedList extends React.Component {
    state = {
        meds: [],
        pet: {},
    };

    getMedList = () => {
        const petId = this.props.match.params.petId * 1;
        medListData.getMedsByPetId(petId)
            .then(meds => { this.setState({ meds }) });
    };

    getPetInfo = () => {
        const petId = this.props.match.params.petId * 1;
        petsData.getSinglePetById(petId)
            .then(pet => { this.setState({ pet }) });
    };

    componentDidMount() {
        this.getMedList();
        this.getPetInfo();
    }

    render() {
        const { meds, pet } = this.state;
        const buildMedsTable = meds.map((med) => {
            return <MedListTable key={med.id} med={med} pet={pet}/>
        })
        const addMedLink = `/addMed/${pet.id}`;
        return (
            <div>
                <h1>{pet.name}'s Current Medications</h1>

                <Link className='btn btn-custom' to={addMedLink}><i class="fas fa-plus"></i> Add New</Link>

                <table className="table table-custom table-borderless" id="medlist-table">
                    <thead className="text-left">
                        <tr>
                            <th colspan="2">Medication</th>
                        </tr>
                    </thead>
                    <tbody>
                        {buildMedsTable}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default MedList;