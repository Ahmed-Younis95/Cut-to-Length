document.addEventListener("DOMContentLoaded", () => {
  const widthInput = document.getElementById("width");
  const heightInput = document.getElementById("height");
  const lengthInput = document.getElementById("length");
  const sizeSelect = document.getElementById("size-select");
  const calculateButton = document.getElementById("calculate-button");
  const resultDiv = document.getElementById("result");

  calculateButton.addEventListener("click", () => {
      const width = parseFloat(widthInput.value.trim());
      const height = parseFloat(heightInput.value.trim());
      let length = parseFloat(lengthInput.value.trim());
      const size = parseFloat(sizeSelect.value);

      if (validateInputs(width, height, length, size)) {
          const result = calculateRequiredLength(width, height, length, size);
          resultDiv.textContent = `Required Length: ${result.length.toFixed(2)} m, Number of Bars: ${result.numberOfBars}`;
      } else {
          resultDiv.textContent = "Please enter valid positive numbers for all fields.";
      }
  });

  function validateInputs(width, height, length, size) {
      return !isNaN(width) && !isNaN(height) && !isNaN(length) && !isNaN(size) &&
          width > 0 && height > 0 && length > 0 && size > 0;
  }

//   function calculateRequiredLength(width, height, length, size) {
//       const barArea = (Math.PI / 4) * Math.pow(size / 1000, 2);
//       let volume, finalProductLength, numberOfBars;
//       let i = 0;

//       while (true) {
//           volume = (width / 1000) * (height / 1000) * length;
//           finalProductLength = volume / barArea;
//           numberOfBars = finalProductLength / 12;
//           i +=1;
//           console.log('in loop:' + i  + ', number of bars: ' + numberOfBars);
//           console.log('in loop:' + i  + ', if: ' + (numberOfBars % 1));
//           if (numberOfBars % 1 <= 0.5) {
//               if (numberOfBars % 1 <= 0.02) {
//                   break;
//               }
//               length -= 0.01;
//           } else {
//               length += 0.01;
//           }
//       }

//       return { length, numberOfBars: Math.round(numberOfBars) };
//   }
function calculateRequiredLength(width, height, length, size) {
    const barArea = (Math.PI / 4) * Math.pow(size / 1000, 2);
    let volume, finalProductLength, numberOfBars;
    let previousLength = length;
    let i = 0;

    while (true) {
        volume = (width / 1000) * (height / 1000) * length;
        finalProductLength = volume / barArea;
        numberOfBars = finalProductLength / 12;

        console.log('in loop:' + i  + ', number of bars: ' + numberOfBars);
        console.log('in loop:' + i  + ', if: ' + (numberOfBars % 1));
        
        // Break if the number of bars is close enough to an integer
        if (Math.abs(numberOfBars % 1) < 0.020) {
            break;
        }

        // Adjust length slightly and check if the change is very small
        if (numberOfBars % 1 <= 0.50) {
            length -= 0.005;
        } else {
            length += 0.005;
        }

        // Check if the adjustment is too small to prevent infinite loop
        if (Math.abs(previousLength - length) < 0.0001) {
            console.warn("Adjustment too small, breaking loop to avoid infinite loop.");
            break;
        }

        previousLength = length;
        i++;
        
        // Optional: limit the number of iterations to prevent infinite loops
        if (i > 1000) {
            console.error("Exceeded maximum iterations, breaking loop.");
            break;
        }
    }

    return { length, numberOfBars: Math.round(numberOfBars) };
}

});
