import React from 'react'
import PropTypes from 'prop-types'
import Brewery from './Brewery'
import { Header, Segment, Divider, Grid, Image, Button, Card, Icon } from 'semantic-ui-react';


class BreweriesList extends React.Component {

  mapBreweries(){
    return this.props.breweries.map(brewery =>

        <Brewery
          key={brewery.id}
          {...brewery}
        />

    );
  }

  render () {
    return(
      <div>
        {this.mapBreweries()}
      </div>
    )
  }
}
const styles = {
  header: {
    color: 'white'
  },
}

export default BreweriesList;
