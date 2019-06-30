import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const Alert = props => {
  // pull out props
  const { message, messageType } = props; // just using props here not this.props because this is a functional component
  return (
    // alert will be the default class
    <div
      className={classnames("alert", {
        "alert-success": messageType === "success",
        "alert-danger": messageType === "error"
      })}
    >
      {message}
    </div>
  );
};

Alert.propTypes = {
  message: PropTypes.string.isRequired,
  messageType: PropTypes.string.isRequired
};

export default Alert;
