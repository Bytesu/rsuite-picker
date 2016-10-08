import React  from 'react';
import ReactDOM from 'react-dom';

const SearchBar = React.createClass({
    propTypes: {
        value: React.PropTypes.string,
        onChange: React.PropTypes.func
    },
    componentDidMount() {
        ReactDOM.findDOMNode(this.refs.input).focus();
    },
    render() {

        const { value, onChange } = this.props;
        return (
            <div className="searchBar">
                <input className="searchBar-input" ref='input'  value={value} onChange={onChange} />
            </div>
        );
    }
});

export default SearchBar;
