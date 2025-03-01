import type { DataView } from '@visactor/vdataset';
import type { IPadding } from '@visactor/vutils';
import type { SymbolType } from '@visactor/vrender-core';
import type { IComposedTextMarkSpec, IFormatMethod, IRectMarkSpec, IRichTextFormatMethod, ISymbolMarkSpec, StringOrNumber } from '../../typings';
import type { IComponentSpec } from '../base/interface';
import type { Datum } from '@visactor/vrender-components';
import type { ICartesianSeries, IGeoSeries, IPolarSeries } from '../../series/interface';
import type { IOptionAggr, IOptionAggrField, IOptionSeries } from '../../data/transforms/aggregation';
import type { IOptionRegr } from '../../data/transforms/regression';
export type IMarkerSupportSeries = ICartesianSeries | IPolarSeries | IGeoSeries;
export type IPolarPoint = {
    angle: number;
    radius: number;
};
export type OffsetPoint = {
    x?: number | string;
    y?: number | string;
};
export type IAggrType = 'sum' | 'average' | 'min' | 'max' | 'variance' | 'standardDeviation' | 'median';
export type IDataPos = StringOrNumber | IAggrType;
export type IDataPosCallback = (relativeSeriesData: Datum[], startRelativeSeriesData: Datum[], endRelativeSeriesData: Datum[], relativeSeries: IMarkerSupportSeries, startRelativeSeries: IMarkerSupportSeries, endRelativeSeries: IMarkerSupportSeries) => StringOrNumber;
export type IDataPointSpec = {
    [key: string]: IDataPos | IDataPosCallback;
    refRelativeSeriesIndex?: number;
    refRelativeSeriesId?: StringOrNumber;
    xFieldIndex?: number;
    xFieldDim?: string;
    yFieldIndex?: number;
    yFieldDim?: string;
    angleFieldIndex?: number;
    angleFieldDim?: string;
    radiusFieldIndex?: number;
    radiusFieldDim?: string;
};
export type MarkerPositionPoint = {
    x: StringOrNumber;
    y: StringOrNumber;
};
export type ICoordinateOption = {
    x?: IOptionAggrField | (IDataPosCallback | StringOrNumber)[];
    y?: IOptionAggrField | (IDataPosCallback | StringOrNumber)[];
    angle?: IOptionAggrField | (IDataPosCallback | StringOrNumber)[];
    radius?: IOptionAggrField | (IDataPosCallback | StringOrNumber)[];
    getRefRelativeSeries?: () => IMarkerSupportSeries;
} & IOptionSeries;
export type IMarkerPositionsSpec = {
    positions: MarkerPositionPoint[];
    regionRelative?: boolean;
};
export type IMarkerLabelWithoutRefSpec = {
    visible?: boolean;
    autoRotate?: boolean;
    minWidth?: number;
    maxWidth?: number;
    labelBackground?: {
        visible?: boolean;
        padding?: IPadding | number[] | number;
    } & Partial<IMarkerState<Omit<IRectMarkSpec, 'visible'>>>;
    type?: 'rich' | 'text';
    text?: string | string[] | number | number[] | ReturnType<IRichTextFormatMethod<[]>>;
    formatMethod?: IFormatMethod<[markData: Datum[], seriesData: Datum[]]>;
    shape?: {
        visible?: boolean;
        style: Omit<ISymbolMarkSpec, 'visible'>;
    };
    space?: number;
    confine?: boolean;
    dx?: number;
    dy?: number;
} & Partial<IMarkerState<Omit<IComposedTextMarkSpec, 'visible'>>>;
export type IMarkerLabelSpec = IMarkerLabelWithoutRefSpec & IMarkerRef;
export interface IMarkerRef {
    refX?: number;
    refY?: number;
    refAngle?: number;
}
export interface IMarkerCrossSeriesSpec {
    startRelativeSeriesIndex?: number;
    endRelativeSeriesIndex?: number;
    startRelativeSeriesId?: string;
    endRelativeSeriesId?: string;
    specifiedDataSeriesIndex?: 'all' | number | number[];
    specifiedDataSeriesId?: 'all' | string | string[];
}
export type IMarkerSpec = IComponentSpec & {
    relativeSeriesIndex?: number;
    relativeSeriesId?: number | string;
    visible?: boolean;
    interactive?: boolean;
    autoRange?: boolean;
    clip?: boolean;
    name?: string;
    coordinateType?: string;
};
export type IMarkerSymbol = IMarkerRef & {
    visible: boolean;
    symbolType?: SymbolType;
    size?: number;
} & Partial<IMarkerState<Omit<ISymbolMarkSpec, 'visible'>>>;
export type MarkerStyleCallback<T> = (markerData: DataView) => T;
export type MarkerStateCallback<T> = (markerData: DataView) => T;
export type MarkerStateValue = 'hover' | 'hover_reverse' | 'selected' | 'selected_reverse';
export type IMarkerState<T> = {
    style?: T | MarkerStyleCallback<T>;
    state?: Record<MarkerStateValue, T | MarkerStateCallback<T>>;
};
export type MarkCoordinateType = 'cartesian' | 'polar' | 'geo';
export type IMarkProcessOptions = {
    options: IOptionAggr[] | IOptionRegr;
    needAggr?: boolean;
    needRegr?: boolean;
    processData?: DataView;
};
