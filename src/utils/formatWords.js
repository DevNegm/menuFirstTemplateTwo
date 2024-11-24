

export const emailIsInvalid = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (email !== null && email.trim().match(emailRegex) === null) {
      return true;
    } else {
      return false;
    }
  };

  import { useState, useEffect, useCallback } from 'react';

  export const useWindowWidth = () => {
      const [width, setWidth] = useState(window.innerWidth); // Initialize state with current window width
  
      useEffect(() => {
          const handleResize = () => {
              setWidth(window.innerWidth); // Update the width when window resizes
          };
  
          window.addEventListener('resize', handleResize); // Add resize event listener
  
          return () => {
              window.removeEventListener('resize', handleResize); // Clean up the event listener
          };
      }, []);
  
      return width;
  }



  export const OutsideClick = (ref,buttonRef,func) => {

    const handleClickOutside = useCallback((event) => {
        if(ref.current) {
            if (!ref.current.contains(event.target) && !buttonRef.current.contains(event.target)) {
                func()
            }
        }
    }, []);

    // Adding and removing the outside click listener
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [handleClickOutside]);
}


  export function formatNumber(str) {
    // Remove all non-numeric characters except the decimal point
    let normalizedString = str.replace(/[^\d.]/g, '');

    // Convert the string to a number
    let number = parseFloat(normalizedString);

    // Check if the number is NaN (not a number)
    if (isNaN(number)) {
        return 'Invalid number';
    }

    // Define the threshold for "k" representation
    let thousand = 1000;

    // Format the number with 'k' if it's 1000 or more
    if (number >= thousand) {
        // Use Math.round to round the number to the nearest whole before applying toFixed for decimal precision
        return `${Math.round(number / 10) / 100}k`;  // This changes the calculation method for rounding
    } else {
        // Just return the number if less than 1000
        return number.toString();
    }
}




export function compressImageToBase64(file, maxSizeInBytes) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = function (event) {
            const img = new Image();
            img.onload = function () {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                // Calculate the desired width and height based on the maximum file size
                let width = img.width;
                let height = img.height;
                const aspectRatio = width / height;
                const maxPixels = maxSizeInBytes * 0.9; // Account for Base64 overhead
                const targetPixels = Math.min(maxPixels, width * height);
                const targetWidth = Math.sqrt(targetPixels * aspectRatio);
                const targetHeight = targetWidth / aspectRatio;

                // Set the canvas dimensions
                canvas.width = targetWidth;
                canvas.height = targetHeight;

                // Draw the image on the canvas with the desired dimensions
                ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

                // Convert the canvas image to Base64 format
                const compressedBase64 = canvas.toDataURL(file.type, 0.8); // Adjust the quality as needed

                // Check if the compressed image is within the desired file size limit
                const compressedFileSize = Math.floor(compressedBase64.length * 0.75); // Account for Base64 overhead
                if (compressedFileSize > maxSizeInBytes) {
                    reject(new Error('Unable to compress the image within the desired file size limit.'));
                } else {
                    resolve(compressedBase64);
                }
            };
            img.src = event.target.result;
        };
        reader.onerror = function (event) {
            reject(new Error('Error reading the file.'));
        };
        reader.readAsDataURL(file);
    });
}

export const base64ToBlob = (base64, mimeType) => {
    const byteCharacters = atob(base64.split(',')[1]);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], {type: mimeType});
};

export const convertToTitleCase = (input) => {
    if(input) {
        return input
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    }
  }

  export const uppercaseFirstLetter = (input) => {
    const formatedInput = input?.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
    return formatedInput;
  }

  export const formatDate = (inputDate) => {
    if (!inputDate) return "";
    const date = new Date(inputDate);
    const yyyy = date.getFullYear();
    let mm = date.getMonth() + 1;
    let dd = date.getDate();
  
    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;
  
    const formattedDate = dd + "/" + mm + "/" + yyyy;
    return formattedDate;
  };