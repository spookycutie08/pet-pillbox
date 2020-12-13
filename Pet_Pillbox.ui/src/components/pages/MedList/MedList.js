import './MedList.scss';

import React from 'react';

import medListData from '../../../helpers/data/medListData';

import MedListTable from '../../shared/MedListTable/MedListTable';

class MedList extends React.Component {
    state = {
        meds: [],
    };

    getMedList = () => {
        const petId = this.props.match.params.petId * 1;        
        medListData.getMedsByPetId(petId)
            .then(meds => { this.setState({ meds }) });
    };

    componentDidMount() {
        this.getMedList();
    }

    render() {
        const { meds } = this.state;
        const buildMedsTable = meds.map((med) => {
            return <MedListTable key={med.id} med={med}/>
        })
        return (
            <div>
                <h1>Med List component</h1>
                {buildMedsTable}
            </div>
        );
    }
}

export default MedList;