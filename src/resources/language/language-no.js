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
export const LOADING = "Laster inn...";
export const NORWEGIAN_KRONER = "kr";
export const MINUTES = "minutter";
export const THERE_ARE = "Det er ";
export const RECIPES_IN_DB = " oppskrifter i databasen.";
export const GET_RANDOM_DINNER = "Middagsforslag";
export const GET_DINNER_WEEK_MENU = "Lag en meny for uken";
export const DINNER = "middag";
export const PORTIONS = "porsjoner";
export const PREP_TIME = "Forberedelse: ";
export const TOTAL_TIME = "Total tid: ";
export const TOTAL_RECIPES = " oppskrifter i databasen";
export const TOTAL_INGREDIENTS = " ingredienser i databasen";
export const LAST_UPDATED = "Oppdatert ";
export const UPDATE_METADATA = "Oppdater metadata";
export const SUBRECIPES = "Underoverskrifter";
export const INSTRUCTIONS = "Instruksjoner";
export const TIPS_NOTES = "Tips og notater";
export const CONTRASTMODE = "Kontrastmodus";
export const ABOUT_US = "Om oss";
export const CONTRIBUTE_TO_PAGE = "Bidra til siden";
export const BUTTON = " knapp";
export const METADATA = "Metadata";
export const PREPARATION = "forberedelse";
export const TOTAL = "totalt";

// Upload
export const RECIPE_TEXT_FORMAT = "Oppskriftsformat";
export const INGREDIENT_TEXT_FORMAT = "Ingrediensformat";
export const RECIPE_TEXT_FORMAT_TEXT = "Format (replace words in brackets[] with the symbol or fitting text/number, hashtag means optional, everything else is required): \n\n [Exclamation mark] \n recipe_title (Text, as you see fit) \n recipe_type (Text: dinner, entre, desert, breakfast, desert, drink..), #recipe_grade (Text: easy, hard, medium; norwegian), #recipe_rating (Number: whole or decimal, the rating, min 0, max 10) \n recipe_portions (Whole number) \n recipe_time_preparation (Whole number, minutes) \n recipe_time_total (Whole number, minutes) \n #recipe_cooking_method (Text, as in grill, oven, or other things that require pre-heating), #recipe_cooking_method_temprature (Whole number, the degrees the tool is to be set to, #recipe_cooking_method_temprature_unit (Text: one letter \"K\", \"c\", \"f\") \n [Pluss] \n recipe_ingredients (A list of ingredients, should look like this: \"400 g/gram løk, hakket\", i.e.: \"[quantity] [unit] [ingredient name], [preparation]\") \n [Pluss] \n recipe_instructions (List of textlines) \n [Pluss] \n #recipe_notes (List of textlines) \n\n (example:) \n [Exclamation mark] \n Dim Sum \n forrett, enkel, 7 \n 4 posjoner \n 15 min prep \n 90 min totalt \n dampkoker, 200 c \n [Pluss] \n 400 gram svinekjøttdeig \n 1 neve fersk koriander, finhakket \n 2 rød chili, finhakket \n 3 fedd hvitløk, finhakket \n 3 ss ingefær, finhakket \n Dim Sum ark \n [Pluss] \n Bland alle ingrediensene bortsett fra pasta flakene og la det stå en time. \n Pakk små porsjoner med kjøtt miksen inn i pastaplatene og damp dem i noen minutter. tiden det tar å dampe dem varierer etter størrelse og fasong, gjerne mellom 4 og 7 minutter. \n [Pluss] \n Serveres med Dim Sum dip. \n\n (Repeat for each recipe)";
export const INGREDIENT_TEXT_FORMAT_TEXT = "Format (replace words in brackets[] with the symbol or fitting text/number): \n\n [Exclamation mark] \n ingredient_name (Text) \n ingredient_type (Text) \n ingredient_price (Price in NOK, Decimal or Whole number) \n\n (example): \n [Exclamation mark] \n Pepper \n krydder \n 13 \n\n (Repeat for each recipe)";

export const CHECK_PENDING = "Valider køen";
export const RELOAD = "Last inn på nytt";
export const UPLOAD = "Last opp";
export const ELEMENTS_TO_UPLOAD = "Elementer som skal lastes opp";
export const RECIPES = "Oppskrifter";
export const INGREDIENTS = "Ingredienser";

export const FORMAT_GUIDE = "Kopier oppskriftene til filen og formater som forklart i eksempelet.";
export const UPLOAD_GUIDE = "Klikk \"" + CHECK_PENDING + "\" for å begynne sjekken av data, deretter klikk \"" + UPLOAD + "\" får å laste opp. For å se mer informasjon, se konsoll-loggen (Høyreklikk > Inspiser > Klikk konsoll i toppen av vinduet som dukket opp).";

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
export const UNKNOWN_ERROR = "Ukjent feil";
export const NOT_FOUND_404 = "Siden finnes ikke: 404";
export const PAGE_NOT_FOUND = "Siden du leter etter finnes ikke.";
export const DB_FETCH_FAILED = "Kunne ikke hente data fra databasen.";
export const DB_SET_FAILED = "Kunne ikke laste opp data til databasen.";
export const TEST_ERROR = "Dette er en test feil.";