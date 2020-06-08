import React, { Component, Fragment, lazy, Suspense } from 'react'
import { Switch, Route } from 'react-router'
import '../App.css'
const HomePage = lazy(() => import('../components/HomePage/HomePage'))
const BookCategory = lazy(() => import('../components/Book/BookCategory'))
const BookList = lazy(() => import('../components/Book/BookList'))
const MemberType = lazy(() => import('../components/Member/MemberType'))
const MemberList = lazy(() => import('../components/Member/MemberList'))

export default class AppRoute extends Component {
    render() {
        return (
            <Suspense fallback={<div className="lazyLoad">Loading....</div>}>
                <Fragment>
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route exact path="/book_category" component={BookCategory} />
                    <Route exact path="/book_list" component={BookList} />
                    <Route exact path="/member_type" component={MemberType} />
                    <Route exact path="/member_list" component={MemberList} />
                </Switch>
                </Fragment>
            </Suspense>
        )
    }
}
