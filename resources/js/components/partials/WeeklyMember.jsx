import React, { Component, useState } from 'react';

class WeeklyMember extends Component{

    _isMounted = false;

    constructor(props) {
        super();
        this.state = {
            projectsUnderUsers: [],
            weekDates: [],
            weekUserTotal: [],
            weekUserPerformance: [],
        };
    }
    async componentDidMount() {

        this._isMounted = true;

        const urls = [
            '/api/v1/all_mondays_week',
            '/api/v1/projects_under-users',
            '/api/v1/weekly_user_total_count',
            '/api/v1/weekly_user_project_prfmnc'
        ];

        Promise.all(urls.map(url =>
            fetch(url)
                .then(checkStatus)
                .then(parseJSON)
                .catch(error => console.log('There was a problem!', error))
        ))
            .then(data => {
                const data_weekDates = data[0];
                const data_projectsUnderUsers = data[1];
                const data_weekUserTotal = data[2];
                const data_weekUserPerformance = data[3];

                this.setState({
                    projectsUnderUsers: data_projectsUnderUsers,
                    weekDates: data_weekDates,
                    weekUserTotal: data_weekUserTotal,
                    weekUserPerformance: data_weekUserPerformance,
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
                    {Object.entries(this.state.projectsUnderUsers).map(([key, item]) => {
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
                                <td>{subItem.prj_name}</td>
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
                                {Object.entries(this.state.weekUserTotal).map(([subKey, subItem]) => {
                                const cells = [];
                                if (item==this.state.weekUserPerformance[subItem[0].firstname][0]['week_beginning']) {
                                let total_amount = 0;
                                for (let index = 0; index < this.state.weekUserTotal[subItem[0].firstname].length; index++) { cells.push( <tr>
                            <td>{this.state.weekUserPerformance[subItem[0].firstname][index]['perfomance_rate']}%
                            </td>
                            </tr>
                            )
                            total_amount+=parseFloat(subItem[index].Amount);
                            }
                            return(
                            <table border="1" class="table table-bordered">
                                <thead>
                                    <tr>
                                        <th colSpan="3" style={{background:"#F7F7F7"}}>
                                            { Number((total_amount).toFixed(1))}/{ this.state.weekUserTotal[subItem[0].firstname].length }</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cells}
                                </tbody>
                            </table>
                            )
                            }else{
                            for (let index = 0; index < this.state.weekUserPerformance[subItem[0].firstname].length; index++) { cells.push( <tr>
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

export default WeeklyMember;