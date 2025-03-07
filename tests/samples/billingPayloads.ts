import {
    Institution,
    Versicherter,
    BillingData,
} from "../../src/types"
import {
    Invoice,
    Leistungserbringer,
    LeistungskomplexverguetungLeistung,
    PauschaleLeistung,
    WegegebuehrenLeistung,
    PflegehilfsmittelLeistung,
    TeilstationaerLeistung,
    VollstationaerOderKurzzeitpflegeLeistung,
    ZeitverguetungLeistung, 
} from "../../src/sgb-xi/types"

const leistungserbringer: Leistungserbringer[] = [{
    name: "Pflegedienst Musterstadt GmbH",
    ik: "000000110",
    ansprechpartner: [{
        name: "Sven Bauer",
        phone: "012 34567-8",
    }],
    abrechnungscode: "36",
    tarifbereich: "00",
    location: "HE",
    umsatzsteuerBefreiung: "01",
    sondertarifJeKostentraegerIK: {},
    email: "test@example.com",
}, {
    name: "Nachbarschaftspflege in Wilhelmsburg gGmbH",
    ik: "000000120",
    ansprechpartner: [{
        name: "Laila Neumann",
        phone: "012 34567",
    }],
    abrechnungscode: "35",
    tarifbereich: "05",
    location: "HH",
    umsatzsteuerBefreiung: "01",
    sondertarifJeKostentraegerIK: {
        "000000010": "011"
    },
    email: "test@example.com",
}, {
    name: "Quartierspflege Neuhausen GmbH",
    ik: "000000130",
    ansprechpartner: [{
        name: "Ben Peters",
        phone: "012 3456789",
    }],
    abrechnungscode: "36",
    tarifbereich: "02",
    location: "BY",
    umsatzsteuerOrdnungsnummer: "123/456/78900",
    sondertarifJeKostentraegerIK: {},
    email: "test@example.com",
}, {
    name: "Von Mensch zu Mensch gGmbH",
    ik: "000000140",
    ansprechpartner: [{
        name: "Lena Wolf",
        phone: "0123 456789",
    }],
    abrechnungscode: "35",
    tarifbereich: "01",
    location: "BW",
    umsatzsteuerBefreiung: "01",
    sondertarifJeKostentraegerIK: {},
    email: "test@example.com",
}, {
    name: "Pflegedienst Neukölln GmbH",
    ik: "000000150",
    ansprechpartner: [{
        name: "Yvonne Zimmermann",
        phone: "0123 456789",
    }],
    abrechnungscode: "36",
    tarifbereich: "23",
    location: "BE",
    umsatzsteuerOrdnungsnummer: "012/345/67890",
    sondertarifJeKostentraegerIK: {},
    email: "test@example.com",
}];

const abrechnungsstellen: Institution[] = [{
    name: "Payday GmbH",
    ik: "000000210",
    ansprechpartner: [{
        name: "Peter Schmidt",
        phone: "0123 45678-90",
    }],
    email: "test@example.com",
}, {
    name: "PAID Abrechnungszentrum eG",
    ik: "000000310",
    ansprechpartner: [{
        name: "Sonja Braun",
        phone: "01234 5678-9",
    }, {
        name: "Josef Klein"
    }],
    email: "test@example.com",
}]

