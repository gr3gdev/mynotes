import './App.css'
import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import httpClient from './httpClient'

import Home from './components/Home'
import Login from './components/Login'
import Logout from './components/Logout'

export default class App extends Component {
    state = { 
        currentUser: httpClient.getCurrentUser()
    }
    onLoginSuccess = (user) => {
        this.setState({ currentUser: httpClient.getCurrentUser() })
    }
    onLogOut = () => {
        httpClient.logOut()
		this.setState({ currentUser: null })
    }

    render() {
        const { currentUser } = this.state
        return (
            <div className="App">
                <Switch>
                    <Route path="/login" render={(props) => {
                        return <Login {...props} onLoginSuccess={this.onLoginSuccess.bind(this)} />
                    }} />
                    <Route path="/logout" render={(props) => {
                        return <Logout onLogOut={this.onLogOut.bind(this)} />
                    }} />
                    <Route path="/" render={(props) => {
                        return <Home user={currentUser} />
                    }} />
                </Switch>
            </div>
        )
    }
}
