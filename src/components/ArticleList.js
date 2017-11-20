import ArticlePreview from './ArticlePreview';
import ListPagination from './ListPagination';
import React from 'react';

const ArticleList = props => {
  if (!props.articles) {
    return (
      <div className="article-preview">Loading...</div>
    );
  }

  if (props.articles.length === 0) {
    return (
      <div className="article-preview">
        No articles are here... yet.
      </div>
    );
  }
  const hasToken= props.token !== null;
  return (
    <div className="">
      <div className="card-group">
      {
        props.articles.map(article => {
          return (
            <ArticlePreview hasToken={hasToken} article={article} key={article.slug} />
          );
        })
      }
      </div>
      <ListPagination
        pager={props.pager}
        articlesCount={props.articlesCount}
        currentPage={props.currentPage} />
    </div>
  );
};

export default ArticleList;
