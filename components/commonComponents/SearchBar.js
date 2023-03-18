import React, {Component} from "react";
import {Input} from "semantic-ui-react";

class SearchBar extends Component {
    state = {
        lookup: ""
    }

    onLookupChange(lookup) {
        this.setState({lookup});
        this.props.onLookupChange(lookup);
    }

    render () {
        return <Input
            type="text"
            value={this.state.lookup}
            onChange={event => this.onLookupChange(event.target.value)}/>;
    }
}

export default SearchBar;