import { useEffect, useState } from "react";
import supabase from "./utils/supabase.js";
import './App.css'

import CategoryCreateForm from "./components/category/categoryCreateForm.jsx";
import CategoryList from "./components/category/categoryList.jsx";
import TodoCreateForm from "./components/todo/todoCategoryForm.jsx";
import TodoList from "./components/todo/todoList.jsx";

export default function App() {
    const [categories, setCategories] = useState([]);
    const [todos, setTodos] = useState([]);

    const loadCategories = async () => {
        const { data } = await supabase
            .from("categories")
            .select("*")
            .order("created_at");

        setCategories(data || []);
    };

    const loadTodos = async () => {
        const { data } = await supabase
            .from("todos")
            .select(`
        id,
        title,
        description,
        due_at,
        completed,
        todo_categories (
          categories (id, name, color)
        ),
        todo_assignees (
          users (id, email, raw_user_meta_data)
        )
      `)
            .order("created_at", { ascending: false });

        setTodos(data || []);
    };

    useEffect(() => {
        loadCategories();
        loadTodos();
    }, []);

    return (
        <div className="max-w-3xl mx-auto p-6 text-white">
            <h1 className="text-2xl font-bold mb-6">TODO</h1>

            {/* KATEGORIE */}
            <section className="mb-10">
                <CategoryCreateForm onCreated={loadCategories} />
                <CategoryList categories={categories} />
            </section>

            {/* TODO */}
            <section>
                <TodoCreateForm categories={categories}
                                onCreated={loadTodos} />
                <TodoList todos={todos} />
            </section>
        </div>
    );
}
