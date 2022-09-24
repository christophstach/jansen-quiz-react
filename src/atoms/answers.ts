import { atom } from 'jotai';
import { Answer } from '../types';

const answers: Answer[] = [
  { id: '31', text: 'Ja', questionId: '3' },

  { id: '32', text: 'Nein', questionId: '3' },

  {
    id: '33',
    text: 'Ungefähr, aber die exakte Zahl kenne ich nicht',
    questionId: '3',
  },

  { id: '41', text: 'Strom', questionId: '4' },

  { id: '42', text: 'Internet', questionId: '4' },

  { id: '43', text: 'Handy', questionId: '4' },

  { id: '44', text: 'Ich habe keine Verträge gewechselt', questionId: '4' },

  {
    id: '51',
    text: 'Ich wohne zur Untermiete in einer WG oder Wohung',
    questionId: '5',
  },

  {
    id: '52',
    text: 'Ich bin Hauptmieter einer Mietwohnung oder WG',
    questionId: '5',
  },

  { id: '53', text: 'Ich wohne im meiner eigenen Immobilie', questionId: '5' },

  {
    id: '61',
    text: 'Ich habe noch nie eine Steuererklärung gemacht',
    questionId: '6',
  },

  {
    id: '62',
    text: 'Ich mache meine Steuererklärung selber, habe aber kein gutes Gefühl dabei',
    questionId: '6',
  },

  {
    id: '63',
    text: 'Ich habe ein gutes Gefühl meine Steuererklärung selbstständig auszufüllen',
    questionId: '6',
  },

  {
    id: '64',
    text: 'Ich mache meine Steuer über einen Steuerberater',
    questionId: '6',
  },

  {
    id: '71',
    text: 'Deutsche Bank, Postbank, Sparkasse oder Commerzbank',
    questionId: '7',
  },

  {
    id: '72',
    text: 'Comdirect, DKB, Norisbank, ING oder N26',
    questionId: '7',
  },

  { id: '73', text: 'Will ich nicht sagen', questionId: '7' },

  { id: '74', text: 'Andere', questionId: '7' },

  { id: '81', text: 'Ja', questionId: '8' },

  { id: '82', text: 'Nein', questionId: '8' },

  {
    id: '83',
    text: 'Ein bisschen, aber sortiert und strukturiert ist nichts ',
    questionId: '8',
  },

  { id: '91', text: 'Ja', questionId: '9' },

  { id: '92', text: 'Nein', questionId: '9' },

  { id: '101', text: '0', questionId: '10' },

  { id: '102', text: '1', questionId: '10' },

  { id: '103', text: '2', questionId: '10' },

  { id: '104', text: '3', questionId: '10' },

  { id: '105', text: 'Mehr als 3', questionId: '10' },

  {
    id: '111',
    text: 'Ich reise privat und beruflich viel ins Ausland',
    questionId: '11',
  },

  {
    id: '112',
    text: 'Ich reise öfters mal, aber nur privat ins Ausland',
    questionId: '11',
  },

  {
    id: '113',
    text: 'Ich reise seltener bis nie ins Ausland',
    questionId: '11',
  },

  { id: '121', text: 'Ja', questionId: '12' },

  { id: '122', text: 'Nein', questionId: '12' },

  { id: '131', text: 'HKK, BKK, IKK, Techniker', questionId: '13' },

  {
    id: '132',
    text: 'AOK, Barmer, KKH, Actimondo, DAK, Knappschaft, SBK, VIACTIV, HEK',
    questionId: '13',
  },

  { id: '133', text: 'Andere gesetzliche Krankenkasse', questionId: '13' },

  { id: '134', text: 'Ich bin privat versichert', questionId: '13' },

  { id: '141', text: 'Ja', questionId: '14' },

  { id: '142', text: 'Nein', questionId: '14' },

  {
    id: '143',
    text: 'Ja, aber nur für Investitionen (Wohnung, etc.)',
    questionId: '14',
  },

  { id: '151', text: 'Ja, bei meiner Hausbank', questionId: '15' },

  {
    id: '152',
    text: 'Ja, ich handel über Flatex, comdirect, onvista, DKB, Consors oder ING',
    questionId: '15',
  },

  {
    id: '153',
    text: 'Ich habe kein Aktiendepot',
    questionId: '15',
  },

  { id: '161', text: 'Ja, ich kenne die Höhe genau ', questionId: '16' },

  { id: '162', text: 'Nein', questionId: '16' },

  {
    id: '163',
    text: 'Ungefähr, aber die exakte Zahl kenne ich nicht',
    questionId: '16',
  },

  { id: '171', text: 'Ja', questionId: '17' },

  { id: '172', text: 'Nein', questionId: '17' },

  {
    id: '173',
    text: 'Ich probiere mir gerade einen Notfallgroschen aufzubauen',
    questionId: '17',
  },

  {
    id: '181',
    text: 'Ich gehe selten ein Risiko ein und sichere mich stehts ab',
    questionId: '18',
  },

  {
    id: '182',
    text: 'Ich mag es gelegentlich etwas Risiko einzugehen',
    questionId: '18',
  },

  { id: '183', text: 'Ich gehe gerne mal Risiko ein', questionId: '18' },

  {
    id: '191',
    text: 'Ich interessiere mich nicht wirklich für Nachhaltigkeit',
    questionId: '19',
  },

  {
    id: '192',
    text: 'Nachhaltigkeit interessiert mich, steht aber für mich nicht im Fokus',
    questionId: '19',
  },

  {
    id: '193',
    text: 'Ich interessiere mich sehr für Nachhaltigkeit',
    questionId: '19',
  },

  { id: '2011', text: 'Ich habe noch kein Geld investiert', questionId: '20' },

  { id: '2012', text: 'Tagesgeld', questionId: '20' },

  { id: '2013', text: 'Festgeld', questionId: '20' },

  { id: '2014', text: 'Immobilien', questionId: '20' },

  { id: '2015', text: 'Einzelaktien', questionId: '20' },

  { id: '2016', text: 'Rohstoffe', questionId: '20' },

  { id: '2017', text: 'ETFs', questionId: '20' },

  { id: '2018', text: 'P2P-Kredite', questionId: '20' },

  { id: '2019', text: 'Kryptowährungen', questionId: '20' },

  { id: '2020', text: 'Optionen oder Hebelprodukte', questionId: '20' },

  { id: '2021', text: 'Weiteres', questionId: '20' },

  { id: '2022', text: 'Will ich nicht sagen', questionId: '20' },

  {
    id: '2110',
    text: 'Ich habe noch keine Idee oder Interesse',
    questionId: '21',
  },

  { id: '2111', text: 'Tagesgeld', questionId: '21' },

  { id: '2112', text: 'Festgeld', questionId: '21' },

  { id: '2113', text: 'Immobilien', questionId: '21' },

  { id: '2114', text: 'Einzelaktien', questionId: '21' },

  { id: '2115', text: 'ETFs', questionId: '21' },

  { id: '2116', text: 'P2P-Kredite', questionId: '21' },

  { id: '2117', text: 'Kryptowährungen', questionId: '21' },

  { id: '2118', text: 'Rohstoffe', questionId: '21' },

  { id: '2119', text: 'Optionen oder Hebelprodukte', questionId: '21' },

  { id: '2120', text: 'Will ich nicht sagen', questionId: '21' },

  { id: '221', text: 'Ja', questionId: '22' },

  { id: '222', text: 'Nein', questionId: '22' },

  { id: '231', text: 'Komplett selbstständig', questionId: '23' },

  {
    id: '232',
    text: 'Könnte mir auch vorstellen Dinge abzugeben',
    questionId: '23',
  },

  { id: '241', text: 'Ja', questionId: '24' },

  { id: '242', text: 'Nein', questionId: '24' },

  { id: '251', text: 'Private Krankenversicherung', questionId: '25' },

  { id: '252', text: 'Hausratversicherung', questionId: '25' },

  { id: '253', text: 'Privathaftpflichtversicherung', questionId: '25' },

  { id: '254', text: 'Berufsunfähigkeitsversicherung', questionId: '25' },

  { id: '255', text: 'Lebens- oder Rentenversicherung', questionId: '25' },

  { id: '256', text: 'Risikolebensversicherung', questionId: '25' },

  { id: '257', text: 'Keine der Versicherungen', questionId: '25' },

  { id: '261', text: 'Nein', questionId: '26' },

  {
    id: '262',
    text: 'Ich mache mir derzeit Gedanken, aber habe beides nicht',
    questionId: '26',
  },

  { id: '263', text: 'Ja, beides', questionId: '26' },

  { id: '264', text: 'Ich habe nur eine Patientenverfügung', questionId: '26' },

  { id: '265', text: 'Ich habe nur ein Testament', questionId: '26' },

  { id: '271', text: 'Ja', questionId: '27' },

  { id: '272', text: 'Nein', questionId: '27' },

  {
    id: '273',
    text: 'Ich könnte mir vorstellen digitale Versicherungstools zu nutzen',
    questionId: '27',
  },

  { id: '281', text: 'Ja', questionId: '28' },

  { id: '282', text: 'Nein', questionId: '28' },

  {
    id: '283',
    text: 'Nein, aber habe ich auch keine Lust drauf!',
    questionId: '28',
  },

  { id: '291', text: 'Newsletter', questionId: '29' },

  { id: '292', text: 'Blog', questionId: '29' },

  { id: '293', text: 'Persönliches Coaching', questionId: '29' },

  { id: '294', text: 'Online-Kurs', questionId: '29' },

  { id: '295', text: 'Video', questionId: '29' },

  { id: '296', text: 'Bücher', questionId: '29' },

  { id: '297', text: 'Podcast', questionId: '29' },

  { id: '298', text: 'Ich will nichts lernen', questionId: '29' },

  { id: '301', text: 'Ja', questionId: '30' },
  { id: '302', text: 'Nein', questionId: '30' },
];

export const answersAtom = atom(answers);
