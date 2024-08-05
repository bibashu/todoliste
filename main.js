class Todos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputTodo: "",
      todos: [],
      editIndex: null,
      editValue: ""
    };
  }

  handleDelete = (index) => {
    const newTodos = this.state.todos.filter((_, i) => i !== index);
    this.setState({ todos: newTodos });
  };
//
  handleEdit = (index) => {
    this.setState({ editIndex: index, editValue: this.state.todos[index] });
  };

  handleSave = () => {
    const newTodos = [...this.state.todos];
    newTodos[this.state.editIndex] = this.state.editValue;
    this.setState({ todos: newTodos, editIndex: null, editValue: "" });
  };

  render() {
    return (
      <div className="container mt-4">
        <h1>To-Do List</h1>
        <p>{this.state.inputTodo}</p>
        <div className="input-group mb-3">
          <input
            type="text"
            value={this.state.inputTodo}
            onChange={(e) => {
              this.setState({ inputTodo: e.target.value });
            }}
            className="form-control"
            placeholder="Ajoutez une tâche"
          />
          <button
            className="btn btn-primary"
            onClick={() => {
              if (this.state.inputTodo !== "") {
                this.setState({
                  todos: [...this.state.todos, this.state.inputTodo],
                  inputTodo: ""
                });
              }
            }}
          >
            Ajouter
          </button>
        </div>
        <ul className="list-group">
          {this.state.todos.map((todo, index) => (
            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
              {this.state.editIndex === index ? (
                <input
                  type="text"
                  value={this.state.editValue}
                  onChange={(e) => this.setState({ editValue: e.target.value })}
                />
              ) : (
                <span>{todo}</span>
              )}
              <div>
                {this.state.editIndex === index ? (
                  <button className="btn btn-success btn-sm" onClick={this.handleSave}>
                    sauvegarder
                  </button>
                ) : (
                  <button className="btn btn-warning btn-sm" onClick={() => this.handleEdit(index)}>
                    modifier
                  </button>
                )}
                <button className="btn btn-danger btn-sm ms-2" onClick={() => this.handleDelete(index)}>
                  supprimer
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

ReactDOM.render(<Todos />, document.getElementById("root"));
