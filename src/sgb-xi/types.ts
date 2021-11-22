import { CareProviderLocationSchluessel } from "../kostentraeger/types"
import { 
    Institution, 
    Versicherter
} from "../types"
import { 
    AbrechnungscodeSchluessel,
    LeistungsartSchluessel,
    MehrwertsteuerSchluessel, 
    PflegehilfsmittelSchluessel,
    QualifikationsabhaengigeVerguetungSchluessel,
    TarifbereichSchluessel,
    UmsatzsteuerBefreiungSchluessel,
    VerguetungsartSchluessel,
    ZuschlagsartSchluessel,
    ZuschlagsberechnungSchluessel,
    ZuschlagSchluessel,
    ZuschlagszuordnungSchluessel
} from "./codes"

export const messageIdentifiers = {
    "PLGA": "Pflegeleistungserbringer Gesamtaufstellung der Abrechnung",
    "PLAA": "Pflegeleistungserbringer Abrechnungsdaten je Abrechnungsfall",
}
export const messageIdentifierVersions = {
    "PLGA": "PLGA:2",
    "PLAA": "PLAA:3",
}
export type MessageIdentifiers = keyof typeof messageIdentifiers

export type Invoice = {
    leistungserbringer: Leistungserbringer
    faelle: Abrechnungsfall[]
}

export type Leistungserbringer = Institution & {
    abrechnungscode: AbrechnungscodeSchluessel
    location: CareProviderLocationSchluessel
    tarifbereich: TarifbereichSchluessel

    /** Per Kostenträger IK a 3-character id for the SGB XI Sondertarif, see sgb-xi/codes.ts */
    sondertarifJeKostentraegerIK: Record<string, string>

    /** Steuernummer (according to §14 Abs. 1a) OR Umsatzsteuer-Identifikationsnummer.
     *  Mandatory if not VAT excempt. */
    umsatzsteuerOrdnungsnummer?: string
    /** specified if income tax excempt */
    umsatzsteuerBefreiung?: UmsatzsteuerBefreiungSchluessel
}

export type Abrechnungsfall = {
    versicherter: Versicherter
    einsaetze: Einsatz[]
}

export type Einsatz = {
    /** Date and time at which the health care service started. 
     *  Mandatory for billing with Vergütungsart 01, 02, 03 and 06. */
    leistungsBeginn?: Date
    leistungen: Leistung[]
}

export type Leistung = {
    leistungsart: LeistungsartSchluessel
    verguetungsart: VerguetungsartSchluessel
    qualifikationsabhaengigeVerguetung: QualifikationsabhaengigeVerguetungSchluessel
    /** Depending on verguetungsart a completely different field */
    leistung: string
    /** Price of one service provided */
    einzelpreis: number
    /** Number of things done, f.e. 3x check blood pressure, 3x 15 minutes etc. */
    anzahl: number
    leistungsBeginn?: Date // for verguetungsart 04 only
    leistungsEnde?: Date // for verguetungsart 01, 02, 03, 04
    gefahreneKilometer?: number // for verguetungsart 06 with leistung 04
    punktwert?: number
    punktzahl?: number
    zuschlaege: Zuschlag[]
    hilfsmittel?: Pflegehilfsmittel // for verguetungsart 05 only
}

export type Zuschlag = {
    zuschlagsart: ZuschlagsartSchluessel
    zuschlag: ZuschlagSchluessel
    /** Mandatory if zuschlagsart == "00" */
    beschreibungZuschlagsart?: string
    zuschlagszuordnung: ZuschlagszuordnungSchluessel
    zuschlagsberechnung: ZuschlagsberechnungSchluessel
    istAbzugStattZuschlag: boolean
    /** value for the surcharge. The meaning of this value depends on the 
     *  ZuschlagsberechnungSchluessel given: It could be the Punktzahl (score), a Betrag (amount, in
     *  Euro) or a Prozentsatz (percentage). 
     * 
     *  For example, if it is 42,12%, the value specified here will be 42.12. This was not clear
     *  from the docs, but we asked GKV-Spitzenverband and they clarified that:
     * 
     *  > Der Prozentsatz wird als Zahl ohne Prozent-Zeichen angegeben, z. B. „10“ für 10 %.
     *  */
    wert: number
}

export type Pflegehilfsmittel = {
    /** Only to be specified if there is any Mehrwertsteuer on it */
    mehrwertsteuerart?: MehrwertsteuerSchluessel
    /** according to § 40 SGB XI */
    gesetzlicheZuzahlungBetrag?: number
    /** Bei der Kostenzusage vergebene Genehmigungsnummer. Required only for "technische Hilfsmittel" */
    genehmigungskennzeichen?: string
    genehmigungsDatum?: Date
    /** Required only for "technische Hilfsmittel" (see § 40 Abs. 3 SGB XI) */
    kennzeichenPflegehilfsmittel?: PflegehilfsmittelSchluessel
    /** Only to be specified if for the adjuvant used, there is no Pflegehilfsmittelpositionsnummer yet */
    bezeichnungPflegehilfsmittel?: string
    /** Positionsnummer für Produktbesonderheiten von Pflegehilfsmitteln 
     *  
     *  This 1-10 digit number must be specified if it is specified that way in the respective 
     *  service and supply contracts.
     * 
     *  We asked the GKV-Spitzenverband about whether any numbers are known and documented. They
     *  replied that there is no directory of such service and supply contracts for 
     *  Produktbesonderheiten made by the different GKV. And thus, they assume that this field is to
     *  be filled in by each Leistungserbringer individually depending on their invididual contract(s)
     * 
     *  > Die Angabe von „besonderen Positionsnummern für Produktbesonderheiten“ ist in diesen 
     *  > [vom GKV Spitzenverband geschlossenen] Verträgen nicht vorgesehen. Die Regelungen in den 
     *  > Pflegehilfsmittelverträgen, die die Pflegekassen z.B. zur Versorgung mit Pflegebetten 
     *  > geschlossen haben, sind uns nicht bekannt. Ein Verzeichnis der vertraglich vereinbarten 
     *  > Produktbesonderheiten bei Pflegehilfsmitteln liegt uns nicht vor. Wir gehen davon aus, 
     *  > dass die Angabe der Hilfsmittelpositionsnummern für Produktbesonderheiten durch den 
     *  > Leistungserbringer vertragsabhängig als manuelle Eingabe erfolgen muss.
    */
    produktbesonderheitenPflegehilfsmittel?: string
    /** Inventory number of the adjuvant used (if applicable) */
    inventarnummerPflegehilfsmittel?: string
}
