import React, {Component} from "react";
import factory from "../../ethereum/factory";
import {Card} from "semantic-ui-react";
import Layout from "../../components/commonComponents/Layout";
import {Link} from "../../routes";

class SzervizkonyvIndex extends Component {
    static async getInitialProps() {
        const services = await factory.methods.getSzervizek().call();
        return {services};
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
                <h3>Service centers</h3>
                {this.renderServices()}
            </Layout>
        );
    }
}

export default SzervizkonyvIndex;