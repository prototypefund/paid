/** based on document: Pflege, Technische Anlage 1 für Abrechnung auf maschinell verwertbaren Datenträgern
  * see docs/documents.md for more info
  */

import { 
    Amounts, 
    Versicherter,
    Institution,
    TestIndicator,
    Umsatzsteuer
} from "../types";
import {
    BillingData, 
    MessageIdentifiers, 
    messageIdentifierVersions, 
    Leistungserbringer, 
    Abrechnungsfall,
    Leistung, 
    Pflegehilfsmittel,
    Zuschlag,
} from "./types"
import {
    PflegegradSchluessel,
    TarifbereichSchluessel, 
    VerarbeitungskennzeichenSchluessel,
} from "./codes";
import { mask, number, price, day, month, date, time, datetime, segment } from "../formatter";

const Syntax_Version = "UNOC:3";
const DefaultCurrency = "EUR";

export const UNB = (
    absenderIK: string, 
    empfaengerIK: string, 
    datenaustauschreferenz: number,
    anwendungsreferenz: string, 
    testIndicator: TestIndicator
) => segment(
    "UNB", 
    Syntax_Version,
    absenderIK,
    empfaengerIK,
    datetime(new Date()),
    datenaustauschreferenz.toString().substr(0, 5),
    anwendungsreferenz,
    testIndicator
);

export const UNZ = (
    numberOfMessages: number,
    datenaustauschreferenz: number,
) => segment(
    "UNZ",
    numberOfMessages.toString(),
    datenaustauschreferenz.toString().substr(0, 5),
);

export const UNH = (
    messageReferenceNumber: number, // = index of message (starting with UNH)
    messageIdentifier: MessageIdentifiers,
) => segment(
    "UNH",
    messageReferenceNumber.toString().substr(0, 5),
    messageIdentifierVersions[messageIdentifier]
);

export const UNT = (
    numberOfSegments: number, // Control count including UNH and UNT
    messageReferenceNumber: number // = index of message
) => segment(
    "UNT",
    numberOfSegments.toString(),
    messageReferenceNumber.toString().substr(0, 5),
);

export const FKT = (
    verarbeitungskennzeichen: VerarbeitungskennzeichenSchluessel, // always "01"
    {
        absender, // PLGA: Absender der Datei, identisch zu Absender in UNB; PLAA: wie RechnungsstellerIK (?)
        rechnungssteller, // Leistungserbringer oder Abrechnungsstelle mit Inkassovollmacht bei Sammelrechnung; PLAA == PLGA
    }: {
        absender: Institution,
        rechnungssteller: Institution,
    },
    {
        kostentraegerIK, // Institution die die Rechnung begleicht laut Kostenträgerdatei; PLAA == PLGA
        pflegekasseIK, // Pflegekasse des Leistungs- bzw. Bewilligungsbescheids; falls angegeben gilt: PLAA == PLGA
    }: Versicherter,
    isSammelrechnungPLGA?: boolean, // only for PLGA, undefined for PLAA
) => segment(
    "FKT",
    verarbeitungskennzeichen,
    isSammelrechnungPLGA === undefined
        ? undefined
        : isSammelrechnungPLGA
        ? "J"
        : "",
    rechnungssteller.ik,
    kostentraegerIK,
    isSammelrechnungPLGA !== true ? pflegekasseIK : "",
    isSammelrechnungPLGA !== undefined ? absender.ik : rechnungssteller.ik
);

export const REC = (
    {
        rechnungsdatum = new Date(),
        rechnungsart,
        rechnungsnummerprefix
    }: BillingData,
    invoiceIndex: number,
    leistungserbringerIndex: number,
    isSammelrechnungPLGA: boolean,
    currency = DefaultCurrency
) => segment(
    "REC",
    mask(rechnungsnummerprefix + "-" + invoiceIndex) + ":" +
        (isSammelrechnungPLGA || rechnungsart == "1" ? 0 : (leistungserbringerIndex + 1)),
    date(rechnungsdatum),
    rechnungsart,
    currency
);

export const SRD = (
    {
        abrechnungscode,
        tarifbereich,
        sondertarifJeKostentraegerIK,
    }: Leistungserbringer,
    {
        versicherter,
        einsaetze,
    }: Abrechnungsfall
) => segment(
    "SRD",
    abrechnungscode + ":" + tarifbereich 
        + (sondertarifJeKostentraegerIK[versicherter.kostentraegerIK] || "000"),
    einsaetze[0].leistungen[0].leistungsart
);

export const UST = ({
    identifikationsnummer = "",
    befreiung = "",
}: Umsatzsteuer) => segment(
    "UST",
    mask(identifikationsnummer),
    befreiung.length ? "J" : "",
    befreiung
);

export const GES = ({
    gesamtbruttobetrag,
    rechnungsbetrag,
    zuzahlungsbetrag,
    beihilfebetrag,
    mehrwertsteuerbetrag,
}: Amounts) => segment(
    "GES",
    price(gesamtbruttobetrag),
    price(zuzahlungsbetrag || undefined),
    price(beihilfebetrag || undefined),
    price(rechnungsbetrag),
    price(mehrwertsteuerbetrag || undefined)
);

