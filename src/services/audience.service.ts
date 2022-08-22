import axios from 'axios';
import moment from 'moment';
import { mockAudienceList } from '../mocks/mockAudiance';
import { Audience } from '../models/Audience';
import { CommonService } from './common.service';

export class AudienceService extends CommonService {
    private static baseUrl: string = String(process.env.REACT_APP_BACKEND_HOST);

    static async getAll(sessionToken: string | null): Promise<Audience> {
        if (String(process.env.REACT_APP_STANDALONE_MODE) === 'on') {
            return { audience: mockAudienceList } as Audience;
        } else {
            if (!sessionToken) {
                throw Error('Unauthorized');
            }

            const from = 1509490800000;
            const to = moment().valueOf();

            try {
                return CommonService.getData(
                    `${AudienceService.baseUrl}/audience`,
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
