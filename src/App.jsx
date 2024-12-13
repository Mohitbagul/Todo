import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from "uuid";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin7Fill } from "react-icons/ri";

function App() {
  const [todo, settodo] = useState("");
  const [todos, settodos] = useState([]);
  const [showFinished, setshowFinished] = useState(true);
  const [chagesDone,setchangesDone] = useState(false);

  useEffect(()=>{
    let todoString = localStorage.getItem("todos");
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos"));
      settodos(todos);
    }
  },[])

  const saveToLS = (params) => {
    localStorage.setItem("todos",JSON.stringify(todos))
  }

    useEffect(() => {
      if (todos.length > 0 || chagesDone) {
        localStorage.setItem("todos", JSON.stringify(todos));
      }
    }, [todos]);
  

    const handleToggle = ()=>{
      setshowFinished(!showFinished)
    }

  const handleEdit = (e, id) => {
    let t = todos.filter(i=>i.id===id)
    settodo(t[0].todo);

    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    settodos(newTodos); 
    saveToLS();
  };

  const handleDelete = (e,id) => {
     let newTodos = todos.filter(item=>{
      return item.id!==id;
     });
     settodos(newTodos); 
     setchangesDone(true);
     saveToLS(); 
  };

  const handleAdd = () => {
    settodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    
    settodo("");
    saveToLS();
  };

  const handleChange = (e) => {
    settodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;
    console.log(id);
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    settodos(newTodos);
    saveToLS();
  };

  return (
    <>
      <Navbar />
      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] md:w-1/2">
        <h1 className="font-bold text-center text-3xl">
          TodoList - Manage your todos at one place
        </h1>
        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className="text-2xl font-bold">Add a Todo</h2>
          <div className="flex">
            <input
              onChange={handleChange}
              value={todo}
              type="text"
              className="w-full rounded-full px-5 py-1 mx-3"
            />
            <button
              disabled={todo.length <= 3}
              onClick={handleAdd}
              className="bg-violet-800 disabled:bg-violet-700 hover:bg-violet-950 p-2 text-sm font-bold py-1 text-white rounded-full"
            >
              Save
            </button>
          </div>
        </div>
        <input
          onChange={handleToggle}
          id="show"
          type="checkbox"
          checked={showFinished}
          className="mx-4"
        />
        <label htmlFor="show" className="mx-2">Show finished</label>
        <div className="h-[1px] bg-black opacity-15 w-[90%] my-2 mx-auto"></div>
        <h2 className="text-lg font-bold">Your todos</h2>
        <div className="todos">
          {todos.length === 0 && <div>No todos to display</div>}
          {todos.map((item) => {
            return (
              (showFinished || !item.isCompleted) && (
                <div key={item.id} className="todo flex  justify-between my-3">
                  <div className="flex gap-5">
                    <input
                      name={item.id}
                      onChange={handleCheckbox}
                      type="checkbox"
                      checked={item.isCompleted}
                    />
                    <div className={item.isCompleted ? "line-through" : ""}>
                      {item.todo}
                    </div>
                  </div>
                  <div className="buttons flex h-full">
                    <button
                      onClick={(e) => {
                        handleEdit(e, item.id);
                      }}
                      className="bg-violet-800 hover:bg-violet-950 p-2 text-sm font-bold py-1 text-white rounded-md mx-1"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={(e) => {
                        handleDelete(e, item.id);
                      }}
                      className="bg-violet-800 hover:bg-violet-950 p-2 text-sm font-bold py-1 text-white rounded-md mx-1"
                    >
                      <RiDeleteBin7Fill />
                    </button>
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
