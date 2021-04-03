import React from "react";
import s from "./SearchInput.module.css";

export default function Input({ onSubmit, onChange, label, ...props }) {
  return (
    <form onSubmit={onSubmit} className={s.wrapper}>
      <label>
        {label}
        <input
          onSubmit={onSubmit}
          className={s.input}
          onChange={onChange}
          type="search"
          {...props}
        />
        <button className={s.btn} type="submit">
          Search
        </button>
      </label>
    </form>
  );
}
