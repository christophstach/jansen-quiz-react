import { Page, PageType } from '../types';

export type PageIndicatorProps = {
  pages: Page[];
};


export function PageIndicator(props: PageIndicatorProps) {
  const { pages } = props;

  return (
    <>
      Seite {pages.length + 1}
    </>
  )
}