import Image from "next/image";
import React from "react";

const PlanDetail = ({ heading, text, imageUrl }) => {
  return (
    <div>
      <h1>{heading}</h1>
      <p>{text}</p>
      <Image src={imageUrl} width={2000} height={2000} alt={heading} />
    </div>
  );
};

export default PlanDetail;
