import { ENUM_OTHER, ENUM_TEASPOON, ENUM_TABLESPOON, ENUM_CUP, ENUM_CLOVE, 
    ENUM_PINCH, ENUM_FIST, ENUM_LEAF, ENUM_QUBE, PORTIONS, ENUM_SLICED, 
    ENUM_WHOLE, ENUM_PACK, ENUM_BOTTLE, ENUM_CAN, ENUM_UNIT, ENUM_SOME, 
    ENUM_ALOT, ENUM_MG, ENUM_G, ENUM_DAG, ENUM_HG, ENUM_KG, ENUM_MM, ENUM_CM, ENUM_M, ENUM_ML, ENUM_CL, ENUM_DL, ENUM_L, ENUM_GR, ENUM_IB, ENUM_ST, ENUM_INCH, ENUM_FOOT, ENUM_OZ, ENUM_PT, ENUM_QT, ENUM_GAL
} from "../../resources/language";

export enum QuantityUnit
{
    OTHER,
    // General units
    // Kitchen "units"
    TS,
    TBS,
    CUP,
    // Partial units
    CLOVE,
    PINCH,
    FIST,
    LEAF, 
    QUBE,
    PORTION,
    SLICE,
    // Whole + Packages
    WHOLE, 
    PACK,
    BOTTLE,
    CAN,
    UNIT,
    SOME,
    ALOT,

    // SI units
    // SI weight
    MG,
    G,
    DAG,
    HG,
    KG,
    // SI length
    MM,
    CM,
    M,
    // SI volume
    ML, 
    CL,
    DL,
    L,
    
    // Imperial units
    // Imperial weight
    GR,
    IB,
    ST,
    // Imperial length
    INCH,
    FOOT,
    // Imperial volume
    OZ, // OZ volume
    PT, // Pint volume
    QT,
    GAL,
};

export let QuantityUnitDisplay: { [index: number]: string } = {};
QuantityUnitDisplay[QuantityUnit.OTHER] = ENUM_OTHER;
QuantityUnitDisplay[QuantityUnit.TS] = ENUM_TEASPOON;
QuantityUnitDisplay[QuantityUnit.TBS] = ENUM_TABLESPOON;
QuantityUnitDisplay[QuantityUnit.CUP] = ENUM_CUP;
QuantityUnitDisplay[QuantityUnit.CLOVE] = ENUM_CLOVE;
QuantityUnitDisplay[QuantityUnit.PINCH] = ENUM_PINCH;
QuantityUnitDisplay[QuantityUnit.FIST] = ENUM_FIST;
QuantityUnitDisplay[QuantityUnit.LEAF] = ENUM_LEAF;
QuantityUnitDisplay[QuantityUnit.QUBE] = ENUM_QUBE;
QuantityUnitDisplay[QuantityUnit.PORTION] = PORTIONS;
QuantityUnitDisplay[QuantityUnit.SLICE] = ENUM_SLICED;
QuantityUnitDisplay[QuantityUnit.WHOLE] = ENUM_WHOLE;
QuantityUnitDisplay[QuantityUnit.PACK] = ENUM_PACK;
QuantityUnitDisplay[QuantityUnit.BOTTLE] = ENUM_BOTTLE;
QuantityUnitDisplay[QuantityUnit.CAN] = ENUM_CAN;
QuantityUnitDisplay[QuantityUnit.UNIT] = ENUM_UNIT;
QuantityUnitDisplay[QuantityUnit.SOME] = ENUM_SOME;
QuantityUnitDisplay[QuantityUnit.ALOT] = ENUM_ALOT;
QuantityUnitDisplay[QuantityUnit.MG] = ENUM_MG;
QuantityUnitDisplay[QuantityUnit.G] = ENUM_G;
QuantityUnitDisplay[QuantityUnit.DAG] = ENUM_DAG;
QuantityUnitDisplay[QuantityUnit.HG] = ENUM_HG;
QuantityUnitDisplay[QuantityUnit.KG] = ENUM_KG;
QuantityUnitDisplay[QuantityUnit.MM] = ENUM_MM;
QuantityUnitDisplay[QuantityUnit.CM] = ENUM_CM;
QuantityUnitDisplay[QuantityUnit.M] = ENUM_M;
QuantityUnitDisplay[QuantityUnit.ML] = ENUM_ML;
QuantityUnitDisplay[QuantityUnit.CL] = ENUM_CL;
QuantityUnitDisplay[QuantityUnit.DL] = ENUM_DL;
QuantityUnitDisplay[QuantityUnit.L] = ENUM_L;
QuantityUnitDisplay[QuantityUnit.GR] = ENUM_GR;
QuantityUnitDisplay[QuantityUnit.IB] = ENUM_IB;
QuantityUnitDisplay[QuantityUnit.ST] = ENUM_ST;
QuantityUnitDisplay[QuantityUnit.INCH] = ENUM_INCH;
QuantityUnitDisplay[QuantityUnit.FOOT] = ENUM_FOOT;
QuantityUnitDisplay[QuantityUnit.OZ] = ENUM_OZ;
QuantityUnitDisplay[QuantityUnit.PT] = ENUM_PT;
QuantityUnitDisplay[QuantityUnit.QT] = ENUM_QT;
QuantityUnitDisplay[QuantityUnit.GAL] = ENUM_GAL;