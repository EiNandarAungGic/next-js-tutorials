"use client";
import React, { useReducer } from "react";

// action => {payload:'', type:''}
// type(event name) => increment, decrement -> pre defined

const reducer = (prevState, action) => {
  switch (action.type) {
    case "increment":
      return {
        ...prevState,
        count: prevState.count + 1,
      };

    case "decrement":
      return {
        ...prevState,
        count: prevState.count - 1,
      };

    default:
      throw new Error("Action did not exist");
  }
};

const Reducer = () => {
  function onIncreaseCount() {
    dispatch({
      type: "increment",
    });
  }

  function onDecreaseCount() {
    dispatch({
      type: "decrement",
    });
  }

  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <div>
      <div className="ml-14 my-3">Count - {state.count}</div>
      <button className="bg-teal-700 p-2 mx-2" onClick={onIncreaseCount}>
        Increase
      </button>
      <button className="bg-yellow-700 p-2" onClick={onDecreaseCount}>
        Decrease
      </button>
    </div>
  );
};

export default Reducer;
