import { useEffect, useState } from "react";
import { CanceledError } from "./services/api-client";
import userService, { User } from "./services/user-service";

const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");
  const [isloading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const { request, cancel } = userService.getAll<User>();
    request
      .then((res) => {
        setUsers(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setIsLoading(false);
      });

    return () => cancel();
  }, []);
  const deleteUser = (user: User) => {
    const originalUser = [...users];
    // Update the ui state
    setUsers(users.filter((u) => u.id !== user.id));
    // Call the server
    userService.delete(user.id).catch((err) => {
      setError(err.message);
      setUsers(originalUser);
    });
  };
  const addUser = () => {
    const originalUser = [...users];
    const newUser = { id: 1, name: "tenzin" };
    setUsers([newUser, ...users]);
    userService
      .create(newUser)
      .then(({ data: savedUser }) => setUsers([savedUser, ...users]))
      .catch((err) => {
        setError(err.message);
        setUsers(originalUser);
      });
  };

  const updateUser = (user: User) => {
    const originalUser = [...users];
    // update the ui
    const updatedUser = { ...user, name: user.name + "!" };
    setUsers(users.map((u) => (u.id === user.id ? updatedUser : u)));
    // call the server
    userService.update(updatedUser).catch((err) => {
      setError(err.message);
      setUsers(originalUser);
    });
  };

  return (
    <>
      {error && <p className="text-danger">{error} </p>}
      {isloading && <p className="text-danger">LOADING ...</p>}
      <button onClick={addUser} className="btn btn-primary mt-2 mb-2 ">
        Add
      </button>
      <ul className="list-group">
        {users.map((u) => (
          <li
            key={u.id}
            className="list-group-item d-flex justify-content-between align-items-center "
          >
            {u.name}
            <button
              onClick={() => updateUser(u)}
              className="btn btn-outline-secondary"
            >
              Update
            </button>
            <button onClick={() => deleteUser(u)} className="btn btn-danger">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default App;
