//const axios = require('axios')
import {$axios} from '@/shared/common/http-axios';
import {REPORT_API_URL} from '@/shared/common/config'

//const axios = $axios;
class API {

  constructor() {
    this.url = REPORT_API_URL
    this.get_content_type = 'application/xhtml+xml'
    this.post_content_type = 'application/x-www-form-urlencoded'
    this.endpoints = {}
    this.actionList = {add: "add", edit: "edit", view: "view", delete: "delete", index: "index"}
    //delete $axios.defaults.headers.common["Authorization"];
    this.headers = {
      //'Authorization': 'Bearer ' + StorageService.getToken(),
      'Content-Type': 'application/xhtml+xml'
    }

  }

  /**
   * Create and store a single entity's endpoints
   * @param {A entity Object} entity
   */
  createEntity(entity) {
    this.endpoints[entity.name] = this.createBasicCRUDEndpoints(entity)
  }

  createEntities(arrayOfEntity) {
    arrayOfEntity.forEach(this.createEntity.bind(this))
  }


  /**
   * Create the basic endpoints handlers for CRUD operations
   * @param {A entity Object} entity
   */
  createBasicCRUDEndpoints({name}) {
    var endpoints = {}

    const resourceURL = `${this.url}/${name}`

    this.headers["Content-Type"] = this.get_content_type;

    endpoints.getRequest = (methodName, query = {}) => $axios.get(`${resourceURL}/${methodName}`, Object.assign({
      params: query,
      headers: this.headers
    }))
    endpoints.getOne = ({method, id}) => $axios.get(`${resourceURL}/${method}/${id}`, this.headers)
    //Change header content type for post request
    endpoints.postRequest = (methodName, postData, config = {headers: {'Content-Type': this.post_content_type}}) => $axios.post(`${resourceURL}/${methodName}`, postData, config);
    endpoints.create = (methodName, toCreate) => $axios.post(`${resourceURL}/${methodName}`, toCreate, this.headers)

    endpoints.update = (methodName, toUpdate) => $axios.put(`${resourceURL}/${methodName}/${toUpdate.id}`, toUpdate, this.headers)

    //endpoints.patch  = ({id}, toPatch) => $axios.patch(`${resourceURL}/${id}`, toPatch, this.headers)

    endpoints.delete = (methodName, {id}) => $axios.delete(`${resourceURL}/${methodName}/${id}`, this.headers)

    return endpoints
  }
}

export default API
