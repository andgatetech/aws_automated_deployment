import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import Entry from './Entry';
import List from './List';
import Users from './Users';
import Clients from './Clients';
import Projects from './Projects';
import Tasks from './Tasks';

export default class Home extends Component {
    constructor(props){
        super(props)
        this.state = {
          selectOptions : [],
          id: "",
          name: ''
        }
      }
    
     async getOptions(){
        const res = await axios.get('/api/v1/projects')
        const data = res.data
    
        const options = data.map(d => ({
          "value" : d.id,
          "label" : d.prj_name
    
        }))
    
        this.setState({selectOptions: options})
    
      }
    
      handleChange(e){
       this.setState({id:e.value, name:e.label})
      }
    
      componentDidMount(){
          this.getOptions()
      }
    
      render() {
        console.log(this.state.selectOptions)
        return (
            <Router basename={'/'}>
                <> 
                <br/> 
                <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <h2>GrowBeans Techbeans PMS</h2>
                                <hr/>
                            </div>
                        </div>
                </div>
                <br/> 
                <div className="container">
                    <div className="row">
                        <div className="col-md-2">
                        <ul className="list-group">
                            <li className="list-group-item"><Link to="/list" className="">List</Link></li>
                            <li className="list-group-item"><Link to="/" aria-current="page" className="router-link-exact-active router-link-active">Entry</Link></li>
                            <li className="list-group-item"><Link to="/users" className="">Users</Link></li>
                            <li className="list-group-item"><Link to="/clients" className="">Clients</Link></li>
                            <li className="list-group-item"><Link to="/projects" className="">Projects</Link></li>
                            <li className="list-group-item"><Link to="/tasks" className="">Tasks</Link></li>
                        </ul>
                        </div>
                        <div className="col-md-10">
                        <Switch>
                            <Route path="/list"  component={List}/>
                            <Route path="/" exact component={Entry}/>
                            <Route path="/users" exact component={Users}/>
                            <Route path="/clients" exact component={Clients}/>
                            <Route path="/projects" exact component={Projects}/>
                            <Route path="/tasks" exact component={Tasks}/>
                        </Switch>
                        </div>
                    </div>
                </div>
                </>
            </Router>
        )
      }
    
    
    
}

if (document.getElementById('home')) {
    ReactDOM.render(<Home />, document.getElementById('home'));
}
