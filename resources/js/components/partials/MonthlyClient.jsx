import React, { Component, useState } from 'react';

class MonthlyClient extends Component{
  
    _isMounted = false;

    constructor(props) {
        super();
        this.state = {
            userUnderClients: [],
            allMonths: [],
            monthClientTotal: [],
            monthClientUserPerformance: [],
        };
    }
    async componentDidMount() {

        this._isMounted = true;

        const urls = [
            '/api/v1/user_under_clients',
            '/api/v1/all_months',
            '/api/v1/monthly_client_total_count',
            '/api/v1/monthly_client_user_perfmnc_totl',
        ];

        Promise.all(urls.map(url =>
            fetch(url)
                .then(checkStatus)
                .then(parseJSON)
                .catch(error => console.log('There was a problem!', error))
        ))
            .then(data => {
                const data_userUnderClients = data[0];
                const data_allMonths = data[1];
                const data_monthClientTotal = data[2];
                const data_monthClientUserPerformance = data[3];
                this.setState({
                    userUnderClients: data_userUnderClients,
                    allMonths: data_allMonths,
                    monthClientTotal: data_monthClientTotal,
                    monthClientUserPerformance: data_monthClientUserPerformance,
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
                    {Object.entries(this.state.userUnderClients).map(([key, item]) => {
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
                            {Object.entries(this.state.allMonths).map(([key, item]) => {
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
                                {Object.entries(this.state.monthClientTotal).map(([subKey, subItem]) => {
                                const cells = [];
                                if (item==subItem[0].month+' '+subItem[0].YEAR) {

                                for (let index = 0; index < subItem[0].Count; index++) { cells.push( <tr>
                            <td>{
                                this.state.monthClientUserPerformance[subItem[0].clnt_name][index]['perfomance_rate']}%
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
export default MonthlyClient;