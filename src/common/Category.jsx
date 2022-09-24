import React from "react";

const Category = ({ category, value, name, setActive, cat_id }) => {
  return (
    <div className="shadow-sm rounded py-3 px-1 col-md-6 col-sm-12">
      <div className="form-check ">
        <input
          className="form-check-input"
          type="checkbox"
          value={value}
          name={name}
          id="flexCheckDefault"
          onChange={(e) => setActive(e, cat_id)}
          // checked={true}
        />
        <label
          className="form-check-label fw-bold fs-5"
          htmlFor="flexCheckDefault"
        >
          {category}
        </label>
      </div>
    </div>
  );
};

export default Category;
