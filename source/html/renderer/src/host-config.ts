import * as Enums from "./enums";
import * as Utils from "./utils";

export interface ISpacingDefinition {
    left: number,
    top: number,
    right: number,
    bottom: number
}

function parseSpacingDefinition(obj: any): ISpacingDefinition {
    return obj ? {
        top: obj["top"],
        right: obj["right"],
        bottom: obj["bottom"],
        left: obj["left"]
    } : null;
}

export interface IColorDefinition {
    normal: string,
    subtle: string
}

function parseColorDefinition(obj: any): IColorDefinition {
    return obj ? {
        normal: obj["normal"],
        subtle: obj["subtle"]
    } : null;
}

export interface ISeparationDefinition {
    spacing: number,
    lineThickness?: number,
    lineColor?: string
}

function parseSeparationDefinition(obj: any): ISeparationDefinition {
    return obj ? {
        spacing: obj["spacing"],
        lineThickness: obj["lineThickness"],
        lineColor: obj["lineColor"]
    } : null;
}

export interface IAdaptiveCardConfig {
    backgroundColor: string,
    padding: ISpacingDefinition
}

function parseAdaptiveCardConfiguration(obj: any): IAdaptiveCardConfig {
    return obj ? {
        backgroundColor: obj["backgroundColor"],
        padding: parseSpacingDefinition(obj["padding"])
    } : null;
}

export interface ITextBlockConfig {
    color: Enums.TextColor,
    separations: {
        small: ISeparationDefinition,
        normal: ISeparationDefinition,
        medium: ISeparationDefinition,
        large: ISeparationDefinition,
        extraLarge: ISeparationDefinition,
    }    
}

function parseTextBlockConfiguration(obj: any): ITextBlockConfig {
    return obj ? {
        color: obj["color"],
        separations: {
            small: parseSeparationDefinition(obj["separations"]["small"]),
            normal: parseSeparationDefinition(obj["separations"]["normal"]),
            medium: parseSeparationDefinition(obj["separations"]["medium"]),
            large: parseSeparationDefinition(obj["separations"]["large"]),
            extraLarge: parseSeparationDefinition(obj["separations"]["extraLarge"])
        }
    } : null;
}

export interface IContainerStyleDefinition {
    backgroundColor?: string,
    padding?: ISpacingDefinition,
    borderColor?: string,
    borderThickness?: ISpacingDefinition
}

function parseContainerStyleDefinition(obj: any): IContainerStyleDefinition {
    return obj ? {
        backgroundColor: obj["backgroundColor"],
        padding: parseSpacingDefinition(obj["padding"]),
        borderColor: obj["borderColor"],
        borderThickness: parseSpacingDefinition(obj["borderThickness"])
    } : null;
}

export interface IContainerConfig {
    separation: ISeparationDefinition,
    normal: IContainerStyleDefinition,
    emphasis: IContainerStyleDefinition
}

function parseContainerConfiguration(obj: any): IContainerConfig {
    return obj ? {
        separation: parseSeparationDefinition(obj["separation"]),
        normal: parseContainerStyleDefinition(obj["normal"]),
        emphasis: parseContainerStyleDefinition(obj["emphasis"])
    } : null;
}

export interface IImageConfig {
    separation: ISeparationDefinition
    size: Enums.Size
}

function parseImageConfiguration(obj: any): IImageConfig {
    return obj ? {
        separation: parseSeparationDefinition(obj["separation"]),
        size: obj["size"]
    } : null;
}

export interface IImageSetConfig {
    separation: ISeparationDefinition
    imageSize: Enums.Size
}

function parseImageSetConfiguration(obj: any): IImageSetConfig {
    return obj ? {
        separation: parseSeparationDefinition(obj["separation"]),
        imageSize: obj["imageSize"]
    } : null;
}

export interface IFactTextDefinition {
    size: Enums.TextSize,
    color: Enums.TextColor,
    isSubtle: boolean,
    weight: Enums.TextWeight,
    wrap: boolean    
}

function parseFactTextDefinition(obj: any): IFactTextDefinition {
    return obj ? {
        size: Utils.getValueOrDefault<Enums.TextSize>(obj["size"], "normal"),
        color: Utils.getValueOrDefault<Enums.TextColor>(obj["color"], "dark"),
        isSubtle: obj["isSubtle"],
        weight: Utils.getValueOrDefault<Enums.TextWeight>(obj["weight"], "normal"),
        wrap: obj["wrap"]
    } : null;
}

export interface IFactTitleDefinition extends IFactTextDefinition {
    maxWidth?: number;
}

function parseFactTitleDefinition(obj: any): IFactTitleDefinition {
    var result: IFactTitleDefinition = parseFactTextDefinition(obj);

    if (result) {
        result.maxWidth = obj["maxWidth"];
    }

    return result;
}

export interface IFactSetConfig {
    separation: ISeparationDefinition,
    title: IFactTitleDefinition,
    value: IFactTextDefinition,
    spacing: number
}

function parseFactSetConfiguration(obj: any): IFactSetConfig {
    return obj ? {
        separation: parseSeparationDefinition(obj["separation"]),
        title: parseFactTitleDefinition(obj["title"]),
        value: parseFactTextDefinition(obj["value"]),
        spacing: obj["spacing"]
    } : null;
}

