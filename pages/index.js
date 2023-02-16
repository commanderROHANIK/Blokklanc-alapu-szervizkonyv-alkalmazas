import React, {Component} from "react";
import factory from "../ethereum/factory";
import {Card, Button} from "semantic-ui-react";
import Layout from "../components/Layout";
import {Link} from "../routes";

class SzervizkonyvIndex extends Component {
    static async getInitialProps() {
        const vheicles = await factory.methods.getJarmuvek().call();
        const services = await factory.methods.getSzervizek().call();
        return {vheicles, services};
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

    renderServices() {
        const items = this.props.services.map(address => {
            return {
                header: address,
                description: (
                    <Link route={`/services/${address}`}>
                        <a>View service center</a>
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
                <h3>Vehicles:</h3>
                {this.renderVheicles()}

                <h3>Service centers:</h3>
                {this.renderServices()}
            </Layout>
        );
    }
}

export default SzervizkonyvIndex;