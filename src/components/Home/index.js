// import Banner from './Banner';
import MainView from './MainView';
import React from 'react';
import Tags from './Tags';
import agent from '../../agent';
import { connect } from 'react-redux';
import {
  HOME_PAGE_LOADED,
  HOME_PAGE_UNLOADED,
  APPLY_TAG_FILTER
} from '../../constants/actionTypes';
import {Typeahead} from 'react-typeahead';

const Promise = global.Promise;

const mapStateToProps = state => ({
  ...state.home,
  appName: state.common.appName,
  token: state.common.token
});

const mapDispatchToProps = dispatch => ({
  onClickTag: (tag, pager, payload) =>
    dispatch({ type: APPLY_TAG_FILTER, tag, pager, payload }),
  onLoad: (tab, pager, payload) =>
    dispatch({ type: HOME_PAGE_LOADED, tab, pager, payload }),
  onUnload: () =>
    dispatch({  type: HOME_PAGE_UNLOADED })
});

class Home extends React.Component {
  componentWillMount() {
    // const tab = this.props.token ? 'feed' : 'all';
    // const articlesPromise = this.props.token ?
    //   agent.Articles.feed :
    //   agent.Articles.all;
    const tab = 'all';
    const articlesPromise = agent.Articles.all;

    this.props.onLoad(tab, articlesPromise, Promise.all([agent.Tags.getAll(), articlesPromise()]));
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    const optionSelected = tag => {
      this.props.onClickTag(tag, page => agent.Articles.byTag(tag, page), agent.Articles.byTag(tag));
    };
    return (
      <div className="">
        {/* <Banner token={this.props.token} appName={this.props.appName} /> */}
        <div className="fixed-bottom">
          <div className="float-right mr-2 mb-1">
            <a className="btn btn-outline-info btn-lg" href="#"><i className="ion-chevron-up"/></a>
          </div>
        </div>
        <div className="container">
          <div className="row my-4">
            <p/>
          </div>
          <Typeahead
            ref={(input) => { this.textInput = input; }}
            options={this.props.tags}
            maxVisible={25}
            placeholder='search by tag'
            showOptionsWhenEmpty={true}
            onOptionSelected={optionSelected}
            customClasses={{
              input: 'form-control',
              listItem: 'btn btn-raised btn-outline-primary m-1'
            }}
          />
          <div className="">
            
          </div>
          <div className="row">
            <div className="col-md-3">
            {/* <Tags
              tags={this.props.tags}
              onClickTag={this.props.onClickTag} /> */}
            </div>
            <MainView />

            <div className="col-md-3">
            <p className="font-weight-bold text-uppercase text-center mt-2">Top Tags</p>
            <Tags
              tags={this.props.tags}
              onClickTag={this.props.onClickTag} />
            </div> 
          </div>
        </div>
      
        <footer className="footer mb-4">
          <div className="container py-4">
            <div className="text-center text-primary">@ luvee.liu </div>
            <div className="text-center">
              <span className="small text-muted">Powered by</span>
              <img height="25" src="https://cdn2.iconfinder.com/data/icons/nodejs-1/512/nodejs-512.png" alt="node.js"/>
              <img height="20" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/280px-React-icon.svg.png" alt="react.js"/>
              <img height="20" src="https://v4-alpha.getbootstrap.com/assets/brand/bootstrap-solid.svg" alt="react.js"/>
              <a href="https://newsapi.org/" className="ml-1 small text-muted">newsapi</a>
              <a href="https://github.com/gothinkster/realworld" className="ml-1 small text-muted">realworld</a>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
