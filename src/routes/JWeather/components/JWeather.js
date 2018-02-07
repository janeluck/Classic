import React, {Component} from 'react'
import {Map, MarkerGroup, PolygonGroup} from 'react-d3-map'
import PropTypes from 'prop-types'
import _ from 'lodash'
import topojson from 'topojson'
import provinces from 'provinces'
import 'src/styles/polygon.css'


var width = 700;
var height = 700;
var scale = 1 << 12;
var scaleExtent = [1 << 10, 1 << 14]
var center = [-100.95, 40.7];
var data = require('../../../../data/states.json');

var onPolygonMouseOut = function (dom, d, i) {
  console.log('out')
}
var onPolygonMouseOver = function (dom, d, i) {
  console.log('over')
}
var onPolygonClick = function (dom, d, i) {
  console.log('click')
}
var onPolygonCloseClick = function (id) {
  console.log('close click')
  console.log(id)
}
var popupContent = function (d) {
  return 'hi, i am polygon';
}

var Container = React.createClass({
  render: function () {
    return (
      <g>
        <PolygonGroup
          key={"polygon-test"}
          data={data}
          popupContent={popupContent}
          onClick={onPolygonClick}
          onCloseClick={onPolygonCloseClick}
          onMouseOver={onPolygonMouseOver}
          onMouseOut={onPolygonMouseOut}
          polygonClass={"your-polygon-css-class"}
        />
      </g>
    )
  }
})


class JWeather extends Component {
  constructor(props) {
    super(props)

  }

  render() {
    return ( <div style={{margin: '0 auto'}}>
      <h1>jweather</h1> <Map
      width={width}
      height={height}
      scale={scale}
      scaleExtent={scaleExtent}
      center={center}
      clip={true}
      bounds={[[0, 0], [width, height]]}
    >
      <Container/>
    </Map>

    </div>)
  }
}


JWeather.propTypes = {}

export default JWeather
