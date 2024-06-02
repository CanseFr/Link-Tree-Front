import {genericFetchWithBody, genericFetchWithUrl} from "../../../common/request/request.ts";
import { BranchsType, PathType} from "../../common/types.ts";

export const getOwnerInfos = (url_owner: number) => genericFetchWithUrl(`/path-profil/get-full-by-id/${url_owner}`, 'GET')
  .then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error("Error request on url owner");
    }
  })

export const createPathProfile = (pathCreate: PathType) => genericFetchWithBody(`/path-profil`, 'POST', pathCreate)
  .then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error("Error request on url owner");
    }
  })

export const updatePathProfil = (userId: number,pathWithNestedBranchs: PathType ) =>genericFetchWithBody<PathType>('/path-profil/' + userId, "PATCH", pathWithNestedBranchs!)
  .then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error("Error request on url owner");
    }
  })

export const updateAllBranchs = (userId: number, pathWithNestedBranchs: PathType) => genericFetchWithBody<BranchsType>('/branch-network/all/' + userId, "PATCH", pathWithNestedBranchs!)
  .then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error("Error request on url owner");
    }
  })