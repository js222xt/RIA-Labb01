
if(true)
	console.log("borde ge utslag");
	
var TodoList2 = React.createClass({
  render: function() {
    var createItem = function(item, index) {
      return <li key={ index }>{ item.text }</li>;
    };
    return <ul>{ this.props.items.map(createItem) }</ul>;
  }
});

var TodoApp2 = React.createClass({
	mixins: [ReactFireMixin],
  	getInitialState: function() {
    	this.items = [];
    	return {items: [], text: ""};
  	},

	componentWillMount: function() {
		var firebaseRef = new Firebase("https://sizzling-torch-8926.firebaseio.com/todo_list/");
	    this.bindAsArray(firebaseRef, "items");
	},

  componentWillUnmount: function() {
    this.firebaseRef.off();
  },

  onChange: function(e) {
  	var current = e.target.value.substr(this.state.text.length,1).toLowerCase();
  	if(current!= 'd'){
    	this.setState({text: e.target.value});
  	}
  },

  handleSubmit: function(e) {
   e.preventDefault();
    if (this.state.text && this.state.text.trim().length !== 0) {
      this.firebaseRefs["items"].push({
        text: this.state.text
      });
      this.setState({text: ""});
    }
  };
},

  render: function() {
    return (
      <div>
      	<h3>TODO:</h3>
        <TodoList2 items={ this.state.items } />
        <form onSubmit={ this.handleSubmit }>
          <input onChange={ this.onChange } value={ this.state.text } />
          <button>{ "Add #" + (this.state.items.length + 1) }</button>
          <br><em>Cannot use 'D' or 'd', bcause reasons</em></br>
        </form>
      </div>
    );
  }
});

React.render(<TodoApp2 />, document.getElementById("messagesDiv"));
