import React from 'react'
import {Segment} from 'semantic-ui-react'
import axios from 'axios'

class SearchBar extends React.Component {
  state = { search: '' }

  onInputChange(search){
    this.setState({search})
    this.props.onSearchTermChange(search)
  }

  render () {
    return(
      <Segment basic>
        <input

          placeholder='Search By Name'
          onChange={ e => this.onInputChange(e.target.value)}
          value={this.state.search}
        />
      </Segment>
    )
  }
}

export default SearchBar;
