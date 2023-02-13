import ListUsers from "../../components/ListUsers/ListUsers";

import React, { useState } from "react";
import css from "./Landpage.module.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

function Landpage() {
  const [input, setInput] = useState("");
  const [inputDisplay, setInputDisplay] = useState("");
  const [page, setPage] = useState(1);
  const [dataUsers, setDataUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const changeInput = (e) => {
    setInput(e.target.value);
  };

  const click = () => {
    setLoading(true);
    setInputDisplay(input);
    axios
      .get(
        `https://api.github.com/search/users?q=${input}&per_page=10&page=${1}`,
        {}
      )
      .then((res) => {
        setDataUsers(res.data.items);
        setPage(1);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const next = () => {
    setLoading(true);
    axios
      .get(
        `https://api.github.com/search/users?q=${input}&per_page=10&page=${
          page + 1
        }`,
        {}
      )
      .then((res) => {
        if (!res.data.items[0]) {
          setLoading(false);
          return toast.error("this page is the last page", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
        setDataUsers(res.data.items);
        setPage(page + 1);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const prev = () => {
    if (page === 1) return;
    setLoading(true);
    setPage(page - 1);
    axios
      .get(
        `https://api.github.com/search/users?q=${input}&per_page=10&page=${
          page - 1
        }`,
        {}
      )
      .then((res) => {
        setDataUsers(res.data.items);
        setPage(page - 1);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <>
      <main className={css.main}>
        <input
          type={"text"}
          onChange={changeInput}
          placeholder="input username github here"
          className={css.input}
          value={input}
        />
        <button onClick={click} className={css.btn_search}>
          Search
        </button>
        {inputDisplay && (
          <p className={css.display_input}>
            Showing users for "{inputDisplay}"
          </p>
        )}
        {!dataUsers[0] && inputDisplay && !loading && <p>no user found</p>}
        {!loading ? (
          dataUsers[0] &&
          dataUsers.map((res, i) => (
            <ListUsers
              key={i}
              name={res.login}
              repo={res.repos_url}
              ava={res.avatar_url}
            />
          ))
        ) : (
          <h1 className={css.Loading}>
            <span className={css.let1}>l</span>
            <span className={css.let2}>o</span>
            <span className={css.let3}>a</span>
            <span className={css.let4}>d</span>
            <span className={css.let5}>i</span>
            <span className={css.let6}>n</span>
            <span className={css.let7}>g</span>
          </h1>
        )}
        <div className={css.pageContainer}>
          <button onClick={prev} className={css.button}>
            prev
          </button>
          <p>{page}</p>
          <button onClick={next} className={css.button}>
            next
          </button>
        </div>
      </main>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default Landpage;
