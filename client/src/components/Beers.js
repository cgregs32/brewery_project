import React from 'react'
import {setFlash} from '../actions/flash'
import InfiniteScroll from 'react-infinite-scroller';
import axios from 'axios'
import {connect} from 'react-redux'
import {paginateText} from '../utils/module'
import SearchBar from './SearchBar'

import { Card, Segment, Header, Grid, Label, Image } from 'semantic-ui-react'

class Beers extends React.Component {
  state = { beers: [], hadMore: true, page: 1, loaded: false}

  beerSearch = (search) => {
    axios.get(`/api/beer/${search}`)
      .then(res => {
        console.log(res.data)
        this.setState({beers: []})
        this.setState({beers: res.data.entries})
      })
  }

  componentWillMount() {
    this.fetchBeers(this.props)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ beers: [], hasMore: true, page: 1});
    this.fetchBeers(nextProps, 1)
  }

  fetchBeers = (props, page = 1) => {
    const URL = '/api/all_beers'
    const query = `?page=${page}&per_page=20`
    axios.get(`${URL}${query}`)
      .then( res => {
        console.log(res.data)
        if(res.data.total_pages){
          if(res.data.total_pages === page)
            this.setState({hasMore: false})
          this.setState({beers: [...this.state.beers, ...res.data.entries], total_pages: res.data.total_pages, page})
        }else
        this.setState({ beers: res.data.entries, hasMore: false})
      }).catch( err => {
        this.props.dispatch(setFlash('We had trouble retreiving your request.', 'red'))
    });
  }

  loadMoreBeers = () => {
    this.fetchBeers(this.props, this.state.page + 1)
  }

  labelPeice(beer) {
    const colors = ['blue', 'teal', 'yellow', 'olive', 'violet', 'orange', 'red', 'pink', 'green'];
    return(
      <Label color={colors[Math.floor(Math.random() * colors.length)]} image>
        <Header as='h3'>
          {beer.style.short_name}
        </Header>
        <Label.Detail>Bitterness: {beer.style.ibu_max}</Label.Detail>
        <Label.Detail>Gravity: {beer.style.og_min}</Label.Detail>
      </Label>
    )
  }

  mapBeers = () => {
    return this.state.beers.map( beer => {

      return(
         <Card key={beer.id}>
           <Card.Content>
             {beer.labels ?
               <Image floated='right' size='mini' src={beer.labels.icon} />
               : null
             }
             <Card.Header>
              {beer.name}
             </Card.Header>
             <Card.Meta>
               abv: {beer.abv}
             </Card.Meta>
             <Card.Description>
               {paginateText(beer.description)}
             </Card.Description>
           </Card.Content>
           <Card.Content extra>
             {this.labelPeice(beer)}
           </Card.Content>
         </Card>
      )
    })
  }

  render () {
    const { page, hasMore } = this.state

    return(
      <Segment basic style={styles.scroll}>
        <Segment>
          <Header as='h1'>
            Beers From Our Selection
          </Header>
          <Header as='h3' >
            <SearchBar onSearchTermChange={this.beerSearch}/>
          </Header>
        </Segment>
          <InfiniteScroll
            pageStart={page}
            loadMore={this.loadMoreBeers}
            hasMore={hasMore}
            useWindow={false}
          >
            <Grid>
              <Grid.Row >
                <Card.Group>
                  { this.mapBeers() }
                </Card.Group>
              </Grid.Row>
            </Grid>
          </InfiniteScroll>
      </Segment>
    )
  }
}

const styles = {
  scroll: {
    height: '100vh',
    overflowY: 'scroll',
    overflowX: 'hidden',
  },
}

export default connect()(Beers);
