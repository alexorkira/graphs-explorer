import axios from 'axios';
import moment from 'moment';
import { mockBandwidthList } from '../mocks/mockBandwidth';
import { Bandwidth } from '../models/Bandwidth';
import { CommonService } from './common.service';

export class BandwidthService extends CommonService {
    private static baseUrl: string = String(process.env.REACT_APP_BACKEND_HOST);

    static async getAll(sessionToken: string | null): Promise<Bandwidth> {
        if (String(process.env.REACT_APP_STANDALONE_MODE) === 'on') {
            return mockBandwidthList as Bandwidth;
        } else {
            if (!sessionToken) {
                throw Error('Unauthorized');
            }

            const from = 1509490800000;
            const to = moment().valueOf();

            try {
                return CommonService.getData(
                    `${BandwidthService.baseUrl}/bandwidth`,
                    from,
                    to,
                    sessionToken
                );
            } catch (e: unknown) {
                if (axios.isAxiosError(e)) {
                    throw e.response;
                }
                throw e;
            }
        }
    }
}
