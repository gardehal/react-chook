import { ENUM_OTHER, ENUM_TEASPOON, ENUM_TABLESPOON, ENUM_CUP, ENUM_CLOVE, 
    ENUM_PINCH, ENUM_FIST, ENUM_LEAF, ENUM_QUBE, PORTIONS, ENUM_SLICED, 
    ENUM_WHOLE, ENUM_PACK, ENUM_BOTTLE, ENUM_CAN, ENUM_UNIT, ENUM_SOME, 
	ENUM_ALOT, ENUM_MG, ENUM_G, ENUM_DAG, ENUM_HG, ENUM_KG, ENUM_MM, ENUM_CM, 
	ENUM_M, ENUM_ML, ENUM_CL, ENUM_DL, ENUM_L, ENUM_GR, ENUM_IB, ENUM_ST, 
	ENUM_INCH, ENUM_FOOT, ENUM_OZ, ENUM_PT, ENUM_QT, ENUM_GAL, ENUM_SLICE,
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

export const QuantityUnitDisplay: { [index: number]: string } = {};
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

export const QuantityUnitValue = (text: String) =>
{
	if(!text)
		return null;
	switch(text.toLowerCase())
	{
		case "0":
		case "OTHER".toLowerCase():
		case ENUM_OTHER.toLowerCase():
			return QuantityUnit[QuantityUnit.OTHER];
		case "1":
		case "TS".toLowerCase():
		case ENUM_TEASPOON.toLowerCase():
			return QuantityUnit[QuantityUnit.TS];
		case "2":
		case "TBS".toLowerCase():
		case ENUM_TABLESPOON.toLowerCase():
			return QuantityUnit[QuantityUnit.TBS];
		case "3":
		case "CUP".toLowerCase():
		case ENUM_CUP.toLowerCase():
			return QuantityUnit[QuantityUnit.CUP];
		case "4":
		case "CLOVE".toLowerCase():
		case ENUM_CLOVE.toLowerCase():
			return QuantityUnit[QuantityUnit.CLOVE];
		case "5":
		case "PINCH".toLowerCase():
		case ENUM_PINCH.toLowerCase():
			return QuantityUnit[QuantityUnit.PINCH];
		case "6":
		case "FIST".toLowerCase():
		case ENUM_FIST.toLowerCase():
			return QuantityUnit[QuantityUnit.FIST];
		case "7":
		case "LEAF".toLowerCase():
		case ENUM_LEAF.toLowerCase():
			return QuantityUnit[QuantityUnit.LEAF];
		case "8":
		case "QUBE".toLowerCase():
		case ENUM_QUBE.toLowerCase():
			return QuantityUnit[QuantityUnit.QUBE];
		case "9":
		case "PORTION".toLowerCase():
		case PORTIONS.toLowerCase():
			return QuantityUnit[QuantityUnit.PORTION];
		case "10":
		case "SLICE".toLowerCase():
		case ENUM_SLICE.toLowerCase():
			return QuantityUnit[QuantityUnit.SLICE];
		case "11":
		case "WHOLE".toLowerCase():
		case ENUM_WHOLE.toLowerCase():
			return QuantityUnit[QuantityUnit.WHOLE];
		case "12":
		case "PACK".toLowerCase():
		case ENUM_PACK.toLowerCase():
			return QuantityUnit[QuantityUnit.PACK];
		case "13":
		case "BOTTLE".toLowerCase():
		case ENUM_BOTTLE.toLowerCase():
			return QuantityUnit[QuantityUnit.BOTTLE];
		case "14":
		case "CAN".toLowerCase():
		case ENUM_CAN.toLowerCase():
			return QuantityUnit[QuantityUnit.CAN];
		case "15":
		case "UNIT".toLowerCase():
		case ENUM_UNIT.toLowerCase():
			return QuantityUnit[QuantityUnit.UNIT];
		case "16":
		case "SOME".toLowerCase():
		case ENUM_SOME.toLowerCase():
			return QuantityUnit[QuantityUnit.SOME];
		case "17":
		case "ALOT".toLowerCase():
		case ENUM_ALOT.toLowerCase():
			return QuantityUnit[QuantityUnit.ALOT];
		case "18":
		case "MG".toLowerCase():
		case ENUM_MG.toLowerCase():
			return QuantityUnit[QuantityUnit.MG];
		case "19":
		case "G".toLowerCase():
		case ENUM_G.toLowerCase():
			return QuantityUnit[QuantityUnit.G];
		case "20":
		case "DAG".toLowerCase():
		case ENUM_DAG.toLowerCase():
			return QuantityUnit[QuantityUnit.DAG];
		case "21":
		case "HG".toLowerCase():
		case ENUM_HG.toLowerCase():
			return QuantityUnit[QuantityUnit.HG];
		case "22":
		case "KG".toLowerCase():
		case ENUM_KG.toLowerCase():
			return QuantityUnit[QuantityUnit.KG];
		case "23":
		case "MM".toLowerCase():
		case ENUM_MM.toLowerCase():
			return QuantityUnit[QuantityUnit.MM];
		case "24":
		case "CM".toLowerCase():
		case ENUM_CM.toLowerCase():
			return QuantityUnit[QuantityUnit.CM];
		case "25":
		case "M".toLowerCase():
		case ENUM_M.toLowerCase():
			return QuantityUnit[QuantityUnit.M];
		case "26":
		case "ML".toLowerCase():
		case ENUM_ML.toLowerCase():
			return QuantityUnit[QuantityUnit.ML];
		case "27":
		case "CL".toLowerCase():
		case ENUM_CL.toLowerCase():
			return QuantityUnit[QuantityUnit.CL];
		case "28":
		case "DL".toLowerCase():
		case ENUM_DL.toLowerCase():
			return QuantityUnit[QuantityUnit.DL];
		case "29":
		case "L".toLowerCase():
		case ENUM_L.toLowerCase():
			return QuantityUnit[QuantityUnit.L];
		case "30":
		case "GR".toLowerCase():
		case ENUM_GR.toLowerCase():
			return QuantityUnit[QuantityUnit.GR];
		case "31":
		case "IB".toLowerCase():
		case ENUM_IB.toLowerCase():
			return QuantityUnit[QuantityUnit.IB];
		case "32":
		case "ST".toLowerCase():
		case ENUM_ST.toLowerCase():
			return QuantityUnit[QuantityUnit.ST];
		case "33":
		case "INCH".toLowerCase():
		case ENUM_INCH.toLowerCase():
			return QuantityUnit[QuantityUnit.INCH];
		case "34":
		case "FOOT".toLowerCase():
		case ENUM_FOOT.toLowerCase():
			return QuantityUnit[QuantityUnit.FOOT];
		case "35":
		case "OZ".toLowerCase():
		case ENUM_OZ.toLowerCase():
			return QuantityUnit[QuantityUnit.OZ];
		case "36":
		case "PT".toLowerCase():
		case ENUM_PT.toLowerCase():
			return QuantityUnit[QuantityUnit.PT];
		case "37":
		case "QT".toLowerCase():
		case ENUM_QT.toLowerCase():
			return QuantityUnit[QuantityUnit.QT];
		case "38":
		case "GAL".toLowerCase():
		case ENUM_GAL.toLowerCase():
			return QuantityUnit[QuantityUnit.GAL];
		default:
			return null;
	}
};

export const QuantityUnitList = (translated: Boolean = false, join: Boolean = true, delim: string = ", ") =>
{
	let keys = Object.keys(QuantityUnit).filter(k => !Number.parseInt(k) && k != "0");
	let res: Array<String> = [];

	if(translated)
		for (const key in keys)
			res.push(QuantityUnitDisplay[key]);
	else
		for (const key in keys)
			res.push(QuantityUnit[key]);

	if(join)
		return res.join(delim);

	return res; 
};