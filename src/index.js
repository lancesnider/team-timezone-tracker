var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');

var TimezoneTracker = React.createClass({
  getTeammatesFromServer: function () {
    this.serverRequest = $.get("teammates.json", function (result) {
      this.setState({data: result})
    }.bind(this))
  },
  getInitialState: function () {
    return {data: []}
  },
  componentDidMount: function () {
    this.getTeammatesFromServer()
    setInterval(this.getTeammatesFromServer, 2000)
  },
  render: function () {
    return (
      <div>
        <TimezoneTitle />
        <TimezoneList data={this.state.data} />
      </div>
    )
  }
})

var TimezoneTitle = React.createClass({
  render: function () {
    return (
      <h1>Team Timezone Tracker</h1>
    )
  }
})

var TimezoneList = React.createClass({
  render: function () {
    var teammateNodes = this.props.data.map(function(teammate){
      return (
        <TimezoneTeamMember
          name={teammate.name}
          location={teammate.location}
          key={teammate.id}
        >
        </TimezoneTeamMember>
      )
    })
    return (
      <div>{teammateNodes}</div>
    )
  }
})

var TimezoneTeamMember = React.createClass({
  getInitialState: function () {
    var d = new Date();
    return {date:d, dateFormat: ''}
  },
  getTimeFormat: function () {
    var days = ["Sunday", "Monday", "Tuesday", "Wednsday", "Thursday", "Friday", "Saturday"];
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    var d = this.state.date;
    var thisDay = days[d.getDay()];
    var thisDate = d.getDate();
    var thisMonth = months[d.getMonth()];
    var dateFormat = this.props.name + " - " + this.props.location  + " - " + thisDay + " " + thisMonth + " " + thisDate + " - " + d.getHours() + ":" + d.getMinutes();

    return dateFormat;
  },
  render: function () {
    return (
      <div>
        {this.getTimeFormat()}
      </div>
    )
  }
})

var TimezoneAddTeamMember = React.createClass({
  getInitialState: function () {
    return {name: '', location: ''}
  },
  handleNameChange: function (e) {
    this.setState({name: e.target.value});
  },
  handleLocationChange: function (e) {
    this.setState({location: e.target.value})
  },
  render: function () {
    return (
      <div>
        <h2>Add team member</h2>
        <form>
          <input value={this.state.name} onChange={this.handleNameChange} type="text" placeholder="Teammate name" />
          <input value={this.state.location} onChange={this.handleLocationChange} type="text" placeholder="Location" />
          <input type="submit" value="Add teamate" />
        </form>
      </div>
    )
  }
})

ReactDOM.render(<TimezoneTracker pollInterval={2000} />, document.getElementById('app'))
