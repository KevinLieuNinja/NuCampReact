import React, { Component } from "react";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import Directory from "./DirectoryComponent";
import Contact from "../components/ContactComponent";
import Home from "./HomeComponent";
import { CAMPSITES } from "../shared/campsites";
import { COMMENTS } from "../shared/comments";
import { PARTNERS } from "../shared/partners";
import { PROMOTIONS } from "../shared/promotions";
import { Switch, Route, Redirect } from "react-router-dom";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      campsites: CAMPSITES,
      comments: COMMENTS,
      partners: PARTNERS,
      promotions: PROMOTIONS,
    };
  }

  render() {
    const HomePage = () => {
      return (
        <Home
          campsites={
            this.state.campsites.filter((campsite) => campsite.featured)[0]
          }
          promotions={
            this.state.promotions.filter((promotion) => promotion.featured)[0]
          }
          partners={
            this.state.partners.filter((partner) => partner.featured)[0]
          }
        />
      );
    };

    return (
      <div>
        <Header />
        <Switch>
          <Route path="/home" component={HomePage} />
          <Route
            exact
            path="/directory"
            render={() => <Directory campsites={this.state.campsites} />}
          />
          <Route exact path="/contactus" component={Contact} />
          <Redirect to="/home" />
          <Directory campsites={this.state.campsites} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default Main;
