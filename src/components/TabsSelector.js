import React from 'react'
import '../App.scss'
import classNames from 'classnames'
import { Button, ButtonGroup } from 'reactstrap'

const TabsSelector = ({ activeTab, setActiveTab, options }) => {
  const customStyles = {
    input: (provided) => ({
      ...provided,
    }),
  }

  return (
    <>
      <ButtonGroup className="button" data-toggle="buttons">
        {options.map((option) => (
          <Button
            id={option.id}
            size="sm"
            tag="label"
            key={option.id}
            className={classNames('btn-primary', {
              active: activeTab.id === option.id,
            })}
            onClick={() => setActiveTab(option)}
            style={{ padding: '10px 15px', borderRadius: "8pt" }}
          >
            <span>{option.label}</span>
          </Button>
        ))}
      </ButtonGroup>


    </>
  )
}

export default TabsSelector
