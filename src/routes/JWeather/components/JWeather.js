import React, {Component} from 'react'
import {Map, MarkerGroup, PolygonGroup} from 'react-d3-map'
import PropTypes from 'prop-types'
import _ from 'lodash'
import {Chart, Tooltip, Legend, View, Polygon, Point} from 'viser-react';
import geoData from '../../../../data/japan.geo.json'

console.log(geoData)
const DataSet = require('@antv/data-set');

const japanStateName = '"Kyoto Fu", "Saga Ken","Kumamoto Ken","Kagawa Ken","Aichi Ken","Tochigi Ken","Yamanashi Ken","Shiga Ken","Gunma Ken","Miyagi Ken","Shizuoka Ken","Ibaraki Ken","Okinawa Ken","Yamagata Ken","Wakayama Ken","Nagasaki Ken","Akita Ken","Okayama Ken","Fukuoka Ken","Gifu Ken","Aomori Ken","Osaka Fu","Nagano Ken","Oita Ken","Mie Ken","Hiroshima Ken","Hokkai Do","Hyogo Ken","Chiba Ken","Toyama Ken","Tokyo To","Saitama Ken","Yamaguchi Ken","Fukushima Ken","Ishikawa Ken","Fukui Ken","Ehime Ken","Nara Ken","Shimane Ken","Iwate Ken","Tottori Ken","Tokushima Ken","Kagoshima Ken","Niigata Ken","Kochi Ken","Miyazaki Ken","Kanagawa Ken"'

const data = japanStateName.replace(/"/g, '').split(',').map(function (name) {
  return {
    name,
    value: Math.floor(Math.random() * 150)
  }
})
console.log(data)
const scale = [{
  dataKey: 'longitude',
  sync: true,
}, {
  dataKey: 'latitude',
  sync: true,
}];

const userDataScale = [{
  dataKey: 'trend',
  alias: '每100位女性对应的男性数量',
}];

const view1Opts = {
  quickType: 'polygon',
  position: 'longitude*latitude',
  style: {
    fill: '#fff',
    stroke: '#ccc',
    lineWidth: 1
  },
  tooltip: false,
};
const view2Opts = {
  quickType: 'polygon',
  position: 'longitude*latitude',
  opacity: 'value',
  color: ['trend', ['#F51D27', '#0A61D7']],
  tooltip: 'name*trend',
  animate: {
    leave: {
      animation: 'fadeOut'
    }
  },
};
const worldMap = new DataSet.View().source(geoData, {
  type: 'GeoJSON',
});

const userDv = new DataSet.View().source(data).transform({
  geoDataView: worldMap,
  field: 'name',
  type: 'geo.region',
  as: ['longitude', 'latitude'],
}).transform({
  type: 'map',
  callback: (obj) => {
    obj.trend = (obj.value > 100) ? '男性更多' : '女性更多';
    return obj;
  }
});

class App extends React.Component {
  render() {


    return (
      <div>
        <Chart forceFit height={400} padding={[20, 20]} scale={scale}>
          <Tooltip showTitle={false}/>
          <Legend dataKey={'trend'} position={'left'}/>
          <View data={geoData} scale={scale}>
            <Polygon {...view1Opts} />
          </View>
          <View data={userDv} scale={userDataScale}>
            <Polygon {...view2Opts} />
          </View>
        </Chart>
      </div>
    );
  }
}


class JWeather extends Component {
  constructor(props) {
    super(props)

  }

  render() {
    return (<div><App/></div>)
  }
}


JWeather.propTypes = {}

export default JWeather
