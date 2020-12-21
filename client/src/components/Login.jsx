import React from 'react'
import httpClient from '../httpClient'

import { Button, Form, Grid, Message, Segment } from 'semantic-ui-react'

class Login extends React.Component {
	state = { error: null, username: '', password: ''}
    handleChangeUsername = (e) => {
        this.setState({ username: e.target.value })
    }
    handleChangePassword = (e) => {
        this.setState({ password: e.target.value })
    }
	onFormSubmit = (evt) => {
		evt.preventDefault()
		httpClient.logIn(this.state).then(data => {
			this.setState({ error: null, username: '', password: '' })
			if (data.success) {
                this.props.onLoginSuccess(data.user)
                this.props.history.push('/')
			} else {
                this.setState({ error: data.message })
            }
		})
	}
	
	render() {
		const { error, username, password } = this.state
		return (
            <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 350 }}>
                    <Form onSubmit={this.onFormSubmit.bind(this)} size='large'>
                        <Segment>
                            { error ? <Message negative>{error}</Message> : null }
                            <Form.Input fluid icon='user' iconPosition='left' placeholder='Username' value={username} onChange={this.handleChangeUsername} />
                            <Form.Input fluid icon='lock' iconPosition='left' placeholder='Password' type='password' value={password} onChange={this.handleChangePassword} />
                            <Button type="submit">Login</Button>
                        </Segment>
                    </Form>
                </Grid.Column>
            </Grid>
		)
	}
}

export default Login