import React, { Component } from "react";
import {Button} from "@material-ui/core";

export function UploadFile({onChangeHandler,onClickHandler  }) {
    return (
      <div className="container">
        <div className="row">
          <div className="offset-md-3 col-md-6">
            <div className="form-group files">
              <label>Upload Your File </label>
              <input
                type="file"
                name="logo"
                className="form-control"
                onChange={onChangeHandler}
              />
            </div>
            <button
              className="btn btn-success btn-block"
              onClick={onClickHandler}
            >
              Upload
            </button>
          </div>
        </div>
      </div>
    );
}
