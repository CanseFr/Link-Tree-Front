import {genericFetchWithUrl} from "../../../common/request/request.ts";

export const getUsers = () => genericFetchWithUrl(`/users`, 'GET')
  .then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error("Error request on url owner");
    }
  })