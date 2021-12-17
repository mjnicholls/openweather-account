/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import PropTypes from 'prop-types'

/*


  .switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
  }

  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: $brand-grey;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  .slider:before {
    position: absolute;
    content: '';
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  input:checked + .slider {
    background-color: $brand-turquoise;
  }

  input:focus + .slider {
    box-shadow: 0 0 1px #2196f3;
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
  }

  .slider.round {
    border-radius: 34px;
  }

  .slider.round:before {
    border-radius: 50%;
  }

  */
const StatusToggle = ({ tempStatus, setTempStatus }) => (
  <label
    css={css`
      position: relative;
      display: inline-block;
      width: 60px;
      height: 34px;
    `}
  >
    <input
      css={css`
        opacity: 0;
        width: 0;
        height: 0;
        &:checked + span:before {
          -webkit-transform: translateX(26px);
          -ms-transform: translateX(26px);
          transform: translateX(26px);
        }
        &:focus + span {
          box-shadow: 0 0 1px #2196f3;
        }
      `}
      type="checkbox"
      checked={tempStatus === 'on'}
      onChange={() => {
        setTempStatus(tempStatus === 'on' ? 'off' : 'on')
      }}
    />
    <span
      css={css`
        position: absolute;
        box-shadow: 0 0 1px #2196f3;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: $brand-grey;
        border-radius: 34px;
        -webkit-transition: 0.4s;
        transition: 0.4s;
        &:before {
          position: absolute;
          content: '';
          height: 26px;
          width: 26px;
          left: 4px;
          bottom: 4px;
          background-color: white;
          border-radius: 50%;
          -webkit-transition: 0.4s;
          transition: 0.4s;
          background-color: #78cbbf;
        }
      `}
    ></span>
  </label>
)

StatusToggle.propTypes = {
  tempStatus: PropTypes.string,
  setTempStatus: PropTypes.func,
}

export default StatusToggle
