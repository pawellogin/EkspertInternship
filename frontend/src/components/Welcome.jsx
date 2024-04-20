import { DemoService } from "../services/DemoService"
import { useState, useEffect } from "react";

const Welcome = () => {
    const [stringValue, setStringValue] = useState("");
  
    useEffect(() => {
      async function fetchData() {
        try {
          const data = await DemoService(); // Assuming getStringValue returns a Promise
          setStringValue(data); // Assuming getStringValue returns the string value
        } catch (error) {
          console.error("Error fetching string value:", error);
        }
      }
  
      fetchData();
    }, []);
  
    return (
      <div>
        <p>{stringValue}</p>
      </div>
    );
  };

export default Welcome