const versicherte: Versicherter[] = [{
    pflegekasseIK: "000000010",
    kostentraegerIK: "000000010",
    versichertennummer: "0123456789",
    versichertenstatus: "51",
    pflegegrad: "3",
    firstName: "Gertrud",
    lastName: "Fischer",
    birthday: new Date("1938-03-01"),
    address: {
        street: "Musterstraße",
        houseNumber: "1",
        postalCode: "12345",
        city: "Musterstadt",
    }
}, {
    pflegekasseIK: "000000010",
    kostentraegerIK: "000000010",
    versichertennummer: "0123456789",
    versichertenstatus: "51",
    pflegegrad: "2",
    firstName: "Jürgen",
    lastName: "Weber",
    birthday: new Date("1941-09-02"),
    address: {
        street: "Musterstraße",
        houseNumber: "2",
        postalCode: "12345",
        city: "Musterstadt",
    }
}, {
    pflegekasseIK: "000000020",
    kostentraegerIK: "000000021",
    versichertennummer: "0123456789",
    versichertenstatus: "51",
    pflegegrad: "4",
    firstName: "Paul",
    lastName: "Hofmann",
    birthday: new Date("1932-11-03"),
    address: {
        street: "Musterstraße",
        houseNumber: "3",
        postalCode: "12345",
        city: "Musterstadt",
    }
}, {
    pflegekasseIK: "000000030",
    kostentraegerIK: "000000031",
    versichertennummer: "0123456789",
    versichertenstatus: "51",
    pflegegrad: "4",
    firstName: "Sabine",
    lastName: "Schwarz",
    birthday: new Date("1942-10-04"),
    address: {
        street: "Musterstraße",
        houseNumber: "4",
        postalCode: "12345",
        city: "Musterstadt",
    }
}, {
    pflegekasseIK: "000000040",
    kostentraegerIK: "000000031",
    versichertennummer: "0123456789",
    versichertenstatus: "51",
    pflegegrad: "1",
    firstName: "Ingeborg",
    lastName: "Wagner",
    birthday: new Date("1936-02-05"),
    address: {
        street: "Musterstraße",
        houseNumber: "5",
        postalCode: "12345",
        city: "Musterstadt",
    }
}, {
    pflegekasseIK: "000000030",
    kostentraegerIK: "000000031",
    versichertennummer: "0123456789",
    versichertenstatus: "51",
    pflegegrad: "2",
    firstName: "Robert",
    lastName: "Schäfer",
    birthday: new Date("1937-06-06"),
    address: {
        street: "Musterstraße",
        houseNumber: "6",
        postalCode: "12345",
        city: "Musterstadt",
    }
}, {
    pflegekasseIK: "000000050",
    kostentraegerIK: "000000050",
    versichertennummer: "0123456789",
    versichertenstatus: "51",
    pflegegrad: "2",
    firstName: "Małgorzata",
    lastName: "Dąbrowski",
    birthday: new Date("1946-08-07"),
}]

// Leistungen

const leistungskomplex: LeistungskomplexverguetungLeistung = {
    leistungsart: "01",
    verguetungsart: "01",
    qualifikationsabhaengigeVerguetung: "1",
    leistungskomplex: "001",
    einzelpreis: 28.37,
    anzahl: 1,
    leistungsBeginn: new Date("2021-04-02T11:00"),
    leistungsEnde: new Date("2021-04-02T11:30"),
    punktwert: 0.06114,
    punktzahl: 464,
    zuschlaege: [],
};
const zeitverguetung: ZeitverguetungLeistung = {
    leistungsart: "01",
    verguetungsart: "02",
    qualifikationsabhaengigeVerguetung: "1",
    zeiteinheit: "1",
    zeitart: "3",
    einzelpreis: 45.45,
    anzahl: 1,
    leistungsBeginn: new Date("2021-04-02T10:00"),
    leistungsEnde: new Date("2021-04-02T11:00"),
    zuschlaege: [],
};
const zeitMitZuschlag: ZeitverguetungLeistung = {
    leistungsart: "01",
    verguetungsart: "02",
    qualifikationsabhaengigeVerguetung: "1",
    zeiteinheit: "1",
    zeitart: "3",
    einzelpreis: 45.45,
    anzahl: 1,
    leistungsBeginn: new Date("2021-04-02T10:00"),
    leistungsEnde: new Date("2021-04-02T11:00"),
    zuschlaege: [{
        zuschlagsart: "1",
        zuschlag: "21",
        zuschlagszuordnung: "1",
        zuschlagsberechnung: "11",
        istAbzugStattZuschlag: false,
        wert: 10,
    }],
};
const wegegebuehrenEinsatzpauschale: WegegebuehrenLeistung = {
    leistungsart: "01",
    verguetungsart: "06",
    qualifikationsabhaengigeVerguetung: "1",
    wegegebuehren: "03",
    einzelpreis: 2,
    anzahl: 1,
    zuschlaege: [],
};
const wegegebuehrenKilometer: WegegebuehrenLeistung = {
    leistungsart: "01",
    verguetungsart: "06",
    qualifikationsabhaengigeVerguetung: "1",
    wegegebuehren: "04",
    einzelpreis: 0.4,
    anzahl: 1,
    gefahreneKilometer: 5,
    zuschlaege: [],
};
const pflegehilfsmittel: PflegehilfsmittelLeistung = {
    leistungsart: "06",
    verguetungsart: "05",
    qualifikationsabhaengigeVerguetung: "0",
    positionsnummer: "000000000",
    einzelpreis: 123.45,
    anzahl: 1,
    zuschlaege: [],
    hilfsmittel: {
        mehrwertsteuerart: "1",
        gesetzlicheZuzahlungBetrag: 10.12,
        genehmigungskennzeichen: "genehmigt_123",
        genehmigungsDatum: new Date("2021-03-01"),
        kennzeichenPflegehilfsmittel: "00",
        bezeichnungPflegehilfsmittel: "Rollator",
    },
};
const beratungsbesuch: PauschaleLeistung = {
    leistungsart: "09",
    verguetungsart: "08",
    qualifikationsabhaengigeVerguetung: "1",
    einzelpreis: 32,
    anzahl: 1,
    leistungsBeginn: new Date("2021-04-03T13:00"),
    leistungsEnde: new Date("2021-04-03T13:30"),
    zuschlaege: [],
};
const teilstationaer: TeilstationaerLeistung = {
    leistungsart: "02",
    verguetungsart: "03",
    qualifikationsabhaengigeVerguetung: "1",
    pflegesatz: "01",
    einzelpreis: 42.84,
    anzahl:1,
    leistungsBeginn: new Date("2021-04-02T10:00"),
    leistungsEnde: new Date("2021-04-02T18:00"),
    zuschlaege: [],
};
const kurzzeitpflege: VollstationaerOderKurzzeitpflegeLeistung = {
    leistungsart: "04",
    verguetungsart: "04",
    qualifikationsabhaengigeVerguetung: "1",
    pflegesatz: "00",
    einzelpreis: 234.56,
    anzahl: 8,
    leistungsBeginn: new Date("2021-04-03T12:00"),
    leistungsEnde: new Date("2021-04-11T12:00"),
    zuschlaege: [],
};

