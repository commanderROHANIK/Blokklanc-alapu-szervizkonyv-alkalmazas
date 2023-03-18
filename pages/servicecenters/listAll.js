import React, {Component} from "react";
import factory from "../../ethereum/factory";
import Layout from "../../components/commonComponents/Layout";
import ServiceCentersList from "../../components/serviceCenterComponents/ServiceCentersList";
import SearchBar from "../../components/commonComponents/SearchBar";
import ServiceCenter from "../../ethereum/serviceCenter";

class SzervizkonyvIndex extends Component {
    state = {
        results: []
    };

    static async getInitialProps() {
        const serviceCenterAddresses = await factory.methods.getSzervizek().call();
        var serviceCenters = new Set();

        for (const x of serviceCenterAddresses) {
            let serviceCenter = ServiceCenter(x);
            serviceCenters[x] = await serviceCenter.methods.getSummary().call();
        }

        return {serviceCenterAddresses, serviceCenters};
    }

    search(lookup) {
        let results = [];

        for (let k of this.props.serviceCenterAddresses) {
            let summary = this.props.serviceCenters[k];
            if (summary[1] === lookup) {
                results.push(k);
            }
        }

        this.setState({results: results})
    }

    render() {
        return (
            <Layout>
                <h3>Search</h3>
                <SearchBar onLookupChange={lookup => this.search(lookup)}/>
                <h3>Service centers</h3>
                <ServiceCentersList
                    serviceCenters={this.state.results.length === 0 ? this.props.serviceCenterAddresses : this.state.results}/>
            </Layout>
        );
    }
}

export default SzervizkonyvIndex;