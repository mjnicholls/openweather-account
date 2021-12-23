import React, { useState } from 'react'

import classNames from 'classnames'
import PropTypes from 'prop-types'
import { Edit } from 'react-ikonate'
import { Input } from 'reactstrap'

const EditableInput = ({ content, setContent, error }) => {
  const [isEdit, setIsEdit] = useState(false)

  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      setIsEdit(false)
    } else {
      setIsEdit(true)
    }
  }

  return isEdit || !content.length ? (
    <>
      <Input
        type="text"
        className={`owm-selector ${error ? 'danger-border' : ''}`}
        style={{ maxWidth: '300px' }}
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder="Enter name" // TODO
        value={content}
      />
      <div className={classNames('invalid-feedback ', error ? 'd-block' : '')}>
        {error}
      </div>
    </>
  ) : (
    <div className="d-flex align-items-center">
      <h5 className="m-0">
        {content}
        <Edit
          className="ms-2"
          onClick={() => {
            setIsEdit(true)
          }}
        />
      </h5>
    </div>
  )
}

EditableInput.propTypes = {
  content: PropTypes.string,
  setContent: PropTypes.func,
  error: PropTypes.string,
}

export default EditableInput
