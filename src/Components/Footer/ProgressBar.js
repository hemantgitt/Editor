import React, { useEffect, useState } from "react";
import { memo } from "react";
import "./ProgressBar.css";


const ProgressBar = ({ 
  visualParts = [
    {
      percentage: "0%",
     
    }
  ],sidebar2, sidebar1, sidebar3, sidebar4, sidebar5
} ) => {
  // Starting values needed for the animation
  // Mapped by "visualParts" so it can work with multiple values dynamically
  // It's an array of percentage widths
  const [widths, setWidths] = useState(
    visualParts.map(() => {
      return 0;
    })
  );

  useEffect(() => {
    // You need to wrap it to trigger the animation
    requestAnimationFrame(() => {
      // Set a new array of percentage widths based on the props
      setWidths(
        visualParts.map(item => {
          return item.percentage;
        })
      );
    });
   
  }, [visualParts]);

  return (
    <>
      <div
        className={sidebar2 || sidebar1 || sidebar3 || sidebar4 || sidebar5 ?
             "progressVisualFull-clicked": "progressVisualFull"} 
        // to change the background color dynamically
      >
        {visualParts.map((item, index) => {
          // map each part into separate div and each will be animated
          // because of the "transition: width 2s;" css in class "progressVisualPart"
          // and because of the new width ("widths[index]", previous one was 0)
          return (
            <div
              // There won't be additional changes in the array so the index can be used
              key={index}
              style={{
                width: widths[index],
                // setting the actual color of bar part
                backgroundColor: item.color
              }}
              className="progressVisualPart"
            />
          );
        })}
      </div>
    </>
  );
};

export default memo(ProgressBar);
