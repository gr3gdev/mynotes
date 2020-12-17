import React, { Component } from 'react'
import { Icon, Label, Menu, Message, Segment } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom'
import httpClient from '../httpClient'

import Notes from './Notes'
import TreeNotes from './TreeNotes'

export default class Home extends Component {
    state = { 
        active: null,
        notes: [],
        visible: true,
        edit: false,
        saved: false,
        error: null,
        currentUser: this.props.user
    }
    componentDidMount = (props) => {
        if (this.state.currentUser) {
            httpClient.getNotes().then(res => this.setState({ notes: res }))
            document.querySelector('[tabindex = "1"]').focus()
        }
    }
    handleSelectNote = (elt) => {
        if (elt.type === 'FOLDER') {
            elt.viewChildren = !elt.viewChildren
        }
        const { active, edit } = this.state
        if (edit === true && active !== null && active.id !== elt.id) {
            // Sauvegarde au changement de note (si la note a été modifiée)
            this.save()
        }
        this.setState({
            active: elt,
            edit: false
        })
    }
    save = () => {
        httpClient.saveNotes(this.state.notes)
            .then(res => this.setState({ saved: res }))
    }
    addElement = (elt) => {
        const active = this.state.active
        const notes = this.state.notes
        if (active && active.type === 'FOLDER') {
            active.children.push(elt)
            active.viewChildren = true
        } else {
            notes.push(elt)
        }
        this.setState({
            active: elt,
            notes: notes
        })
        this.save()
    }
    handleClickAddNote = () => {
        this.addElement({ id: new Date().getTime(), title: 'NewNote', type: 'NOTE', content: '', children: [], viewChildren: false })
    }
    handleClickAddFolder = () => {
        this.addElement({ id: new Date().getTime(), title: 'NewFolder', type: 'FOLDER', content: null, children: [], viewChildren: false })
    }
    removeFromParent = (parents, elt) => {
        parents.forEach((e) => {
            if (e.id === elt.id) {
                parents.splice(parents.indexOf(e), 1)
            } else if (e.children.length > 0) {
                this.removeFromParent(e.children, elt)
            }
        })
    }
    handleClickRemove = () => {
        const { active, notes } = this.state
        if (active) {
            this.removeFromParent(notes, active)
            this.setState({
                active: null,
                notes: notes
            })
            this.save()
        }
    }
    changeSelected = (title, content) => {
        const active = this.state.active
        if (title) {
            active.title = title
        }
        if (content) {
            active.content = content
        }
        this.setState({
            active: active,
            edit: true,
            saved: false
        })
    }
    handleTitleChange = (evt, data) => {
        this.changeSelected(data.value, null)
    }
    handleEditorChange = (text) => {
        this.changeSelected(null, text)
    }
    setVisible = (state) => {
        this.setState({
            visible: state
        })
    }
    handleClickViewMenu = () => {
        const visible = this.state.visible
        this.setState({
            visible: !visible
        })
    }
    handleClickImport = () => {
        const file = document.createElement('input')
        file.type = 'file'
        file.hidden = true
        file.onchange = (e) => {
            const files = e.target.files
            if (files.length === 1) {
                const file = files[0]
                const reader = new FileReader()
                reader.onload = (event) => {
                    this.setState({
                        notes: JSON.parse(event.target.result)
                    })
                    this.save()
                }
                reader.readAsText(file)
            }
        }
        document.body.appendChild(file)
        file.click()
        document.body.removeChild(file)
    }
    handleClickExport = () => {
        const json = JSON.stringify(this.state.notes)
        const blob = new Blob([json], {type:'application/json'})
        const href = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = href
        link.hidden = true
        link.download = "notes.json"
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }
    sortNotes = (notes) => {
        if (notes) {
            const mapped = notes.map((e, i) => {
                return { index: i, value: e.title.toLowerCase() }
            })
            mapped.sort((a, b) => {
                if (a.value > b.value) {
                    return 1
                }
                if (a.value < b.value) {
                    return -1
                }
                return 0
            })
            return mapped.map((e) => {return notes[e.index]})
        } else {
            return []
        }
    }

    render() {
        const { active, currentUser, visible, saved, error } = this.state
        if (!currentUser) {
            return <Redirect to="/login" />
        } else {
            const notes = this.sortNotes(this.state.notes)
            let iconSidebar = 'angle double right'
            if (visible) {
                iconSidebar = 'angle double left'
            }
            return (
                <Segment.Group horizontal raised className="mynotes">
                    <Segment className="mynotes__menu mynotes__segment">
                        <Menu icon={!visible} compact vertical>
                            <Menu.Item onClick={this.handleClickViewMenu} tabIndex='1'>
                                <Icon name={iconSidebar} />{ visible ? "Menu" : null }
                            </Menu.Item>
                            <Menu.Item onClick={this.handleClickAddNote} tabIndex='2'>
                                <Icon name='sticky note' />{ visible ? "Ajouter une note" : null }
                            </Menu.Item>
                            <Menu.Item onClick={this.handleClickAddFolder} tabIndex='3'>
                                <Icon name='folder' />{ visible ? "Ajouter un dossier" : null }
                            </Menu.Item>
                            <Menu.Item onClick={this.handleClickImport} tabIndex='4'>
                                <Icon name='upload' />{ visible ? "Importer les notes" : null }
                            </Menu.Item>
                            <Menu.Item onClick={this.handleClickExport} tabIndex='5'>
                                <Icon name='download' />{ visible ? "Exporter les notes" : null }
                            </Menu.Item>
                            <Menu.Item onClick={this.handleClickRemove} disabled={!active} tabIndex='6'>
                                <Icon name='remove' />{ visible ? "Supprimer" : null }
                            </Menu.Item>
                        </Menu>
                        { visible ? 
                            <Segment compact>
                                <Label ribbon color="green">Notes</Label>
                                <TreeNotes notes={notes} active={active} onSelect={this.handleSelectNote} indexStart={7} />
                            </Segment>
                            : null
                        }
                    </Segment>
                    <Segment className="mynotes__segment">
                        { error ? <Message negative>{error}</Message> : null }
                        <Notes note={active} stateSaved={saved} 
                            onFocus={() => this.setVisible(false)}
                            onChangeContent={this.handleEditorChange} 
                            onChangeTitle={this.handleTitleChange} 
                            handleClickSave={this.save} />
                    </Segment>
                </Segment.Group>
            )
        }
    }
}
