import { createContextStore } from 'easy-peasy';
import { chartDataInit, ChartDataModel } from './stores/ChartDataStore';
import { sessionStoreInit, SessionStoreModel } from './stores/SessionStore';

export interface ContextStoreModel {
    session: SessionStoreModel,
    chartData: ChartDataModel,
}

const ContextStore = createContextStore<ContextStoreModel>(
    {
        session: sessionStoreInit,
        chartData: chartDataInit,
    }
);

export default ContextStore;