// Nutzdaten

export const payload1 = {
    billingData: {
        testIndicator: "0",
        rechnungsart: "1",
        rechnungsnummerprefix: "2021-0087",
        rechnungsdatum: new Date("2021-05-03"),
        abrechnungsmonat: new Date("2021-04-01"),
        senderCertificate: new ArrayBuffer(0),
        senderPrivateKey: new ArrayBuffer(0),
        datenaustauschreferenzJeEmpfaengerIK: {},
        laufendeDatenannahmeImJahrJeEmpfaengerIK: {}
    } as BillingData,
    invoices: [{
        leistungserbringer: {...leistungserbringer[0]},
        faelle: [{
            versicherter: {...versicherte[0]},
            einsaetze: [{
                leistungsBeginn: new Date("2021-03-31T10:30"),
                leistungen: [
                    { 
                        ...leistungskomplex, 
                        leistungsBeginn: new Date("2021-03-31T11:00"), 
                        leistungsEnde: new Date("2021-03-31T11:30")
                    },
                    {
                        ...leistungskomplex,
                        leistungsBeginn: new Date("2021-03-31T10:30"),
                        leistungsEnde: new Date("2021-03-31T11:00")
                    },
                    { ...wegegebuehrenKilometer },
                ]
            }, {
                leistungsBeginn: new Date("2021-04-02T11:00"),
                leistungen: [
                    {
                        ...leistungskomplex,
                        leistungsBeginn: new Date("2021-04-02T11:00"),
                        leistungsEnde: new Date("2021-04-02T11:30")
                    },
                    { ...wegegebuehrenKilometer },
                ]
            }, {
                leistungsBeginn: new Date("2021-04-04T11:00"),
                leistungen: [
                    {
                        ...zeitverguetung,
                        leistungsBeginn: new Date("2021-04-04T11:00"),
                        leistungsEnde: new Date("2021-04-04T11:30")
                    },
                    { ...wegegebuehrenEinsatzpauschale },
                ]
            }, {
                leistungsBeginn: new Date("2021-04-04T18:00"),
                leistungen: [
                    {
                        ...zeitMitZuschlag,
                        leistungsBeginn: new Date("2021-04-04T18:00"),
                        leistungsEnde: new Date("2021-04-04T18:30")
                    },
                    { ...pflegehilfsmittel },
                    { ...wegegebuehrenEinsatzpauschale },
                ]
            }, {
                leistungsBeginn: new Date("2021-04-06T13:00"),
                leistungen: [
                    {
                        ...beratungsbesuch,
                        leistungsBeginn: new Date("2021-04-06T13:00"),
                        leistungsEnde: new Date("2021-04-06T13:30")
                    },
                ]
            }]
        }, {
            versicherter: {...versicherte[2]},
            eindeutigeBelegnummer: "2021-1235",
            einsaetze: [{
                leistungsBeginn: new Date("2021-04-03T11:00"),
                leistungen: [
                    {
                        ...zeitverguetung,
                        leistungsBeginn: new Date("2021-04-03T11:00"),
                        leistungsEnde: new Date("2021-04-03T11:30")
                    },
                    { ...wegegebuehrenEinsatzpauschale }
                ]
            }, {
                leistungsBeginn: new Date("2021-04-07T13:00"),
                leistungen: [
                    {
                        ...beratungsbesuch,
                        leistungsBeginn: new Date("2021-04-07T13:00"),
                        leistungsEnde: new Date("2021-04-07T13:30")
                    },
                ]
            }]
        }]
    }] as Invoice[],
};

