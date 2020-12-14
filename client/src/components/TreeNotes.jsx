import React, { Component } from 'react'
import { List } from 'semantic-ui-react'

function ListNotes(props) {
    let list = null
    if (props.visible) {
        list = (
            <List divided relaxed size="medium">
                { props.notes.map((note, index) => {
                    return ListNote(note, index, props.indexStart, props.active, props.onSelect)
                }) }
            </List>
        )
    }
    return list
}

function ListNote(note, index, start, active, select) {
    let icon = 'warning sign'
    if (note.type === 'NOTE') {
        if (active === note) {
            icon = 'sticky note'
        } else {
            icon = 'sticky note outline'
        }
    }
    if (note.type === 'FOLDER') {
        if (active === note) {
            if (active.viewChildren === true) {
                icon = 'folder open'
            } else {
                icon = 'folder'
            }
        } else {
            if (note.viewChildren === true) {
                icon = 'folder outline open'
            } else {
                icon = 'folder outline'
            }
        }
    }
    return (
        <List.Item key={index} tabIndex={start + index}>
            <List.Icon name={icon} />
            <List.Content>
                <List.Header onClick={() => select(note)}>{note.title}</List.Header>
                <ListNotes notes={note.children} active={active} onSelect={select} visible={note.viewChildren} />
            </List.Content>
        </List.Item>
    )
}

export default class TreeNotes extends Component {
    render() {
        const { active, notes, onSelect, indexStart } = this.props
        return ( 
            <ListNotes notes={notes} active={active} onSelect={onSelect} indexStart={indexStart} visible />
        )
  }
}
