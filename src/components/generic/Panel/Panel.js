import React from "react";



const Panel =  ({ className, ...props })  => {
  return <div className={'default-panel ' + className}>{props.children}</div>;
};

export default Panel;
