var React = require('react')
var ReactDOM = require('react-dom')
var $ = require("jquery")

var TimezoneTracker = React.createClass({
  getTeammatesFromServer: function () {
    this.serverRequest = $.get("teammates.json", function (result) {
      this.setState({data: result})
    }.bind(this))
  },
  timezoneAPI: function () {
    this.serverRequest = $.get(this.props.apiUrl, function (result) {
      this.setState({timezones: result})
    }.bind(this))
  },
  getInitialState: function () {
    return {data: [], timezones: []}
  },
  componentDidMount: function () {    
    this.timezoneAPI()
    this.getTeammatesFromServer()
    //setInterval(this.getTeammatesFromServer, 2000)
  },
  render: function () {
    return (
      <div>
        <TimezoneTitle />
        <TimezoneList data={this.state.data} />
        <TimezoneAddTeamMember timezones={this.state.timezones} />
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
    setInterval(this.timer, 1000)
  },
  timer: function () {
    var d = new Date()
    var localTimezoneOffset = d.getTimezoneOffset() * 60 * 1000
    var adjustedDateTime = d.getTime() + localTimezoneOffset
    this.setState({date: adjustedDateTime})
  },
  render: function () {
    var currentDate = this.state.date
    var teammateNodes = this.props.data.map(function(teammate, id){
      return (
        <TimezoneTeamMember
          name={teammate.name}
          location={teammate.location}
          date={currentDate}
          offset={teammate.offset}
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
  formateDateTime: function () {
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    var localDate = this.props.date
    var adjustedDateTime = localDate + (this.props.offset * 1000 * 60 * 60)
    var adjustedDate = new Date(adjustedDateTime)

    var thisDay = days[adjustedDate.getDay()]
    var thisDate = adjustedDate.getDate()
    var thisMonth = months[adjustedDate.getMonth()]

    var thisHour = adjustedDate.getHours()
    var thisMinute = adjustedDate.getMinutes()
    if(thisMinute<10)thisMinute = "0" + thisMinute
    var thisSecond = adjustedDate.getSeconds()
    if(thisSecond<10)thisSecond = "0" + thisSecond
    var formattedTime = thisHour + ":" + thisMinute + ":" + thisSecond

    var formattedDateTime = thisDay + ", " + thisMonth + " " + thisDate + " - " + formattedTime
    return formattedDateTime
  },
  render: function () {
    return (
      <div>
        <h4>{this.props.name} - {this.props.location}</h4>
        <p>{this.formateDateTime()}</p>
      </div>
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
  populateDropdown: function () {
    if (this.props.timezones.length == 0) return []
    var locations = []
    this.props.timezones["zones"].forEach(function(option, i){
      locations.push(
        <option key={i} value={option.gmtOffset}>{option.countryName}</option>
      )
    })
    return (
      locations
    )
  },
  render: function () {
    return (
      <div>
        <h2>Add team member</h2>
        <form>
          <input value={this.state.name} onChange={this.handleNameChange} type="text" placeholder="Teammate name" />
          <select value="B" onChange={this.handleLocationChange}>
            {this.populateDropdown()}
          </select>
          <input type="submit" value="Add teamate" />
        </form>
      </div>
    )
  }
})

ReactDOM.render(<TimezoneTracker apiUrl="http://api.timezonedb.com/v2/list-time-zone?key=PAJRXOS81UN4&format=json" pollInterval={2000} />, document.getElementById('app'))
