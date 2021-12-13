import React from 'react'

import '../App.scss'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { Button, ButtonGroup } from 'reactstrap'

const TabsSelector = ({ activeTab, setActiveTab, options }) => (
  <>
    <ButtonGroup className="button" data-toggle="buttons">
      {options.map((option) => {
        console.log(
          'option',
          option,
          'activetab',
          activeTab,
          activeTab.id === option.id,
        )
        return (
          <Button
            id={option.id}
            size="sm"
            key={option.id}
            className={classNames('btn-primary ', {
              active: activeTab.id === option.id,
            })}
            onClick={() => setActiveTab(option)}
            style={{ padding: '10px 15px', borderRadius: '8pt' }}
            aria-pressed="true"
          >
            <span>{option.label}</span>
          </Button>
        )
      })}
    </ButtonGroup>
  </>
)

TabsSelector.propTypes = {
  activeTab: PropTypes.bool,
  setActiveTab: PropTypes.func,
  options: PropTypes.object,
}

export default TabsSelector
