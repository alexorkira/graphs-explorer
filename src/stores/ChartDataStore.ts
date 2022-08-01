import { Action, action, thunk, Thunk } from 'easy-peasy';
import { StatusCodes } from 'http-status-codes';
import { ChartData } from '../interfaces/ChartData';
import { Audience } from '../models/Audience';
import { AudienceService } from '../services/audience.service';
import { ContextStoreModel } from '../store';

export interface ChartDataModel {
    timestamps: Array<number>,
    setTimestamps: Action<ChartDataModel, Array<number>>,
    audienceChartData: ChartData | null,
    setAudienceChartData: Action<ChartDataModel, ChartData>,
    fetchAudience: Thunk<ChartDataModel, undefined, undefined, ContextStoreModel>
}

export const chartDataInit: ChartDataModel = {
    timestamps: [],
    setTimestamps: action((state, timestamps) => {
      state.timestamps = timestamps;
    }),
    audienceChartData: null,
    setAudienceChartData: action((state, chartData) => {
        state.audienceChartData = chartData;
    }),
    fetchAudience: thunk(async (actions, _, helpers) => {
        AudienceService.getAll(helpers.getStoreState().session.token)
            .then(({ audience }: Audience) => {
                // Extract the array of timestamps. It is the same of the one taken from Bandwidth data
                actions.setTimestamps(audience.map(c => c[0]));
                actions.setAudienceChartData(
                    {
                        label: "Audiance",
                        values: audience,
                        color: "#FF7D71",
                    }
                );
            })
            .catch(e => {
                if (e.status === StatusCodes.FORBIDDEN) {
                    helpers.getStoreActions().session.setToken(undefined);
                }
            });
    }),
};
