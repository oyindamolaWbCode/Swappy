import { useState } from "react";
import backImg from "./assets/michal-kmet-M9O6GRrEEDY-unsplash.jpg";
import "./App.css";
import html2canvas from "html2canvas";
import downloadjs from "downloadjs";

const images = [
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGFuZHNjYXBlfGVufDB8fDB8fHww",
  "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGxhbmRzY2FwZXxlbnwwfHwwfHx8MA%3D%3D",
  "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1498429089284-41f8cf3ffd39?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGxhbmRzY2FwZXxlbnwwfHwwfHx8MA%3D%3D",
  "https://images.unsplash.com/photo-1465056836041-7f43ac27dcb5?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGxhbmRzY2FwZXxlbnwwfHwwfHx8MA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1669843356282-ce49a3156413?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGxhbmRzY2FwZXxlbnwwfHwwfHx8MA%3D%3D",

  "https://images.unsplash.com/photo-1465189684280-6a8fa9b19a7a?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGxhbmRzY2FwZXxlbnwwfHwwfHx8MA%3D%3D",
  "https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bGFuZHNjYXBlfGVufDB8fDB8fHww",
  "https://plus.unsplash.com/premium_photo-1676496046182-356a6a0ed002?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bGFuZHNjYXBlfGVufDB8fDB8fHww",
];

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(backImg); // Set the default image
  const [textareaText, setTextareaText] = useState("");
  const [fontSize, setFontSize] = useState(16);
  const [fontFamily, setFontFamily] = useState("sans-serif");
  const visibleCount = 5;

  // const [paragraphText, setParagraphText] = useState(
  //   "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum ad velit sapiente deserunt omnis repellendus illo possimus reiciendis voluptates ipsum praesentium, ducimus facere soluta eveniet perspiciatis dolorum provident repudiandae beatae. Hic et aliquid at dolor ut laborum! Odit accusantium pariatur nulla reprehenderit similique expedita laboriosam laborum hic animi deleniti? Ab illo reprehenderit sequi laborum accusamus officia in incidunt officiis! Consequuntur?"
  // );
  // const [textareaText, setTextareaText] = useState("");

  // const handleSubmit = () => {
  //   const wordCount = textareaText.trim().split(/\s+/).length; // Count words
  // if (wordCount > 100) {
  //   alert("The text exceeds 100 words. Please shorten it.");
  //   return;
  // }
  // setParagraphText(textareaText); // Replace paragraph content
  //   setTextareaText("");
  // };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + visibleCount >= images.length ? 0 : prevIndex + visibleCount
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - visibleCount < 0
        ? images.length - visibleCount
        : prevIndex - visibleCount
    );
  };

  const getVisibleImages = () => {
    if (currentIndex + visibleCount <= images.length) {
      return images.slice(currentIndex, currentIndex + visibleCount);
    } else {
      return [
        ...images.slice(currentIndex, images.length),
        ...images.slice(0, (currentIndex + visibleCount) % images.length),
      ];
    }
  };

  const handleCaptureClick = async () => {
    const swapElement = document.querySelector(".swap-content");
    if (!swapElement) {
      console.error("Element not found.");
      return;
    }

    try {
      const canvas = await html2canvas(swapElement, { useCORS: true });
      const dataURL = canvas.toDataURL("image/png");
      downloadjs(dataURL, "download.png", "image/png");
    } catch (error) {
      console.error("Capture failed:", error);
    }
  };

  const handleFontSizeChange = (event) => {
    setFontSize(Number(event.target.value));
  };

  const handleFontFamilyChange = (event) => {
    setFontFamily(event.target.value);
  };

  return (
    <>
      <div className="lg:w-[50%] mx-auto w-[100%] border-2 border-gray-300 mt-5 rounded-lg overflow-hidden ">
        <div className="relative w-full mb-3 swap-content">
          <img
            src={selectedImage} // Display the selected image
            alt="Selected background"
            className="max-h-[350px] w-full object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-50"></div>

          {/* Text overlay */}
          <div className="absolute inset-0 flex items-center justify-center p-4 w-[80%] mx-auto">
            <p
              className="text-white text-center text-sm bg-black bg-opacity-60 rounded-lg p-4"
              style={{
                fontSize: `${fontSize}px`,
                fontFamily: fontFamily,
              }}
            >
              {textareaText.trim().length > 0
                ? textareaText
                : "Start typing to see your text here..."}
              {/* {paragraphText} */}
            </p>
          </div>
        </div>

        {/* Textarea */}
        <div className="my-5">
          <textarea
            placeholder="Write your content here..."
            name="postContent"
            rows={4}
            cols={40}
            value={textareaText}
            onChange={(e) => {
              const words = e.target.value.split(/\s+/).filter((word) => word);
              if (words.length <= 100) {
                setTextareaText(e.target.value);
              } else {
                alert("Word limit reached (100 words).");
              }
            }}
            className="p-4 w-[90%] mx-auto block border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
          <div className="flex justify-end pr-12">
            <button
              onClick={() => setTextareaText("")}
              className="py-2 px-6 bg-slate-400 text-black rounded-md my-3"
            >
              Clear
            </button>
          </div>
          {/* <textarea
          placeholder="Write your content here..."
          name="postContent"
          rows={4}
          cols={40}
          value={textareaText}
          onChange={(e) => setTextareaText(e.target.value)}
          className="p-4 w-[90%] mx-auto block border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        />
        <div className="flex justify-end pr-12">
          <button
            onClick={handleSubmit}
            className="py-2 px-6 bg-slate-400 text-black rounded-md my-3"
          >
            Submit
          </button>
        </div> */}
        </div>

        {/* Font Size Control */}
        <div className="my-5 px-4 w-[200px]">
          <button
            className="py-2 px-6 bg-slate-400 text-black rounded-md mb-3"
            onClick={() => document.getElementById("fontSizeRange").click()}
          >
            Adjust Font Size
          </button>
          <input
            id="fontSizeRange"
            type="range"
            min="10"
            max="50"
            value={fontSize}
            onChange={handleFontSizeChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="text-sm text-center mt-2">
            Font Size: {fontSize}px
          </div>
        </div>

        {/* Font Family Dropdown */}
        <div className="my-5 px-4 w-[200px]">
          <label htmlFor="fontFamily" className="block mb-2 font-medium">
            Select Font Family:
          </label>
          <select
            id="fontFamily"
            value={fontFamily}
            onChange={handleFontFamilyChange}
            className="w-full p-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          >
            <option value="sans-serif">Sans Serif</option>
            <option value="Roboto">Roboto</option>
            <option value="Poppins">Poppins</option>
            <option value="Montserrat">Montserrat</option>
          </select>
        </div>

        {/* Carousel */}

        <div className="carousel w-full max-w-4xl mx-auto mt-10">
          <p className="mb-3">
            Click on preferred image to change the background image
          </p>
          <div className="carousel-wrapper relative overflow-hidden border border-gray-300 rounded-lg">
            {/* Images */}
            <div className="flex transition-transform duration-300">
              {getVisibleImages().map((image, index) => (
                <div
                  key={index}
                  className="w-1/5 flex-shrink-0 p-2 box-border cursor-pointer"
                  onClick={() => setSelectedImage(image)} // Update the selected image
                >
                  <img
                    src={image}
                    crossOrigin="anonymous"
                    alt={`Slide ${index}`}
                    className="w-full h-[100px] rounded-lg object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
          {/* Navigation Buttons */}
          <div className="flex flex-row justify-between mt-4">
            <button
              onClick={prevSlide}
              className="px-4 py-2 text-black underline "
            >
              Previous
            </button>

            <button
              onClick={nextSlide}
              className="px-4 py-2 text-black underline"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      <div className="w-[50%] mx-auto mt-10">
        <button
          className="w-[100%] h-14 bg-slate-400 text-lg font-bold text-black rounded-lg"
          onClick={handleCaptureClick}
        >
          Download
        </button>
      </div>
    </>
  );
}

export default App;
