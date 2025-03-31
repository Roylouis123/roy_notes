import { useState } from "react";

const Form = () => {
  const [state, setState] = useState({
    name: "",
    email: "",
    address: "",
  });

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({
      name: state.name,
      email: state.email,
      address: state.address,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" name="name" value={state.name} onChange={handleChange} />
      </label>
      <label>
        Email:
        <input type="email" name="email" value={state.email} onChange={handleChange} />
      </label>
      <label>
        Address:
        <textarea name="address" value={state.address} onChange={handleChange} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
