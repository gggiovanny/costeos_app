import React from "react";
import PropTypes from "prop-types";
import { Container, Button } from "react-floating-action-button";
import { GoPlus } from "react-icons/go";

export const FloatingButton = ({ tooltip, onClick }) => {
  return (
    <Container>
      <Button tooltip={tooltip} onClick={onClick}>
        <GoPlus />
      </Button>
    </Container>
  );
};

FloatingButton.propTypes = {
  tooltip: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

FloatingButton.defaultProps = {
  tooltip: null,
};
