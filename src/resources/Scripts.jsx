
// Upload enum to database /Enum/EnumType
export const uploadEnumToDatabase = (enumType) =>
{
    // Why?
    // Duplicating Enums is helpful redundency, but local pages will 
    // still use local Enums because of display value. Put english + norwegian enums in DB? 
    // doesn't "fit"/seem right - From recipe, get enum id, call to db to get enum?? use local enum to get display name
    // TODO Delete???
    // TODO + Enum actions/reducer
    // validate enum (must have Display function), else return
    // Generate hash from enumtype
    // get db, if existing, 
    // get db hash, if same as from type, skip
    // remove database type
    // for each enum in enumtype, push to array: { id: index, value: enum }
    // set db to /Enum/enum type name/{ hash, [enum array]}
}
