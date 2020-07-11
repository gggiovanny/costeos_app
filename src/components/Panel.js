import React from 'react'
import PropTypes from 'prop-types'

export function Panel({ title, tabs, children, colorClass }) {
  return (
    <div>
      <nav className={'panel ' + (colorClass || 'is-primary')}>
        <p className="panel-heading">{title}</p>
        {tabs && (
          <p className="panel-tabs">
            {tabs.map((tab) => (
              <span className={tab.is_active && 'is-active'}>{tab.title}</span>
            ))}
          </p>
        )}
        {children.map((Child) => (
          <a className="panel-block">{Child}</a>
        ))}
      </nav>
    </div>
  )
}

Panel.propTypes = {
  title: PropTypes.string.isRequired,
  tabs: PropTypes.array,
  colorClass: PropTypes.string,
}

export default Panel