export const NAM = ({
    name,
    ansprechpartner
}: Institution) => segment(
    "NAM",
    mask(name.substr(0, 30)),
    ...ansprechpartner.slice(0, 3).map(ansprechpartner =>
        Object.values(ansprechpartner).filter(Boolean).join(", ").substr(0, 30)
    )
);

export const INV = (
    versichertennummer: string | undefined = "",
    belegNummer: number
) => segment(
    "INV",
    mask(versichertennummer),
    (belegNummer + 1).toString()
);

export const NAD = ({
    firstName,
    lastName,
    birthday,
    address
}: Versicherter) => segment(
    "NAD",
    mask(firstName.substr(0, 45)),
    mask(lastName.substr(0, 45)),
    date(birthday),
    mask(address?.street?.substr(0, 46) || ""),
    mask(address?.houseNumber.substr(0, 9) || ""),
    mask(address?.postalCode.substr(0, 10) || ""),
    mask(address?.city.substr(0, 40) || "")
);

export const MAN = (
    monatLeistungserbringung: Date,
    pflegegrad: PflegegradSchluessel,
) => segment(
    "MAN",
    monatLeistungserbringung.getFullYear() + month(monatLeistungserbringung),
    "", // "Pflegestufe", obsolete
    "", // "Pflegeklasse", obsolete
    pflegegrad
);

export const ESK = (
    leistungsBeginn?: Date,
) => segment(
    "ESK",
    leistungsBeginn ? day(leistungsBeginn) : "99",
    leistungsBeginn ? time(leistungsBeginn) : ""
);

// ELS is insanely complex: leistung and several parameters depend on verguetungsart
export const ELS = ({
    leistungsart,
    verguetungsart,
    qualifikationsabhaengigeVerguetung,
    leistung,
    einzelpreis,
    anzahl,
    leistungsBeginn, // for verguetungsart 04
    leistungsEnde, // for verguetungsart 01, 02, 03, 04
    gefahreneKilometer, // for verguetungsart 06 with leistung 04
    punktwert,
    punktzahl,
}: Leistung) => {
    let details = "00";

    if (verguetungsart == "01") {
        details = leistungsEnde ? time(leistungsEnde) : "00";
    } else if (verguetungsart == "02" && leistungsEnde) {
        details = time(leistungsEnde);
    } else if (verguetungsart == "03" && leistungsEnde) {
        details = time(leistungsEnde);
    } else if (verguetungsart == "04" && leistungsBeginn && leistungsEnde) {
        details = day(leistungsBeginn) + day(leistungsEnde);
    } else if (verguetungsart == "06" && leistung == "04"
            && gefahreneKilometer != undefined) {
        details = number(gefahreneKilometer, 0)
    }

    return segment(
        "ELS",
        [
            leistungsart,
            verguetungsart,
            qualifikationsabhaengigeVerguetung,
            leistung
        ].join(":"),
        price(einzelpreis),
        number(punktwert, 5),
        number(punktzahl, 0),
        details,
        number(anzahl, 2)
    )
};

export const ZUS = (
    isLast: boolean,
    tarifbereich: TarifbereichSchluessel,
    {
        zuschlagsart, 
        zuschlag, 
        zuschlagszuordnung,
        zuschlagsberechnung,
        istAbzugStattZuschlag,
        wert, // absolute value e.g. 123,4 = 123,40000, percent value e.g. 12 % = 12,00000
        beschreibungZuschlagsart,
    }: Zuschlag,
    ergebnis: number,
) => segment(
    "ZUS",
    [tarifbereich, zuschlagsart, zuschlag].join(":"),
    mask(beschreibungZuschlagsart?.substr(0, 50) || ""),
    zuschlagszuordnung,
    zuschlagsberechnung,
    istAbzugStattZuschlag ? "0" : "1",
    number(wert, 5),
    price(ergebnis),
    isLast? "1" : "0"
);

export const HIL = ({
    mehrwertsteuerart = "",
    gesetzlicheZuzahlungBetrag,
    genehmigungskennzeichen = "",
    genehmigungsDatum,
    kennzeichenPflegehilfsmittel = "",
    bezeichnungPflegehilfsmittel = "",
    produktbesonderheitenPflegehilfsmittel = "",
    inventarnummerPflegehilfsmittel = "",
}: Pflegehilfsmittel,
    mehrwertsteuerbetrag?: number
) => segment(
    "HIL",
    mehrwertsteuerart,
    price(mehrwertsteuerbetrag),
    price(gesetzlicheZuzahlungBetrag),
    mask(genehmigungskennzeichen.substr(0, 15)),
    genehmigungsDatum ? date(genehmigungsDatum) : "",
    kennzeichenPflegehilfsmittel,
    mask(bezeichnungPflegehilfsmittel.substr(0, 30)),
    mask(produktbesonderheitenPflegehilfsmittel.substr(0, 10)),
    mask(inventarnummerPflegehilfsmittel.substr(0, 20)),
);

export const IAF = ({ // is calculcated from all ELS / ZUS / HIL segments for one INV segment
    gesamtbruttobetrag,
    rechnungsbetrag,
    zuzahlungsbetrag,
    beihilfebetrag
}: Amounts) => segment(
    "IAF",
    price(gesamtbruttobetrag),
    price(zuzahlungsbetrag || undefined),
    price(beihilfebetrag || undefined),
    price(rechnungsbetrag),
);
