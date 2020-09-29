import React, { Component } from "react";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import Directory from "./DirectoryComponent";
import Contact from "../components/ContactComponent";
import Home from "./HomeComponent";
import About from "./AboutComponent";
import CampsiteInfo from "./CampsiteInfoComponent";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    campsites: state.campsites,
    comments: state.comments,
    partners: state.partners,
    promotions: state.promotions,
  };
};

class Main extends Component {
  render() {
    const CampsiteWithId = ({ match }) => {
      return (
        <CampsiteInfo
          campsite={
            this.props.campsites.filter(
              (campsite) => campsite.id === +match.params.campsiteId
            )[0]
          }
          comments={this.props.comments.filter(
            (comment) => comment.campsiteId === +match.params.campsiteId
          )}
        />
      );
    };

    const HomePage = () => {
      return (
        <Home
          campsites={
            this.props.campsites.filter((campsite) => campsite.featured)[0]
          }
          promotions={
            this.props.promotions.filter((promotion) => promotion.featured)[0]
          }
          partners={
            this.props.partners.filter((partner) => partner.featured)[0]
          }
        />
      );
    };

    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/home" component={HomePage} />
          <Route
            exact
            path="/directory"
            render={() => <Directory campsites={this.props.campsites} />}
          />
          <Route
            exact
            path="/directory/:campsiteId"
            component={CampsiteWithId}
          />
          <Route
            exact
            path="/aboutus"
            render={() => <About partners={this.props.partners} />}
          />
          <Route exact path="/contactus" component={Contact} />
          <Redirect to="/home" />
          <Directory campsites={this.props.campsites} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(Main));
