import React, { Component } from 'react'
import Select from 'react-select'
import axios from 'axios'

export default class Multi extends Component {

  constructor(props){
    super(props)
    this.state = {
      selectUsers : [],
      value:[]
    }
  }

 async getUsers(){
    const res = await axios.get('/api/v1/users')
    const data = res.data

    const options = data.map(d => ({
      "value" : d.id,
      "label" : d.name

    }))

    this.setState({selectUsers: options})

  }

  handleChangeUsers(e){
    console.log(e)
   this.setState({id:e.value})
  }

  componentDidMount(){
      this.getUsers()
  }

  render() {
    console.log(this.state.value)
    return (
      <div>
        <Select placeholder="Select Users" options={this.state.selectUsers} onChange={this.handleChangeUsers.bind(this)} isMulti />
        {
            this.state.value === null ? "" : this.state.value.map(v => <h4>{e.value}</h4>)
        }
      </div>
    )
  }
}

