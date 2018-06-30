import React from "react";
import ReactDOM from "react-dom";
import Form from "react-jsonschema-form";
//import Form from "react-schema-form-antd";
//import Form from "antd-jsonschema-form";

/**
 * jsonschema转form表单
 * @class
 */
export default class JsonForm {
  constructor(schema: object, data?: object, onSubmit?: Function) {
    ReactDOM.render((
      <Form schema={schema} formData={data} onSubmit={onSubmit}>
        <div>
          <button className="btn btn-info" type="submit">确定</button>
        </div>
      </Form>
    ), document.getElementById("json-schema-form"));
  }
}