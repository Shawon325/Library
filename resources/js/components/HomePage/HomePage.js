import React, { Component, Fragment } from 'react'
import NavBar from '../NavBar/NavBar'

export default class HomePage extends Component {
    render() {
        return (
            <Fragment>
                <NavBar/>
                <h1>This is my HomePage</h1>
            </Fragment>
        )
    }
}
