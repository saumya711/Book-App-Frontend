import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { default as axios } from "axios";
import { URL } from "./../App";
import loadingImg from "../assets/loader.gif";
import BookForm from "./BookForm";
import Modal from "react-modal";

import { FaEdit, FaRegTrashAlt } from "react-icons/fa";

const BookList = () => {
    const [book, setBook] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        apc_num: "",
        isbn_num: "",
    });

    const [isEditing, setIsEditing] = useState(false);
    const [bookID, setBookID] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filterType, setFilterType] = useState("");
    const [keyword, setKeyword] = useState("");

    const { name, apc_num, isbn_num } = formData;
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const getBooks = async () => {
        setIsLoading(true);
        try {
            const { data } = await axios.get(`${URL}/api/books/get-book`);
            console.log(data);
            setBook(data);
            setIsLoading(false);
        } catch (error) {
            toast.error(error.message);
            console.log(error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getBooks();
    }, []);

    const createBook = async (e) => {
        e.preventDefault();
        console.log("xczsfdsd", formData);
        if (formData.name === "" || formData.apc_num === "" || formData.isbn_num === "") {
            return toast.error("Input field cannot be empty");
        }

        try {
            await axios.post(`${URL}/api/books/post-book`, formData);
            toast.success("Book added successfully");
            setFormData({ name: "", apc_num: "", isbn_num: "" });
            closeModal();
            getBooks();
        } catch (error) {
            toast.error(error.message);
            console.log(error);
        }
    };

    const getSingleBook = async (book) => {
        setIsEditing(true);
        console.log("isediting", isEditing);
        console.log("ABC", book);
        setFormData({
            name: book.name,
            apc_num: book.apc_num,
            isbn_num: book.isbn_num,
        });
        setBookID(book._id);
    };

    const updateBook = async (e) => {
        e.preventDefault();
        if (formData.name === "" || formData.apc_num === "" || formData.isbn_num === "") {
            return toast.error("Input field cannot be empty.");
        }
        try {
            await axios.put(
            `${URL}/api/books/update-book/${bookID}`,
            formData
            );

            console.log(bookID);
            setFormData({ name: "", apc_num: "", isbn_num: "" });
            setIsEditing(false);
            closeModal();
            getBooks();
            toast.success("Book Updated Successfully");
        } catch (error) {
            toast.error(error.message);
        }
    };

    const deleteBook = async (id) => {
        try {
            await axios.delete(`${URL}/api/books/delete-book/${id}`);
            toast.success(" Book deleted Succesfully");
            getBooks();
        } catch (error) {
            toast.error(error.message);
        }
    };

    const searched = (book) => {
        if (filterType === "apc_num") {
            return book.apc_num.includes(keyword);
        } else if (filterType === "isbn_num") {
            return book.isbn_num.includes(keyword);
        }
        return true; // If no filter criteria is selected, include all books
    };

    return (
        <div>
            <h2>Book List</h2>
            <hr />
            <button className="add-button" onClick={openModal}>
                Add Book
            </button>

            <hr />
            {/* Filter options */}
            <div className="filter-container">
                <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                >
                    <option >Select Num Type</option>
                    <option value="apc_num">APC Number</option>
                    <option value="isbn_num">ISBN Number</option>
                </select>
                <input
                    type="text"
                    placeholder="Enter APC/ISBN Number"
                    value={keyword}// Add this to your state
                    onChange={(e) => setKeyword(e.target.value)}
                />
            </div>
            <Modal 
            className="modal --flex-center"
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            contentLabel="Add Book Modal"
            >
            <BookForm
                createBook={createBook}
                handleInputChange={handleInputChange}
                updateBook={updateBook}
                getSingleBook={getSingleBook}
                isEditing={isEditing}
                formData={formData}
                closeModal={closeModal}
            />
            {/* <button onClick={closeModal}>Close Modal</button> */}
            {/* <button type="submit">{isEditing ? "Edit" : "Add"}</button> */}
            </Modal>

            {isLoading && (
            <div className="--flex-center">
                <img src={loadingImg} alt="loading" />
            </div>
            )}
            {!isLoading && book.length === 0 ? (
                <p className="--py">No Book added. Please add a Book</p>
            ) : (
            <>
                <table>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Book</th>
                    <th>APC Number</th>
                    <th>ISBN Number</th>
                    <th className="last-header">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {book.filter(searched).map((book, index) => (
                    <tr key={book._id} className={"book"}>
                        <td>{index + 1}</td>
                        <td>{book.name}</td>
                        <td>{book.apc_num}</td>
                        <td>{book.isbn_num}</td>
                        <td>
                        <div className="book-icons">
                            <FaEdit
                            color="purple"
                            onClick={() => {
                                getSingleBook(book);
                                openModal();
                            }}
                            />
                            <FaRegTrashAlt
                            color="red"
                            onClick={() => deleteBook(book._id)}
                            />
                        </div>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </>
            )}
        </div>
    );
};

export default BookList;
