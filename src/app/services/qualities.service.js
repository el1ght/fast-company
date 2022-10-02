import httpsService from './http.service';
const qualitiesEndPoint = 'quality/';

const qualitiesService = {
    get: async () => {
        const { data } = await httpsService.get(qualitiesEndPoint);
        return data;
    }
};
export default qualitiesService;
