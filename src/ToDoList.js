import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'
import List, { ListItem, ListItemSecondaryAction, ListItemText } from 'material-ui/List'
import Checkbox from 'material-ui/Checkbox'
import IconButton from 'material-ui/IconButton'
import DeleteIcon from 'material-ui-icons/Delete'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

import './ToDoList.css';

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
            items: this.props.items
        };
    }

    // チェックボックスが変更されたとき
    handleToggle = value => {
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
        })
    }

    render () {
        const listItems = this.props.items.map(item => {
            return (
                <ListItem key={item} dense button onClick={e => this.handleToggle(item)}>
                    <Checkbox
                        checked={this.state.checked.indexOf(item) !== -1}
                        tabIndex={-1}
                        disableRipple
                    />
                    <ListItemText primary={item} />
                    <ListItemSecondaryAction>
                        <IconButton aria-label="削除">
                        <DeleteIcon onClick={e => this.props.deleteItem(item)} />
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
            )
        })
        return (
            <List>
                <CSSTransitionGroup
                    transitionName="fade"
                    transitionAppear={false}
                    transitionEnter={true}
                    transitionEnterTimeout={300}
                    transitionLeave={true}
                    transitionLeaveTimeout={300}
                >
                    {listItems}
                </CSSTransitionGroup>
            </List>
        )
    }
}

export default withStyles(styles)(ToDoList);
