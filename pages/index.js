import React, {Component} from "react";
import factory from "../ethereum/factory";
import {Card, Button} from "semantic-ui-react";
import Layout from "../components/Layout";
import {Link} from "../routes";

class SzervizkonyvIndex extends Component {
    static async getInitialProps() {
        const vheicles = await factory.methods.getJarmuvek().call();
        return {vheicles};
    }

    renderVheicles() {
        const items = this.props.vheicles.map(address => {
            return {
                header: address,
                description: <a>View Vheicle</a>,
                fluid: true
            }
        });

        return <Card.Group items={items}/>
    }

    render() {
        return (
            <Layout>
                {this.renderVheicles()}
            </Layout>
        );
    }
}

export default SzervizkonyvIndex;