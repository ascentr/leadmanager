import React, { Component } from 'react';
import { Link , Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { login } from '../../actions/auth';


export class Login extends Component {

    state = {
        username: '' ,
        password: '',
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value })
    
    static propTypes = {
        login: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool
    }

    onSubmit = e => {
        e.preventDefault();
        this.props.login( this.state.username, this.state.password )
    }

    render(){
        if (this.props.isAuthenticated){
            return <Redirect to="/" />
        }
        const { username, password } = this.state;

        return(
            <div className="col-md-6 m-auto">
            <div className="card card-body mt-5">
                <h2 className="text-center">Login</h2>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username</label>
                        <input type="text" className="form-control" name="username" value={username} onChange={this.onChange} />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" name="password" value={password} onChange={this.onChange}  />
                    </div>

                    <div className="form-group">
                        <button type="submit" className="btn btn-primary" >
                           Login
                        </button>
                    </div>
                    <p>
                        Don't have an account ? <Link to="/Register">Register </Link>
                    </p>
                </form>
            </div>
        </div>
    
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated : state.auth.isAuthenticated
});

export default  connect(mapStateToProps , {login} )(Login);
