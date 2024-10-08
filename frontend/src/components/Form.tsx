import React, { ChangeEvent, useState } from "react";

interface FormProps {
  onSubmit: (data: QueryFormData) => void;
}

interface QueryFormData {
  query: string;
}

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

interface RawResponse {
  raw_openai_response: string;
}

// generalizing type for structured responses
type QueryResponse =
  | SingleAttributeResponse
  | AggregateResponse
  | MultipleImageResponse
  | TagResponse
  | RawResponse;

function Form({ onSubmit }: FormProps) {
  const [queryFormData, setQueryFormData] = useState<QueryFormData>({
    query: "",
  });
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
      // console.log("Received response data:", data);
      setQueryResponse(data);

      // clear input field after submission:
      setQueryFormData({ query: "" });
    } catch (error) {
      console.log("Error sending data to backend:", error);
    }
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col px-8 py-4 mt-4 border-2 rounded-md">
        <label className="my-4 text-xl">
          Query:
          <input
            type="text"
            name="query"
            value={queryFormData.query}
            onChange={handleInputChange}
            className="py-2 ml-4 border-2 rounded-md"
          />
        </label>
        <button
          type="submit"
          className="bg-[#3f48e9] px-4 py-2 text-lg text-white">
          Submit
        </button>
      </form>
      {queryResponse && (
        <div className="p-6 mt-10 border-2">
          <h3 className="mb-4 text-2xl">Query Response:</h3>
          <div className="text-xl">
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
            {/* Render Raw Response */}
            {"raw_openai_response" in queryResponse && (
              <div>
                <p className="text-xl">{queryResponse.raw_openai_response}</p>
                <p>
                  NOTICE: The backend is not yet fully structured for this type
                  of query, so the response is being returned in its raw format.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Form;
export type { QueryFormData, QueryResponse };
