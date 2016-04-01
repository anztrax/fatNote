var React = require("react");

var HelloSayer = React.createClass({
  render : function(){
    return (
      <p>hello {this.props.name}</p>
    )
  }
});

module .exports = HelloSayer;