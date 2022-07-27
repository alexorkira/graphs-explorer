import axios from 'axios';
import moment from 'moment';
import { CommonService } from './common.service';

export class BandwidthService extends CommonService {
    private static baseUrl: string = String(process.env.REACT_APP_BACKEND_HOST);

    static async getData(from: number, to: number, sessionToken: string): Promise<any> {
        try {
            return await BandwidthService.post<any>(
                `${BandwidthService.baseUrl}/bandwidth`, 
                { 
                    session_token: sessionToken,
                    from,
                    to
                }
            );
        } catch (e: unknown) {
            if (axios.isAxiosError(e)) {
                throw e.response;
            }
            throw e;
        }
    }

    static async getAll(sessionToken?: string): Promise<any> {
        const from = 1509490800000;
        const to = moment().valueOf();
        if (!sessionToken) {
            throw Error("Unauthorized");
        }

        try {
            return await BandwidthService.getData(from, to, sessionToken);
        } catch (e: unknown) {
            if (axios.isAxiosError(e)) {
                throw e.response;
            }
            throw e;
        }
    }
}
