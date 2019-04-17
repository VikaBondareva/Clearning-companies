import React, { Component } from "react";
import { Progress } from "reactstrap";
import { UploadFile } from "../../../common/card/upload-file-card";
import { Button } from "@material-ui/core";

export class UploadLogoCompany extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      loaded: 0
    };
  }
  checkMimeType = file => {
    let err = "";
    const types = ["image/png", "image/jpeg", "image/gif", "image/jpg"];
    if (types.every(type => file.type !== type)) {
      err = file.type + " is not a supported format\n";
      return false;
    }
    console.error(err);
    return true;
  };
  checkFileSize = file => {
    let size = 2000000;
    let err = "";
    if (file.size > size) {
      err = file.type + "is too large, please pick a smaller file\n";
      return false;
    }
    console.error(err);
    return true;
  };

  onChangeHandler = event => {
    var file = event.target.files[0];
    if (this.checkMimeType(file) && this.checkFileSize(file)) {
      this.setState({
        selectedFile: file,
        loaded: 0
      });
    }
  };

  onClickHandler = (event) => {
    event.preventDefault();
    const file = this.state.selectedFile;
    this.props.saveChanges(file);
  };

  render() {
    return (
      <>
        <UploadFile
          onChangeHandler={this.onChangeHandler}
          onClickHandler={this.onClickHandler}
        />
      </>
    );
  }
}
