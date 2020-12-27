import React from "react";
import { Link } from "react-router-dom";
import "./SinglePet.scss";

class SinglePet extends React.Component {
    render() {
        const { pet } = this.props;
        const linkPath = `/medlist/pet/${pet.id}`;
        return (
            <div>
                <Link to={linkPath}>{pet.name}</Link>
            </div>
        );
    }
}

export default SinglePet;