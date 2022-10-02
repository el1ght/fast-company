import httpsService from './http.service';
const professionEndPoint = 'profession/';

const professionService = {
    get: async () => {
        const { data } = await httpsService.get(professionEndPoint);
        return data;
    }
};
export default professionService;
