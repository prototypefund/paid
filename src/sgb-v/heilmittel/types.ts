/** based on documents: 
 *  - Informationen zu Heilmittel-Verordnungen
 *  - Vordruckerläuterungen zu Muster 13
 * 
  * see docs/documents.md for more info
  */

import { 
    ZuzahlungSchluessel,
    HeilmittelVerordnungsartSchluessel,
    HeilmittelBereichSchluessel
} from "../codes"
import { Verordnung } from "../types"

export type HeilmittelVerordnung = Verordnung & {
    zuzahlung: ZuzahlungSchluessel,
    /** Content of the field "Diagnosegruppe" (also known as "Indikationsgruppe"), if specified.
     *  Max 4 characters.
     */
    diagnosegruppe?: string,
    /** Heilmittel-Verordnungsart 
     * 
     *  ASK: Documentation claims that this information can be taken from the prescription 
     *  (Muster 13), if specified, but it is not obvious where on the prescription this information 
     *  should be. So, we asked GKV-spitzenverband, but the department responsible for SGB V 
     *  documentation was also not able to answer this question so they passed the question on for 
     *  the department specific for "Heilmittel". Answer pending.
     */
    verordnungsart?: HeilmittelVerordnungsartSchluessel,
    /** Whether the field "Therapiebericht" is checked on the prescription */
    therapiebericht: boolean,
    /** Whether the field "Hausbesuch" is checked on the prescription */
    hausbesuch: boolean,
    /** Which "Leitsymptomatik" fields are checked on the prescription. Unspecified ONLY if this 
     *  prescription is NOT from a panel doctor (Vertragsarzt) */
     leitsymptomatik?: {
        a: boolean,
        b: boolean,
        c: boolean,
        patientenindividuell: boolean,
    },
    /** Content of the text field "patientenindividuelle Leitsymptomatik", if specified.
     *  Strings longer than 70 characters will be cut off.
     */
    patientenindividuelleLeitsymptomatik?: string,
    /** Whether the field "dringlicher Behandlungsbedarf - innerhalb von 14 Tagen" is checked on the prescription */
    dringlicherBehandlungsbedarf: boolean,
    /** Which "Heilmittelbereich" is specified on the prescription */
    heilmittelBereich?: HeilmittelBereichSchluessel,
    /** 1-character of the field "Therapiefrequenz" as on the prescription, if specified.
     *  If a range is specified on the prescription, the highest value it taken. 
     * 
     *  For example, a range of "1-3" is specified as "3".
     */
    therapieFrequenz?: string
}
