import React from "react";

const BookForm = ({
  createBook,
  name,
  apc_num,
  isbn_num,
  handleInputChange,
  isEditing,
  updateBook,
  formData,
  closeModal,
}) => {
  return (
    <form
      className="book-form"
      onSubmit={isEditing ? updateBook : createBook}
    >
      <div>
        <label htmlFor="name">Book Name:</label>
        <input
          type="text"
          id="name"
          placeholder="Add a Book"
          name="name"
          value={isEditing ? formData.name : name}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="apc_num">APC Number:</label>
        <input
          type="text"
          id="apc_num"
          placeholder="Add APC Number"
          name="apc_num"
          value={isEditing ? formData.apc_num : apc_num}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="isbn_num">ISBN Number:</label>
        <input
          type="text"
          id="isbn_num"
          placeholder="Add ISBN Number"
          name="isbn_num"
          value={isEditing ? formData.isbn_num : isbn_num}
          onChange={handleInputChange}
        />
      </div>
      <button type="submit" className="add-book-button">
        {isEditing ? "Edit" : "Add"}
      </button>
      <button onClick={closeModal} className="close-book-button">
        Close
      </button>
    </form>
  );
};

export default BookForm;
