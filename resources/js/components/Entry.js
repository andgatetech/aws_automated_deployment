import React, { Component, Fragment } from "react";
import Select from "react-select";
import Multi from "./multi";
import Form from "./final_form";
import ClientData from "./ClientData";

export default class Example extends Component {
  constructor(props) {
    super();
    this.state = {
      selProjects: "",
      selClients: "",
      selectProjects: [],
      selectClients: [],
      selectUsers: [],
      multiValue: [],
      task: [
        {
          task_name: "",
          start_date: "",
          end_date: "",
          amount: "",
          temp: 0
        }
      ]
    };
    this.handleChangeProject = this.handleChangeProject.bind(this);
    this.handleChangeClients = this.handleChangeClients.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }
  addClick() {
    this.setState(prevState => ({
      task: [
        ...prevState.task,
        {
          task_name: "",
          start_date: "",
          end_date: "",
          amount: "",
          temp: 0
        }
      ]
    }));
  }

  createUI() {
    return this.state.task.map((el, i) => (
      <div class="row"
        style={{
          border: "1px solid #ddd",
          padding: "20px",
          borderRadius: "5px",
          margin: "10px 0px",
          position: "relative"
        }}
        key={i}
      >
        <span style={{ position: "absolute", top: "0px", right: "-3px" }}
          onClick={this.removeClick.bind(this, i)}
          class="btn float-right"
        >
          <svg
            width="1.5em"
            height="1.5em"
            viewBox="0 0 16 16"
            class="bi bi-x-square"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"
            />
            <path
              fill-rule="evenodd"
              d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z"
            />
            <path
              fill-rule="evenodd"
              d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z"
            />
          </svg>
        </span>
        <div class="col-md-12" style={{
          marginBottom: "30px"
        }}
        >
          <label>Task</label>
          <input
            class="form-control"
            placeholder="Enter task"
            type="text"
            name="task_name"
            value={el.task_name || ""}
            onChange={this.handleChangeTask.bind(this, i)}
          />
        </div>
        <div class="col-md-5" style={{
          paddingRight: "0"
        }}>
          <label>Start Date</label>
          <input
            class="form-control"
            placeholder="Enter task"
            type="date"
            name="start_date"
            value={el.start_date || ""}
            onChange={this.handleChangeTask.bind(this, i)}
            required="required"
          />
        </div>
        <div class="col-md-2">
          <p></p>
          <center style={{
            marginTop: "20px",
            fontWeight: "500",
            fontSize: "xx-large"
          }}>
            ~</center></div>
        <div class="col-md-5" style={{
          paddingLeft: "0"
        }}>
          <label>End Date</label>
          <input
            class="form-control"
            placeholder="Enter task"
            type="date"
            name="end_date"
            value={el.end_date || ""}
            onChange={this.handleChangeTask.bind(this, i)}
            required="required"
          />
        </div>
        <div class="col-md-12" style={{
          marginTop: "30px"
        }}
        >
          <div class="row">
            <div class="col-md-4">
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                name="amount"
                defaultValue="0"
                value={this.state.value}
                onChange={this.handleChangeTask.bind(this, i)}
                required="required"
              />
            </div>
            <div class="col-md-8"></div>
          </div>
          <div class="row">
            <div class="col-md-2">
              <input
                class="form-control"
                type="number"
                step="5"
                name="temp"
                value={el.temp}
                onChange={this.handleChangeTask}
                disabled
              />
            </div>
            <div class="col-md-10">
              <h3>%</h3>
            </div>
          </div>
        </div>
        <br />
      </div>
    ));
  }
  async getProjects() {
    const res = await axios.get("/api/v1/projects");
    const data = res.data;

    const options = data.map(p => ({
      value: p.id,
      label: p.prj_name
    }));

    this.setState({ selectProjects: options });
  }
  async getClients() {
    const res = await axios.get("/api/v1/clients");
    const data = res.data;

    const options = data.map(c => ({
      value: c.id,
      label: c.clnt_name
    }));

    this.setState({ selectClients: options });
  }
  async getUsers() {
    const res = await axios.get("/api/v1/users");
    const data = res.data;

    const options = data.map(u => ({
      value: u.id,
      label: u.name
    }));

    this.setState({ selectUsers: options });
  }

  handleChangeProject(e) {
    console.log(e);
    this.setState({
      selProjects: [e.value]
    });
  }
  handleChangeClients(e) {
    console.log(e);

    this.setState({
      selClients: [e.value]
    });
  }
  handleChangeUsers(option) {
    console.log(option);
    this.setState(state => {
      return {
        multiValue: option
      };
    });
  }
  handleChangeTask(i, e) {
    const { name, value } = e.target;
    let task = [...this.state.task];
    task[i] = { ...task[i], [name]: value };
    if (e.target.name == "amount") {
      task[i] = { ...task[i], temp: value };
    }
    this.setState({ task });
  }
  removeClick(i) {
    let task = [...this.state.task];
    task.splice(i, 1);
    this.setState({ task });
  }

  handleSubmit(event) {
    console.log(this.state.selProjects);
    event.preventDefault();
    axios
      .post("api/v1/store", {
        projects: this.state.selProjects,
        clients: this.state.selClients,
        users: this.state.multiValue,
        task: this.state.task
      })
      .then(
      this.props.history.push('/list')
      )
      .catch(err => console.log(err));
  }

  componentDidMount() {
    this.getProjects(), this.getClients(), this.getUsers();
  }

  render() {
    return (
      <Fragment>
        <form onSubmit={this.handleSubmit}>
          <div>
            <Select
              placeholder="Select Project"
              name="selProjects"
              value={this.state.value}
              options={this.state.selectProjects}
              onChange={this.handleChangeProject.bind(this)}
              required="required"
            />
            <br />
          </div>
          <div>
            <br />
            <Select
              placeholder="Select Client"
              options={this.state.selectClients}
              onChange={this.handleChangeClients.bind(this)}
              required="required"
            />
            <br />
          </div>

          <div>
            <Select
              placeholder="Select Users"
              value={this.state.multiValue}
              options={this.state.selectUsers}
              onChange={this.handleChangeUsers.bind(this)}
              required="required"
              isMulti
            />
          </div>
          <div>
            {this.createUI()}
            <br />
            <center>
              <label>
                <div class="text-center">
                  <button
                    type="button"
                    class="btn btn-info"
                    onClick={this.addClick.bind(this)}
                  >
                    <svg
                      width="2em"
                      height="2em"
                      viewBox="0 0 16 16"
                      class="bi bi-plus"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M8 3.5a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5H4a.5.5 0 0 1 0-1h3.5V4a.5.5 0 0 1 .5-.5z"
                      />
                      <path
                        fill-rule="evenodd"
                        d="M7.5 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0V8z"
                      />
                    </svg>
                  </button>
                </div>
              </label>
            </center>
            <br />
            <center>
              <label>
                <input
                  type="submit"
                  class="btn btn-primary btn-lg"
                  value="保存"
                />
              </label>
            </center>
            <br />
          </div>
        </form>
      </Fragment>
    );
  }
}