export const payload2 = {
    billingData: {
        testIndicator: "0",
        rechnungsart: "2",
        rechnungsnummerprefix: "2021-0267",
        abrechnungsmonat: new Date("2021-04-01"),
        abrechnungsstelle: abrechnungsstellen[0],
        senderCertificate: new ArrayBuffer(0),
        senderPrivateKey: new ArrayBuffer(0),
        datenaustauschreferenzJeEmpfaengerIK: {},
        laufendeDatenannahmeImJahrJeEmpfaengerIK: {}
    } as BillingData,
    invoices: [{
        leistungserbringer: { ...leistungserbringer[1] },
        faelle: [{
            versicherter: { ...versicherte[1] },
            einsaetze: [{
                leistungsBeginn: new Date("2021-04-05T11:00"),
                leistungen: [
                    {
                        ...zeitverguetung,
                        leistungsBeginn: new Date("2021-04-05T11:00"),
                        leistungsEnde: new Date("2021-04-05T11:30")
                    },
                    { ...pflegehilfsmittel },
                ]
            }, {
                leistungsBeginn: new Date("2021-04-08T11:00"),
                leistungen: [
                    {
                        ...zeitverguetung,
                        leistungsBeginn: new Date("2021-04-08T11:00"),
                        leistungsEnde: new Date("2021-04-08T11:30")
                    },
                ]
            }]
        }, {
            versicherter: { ...versicherte[3] },
            eindeutigeBelegnummer: "2021-2894",
            einsaetze: [{
                leistungsBeginn: new Date("2021-04-05T11:00"),
                leistungen: [
                    {
                        ...zeitverguetung,
                        leistungsBeginn: new Date("2021-04-05T11:00"),
                        leistungsEnde: new Date("2021-04-05T11:30")
                    },
                    { ...pflegehilfsmittel },
                ]
            }, {
                leistungsBeginn: new Date("2021-04-08T11:00"),
                leistungen: [
                    {
                        ...zeitverguetung,
                        leistungsBeginn: new Date("2021-04-08T11:00"),
                        leistungsEnde: new Date("2021-04-08T11:30")
                    },
                ]
            }]
        }]
    }, {
        leistungserbringer: { ...leistungserbringer[2] },
        faelle: [{
            versicherter: { ...versicherte[4] },
            eindeutigeBelegnummer: "2021-354",
            einsaetze: [{
                leistungsBeginn: new Date("2021-04-05T11:00"),
                leistungen: [
                    {
                        ...zeitverguetung,
                        leistungsBeginn: new Date("2021-04-05T11:00"),
                        leistungsEnde: new Date("2021-04-05T11:30")
                    },
                ]
            }, {
                leistungsBeginn: new Date("2021-04-08T11:00"),
                leistungen: [
                    {
                        ...leistungskomplex,
                        leistungsBeginn: new Date("2021-04-08T11:00"),
                        leistungsEnde: new Date("2021-04-08T11:30")
                    },
                ]
            }]
        }, {
            versicherter: { ...versicherte[5] },
            eindeutigeBelegnummer: "2021-355",
            einsaetze: [{
                leistungsBeginn: new Date("2021-04-05T11:00"),
                leistungen: [
                    {
                        ...zeitverguetung,
                        leistungsBeginn: new Date("2021-04-05T11:00"),
                        leistungsEnde: new Date("2021-04-05T11:30")
                    },
                ]
            }, {
                leistungsBeginn: new Date("2021-04-08T11:00"),
                leistungen: [
                    {
                        ...beratungsbesuch,
                        leistungsBeginn: new Date("2021-04-08T11:00"),
                        leistungsEnde: new Date("2021-04-08T11:30")
                    },
                ]
            }]
        }]
    }] as Invoice[],
};

