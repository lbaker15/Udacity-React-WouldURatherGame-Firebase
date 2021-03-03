import React from 'react'
import { connect } from 'react-redux'
import { getData } from '../actions/receive'
import { getQues } from '../actions/questions'
import { Route, Link, Redirect, useLocation, useHistory, HashRouter } from 'react-router-dom'
import HomeList from './answered'
import { signOut } from '../actions/signup'
import { unansweredQuestions } from '../actions/unanswered'
import { answeredQuestions } from '../actions/answered'
import '../index.css'
import Login from './login'
import Error from './error'
import AnsweredLink from './theLink'
import addQuestion from './addQuestion'
import board from './leaderboard'
import CreateUser from './create'

function LoginPage() {
    let history = useHistory()
    let location = useLocation()
    let {from} = location.state || {from: {pathName: "/"}}
    let login = () => {
        history.replace(from)
    } 
    return (
        <Route exact path='/'>
            <Login log={login} />    
        </Route> 
    )
}

class App extends React.Component {
    componentDidMount () {
        this.props.dispatch(getData())
        this.props.dispatch(getQues())
    }

    logout = (e) => {
        this.props.dispatch(signOut(null))
        this.props.dispatch(unansweredQuestions(null))
        this.props.dispatch(answeredQuestions(null))
    }

    render() {
        const { signup, loading } = this.props
        const PrivateRoute = ({ component: Component, ...rest }) => (
            <Route {...rest} render={(props) => (
              this.props.signup !== null
                ? <Component {...props} />
                : <Redirect to={{
                    pathname: '/',
                    state: { from: props.location }
                  }} />
            )} />
        )
        if (loading) {
        return (
            <HashRouter basename="/">
            <div className="aligner">
                <div className="loader"></div>
            </div>
            </HashRouter>
            )
        } else {       
            console.log("TEST", signup, this.props.create)
            if (signup === null) {
                return (      
                    <HashRouter basename="/">
                    <div>
                        <LoginPage />       
                        <Route path='/create' component={CreateUser} />
                        <PrivateRoute path="/leaderboard" component={board} />
                        <PrivateRoute path="/add" component={addQuestion} />
                        <PrivateRoute path='/question/:value' component={AnsweredLink} />
                        {/* {this.props.create !== true && 
                            <Route path='/:value' component={Error} />
                        } */}
                    </div>
                    </HashRouter> 
                )}      
                else { 
                    return (
                        <HashRouter basename="/">
                        <div> 
                            <div className="welcome">
                                <h1>Welcome {signup} </h1>
                                <Link to="/"><button className="button colorOne">Home</button></Link>
                                <Link to="/leaderboard">
                                    <button className="button colorTwo">Leaderboard</button>
                                </Link>
                                <Link to="/add">
                                    <button className="button colorThree">Add question</button>
                                </Link>
                                <Link to="/">
                                    <button className="button colorFour" onClick={(e) => this.logout(e)}>Log Out</button>
                                </Link>
                            </div>
                        
                            <Route exact path='/' render={() => (         
                                <div>
                                  <HomeList />
                                </div>
                            )} />
            
                            <Route path='/question/:value' component={AnsweredLink} />
                            <Route path='/add' component={addQuestion} />
                            <Route path='/leaderboard' component={board} />
                        </div>
                    </HashRouter>
                    )
                }   
            }
    }
}


export default connect((state) => ({
    signup: state.signup,
    receive: state.receive,
    questions: state.questions,
    unanswered: state.unanswered,
    answered: state.answered,
    loading: state.loading,
    create: state.create
}))(App)

/*
function LoginPage() {
    let history = useHistory()
    let location = useLocation()
    let {from} = location.state || {from: {pathName: "/"}}
     return (
        <Route exact path='/'>
            <Login />    
        </Route> 
    )
}
*/