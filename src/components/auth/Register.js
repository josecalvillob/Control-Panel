import React, { Component } from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { notifyUser } from "../../actions/notifyActions";
import Alert from "../layout/Alert";
import { firebaseConnect } from "react-redux-firebase";
import { Redirect } from "react-router-dom";

class Register extends Component {
  state = {
    email: "",
    password: ""
  };

  // clears alert from other page
  componentWillMount() {
    const { notifyUser } = this.props;
    notifyUser("", "");
  }

  onSubmit = e => {
    e.preventDefault();
    const { firebase, notifyUser } = this.props;
    const { email, password } = this.state;

    // Register user with firebase
    firebase
      .createUser({ email, password })
      .catch(err => notifyUser("That user already exists", "error"));
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { message, messageType } = this.props.notify;
    const { allowRegistration } = this.props.settings;

    // if registration is not allowed, redirect to login page
    if (!allowRegistration) {
      return <Redirect to={"/login"} />;
    }

    return (
      <div className="row">
        <div className="col-md-6 mx-auto">
          <div className="card">
            <div className="card-body">
              {message ? (
                <Alert message={message} messageType={messageType} />
              ) : null}
              <h1 className="text-danger pb-4 pt-3">
                <span className="text-primary">
                  <i className="fas fa-lock" /> Register
                </span>
              </h1>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    required
                    value={this.state.email}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    required
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                </div>
                <input
                  type="submit"
                  value="Register"
                  className="btn btn-primary btn-block"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  firebase: PropTypes.object.isRequired,
  notify: PropTypes.object.isRequired,
  notifyUser: PropTypes.func.isRequired
};

export default compose(
  firebaseConnect(),
  connect(
    (state, props) => ({
      notify: state.notify,
      settings: state.settings
    }),
    { notifyUser } //When you have actions you have to add it here as a property
  )
)(Register);
