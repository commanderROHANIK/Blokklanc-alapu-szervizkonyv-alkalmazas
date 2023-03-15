import React, {Component} from "react";
import factory from "../../ethereum/factory";
import Layout from "../../components/Layout";
import Vheicle from "../../ethereum/vheicle";
import VehicleList from "../../components/VehicleList";
import VehicleSearch from "../../components/VehicleSearch";

class AllVheicles extends Component {
    state = {
        results: []
    };
    static async getInitialProps() {
        const vehiclesAddresses = await factory.methods.getJarmuvek().call();
        var vehicles = new Set();

        for (const x of vehiclesAddresses) {
            let vehicle = Vheicle(x);
            vehicles[x] = await vehicle.methods.getSummary().call();
        }

        return {vehiclesAddresses, vehicles};
    }

    search(lookup) {
        let results = [];

        for (let k of this.props.vehiclesAddresses) {
            let summary = this.props.vehicles[k];
            if (summary[0] === lookup) {
                results.push(k);
            }
        }

        this.setState({results: results})
    }

    render() {
        return (
            <Layout>
                <VehicleSearch onLookupChange={lookup => this.search(lookup)}/>
                <h3>Vehicles</h3>
                <VehicleList
                    vehicles={this.state.results.length === 0 ? this.props.vehiclesAddresses : this.state.results}/>
            </Layout>
        );
    }
}

export default AllVheicles;