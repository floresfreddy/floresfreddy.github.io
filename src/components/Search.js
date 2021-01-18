import React from "react";

const Search = (props) => {
  return (
    <div className="box">
      <div className="ui large fluid icon input">
        <input
          type="text"
          placeholder={"Search your favorite movie"}
          onChange={(e) => {
            props.searching(e.target.value)
          }}
        />
        <i className="circular search link icon"></i>
      </div>
    </div>
  );
};

export default Search;