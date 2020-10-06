import React from "react";
import { baseUrl } from "../shared/baseUrl";
import { FadeTransform } from "react-animation-components";
import { Card, CardImg, CardText, CardBody, CardTitle } from "reactstrap";

function RenderCard({ item }) {
  console.log(item);
  if (item) {
    return (
      <FadeTransform
        in
        transformProps={{ exitTransform: "scale(0.5) translate(50%)" }}
      >
        <Card>
          <CardImg src={baseUrl + item.image} alt={item.name} />
          <CardBody>
            <CardTitle>{item.name}</CardTitle>
            <CardText>{item.description}</CardText>
          </CardBody>
        </Card>
      </FadeTransform>
    );
  }
  return <div />;
}

function Home(props) {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md m-1">
          <RenderCard
            item={props.campsites}
            isLoading={props.campsitesLoading}
            errMess={props.campsitesErrMess}
          />
        </div>
        <div className="col-md m-1">
          <RenderCard
            item={props.promotions}
            isLoading={props.promotionsLoading}
            errMess={props.promotionsErrMess}
          />
        </div>
        <div className="col-md m-1">
          <RenderCard
            item={props.partner}
            isLoading={props.partnerLoading}
            errMess={props.partnerErrMess}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
