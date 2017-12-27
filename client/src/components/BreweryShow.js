import React from 'react'
import axios from 'axios'
import {setFlash} from '../actions/flash'
import {Loader, Segment, Dimmer, Grid, Image, Statistic, Header, Divider} from 'semantic-ui-react'


class BreweryShow extends React.Component {
  state = { brewery: [], loaded: false }

  componentDidMount = () => {
    const { id } = this.props.match.params
    axios.get(`/api/brewery_id/${id}`)
      .then(res => {
        this.setState({brewery: res.data.entries[0], loaded: true})
      }).catch( err => {
        // debugger
        // this.props.dispatch(setFlash('We had trouble retreiving your request.', 'red'))
    })
  }

  organicStatistic = (organic, certified) => {
    return(
      <Statistic style={styles.font} >
        <Statistic.Value>{organic}</Statistic.Value>
        <Statistic.Label>{certified}</Statistic.Label>
      </Statistic>
    )
  }

  renderShow = () => {
    const { brewery } = this.state
    console.log(brewery)
    console.log(brewery.is_organic)
    return(
      <Segment style={styles.segment}>
        <Grid style={styles.views}>
          <Grid.Row style={styles.topRow}>
            <Grid.Column style={styles.display} width={5}>
              {brewery.is_organic === 'Y' ? this.organicStatistic('Organic', 'Certified') : this.organicStatistic('Not', 'Organic')}
              <Divider clearing />
              <Statistic style={styles.font} >
                <Statistic.Value>{brewery.brand_classification}</Statistic.Value>
                <Statistic.Label>Style</Statistic.Label>
              </Statistic>
            </Grid.Column>
            <Grid.Column width={11}>
              <Header  style={styles.font} as="h1">
                {brewery.name}
              </Header>
              <Header style={styles.font} as="h3">
                {brewery.description}
              </Header>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row style={styles.display}>
            <Grid.Column width={10} style={{background: `url(${brewery.images.square_medium}) center center no-repeat`}}>
            </Grid.Column>
            <Grid.Column width={6}>
              <Header as='h4'>Contact</Header>
              <Divider />
              <Header as='h5'> {brewery.website}</Header>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    )
  }

  showLoader = () => {
    <Segment>
      <Dimmer active>
        <Loader size='massive'>Loading</Loader>
      </Dimmer>
    </Segment>
  }

  render () {

    return (
      <Segment basic>
        {this.state.loaded ? this.renderShow() : this.showLoader()}
      </Segment>
    )
  }
}
const styles = {
  segment: {
    backgroundColor: 'rgba(255, 255, 255, 0)',
  },
  backgroundImage: {
    backgroundSize: 'cover',
    overflow: 'hidden',
    width: '100%',
  },
  views: {
    height: '80vh',
    boarderRadius: 5,
  },
  font: {
    color: 'white',
  },
  image: {
    margin: 'auto',
  },
  display: {
    background: 'white',
    padding: '0',

  },
  topRow: {
    padding: '0',
  },
}


export default BreweryShow;
