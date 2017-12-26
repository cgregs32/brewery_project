import React, { Component } from 'react';
import { Step, Header, Segment, Divider, Grid, Image, Button, Card, Icon } from 'semantic-ui-react';
import ReactMarkDown from 'react-markdown';
import axios from 'axios';
import background from '../images/landing.jpg';
import placeholder from '../images/placeholder.jpg';
import BreweriesList from './BreweriesList'
import '../styles/home.css'

// <Image style={styles.centered} size='large' src='../images/landing.jpg' alt='DevPoint Studios Logo' />


class Home extends Component {
  state = { breweries: [], started: false,  };

  componentDidMount() {
    axios.get('/api/all_breweries?page=1&per_page=10')
      .then(res => {
        console.log(res.data)
        this.setState({ breweries: res.data.entries })
      })
      .catch( error => {
        console.log(error.response);
    });
  }

  filterForm = () => {
    //todo: render form and use that data to return different data
  }

  defaultSteps(){
    return(
      <Segment style={styles.icons}>
        <Icon name='beer'></Icon>
        <Icon name='cart'></Icon>
        <Icon name='truck'></Icon>
        <Icon name='time'></Icon>
      </Segment>

    )
  }

  steps = () => (
    <Step.Group ordered>
      <Step completed>
        <Step.Content>
          <Step.Title>Brewery</Step.Title>
          <Step.Description>Pick a Brewery to select </Step.Description>
        </Step.Content>
      </Step>

      <Step completed={false}>
        <Step.Content>
          <Step.Title>Billing</Step.Title>
          <Step.Description>Enter billing information</Step.Description>
        </Step.Content>
      </Step>

      <Step active>
        <Step.Content>
          <Step.Title>Confirm Order</Step.Title>
        </Step.Content>
      </Step>
    </Step.Group>
  )

  renderBreweries() {
    return(
      <Grid.Column computer={16} tablet={8} mobile={16}>
        <Segment textAlign='center' inverted>

          <Header
            as='h1'

            style={styles.header}>
            Select From Many Breweries
          </Header>
          <Divider />
          <Button>
            Filter Results
          </Button>
        </Segment>
        <BreweriesList breweries={this.state.breweries} />
      </Grid.Column>
    )
  }

  render() {


    return(
      <Segment centered basic >
        <Segment basic style={styles.topBanner} className='topBanner'>
          <Segment basic style={styles.topBannerText} className='topBannerText' textAlign='center'>
            <Header as='h1' style={styles.header}>Beer Time</Header>
            <Header as='h3' style={styles.header}>How It Works?</Header>
            <Header as='h4' style={styles.header}>Select a brewery, Pick the beers of your choice, Enjoy!</Header>
            <Button onClick={() => this.setState({ started: true })}>Get Started</Button>
          </Segment>
        </Segment>
        <Segment centered>
          {this.state.started ? this.steps() : this.defaultSteps()}
        </Segment>
        <Grid centered>
          {this.state.started ? this.renderBreweries() : null }
        </Grid>
      </Segment>
    );
  }
}

const styles = {
  card: {
    color: 'black',
    height: '300px',
  },
  topBanner: {
    backgroundImage: `url(${background})`,
    backgroundSize: 'cover',
    overflow: 'hidden',
    width: '100%',
    height: '65vh'
  },
  topBannerText: {
    paddingTop: '6em',
    backgroundColor: 'rgba(22, 22, 22, .6)',
    color: 'white',
  },
  centered: {
    margin: '0 auto',
  },
  header: {
    color: 'white',
    fontSize: '2em',
  },
  icons: {
    fontSize: '34px',
    display: 'flex',
    justifyContent: 'space-around',
  }
}

export default Home;
