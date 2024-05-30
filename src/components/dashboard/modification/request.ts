import {genericFetchWithUrl} from "../../../common/request/request.ts";

export const getOwnerInfos = (url_owner: number) => genericFetchWithUrl(`/users/complet/${url_owner}`, 'GET')
  .then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error("Error request on url owner");
    }
  })