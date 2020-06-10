// All text shown to users in norwegian in project
/*
export const VARNAME = "STRING";
*/

// DB table names - do not translate
export const DB_META = "metadata";
export const DB_INGREDIENT = "ingredient";
export const DB_RECIPE = "recipe";

// Days, Months
export const MON = 'Mandag';
export const TUE = 'Tirsdag';
export const WED = 'Onsdag';
export const THU = 'Torsdag';
export const FRI = 'Fredag';
export const SAT = 'Lørdag';
export const SUN = 'Søndag';
export const JAN = 'Januar';
export const FEB = 'Februar';
export const MAR = 'Mars';
export const APR = 'April';
export const MAY = 'Mai';
export const JUNE = 'Juni';
export const JULY = 'Juli';
export const AUG = 'August';
export const SEPT = 'September';
export const OCT = 'Oktober';
export const NOV = 'November';
export const DEC = 'Desember';

// Pages
export const HOME = "Hjem";
export const ALL_RECIPES = "Alle oppskrifter";
export const PROFILE = "Profil";
export const SETTINGS = "Innstillinger";
export const DEV_OPTIONS = "Utvikler alternativer";
export const DEV = "Utvikler";
export const LOG_IN = "Logg inn";
export const LOG_OUT = "Logg ut";

// Misc.
export const MAIN_TITLE = "Chook";
export const WIP = "*Under arbeid*";
export const LOADING = "Laster inn...";
export const NORWEGIAN_KRONER = "kr";
export const MINUTES = "minutter";
export const THERE_ARE = "Det er ";
export const RECIPES_IN_DB = " oppskrifter i databasen.";
export const GET_RANDOM_DINNER = "Middagsforslag";
export const GET_DINNER_WEEK_MENU = "Lag en meny for uken";
export const DINNER = "middag";
export const TOTAL_RECIPES = " oppskrifter i databasen";
export const TOTAL_INGREDIENTS = " ingredienser i databasen";
export const LAST_UPDATED = "Oppdatert ";
export const UPDATE_METADATA = "Oppdater metadata";
export const CONTRASTMODE = "Kontrastmodus";
export const ABOUT_US = "Om oss";
export const CONTRIBUTE_TO_PAGE = "Bidra til siden";
export const BUTTON = " knapp";
export const METADATA = "Metadata";
export const PREPARATION = "forberedelse";
export const TOTAL = "totalt";
export const RECIPES = "Oppskrifter";
export const RECIPE = "Oppskrift";
export const INGREDIENTS = "Ingredienser";
export const INGREDIENT = "Ingrediens";
export const PRICE = "Pris";
export const RELOAD = "Last inn på nytt";
export const FAILED = "Feilet";
export const MORE_INFORMATION = "Mer informasjon";
export const ELEMENT = "Element";

