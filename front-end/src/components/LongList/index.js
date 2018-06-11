import React from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

import './LongList.css'

const style = {
  height: 30,
  border: "1px solid green",
  margin: 6,
  padding: 8
};

class LongList extends React.Component {
  state = {
    items: Array.from({ length: 20 })
  };

  fetchMoreData = () => {
    // a fake async api call like which sends
    // 20 more records in 1.5 secs
    setTimeout(() => {
      this.setState({
        items: this.state.items.concat(Array.from({ length: 20 }))
      });
    }, 1500);
  };

  render() {
    return (
      <div className="row">
        <div className="col-xs-12 offset-sm-3 col-sm-9 offset-md-7 col-md-5 offset-lg-9 col-lg-3">
          <InfiniteScroll
            className="long-list"
            dataLength={this.state.items.length}
            next={this.fetchMoreData}
            hasMore={true}
            loader={<h4>Loading...</h4>} >
            {this.state.items.map((i, index) => (
              <div style={style} key={index}>
                div - #{index}
              </div>
            ))}
          </InfiniteScroll>
        </div>
      </div>
    );
  }
}

export default LongList
