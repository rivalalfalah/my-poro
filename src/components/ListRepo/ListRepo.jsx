import React from "react";

import css from "./ListRepo.module.css"

function ListRepo(props) {

    const toGithub = () => {
        window.open(props.url)
    }
  return (
    <>
      <main className={css.main} onClick={toGithub}>
        <span>
          <p className={css.name}>{props.name}</p>
          <p>
            {props.desc === null
              ? "no description in this repository"
              : props.desc}
          </p>
        </span>
        <span className={css.star}>
          <p>{props.star}</p>
        <i className="fa-solid fa-star" />
        </span>
      </main>
    </>
  );
}

export default ListRepo;
