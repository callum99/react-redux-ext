import { Heading } from "../../components/heading/heading";
import { IncreaseButton } from "../../components/buttons/increaseButton/increaseButton";
import { DecreaseButton } from "../../components/buttons/decreaseButton/decreaseButton";
import React from "react";

const Counter = ({}) => {
  return (
    <div className={"flex flex-col justify-between bg-white w-[800px] h-[100%]"}>
      <div className={"flex flex-row justify-between p-[10px] bg-primary-400 border-b-6 border-primary-500"}>
        <Heading className={"font-sans text-primary-950 text-2xl font-medium"} headingText="Redux Counter"/>
        <div className={"flex flex-col "}>
          <IncreaseButton btnText="Increase"/>
          <DecreaseButton btnText="Decrease"/>
        </div>
      </div>
    </div>
  );
};

export default Counter;
