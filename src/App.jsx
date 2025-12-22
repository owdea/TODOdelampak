import './App.css'
import AuthButtons from "./components/authButtons.jsx";
import CategoryCreateForm from "./components/category/categoryCreateForm.jsx";
import CategoryList from "./components/category/categoryList.jsx";
import TodoCreateForm from "./components/todo/todoCategoryForm.jsx";
import TodoList from "./components/todo/todoList.jsx";

function App() {

    return (
    <div className={"h-screen flex justify-center items-center flex-col"}>
      <h1 className={""}>Working on it</h1>
      <h1 className={""}>Like really..</h1>
      <h1 className={"pb-2"}>See?</h1>
      <span></span>
      <AuthButtons/>
        <CategoryCreateForm/>
        <CategoryList />
        <TodoCreateForm/>
        <TodoList/>
    </div>
  )
}

export default App
