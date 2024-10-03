import React, { ChangeEvent, useState } from "react";

interface FormProps {
  onSubmit: (data: QueryFormData) => void;
}

interface QueryFormData {
  query: string;
}

// NEW
// Define a new interface to capture the structured response
// interface QueryResponse {
//   image_index: number;
//   attribute: string;
//   value: string | number;
// }

// NEW: adjusting to dynamically handle different response structures
interface SingleAttributeResponse {
  image_index: number;
  attribute: string;
  value: string | number;
}

interface AggregateResponse {
  aggregate_response: string;
}

interface MultipleImageResponse {
  multiple_image_response: Array<{
    image_index: number;
    attribute: string;
    value: string | number;
  }>;
}

interface TagResponse {
  image_index: number;
  tags: Array<string>;
}

// generalizing type for structured responses
type QueryResponse =
  | SingleAttributeResponse
  | AggregateResponse
  | MultipleImageResponse
  | TagResponse;

function Form({ onSubmit }: FormProps) {
  const [queryFormData, setQueryFormData] = useState<QueryFormData>({
    query: "",
  });
  // NEW: state update, queryResponse to hold structured object instead of string
  const [queryResponse, setQueryResponse] = useState<QueryResponse | null>(
    null
  );

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setQueryFormData({ ...queryFormData, [name]: value });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const response = await fetch("/api/input", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(queryFormData),
      });

      // Parse the response data to match the expected structure
      const data = await response.json();
      console.log("Received response data:", data);
      // Assuming the response has "image_index", "attribute", and "value"
      setQueryResponse(data);

      // clear input field after submission:
      setQueryFormData({ query: "" });
    } catch (error) {
      console.log("Error sending data to backend:", error);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Query:
          <input
            type="text"
            name="query"
            value={queryFormData.query}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">Submit</button>
      </form>

      {/* NEW: Display the response in a structured format */}
      {queryResponse && (
        <div>
          <h3>Query Response:</h3>

          {/* Render Aggregate Response */}
          {"aggregate_response" in queryResponse && (
            <p>{queryResponse.aggregate_response}</p>
          )}

          {/* Render Single Attribute Response */}
          {"image_index" in queryResponse && "attribute" in queryResponse && (
            <div>
              <p>Image Index: {queryResponse.image_index}</p>
              <p>Attribute: {queryResponse.attribute}</p>
              <p>Value: {queryResponse.value}</p>
            </div>
          )}

          {/* Render Multiple Image Response */}
          {"multiple_image_response" in queryResponse && (
            <div>
              {queryResponse.multiple_image_response.map((item, index) => (
                <div key={index}>
                  <p>Image Index: {item.image_index}</p>
                  <p>Attribute: {item.attribute}</p>
                  <p>Value: {item.value}</p>
                </div>
              ))}
            </div>
          )}

          {/* Render Tag Response */}
          {"tags" in queryResponse && (
            <div>
              <p>Image Index: {queryResponse.image_index}</p>
              <p>Tags: {queryResponse.tags.join(", ")}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Form;
export type { QueryFormData, QueryResponse };
