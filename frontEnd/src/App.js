import "./App.css";
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./components/Chat";
import { useForm } from "react-hook-form";

const socket = io.connect("http://localhost:7000");
function App() {
  const [username, setusername] = useState("");
  const [room, setroom] = useState("");

  const [first, setfirst] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const { username, room } = data;
    setusername(username);
    localStorage.setItem("username", username);
    localStorage.setItem("room", room);
    setroom(room);

    console.log(room);
    if (username === "" && room === "") return alert("both room are required");

    socket.emit("join_room", room);
    setfirst(true);
  };

  return (
    <>
      {!first ? (
        <>
          <form
            onSubmit={handleSubmit(onSubmit)}
            class="max-w-sm mx-auto pt-10"
          >
            <div class="mb-5">
              <label
                for="email"
                class="block mb-2 text-sm font-medium text-gray-900 white:text-white"
              >
                User
              </label>
              <input
                type="text"
                id="email"
                class="bg-white-50 border border-white -300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 white:bg-gray-700 white:border-gray-600 white:placeholder-gray-400 white:text-white white:focus:ring-blue-500 white:focus:border-blue-500"
                placeholder="User"
                {...register("username", { required: true })}
              />
              {errors.username && (
                <span className="text-red-500">please fill username field</span>
              )}
            </div>
            <div class="mb-5">
              <label
                for="password"
                class="block mb-2 text-sm font-medium text-gray-900 white:text-white"
              >
                Room
              </label>
              <input
                type="text"
                id="password"
                placeholder="Room"
                {...register("room", { required: true })}
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 white:bg-gray-700 white:border-gray-600 white:placeholder-gray-400 white:text-white white:focus:ring-blue-500 white:focus:border-blue-500"
              />
              {errors.room && (
                <span className="text-red-500">
                  please fill this room field
                </span>
              )}
            </div>
            <button
              type="submit"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center white:bg-blue-600 white:hover:bg-blue-700 white:focus:ring-blue-800"
            >
              Join
            </button>
          </form>
        </>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </>
  );
}

export default App;
