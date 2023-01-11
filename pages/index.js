import React, {Component} from "react";
import factory from "../ethereum/factory";
import {Card, Button} from "semantic-ui-react";
import Layout from "../components/Layout";
import {Link} from "../routes";

class CampaignIndex extends Component {
    static async getInitialProps() {
        const campaigns = await factory.methods.getSzervizek().call();
        return {campaigns};
    }

    renderCampaigns() {
        const items = this.props.campaigns.map(address => {
            return {
                header: address,
                description: <a>View Campaign</a>,
                fluid: true
            }
        });

        return <Card.Group items={items}/>
    }

    render() {
        return (
            <Layout>
                {this.renderCampaigns()}
            </Layout>
        );
    }
}

export default CampaignIndex;