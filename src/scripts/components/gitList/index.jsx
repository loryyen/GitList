import React, { useState, useEffect, useRef } from "react";
import "./style.sass";
import Axios from "axios";
import _ from "lodash";

const GitList = () => {
  const [data, setData] = useState([]);
  const pageTopRef = useRef(null);

  useEffect(() => {
    if (data.length === 0) {
      getData("scars377");
    }
    window.addEventListener("scroll", onScrollHander);
    return () => {
      window.removeEventListener("scroll", onScrollHander);
    };
  }, [data]);

  const onScrollHander = _.debounce(() => {
    //data height
    let clientHeight = pageTopRef.current.clientHeight;
    //screen height
    let documentHeight = document.documentElement.clientHeight;
    //scroll height
    let documentTop = document.documentElement.scrollHeight;
    if (
      clientHeight > documentHeight ||
      clientHeight >= documentHeight + documentTop
    ) {
      getData("loryyen");
    }
  }, 500);

  const getData = owner => {
    let newData = [...data];
    Axios.get(`https://api.github.com/users/${owner}/repos`).then(rep => {
      newData = newData.concat(rep.data);
      // setData(d => newData);
      setData(newData);
    });
  };

  return (
    <div className="gitList-wrapper" ref={pageTopRef}>
      <div className="row head">
        <div className="col">Name</div>
        <div className="col">Description</div>
      </div>
      {data.map(d => {
        return (
          <div className="row" key={d.id}>
            <div className="col">{d.name}</div>
            <div className="col">{d.description}</div>
          </div>
        );
      })}
    </div>
  );
};

export default GitList;
