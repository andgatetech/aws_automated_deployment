import React, { Component, useState } from 'react';

class WeeklyProject extends Component{
  
    _isMounted = false;

    constructor(props) {
        super();
        this.state = {
            weekDates: [],
            usersUnderProjects: [],
            weekProjectTotal: [],
            weekProjectUserPerformance: [],
        };
    }
    async componentDidMount() {

        this._isMounted = true;

        const urls = [
            '/api/v1/all_mondays_week',
            '/api/v1/user_under_projects',
            '/api/v1/weekly_project_total_count',
            '/api/v1/weekly_project_user_prfmnc',
        ];

        Promise.all(urls.map(url =>
            fetch(url)
                .then(checkStatus)
                .then(parseJSON)
                .catch(error => console.log('There was a problem!', error))
        ))
            .then(data => {
                const data_weekDates = data[0];
                const data_usersUnderProjects = data[1];
                const data_weekProjectTotal = data[2];
                const data_weekProjectUserPerformance = data[3];

                this.setState({
                    weekDates: data_weekDates,
                    usersUnderProjects: data_usersUnderProjects,
                    weekProjectTotal: data_weekProjectTotal,
                    weekProjectUserPerformance: data_weekProjectUserPerformance,
                })
            })

        function checkStatus(response) {
            if (response.ok) {
                return Promise.resolve(response);
            } else {
                return Promise.reject(new Error(response.statusText));
            }
        }


        function parseJSON(response) {
            return response.json();
        }
    }
    componentWillUnmount() {
        this._isMounted = false;
    }


    render() {
        return (

            <div class="row">
                <div class="col-12 col-md-3" style={{margin:"7% 0%"}}>
                    {Object.entries(this.state.usersUnderProjects).map(([key, item]) => {
                    return(
                    <table border="1" class="table table-bordered">
                        <thead>
                            <tr>
                                <th style={{background:"#F7F7F7"}}>{key}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.entries(item).map(([subKey, subItem]) => {
                            return(
                            <tr>
                                <td>{subItem.firstname}</td>
                            </tr>
                            )
                            })}
                        </tbody>
                    </table>
                    )
                    })}
                </div>
                <div class="col-12 col-md-9">
                    <table>
                        <thead>
                            {Object.entries(this.state.weekDates).map(([key, item]) => {
                            return(
                            <th colSpan="3">
                                <table border="1" class="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>
                                                {item}
                                            </th>
                                        </tr>
                                    </thead>
                                </table>
                                {Object.entries(this.state.weekProjectTotal).map(([subKey, subItem]) => {
                                const cells = [];
                                if (item==this.state.weekProjectUserPerformance[subItem[0].prj_name][0]['week_beginning']) {

                                for (let index = 0; index < subItem[0].Count; index++) { cells.push( <tr>
                            <td>{this.state.weekProjectUserPerformance[subItem[0].prj_name][index]['perfomance_rate']}%
                            </td>
                            </tr>
                            )
                            }
                            return(

                            <table border="1" class="table table-bordered">

                                <thead>
                                    <tr>
                                        <th colSpan="3" style={{background:"#F7F7F7"}}>
                                            { subItem[0].Amount }/{ subItem[0].Count }</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cells}
                                </tbody>
                            </table>
                            )
                            }else{
                            for (let index = 0; index < subItem[0].Count; index++) { cells.push( <tr>
                                <td>N/A
                                </td>
                                </tr>
                                )
                                }
                                return(
                                <table border="1" class="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th colSpan="3" style={{background:"#F7F7F7"}}>N/A</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cells}

                                    </tbody>
                                </table>
                                )
                                }
                                })}
                                </th>
                                )
                                })}
                        </thead>
                    </table>
                </div>
            </div>
    
        )
    }
}
export default WeeklyProject;