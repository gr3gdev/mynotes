import React from 'react'
import httpClient from '../httpClient'

import { Button, Form, Grid, Segment } from 'semantic-ui-react'

class Login extends React.Component {
	state = { username: '', password: ''}
    handleChangeUsername = (e) => {
        this.setState({ username: e.target.value })
    }
    handleChangePassword = (e) => {
        this.setState({ password: e.target.value })
    }
	onFormSubmit = (evt) => {
		evt.preventDefault()
		httpClient.logIn(this.state).then(user => {
			this.setState({ username: '', password: '' })
			if (user) {
				this.props.onLoginSuccess(user)
				this.props.history.push('/')
			}
		})
	}
	
	render() {
		const { username, password } = this.state
		return (
            <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Form onSubmit={this.onFormSubmit.bind(this)} size='large'>
                        <Segment>
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