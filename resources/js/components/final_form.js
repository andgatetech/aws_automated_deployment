import React from 'react';
class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          task: [{task_name: "", start_date: "", end_date:"", amount:"", temp:0}]
        };
        this.handleSubmit = this.handleSubmit.bind(this);
      }
      
      addClick(){
        this.setState(prevState => ({ 
          task: [...prevState.task, { task_name: "", start_date: "", end_date:"", amount:"", temp:0}]
        }))
      }
      
      createUI(){
         return this.state.task.map((el, i) => (
           <div style={{border:"1px solid #ddd", padding:"20px", borderRadius:"5px", margin:"10px 0px"}} key={i} >
                
                <span onClick={this.removeClick.bind(this, i)} class="btn float-right">
                    <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-x-square" fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd"
                            d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                        <path fill-rule="evenodd"
                            d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z" />
                        <path fill-rule="evenodd"
                            d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z" />
                    </svg>
                </span>
                <br/>
                <label>Task</label>
                <input class="form-control" placeholder="Enter task" type="text" name="task_name" value={el.task_name ||''} onChange={this.handleChangeTask.bind(this, i)}  />
                <br/>
                <label>Start Date</label>
                <input class="form-control" placeholder="Enter task" type="date" name="start_date" value={el.start_date ||''} onChange={this.handleChangeTask.bind(this, i)} />
                <br/>
                <label>End Date</label>
                <input class="form-control" placeholder="Enter task" type="date" name="end_date" value={el.end_date ||''} onChange={this.handleChangeTask.bind(this, i)} />
                <br/>
                <div class="row">
                    <div class="col-md-4">
                        <input type="range" min="0" max="100" step="5" name="amount" defaultValue="0" value={this.state.value} onChange={this.handleChangeTask.bind(this, i)}  />
                    </div>
                    <div class="col-md-8"></div>
                    <div class="col-md-2">

                        <input class="form-control" type="number"  step="5" name="temp" value={el.temp} onChange={this.handleChangeTask}   disabled />
                    </div>
                    <div class="col-md-10">
                        <h3>%</h3>
                    </div>
                </div>
                
                <br/>
           </div>          
         ))
      }
      
      handleChangeTask(i, e) {
           const { name, value } = e.target;
         let task = [...this.state.task];
         task[i] = {...task[i], [name]: value};
         if(e.target.name=="amount"){
          task[i] = {...task[i], "temp": value};
         }
         this.setState({ task });
      }
      
      removeClick(i){
         let task = [...this.state.task];
         task.splice(i, 1);
         this.setState({ task });
      }
      
      handleSubmit(event) {
        //alert('A Task was submitted: ');
        event.preventDefault();
        const userObject = {
          applications: this.state.task,
          users:this.state.value
              };

      axios.post('api/v1/store', userObject)
          .then((res) => {
              console.log(res.data)
          }).catch((error) => {
              console.log(error)
          });

      }
    
      render() {
        return (
          <form onSubmit={this.handleSubmit}>
              {this.createUI()}  
              <br/>      
              <label>
                <button type="button" class="btn btn-info" onClick={this.addClick.bind(this)}>
                      <svg width="2em" height="2em" viewBox="0 0 16 16" class="bi bi-plus" fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd"
                              d="M8 3.5a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5H4a.5.5 0 0 1 0-1h3.5V4a.5.5 0 0 1 .5-.5z" />
                          <path fill-rule="evenodd"
                              d="M7.5 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0V8z" />
                      </svg>
                </button>
              </label>
              <br/>
              <center><label><input style={{marginLeft:"20px"}} type="submit" class="btn btn-primary btn-lg" value="保存" /></label></center>
              <br/>
          </form>
        );
      }
}

export default Form