import React from "react";
import {Icon, Menu} from "semantic-ui-react";
import {Link} from "../routes";

export default () => {
    return (
        <Menu style={{marginTop: '10px'}}>
            <Menu.Menu>
                <Link route="/">
                    <a className="item">
                        <Icon name='home'/>
                    </a>
                </Link>
                <Link route="/servicecenters/listAll">
                    <a className="item">
                        List all service centers
                    </a>
                </Link>
                <Link route="/vheicles/listAll">
                    <a className="item">
                        List all vehicles
                    </a>
                </Link>
                <Link route="/servicecenters/new">
                    <a className="item">
                        Add service center
                    </a>
                </Link>
                <Link route="/vheicles/new">
                    <a className="item">
                        Add vehicle
                    </a>
                </Link>
            </Menu.Menu>
        </Menu>
    );
}