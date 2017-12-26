import React from 'react'
import axios from 'axios'
import {setFlash} from '../actions/flash'
import {Loader, Segment, Dimmer, Grid, Image} from 'semantic-ui-react'


class BreweryShow extends React.Component {
  state = { brewery: [], loaded: false }

  componentDidMount = () => {
    const { id } = this.props.match.params
    axios.get(`/api/brewery_id/${id}`)
      .then(res => {
        this.setState({brewery: res.data.entries, loaded: true})
      }).catch( err => {
        // debugger
        // this.props.dispatch(setFlash('We had trouble retreiving your request.', 'red'))
    })
  }

  renderShow = () => {
    const { name } = this.state.brewery[0]
    console.log()
    return(
      <Segment>
        <Grid celled>
          <Grid.Row>
            <Grid.Column width={3}>
              <Image src='/assets/images/wireframe/image.png' />
            </Grid.Column>
            <Grid.Column width={13}>
              <Image src='/assets/images/wireframe/centered-paragraph.png' />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width={3}>
              <Image src='/assets/images/wireframe/image.png' />
            </Grid.Column>
            <Grid.Column width={10}>
              <Image src='/assets/images/wireframe/paragraph.png' />
            </Grid.Column>
            <Grid.Column width={3}>
              <Image src='/assets/images/wireframe/image.png' />
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
    debugger
    return (
      <div>
        {this.state.loaded ? this.renderShow() : this.showLoader()}
      </div>
    )
  }
}

const styles = {
  font: {
    color: 'white',
  },
}

export default BreweryShow;
