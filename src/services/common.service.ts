import axios from 'axios';

export class CommonService {
    protected static async post<T>(api: string, data: any): Promise<T> {
        try {
            const res = await axios.post(api, { ...data });
            return res.data;
        } catch (e: unknown) {
            if (axios.isAxiosError(e)) {
                throw e.response;
            }
            throw e;
        }
    }
}