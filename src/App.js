import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BookList from "./components/BookList";

export const URL = process.env.REACT_APP_SERVER_URL

function App() {
  return (
    <div className="app">
      <div className="book-container">
        <BookList />
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
