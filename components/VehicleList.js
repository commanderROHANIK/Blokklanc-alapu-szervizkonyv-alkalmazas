import React from "react";
import {Link} from "../routes";
import {Card} from "semantic-ui-react";

const VehicleList = (props) => {
    let items = [];
    try {
        items = props.vehicles.map(address => {
            return {
                header: address,
                description: (
                    <Link route={`/vheicles/${address}`}>
                        <a>View vehicle</a>
                    </Link>
                ),
                fluid: true
            };
        });
    } catch (err) {

    }

    return (
        <Card.Group
            items={items}
        />
    );
};

export default VehicleList;