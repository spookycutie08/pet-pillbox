import React from "react";
import { Link } from "react-router-dom";
import "./SinglePet.scss";

class SinglePet extends React.Component {
    render() {
        const { pet } = this.props;
        const linkPath = `/medlist/pet/${pet.id}`;
        return (
            <>
            <tr>
                <td><Link to={linkPath}>{pet.name}</Link></td>
            </tr>
            </>
        );
    }
}

export default SinglePet;