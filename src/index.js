var React = require('react')
var ReactDOM = require('react-dom')

var TimezoneTracker = React.createClass({
  getInitialState: function() {
    return {data: [{name: "Pat", location: "Ukraine"}, {name: "Larry", location: "Cambodia"}]}
  },
  render: function () {
    return (
      <div>
        <TimezoneTitle />
        <TimezoneList data={this.state.data} />
        <TimezoneAddTeamMember />
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
  getInitialState: function () {
    return {date: ''}
  },
  componentWillMount: function () {
    this.timer()
  },
  componentDidMount: function () {
    var timerInterval = setInterval(this.timer, 1000)
  },
  timer: function () {
    d = new Date().toString()
    this.setState({date: d})
  },
  render: function () {
    var currentDate = this.state.date
    var teammateNodes = this.props.data.map(function(teammate, id){
      return (
        <TimezoneTeamMember
          name={teammate.name}
          location={teammate.location}
          date={currentDate}
          key={id}
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
  render: function () {
    return (
      <div>{this.props.name} - {this.props.location} - {this.props.date}</div>
    )
  }
})

var TimezoneAddTeamMember = React.createClass({
  getInitialState: function () {
    return {name: '', location: ''}
  },
  handleNameChange: function (e) {
    this.setState({name: e.target.value})
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
