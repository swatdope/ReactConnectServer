import axios, { CanceledError } from "axios";
import { useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
}

const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");
  const [isloading, setIsLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    setIsLoading(true);
    axios
      .get<User[]>("https://jsonplaceholder.typicode.com/users/", {
        signal: controller.signal,
      })
      .then((res) => {
        setUsers(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setIsLoading(false);
      });

    return () => controller.abort();
  }, []);
  const deleteUser = (user: User) => {
    const originalUser = [...users];
    // Update the ui state
    setUsers(users.filter((u) => u.id !== user.id));
    // Call the server
    axios
      .delete("https://jsonplaceholder.typicode.com/usersx/" + user.id)
      .catch((err) => {
        setError(err.message);
        setUsers(originalUser);
      });
  };

  return (
    <>
      {error && <p className="text-danger">{error} </p>}
      {isloading && <p className="text-danger">LOADING ...</p>}
      <ul className="list-group">
        {users.map((u) => (
          <li
            key={u.id}
            className="list-group-item d-flex justify-content-between align-items-center "
          >
            {u.name}
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
