import React, { useState, useEffect, useRef } from "react";
import { Category } from "../common";
import classNames from "classnames";
import { connect } from "react-redux";
import {
  getAllCategories,
  getAllQuestions,
  getAllUsers,
  saveFeedback,
} from "../actions/surveyActions";
import Select from "react-select";
import Swal from "sweetalert2";
import logo from "../images/logo.png";

const Survey = ({
  allCategories,
  getAllCategories,
  allQuestions,
  getAllQuestions,
  allUsers,
  getAllUsers,
  saveFeedback,
}) => {
  let newArray = [
    { user_first_name: "Not", user_last_name: "Sure", id: "Not Sure" },
    ...allUsers,
  ];
  const userOptions =
    allUsers instanceof Array
      ? newArray.map((user) => {
          return {
            label: `${user.user_first_name} ${user.user_last_name}`,
            value: user.id,
          };
        })
      : null;
  const [activeCategory, setActiveCategory] = useState(0);

  const [choices] = useState([
    { id: "1", choice: "1" },
    { id: "2", choice: "2" },
    { id: "3", choice: "3" },
    { id: "4", choice: "4" },
    { id: "5", choice: "5" },
  ]);

  const [customerFeedback, setCustomerFeedback] = useState([]);
  const [user_id, setUserId] = useState(null);
  const [user_name, setUserName] = useState(null);
  const [showQuestionsCat, setShowQuestions] = useState(0);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [categoryChanged, setCategoryChange] = useState(false);
  const [suggestion, setSuggestion] = useState("");

  useEffect(() => {
    getAllCategories();
    getAllQuestions();
    getAllUsers();
  }, []);

  const usePrevious = (value) => {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  };

  const prevActiveCategory = usePrevious({ activeCategory });

  useEffect(() => {
    if (
      prevActiveCategory?.activeCategory.id !== activeCategory.id &&
      activeCategory.id !== 0
    ) {
      // process here
      console.log("they are diff", "answer");
      setCategoryChange(true);
    } else {
      console.log("same", "answer");
      setCategoryChange(false);
    }
  }, [activeCategory?.id, activeCategory?.checked]);

  const gatherFeedback = (
    e,
    choice,
    question_id,
    category_id,
    category_name,
    question_statement
  ) => {
    let answer = {
      choice,
      question_id: question_id.toString(),
      category_id: category_id.toString(),
      user_id: user_id === "Not Sure" ? null : user_id.toString(),
      category_name,
      question_statement,
      user_name: user_id === "Not Sure" ? null : user_name,
    };

    const answerArray = [answer];

    // check if the question has already been answered
    let filtredArray = customerFeedback.filter(
      (item) =>
        item.question_id === question_id && item.category_id === category_id
    );

    if (filtredArray.length === 0) {
      // if the question is not yet answered, add to the already answered allQuestions
      setCustomerFeedback([...customerFeedback, answer]);
      if (!categoryChanged) {
        setUserId(null);
        setUserName(null);
      }
    } else {
      // if the question had already been answered, replace with the new answer
      const newArray = customerFeedback.map(
        (obj) =>
          answerArray.find((o) => o.question_id === obj.question_id) || obj
      );
      setCustomerFeedback(newArray);
      if (!categoryChanged) {
        setUserId(null);
        setUserName(null);
      }
    }
  };

  console.log(customerFeedback, "valuevalue");

  const setActive = (e, index) => {
    setActiveCategory({ id: index, checked: e.target.checked });
  };

  const displayChoices = (
    question_id,
    category_id,
    category_name,
    question_statement
  ) => {
    const allChoices = choices.map((ch) => {
      return (
        <div key={ch.id} className="ms-3">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name={ch.question_id}
              id={ch.question_id}
              onChange={(e) =>
                gatherFeedback(
                  e,
                  ch.choice,
                  question_id,
                  category_id,
                  category_name,
                  question_statement
                )
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

  const displayQuestions = (category_id, category_name) => {
    const questions =
      allQuestions instanceof Array
        ? allQuestions
            .filter((question) => question.category_id === category_id)
            .map((qsn) => {
              return (
                <div key={qsn.id} className="my-3">
                  <div>{qsn.question + " (On a scale of 1 - 5)"}</div>
                  <div className="ms-3 mt-2 d-flex flex-row">
                    {displayChoices(
                      qsn.id,
                      category_id,
                      category_name,
                      qsn.question
                    )}
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
                setActive={setActive}
                cat_id={cat.id}
                activeCategory={activeCategory}
              />
              <div
                className={classNames(
                  "ms-3",
                  activeCategory.id === cat.id && activeCategory.checked
                    ? "d-block"
                    : "d-none"
                )}
              >
                <div className="my-3 col-md-6 col-sm-12">
                  <label>Who served you on this section?</label>
                  <Select
                    options={userOptions}
                    placeholder="Select staff"
                    onChange={(selectedOption) => {
                      displayQuestions(cat.id, cat.name);
                      setUserId(selectedOption.value);
                      setUserName(selectedOption.label);
                      setShowQuestions(cat.id);
                    }}
                  />
                </div>
                <div className={showQuestionsCat !== cat.id && "d-none"}>
                  {displayQuestions(cat.id, cat.name)}
                </div>
              </div>
            </div>
          );
        })
      : null;

  const saveCustomerFeedback = () => {
    const dataToSave = customerFeedback.map((item) => {
      return { ...item, phone, email, suggestion };
    });
    saveFeedback(dataToSave);
    Swal.fire(
      "Success",
      "Your feedback has been received. Thank you.",
      "success"
    );
  };

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-center align-items-center py-2 bg-black text-warning fw-bold fs-4">
        <img src={logo} alt="Esiankiki" height="60" width="60" />
      </div>
      <div className="px-3 pt-3">
        We are always honored to have you and look forward to “spoil” you again,
        we would appreciate your complement and feedback below on our services
        in our endeavor to offer memorable experienced.
      </div>
      <div className="mt-2 p-2">{displayCategories}</div>

      <div className="my-3 col-md-6 col-sm-12">
        <label className="my-2">
          We would appreciate your suggestions as we continue to improve our
          hotel and its services.
        </label>
        <div className="form-floating">
          <textarea
            className="form-control"
            placeholder="Leave a comment here"
            id="floatingTextarea"
            onChange={(e) => setSuggestion(e.target.value)}
          ></textarea>
          <label for="floatingTextarea" className="text-muted">
            <small>Suggestions</small>
          </label>
        </div>
      </div>

      <div className="col-md-6 col-sm-12 ps-2 mt-3">
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Phone
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="07xxxxxxxx"
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="name@example.com"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="d-flex justify-content-center my-3">
          {customerFeedback.length > 0 && (
            <button
              className="btn btn-primary px-5"
              onClick={() => saveCustomerFeedback()}
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  allCategories: state.survey.allCategories,
  allQuestions: state.survey.allQuestions,
  allUsers: state.survey.allUsers,
});

export default connect(mapStateToProps, {
  getAllCategories,
  getAllQuestions,
  getAllUsers,
  saveFeedback,
})(Survey);
