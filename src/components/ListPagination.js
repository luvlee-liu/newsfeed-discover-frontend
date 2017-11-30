import React from 'react';
import agent from '../agent';
import { connect } from 'react-redux';
import { SET_PAGE } from '../constants/actionTypes';

const mapDispatchToProps = dispatch => ({
  onSetPage: (page, payload) =>
    dispatch({ type: SET_PAGE, page, payload })
});

const ListPagination = props => {
  if (props.articlesCount <= 10) {
    return null;
  }

  const range = [];
  for (let i = 0; i < Math.ceil(props.articlesCount / 10); ++i) {
    range.push(i);
  }

  const setPage = page => {
    if(props.pager) {
      props.onSetPage(page, props.pager(page));
    }else {
      props.onSetPage(page, agent.Articles.all(page))
    }
  };

  return (
    <nav>
      <ul className="pagination justify-content-center mt-2">

        {
          range.filter((v) => {
            return v <= props.currentPage + 1 && v >= props.currentPage - 1;
          })
          .map((v) => {
            const isOlder = v === props.currentPage + 1;
            const isCurrent = v === props.currentPage;
            const onClick = ev => {
              ev.preventDefault();
              setPage(v);
              window.scrollTo(0, 0);
            };
            if (isCurrent) {
              return (
                <li className='disabled page-item'>
                  <span className='page-link'>{(props.currentPage +1) * 10 } of {props.articlesCount}</span>
                </li>
              );
              
            }
            else {
              return (
                <li
                  className='page-item'
                  onClick={onClick}
                  key={v.toString()}>
                  <a className="page-link" href="#">{isOlder ? 'Older »' : '« Newer'}</a>
                </li>
              );
            }
          })
        }

      </ul>
    </nav>
  );
};

export default connect(() => ({}), mapDispatchToProps)(ListPagination);
