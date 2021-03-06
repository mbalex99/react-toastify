import React, { Component } from 'react';
import PropTypes from 'prop-types';
import config from './config';

const propTypes = {
  id: PropTypes.number.isRequired,
  closeButton: PropTypes.element.isRequired,
  children: PropTypes.node.isRequired,
  autoCloseId: PropTypes.number,
  autoCloseDelay: PropTypes.number,
  handleMouseEnter: PropTypes.func,
  handleMouseLeave: PropTypes.func,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  type: PropTypes.oneOf(Object.values(config.TYPE)),
  position: PropTypes.oneOf(Object.values(config.POSITION))
};

const defaultProps = {
  type: config.TYPE.DEFAULT
};

class Toast extends Component {
  constructor(props) {
    super(props);
    this.setRef = this.setRef.bind(this);
    this.ref = null;
  }

  componentDidMount() {
    this.props.onOpen(this.getChildrenProps());
  }

  componentWillUnmount() {
    this.props.onClose(this.getChildrenProps());
  }

  setRef(ref) {
    this.ref = ref;
  }

  getChildrenProps() {
    return this.props.children.props;
  }

  getToastProps() {
    const { autoCloseId, autoCloseDelay, handleMouseEnter, handleMouseLeave } = this.props;
    const props = {
      'data-toast-id': this.props.id,
      className: `toastify-content toastify-content--${this.props.type}`,
      ref: this.setRef,
    };

    if (this.props.autoCloseId) {
      props['data-auto-close-id'] = autoCloseId;
      props['data-auto-close-delay'] = autoCloseDelay;
      props.onMouseEnter = handleMouseEnter;
      props.onMouseLeave = handleMouseLeave;
    }

    return props;
  }

  componentWillEnter(callback) {
    this.ref.classList.add(`bounceIn--${this.props.position}`, 'animated');
    callback();
  }

  componentWillLeave(callback) {
    this.ref.classList.remove(`bounceIn--${this.props.position}`, 'animated');
    this.ref.classList.add(`bounceOut--${this.props.position}`, 'animated');
    setTimeout(() => callback(), 1000);
  }

  render() {
    return (
      <div {...this.getToastProps()}>
        {this.props.closeButton}
        <div className="toastify__body">
          {this.props.children}
        </div>
      </div>
    );
  }
}

Toast.defaultProps = defaultProps;
Toast.propTypes = propTypes;

export default Toast;
