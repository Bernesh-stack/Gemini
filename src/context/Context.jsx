import { createContext, useState } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
    const [input, setInput] = useState("");            // State for input
    const [recentPrompt, setRecentPrompt] = useState("");  // State for the most recent prompt
    const [prevPrompt, setPrevPrompt] = useState([]);      // State for storing previous prompts
    const [showResult, setShowResult] = useState(false);   // State for showing the result
    const [loading, setLoading] = useState(false);         // State for loading indicator
    const [resultData, setResultData] = useState("");      // State for storing the result data

    // Function to simulate a delay between each character
    const delaypara = (index, nextWord) => {
        setTimeout(function () {
            setResultData((prev) => prev + nextWord);  // Append the character with delay
        }, 95 * index);  // Delay time is based on the index
    };

    const onSent = async (prompt) => {
        try {
            if (!prompt || prompt.trim() === "") {
                console.error("Prompt is empty!");
                setResultData("Please provide a valid prompt.");
                return;
            }

            // Reset previous result and show the loading state
            setResultData("");
            setLoading(true);
            setShowResult(true);

            // Add the new input to the prevPrompt list
            setPrevPrompt((prev) => [...prev, input]);
            setRecentPrompt(prompt);

            // Get the response from the run function
            let response = await run(prompt);

            // Check if the response is a function and invoke it
            if (typeof response === "function") {
                response = response();  // Call the function to get the actual response
            }

            // Check if the response is a string
            if (typeof response === "string") {
                // Replace all occurrences of '*' with <br /> tag
                response = response.replace(/\*/g, '<br />');  // Replace '*' with <br />

                // Split the response by "**" and apply formatting
                let responseArray = response.split("**");
                let newResponse = "";

                // Iterate through the responseArray and format the response
                for (let i = 0; i < responseArray.length; i++) {
                    if (i === 0 || i % 2 !== 1) {
                        newResponse += responseArray[i];
                    } else {
                        newResponse += "<b>" + responseArray[i] + "</b>";
                    }
                }

                // Replace * with <br /> tag as well
                newResponse = newResponse.replace(/\*/g, '<br />');  // Replace '*' with <br />

                // Convert the formatted string into an array of characters for the delay
                let newResponseArray = newResponse.split("");

                // Loop through the array and add each character with a delay
                for (let i = 0; i < newResponseArray.length; i++) {
                    const nextWord = newResponseArray[i];
                    delaypara(i, nextWord);  // Call delaypara for each character
                }
            } else if (response && response.candidates && response.candidates.length > 0) {
                // Handle the case where response is an object with candidates
                const candidateText = response.candidates
                    .map((candidate) => candidate.text) // Assuming the candidates have a 'text' field
                    .join("\n");

                // Optionally, you can also handle multiple candidates separately
                setResultData(`<b>Multiple candidates found:</b><br/>${candidateText}`);
            } else {
                // Handle the case where the response is neither a string nor a valid object with candidates
                console.error("Unexpected response format:", response);
                setResultData("An error occurred while processing the response.");
            }

            // Reset loading state and clear input
            setLoading(false);
            setInput("");
        } catch (error) {
            // Catch any errors and log them
            console.error("Error while sending prompt:", error);
            setLoading(false);
            setResultData("An error occurred during the request.");
        }
    };

    const contextValue = {
        prevPrompt,              // The array of previous prompts
        setPrevPrompt,           // Function to update the previous prompts
        onSent,                   // The function that handles sending the prompt
        recentPrompt,            // The most recent prompt
        showResult,              // Boolean flag to show the result
        loading,                 // Boolean flag for loading state
        resultData,              // The result data that will be displayed
        setRecentPrompt,         // Function to update the most recent prompt
        input,                   // The input state
        setInput,                // Function to update the input state
    };

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;
