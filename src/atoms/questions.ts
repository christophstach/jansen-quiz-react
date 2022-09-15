import { atomWithStorage } from 'jotai/utils';
import { Question, QuestionType } from '../types';

const questions: Question[] = [
  {
    categoryId: '1',
    id: '2',
    text: 'Welches dieser Ziele steht bei dir im Fokus?',
    type: QuestionType.Simple,
  },

  {
    categoryId: '1.1',
    id: '3',
    icon: 'https://andreasjansen.com/wp-content/uploads/2022/09/Verteilung.png',
    text: 'Hast du einen Überblick über deine monatlichen Einnahmen und Ausgaben?',
    type: QuestionType.Simple,
  },

  {
    categoryId: '1.1',
    id: '4',
    text: 'Hast du einen oder mehrere dieser Verträge in den letzten 12 Monaten gewechselt?',
    type: QuestionType.MultipleChoice,
  },

  {
    categoryId: '1.1',
    id: '5',
    text: 'Wie ist deine Wohnsituation?',
    type: QuestionType.Simple,
  },

  {
    categoryId: '1.1',
    id: '6',
    text: 'Wie beschäftigst du dich mit deiner Steuererklärung?',
    type: QuestionType.Simple,
  },

  {
    categoryId: '1.1',
    id: '7',
    text: 'Bei welcher der folgenden Banken hast du dein Hauptkonto?',
    type: QuestionType.Simple,
  },

  {
    categoryId: '1.1',
    id: '8',
    text: 'Hast du einen Überblick über deine aktuellen Abos und Verträge?',
    type: QuestionType.Simple,
  },

  {
    categoryId: '1.1',
    id: '9',
    text: 'Benutzt du eine App, um deine Finanzen besser zu analysieren?',
    type: QuestionType.Simple,
  },

  {
    categoryId: '1.1',
    id: '10',
    text: 'Wie viele kostenlose Kreditkarten besitzt du?',
    type: QuestionType.Simple,
  },

  {
    categoryId: '1.1',
    id: '11',
    text: 'Wie oft reist du ins Ausland?',
    type: QuestionType.Simple,
  },

  {
    categoryId: '1',
    id: '12',
    text: 'Hast du ein privates Auto?',
    type: QuestionType.Simple,
  },

  {
    categoryId: '1.1',
    id: '13',
    text: 'Bei welcher gesetzlichen Krankenkasse bist du?',
    type: QuestionType.Simple,
  },

  {
    categoryId: '1.1',
    id: '14',
    text: 'Hast du Konsumschulden oder andere Kredite?',
    type: QuestionType.Simple,
  },

  {
    categoryId: '1.1',
    id: '15',
    text: 'Besitzt du ein Aktiendepot?',
    type: QuestionType.Simple,
  },

  {
    categoryId: '1.2',
    id: '16',
    text: 'Hast du einen guten Überblick über deine Vermögenshöhe?',
    type: QuestionType.Simple,
  },

  {
    categoryId: '1.2',
    id: '17',
    text: 'Hast du bereit eine Notfallreserve von mehr als 3 Monatsgehälter aufgebaut?',
    type: QuestionType.Simple,
  },

  {
    categoryId: '1.2',
    id: '18',
    text: 'Wie schätzt du deine Risikotoleranz ein?',
    type: QuestionType.Simple,
  },

  {
    categoryId: '1.2',
    id: '19',
    text: 'Inwiefern spielt Nachhaltigkeit für dich eine Rolle?',
    type: QuestionType.Simple,
  },

  {
    categoryId: '1.2',
    id: '20',
    text: 'In welchen Anlageformen hast du zur Zeit dein Vermögen angelegt?',
    type: QuestionType.MultipleChoice,
  },

  {
    categoryId: '1.2',
    id: '21',
    text: 'Über welches Thema würdest du gerne mehr erfahren?',
    type: QuestionType.MultipleChoice,
  },

  {
    categoryId: '1.2',
    id: '22',
    text: 'Hast du bereits Kinder oder diese in Planung?',
    type: QuestionType.Simple,
  },

  {
    categoryId: '1.2',
    id: '23',
    text: 'Möchtest du deinen Vermögensaufbau komplett selbstständig angehen oder Dinge abgeben?',
    type: QuestionType.Simple,
  },

  {
    categoryId: '1.3',
    id: '24',
    text: 'Hast du einen Notfallordner, um für Notfälle abgesichert zu sein?',
    type: QuestionType.Simple,
  },

  {
    categoryId: '1.3',
    id: '25',
    text: 'Welche dieser Versicherungen besitzt du?',
    type: QuestionType.MultipleChoice,
  },

  {
    categoryId: '1.3',
    id: '26',
    text: 'Besitzt du eine Patientenverfügung und ein Testament?',
    type: QuestionType.Simple,
  },

  {
    categoryId: '1.3',
    id: '27',
    text: 'Willst du deine Versicherungen selbst auswählen?',
    type: QuestionType.Simple,
  },

  {
    categoryId: '1.3',
    id: '28',
    text: 'Hast du dich schon einmal mit deinen Glaubensätzen, die dich an erfolgreichen Finanzen hindern können, auseinander gesetzt?',
    type: QuestionType.Simple,
  },

  {
    categoryId: null,
    id: '29',
    text: 'Wie würdest du am liebsten weiter dein Finanzwissen aufbauen?',
    type: QuestionType.MultipleChoice,
  },

  {
    categoryId: null,
    id: '30',
    text: 'Bist du interessiert an einem per­sön­lich Coaching mit mir?',
    type: QuestionType.Simple,
  },
];

export const questionsAtom = atomWithStorage('questionsAtom', questions);
