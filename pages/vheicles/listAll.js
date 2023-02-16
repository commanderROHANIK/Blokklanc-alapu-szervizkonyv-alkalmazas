import React, {Component} from "react";
import factory from "../../ethereum/factory";
import {Card} from "semantic-ui-react";
import Layout from "../../components/Layout";
import {Link} from "../../routes";

class AllVheicles extends Component {
    static async getInitialProps() {
        const vheicles = await factory.methods.getJarmuvek().call();
        return {vheicles};
    }

    renderVheicles() {
        const items = this.props.vheicles.map(address => {
            return {
                header: address,
                description: (
                    <Link route={`/vheicles/${address}`}>
                        <a>View vehicle</a>
                    </Link>
                ),
                fluid: true
            }
        });

        return <Card.Group items={items}/>
    }

    render() {
        return (
            <Layout>
                <h3>Vehicles</h3>
                {this.renderVheicles()}
            </Layout>
        );
    }
}

export default AllVheicles;