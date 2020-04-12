import {axiosRoot} from "./../config/axios"
const data:any[] = [{name:"ABC"}, {name:"DEF"}];

const serviceURLs={
  getAll:"/jobSites",
  create:"/jobSite",
  getById:"./jobSite/",
  updateById:"./jobSite/",
  deleteById:"./jobSite/"
}

export const getJobSites1 = (): Promise<any[]> => {
  const promise = new Promise<any[]>(resolve => {
    setTimeout(() => {
      resolve(data);
    }, 5000);
  });
  return promise;
};

export const getJobSites = ():Promise<any>=>{
  return axiosRoot.get(serviceURLs.getAll)
}
export const createJobSite= (data:any):Promise<any>=>{
  return axiosRoot.post(serviceURLs.create, data)
}
export const getJobSiteById= (id:string):Promise<any>=>{
  return axiosRoot.get(serviceURLs.getById+id)
}
export const updateJobSiteById= (id:string, data:any):Promise<any>=>{
  return axiosRoot.put(serviceURLs.updateById+id, data)
}
export const deleteJobSiteById= (id:string):Promise<any>=>{
  return axiosRoot.delete(serviceURLs.deleteById+id)
}