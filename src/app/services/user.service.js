import httpsService from './http.service';
const userEndPoint = 'user/';

const userService = {
    get: async () => {
      const { data } = await httpsService.get(userEndPoint);
      return data;
    }
};
export default userService;
