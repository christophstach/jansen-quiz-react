import { atomWithStorage } from 'jotai/utils';
import { Question, QuestionType } from '../types';

const questions: Question[] = [
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
    icon: 'https://andreasjansen.com/wp-content/uploads/2022/09/4.png',
    text: 'Hast du einen oder mehrere dieser Verträge in den letzten 12 Monaten gewechselt?',
    type: QuestionType.MultipleChoice,
  },

  {
    categoryId: '1.1',
    id: '5',
    icon: 'https://andreasjansen.com/wp-content/uploads/2022/03/House.png',
    text: 'Wie ist deine Wohnsituation?',
    type: QuestionType.Simple,
  },

  {
    categoryId: '1.1',
    id: '6',
    icon: 'https://andreasjansen.com/wp-content/uploads/2022/03/Ordner.png',
    text: 'Wie beschäftigst du dich mit deiner Steuererklärung?',
    type: QuestionType.Simple,
  },

  {
    categoryId: '1.1',
    id: '7',
    icon: 'https://andreasjansen.com/wp-content/uploads/2022/03/Banking2.png',
    text: 'Bei welcher der folgenden Banken hast du dein Hauptkonto?',
    type: QuestionType.Simple,
  },

  {
    categoryId: '1.1',
    id: '8',
    icon: 'https://andreasjansen.com/wp-content/uploads/2022/09/6.png',
    text: 'Hast du einen Überblick über deine aktuellen Abos und Verträge?',
    type: QuestionType.Simple,
  },

  {
    categoryId: '1.1',
    id: '9',
    icon: 'https://andreasjansen.com/wp-content/uploads/2022/09/7.png',
    text: 'Benutzt du eine App, um deine Finanzen besser zu analysieren?',
    type: QuestionType.Simple,
  },

  {
    categoryId: '1.1',
    id: '10',
    icon: 'https://andreasjansen.com/wp-content/uploads/2022/09/8.png',
    text: 'Wie viele kostenlose Kreditkarten besitzt du?',
    type: QuestionType.Simple,
  },

  {
    categoryId: '1.1',
    id: '11',
    icon: 'https://andreasjansen.com/wp-content/uploads/2022/03/Flugzeug.png',
    text: 'Wie oft reist du ins Ausland?',
    type: QuestionType.Simple,
  },

  {
    categoryId: '1.1',
    id: '12',
    icon: 'https://andreasjansen.com/wp-content/uploads/2022/03/Auto.png',
    text: 'Hast du ein privates Auto?',
    type: QuestionType.Simple,
  },

  {
    categoryId: '1.1',
    id: '13',
    icon: 'https://andreasjansen.com/wp-content/uploads/2022/03/Doktor.png',
    text: 'Bei welcher gesetzlichen Krankenkasse bist du?',
    type: QuestionType.Simple,
  },

  {
    categoryId: '1.1',
    id: '14',
    icon: 'https://andreasjansen.com/wp-content/uploads/2022/09/9.png',
    text: 'Hast du Konsumschulden oder andere Kredite?',
    type: QuestionType.Simple,
  },

  {
    categoryId: '1.1',
    id: '15',
    icon: 'https://andreasjansen.com/wp-content/uploads/2022/03/Stock.png',
    text: 'Besitzt du ein Aktiendepot?',
    type: QuestionType.Simple,
  },

  {
    categoryId: '1.2',
    id: '16',
    icon: 'https://andreasjansen.com/wp-content/uploads/2022/09/10.png',
    text: 'Hast du einen guten Überblick über deine Vermögenshöhe?',
    type: QuestionType.Simple,
  },

  {
    categoryId: '1.2',
    id: '17',
    icon: 'https://andreasjansen.com/wp-content/uploads/2022/03/Notgroschen-1.png',
    text: 'Hast du bereits eine Notfallreserve von mehr als 3 Monatsgehälter aufgebaut?',
    type: QuestionType.Simple,
  },

  {
    categoryId: '1.2',
    id: '18',
    icon: 'https://andreasjansen.com/wp-content/uploads/2022/03/Danger.png',
    text: 'Wie schätzt du deine Risikotoleranz ein?',
    type: QuestionType.Simple,
  },

  {
    categoryId: '1.2',
    id: '19',
    icon: 'https://andreasjansen.com/wp-content/uploads/2022/03/Nachhaltigkeit-Icon.png',
    text: 'Inwiefern spielt Nachhaltigkeit für dich eine Rolle?',
    type: QuestionType.Simple,
  },

  {
    categoryId: '1.2',
    id: '20',
    icon: 'https://andreasjansen.com/wp-content/uploads/2022/03/Stock.png',
    text: 'In welchen Anlageformen hast du zur Zeit dein Vermögen angelegt?',
    type: QuestionType.MultipleChoice,
  },

  {
    categoryId: '1.2',
    id: '21',
    icon: 'https://andreasjansen.com/wp-content/uploads/2022/03/Lernen.png',
    text: 'Über welches Thema würdest du gerne mehr erfahren?',
    type: QuestionType.MultipleChoice,
  },

  {
    categoryId: '1.2',
    id: '22',
    icon: 'https://andreasjansen.com/wp-content/uploads/2022/03/baby.png',
    text: 'Hast du bereits Kinder oder diese in Planung?',
    type: QuestionType.Simple,
  },

  {
    categoryId: '1.2',
    id: '23',
    icon: 'https://andreasjansen.com/wp-content/uploads/2022/03/Altersvorsorge.png',
    text: 'Möchtest du deinen Vermögensaufbau komplett selbstständig angehen oder Dinge abgeben?',
    type: QuestionType.Simple,
  },

  {
    categoryId: '1.3',
    id: '24',
    icon: 'https://andreasjansen.com/wp-content/uploads/2022/09/11.png',
    text: 'Hast du einen Notfallordner, um für Notfälle abgesichert zu sein?',
    type: QuestionType.Simple,
  },

  {
    categoryId: '1.3',
    id: '25',
    icon: 'https://andreasjansen.com/wp-content/uploads/2022/09/5.png',
    text: 'Welche dieser Versicherungen besitzt du?',
    type: QuestionType.MultipleChoice,
  },

  {
    categoryId: '1.3',
    id: '26',
    icon: 'https://andreasjansen.com/wp-content/uploads/2022/03/Bank.png',
    text: 'Besitzt du eine Patientenverfügung und ein Testament?',
    type: QuestionType.Simple,
  },

  {
    categoryId: '1.3',
    id: '27',
    icon: 'https://andreasjansen.com/wp-content/uploads/2022/09/12.png',
    text: 'Willst du deine Versicherungen selbst auswählen?',
    type: QuestionType.Simple,
  },

  {
    categoryId: '1.3',
    id: '28',
    icon: 'https://andreasjansen.com/wp-content/uploads/2022/09/13.png',
    text: 'Hast du dich schon einmal mit deinen Glaubensätzen, die dich an erfolgreichen Finanzen hindern können, auseinander gesetzt?',
    type: QuestionType.Simple,
  },

  {
    categoryId: null,
    id: '29',
    icon: 'https://andreasjansen.com/wp-content/uploads/2022/09/14.png',
    text: 'Wie würdest du am liebsten weiter dein Finanzwissen aufbauen?',
    type: QuestionType.MultipleChoice,
  },
];

export const questionsAtom = atomWithStorage('questionsAtom', questions);
