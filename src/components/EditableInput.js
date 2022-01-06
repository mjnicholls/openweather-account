import React, { useState } from 'react'

import PropTypes from 'prop-types'
import { Edit } from 'react-ikonate'
import { Input } from 'reactstrap'

const EditableInput = ({ content, setContent, error, tagName }) => {
  const [isEdit, setIsEdit] = useState(false)

  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      setIsEdit(false)
    } else {
      setIsEdit(true)
    }
  }

  return isEdit || !content.length ? (
    <div className="d-flex align-items-center">
      <div className="d-flex flex-grow-1 flex-column">
        <Input
          type="text"
          className={`owm-selector ${error ? 'danger-border' : ''}`}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Enter name" // TODO
          value={content}
        />
        <div className={`invalid-feedback ${error ? 'd-block' : ''}`}>
          {error}
        </div>
      </div>
      <button
        type="button"
        className="padded-button"
        // className={`padded-button ${
        //   content.length ? 'padded-button-active' : ''
        // }`}
        onClick={() => setIsEdit(false)}
        aria-pressed="true"
        disabled={!content.length}
      >
        Set
      </button>
    </div>
  ) : (
    <div className="d-flex align-items-center">
      {tagName === 'p' ? (
        <p className="m-0">
          {content}
          <Edit
            className="ms-2"
            onClick={() => {
              setIsEdit(true)
            }}
          />
        </p>
      ) : tagName === 'h2' ? (
        <h2 className="m-0 p-0">
          {content}
          <Edit
            className="ms-2"
            onClick={() => {
              setIsEdit(true)
            }}
          />
        </h2>
      ) : (
        <h5 className="m-0">
          {content}
          <Edit
            className="ms-2"
            onClick={() => {
              setIsEdit(true)
            }}
          />
        </h5>
      )}
    </div>
  )
}

EditableInput.propTypes = {
  content: PropTypes.string,
  setContent: PropTypes.func,
  error: PropTypes.string,
  tagName: PropTypes.string,
}

export default EditableInput
