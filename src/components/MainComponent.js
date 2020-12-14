import React, { Component } from 'react';
import Directory from './DirectoryComponent';
import CampsiteInfo from './CampsiteInfoComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import { Switch, Route, Redirect, withRouter  } from 'react-router-dom';
import { connect } from 'react-redux';
import Contact from './ContactComponent';
import About from './Aboutus';
import { fetchCampsites, postComment, postFeedback, fetchComments, fetchPromotions, fetchPartners } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';

const mapStateToProps = state => {
  return {
      campsites: state.campsites,
      comments: state.comments,
      partners: state.partners,
      promotions: state.promotions
  };
};

const mapDispatchToProps = {
  postComment: (campsiteId, rating, author, text) => (postComment(campsiteId, rating, author, text)),
  postFeedback: feedback => (postFeedback(feedback)),
  fetchCampsites: () => (fetchCampsites()),
  resetFeedbackForm: () => (action.reset('feedbackForm')),
  fetchComments: () => (fetchComments()),
  fetchPromotions: () => (fetchPromotions()),
  fetchPartners: () => (fetchPartners())
};

class Main extends Component {

  componentDidMount() {
      this.props.fetchCampsites();
      this.props.fetchComments();
      this.props.fetchPromotions();
      this.props.fetchPartners();
      
  }

  render() {

      const HomePage = () => {
          return (
              <Home
                  campsite={this.props.campsites.campsites.filter(campsite => campsite.featured)[0]}
                  campsitesLoading={this.props.campsites.isLoading}
                  campsitesErrMess={this.props.campsites.errMess}
                  promotion={this.props.promotions.filter(promotion => promotion.featured)[0]}
                  partner={this.props.partners.filter(partner => partner.featured)[0]}
                  partnerLoading = {this.props.partners.isLoading}
                  partnerErrMess = {this.props.partners.errMess}
                />
          );
      }

      const CampsiteWithId = ({match}) => {
          return (
              <CampsiteInfo 
                  campsite={this.props.campsites.campsites.filter(campsite => campsite.id === +match.params.campsiteId)[0]}
                  isLoading={this.props.campsites.isLoading}
                  errMess={this.props.campsites.errMess}
                  comments={this.props.comments.filter(comment => comment.campsiteId === +match.params.campsiteId)}
                  addComment={this.props.addComment}
              />
          );
      };

    
        return ( 
              <div>
                  <Header />
                  <Switch>
                      <Route path='/home' component={HomePage} />
                      <Route exact path='/directory' render={ () => <Directory campsites={this.state.campsites} />} />
                      <Route exact path='/contactus' render ={ () => <Contact postFeedback={this.props.postFeedback} resetFeedbackForm={this.props.restFeedbackForm} />} />
                      <Route exact path='/aboutus' render={() => <About partners = {this.state.partners} />} />
                      <Redirect to='/home' />
                  </Switch>
                  <Footer />
              </div>
          );
              
        }
  }


  export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));

