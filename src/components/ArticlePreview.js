import React from 'react';
import { Link } from 'react-router-dom';
import agent from '../agent';
import { connect } from 'react-redux';
import { ARTICLE_FAVORITED, ARTICLE_UNFAVORITED } from '../constants/actionTypes';
import moment from 'moment';
import {withRouter} from "react-router-dom";

const FAVORITED_CLASS = 'btn btn-sm btn-danger';
const NOT_FAVORITED_CLASS = 'btn btn-sm btn-primary';

const mapDispatchToProps = dispatch => ({
  favorite: slug => dispatch({
    type: ARTICLE_FAVORITED,
    payload: agent.Articles.favorite(slug)
  }),
  unfavorite: slug => dispatch({
    type: ARTICLE_UNFAVORITED,
    payload: agent.Articles.unfavorite(slug)
  })
});

const ArticlePreview = props => {
  const article = props.article;
  const favoriteButtonClass = article.favorited ?
    FAVORITED_CLASS :
    NOT_FAVORITED_CLASS;

  const handleClick = ev => {
    ev.preventDefault();
    if (props.hasToken) {
      if (article.favorited) {
        props.unfavorite(article.slug);
      } else {
        props.favorite(article.slug);
      }
    }
    else {
      props.history.push(`/login`);
    }
  };

  const tagListLength = 6
  const tagList = article.tagList.slice(0, tagListLength);
  const moreTagList = article.tagList.slice(tagListLength);
  const moreTagID = "more-tag-" + article.slug.replace('.', '-');
  const moreTagButton = (article.tagList.length > tagListLength) ? 
    <button className="btn btn-sm btn-primary float-right" data-toggle="collapse" data-target={"#"+moreTagID}>
      tags <i className="ion-android-more-vertical"></i>
    </button> : '';

  return (
    <div className="">
      <div className="card mt-3">

        <img className="card-img-top" src={article.urlToImage} alt='' />
        <div className="card-body">
          <h4 className="card-title font-weight-bold">{article.title} </h4>
          <span className="text-muted text-right">
              {moment(article.createdAt).fromNow()}
          </span>
          <p className="card-text">{article.description}</p>
          <a href={article.url} target='_blank' className="pl-0 btn btn-primary">read more on {article.source}</a>
        </div>

        <div className="card-footer text-muted">
            <button className={favoriteButtonClass} onClick={handleClick}>
              <i className="ion-heart"></i> {article.favoritesCount}
            </button>
            <Link to={`/article/${article.slug}`} className="text-muted link">Full text</Link>
            {moreTagButton}
            <ul className="mt-1 list-unstyled">
              <div>
              {
                tagList.map(tag => {
                  return (
                    <li className="badge badge-pill badge-primary m-1" key={tag}>
                      {tag}
                    </li>
                  )
                })
              }
              </div>
              <div id={moreTagID} className="collapse">
              {
                moreTagList.map(tag => {
                  return (
                    <li className="badge badge-pill badge-primary m-1" key={tag}>
                      {tag}
                    </li>
                  )
                })
              }
              </div>
            </ul>
        </div>
      </div>
    </div>
  );
}

export default connect(() => ({}), mapDispatchToProps)(withRouter(ArticlePreview));
