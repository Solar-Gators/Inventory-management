import React from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Redirect } from 'react-router-dom';

export default class SearchField extends React.Component {

    state = {
        search: "",
        redirect: false
    }

    componentDidMount() {
        this.setState({ search: this.props.defaultValue ?? "" })
    }

    handleSubmit = (event) => {
        this.setState({ redirect: true })
        event.preventDefault();
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
    }

    render() {
        return (
            <React.Fragment>
                <Form inline onSubmit={this.handleSubmit}>
                    { this.state.redirect ? <Redirect to={"/results/" + this.state.search} /> : '' }
                    <Form.Group controlId="formSearch">
                        <Form.Label className="pr-0">
                            <Button variant="light" onClick={this.handleSubmit}>
                                <i className="fas fa-search" />
                            </Button>
                        </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Search"
                            name="search"
                            defaultValue={this.props.defaultValue ?? ""}
                            onChange={this.handleInputChange} />
                    </Form.Group>
                </Form>
            </React.Fragment>
        )
    }
}

