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

    static async getData<T>(
        api: string,
        from: number,
        to: number,
        sessionToken: string
    ): Promise<T> {
        return CommonService.post<T>(
            api,
            {
                session_token: sessionToken,
                from,
                to
            }
        );
    }
}
