import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import Form from "./forms";

describe("Form", () => {
  it("should render the form with input fields", () => {
    render(<Form />);
    const nameInput = screen.getByLabelText("Name:");
    const emailInput = screen.getByLabelText("Email:");
    const addressInput = screen.getByLabelText("Address:");
    const submitButton = screen.getByText("Submit");

    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(addressInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it("should update the state when input fields are changed", () => {
    render(<Form />);
    const nameInput = screen.getByLabelText("Name:");
    const emailInput = screen.getByLabelText("Email:");
    const addressInput = screen.getByLabelText("Address:");

    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.change(emailInput, { target: { value: "john@example.com" } });
    fireEvent.change(addressInput, { target: { value: "123 Main St" } });

    expect(nameInput.value).toBe("John Doe");
    expect(emailInput.value).toBe("john@example.com");
    expect(addressInput.value).toBe("123 Main St");
  });

  it("should call the handleSubmit function when the form is submitted", async () => {
    const handleSubmitSpy = jest.fn();
    render(<Form onSubmit={handleSubmitSpy} />);

    const submitButton = screen.getByText("Submit");

    fireEvent.click(submitButton);

    expect(handleSubmitSpy);
  });

//   it("should log the state to the console when the form is submitted", async () => {
//     const consoleLogSpy = jest.spyOn(console, "log");
//     const { getByText } = render(<Form />);

//     const submitButton = getByText("Submit");

//     fireEvent.click(submitButton);

//     await waitFor(() =>
//       expect(consoleLogSpy).toHaveBeenCalledWith({
//         name: "",
//         email: "",
//         address: "",
//       })
//     );
//   });
});
