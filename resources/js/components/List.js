import React, { Component, useState } from 'react';
import WeeklyMember from './partials/WeeklyMember';
import WeeklyClient from './partials/WeeklyClient';
import WeeklyProject from './partials/WeeklyProject';
import MonthlyMember from './partials/MonthlyMember';
import MonthlyClient from './partials/MonthlyClient';
import MonthlyProject from './partials/MonthlyProject';

import axios from 'axios';

export default class List extends Component {
    _isMounted = false;

    constructor(props) {
        super();
        this.state = {
          WeeklyMemberVisible:true,
          WeeklyClientVisible:false,
          WeeklyProjectVisible:false,
          MonthlyMemberVisible:false,
          MonthlyClientVisible:false,
          MonthlyProjectVisible:false,
        };
    }

    async componentDidMount() {

    }
    
    componentWillUnmount() {
        
    }

    render() {

        return (

            <div>
            <ul class="nav nav-tabs" role="tablist">
               <li class="nav-item">
                  <a class="nav-link active" data-toggle="tab" href="#Weekly">Weekly</a>
               </li>
               <li class="nav-item">
                  <a class="nav-link" data-toggle="tab" href="#Monthly"
                     onClick={() => {
                  this.setState({MonthlyMemberVisible:true});
                  }}
                  >Monthly</a>
               </li>
            </ul>
            <br />
            <div class="tab-content">
               <span id="Weekly" class="tab-pane active">
                  <ul class="nav nav-tabs" role="tablist">
                     <li class="nav-item">
                        <a class="nav-link active" data-toggle="tab" href="#WeeklyMember"
                           onClick={() => {
                        this.setState({WeeklyMemberVisible:true});
                        }}
                        >Member</a>
                     </li>
                     <li class="nav-item">
                        <a class="nav-link" data-toggle="tab" href="#WeeklyClient"
                           onClick={() => {
                        this.setState({WeeklyClientVisible:true});
                        }}
                        >Client</a>
                     </li>
                     <li class="nav-item">
                        <a class="nav-link" data-toggle="tab" href="#WeeklyProject"
                           onClick={() => {
                        this.setState({WeeklyProjectVisible:true});
                        }}
                        >Project</a>
                     </li>
                  </ul>
                  <br />
                  <div class="tab-content">
                     <span id="WeeklyMember" class="tab-pane active">
                        {this.state.WeeklyMemberVisible?
                        <WeeklyMember/>
                        :null}
                     </span>
                     <span id="WeeklyClient" class="tab-pane fade">
                        {this.state.WeeklyClientVisible?
                        <WeeklyClient/>
                        :null}
                     </span>
                     <span id="WeeklyProject" class="tab-pane fade">
                        {this.state.WeeklyProjectVisible?
                        <WeeklyProject/>
                        :null}
                     </span>
                  </div>
               </span>
               <span id="Monthly" class="tab-pane fade">
                  <ul class="nav nav-tabs" role="tablist">
                     <li class="nav-item">
                        <a class="nav-link active" data-toggle="tab" href="#MonthlyMember">Member</a>
                     </li>
                     <li class="nav-item">
                        <a class="nav-link" data-toggle="tab" href="#MonthlyClient"
                           onClick={() => {
                        this.setState({MonthlyClientVisible:true});
                        }}
                        >Client</a>
                     </li>
                     <li class="nav-item">
                        <a class="nav-link" data-toggle="tab" href="#MonthlyProject"
                           onClick={() => {
                        this.setState({MonthlyProjectVisible:true});
                        }}
                        >Project</a>
                     </li>
                  </ul>
                  <br />
                  <div class="tab-content">
                     <span id="MonthlyMember" class="tab-pane active">
                        {this.state.MonthlyMemberVisible?
                        <MonthlyMember/>
                        :null}
                     </span>
                     <span id="MonthlyClient" class="tab-pane fade">
                        {this.state.MonthlyClientVisible?
                        <MonthlyClient/>
                        :null}
                     </span>
                     <span id="MonthlyProject" class="tab-pane fade">
                        {this.state.MonthlyProjectVisible?
                        <MonthlyProject/>
                        :null}
                     </span>
                  </div>
               </span>
            </div>
         </div>

        );
    }
}