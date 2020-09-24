import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        drawnItems: {},

    },
    mutations: {
        //state: store的state
        selectFeature: function(state, payload) {
            if (!state.featureSelected.layerId) {
                state.featureSelected = payload;
            } else {
                // 判斷目前的layer的z-index
                // 解決穿透的問題
                const layer = Vue.prototype.$SimGeoMap.getLayer(payload.mlgId, payload.mlId, payload.layerId);
                const l = Vue.prototype.$SimGeoMap.getLayer(state.featureSelected.mlgId, state.featureSelected.mlId, state.featureSelected.layerId);
                const lDisplayIdx = l.getDisplayIndex();
                const mlDisplayIdx = l._mixLayer.getDisplayIndex();
                const mlgDisplayIdx = l._mixLayer._mixLayerGroup.getDisplayIndex();
                if (mlgDisplayIdx > layer._mixLayer._mixLayerGroup.getDisplayIndex() ||
                    (mlgDisplayIdx === layer._mixLayer._mixLayerGroup.getDisplayIndex() && mlDisplayIdx > layer._mixLayer.getDisplayIndex()) ||
                    (mlgDisplayIdx === layer._mixLayer._mixLayerGroup.getDisplayIndex() && mlDisplayIdx === layer._mixLayer.getDisplayIndex()) && lDisplayIdx > layer.getDisplayIndex())
                    state.featureSelected = payload;
            }
        },
        toggleDlgVisible(state, payload) {
            state.globalDlgs[payload.dlgName].visible = payload.visible;
            if (!state.globalDlgs.DatabaseDLG.visible &&
                !state.globalDlgs.ArrowsDensityDLG.visible &&
                !state.globalDlgs.mbDLG.visible &&
                !state.globalDlgs.mbHighChart.visible) {
                state.featureSelected = {
                    dataProp: {},
                    title: null,
                    grafanaInfo: null,
                    coords: {},
                    layerId: null,
                    mlId: null,
                    mlgId: null,
                    selectedFeature: null,
                    canClone: false
                };
            }
        },
        updateDlgStatus(state, dlgName, status) {
            state.globalDlgs[dlgName] = status
        },
        setEmulateCloneForm(state, form) {
            state.form = form
        },
        addTimeSerialInfo(state, { mlgId, timeSerialInfo }) {
            if (timeSerialInfo) {
                state.timeSerialInfos[mlgId] = timeSerialInfo;
            }
        },
        removeTimeSerialInfo(state, mlgId) {
            // 如果有的話才移走
            if (mlgId in state.timeSerialInfos)
                delete state.timeSerialInfos[mlgId]
        }
    },
    actions: {
        addTimeSerialInfo(context, { mlgId, timeSerialInfo }) {
            context.commit('addTimeSerialInfo', { mlgId, timeSerialInfo });
        },
        removeTimeSerialInfo(context, mlgId) {
            context.commit('removeTimeSerialInfo', mlgId);
        },
        selectFeature(context, payload) {
            context.commit("selectFeature", payload);
        },
        toggleDlgVisible(context, payload) {
            context.commit("toggleDlgVisible", payload);
        },
    },
});