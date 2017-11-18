import React from 'react';
import { Link } from 'react-router-dom';
import agent from '../agent';
import { connect } from 'react-redux';
import { ARTICLE_FAVORITED, ARTICLE_UNFAVORITED } from '../constants/actionTypes';
import moment from 'moment';

const FAVORITED_CLASS = 'btn btn-sm btn-primary';
const NOT_FAVORITED_CLASS = 'btn btn-sm btn-outline-primary';

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
    if (article.favorited) {
      props.unfavorite(article.slug);
    } else {
      props.favorite(article.slug);
    }
  };

  return (
    <div className="article-preview">
      {/* <div className="article-meta">
        <a href={article.url}>
          {article.source}
        </a>

        <div className="info">
          <Link className="author" to={`/@${article.author.username}`}>
            {article.author.username}
          </Link>
          <span className="date">
            {new Date(article.createdAt).toDateString()}
          </span>
        </div>

        <div className="pull-xs-right">
          <button className={favoriteButtonClass} onClick={handleClick}>
            <i className="ion-heart"></i> {article.favoritesCount}
          </button>
        </div>
      </div> */}
      
      <div to={`/article/${article.slug}`} className="preview-link">
        <div className="row">
          <div className="col-md-5">
            <img className="img-thumbnail" src={article.urlToImage} alt={article.urlToImage} />
          </div>
          <div className="col-md-7">
            <h4>{article.title}</h4>
            <p>{article.description}</p>
            {/* <span>Read more...</span> */}
            <a href={article.url}>
              read more on {article.source}
            </a>
            <div className="pull-xs-right">
              <button className={favoriteButtonClass} onClick={handleClick}>
                <i className="ion-heart"></i> {article.favoritesCount}
              </button>
            </div>
            <Link to={`/article/${article.slug}`}>
              <ul className="tag-list">
                {
                  article.tagList.map(tag => {
                    return (
                      <li className="tag-default tag-pill tag-outline" key={tag}>
                        {tag}
                      </li>
                    )
                  })
                }
              </ul>
            </Link>
            <div className="date">
              {moment(article.createdAt).fromNow()}
            </div>
              
          </div>
        </div>
      </div>
    </div>
  );
}

export default connect(() => ({}), mapDispatchToProps)(ArticlePreview);
