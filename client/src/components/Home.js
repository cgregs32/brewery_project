import React, { Component } from 'react';
import { Step, Header, Segment, Divider, Grid, Image, Button, Card, Icon } from 'semantic-ui-react';
import ReactMarkDown from 'react-markdown';
import axios from 'axios';
import background from '../images/landing.jpg';
import placeholder from '../images/placeholder.jpg';
import BreweriesList from './BreweriesList'
import '../styles/home.css'
import {setFlash} from '../actions/flash'
import InfiniteScroll from 'react-infinite-scroller';



// <Image style={styles.centered} size='large' src='../images/landing.jpg' alt='DevPoint Studios Logo' />


class Home extends Component {
  state = { breweries: [], loaded: false, started: false, page: 1, hasMore: true  };

  componentWillMount() {
    this.fetchBrews(this.props)
  }

  // componentWillReceiveProps(nextProps) {
  //   this.setState({ tweets: [], loaded: false, hasMore: true, page: 1 });
  //   this.fetchTweets(nextProps, 1);
  // }

  componentWillReceiveProps(nextProps) {
    this.setState({ breweries: [], hasMore: true, page: 1});
    this.fetchBrews(nextProps, 1)
  }

  fetchBrews = (props, page = 1) => {
    const URL = '/api/all_breweries'
    const query = `?page=${page}&per_page=10`
    axios.get(`${URL}${query}`)
      .then(res => {
        console.log(res.data)
        if(res.data.total_pages){
          if(res.data.total_pages === page)
            this.setState({hasMore: false})
          this.setState({breweries: [...this.state.breweries, ...res.data.entries], total_pages: res.data.total_pages, page})
        }else
        this.setState({ breweries: res.data.entries, hasMore: false })
      })
      .catch( error => {
        this.props.dispatch(setFlash('We had trouble retreiving your request.', 'red'))
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

  renderBreweries() {
    return(
      <Segment basic>
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
      </Segment>
    )
  }

  loadMoreBrews = () => {
    this.fetchBrews(this.props, this.state.page + 1)
  }


  render() {
    const {page, hasMore} = this.state

    return(
      <Segment basic >
        <Segment basic style={styles.topBanner} className='topBanner'>
          <Segment basic style={styles.topBannerText} className='topBannerText' textAlign='center'>
            <Header as='h1' style={styles.header}>Beer Time</Header>
            <Header as='h3' style={styles.header}>How It Works?</Header>
            <Header as='h4' style={styles.header}>Select a brewery, Pick the beers of your choice, Enjoy!</Header>
            <Button onClick={() => this.setState({ started: true })}>Get Started</Button>
          </Segment>
        </Segment>
        if(this.state.started)
          <Segment  style={styles.scroll}>
            <InfiniteScroll
              pageStart={page}
              loadMore={this.loadMoreBrews}
              hasMore={hasMore}
              useWindow={false}
            >
              <Grid>
                { this.renderBreweries() }
              </Grid>
            </InfiniteScroll>
          </Segment>
      </Segment>
    );
  }
}

const styles = {
  scroll: {
    height: '100vh',
    overflowY: 'scroll',
    overflowX: 'hidden',
  },
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
