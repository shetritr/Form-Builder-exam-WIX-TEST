import React, { Component } from "react";
import BuildFormTable from "./BuildFormTable";

class BuildF extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form_name: "",
      label: "",
      name: "",
      type: "text",
      fields: [],
      labels: {
        Label: "field label",
        name: "input name",
        type: "input type"
      }
    };
  }

  AddField = e => {
    e.preventDefault();
    const fields = this.state.fields;
    const newid = fields.length;

    this.setState({
      fields: fields.concat({
        id: newid,
        name: this.refs.name.value,
        Label: this.refs.Label.value,
        type: this.refs.type.value
      })
    });
  };

  newField = () => {
    return (
      <form className="pure-form" onSubmit={this.AddField}>
        <fieldset>
          <legend>New Field</legend>
          <div className="pure-u-1-4">
            <input ref="Label" type="text" placeholder="Field Label" />
            <input ref="name" type="text" placeholder="Input name" />
          </div>
          <div className="pure-u-1-4">
            <label htmlFor="sel">type :</label>
            <select ref="type" className="form-control">
              <option>text</option>
              <option>color</option>
              <option>date</option>
              <option>email</option>
              <option>tel</option>
              <option>number </option>
            </select>
          </div>

          <button type="submit" className="pure-button pure-button-primary">
            Add Field
          </button>
        </fieldset>
      </form>
    );
  };

  render() {
    return (
      <div className="BuildF">
        <button className="pure-button" onClick={this.props.formListClick}>
          Form List
        </button>
        <div className="text-center">
          <div className="pure-form ">
            <input ref="formName" type="text" placeholder="Form name" />
          </div>
          <div className="pure-u-12">
            <button
              type="submit"
              className="pure-button pure-button-primary"
              onClick={this.submit}
            >
              Submit
            </button>
          </div>
        </div>
        {this.newField()}
        <div className="pure">
          <table className="Table">
            <thead>
              <BuildFormTable field={this.state.labels} />
            </thead>
            <tbody>
              {this.state.fields.map(field => (
                <BuildFormTable key={field.id} field={field} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  submit = e => {
    e.preventDefault();
    this.props.addForm(this.refs.formName.value, this.state.fields);
  };
}

export default BuildF;
