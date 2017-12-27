import React from 'react'
import Brewery from './Brewery'
import { Segment } from 'semantic-ui-react';


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
      <Segment basic>
        {this.mapBreweries()}
      </Segment>
    )
  }
}


export default BreweriesList;
