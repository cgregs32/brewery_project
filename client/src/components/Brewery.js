import React from 'react'
import placeholder from '../images/placeholder.jpg';

import { Header, Segment, Divider, Grid, Image, Button, Card, Icon } from 'semantic-ui-react';


class Brewery extends React.Component{

  paginateText(text){
    debugger
    const paginate = text
    if (text)
      if(text.length > 250)
        return paginate.slice(200, -1) + '...';
      return text
  }

  render(){

    const { name, description, images, established } = this.props
    return (

      <Card fluid style={styles.card}>
        <Grid>
          <Grid.Column width={8} style={styles.cardLeft}>
            <Card.Content>
              <Card.Header style={styles.cardName}>{name}</Card.Header>
              <Divider />
              <Card.Meta>Established in {established}</Card.Meta>
              <Card.Description>{this.paginateText(description)}</Card.Description>
            </Card.Content>
            <Card.Content extra>
              <a>
                <Icon name='user' />
                10 Friends
              </a>
            </Card.Content>
          </Grid.Column>

          <Grid.Column verticalAlign='middle' width={8}>
            {images ?
              <Image
                floated="right"
                src={images.large}
                alt={`${name} logo`}
              />
              :
              <Image
                centered
                src={placeholder}
                size="medium"
                alt='Brewery placeholder image'
              /> }
          </Grid.Column>
        </Grid>
      </Card>

    )
  }
}

const styles = {
  card: {
    color: 'black',
    height: '300px',
    padding: '5%',
  },
  cardName: {
    fontSize: '26px',
  },
  centered: {
    margin: '0 auto',
  },
  header: {
    color: 'white'
  }
}

export default Brewery
