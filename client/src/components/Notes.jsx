import React, { Component } from 'react'
import { Button, Grid, Input, Segment } from 'semantic-ui-react'

import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

const editorConfiguration = {
    toolbar: [
        'bold',
        'italic',
        '|',
        'bulletedList',
        'numberedList',
        'indent',
        'outdent',
        '|',
        'heading',
        '|',
        'undo',
        'redo',
        '|',
        'link',
        'imageUpload',
        'blockQuote',
        '|',
        'insertTable',
        'tableColumn',
        'tableRow',
        'mergeTableCells'
    ]
}

export default class Notes extends Component {
    render() {
        const { note, onChangeContent, onChangeTitle, handleClickSave, stateSaved, onFocus } = this.props
        if (note) {
            let icon = "sticky note"
            if (note.type === "FOLDER") {
                icon = "folder"
            }
            let saveIcon = "save"
            if (stateSaved === true) {
                saveIcon = "save outline"
            }
            return ( 
                <Segment>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column width={8}>
                                <Input fluid icon={icon} iconPosition="left"
                                    value={note.title}
                                    onFocus={onFocus}
                                    onChange={(event, data) => onChangeTitle(event, data)} />
                            </Grid.Column>
                            <Grid.Column>
                                <Button icon={saveIcon} onClick={handleClickSave} />
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width={16}>
                                {note.content != null ?
                                <CKEditor
                                    editor={ClassicEditor}
                                    data={note.content}
                                    config={editorConfiguration}
                                    onFocus={onFocus}
                                    onChange={(event, editor) => {
                                        onChangeContent(editor.getData())
                                    }}
                                />
                                    : null}
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>
            )
        } else {
            return null
        }
  }
}
