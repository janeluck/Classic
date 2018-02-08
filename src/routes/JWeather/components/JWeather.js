import React, {Component} from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import {Chart, Tooltip, Legend, View, Polygon, Point} from 'viser-react';
import geoData from '../../../../data/japan.geo.json'
import data from '../../../../data/japan.state.result.json'
const DataSet = require('@antv/data-set');
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
        <Chart forceFit height={600} padding={[20, 20]} scale={scale}>
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
