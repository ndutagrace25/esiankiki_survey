import React, { useState, useEffect } from "react";
import { Category } from "../common";
import classNames from "classnames";
import { connect } from "react-redux";
import { getAllCategories, getAllQuestions } from "../actions/surveyActions";

const Survey = ({
  allCategories,
  getAllCategories,
  allQuestions,
  getAllQuestions,
}) => {
  const [activeCategory, setActiveCategory] = useState(0);
  // const [allQuestions] = useState([
  //   { category_id: 1, id: 1, question: "Test question one" },
  //   { category_id: 1, id: 4, question: "Test question two" },
  //   { category_id: 2, id: 2, question: "Test question one category 2" },
  //   { category_id: 3, id: 3, question: "Test question one category 3" },
  // ]);
  // const [categories] = useState([
  //   { id: 1, name: "Check In" },
  //   { id: 2, name: "Category 2" },
  //   { id: 3, name: "Category 3" },
  // ]);
  const [choices] = useState([
    { id: 1, choice: 1 },
    { id: 2, choice: 2 },
    { id: 3, choice: 3 },
    { id: 4, choice: 4 },
    { id: 5, choice: 5 },
  ]);

  const [customerFeedback, setCustomerFeedback] = useState([]);

  useEffect(() => {
    getAllCategories();
    getAllQuestions();
  }, []);

  const gatherFeedback = (e, choice, question_id, category_id) => {
    let answer = { choice, question_id, category_id };

    const answerArray = [answer];

    // check if the question has already been answered
    let filtredArray = customerFeedback.filter(
      (item) =>
        item.question_id === question_id && item.category_id === category_id
    );

    if (filtredArray.length === 0) {
      // if the question is not yet answered, add to the already answered allQuestions
      setCustomerFeedback([...customerFeedback, answer]);
    } else {
      // if the question had already been answered, replace with the new answer
      const newArray = customerFeedback.map(
        (obj) =>
          answerArray.find((o) => o.question_id === obj.question_id) || obj
      );
      setCustomerFeedback(newArray);
    }
  };

  const setActive = (index) => {
    setActiveCategory(index);
  };

  const displayChoices = (question_id, category_id) => {
    const allChoices = choices.map((ch) => {
      return (
        <div key={ch.id}>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name={ch.question_id}
              id={ch.question_id}
              onChange={(e) =>
                gatherFeedback(e, ch.choice, question_id, category_id)
              }
            />
            <label className="form-check-label" htmlFor={ch.question_id}>
              {ch.choice}
            </label>
          </div>
        </div>
      );
    });

    return allChoices;
  };

  const displayQuestions = (category_id) => {
    const questions =
      allQuestions instanceof Array
        ? allQuestions
            .filter((question) => question.category_id === category_id)
            .map((qsn) => {
              return (
                <div key={qsn.id} className="my-3">
                  <div>{qsn.question}</div>
                  <div className="ms-3 mt-2">
                    {displayChoices(qsn.id, category_id)}
                  </div>
                </div>
              );
            })
        : null;
    return questions;
  };

  const displayCategories =
    allCategories instanceof Array
      ? allCategories.map((cat) => {
          return (
            <div
              key={cat.id}
              className="d-flex justify-content-start flex-column mt-2"
              style={{ cursor: "pointer" }}
            >
              <Category
                category={cat.name}
                setActive={() => setActive(cat.id)}
              />
              <div
                className={classNames(
                  "ms-3",
                  activeCategory !== cat.id && "d-none"
                )}
              >
                {displayQuestions(cat.id)}
              </div>
            </div>
          );
        })
      : null;
  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-center align-items-center py-3 bg-black text-warning fw-bold fs-4">
        Esiankiki
      </div>
      <div className="p-3">
        Thank you for visitting Esiankiki, I hope you enjoyed your stay. Looking
        forward to serve you again. We would appreciate if you would give us
        some feedback below on our services in the different areas you have been
        served.
      </div>
      <div className="mt-2 p-2">{displayCategories}</div>

      <div className="col-md-6 col-sm-12 ps-2 mt-3">
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder=""
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Phone
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder=""
          />
        </div>
        <div className="mb-3">
          <label for="exampleFormControlInput1" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="name@example.com"
          />
        </div>

        <div className="d-flex justify-content-center my-3">
          <button className="btn btn-primary px-5">Submit</button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  allCategories: state.survey.allCategories,
  allQuestions: state.survey.allQuestions,
});

export default connect(mapStateToProps, { getAllCategories, getAllQuestions })(
  Survey
);
