import { genericFetchWithUrl} from "../../common/request/request.ts";

export const getUrlOwner = (url_owner: string) => genericFetchWithUrl(`/path-profil/get-full-by-path/${url_owner}`, 'GET')
  .then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error("Error request on url owner");
    }
  })