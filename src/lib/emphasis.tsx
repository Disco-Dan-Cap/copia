import type { ReactNode } from "react";

// The anchor field is HTML with a single Fraunces-italic <em> in the seed. The
// seller edits it via a lightweight asterisk syntax (*like this*) so there's no
// rich-text toolbar chrome. These three helpers bridge the two representations:
// seed HTML ⇆ editable asterisk source ⇆ rendered React.

/** Seed anchor HTML → editable asterisk source. Strips any stray tags. */
export function htmlToAsterisk(html: string): string {
  return html.replace(/<em>(.*?)<\/em>/g, "*$1*").replace(/<[^>]+>/g, "");
}

/** Editable asterisk source → HTML, for storing back in the Listing shape. */
export function asteriskToHtml(text: string): string {
  return text.replace(/\*([^*]+)\*/g, "<em>$1</em>");
}

/**
 * Render asterisk source as React — *wrapped* spans become Fraunces italic.
 * Used for the live, blurred preview so we never feed edited text through
 * dangerouslySetInnerHTML.
 */
export function renderEmphasis(text: string): ReactNode[] {
  return text.split(/\*([^*]+)\*/g).map((part, i) =>
    i % 2 === 1 ? (
      <em key={i} className="font-emphasis italic">
        {part}
      </em>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
}