export const payload3 = {
    billingData: {
        testIndicator: "0",
        rechnungsart: "3",
        rechnungsnummerprefix: "2021-0398",
        rechnungsdatum: new Date("2021-05-03"),
        abrechnungsmonat: new Date("2021-04-01"),
        abrechnungsstelle: abrechnungsstellen[1],
        senderCertificate: new ArrayBuffer(0),
        senderPrivateKey: new ArrayBuffer(0),
        datenaustauschreferenzJeEmpfaengerIK: {
            "123456789": 1
        },
        laufendeDatenannahmeImJahrJeEmpfaengerIK: {
            "123456789": 1
        }
    } as BillingData,
    invoices: [{
        leistungserbringer: { ...leistungserbringer[3] },
        faelle: [{
            versicherter: { ...versicherte[6] },
            eindeutigeBelegnummer: "2021-0413",
            einsaetze: [{
                leistungsBeginn: new Date("2021-04-03T11:00"),
                leistungen: [
                    {
                        ...zeitverguetung,
                        leistungsBeginn: new Date("2021-04-03T11:00"),
                        leistungsEnde: new Date("2021-04-03T11:30")
                    },
                ]
            }, {
                leistungsBeginn: new Date("2021-04-10T11:00"),
                leistungen: [
                    {
                        ...zeitverguetung,
                        leistungsBeginn: new Date("2021-04-10T11:00"),
                        leistungsEnde: new Date("2021-04-10T11:30")
                    },
                ]
            }]
        }, {
            versicherter: { ...versicherte[0] },
            eindeutigeBelegnummer: "2021-0414",
            einsaetze: [{
                leistungsBeginn: new Date("2021-04-03T11:00"),
                leistungen: [
                    {
                        ...zeitverguetung,
                        leistungsBeginn: new Date("2021-04-03T11:00"),
                        leistungsEnde: new Date("2021-04-03T11:30")
                    },
                ]
            }, {
                leistungsBeginn: new Date("2021-04-10T11:00"),
                leistungen: [
                    {
                        ...beratungsbesuch,
                        leistungsBeginn: new Date("2021-04-10T11:00"),
                        leistungsEnde: new Date("2021-04-10T11:30")
                    },
                ]
            }]
        }, {
            versicherter: { ...versicherte[2] },
            eindeutigeBelegnummer: "2021-4321",
            einsaetze: [{
                leistungsBeginn: new Date("2021-04-02T10:00"),
                leistungen: [
                    {
                        ...teilstationaer,
                        leistungsBeginn: new Date("2021-04-02T10:00"),
                        leistungsEnde: new Date("2021-04-02T18:00")
                    },
                ]
            }]
        }]
    }, {
        leistungserbringer: { ...leistungserbringer[4] },
        faelle: [{
            versicherter: { ...versicherte[1] },
            einsaetze: [{
                leistungsBeginn: new Date("2021-04-03T11:00"),
                leistungen: [
                    {
                        ...leistungskomplex,
                        leistungsBeginn: new Date("2021-04-03T11:00"),
                        leistungsEnde: new Date("2021-04-03T11:30")
                    },
                    { ...wegegebuehrenEinsatzpauschale },
                ]
            }, {
                leistungsBeginn: new Date("2021-04-10T11:00"),
                leistungen: [
                    {
                        ...leistungskomplex,
                        leistungsBeginn: new Date("2021-04-10T11:00"),
                        leistungsEnde: new Date("2021-04-10T11:30")
                    },
                    { ...wegegebuehrenEinsatzpauschale },
                ]
            }]
        }, {
            versicherter: { ...versicherte[4] },
            eindeutigeBelegnummer: "2021-0235",
            einsaetze: [{
                leistungsBeginn: new Date("2021-04-03T12:00"),
                leistungen: [
                    {
                        ...kurzzeitpflege,
                        leistungsBeginn: new Date("2021-04-03T12:00"),
                        leistungsEnde: new Date("2021-04-11T12:00")
                    },
                ]
            }]
        }, {
            versicherter: { ...versicherte[2] },
            eindeutigeBelegnummer: "2021-0314",
            einsaetze: [{
                leistungsBeginn: new Date("2021-04-03T11:00"),
                leistungen: [
                    {
                        ...leistungskomplex,
                        leistungsBeginn: new Date("2021-04-03T11:00"),
                        leistungsEnde: new Date("2021-04-03T11:30")
                    },
                    { ...wegegebuehrenEinsatzpauschale },
                ]
            }, {
                leistungsBeginn: new Date("2021-04-10T11:00"),
                leistungen: [
                    {
                        ...beratungsbesuch,
                        leistungsBeginn: new Date("2021-04-10T11:00"),
                        leistungsEnde: new Date("2021-04-10T11:30")
                    },
                ]
            }]
        }, {
            versicherter: { ...versicherte[3] },
            eindeutigeBelegnummer: "2021-0234",
            einsaetze: [{
                leistungsBeginn: new Date("2021-04-03T12:00"),
                leistungen: [
                    {
                        ...kurzzeitpflege,
                        leistungsBeginn: new Date("2021-04-03T12:00"),
                        leistungsEnde: new Date("2021-04-11T12:00")
                    },
                ]
            }]
        }]
    }] as Invoice[],
};
