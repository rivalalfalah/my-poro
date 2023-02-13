import React, { useState } from "react";
import axios from "axios";
import css from "./ListUsers.module.css";

import ListRepo from "../ListRepo/ListRepo";

function ListUsers(props) {
  const [repository, setRepository] = useState([]);
  const [open, setOpen] = useState(false);

  const seeMore = () => {
    if (open) {
      return setOpen(false);
    }
    axios
      .get(props.repo, {})
      .then((res) => {
        setRepository(res.data);
        setOpen(true);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className={css.component} onClick={seeMore}>
        <span className={css.container_left}>
          <div className={css.image}>
            <img
              src={props.ava}
              alt="avatar"
              width={"100%"}
              height={"100%"}
              style={{ borderRadius: "300%" }}
            />
          </div>
          <div className={css.name}>{props.name}</div>
        </span>
        <span className={css.icon}>
          {open ? (
            <i className="fa-solid fa-chevron-up fa-2x" />
          ) : (
            <i className="fa-solid fa-chevron-down fa-2x" />
          )}
        </span>
      </div>
      {repository[0] &&
        open &&
        props.repo === repository[0].owner.repos_url &&
        repository.map((e, i) => (
          <ListRepo
            key={i}
            name={e.name}
            star={e.stargazers_count}
            desc={e.description}
            url={e.html_url}
          />
        ))}
    </>
  );
}

export default ListUsers;
