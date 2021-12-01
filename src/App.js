import React from "react";
import firebase from "./config";
import { realtimeDB } from "./config";
import { testTimestamp } from "./testTimestamp/testTimestamp";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      developers: []
    };
    this.refDB = realtimeDB.ref();
    this.refItem = realtimeDB.ref().child("developers").child("1");
  }

  componentDidMount() {
    testTimestamp();
    this.getUserData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState !== this.state) {
      this.writeUserData();
    }
  }
  UNSAFE_componentWillMount() {
    this.refDB.off();
  }
  writeUserData = () => {
    this.refDB.set(this.state);
    console.log("DATA SAVED");
  };

  getUserData = () => {
    this.refDB.on("value", (snapshot) => {
      const state = snapshot.val();
      console.log(state);
      this.setState(state);
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    let name = this.refs.name.value;
    let role = this.refs.role.value;
    let uid = this.refs.uid.value;
    const { developers } = this.state;
    if (uid && name && role && !!developers.length) {
      const devIndex = developers.findIndex((data) => {
        return data.uid === uid;
      });
      developers[devIndex].name = name;
      developers[devIndex].role = role;
      this.setState({ developers });
    } else if (name && role) {
      const uid = new Date().getTime().toString();
      developers.push({ uid, name, role });
      this.setState({ developers });
    }

    this.refs.name.value = "";
    this.refs.role.value = "";
    this.refs.uid.value = "";
  };

  removeData = (developer) => {
    const { developers } = this.state;
    const newState = developers.filter((data) => {
      return data.uid !== developer.uid;
    });
    this.setState({ developers: newState });
  };

  updateData = (developer) => {
    this.refs.uid.value = developer.uid;
    this.refs.name.value = developer.name;
    this.refs.role.value = developer.role;
  };
  subcribe = () => {
    this.refItem.on("value", (snapshot) => {
      const state = snapshot.val();
      console.log(state);
    });
  };

  render() {
    const { developers } = this.state;
    console.log(developers);
    return (
      <React.Fragment>
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <h1>Firebase Development Team</h1>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-12">
              {developers.map((developer) => (
                <div
                  key={developer.uid}
                  className="card float-left"
                  style={{ width: "18rem", marginRight: "1rem" }}
                >
                  <div className="card-body">
                    <h5 className="card-title">{developer.name}</h5>
                    <p className="card-text">{developer.role}</p>
                    <button
                      onClick={() => this.removeData(developer)}
                      className="btn btn-link"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => this.updateData(developer)}
                      className="btn btn-link"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="row">
            <div className="col-xl-12">
              <h1>Add new team member here</h1>
              <form onSubmit={this.handleSubmit}>
                <div className="form-row">
                  <input type="hidden" ref="uid" />
                  <div className="form-group col-md-6">
                    <label>Name</label>
                    <input
                      type="text"
                      ref="name"
                      className="form-control"
                      placeholder="Name"
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label>Role</label>
                    <input
                      type="text"
                      ref="role"
                      className="form-control"
                      placeholder="Role"
                    />
                  </div>
                </div>

                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              </form>
              <button
                onClick={this.subcribe}
                type="button"
                className="btn btn-secondary mt-4"
              >
                Subcribe first item
              </button>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
