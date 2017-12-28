import React, { Component } from 'react';
import {connect} from 'react-redux'
import {Header, Segment, Divider, Grid, Button, Icon } from 'semantic-ui-react';
import axios from 'axios';
import background from '../images/landing.jpg';
import BreweriesList from './BreweriesList'
import '../styles/home.css'
import {setFlash} from '../actions/flash'
import InfiniteScroll from 'react-infinite-scroller';
import SearchBar from './SearchBar'

class Home extends Component {
  state = { breweries: [], loaded: false, started: false, page: 1, hasMore: true  };

  componentWillMount() {
    this.fetchBrews(this.props)
  }

  brewerySearch = (search) => {
    axios.get(`/api/search_breweries?query=${search}`)
      .then(res => {
        console.log(res.data)
        this.setState({breweries: []})
        this.setState({breweries: res.data.entries})
      })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ breweries: [], hasMore: true, page: 1});
    this.fetchBrews(nextProps, 1)
  }

  fetchBrews = (props, page = 1) => {
    const URL = '/api/all_breweries'
    const query = `?page=${page}&per_page=10`
    axios.get(`${URL}${query}`)
      .then(res => {
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
            <SearchBar onSearchTermChange={this.brewerySearch}/>
          </Segment>
          <BreweriesList breweries={this.state.breweries} />
        </Grid.Column>
    )
  }

  loadMoreBrews = () => {
    this.fetchBrews(this.props, this.state.page + 1)
  }

  infiniteScroll = (page, hasMore) => {
    return(
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

    )
  }


  render() {
    const {page, hasMore} = this.state

    return(
      <Segment basic style={styles.scroll}>
        <Segment basic style={styles.topBanner} className='topBanner'>
          <Segment basic style={styles.topBannerText} className='topBannerText' textAlign='center'>
            <Header as='h1' style={styles.header}>Beer Time</Header>
            <Header as='h3' style={styles.header}>How It Works?</Header>
            <Header as='h4' style={styles.header}>Select a brewery, Pick the beers of your choice, Enjoy!</Header>
            <Button onClick={() => this.setState({ started: true })}>Get Started</Button>
          </Segment>
        </Segment>
        {this.state.started ? this.infiniteScroll(page, hasMore) : null}
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

export default connect()(Home);
