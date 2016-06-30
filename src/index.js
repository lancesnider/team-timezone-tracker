var React = require('react');
var ReactDOM = require('react-dom');

var TimezoneTracker = React.createClass({
  getInitialState: function() {
    return {data: [{id: 0, name: "Pat", location: "Ukraine"}, {id: 1, name: "Larry", location: "Cambodia"}]}
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
  render: function () {
    return (
      <div>{this.props.name} - {this.props.location}</div>
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
    this.setState({location: e.target.value});
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

ReactDOM.render(<TimezoneTracker pollInterval={2000} />, document.getElementById('app'));
