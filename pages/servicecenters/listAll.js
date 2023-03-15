import React, {Component} from "react";
import factory from "../../ethereum/factory";
import Layout from "../../components/commonComponents/Layout";
import ServiceCentersList from "../../components/serviceCenterComponents/ServiceCentersList";

class SzervizkonyvIndex extends Component {
    static async getInitialProps() {
        const services = await factory.methods.getSzervizek().call();
        return {services};
    }

    render() {
        return (
            <Layout>
                <h3>Service centers</h3>
                <ServiceCentersList
                    serviceCenters={this.props.services}/>
            </Layout>
        );
    }
}

export default SzervizkonyvIndex;