import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemSecondaryAction, ListItemText } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import Icon from 'material-ui/Icon';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import AddIcon from 'material-ui-icons/Add';
import DeleteIcon from 'material-ui-icons/Delete';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
      }
  });

class ToDoList extends Component {
    constructor (props) {
        super(props)
        this.state = {
            checked: [0],
            text: '',
            hasError: false,
            errorText: '',
            items: ["掃除", "洗濯", "買い物"]
        };
        this.handleChange = this.handleChange.bind(this)
    }

    // チェックボックスが変更されたとき
    handleToggle (value) {
        const { checked } = this.state;
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];
    
        if (currentIndex === -1) {
          newChecked.push(value);
        } else {
          newChecked.splice(currentIndex, 1);
        }
    
        this.setState({
          checked: newChecked,
        });
    };

    // テキストフィードの値が変更されたとき
    handleChange (event) {
        const text = event.target.value
        if (this.state.items.indexOf(text) !== -1) {
            // アイテムがすでに存在する場合はエラー表示
            this.setState({
                text: text,
                hasError: true,
                errorText: 'すでにそのToDoは登録されています'
            })
        } else {
            // アイテムをリストに追加
            this.setState({
                text: text,
                hasError: false,
                errorText: ''
            })        
        }
    }

    // テキストからToDoリストにアイテムを追加し、テキストをクリア
    addItemFromText () {
        if (!this.state.hasError) {
            this.addItem(this.state.text)
            this.setState({text: ''})
        }  
    }

    // ToDoリストにアイテムを追加
    addItem (item) {
        this.state.items.push(item)
        this.setState({ items: this.state.items})
    }

    // ToDoリストからアイテムを削除
    deleteItem (item) {
        const index = this.state.items.indexOf(item)
        if (index !== -1) {
            this.state.items.splice(index, 1)
            this.setState({ items: this.state.items})
        }
    }

    render () {
        return (
            <List>
                <Icon color="primary" style={{ fontSize: 30 }}>
                    ToDoリスト
                </Icon>
                <form noValidate autoComplete="off">
                    <TextField
                        id="name"
                        label="リストに追加"
                        value={this.state.text}
                        error={this.state.hasError}
                        helperText={this.state.errorText}
                        onChange={this.handleChange}
                        margin="normal"
                    />
                     <Button variant="fab" mini color="secondary" aria-label="add" onClick={e => this.addItemFromText()}>
                        <AddIcon />
                    </Button>
                </form>
            {this.state.items.map(item => (
                <ListItem key={item} dense button onClick={e => this.handleToggle(item)}>
                <Checkbox
                    checked={this.state.checked.indexOf(item) !== -1}
                    tabIndex={-1}
                    disableRipple
                />
                <ListItemText primary={item} />
                <ListItemSecondaryAction>
                    <IconButton aria-label="削除">
                    <DeleteIcon onClick={e => this.deleteItem(item)} />
                    </IconButton>
                </ListItemSecondaryAction>
                </ListItem>
            ))}
            </List>
          );
    }
}

ToDoList.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(ToDoList);
