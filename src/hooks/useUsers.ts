import { useEffect, useState } from "react";
import userService, { User } from "../services/user-service";
import { CanceledError } from "axios";

const useUsers = () => {
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
  return { users, error, isloading, setUsers, setError };
};

export default useUsers;
