import React from 'react'
import placeholder from '../images/placeholder.jpg';
import { Link } from 'react-router-dom';
import {paginateText} from '../utils/module'


import { Divider, Grid, Image, Button, Card } from 'semantic-ui-react';


class Brewery extends React.Component{



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
                {paginateText(description)}
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <Button.Group >
                  <Button
                    style={styles.buttons}
                    color='blue'
                    as={Link}
                    to={`/brewery/${id}`}
                  >
                    More Info
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
