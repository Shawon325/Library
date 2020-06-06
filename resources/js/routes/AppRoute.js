import React, { Component, Fragment } from 'react'
import { Switch, Route } from 'react-router'
import HomePage from '../components/HomePage/HomePage'
import BookCategory from '../components/Book/BookCategory'
import BookList from '../components/Book/BookList'
import MemberType from '../components/Member/MemberType'
import MemberList from '../components/Member/MemberList'

export default class AppRoute extends Component {
    render() {
        return (
            <Fragment>
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route exact path="/book_category" component={BookCategory} />
                    <Route exact path="/book_list" component={BookList} />
                    <Route exact path="/member_type" component={MemberType} />
                    <Route exact path="/member_list" component={MemberList} />
                </Switch>
            </Fragment>
        )
    }
}
