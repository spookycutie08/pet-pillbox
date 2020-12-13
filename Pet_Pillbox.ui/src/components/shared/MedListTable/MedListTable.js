import './MedListTable.scss'

import React from 'react';

class MedListTable extends React.Component {
    render() {
        const { med } = this.props;
        if (med) {
            return (
                <div>
                    <tr>
                        <td>{med.name}</td>
                    </tr>
                </div>
            )

        } else {
            return (
            <h4>This pet has no medications.</h4>
        );
        }
    }
}

export default MedListTable;