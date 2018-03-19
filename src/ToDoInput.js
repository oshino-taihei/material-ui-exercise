import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';

class ToDoInput extends Component {
    constructor (props) {
        super(props)
        this.state = {
            inputValue: '',
            error: false,
            errorMessage: ''
        }
    }

    handleChange = e => {
        const inputValue = e.target.value
        if (this.props.hasItem(inputValue)) {
            this.setState({
                inputValue: inputValue,
                error: true,
                errorMessage: 'すでにそのToDoは登録されています'
            })
        } else {
            this.setState({
                inputValue: inputValue,
                error: false,
                errorMessage: ''
            })
        }
    }

    handleClick = e => {
        const inputValue = this.state.inputValue
        if (!this.props.hasItem(inputValue)) {
            this.props.addItem(inputValue)
            this.setState({
                inputValue: ''
            })
        }
    }

    render () {
        return (
            <form noValidate autoComplete="off">
                <TextField
                    id="name"
                    label="リストに追加"
                    value={this.state.inputValue}
                    error={this.state.error}
                    helperText={this.state.errorMessage}
                    onChange={this.handleChange}
                    margin="normal"
                />
                <Button variant="fab" mini color="secondary" aria-label="add" onClick={this.handleClick}>
                    <AddIcon />
                </Button>
            </form>
        )
    }
}
export default ToDoInput