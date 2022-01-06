import React from 'react'

const HeaderFindWeather = () => (
  <div className="input-group search d-none d-xxl-flex">
    <div className="input-group-append">
      <button className="btn btn-secondary" type="button">
        <img
          src="https://openweathermap.org/themes/openweathermap/assets/img/owm_icons/icon_search.svg"
          alt="search bar logo"
        />
      </button>
    </div>
    <form
      className="input"
      action="https://openweathermap.org/find"
      acceptCharset="UTF-8"
      method="get"
    >
      <input name="utf8" type="hidden" value="&#x2713;" />
      <input
        type="text"
        className="form-control"
        placeholder="Weather in your city"
        name="q"
      />
    </form>
  </div>
)

export default HeaderFindWeather
