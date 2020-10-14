import React, { Component } from 'react';
import Select from 'react-select';

export default class Example extends Component {
  constructor(props){
      super(props)
      this.state = {
        selectOptions : [],
        id: "",
        name: ''
      }
    }
  
   async getOptions(){
      const res = await axios.get('/api/v1/clients')
      const data = res.data
  
      const options = data.map(d => ({
        "value" : d.id,
        "label" : d.clnt_name
  
      }))
  
      this.setState({selectOptions: options})
  
    }
   
    handleChange(e){
      console.log(e)
     this.setState({id:e.value, clnt_name:e.label})
    }
  
    componentDidMount(){
        this.getOptions()
    }
  
    render() {
      console.log(this.state.selectOptions)
      return (
        <div>
            <br/>
          <Select placeholder="Select Client"  options={this.state.selectOptions} onChange={this.handleChange.bind(this)}/>
          <br/>
        </div>
      )
    }
}