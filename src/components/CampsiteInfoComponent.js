import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
} from "reactstrap";
import { LocalForm, Control, Errors } from "react-redux-form";
import { Link } from "react-router-dom";
import { Loading } from "./LoadingComponent";

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };
  }

  toggleModal = () => {
    this.setState({ modal: !this.state.modal });
  };

  onSubmitHandler = (e) => {
    console.log(e);
    this.toggleModal();
    this.props.addComment(this.props.campsiteId, e.rating, e.author, e.text);
  };

  render() {
    return (
      <>
        <Button
          outline
          size="lg"
          color="primary"
          className="fa-lg"
          onClick={this.toggleModal}
        >
          <i className="fa fa-pencil fa-md" />
          Submit Comment
        </Button>

        {/* Modal Form  */}

        <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={this.onSubmitHandler}>
              <div className="form-group">
                <Label htmlFor="rating"> Rating </Label>
                <Control.select
                  model=".rating"
                  name="rating"
                  className="form-control"
                >
                  <option disabled selected hidden>
                    Select
                  </option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </Control.select>
              </div>
              <div className="form-group">
                <Label htmlFor="author"> Your Name </Label>
                <Control.text
                  name="author"
                  model=".author"
                  placeholder="Your Name"
                  className="form-control"
                  validators={{
                    required,
                    minLength: minLength(2),
                    maxLength: maxLength(15),
                  }}
                />
                <Errors
                  className="text-danger"
                  model=".author"
                  show="touched"
                  component="div"
                  messages={{
                    required: "Required",
                    minLength: "Must be at least 2 characters",
                    maxLength: "Must be 15 characters or less",
                  }}
                />
              </div>
              <div className="form-group">
                <Label htmlFor="text"> Comment </Label>
                <Control.textarea
                  model=".text"
                  name="text"
                  className="form-control"
                  rows="6"
                ></Control.textarea>
              </div>
              <Button type="submit" color="primary">
                Submit
              </Button>
            </LocalForm>
          </ModalBody>
        </Modal>
      </>
    );
  }
}

function RenderCampsite({ campsite }) {
  return (
    <div className="col-md-5 m-1">
      <Card>
        <CardImg top src={campsite.image} alt={campsite.name} />
        <CardBody>
          <CardText>{campsite.description}</CardText>
        </CardBody>
      </Card>
    </div>
  );
}

function RenderComments({ comments, addComment, campsiteId }) {
  if (comments) {
    return (
      <div className="col-md-5 m-1">
        <h4> Comments </h4>
        {comments.map((comment) => (
          <div className="container">
            <div>{comment.text}</div>
            <p>
              {" "}
              <strong> {comment.author} </strong>{" "}
              {new Intl.DateTimeFormat("en-US", {
                year: "numeric",
                month: "short",
                day: "2-digit",
              }).format(new Date(Date.parse(comment.date)))}
            </p>
          </div>
        ))}
        <CommentForm campsiteId={campsiteId} addComment={addComment} />
      </div>
    );
  }
}

function CampsiteInfo(props) {
  if (props.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  }
  if (props.errMess) {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <h4>{props.errMess}</h4>
          </div>
        </div>
      </div>
    );
  }
  if (props.campsite) {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <Breadcrumb>
              <BreadcrumbItem>
                <Link to="/directory">Directory</Link>
              </BreadcrumbItem>
              <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
            </Breadcrumb>
            <h2>{props.campsite.name}</h2>
            <hr />
          </div>
          <div className="row">
            <RenderCampsite campsite={props.campsite} />
            <RenderComments
              comments={props.comments}
              addComment={props.addComment}
              campsiteId={props.campsite.id}
            />
          </div>
        </div>
      </div>
    );
  }
  return <div />;
}

export default CampsiteInfo;