export interface IColumnSetConfig {
    separation: ISeparationDefinition
}

function parseColumnSetConfiguration(obj: any): IColumnSetConfig {
    return obj ? {
        separation: parseSeparationDefinition(obj["separation"])
    } : null;
}

export interface IColumnConfig {
    separation: ISeparationDefinition
}

function parseColumnConfiguration(obj: any): IColumnConfig {
    return obj ? {
        separation: parseSeparationDefinition(obj["separation"])
    } : null;
}

export interface IShowCardActionConfig {
    actionMode: Enums.ShowCardActionMode,
    inlineTopMargin: number,
    backgroundColor: string,
    padding: ISpacingDefinition
}

function parseShowCardActionConfiguration(obj: any): IShowCardActionConfig {
    return obj ? {
        actionMode: Utils.getValueOrDefault<Enums.ShowCardActionMode>(obj["actionMode"], "inlineEdgeToEdge"),
        inlineTopMargin: obj["inlineTopMargin"],
        backgroundColor: obj["backgroundColor"],
        padding: parseSpacingDefinition(obj["padding"])
    } : null;
}

export interface IActionsConfig {
    maxActions: number,
    separation: ISeparationDefinition,
    buttonSpacing: number,
    showCard: IShowCardActionConfig,
    actionsOrientation: Enums.Orientation,
    actionAlignment: Enums.ActionAlignment
}

function parseActionsConfiguration(obj: any): IActionsConfig {
    return obj ? {
        maxActions: obj["maxActions"],
        separation: parseSeparationDefinition(obj["separation"]),
        buttonSpacing: obj["buttonSpacing"],
        showCard: parseShowCardActionConfiguration(obj["showCard"]),
        actionsOrientation: Utils.getValueOrDefault<Enums.Orientation>(obj["actionsOrientation"], "horizontal"),
        actionAlignment: Utils.getValueOrDefault<Enums.ActionAlignment>(obj["actionAlignment"], "left"),
    } : null;
}

export interface IInputConfig {
    separation: ISeparationDefinition
}

function parseInputConfiguration(obj: any): IInputConfig {
    return obj ? {
        separation: parseSeparationDefinition(obj["separation"])
    } : null;
}

export interface IHostConfig {
    supportsInteractivity: boolean,
    fontFamily?: string,
    fontSizes: {
        small: number,
        normal: number,
        medium: number,
        large: number,
        extraLarge: number
    },
    fontWeights: {
        lighter: number,
        normal: number,
        bolder: number
    },
    imageSizes: {
        small: number,
        medium: number,
        large: number
    }
    colors: {
        dark: IColorDefinition,
        light: IColorDefinition,
        accent: IColorDefinition,
        good: IColorDefinition,
        warning: IColorDefinition,
        attention: IColorDefinition
    },
    strongSeparation: ISeparationDefinition,
    actions: IActionsConfig,
    adaptiveCard: IAdaptiveCardConfig,
    container: IContainerConfig,
    textBlock: ITextBlockConfig,
    image: IImageConfig,
    imageSet: IImageSetConfig,
    factSet: IFactSetConfig,
    column: IColumnConfig,
    columnSet: IColumnSetConfig,
    input: IInputConfig
}

export function parseHostConfig(serializedConfiguration: string): IHostConfig {
    var obj = JSON.parse(serializedConfiguration);

    return obj ? {
        supportsInteractivity: obj["supportsInteractivity"],
        fontFamily: obj["fontFamily"],
        fontSizes: {
            small: obj["fontSizes"]["small"],
            normal: obj["fontSizes"]["normal"],
            medium: obj["fontSizes"]["medium"],
            large: obj["fontSizes"]["large"],
            extraLarge: obj["fontSizes"]["extraLarge"]
        },
        fontWeights: {
            lighter: obj["fontWeights"]["lighter"],
            normal: obj["fontWeights"]["normal"],
            bolder: obj["fontWeights"]["bolder"]
        },
        imageSizes: {
            small: obj["imageSizes"]["small"],
            medium: obj["imageSizes"]["medium"],
            large: obj["imageSizes"]["large"],
        },
        colors: {
            dark: parseColorDefinition(obj["colors"]["dark"]),
            light: parseColorDefinition(obj["colors"]["light"]),
            accent: parseColorDefinition(obj["colors"]["accent"]),
            good: parseColorDefinition(obj["colors"]["good"]),
            warning: parseColorDefinition(obj["colors"]["warning"]),
            attention: parseColorDefinition(obj["colors"]["attention"])
        },        
        strongSeparation: parseSeparationDefinition(obj["strongSeparation"]),
        actions: parseActionsConfiguration(obj["actions"]),
        adaptiveCard: parseAdaptiveCardConfiguration(obj["adaptiveCard"]),
        container: parseContainerConfiguration(obj["container"]),
        textBlock: parseTextBlockConfiguration(obj["textBlock"]),
        image: parseImageConfiguration(obj["image"]),
        imageSet: parseImageSetConfiguration(obj["imageSet"]),
        factSet: parseFactSetConfiguration(obj["factSet"]),
        column: parseColumnConfiguration(obj["column"]),
        columnSet: parseColumnSetConfiguration(obj["columnSet"]),
        input: parseInputConfiguration(obj["input"])
    } : null;
}