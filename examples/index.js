import React from 'react';
import ReactDOM from 'react-dom';

import { Header, Navbar, Nav, Row, Col } from 'rsuite';

import '../src/less/index.less';
import './style.less';

import SimpleExample from './SimpleExample';
import OptionGroupExample from './OptionGroupExample';

const App = React.createClass({
    render() {

        return (
            <div className="doc-page">
                <Header  inverse>
                    <div className="container">
                        <Navbar.Header>
                            <Navbar.Brand>
                                <a href="#"><span className="prefix">R</span>Suite  Table</a>
                            </Navbar.Brand>
                            <Navbar.Toggle />
                        </Navbar.Header>
                        <Navbar.Collapse>
                            <Nav pullRight>
                                <Nav.Item  href="https://github.com/rsuite/rsuite-table">GitHub</Nav.Item>
                            </Nav>
                        </Navbar.Collapse>
                    </div>
                </Header>

                <div className="container">
                    <h2>The basics</h2>
                    <p>Single select boxes</p>
                    <Row>
                        <Col md={6}>
                            <SimpleExample />
                        </Col>
                        <Col  md={6}>

                        </Col>
                    </Row>

                    <p>Option group support</p>
                    <Row>
                        <Col md={6}>
                            <OptionGroupExample />
                        </Col>
                        <Col  md={6}>

                        </Col>
                    </Row>

                </div>

            </div>

        );
    }
});

ReactDOM.render(<App/>,
    document.getElementById('app')
);