// Upload
export const GENERAL_UPLOAD_INFORMATION = "På denne siden kan du laste opp ingredienser og oppskrifter til databasen. Alle ingredienser og oppskrifter har noen krav som må oppfylles før de godkjennes. Det finnes mer informasjon i panelene under.";
export const UPLOAD_FORM = "Last opp via skjema";
export const UPLOAD_FILE = "Last opp via fil";
export const UPLOAD_CHOOSE_FILE = "Velg en fil som skal lastes opp";
export const OVERVIEW = "Oversikt";
export const UPLOAD_QUEUE = "Opplastningskø";
export const VALIDATE_UPLOAD_DATA = "Valider data for opplasting";
export const NO_VALID_ITEMS_IN_FILE = "Det er ingen gyldige ingredienser eller oppskrifter i filen";
export const NOT_A_NUMBER = "Ikke et tall";
export const NUMBER_BELOW_ZERO = "Tallet er mindre enn null (0)";
export const NOT_AN_INGREDIENTTYPE = "Ikke en ingredients-type";
export const NOT_VALID_NAME = "Ikke gyldig navn";
export const FAILED_ITEMS = "Feilmeldinger";
export const FREETEXT = "Fri-tekst";
export const FREETEXT_MISSING = "Ingen fri-tekst funnet.";
export const FREETEXT_INFO = "Fri-tekst er et verktøy for å legge inn flere oppskrifter uten å bruke tid på å velge felter i et HTML-skjema eller sette opp format som JSON.";
export const FREETEXT_INPUT_INFO = "Denne teksten kan skrives i en valig .txt fil eller i tekstfeltet under og tolkes av nettsiden. På grunn av dette må teksen formateres på en spesiell måte.";
export const FREETEXT_SYNTAX_START = "Denne syntaksen er som følger:";
export const FREETEXT_SYNTAX_DELIM = "!";
export const FREETEXT_SYNTAX_NAME = "<navn på ingrediensen>";
export const FREETEXT_SYNTAX_TYPE = "<typen ingrediens>";
export const FREETEXT_SYNTAX_PRICE = "<pris i NOK>";
export const FREETEXT_SYNTAX_COMMON = "<om ingrediensen er vanlig i ha>";
export const FREETEXT_SYNTAX_EXAMPLE_START = "Det vil si at en ingrediens som havsalt vil se sånn ut:"
export const SEASALT = "Havsalt";
export const SPICE = "spice";
export const FREETEXT_SYNTAX_EXAMPLE_PRICE = "36.10";
export const TRUE = "true";
export const FREETEXT_SYNTAX_INFO_EXCLAMATION = "- Alle ingredienser og oppskrifter MÅ starte med utropstegn (!).";
export const FREETEXT_SYNTAX_INFO_TYPES = "- En oversikt over typene kan du ser her:..........";
export const FREETEXT_SYNTAX_INFO_PRICE = "- Pris må være et tall (heltall eller desimal med punktum).";
export const FREETEXT_SYNTAX_INFO_COMMON = "- Vanlighet er valgfritt, men må skrives som \"1\" eller \"true\" om det er forventet at det finnes i det gjennomsnittlige husholdet, eller \"0\" eller \"false\" om det IKKE er forventet. Hvis ingenting skrives er standardverdien \"false\".";
export const FREETEXT_SYNTAX_INFO_KOLONIAL = "- Nettsiden kolonial.no har mange ingredienser om det skulle være nødvendig å sjekke pris. Det vil også gjøres set søk i databasen, og lignende data vil ikke bli lastet opp.";
export const FREETEXT_SYNTAX_INFO_OVERVIEW = "- Alle feilmeldinger kommer opp under \"" + FAILED_ITEMS + "\", mens ingredienser og oppskrifter som er godkjente vises som JSON i \"" + OVERVIEW + "\".";
export const SIMILAR_IN_DB = "Lignende funnet i database";
export const MISSING_LINES = "Linjer mangler; for kort.";
export const SECTION_MISSING = "Seksjon mangler.";
export const MAX_INGREDIENTS_IN_RECIPE = "Maksimum antall ingredienser i oppskriften.";
export const MAX_INSTRUCTIONS_IN_RECIPE = "Maksimum antall instruksjoner i oppskriften.";
export const MAX_NOTES_IN_RECIPE = "Maksimum antall notater i oppskriften.";
export const INVALID_TYPE = "Ikke en gyldig type.";
export const INGREDIENT_NOT_FOUND_FILE = "Ingredient ikke funnet i fil.";
export const INGREDIENT_NOT_FOUND_DB = "Ingredient ikke funnet i database.";
export const RECIPE_NOT_FOUND_DB = "Oppskrift ikke funnet i database.";
export const OUT_OF_BOUNDS = "Utenfor gyldig rekkevidde.";

export const TITLE = "Tittel";
export const TYPE = "type";
export const GRADE = "Gradering";
export const RATING = "Poeng";
export const PORTIONS = "Porsjoner";
export const PREP_TIME = "Forberedelsestid";
export const TOTAL_TIME = "Total tid";
export const COOKING_METHOD = "Metode";
export const COOKING_METHOD_TEMPERATURE = "Tempratur";
export const COOKING_METHOD_TEMPERATURE_UNIT = "Temperaturenhet";
export const SUBRECIPES = "Underoverskrifter";
export const INSTRUCTIONS = "Instruksjoner";
export const TIPS_NOTES = "Tips og/eller notater";

