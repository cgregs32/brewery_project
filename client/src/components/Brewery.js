import React from 'react'
import placeholder from '../images/placeholder.jpg';
import { Link } from 'react-router-dom';

import { Header, Segment, Divider, Grid, Image, Button, Card, Icon } from 'semantic-ui-react';


class Brewery extends React.Component{

  paginateText(text){
    const TEXT_LENGTH = 100
    const paginate = text
    if (text)
      if(text.length > TEXT_LENGTH)
        return paginate.slice(0, TEXT_LENGTH) + '...';
      return text
  }

  render(){

    const { name, description, images, established, id } = this.props
    return (

      <Card fluid style={styles.card}>
        <Grid>
          <Grid.Column width={8} style={styles.cardLeft}>
            <Card.Content>
              <Card.Header style={styles.cardName}>{name}</Card.Header>
              <Divider />
              <Card.Meta>Established in {established}</Card.Meta>
              <Card.Description style={styles.description}>
                {this.paginateText(description)}
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <Button.Group >
                  <Button style={styles.buttons} color='blue'>
                    <Link to={`/brewery/${id}`}>More Info</Link>
                  </Button>
                  <Button.Or />
                  <Button style={styles.buttons} positive>Select</Button>
                </Button.Group>
            </Card.Content>
          </Grid.Column>

          <Grid.Column verticalAlign='middle' width={8}>
            {images ?
              <Image
                centered
                size='medium'
                src={images.square_large}
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
  description: {
    paddingTop: '1em',
    paddingBottom: '2em',
  },
  buttons: {
    width: '65%',
  },
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
