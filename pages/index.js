import React, {Component} from "react";
import factory from "../ethereum/factory";
import Layout from "../components/commonComponents/Layout";
import VehicleList from "../components/vehicleComponents/VehicleList";
import ServiceCentersList from "../components/serviceCenterComponents/ServiceCentersList";

class SzervizkonyvIndex extends Component {
    static async getInitialProps() {
        const vheicles = await factory.methods.getJarmuvek().call();
        const services = await factory.methods.getSzervizek().call();
        return {vheicles, services};
    }

    render() {
        return (
            <Layout>
                <h3>Vehicles</h3>
                <VehicleList
                    vehicles={this.props.vheicles}/>

                <h3>Service centers</h3>
                <ServiceCentersList
                    serviceCenters={this.props.services}/>
            </Layout>
        );
    }
}

export default SzervizkonyvIndex;