export const RECIPE_TEXT_FORMAT = "Oppskriftsformat";
export const INGREDIENT_TEXT_FORMAT = "Ingrediensformat"; 

export const UPLOAD = "Last opp";
export const ELEMENTS_TO_UPLOAD = "Elementer som skal lastes opp";

export const FORMAT_GUIDE = "Kopier oppskriftene til filen og formater som forklart i eksempelet.";
export const UPLOAD_GUIDE = "Klikk \"" + VALIDATE_UPLOAD_DATA + "\" for å begynne sjekken av data, deretter klikk \"" + UPLOAD + "\" får å laste opp. For å se mer informasjon, se konsoll-loggen (Høyreklikk > Inspiser > Klikk konsoll i toppen av vinduet som dukket opp).";

export const FILE_SELECTED = "Valgt fil";

// Search
export const SEARCH = "Søk";
export const SEARCH_SOMETHING = "Søk etter noe...";
export const SEARCH_RESULTS_FOR = "Søkeresultater for: ";
export const SEARCH_RESULTS = "Søkeresultater";
export const NO_RESULTS_FOR = "Ingen resultater for: ";
export const INVALID_SEARCH_TERM = "Ugyldig søkeord!";
export const LOAD = "Last inn";

// Errormessages
export const ERROR = "FEIL";
export const UNKNOWN_ERROR = "Feil: Ukjent feil";
export const NOT_FOUND_404 = "Feil: Siden finnes ikke: 404";
export const PAGE_NOT_FOUND = "Feil: Siden du leter etter finnes ikke.";
export const DB_FETCH_FAILED = "Feil: Kunne ikke hente data fra databasen.";
export const DB_SET_FAILED = "Feil: Kunne ikke laste opp data til databasen.";
export const TEST_ERROR = "Feil: Dette er en test feil.";
export const FILE_UPLOAD_ERROR = "Feil: Det skjedde en feil ved opplasting av en fil.";
export const NO_FILE_ERROR = "Feil: Finner ikke fil.";

// Enums
export const ENUM_OTHER = "Annet";
export const ENUM_NONE = "Ingen";
export const ENUM_MEAT = "Kjøtt";
export const ENUM_FISH = "Fisk";
export const ENUM_FOWL = "Fugl/Fjerkre";
export const ENUM_VEGETABLE = "Grønnsak";
export const ENUM_SAUCE = "Saus";
export const ENUM_CONDIMENT = "Tilbehør";
export const ENUM_BAKEDGOODS = "Bakeverk";
export const ENUM_PASTRY = "Bakverk";
export const ENUM_VINEGAR = "Eddik";
export const ENUM_FRUIT = "Frukt";
export const ENUM_HERB = "Urt";
export const ENUM_SPICE = "Krydder";
export const ENUM_PASTA = "Pasta";
export const ENUM_DAIRY = "Meieri";
export const ENUM_EGG = "Egg";
export const ENUM_HONEY = "Honning";
export const ENUM_OIL = "Olje";
export const ENUM_CANDY = "Godteri/Søtsak";
export const ENUM_SEED = "Frø";
export const ENUM_NUT = "Nøtt";
export const ENUM_DRINK = "Drikke";
export const ENUM_BAKE = "Bake";
export const ENUM_ROAST = "Riste";
export const ENUM_FRY = "Steke";
export const ENUM_DEEPFRY = "Fritere";
export const ENUM_BOIL = "Koke";
export const ENUM_SOUSVIDE = "Sous Vide";
export const ENUM_GRILL = "Grill";
export const ENUM_STEAM = "Dampe";
export const ENUM_VERY_EASY = "Veldig Enkel";
export const ENUM_EASY = "Enkel";
export const ENUM_MEDIUM = "Medium";
export const ENUM_HARD = "Vanskelig";
export const ENUM_VERY_HARD = "Veldig Vanskelig";