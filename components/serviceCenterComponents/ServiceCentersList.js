import React from "react";
import {Link} from "../../routes";
import {Card} from "semantic-ui-react";

const ServiceCentersList = (props) => {
    let items = [];
    try {
        items = props.serviceCenters.map(address => {
            return {
                header: address,
                description: (
                    <Link route={`/services/${address}`}>
                        <a>View service center</a>
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

export default ServiceCentersList;