import React from "react";
import { baseUrl } from "../shared/baseUrl";
import { Card, CardImg, CardText, CardBody, CardTitle } from "reactstrap";

function RenderCard({ item }) {
  console.log(item);
  if (item) {
    return (
      <Card>
        <CardImg src={baseUrl + item.image} alt={item.name} />
        <CardBody>
          <CardTitle>{item.name}</CardTitle>
          <CardText>{item.description}</CardText>
        </CardBody>
      </Card>
    );
  }
  return <div />;
}

function Home(props) {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md m-1">
          <RenderCard item={props.campsites} />
        </div>
        <div className="col-md m-1">
          <RenderCard item={props.promotions} />
        </div>
        <div className="col-md m-1">
          <RenderCard item={props.partners} />
        </div>
      </div>
    </div>
  );
}

export default Home;
