/** @jsxImportSource @emotion/react */

import React from 'react'

import { css } from '@emotion/react'
import PropTypes from 'prop-types'

const StatusToggle = ({ tempStatus, setTempStatus }) => (
  <div>
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
          &:checked + span {
            background-color: #78cbbf;
          }
          &:checked + span:before {
            background-color: white;
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
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #f2f2f2;
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
            background-color: white;
          }
        `}
      ></span>
    </label>
  </div>
)

StatusToggle.propTypes = {
  tempStatus: PropTypes.string,
  setTempStatus: PropTypes.func,
}

export default StatusToggle
