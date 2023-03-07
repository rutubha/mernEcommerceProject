import { Fragment, useState } from "react";
import MetaData from "../layout/MetaData";
import "./Search.css";

const Search = ({ history }) => {

    const [keyword, setKeyword] = useState("");

  const searchSubmithandler = (e) => {
      e.preventDefault();
      if(keyword.trim()) {
          history.push(`/products/${keyword}`);
      } else {
          history.push(`/products`);
      }
  };
  return (
    <Fragment>
      <MetaData title="Search -- Ecommerce" />
      <form className="searchBox" onSubmit={searchSubmithandler}>
        <input
          type="text"
          placeholder="Search a product....."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <input type="submit" value="Search" />
      </form>
    </Fragment>
  );
};

export default Search;
